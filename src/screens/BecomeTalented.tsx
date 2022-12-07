import React from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Image, Text} from '../components/';
import {firebase} from '../services/firebase';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
const isAndroid = Platform.OS === 'android';

const BecomeTalented = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const app = firebase.app();
  const navigation = useNavigation();
  const Z_INDEX = 0;
  const recaptchaVerifier: any = React.useRef(null);
  const {assets, colors, gradients, sizes} = useTheme();

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
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={t('login.uid')}
                keyboardType="numeric"
                disabled={alreadyRequested}
                placeholder={t('login.uidPlaceholder')}
                success={Boolean(login.uid && isValid.uid)}
                danger={Boolean(login.uid && !isValid.uid)}
                onChangeText={(value) => handleChange({uid: value})}
              />
              <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={app.options}
                attemptInvisibleVerification
              />
              <Button
                onPress={handleVerification}
                marginVertical={sizes.s}
                outlined
                primary
                disabled={alreadyRequested}>
                <Text
                  bold
                  color={isDark ? colors.white : colors.black}
                  transform="uppercase">
                  {alreadyRequested ? '' : t('login.requestCode')}
                  {alreadyRequested && timer}
                </Text>
              </Button>
              <Input
                autoCapitalize="none"
                marginBottom={sizes.m}
                label={t('login.code')}
                keyboardType="numeric"
                disabled={!alreadyRequested}
                placeholder={t('login.codePlaceholder')}
                success={Boolean(verify.code && isCodeValid.code)}
                danger={Boolean(verify.code && !isCodeValid.code)}
                onChangeText={(value) => handleChange({code: value})}
              />
              <Button
                onPress={handleSignIn}
                marginVertical={sizes.s}
                gradient={gradients.primary}
                disabled={
                  Object.values(isCodeValid).includes(false) || isLoading
                }>
                <Text bold white transform="uppercase">
                  {isLoading ? '' : t('login.signin')}
                  {isLoading && <ActivityIndicator size={'small'} />}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  </Block>;
};

export default BecomeTalented;
