import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  RefreshControl,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Block, Button, Image, Text, Tag} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import {firebase} from '../services/firebase';

const isAndroid = Platform.OS === 'android';

const UserProfile = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {user} = useRoute().params as any;
  const {assets, colors, sizes} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [skills, setSkills] = useState([]);
  const getData = () => {
    setIsLoading(true);
    if (!user.skills) {
      setIsLoading(false);
      return;
    }
    let skillArray: any = [];
    let allSkills = [JSON.parse(JSON.stringify(user.skills, null, 2))];
    allSkills.map((skill: any) => {
      for (let e in skill) {
        skillArray.push(skill[e]);
      }
      setSkills(skillArray);
    });
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {}}
            tintColor={isDark ? colors.white : colors.black}
          />
        }
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
                {user.type === 'Talented' &&
                user.id.toString() !==
                  firebase.auth().currentUser?.displayName ? (
                  <Button
                    white
                    outlined
                    shadow={false}
                    radius={sizes.m}
                    onPress={() => {
                      navigation.navigate('Hire', {requested: user});
                    }}>
                    <Block
                      justify="center"
                      radius={sizes.m}
                      paddingHorizontal={sizes.m}
                      color="rgba(255,255,255,0.2)">
                      <Text white bold transform="uppercase">
                        {t('profile.hire')}{' '}
                      </Text>
                    </Block>
                  </Button>
                ) : null}
                {user.github ? (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.sm}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    onPress={() => {
                      Linking.openURL(user.github);
                    }}>
                    <Ionicons
                      size={18}
                      name="logo-github"
                      color={colors.white}
                    />
                  </Button>
                ) : null}
                {user.linkedin ? (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    onPress={() => {
                      Linking.openURL(user.linkedin);
                    }}>
                    <Ionicons
                      size={18}
                      name="logo-linkedin"
                      color={colors.white}
                    />
                  </Button>
                ) : null}
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
            </Block>
          </Block>

          {/* Profile: Skills */}
          <Block paddingHorizontal={sizes.sm}>
            {isLoading ? (
              <ActivityIndicator size={'small'} />
            ) : user.type === 'Talented' ? (
              <>
                <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
                  {t('profile.skills')}
                </Text>
                <Block wrap="wrap" justify="space-between" row>
                  {skills?.map((skill: any) => (
                    <Tag {...skill} key={`skill-${skill.skillId}`} />
                  ))}
                </Block>
              </>
            ) : null}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default UserProfile;
