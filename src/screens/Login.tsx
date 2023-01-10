import React, {useCallback, useEffect, useState} from 'react';
import {Platform, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Alert, Block, Button, Input, Image, Text} from '../components/';
import {firebase} from '../services/firebase';
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import {IUser} from '../constants/types';
const isAndroid = Platform.OS === 'android';

interface ILogin {
  uid: string;
}
interface ILoginValidation {
  uid: boolean;
}

interface IVerify {
  code: string;
}
interface IVerifyValidation {
  code: boolean;
}

const Login = () => {
  const {isDark} = useData();
  const {handleUser} = useData();
  const {t} = useTranslation();
  const app = firebase.app();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });
  const Z_INDEX = 0;
  const [userData, setUserData]: any = useState<IUser>();
  const [verificationId, setVerificationId] = useState('');
  const recaptchaVerifier: any = React.useRef(null);
  const [isValid, setIsValid] = useState<ILoginValidation>({
    uid: false,
  });
  const [isCodeValid, setIsCodeValid] = useState<IVerifyValidation>({
    code: false,
  });
  const [login, setLogin] = useState<ILogin>({
    uid: '',
  });
  const [verify, setVerify] = useState<IVerify>({
    code: '',
  });
  const {assets, colors, gradients, sizes} = useTheme();

  // Show the alert and close it after 5 seconds
  const showAlert = useCallback(
    (type: string, message: string) => {
      setAlert({type, message});
      setIsAlertVisible(true);
      setTimeout(() => {
        setIsAlertVisible(false);
      }, 5500);
    },
    [setAlert, setIsAlertVisible],
  );
  const handleChange = useCallback(
    (value: any) => {
      setLogin((state) => ({...state, ...value}));
      setVerify((state) => ({...state, ...value}));
    },
    [setLogin, setVerify],
  );
  const handleVerification = useCallback(async () => {
    if (alreadyRequested) {
      return;
    }
    let user: IUser | undefined;
    await firebase
      .database()
      .ref(`users/${login.uid}`)
      .once('value', async (data) => {
        if (data.exists()) {
          user = data.val();
          setUserData(user);
        } else {
          showAlert('danger', 'User does not exist.');
          return;
        }
      })
      .catch((error) => {
        return console.error(error);
      });
    try {
      if (!user?.phoneNumber) {
        return;
      }
      setAlreadyRequested(true);
      setTimer(60);
      setTimeout(() => {
        setAlreadyRequested(false);
      }, 63000);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verifyId = await phoneProvider.verifyPhoneNumber(
        user?.phoneNumber,
        recaptchaVerifier.current,
      );
      setVerificationId(verifyId);
      showAlert('success', 'Verification Code has been sent to your phone.');
    } catch (error) {
      console.error(error);
    }
  }, [alreadyRequested, login.uid, showAlert]);

  const handleSignIn = useCallback(async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(!isLoading);
    if (!Object.values(isValid).includes(false) && !isLoading) {
      /** send/save login data */
      try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verify.code,
        );
        await firebase.auth().signInWithCredential(credential);
        await firebase.auth().currentUser?.updateProfile({
          displayName: login.uid,
        });
        handleUser(userData);
        showAlert('success', "You're Logged in.");
        navigation.navigate('Home');
      } catch (error: any) {
        showAlert('danger', `There was an error: ${error.message}`);
        setIsLoading(!isLoading);
      }
    }
  }, [
    handleUser,
    isLoading,
    isValid,
    login.uid,
    navigation,
    showAlert,
    userData,
    verificationId,
    verify.code,
  ]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      uid: regex.uid.test(login.uid),
    }));
    setIsCodeValid((state) => ({
      ...state,
      code: regex.code.test(verify.code),
    }));
    if (!timer) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [login, setIsValid, timer, verify.code]);

  return (
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
      {isAlertVisible && (
        <Alert
          type={alert.type}
          message={alert.message}
          isVisible={isAlertVisible}
        />
      )}
    </Block>
  );
};

export default Login;
