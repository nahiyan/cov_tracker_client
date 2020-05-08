import React, { useState } from 'react'
import { Text, View, Button, ActivityIndicator } from 'react-native'
import styles from '../styles/global'
import { startLocationUpdates } from '../lib/location'

export default function HomeScreen ({ navigation }) {
  // Loading
  const loading = (
    <View style={styles.home}>
      <ActivityIndicator size='large' color='#6b26ff' />
    </View>
  )

  // Not logged in
  const notLoggedIn = (
    <View style={styles.home}>
      <Text style={{ marginBottom: 10, fontSize: 20 }}>You're not logged in.</Text>
      <Button
        title='Login'
        onPress={() =>
          navigation.navigate('Login')}
      />
      <Text style={{ margin: 10, fontSize: 15 }}>Or</Text>
      <Button
        title='Register'
        onPress={() =>
          navigation.navigate('Register')}
      />
    </View>
  )

  // normal
  const normal = (
    <View style={styles.home}>
      <Text>Connected!</Text>
    </View>
  )

  var [content, setContent] = useState(loading)

  startLocationUpdates((status, message) => {
    if (status === 'error' && message.reason === 'Unauthorized') {
      setContent(notLoggedIn)
    } else if (status === 'ok') {
      setContent(normal)
    }
  })

  // window.fetch(global.serverAddress + '/api/login', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     username: '1632162',
  //     password: 'me'
  //   })
  // }).then(async response => {
  //   console.log(await response.json())
  // })

  return content
}
