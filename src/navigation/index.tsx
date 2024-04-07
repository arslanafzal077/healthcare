import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import SignupScreen from '../screens/Signup';
import EmptyScreen from '../screens/EmptyScreen';

const Stack = createStackNavigator();

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarAllowFontScaling: false,
        tabBarActiveTintColor: 'rgba(149, 182, 239, 1)',
        tabBarInactiveTintColor: 'rgba(18, 18, 18, 1)',
        tabBarIconStyle: {width: 24, height: 24},
        tabBarLabelStyle: {fontSize: 12, lineHeight: 16},
        tabBarStyle: {
          borderTopWidth: 1,
          height: 80,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/home.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/reports.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Appoinments"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/appoinments.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Image
              source={require('../assets/profile.png')}
              style={[styles.icon, {tintColor: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS, // Use transition animation
      }}>
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="HomeTabs" component={MyTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});
