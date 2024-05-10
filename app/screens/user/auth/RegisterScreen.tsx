import React, {useEffect, useState} from 'react';
import {StyleSheet, Keyboard, Text} from 'react-native';
import {useRegister} from '../../../hooks/http/useAuthQuery';
import {QuickButton} from '../../../components/widgets';

const RegisterScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    mutate: register,
    isLoading: registerLoading,
    data: registerData,
    error: registerError,
  } = useRegister();

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });

    if (registerData) {
      handleSavingRegisterData(registerData);
    }
  }, [registerData]);

  const handleRegister = () => {
    Keyboard.dismiss();
    register({
      email: email,
      password: password,
    });
  };

  const handleSavingRegisterData = (data: Object) => {
    try {
      console.log('Register Data:', data);
      //todo: handle saving register data to storage
      //todo: navigate to home screen
    } catch (error) {
      console.log('Error saving register data:', error);
    }
  };

  return (
    <>
      <QuickButton
        title="Register"
        onPress={handleRegister}
        loading={registerLoading}
      />
    </>
  );
};

const styles = StyleSheet.create({});

export default RegisterScreen;
