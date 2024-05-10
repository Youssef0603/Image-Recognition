import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useQuickode} from '../../contexts/Quickode';
import {ToastPosition} from '@backpackapp-io/react-native-toast';

const HomeScreen = (props: any) => {
  const {
    isAuthenticated,
    isLoading,
    setToast,
    toggleBottomSheet,
    toggleAppError,
  } = useQuickode();

  useEffect(() => {
    setTimeout(() => {
      setToast('This is a toast message', {
        position: ToastPosition.TOP,
        styles: {
          view: {backgroundColor: 'red'},
          text: {color: 'white'},
        },
      });

      // toggleBottomSheet(false, ['25%', '30%'], <Text>Hey There!</Text>);
      // toggleAppError(true, 'Error', 'This is an error message');
    }, 2000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
