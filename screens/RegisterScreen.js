import React, { useState } from 'react'
import { Text, TextInput, Button, View } from 'react-native'
import styles from '../styles/global.js'

export default function RegisterScreen ({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  return (
    <View style={styles.login}>
      <Text style={styles.label}>NID Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your NID number here:'
        onChangeText={username => setUsername(username)}
        defaultValue={username}
      />
      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your phone number here:'
        onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
        defaultValue={phoneNumber}
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
      <Text style={styles.label}>Password Again:</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Type your password again:'
        onChangeText={passwordAgain => setPasswordAgain(passwordAgain)}
        defaultValue={passwordAgain}
        secureTextEntry
        password
      />
      <Button
        style={styles.button}
        title='Register'
        onPress={() =>
          console.log('Register')}
      />
    </View>
  )
}
