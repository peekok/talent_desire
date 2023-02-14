import React, {useState} from 'react';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Ionicons} from '@expo/vector-icons';
import {Block, Button, Input, Image, Text} from '../components/';
import {IUser} from '../constants/types';
const isAndroid = Platform.OS === 'android';

interface IHire {
  date: Date;
  message: string;
  requester: IUser;
  accepted: boolean;
}
const Hire = () => {
  const {t} = useTranslation();
  const {isDark} = useData();
  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();
  const [date, setDate] = useState(Date);
  // const [registration, setRegistration] = useState<IHire>({
  //   date: date,
  //   message: '',
  //   requester: {
  //     avatar: '',
  //     fullName: '',
  //     phoneNumber: '',
  //     type: '',
  //     stats: {
  //       jobsDone: 0,
  //       rating: 0,
  //     },
  //     skills: {
  //       skillId: 0,
  //       skillName: '',
  //     },
  //     github: '',
  //     linkedin: '',
  //   },
  // });
  // const handleChange = useCallback(
  //   (value: any) => {
  //     setRegistration((state) => ({...state, ...value}));
  //   },
  //   [setRegistration],
  // );
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
  const [message, setMessage] = useState('');
  const handleHire = () => {};
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
                  //onChange={(value) => handleChange(value)}
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
                    {`  ${date.length <= 0 ? t('add.date') : date}`}
                  </Text>
                </Button>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.s}
                  style={{height: 200}}
                  multiline
                  label={t('hire.msg')}
                  keyboardType="numeric"
                  placeholder={t('hire.msgPlaceholder')}
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                />
                <Button
                  onPress={handleHire}
                  marginVertical={sizes.s}
                  gradient={gradients.primary}>
                  <Text bold white transform="uppercase">
                    {t('hire.send')}
                  </Text>
                </Button>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Hire;
