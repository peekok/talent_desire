import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Alert, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import Screens from './Screens';
import {Block, Text, Button, Image} from '../components';
import {useData, useTheme, useTranslation} from '../hooks';
import {firebase} from '../services/firebase';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      <Screens />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>,
) => {
  const {navigation} = props;
  const {t} = useTranslation();
  const {user, isDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to: any) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive],
  );
  const handleSignOut = () =>
    new Promise((resolve) => {
      Alert.alert(
        t('common.signout'),
        t('common.sure'),
        [
          {
            text: t('common.yes'),
            onPress: () => {
              firebase.auth().signOut();
              Updates.reloadAsync();
            },
          },
          {
            text: t('common.no'),
            onPress: () => {
              resolve('NO');
            },
          },
        ],
        {cancelable: false},
      );
    });
  // const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  // screen list for Drawer men
  let screens = [];
  if (!user) {
    screens = [
      {name: t('screens.home'), to: 'Home', icon: assets.home},
      {name: t('screens.login'), to: 'Login', icon: assets.login},
      {name: t('screens.settings'), to: 'Settings', icon: assets.settings},
    ];
  } else {
    screens = [
      {name: t('screens.home'), to: 'Home', icon: assets.home},
      {name: t('screens.talented'), to: 'Talented', icon: assets.star},
      {name: t('screens.order'), to: 'Orders', icon: assets.add},
      {name: t('screens.settings'), to: 'Settings', icon: assets.settings},
    ];
  }

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding} marginTop={sizes.s}>
        {user ? (
          <Block row justify="space-between" marginTop={sizes.sm}>
            <Block row>
              <Button
                row
                left={5}
                bottom={10}
                onPress={() => {
                  handleNavigation('Profile');
                }}>
                <Image
                  radius={40}
                  width={40}
                  height={40}
                  source={{uri: user.avatar}}
                />
                <Text bold h5 left={10}>
                  {user.fullName.split(' ')[0] + ' '}
                  <Ionicons
                    size={14}
                    name={user.type === 'User' ? 'person' : 'star-outline'}
                    color={isDark ? colors.white : colors.black}
                  />
                </Text>
              </Button>
            </Block>
            <Button
              flex={0}
              gradient={gradients.primary}
              marginBottom={sizes.base}
              left={2}
              onPress={() => handleSignOut()}>
              <Text white bold transform="uppercase">
                <Ionicons
                  size={18}
                  name="log-out-outline"
                  color={colors.white}
                />
              </Text>
            </Button>
          </Block>
        ) : null}
        {user && user.type === 'User' ? (
          <Block
            row
            justify="space-between"
            marginTop={sizes.s}
            marginBottom={sizes.s}>
            <Block row>
              <Button
                flex={1}
                tertiary
                row
                bottom={10}
                left={5}
                onPress={() => {
                  handleNavigation('BecomeTalented');
                }}>
                <Ionicons size={18} name="star" color={colors.white} />
                <Text bold white left={10}>
                  {t('screens.becomeTalented')}
                </Text>
              </Button>
            </Block>
          </Block>
        ) : null}
        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              marginTop={sizes.xs}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}
        <Block
          flex={0}
          row
          align="center"
          marginBottom={sizes.l}
          marginTop={
            user && user.type === 'User'
              ? sizes.xxl * 7.0
              : user && user.type === 'Talented'
              ? sizes.xxl * 8
              : sizes.xxl * 10.4
          }>
          <Image
            radius={0}
            width={33}
            height={33}
            source={assets.icon}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              {t('app.name')}
            </Text>
            <Text size={12} semibold>
              {t('app.motto')}
            </Text>
          </Block>
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients} = useTheme();
  const {isDark} = useData();
  const BACKGROUND_COLOR = isDark ? '#000000' : 'transparent';
  const FLEX = 1;
  const WIDTH = '60%';
  const BORDER_RIGHT_WIDTH = 0;
  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{
          backgroundColor: BACKGROUND_COLOR,
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: FLEX,
          width: WIDTH,
          borderRightWidth: BORDER_RIGHT_WIDTH,
          backgroundColor: BACKGROUND_COLOR,
        }}>
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
