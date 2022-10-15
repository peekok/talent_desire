import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from '../hooks/';
import {Block, Card} from '../components/';
import {firebase} from '../services/firebase';
const Home = () => {
  //const {t} = useTranslation();
  const [cards, setCards]: any = useState();
  const {sizes} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const BOTTOM_VALUE = 0;
  const POSITION_VALUE = 'absolute';
  const ALIGN_SELF = 'center';
  useEffect(() => {
    async function getData() {
      let cardArray: any = [];
      await firebase
        .database()
        .ref('cards')
        .once('value')
        .then(async (event) => {
          let i = [JSON.parse(JSON.stringify(event, null, 2))];
          i.map((card) => {
            for (let e in card) {
              cardArray.push(card[e]);
            }
          });
          await setCards(cardArray);
        });
      setIsLoading(false);
    }
    setIsLoading(true);
    getData();
  }, []);

  return (
    <Block>
      {/* list of views */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            style={{
              position: POSITION_VALUE,
              alignSelf: ALIGN_SELF,
              bottom: BOTTOM_VALUE,
            }}
          />
        ) : (
          <Block marginTop={sizes.sm}>
            {cards?.map((card: any) => (
              <Card {...card} key={`card-${card.cardId}`} />
            ))}
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default Home;
