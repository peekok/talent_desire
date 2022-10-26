import React from 'react';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import {useTheme, useData} from '../hooks/';

const MiniTag = (skill: any) => {
  const {assets, colors, sizes} = useTheme();
  const {isDark} = useData();
  const CARD_WIDTH = 150;
  const TOP_VALUE = 2;
  return (
    <Block
      card
      color={isDark ? colors.background : colors.card}
      flex={0}
      row
      marginBottom={sizes.sm}
      width={CARD_WIDTH}>
      <Image
        source={assets.warning}
        color={colors.secondary}
        style={{marginTop: sizes.s, marginRight: sizes.s, top: TOP_VALUE}}
      />
      <Block
        paddingTop={sizes.s}
        justify="space-between"
        paddingLeft={0}
        paddingBottom={0}>
        <Text
          p
          color={isDark ? colors.white : colors.black}
          marginBottom={sizes.s}
          size={10}>
          {skill?.skillName}
        </Text>
      </Block>
    </Block>
  );
};

export default MiniTag;
