import React, {useState, useLayoutEffect, useEffect} from 'react';
import {Chat, MessageType, defaultTheme} from '@flyerhq/react-native-chat-ui';
import {useRoute} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';
import {useTheme, useData} from '../hooks';
import {Block, Image} from '../components';
import {firebase} from '../services/firebase';

const ChatPage = () => {
  const {assets, colors, gradients, sizes} = useTheme();
  const {user, isDark} = useData();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const data = useRoute().params as any;
  const orderData = data?.order;
  const [messages, setMessages] = useState<MessageType.Any[]>([]);
  const getMessages = () => {
    firebase
      .database()
      .ref(
        `users/${firebase.auth().currentUser?.displayName}/orders/${
          orderData.id
        }/chat`,
      )
      .on('value', (snapshot) => {
        const allMessage = snapshot.val();
        const messageArray: MessageType.Any[] = [];
        if (allMessage) {
          Object.keys(allMessage).forEach((key) => {
            messageArray.push(allMessage[key]);
          });
        }
        setMessages(messageArray);
      });
  };
  useEffect(() => {
    getMessages();
  }, []);
  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages]);
    firebase
      .database()
      .ref(
        `users/${firebase.auth().currentUser?.displayName}/orders/${
          orderData.id
        }/chat/${message.id}`,
      )
      .set({
        author: user,
        createdAt: message.createdAt,
        id: message.id,
        type: message.type,
        text: message.text,
      });
    firebase
      .database()
      .ref(
        `users/${orderData.user?.id}/orders/${orderData.id}/chat/${message.id}`,
      )
      .set({
        author: user,
        createdAt: message.createdAt,
        id: message.id,
        type: message.type,
        text: message.text,
      });
  };
  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: Math.floor(Math.random() * 10000).toString(),
      text: message.text,
      type: 'text',
    };
    addMessage(textMessage);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  return (
    <Block safe>
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
        theme={{
          ...defaultTheme,
          colors: {
            ...defaultTheme.colors,
            background: isDark ? '#000000' : colors.background,
            primary: colors.primary,
            inputBackground: colors.dark,
          },
        }}
      />
    </Block>
  );
};

export default ChatPage;
