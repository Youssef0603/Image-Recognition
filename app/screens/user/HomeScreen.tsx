import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {useQuickode} from '../../contexts/Quickode';
import {ToastPosition} from '@backpackapp-io/react-native-toast';
import {Colors, Fonts} from '../../constants';
import ImageSVG from '../../assets/images/svg/ImageSVG.svg';
import CameraSVG from '../../assets/images/svg/CameraSVG.svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PERMISSIONS, openPhotoPicker, request} from 'react-native-permissions';
import axios from 'axios';
import {duration} from 'moment';

const HomeScreen = (props: any) => {
  const [photo, setPhoto] = useState(null);
  const [Labels, setLabels] = useState(null);

  const {
    isAuthenticated,
    isLoading,
    setToast,
    toggleBottomSheet,
    toggleAppError,
  } = useQuickode();

  const requestPermission = (permission: any) => {
    console.log(permission);
    request(permission).then(result => {
      console.log(result);
      if (
        result == 'granted' &&
        permission == 'android.permission.READ_EXTERNAL_STORAGE'
      ) {
        openImageLibrary();
      } else if (
        result == 'granted' &&
        permission == 'android.permission.CAMERA'
      ) {
        openCamera();
      }
    });
  };
  const openImageLibrary = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        setPhoto(response.assets[0].uri);
        console.log(response);
      },
    );
  };
  const openCamera = async () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        setPhoto(response.assets[0].uri);
      },
    );
  };
  const analyseImage = async () => {
    try {
      if (!photo) {
        // Alert('Please select and image first');
        setToast('please Select an image first ');
        return;
      }
      const fileReader = new FileReader();
      let base64;
      fileReader.onload = function (event) {
        base64 = event.target.result;
        console.log(base64Image);
      };

      const apiKey = 'AIzaSyBj7D8acA5iN1Rdv9jn393MenfkvpXlhIY';
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const requestData = {
        requests: [
          {
            image: {
              content: base64,
            },
            features: [{type: 'LABEL_DETECTION', maxResults: 5}],
          },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestData);
      setLabels(apiResponse.data.response);
    } catch (e) {
      console.log('e', e.response.data);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            paddingVertical: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,
            borderBottomColor: Colors.light_grey,
          }}>
          <Text
            style={{
              fontSize: 17,
              color: Colors.primary,
              fontFamily: Fonts.medium,
            }}>
            Image Recognition
          </Text>
        </View>
        <View style={{paddingVertical: 8, paddingHorizontal: 10}}>
          <Text
            style={{
              fontSize: 15,
              color: Colors.primary,
              fontFamily: Fonts.medium,
            }}>
            Choose an Image to test
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginVertical: 12,
          }}>
          <TouchableOpacity
            style={styles.rowContainer}
            activeOpacity={0.7}
            onPress={() => {
              requestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            }}>
            <ImageSVG height={28} width={28} />
            <Text style={styles.containerText}>Pick Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rowContainer}
            activeOpacity={0.7}
            onPress={() => {
              requestPermission(PERMISSIONS.ANDROID.CAMERA);
            }}>
            <CameraSVG height={28} width={28} />
            <Text style={styles.containerText}>Take Image</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Colors.light_grey,
            marginVertical: 8,
            marginHorizontal: 25,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 6,
          }}>
          <Image
            source={{
              uri:
                photo ??
                'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png',
            }}
            height={160}
            width={170}
            resizeMode="contain"
            style={{borderRadius: 12}}
          />
        </View>
        <TouchableOpacity
        onPress={()=>analyseImage()}
          style={{
            alignSelf: 'center',
            borderRadius: 8,
            borderColor: Colors.light_grey,
            borderWidth: 1,
            paddingVertical: 7,
            paddingHorizontal: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.white,
            shadowColor: Colors.primary,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 1,
            marginTop:15
          }}>
          <Text
            style={{
              color: Colors.primary,
              fontSize: 15,
              fontFamily: Fonts.regular,
            }}>
            Analyse Image
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    padding: 12,
    height: 90,
    width: 100,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.secondary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerText: {
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
});

export default HomeScreen;
