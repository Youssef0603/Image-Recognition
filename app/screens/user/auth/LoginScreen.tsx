import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, Text, I18nManager} from 'react-native';
import {useLogin} from '../../../hooks/http/useAuthQuery';
import {QuickButton} from '../../../components/widgets';
import {t} from 'i18next';
import {useQuickode} from '../../../contexts/Quickode';

const LoginScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    mutate: login,
    isLoading: loginLoading,
    data: loginData,
    error: loginError,
  } = useLogin();

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });

    if (loginData) {
      handleSavingLoginData(loginData);
    }
  }, [loginData]);

  const handleLogin = () => {
    Keyboard.dismiss();
    login({
      email: email,
      password: password,
    });
  };

  const handleSavingLoginData = (data: Object) => {
    try {
      console.log('Login Data:', data);
      //todo: handle saving login data to storage
      //todo: navigate to home screen
    } catch (error) {
      console.log('Error saving login data:', error);
    }
  };

  return (
    <>
      <QuickButton
        title={t('login')}
        onPress={handleLogin}
        loading={loginLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default LoginScreen;
