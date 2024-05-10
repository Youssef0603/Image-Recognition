import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Show = (props: any) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Notification Details Screen</Text>
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

export default Show;
