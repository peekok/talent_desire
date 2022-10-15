import React from 'react';

import Block from './Block';
import Image from './Image';
import Text from './Text';
import {useTheme} from '../hooks/';

const Tag = (skill: any) => {
  const {assets, colors, sizes} = useTheme();
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.l) / 2;
  const TOP_VALUE = 2;
  return (
    <Block card flex={0} row marginBottom={sizes.sm} width={CARD_WIDTH}>
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
        <Text p marginBottom={sizes.s}>
          {skill?.skillName}
        </Text>
      </Block>
    </Block>
  );
};

export default Tag;
