import React, { useState } from 'react'
import { TextInput, Button, View } from 'react-native'
import styles from '../styles/global.js'

export default function RegisterScreen ({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  return (
    <View style={styles.login}>
      <TextInput
        style={{ height: 40 }}
        placeholder='Type your NID number here:'
        onChangeText={username => setUsername(username)}
        defaultValue={username}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Type your phone number here:'
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        defaultValue={phoneNumber}
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Type your password:'
        onChangeText={password => setPassword(password)}
        defaultValue={password}
        secureTextEntry
        password
      />
      <TextInput
        style={{ height: 40 }}
        placeholder='Type your password again:'
        onChangeText={passwordAgain => setPasswordAgain(passwordAgain)}
        defaultValue={passwordAgain}
        secureTextEntry
        password
      />
      <Button
        title='Register'
        onPress={() =>
          console.log('Register')}
      />
    </View>
  )
}
