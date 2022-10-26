import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import {useTheme} from '../hooks/';
import {Swipeable} from 'react-native-gesture-handler';
import {firebase} from '../services/firebase';

// TODO: DELETE SKILL!
function deleteSkill(skill: any) {
  firebase
    .database()
    .ref(`users/${firebase.auth().currentUser?.displayName}/skills`)
    .child(skill.skillId)
    .remove();
}
const RightActions = (progress: any, dragX: any, skill: any) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          deleteSkill(skill);
        }}>
        <Block card row flex={0.7} color={'#FF0000'} width={70}>
          <Animated.Text
            style={{
              color: 'white',
              marginLeft: 3,
              fontWeight: 'bold',
              alignSelf: 'center',
              transform: [{scale}],
            }}>
            Delete
          </Animated.Text>
        </Block>
      </TouchableOpacity>
    </>
  );
};
const Tag = (skill: any) => {
  const {assets, colors, sizes} = useTheme();
  const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.l) / 2;
  const TOP_VALUE = 2;
  return (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        RightActions(progress, dragX, skill)
      }>
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
          <Text p marginBottom={sizes.s} size={15}>
            {skill?.skillName}
          </Text>
        </Block>
      </Block>
    </Swipeable>
  );
};

export default Tag;
