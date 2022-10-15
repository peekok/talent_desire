import React from 'react';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import {ICard} from '../constants/types';
import {useTheme} from '../hooks';
import {TouchableWithoutFeedback} from 'react-native';

const Card = ({cardName, cardPicture, type}: ICard) => {
  const {sizes, colors} = useTheme();
  const isHorizontal = type !== 'vertical';
  const IMAGE_HEIGHT = isHorizontal ? 135 : 110;
  return (
    <TouchableWithoutFeedback>
      <Block card white padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode="cover"
          radius={sizes.cardRadius}
          height={IMAGE_HEIGHT}
          source={{uri: cardPicture}}>
          <Block color={colors.overlay} padding={sizes.padding}>
            <Text h4 center marginTop={sizes.md} white marginBottom={sizes.sm}>
              {cardName}
            </Text>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

export default Card;
