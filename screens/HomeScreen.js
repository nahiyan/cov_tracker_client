import React, { useState } from 'react'
import { Text, View, Button, ActivityIndicator } from 'react-native'
import styles from '../styles/global'
import { startLocationUpdates, stopLocationUpdates } from '../lib/location'

var counter = 1

// var [state, resetState] = useState(0)

// resetState = () => {
//   state += 1
// }

export default function HomeScreen ({ navigation }) {
  // Loading
  const loading = (
    <View style={styles.home}>
      <ActivityIndicator size='large' style={styles.activityIndicator} />
    </View>
  )

  // Not logged in
  const notLoggedIn = (
    <View style={styles.home}>
      <Text style={styles.largeText}>You're not logged in.</Text>
      <Button
        style={styles.button}
        title='Login'
        onPress={() =>
          navigation.navigate('Login')}
      />
      <Text style={styles.mediumText}>Or</Text>
      <Button
        style={styles.button}
        title='Register'
        onPress={() =>
          navigation.navigate('Register')}
      />
    </View>
  )

  // normal
  const normal = (
    <View style={styles.home}>
      <Text style={styles.largeText}>Connected!</Text>
    </View>
  )

  // conenction failed
  const failedConnection = (
    <View style={styles.home}>
      <Text style={styles.largeText}>Failed to connect to server!</Text>
      <Button
        style={styles.button}
        title='Reconnect'
        onPress={() => {
          setContent(loading)
          connect()
        }}
      />
    </View>
  )

  // no location provider
  const noLocationProvider = (
    <View style={styles.home}>
      <Text style={[styles.largeText, { marginBottom: 10 }]}>No location provider found. Can you ensure that location is turned on?</Text>
      <Button
        style={styles.button}
        title='Retry'
        onPress={() => {
          setContent(loading)
          connect()
        }}
      />
    </View>
  )

  const connect = () => {
    const timeout = window.setTimeout(() => {
      console.log('Timeout')
      setContent(failedConnection)
    }, 5000)

    startLocationUpdates((status, message) => {
      window.clearTimeout(timeout)
      if (status === 'error') {
        switch (message.reason) {
          case 'Unauthorized':
            setContent(notLoggedIn)
            stopLocationUpdates()
            break

          case 'No location provider':
            setContent(noLocationProvider)
            stopLocationUpdates()
            break
        }
      } else if (status === 'ok') {
        setContent(normal)
      }
    })
    counter--
  }

  var [content, setContent] = useState(loading)

  // Make sure the app doesn't keep trying to reconnect every time the state changes
  if (counter >= 1) {
    connect()
  }

  return content
}
