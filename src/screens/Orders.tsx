import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';
import {firebase} from '../services/firebase';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const Order = () => {
  const {assets, sizes} = useTheme();
  const {t} = useTranslation();
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
  orders.map((order: any) => {
    console.log(order);
  });
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
              source={{uri: order.requester?.avatar}}
              style={{
                width: sizes.xxl,
                height: sizes.xxl,
                borderRadius: sizes.s,
              }}
            />
            <Block marginLeft={sizes.s}>
              <Text p semibold>
                {order.requester?.name}
              </Text>
              <Text p gray>
                Price: {order.price}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('UserProfile', {user: order.requester});
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
              <Text p black>
                Order Details:
              </Text>
              <Text p gray>
                {order.msg}
              </Text>
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
                  marginTop: 5,
                }}
                primary
                onPress={() => {
                  console.log('hello');
                }}>
                <Ionicons name={'checkmark'} color={colors.white} size={28} />
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
                  marginTop: 5,
                  marginRight: 60,
                }}
                secondary
                onPress={() => {
                  console.log('not hello');
                }}>
                <Ionicons
                  name={'close-outline'}
                  color={colors.white}
                  size={28}
                />
              </Button>
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
