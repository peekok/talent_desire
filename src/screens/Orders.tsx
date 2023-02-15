import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
import {firebase} from '../services/firebase';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const Order = () => {
  const {assets, gradients, sizes} = useTheme();
  const {t} = useTranslation();
  const {isDark} = useData();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  const {colors} = useTheme();

  const getOrders = useCallback(() => {
    console.log('getOrders');
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser?.displayName}/orders`)
      .on('value', (allOrders) => {
        let x = [JSON.parse(JSON.stringify(allOrders, null, 2))];
        let y: any = [];
        x.forEach((req) => {
          for (let i in req) {
            y.push(req[i]);
          }
        });
        setOrders(y);
        setIsLoading(false);
      });
  }, []);
  const handleReject = (order: any) => {
    console.log(order, 'is rejected');
    firebase
      .database()
      .ref(
        `users/${firebase.auth().currentUser?.displayName}/orders/${order.id}`,
      )
      .remove();
    firebase
      .database()
      .ref(`users/${order.user?.id}/orders/${order.id}`)
      .remove();
  };
  const handleApprove = (order: any) => {
    console.log(order, 'is approved');
    firebase
      .database()
      .ref(
        `users/${firebase.auth().currentUser?.displayName}/orders/${order.id}`,
      )
      .update({accepted: true});
    firebase
      .database()
      .ref(`users/${order.user?.id}/orders/${order.id}`)
      .update({accepted: true});
  };
  const handleChat = (order: any) => {
    navigation.navigate('Chat', {order: order});
  };
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        orders?.map((order: any) => (
          <Block
            key={`order-${order.id}`}
            card
            flex={0}
            row
            marginBottom={sizes.sm}
            width={
              ((sizes.width - sizes.padding * 2 - sizes.sm) / 2) * 2 + sizes.sm
            }>
            <Image
              source={{uri: order.user?.avatar}}
              style={{
                width: sizes.xxl,
                height: sizes.xxl,
                borderRadius: sizes.s,
              }}
            />
            <Block marginLeft={sizes.s}>
              <Text p semibold>
                {order.user?.fullName}
              </Text>
              <Text p gray>
                {t('orders.price')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UserProfile', {user: order.user});
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
              <Text p color={isDark ? colors.white : colors.black}>
                {t('orders.details')}
              </Text>
              <Text p gray>
                {order.message}
              </Text>
              {order.sender && !order.accepted ? (
                <Text
                  p
                  style={{
                    width: 100,
                    flex: 0,
                    position: 'absolute',
                    justifyContent: 'flex-end',
                    right: 0,
                    marginTop: 38,
                  }}>
                  {t('orders.pending')}
                </Text>
              ) : null}
              {!order.sender && !order.accepted ? (
                <>
                  <Button
                    row
                    flex={0}
                    radius={15}
                    style={{
                      width: 20,
                      flex: 0,
                      position: 'absolute',
                      justifyContent: 'flex-end',
                      right: 0,
                      marginTop: 30,
                    }}
                    primary
                    onPress={() => {
                      handleApprove(order);
                    }}>
                    <Ionicons
                      name={'checkmark'}
                      color={colors.white}
                      size={28}
                    />
                  </Button>
                  <Button
                    row
                    flex={0}
                    radius={15}
                    style={{
                      width: 20,
                      flex: 0,
                      position: 'absolute',
                      justifyContent: 'flex-end',
                      right: 0,
                      marginTop: 30,
                      marginRight: 60,
                    }}
                    secondary
                    onPress={() => {
                      handleReject(order);
                    }}>
                    <Ionicons
                      name={'close-outline'}
                      color={colors.white}
                      size={28}
                    />
                  </Button>
                </>
              ) : null}
              {order.accepted ? (
                <Button
                  row
                  flex={0}
                  radius={15}
                  style={{
                    width: 100,
                    flex: 0,
                    position: 'absolute',
                    justifyContent: 'flex-end',
                    right: 0,
                    marginTop: 30,
                  }}
                  gradient={gradients.primary}
                  onPress={() => {
                    handleChat(order);
                  }}>
                  <Text h5 white>
                    {t('orders.chat')}
                  </Text>
                </Button>
              ) : null}
            </Block>
          </Block>
        ))
      )}
    </Block>
  );
};

const Orders = () => {
  const {assets, sizes} = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);
  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: sizes.padding}}>
        <Block>
          <Order />
        </Block>
      </Block>
    </Block>
  );
};

export default Orders;
