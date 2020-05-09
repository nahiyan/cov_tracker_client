import React from 'react'
import 'react-native-gesture-handler'
import { HomeScreen } from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { logout } from './lib/authentication'

const Stack = createStackNavigator()
global.serverAddress = '192.168.0.103:4000'

export default function App () {
  (async () => {
    await logout()
  })()

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
