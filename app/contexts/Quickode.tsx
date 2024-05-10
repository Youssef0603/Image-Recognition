import React, {
  useState,
  ReactNode,
  useContext,
  createContext,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import {ToastPosition, Toasts, toast} from '@backpackapp-io/react-native-toast';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import {QuickodeContextInterface} from '../interfaces/QuickodeContextInterface';
import {StatusBar, Text, View, useWindowDimensions} from 'react-native';
import {Colors} from '../constants';

import {useDispatch} from 'react-redux';
import {setAppError} from '../redux/slices/appSlice';

import {useNetInfo} from '@react-native-community/netinfo';
import {changeLanguage, t} from 'i18next';
import RNRestart from 'react-native-restart';

const QuickodeContext = createContext<QuickodeContextInterface>(
  {} as QuickodeContextInterface,
);

function QuickodeProvider({children}: {children: ReactNode}) {
  const dispatch = useDispatch();
  const {type, isConnected} = useNetInfo();
  const {height: HEIGHT, width: WIDTH} = useWindowDimensions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [wifiConnected, setWifiConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [bottomSheetSnapPoints, setBottomSheetSnapPoints] = useState<string[]>([
    '1%',
    '35%',
  ]);

  useEffect(() => {
    checkInternetConnection();
  }, [isConnected]);

  const [bottomSheetChildren, setBottomSheetChildren] =
    useState<ReactNode>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [bottomSheetProps, setBottomSheetProps] = useState({
    enableDismissOnClose: true,
    enableContentPanningGesture: true,
    enableHandlePanningGesture: true,
  } as {
    enableDismissOnClose: boolean;
    enableContentPanningGesture: boolean;
    enableHandlePanningGesture: boolean;
  });

  const checkInternetConnection = () => {
    if (isConnected === false && wifiConnected === null) {
      setWifiConnected(false);
    } else {
      if (wifiConnected === null) return;

      setWifiConnected(true);
      setTimeout(() => {
        setWifiConnected(null);
      }, 3000);
    }
  };

  const setToast = (
    message = 'This is a toast message',
    options?: {
      duration?: number;
      position?: ToastPosition;
      icon?: string;
      styles?: {
        view?: any;
        pressable?: any;
        text?: any;
        indicator?: any;
      };
    },
  ) => {
    const {
      duration = 3000,
      position = ToastPosition.BOTTOM,
      icon = null,
      styles = {},
    } = options || {};

    toast(message, {
      duration,
      position,
      icon,
      styles,
    });
  };

  const toggleBottomSheet = (
    isVisible: boolean,
    snapPoints?: string[],
    children?: ReactNode,
    bottomSheetProps?: Object,
  ) => {
    setBottomSheetSnapPoints(snapPoints || ['1%', '35%']);
    setBottomSheetChildren(
      children || (
        <Text style={{textAlign: 'center'}}>Bottom Sheet Content</Text>
      ),
    );

    if (bottomSheetProps) setBottomSheetProps(bottomSheetProps as any);

    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  const toggleAppError = (
    isVisible: boolean,
    title?: string,
    description?: string,
  ) => {
    dispatch(
      setAppError({
        has_error: isVisible,
        title: title,
        description: description,
      }),
    );
  };

  const toggleLanguage = (language: string) => {
    changeLanguage(language);
    RNRestart.restart();
  };

  const WifiConnection = useMemo(() => {
    if (wifiConnected === false) {
      return (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: Colors.black + '4D',
            zIndex: 9999,
            height: HEIGHT,
          }}>
          <Text
            style={{
              color: Colors.white,
              textAlign: 'center',
              fontSize: 16,
              backgroundColor: Colors.red,
            }}>
            {t('no_internet_connection')}
          </Text>
        </View>
      );
    } else if (wifiConnected === true) {
      return (
        <Text
          style={{
            color: Colors.white,
            textAlign: 'center',
            fontSize: 16,
            backgroundColor: Colors.green,
          }}>
          {t('connected_to_the_internet')}
        </Text>
      );
    }
    return null;
  }, [wifiConnected]);

  return (
    <QuickodeContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        setToast,
        toggleBottomSheet,
        toggleAppError,
        toggleLanguage,
      }}>
      <StatusBar
        animated={true}
        backgroundColor="#5E8D48"
        barStyle="dark-content"
      />
      {WifiConnection}
      <Toasts />
      {children}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={bottomSheetSnapPoints}
        {...bottomSheetProps}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            flex: 1,
            padding: 24,
            justifyContent: 'center',
            backgroundColor: Colors.white,
          }}>
          {bottomSheetChildren}
        </BottomSheetView>
      </BottomSheetModal>
    </QuickodeContext.Provider>
  );
}

const useQuickode = () => useContext(QuickodeContext);

export {QuickodeProvider, useQuickode};
