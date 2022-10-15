/* TODO: EditProfile.tsx
1. Editing profile data [About me] only.
2. Talented can add Skills.
3. Talented can add photos.
4. USERS CANNOT EDIT THEIR PROFILE!!
*/
import React from 'react';
import {Block} from '../components';
import {useTheme} from '../hooks';

const EditProfile = () => {
  const {sizes} = useTheme();
  return (
    <Block
      scroll
      paddingHorizontal={sizes.padding}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: sizes.l}}>
      <Block marginTop={sizes.sm} />
    </Block>
  );
};

export default EditProfile;
