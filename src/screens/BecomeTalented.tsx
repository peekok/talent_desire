import React from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
const isAndroid = Platform.OS === 'android';

const BecomeTalented = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const Z_INDEX = 0;
  const {assets, colors, sizes} = useTheme();

  <Block safe marginTop={sizes.md}>
    <Block paddingHorizontal={sizes.s}>
      <Block flex={0} style={{zIndex: Z_INDEX}}>
        <Image
          background
          resizeMode="cover"
          padding={sizes.sm}
          radius={sizes.cardRadius}
          source={assets.background}
          height={sizes.height * 0.3}>
          <Button
            row
            flex={0}
            justify="flex-start"
            onPress={() => navigation.goBack()}>
            <Image
              radius={0}
              width={10}
              height={18}
              color={colors.white}
              source={assets.arrow}
              transform={[{rotate: '180deg'}]}
            />
            <Text p white marginLeft={sizes.s}>
              {t('common.goBack')}
            </Text>
          </Button>

          <Text h4 center white marginBottom={sizes.md}>
            {t('login.title')}
          </Text>
        </Image>
      </Block>
      {/* login form */}
      <Block
        keyboard
        behavior={!isAndroid ? 'padding' : 'height'}
        marginTop={-(sizes.height * 0.2 - sizes.l)}>
        <Block
          flex={0}
          radius={sizes.sm}
          marginHorizontal="8%"
          shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
        >
          <Block
            blur
            flex={0}
            intensity={90}
            radius={sizes.sm}
            overflow="hidden"
            justify="space-evenly"
            tint={colors.blurTint}
            paddingVertical={sizes.sm}>
            <Block paddingHorizontal={sizes.sm}>
              {/* TODO: Add the rest of the form */}
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  </Block>;
};

export default BecomeTalented;
