import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text, Tag, Modal} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import {firebase} from '../services/firebase';

const isAndroid = Platform.OS === 'android';

const Profile = () => {
  const {user} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {assets, colors, sizes} = useTheme();
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const skillList: any = [
    'C/C++',
    'C#',
    'Java',
    'Swift',
    'PHP',
    'Python',
    'JavaScript',
    'TypeScript',
    'Ruby',
    'React',
    'Vue.js',
    'Angular.js',
    'Django',
    'Web Development',
    'CSS',
    'SCSS',
    'SQL',
    'NoSQL',
    'Full-Stack Dev',
    'Mobile Development',
    'Gaming Development',
  ];
  const [showSkillsModal, setSkillsModal] = useState(false);
  function addSkill(skill: string) {
    setIsLoading(true);
    let found = skills.find((s: any) => s.skillName === skill);
    if (found) {
      console.log('I found you...');
      setIsLoading(false);
      return;
    }
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser?.displayName}`)
      .child('skills')
      .push({
        skillId: Math.floor(Math.random() * (34919 - 1)),
        skillName: skill,
      });
    setIsLoading(false);
  }
  const getData = () => {
    setIsLoading(true);
    let skillArray: any = [];
    firebase
      .database()
      .ref(`users/${firebase.auth().currentUser?.displayName}`)
      .child('skills')
      .get()
      .then((newSkills: any) => {
        let allSkills = [JSON.parse(JSON.stringify(newSkills, null, 2))];
        allSkills.map((skill: any) => {
          for (let e in skill) {
            skillArray.push(skill[e]);
          }
          setSkills(skillArray);
        });
      });
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getData} />
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
                <Modal
                  visible={showSkillsModal}
                  onRequestClose={() => setSkillsModal(false)}>
                  <FlatList
                    keyExtractor={(index) => `${index}`}
                    data={skillList}
                    renderItem={({item}) => (
                      <Button
                        marginBottom={sizes.sm}
                        onPress={() => {
                          addSkill(item);
                          setSkillsModal(false);
                        }}>
                        <Text p white semibold transform="uppercase">
                          {item}
                        </Text>
                      </Button>
                    )}
                  />
                </Modal>
                <Button
                  white
                  outlined
                  shadow={false}
                  radius={sizes.m}
                  onPress={() => {
                    setSkillsModal(true);
                  }}>
                  <Block
                    justify="center"
                    radius={sizes.m}
                    paddingHorizontal={sizes.m}
                    color="rgba(255,255,255,0.2)">
                    <Text white bold transform="uppercase">
                      {t('profile.addSkills')}
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
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
