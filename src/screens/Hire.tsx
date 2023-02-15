import React, {useState, useCallback} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useData, useTheme, useTranslation} from '../hooks/';
import {useRoute} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {Alert, Block, Button, Input, Image, Text} from '../components/';
import {firebase} from '../services/firebase';
const isAndroid = Platform.OS === 'android';

interface IHire {
  date: string;
  message: string;
  accepted: boolean;
}

const Hire = () => {
  const {t} = useTranslation();
  const {isDark, user} = useData();
  const params: any = useRoute().params;
  const requestedTalented = params?.requested;
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();
  const [date, setDate] = useState('');
  const [requested, setRequested] = useState(false);
  const [order, setOrder] = useState<IHire>({
    date: '',
    message: '',
    accepted: false,
  });
  const handleChange = useCallback(
    (value: any) => {
      setOrder((state) => ({...state, ...value}));
    },
    [setOrder],
  );
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alert, setAlert] = useState({
    type: '',
    message: '',
  });
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
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const showDateTimePicker = () => {
    setIsDateTimePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDateTimePickerVisible(false);
  };

  const handleDatePicked = (date: Date) => {
    setDate(date.toLocaleString('en-US'));
    hideDateTimePicker();
  };
  const handleHire = () => {
    if (!order.date || !order.message) {
      return;
    }
    if (order.message && order.message.length < 10) {
      showAlert('danger', 'Message must be at least 10 characters');
      return;
    }
    if (!params.requested) {
      return;
    }
    try {
      setRequested(true);
      const id = Math.floor(Math.random() * 10000);
      // Append order to user's orders
      firebase
        .database()
        .ref(`users/${firebase.auth().currentUser?.displayName}/orders/${id}`)
        .set({
          id: id,
          message: order.message,
          date: order.date,
          accepted: false,
          sender: true,
          user: requestedTalented,
        });

      // Append order to requested user's orders
      firebase.database().ref(`users/${params.requested.id}/orders/${id}`).set({
        id: id,
        message: order.message,
        date: order.date,
        accepted: false,
        sender: false,
        user,
      });

      showAlert('success', 'Order sent successfully');
      navigation.navigate('Home');
    } catch (e) {
      showAlert('danger', 'Something went wrong');
    }
  };
  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{}}>
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
              {t('hire.title')}
            </Text>
          </Image>
        </Block>
        {/* hire form */}
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
                <DateTimePicker
                  isVisible={isDateTimePickerVisible}
                  mode="datetime"
                  display="inline"
                  minimumDate={new Date()}
                  onConfirm={handleDatePicked}
                  onCancel={hideDateTimePicker}
                  onChange={(value) => handleChange({date: value})}
                />
                <Button
                  flex={1}
                  primary
                  outlined
                  onPress={showDateTimePicker}
                  marginBottom={sizes.sm}>
                  <Text p bold transform="uppercase">
                    <Ionicons
                      name="calendar-outline"
                      color={isDark ? colors.white : colors.black}
                      size={16}
                    />
                    {`  ${date.length <= 0 ? t('hire.date') : date}`}
                  </Text>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.s}
                  style={{height: 200}}
                  multiline
                  label={t('hire.msg')}
                  keyboardType="default"
                  placeholder={t('hire.msgPlaceholder')}
                  onChangeText={(value) => handleChange({message: value})}
                />
                <Button
                  onPress={handleHire}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}
                  disabled={requested || !order.message || !order.date}>
                  <Text bold white transform="uppercase">
                    {t('hire.send')}
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

export default Hire;
