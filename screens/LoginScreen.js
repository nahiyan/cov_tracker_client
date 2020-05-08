import React, { useState } from 'react'
import { TextInput, Button, View } from 'react-native'
import styles from '../styles/global.js'

export default function LoginScreen ({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
        placeholder='Type your password:'
        onChangeText={password => setPassword(password)}
        defaultValue={password}
        secureTextEntry
        password
      />
      <Button
        title='Login'
        onPress={() =>
          console.log(username, password)}
      />
    </View>
  )
}
