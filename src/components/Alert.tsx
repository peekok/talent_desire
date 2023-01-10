import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View, Platform} from 'react-native';

import {useTheme} from '../hooks/';
import {IAlertProps} from '../constants/types';

import Block from './Block';
import Text from './Text';
const Alert = ({
  id = 'Alert',
  type,
  message,
  isVisible,
  style,
  ...props
}: IAlertProps) => {
  const {sizes, colors} = useTheme();
  const styles = StyleSheet.create({
    modalContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
    },
    modalBody: {
      backgroundColor: 'transparent',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      zIndex: 2,
      height: '200%', // You can adjust this value as per your requirement
      width: '100%',
    },
  });
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    if (isVisible) {
      slideIn();
    } else {
      slideOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // generate component testID or accessibilityLabel based on Platform.OS
  const alertID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};
  return (
    <View>
      {isVisible && (
        <Animated.View
          style={[
            style,
            styles.modalContainer,
            {
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0],
                  }),
                },
              ],
            },
          ]}>
          <View {...alertID} {...props} style={styles.modalBody}>
            <Block>
              <Block
                card
                flex={1}
                color={type === 'danger' ? colors.danger : colors.success}>
                <Block
                  flex={0}
                  marginTop={sizes.m}
                  paddingHorizontal={sizes.padding}>
                  <Text color={colors.white} center>
                    {message}
                  </Text>
                </Block>
              </Block>
            </Block>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default React.memo(Alert);
