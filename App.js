import React from 'react'
import 'react-native-gesture-handler'
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
global.serverAddress = 'http://192.168.0.103:4000'

export default function App () {
  // Initialize websocket connection
  // console.log('Starting location updates')
  // startLocationUpdates()
  // window.setTimeout(() => {
  //   stopLocationUpdates()
  // }, 20000)

  // Test async storage
  // (async () => {
  //   // if (await setToken('Fuck my ass') != null) {
  //   //   console.log(await getToken())
  //   // }
  //   console.log(await getToken())
  // })()

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
