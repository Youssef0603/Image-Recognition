import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Navigator from './Navigator';
import {Actors} from './constants';
import { HomeScreen } from './screens/user';

const Stack = createNativeStackNavigator();

// Selector hooks for extracting state
const useAppState = () => useSelector((state: {app: any}) => state.app);
const useUserState = () => useSelector((state: {user: any}) => state.user);

interface MainProps {}

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    // text: 'red',
    // border: 'green',
    // card: 'blue',
    // notification: 'orange',
    // primary: 'rgb(255, 45, 85)',
  },
};

const Main: React.FC<MainProps> = props => {
  const {loaded, forceUpdate, error} = useAppState();
  const {user} = useUserState();

  useEffect(() => {
    console.log('error', error);
  }, [error]);

  const renderContent = () => {

    if (loaded && error.has_error && !forceUpdate.has_update) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
        </Stack.Navigator>
      );
    }

    return <HomeScreen/>
    return null;
  };

  return (
    <NavigationContainer independent={true} theme={navigationTheme}>
      {renderContent()}
    </NavigationContainer>
  );
};

export default Main;
