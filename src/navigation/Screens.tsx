import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Home,
  Profile,
  Login,
  Settings,
  Talented,
  UserProfile,
  BecomeTalented,
  Orders,
  Hire,
  Chat,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
const Stack = createStackNavigator();
export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Talented"
        component={Talented}
        options={screenOptions.profile}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={screenOptions.back}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BecomeTalented"
        component={BecomeTalented}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={screenOptions.profile}
      />
      <Stack.Screen
        name="Hire"
        component={Hire}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={screenOptions.profile}
      />
    </Stack.Navigator>
  );
};
