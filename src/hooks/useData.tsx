import React, {useCallback, useContext, useEffect, useState} from 'react';
import Storage from '@react-native-async-storage/async-storage';

import {IUseData, ITheme, IUser} from '../constants/types';

import {light, dark} from '../constants';
import {firebase} from '../services/firebase';
import {getAuth} from 'firebase/auth';
import appData from '../../app.json';

export const DataContext = React.createContext({});
export const DataProvider = ({children}: {children: React.ReactNode}) => {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState<ITheme>(light);
  const [user, setUser] = useState<IUser>();

  // get isDark mode from storage
  const getIsDark = useCallback(async () => {
    // get preference from storage
    const isDarkJSON = await Storage.getItem('isDark');
    if (isDarkJSON !== null) {
      // set isDark / compare if has updated
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  // handle isDark mode
  const handleIsDark = useCallback(
    (payload: boolean) => {
      // set isDark / compare if has updated
      setIsDark(payload);
      payload
        ? (appData.expo.splash.backgroundColor = '#000')
        : (appData.expo.splash.backgroundColor = '#fff');
      // save preference to storage
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark],
  );

  // handle users / profiles
  const handleUsers = useCallback(() => {}, []);

  // handle user
  const handleUser = useCallback(() => {
    // set user / compare if has updated
    const auth = getAuth();
    const authUser = auth.currentUser;
    if (authUser != null) {
      firebase.auth().onAuthStateChanged((currentUser: any) => {
        if (currentUser) {
          if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
            firebase
              .database()
              .ref('users')
              .child(currentUser?.displayName)
              .get()
              .then((data) => {
                let dataJSON: any = data.toJSON();
                setUser(dataJSON);
              });
          }
        } else {
          // User is signed out
          // ...
        }
      });
    }
  }, [user, setUser]);

  // get initial data for: isDark & language
  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  // change theme based on isDark updates
  useEffect(() => {
    setTheme(isDark ? dark : light);
  }, [isDark]);

  const contextValue = {
    isDark,
    handleIsDark,
    theme,
    setTheme,
    user,
    handleUsers,
    handleUser,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
