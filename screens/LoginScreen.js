import React, { useState } from 'react'
import { Text, TextInput, Button, View, ActivityIndicator } from 'react-native'
import styles from '../styles/global.js'
import { login } from '../lib/authentication'
import { setToken } from '../lib/token'

export default function LoginScreen ({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState()

  const loginResponse = async (response) => {
    switch (response.status) {
      case 'ok':
        if (await setToken(response.token) != null) {
          navigation.navigate('Home')
        } else {
          setMessage(
            <View style={styles.message}>
              <Text style={styles.errorText}>Failed to set token.</Text>
            </View>
          )
        }
        break
      case 'error':
        setMessage(
          <View style={styles.message}>
            <Text style={styles.errorText}>{response.reason}</Text>
          </View>
        )
        break
    }
  }

  return (
    <View style={styles.login}>
      {message}
      <Text style={styles.label}>NID Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your NID number here:'
        onChangeText={username => setUsername(username)}
        defaultValue={username}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your password:'
        onChangeText={password => setPassword(password)}
        defaultValue={password}
        secureTextEntry
        password
      />
      <Button
        style={styles.button}
        title='Login'
        onPress={() => {
          setMessage(
            <View style={styles.message}>
              <ActivityIndicator style={styles.activityIndicator} />
            </View>
          )
          login(loginResponse, username, password)
        }}
      />
    </View>
  )
}
