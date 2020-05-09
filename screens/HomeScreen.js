import React, { useState } from 'react'
import { Text, View, Button, ActivityIndicator } from 'react-native'
import styles from '../styles/global'
import { startLocationUpdates, stopLocationUpdates } from '../lib/location'

var counter = 1
var navigation_ = null
var setContent = null

// Loading
const loading = (
  <View style={styles.home}>
    <ActivityIndicator size='large' style={styles.activityIndicator} />
  </View>
)

// Not logged in
const notLoggedIn = (
  <View style={styles.home}>
    <Text style={[styles.largeText, { marginBottom: 10 }]}>You're not logged in.</Text>
    <Button
      style={styles.button}
      title='Login'
      onPress={() =>
        navigation_.navigate('Login')}
    />
    <Text style={[styles.mediumText, { marginTop: 10, marginBottom: 10 }]}>Or</Text>
    <Button
      style={styles.button}
      title='Register'
      onPress={() =>
        navigation_.navigate('Register')}
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
    <Text style={[styles.largeText, { marginBottom: 10 }]}>Failed to connect to server!</Text>
    <Button
      style={styles.button}
      title='Reconnect'
      onPress={() => {
        connect()
      }}
    />
  </View>
)

// no location provider
const noLocationProvider = (
  <View style={styles.home}>
    <Text style={[styles.largeText, { marginBottom: 10 }]}>There was a problem retrieving location. Can you ensure that location is turned on?</Text>
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
  setContent(loading)

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

        default:
          setContent(noLocationProvider)
          break
      }
    } else if (status === 'ok') {
      setContent(normal)
    }
  })
  counter = 0
}

function HomeScreen ({ navigation }) {
  var [content, _setContent] = useState(loading)
  setContent = _setContent

  navigation_ = navigation

  // navigation = navigation_
  // Make sure the app doesn't keep trying to reconnect every time the state changes
  if (counter >= 1) {
    connect()
  }

  return content
}

export { HomeScreen, connect }
