import { AsyncStorage } from 'react-native'

async function getToken () {
  try {
    return await AsyncStorage.getItem('token')
  } catch (e) {
    return null
  }
}

async function setToken (value) {
  try {
    await AsyncStorage.setItem('token', value)
    return 1
  } catch (e) {
    return null
  }
}

export { getToken, setToken }
