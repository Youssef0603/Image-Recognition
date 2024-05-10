import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const List = (props: any) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Notifications Screen</Text>
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

export default List;
