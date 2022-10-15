import React, {createContext, useState} from 'react';
import {firebase} from '../services/firebase';
/** ANCHOR
 * This provider is created
 * to access user in whole app..
 */

export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (credential: any) => {
          try {
            await firebase.auth().signInWithCredential(credential);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.error(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
