import React, {useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, Platform, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../constants';
import {PLAY_STORE_LINK, APP_STORE_LINK} from '@env';
import {QuickButton} from '../components';

const appStoreLink = APP_STORE_LINK;
const playStoreLink = PLAY_STORE_LINK;

const ForceUpdateScreen = ({navigation}: any) => {
  const {update_title, new_version, update_description} = useSelector(
    state => state.app.forceUpdate,
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });
  }, [navigation]);

  const openStore = useCallback(() => {
    const link = Platform.OS === 'ios' ? appStoreLink : playStoreLink;

    Linking.canOpenURL(link).then(
      supported => {
        if (supported) {
          Linking.openURL(link);
        } else {
          console.error('Cannot open URL:', link);
        }
      },
      err => console.error('Failed to open URL:', err),
    );
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.updateTitle}>{update_title}</Text>
      <View style={styles.versionInfo}>
        <Text style={styles.versionText}>{new_version}</Text>
      </View>
      <Text style={styles.descriptionText}>{update_description}</Text>
      <QuickButton title="Update" onPress={openStore} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  updateTitle: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  versionInfo: {
    paddingTop: 6,
  },
  versionText: {
    fontSize: 16,
    textAlign: 'left',
    color: Colors.black,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'left',
    paddingVertical: 18,
  },
});

export default ForceUpdateScreen;
