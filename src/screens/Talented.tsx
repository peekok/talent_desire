import React, {useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme, useTranslation} from '../hooks/';
import {Block, Input} from '../components/';
import {firebase} from '../services/firebase';
import UserCard from '../components/UserCard';
const Talented = () => {
  const {t} = useTranslation();
  const {colors, sizes} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [talented, setTalented] = useState([]);
  useEffect(() => {
    async function getData() {
      firebase
        .database()
        .ref('users')
        .on('value', (requests) => {
          let x = [JSON.parse(JSON.stringify(requests, null, 2))];
          let y: any = [];
          x.forEach((talenter) => {
            for (let i in talenter) {
              y.push(talenter[i]);
            }
          });
          y = y.filter((r: any) => r.type === 'Talented');
          setTalented(y);
        });
      setIsLoading(false);
    }
    setIsLoading(true);
    getData();
  }, []);
  return (
    <Block>
      {/* search input */}
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block>

      {/* products list */}
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.l}}>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            style={{position: 'absolute', alignSelf: 'center', bottom: 0}}
          />
        ) : (
          <Block marginTop={sizes.sm}>
            {talented?.map((talenter: any) => (
              <UserCard key={`hi-${talenter?.fullName}`} {...talenter} />
            ))}
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default Talented;
