import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from './constants';
import {HomeScreen} from './screens/user';
import {ProfileScreen} from './screens/user/account';
import {
  NotificationsScreen,
  NotificationScreen,
} from './screens/user/notification';

import {NavMenuTypes} from './constants';

const NAVIGATION_TYPE = NavMenuTypes.BOTTOM_TAB;

const routes = [
  {
    name: 'Home',
    screen: HomeScreen,
    icons: {active: 'home', inactive: 'home-outline'},
  },
  {
    name: 'Profile',
    screen: ProfileScreen,
    icons: {active: 'person', inactive: 'person-outline'},
  },
  {
    name: 'Notifications',
    screen: NotificationsScreen,
    icons: {active: 'notifications', inactive: 'notifications-outline'},
  },
];

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const iconMap = routes.reduce((acc, route) => {
  acc[route.name] = route.icons;
  return acc;
}, {});

const DrawerContent = ({navigation}) => {
  return (
    <View style={styles.drawerContainer}>
      {routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          style={styles.drawerItem}
          onPress={() => navigation.navigate(route.name)}>
          <Text style={styles.drawerItemText}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'transparent',
        drawerStyle: {width: 280},
        drawerLabelStyle: styles.drawerLabel,
      }}>
      {routes.map((route, index) => (
        <Drawer.Screen
          key={index}
          name={route.name}
          component={route.screen}
          options={{title: route.name}}
        />
      ))}
    </Drawer.Navigator>
  );
};

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const {active, inactive} = iconMap[route.name];
          return (
            <Ionicons
              name={focused ? active : inactive}
              size={size}
              color={color}
            />
          );
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
      })}>
      {routes.map((route, index) => (
        <BottomTab.Screen
          key={index}
          name={route.name}
          component={route.screen}
          options={{title: route.name}}
        />
      ))}
    </BottomTab.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={
        NAVIGATION_TYPE === NavMenuTypes.BOTTOM_TAB ? 'Tab' : 'Drawer'
      }
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={NAVIGATION_TYPE === NavMenuTypes.BOTTOM_TAB ? 'Tab' : 'Drawer'}
        component={
          NAVIGATION_TYPE === NavMenuTypes.BOTTOM_TAB
            ? BottomTabNavigator
            : DrawerNavigator
        }
      />
      {/* Group for additional navigation screens */}
      <Stack.Group>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
        />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
      </Stack.Group>

      {/* Group for modal screens, typically used for screens that should present modally */}
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        {/* <Stack.Screen name="AddItemScreen" component={AddItemScreen} /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  drawerItem: {
    marginBottom: 12,
  },
  drawerItemText: {
    color: Colors.black,
    fontSize: 34,
  },
  drawerLabel: {
    fontSize: 34,
    color: Colors.black,
  },
  tabBarLabel: {
    fontSize: 12,
  },
});

export default Navigator;
