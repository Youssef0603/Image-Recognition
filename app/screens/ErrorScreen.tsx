import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from '../constants';
import {useSelector} from 'react-redux';

const ErrorScreen = ({props}: any) => {
  const {error} = useSelector((state: {app: any}) => state.app);

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.primary,
          }}>
          {error.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: Colors.secondary,
          }}>
          {error.description}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default ErrorScreen;
