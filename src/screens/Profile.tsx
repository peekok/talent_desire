import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Alert, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text, Tag} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';
const Profile = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let skillArray: any = [];
      let s = [JSON.parse(JSON.stringify(user.skills, null, 2))];
      s.map((skill) => {
        for (let e in skill) {
          skillArray.push(skill[e]);
        }
        setSkills(skillArray);
      });
      setIsLoading(false);
    }
    setIsLoading(true);
    getData();
  }, [user.skills]);
  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}>
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
                {t('profile.title')}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={64}
                height={64}
                marginBottom={sizes.sm}
                source={{uri: user.avatar}}
              />
              <Text h5 center white>
                {user.fullName}
              </Text>
              <Text p center white>
                {user.type + ' '}
                <Ionicons
                  size={14}
                  name={user.type === 'User' ? 'person' : 'star-outline'}
                  color={colors.white}
                />
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    Alert.alert('Coming soon');
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t('profile.editProfile')}
                    </Text>
                  </Block>
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}>
                  <Ionicons size={18} name="logo-github" color={colors.white} />
                </Button>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}>
                  <Ionicons
                    size={18}
                    name="logo-linkedin"
                    color={colors.white}
                  />
                </Button>
              </Block>
            </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text h5>
                  {`${user.stats?.rating}/5 `}
                  <Image
                    source={assets?.star}
                    padding={sizes.s}
                    style={{
                      tintColor: colors.secondary,
                    }}
                  />
                </Text>
                <Text>{t('profile.rating')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{user.stats?.jobsDone || 0}</Text>
                <Text>{t('profile.jobsDone')}</Text>
              </Block>
              <Block align="center">
                <Text h5>{0 / 1000}k</Text>
                <Text>{t('profile.title')}</Text>
              </Block>
            </Block>
          </Block>

          {/* Profile: Skills */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.skills')}
            </Text>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : (
              <Block wrap="wrap" justify="space-between" row>
                {skills?.map((skill: any) => (
                  <Tag {...skill} key={`skill-${skill.skillId}`} />
                ))}
              </Block>
            )}
          </Block>

          {/* profile: photo album */}
          <Block paddingHorizontal={sizes.sm} marginTop={sizes.s}>
            <Block row align="center" justify="space-between">
              <Text h5 semibold>
                {t('common.album')}
              </Text>
              <Button>
                <Text p primary semibold>
                  {t('common.viewall')}
                </Text>
              </Button>
            </Block>
            <Block row justify="space-between" wrap="wrap">
              <Image
                resizeMode="cover"
                source={assets?.photo1}
                style={{
                  width: IMAGE_VERTICAL_SIZE + IMAGE_MARGIN / 2,
                  height: IMAGE_VERTICAL_SIZE * 2 + IMAGE_VERTICAL_MARGIN,
                }}
              />
              <Block marginLeft={sizes.m}>
                <Image
                  resizeMode="cover"
                  source={assets?.photo2}
                  marginBottom={IMAGE_VERTICAL_MARGIN}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
                <Image
                  resizeMode="cover"
                  source={assets?.photo3}
                  style={{
                    height: IMAGE_VERTICAL_SIZE,
                    width: IMAGE_VERTICAL_SIZE,
                  }}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
