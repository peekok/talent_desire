import React, {useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useData, useTranslation} from '../hooks/';
import {Block, Button, Switch, Image, Modal, Text} from '../components/';

// buttons example
const Buttons = () => {
  const {isDark, handleIsDark} = useData();
  const {t} = useTranslation();
  const {assets, colors, sizes, gradients} = useTheme();
  const navigation = useNavigation();
  const [showLanguageModal, setLanguageModal] = useState(false);
  const [language, setLanguage] = useState('en');
  const {setLocale} = useTranslation();
  return (
    <Block paddingHorizontal={sizes.padding}>
      <Text p semibold marginBottom={sizes.s}>
        {t('settings.language')}
      </Text>
      <Block row justify="space-between" marginBottom={sizes.base}>
        <Button
          flex={1}
          row
          color={isDark ? colors.dark : colors.light}
          onPress={() => setLanguageModal(true)}>
          <Block
            row
            align="center"
            justify="space-between"
            paddingHorizontal={sizes.sm}>
            <Text bold center transform="uppercase" marginRight={sizes.sm}>
              {language}
            </Text>
            <Image
              source={assets.arrow}
              color={colors.black}
              transform={[{rotate: '90deg'}]}
            />
          </Block>
        </Button>
        <Modal
          visible={showLanguageModal}
          onRequestClose={() => setLanguageModal(false)}>
          <FlatList
            keyExtractor={(index) => `${index}`}
            data={['en', 'ar']}
            renderItem={({item}) => (
              <Button
                marginBottom={sizes.sm}
                onPress={() => {
                  setLanguage(item);
                  setLanguageModal(false);
                }}>
                <Text p white semibold transform="uppercase">
                  {item}
                </Text>
              </Button>
            )}
          />
        </Modal>
      </Block>
      <Block row paddingVertical={sizes.m} paddingHorizontal={sizes.xs}>
        <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={colors.text}>{t('darkMode')}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
            }}
          />
        </Block>
      </Block>
      <Button
        gradient={gradients.primary}
        onPress={() => {
          setLocale(language);
          navigation.navigate('Home');
        }}>
        <Text color={colors.white}>{t('settings.save')}</Text>
      </Button>
    </Block>
  );
};

const Settings = () => {
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
          <Buttons />
        </Block>
      </Block>
    </Block>
  );
};
export default Settings;
