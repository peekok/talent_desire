import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/core';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Image, Text, MiniTag} from '../components/';
import {TouchableOpacity} from 'react-native';

const UserCard = (talented: any) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    let sk = [talented?.skills];
    let skillsDefined: any = [];
    sk.forEach((s) => {
      for (let i in s) {
        skillsDefined.push(s[i]);
      }
    });
    setSkills(skillsDefined);
  }, [talented?.skills]);
  return (
    <Block marginTop={sizes.s}>
      <Block
        key={`talented-${talented.fullName}`}
        card
        flex={0}
        marginBottom={sizes.sm}
        width={
          ((sizes.width - sizes.padding * 2 - sizes.sm) / 2) * 2 + sizes.sm
        }>
        <Image
          source={{uri: talented.avatar}}
          style={{
            width: sizes.xxl,
            height: sizes.xxl,
            borderRadius: sizes.s,
            marginLeft: sizes.s,
          }}
        />
        <Block marginLeft={sizes.s}>
          <Text p semibold>
            {talented.fullName}
          </Text>
          <Text p gray>
            Price: 50 per hour
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UserProfile', {user: talented});
            }}>
            <Block row flex={0} align="center">
              <Text
                p
                color={colors.link}
                semibold
                size={sizes.linkSize}
                marginRight={sizes.s}>
                {t('common.readMore')}
              </Text>
              <Image source={assets.arrow} color={colors.link} />
            </Block>
          </TouchableOpacity>
          <Block flex={0} row wrap={'wrap'} justify={'space-between'}>
            {skills?.map((skill: any) => (
              <MiniTag {...skill} key={`skill-${skill.skillId}`} />
            ))}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default UserCard;
