import axios from 'axios';
import publicIP from 'react-native-public-ip';
import DeviceInfo from 'react-native-device-info';
import {I18nManager, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, COUNTRY} from '@env';

const baseURL = `${API_URL}/api`;

const getDeviceId = () => {
  DeviceInfo.getUniqueId()
    .then(id => {
      return id;
    })
    .catch(e => {
      console.error(e);
    });
};

const getDeviceIp = () => {
  publicIP()
    .then(ip => {
      return ip;
    })
    .catch(e => {
      console.error(e);
    });
};

const fetchClient = () => {
  const uniqueId = getDeviceId();
  const ip = getDeviceIp();

  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use(
    async config => {
      config.headers['ip'] = ip;
      config.headers['country'] = COUNTRY ?? '';
      config.headers['os'] = Platform.OS;
      config.headers['device-id'] = uniqueId;
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] =
        config.headers['Content-Type'] || 'application/json';
      config.headers['lang'] = I18nManager.isRTL ? 'ar' : 'en';
      config.headers['version'] = DeviceInfo.getVersion();

      const user = await AsyncStorage.getItem('user');
      if (user) {
        let apiToken = await AsyncStorage.getItem('api_token');
        config.headers['Authorization'] = `Bearer ${apiToken}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return instance;
};

export default fetchClient();
