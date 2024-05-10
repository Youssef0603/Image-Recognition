import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Navigator from './Navigator';
import {SplashScreen, ForceUpdateScreen, ErrorScreen} from './screens';
import {LoginScreen, RegisterScreen} from './screens/user/auth';
import {Actors} from './constants';

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
    if (!loaded) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      );
    }

    if (loaded && forceUpdate.has_update) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            name="ForceUpdateScreen"
            component={ForceUpdateScreen}
          />
        </Stack.Navigator>
      );
    }

    if (loaded && error.has_error && !forceUpdate.has_update) {
      return (
        <Stack.Navigator>
          <Stack.Screen name="ErrorScreen" component={ErrorScreen} />
        </Stack.Navigator>
      );
    }

    // if (loaded && user === null && !forceUpdate.has_update) {
    //   return (
    //     <Stack.Navigator>
    //       <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    //     </Stack.Navigator>
    //   );
    // }

    // if (loaded && user?.actor === Actors.MAIN && !forceUpdate.has_update) {

      return <Navigator />;
      
    // }

    // Example for extending the logic, uncomment if needed
    // if (loaded && user != null && user.actor === Actors.DRIVER && !forceUpdate.has_update) {
    //   return <NavigatorTwo {...props} />;
    // }

    return null;
  };

  return (
    <NavigationContainer independent={true} theme={navigationTheme}>
      {renderContent()}
    </NavigationContainer>
  );
};

export default Main;
