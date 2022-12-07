import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useData, useTheme} from '../hooks/';
import {Block, Card} from '../components/';
import {firebase} from '../services/firebase';
const Home = () => {
  //const {t} = useTranslation();
  const [cards, setCards]: any = useState();
  const {sizes, colors} = useTheme();
  const {isDark} = useData();
  const [isLoading, setIsLoading] = useState(true);
  async function getData() {
    setIsLoading(true);
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
  useEffect(() => {
    getData();
  }, []);

  return (
    <Block>
      {/* list of views */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={getData}
            tintColor={isDark ? colors.white : colors.black}
          />
        }
        contentContainerStyle={{paddingBottom: sizes.l}}>
        {isLoading ? null : (
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
