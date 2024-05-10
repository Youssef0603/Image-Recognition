import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoaded} from '../redux/slices/appSlice';
import {setApiToken, setUser} from '../redux/slices/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFcmToken,
  registerListenerWithFCM,
} from '../utils/helpers/fcmHelpers';
import {RepositoryFactory} from '../repositories/RepositoryFactory';
import {Colors} from '../constants';

const notificationRepository = RepositoryFactory.get('notification');
const userRepository = RepositoryFactory.get('user');

const SplashScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });

    initialize();
    // const unsubscribe = registerListenerWithFCM();
    // return unsubscribe;
  }, []);

  const initialize = async () => {
    try {
      const [user, apiToken] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('api_token'),
      ]);

      // const token = await getFcmToken();
      // storeFcmToken(token, !(user && apiToken));

      if (user && apiToken) {
        await loadUserProfile(apiToken);
      } else {
        dispatch(setLoaded(true));
      }
    } catch (e) {
      console.error('Initialization failed:', e);
    }
  };

  const storeFcmToken = async (token: unknown, unauthorized: boolean) => {
    try {
      await notificationRepository.storeFcmToken({token, unauthorized});
      console.log(`FCM Token Stored: ${token}`);
    } catch (e) {
      console.error('Error storing FCM token:', e);
    }
  };

  const loadUserProfile = async (apiToken: string) => {
    try {
      const res = await userRepository.getProfile();
      const profile = {...res.data.data, api_token: apiToken, actor: 'main'};
      await AsyncStorage.setItem('user', JSON.stringify(profile));
      dispatch(setApiToken(apiToken));
      dispatch(setUser(profile));
      dispatch(setLoaded(true));
    } catch (e) {
      console.error('Failed to load user profile:', e);
      dispatch(setLoaded(true)); // Ensure state is updated even on error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.appNameContainer}>
        <Text>App Name</Text>
      </View>
      <ActivityIndicator size="large" color={Colors.black} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appNameContainer: {
    marginBottom: 18,
  },
});

export default SplashScreen;
