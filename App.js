import React from 'react'
import { StyleSheet, Text, View, PermissionsAndroid, AsyncStorage } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { Socket } from './phoenix'
// import AsyncStorage from '@react-native-community/async-storage'

async function requestLocationPermission (cb) {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This App needs access to your location ' +
                   'so we can know where you are.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      cb()
    } else {
      console.log('Location permission denied')
    }
  } catch (err) {
    console.warn(err)
  }
}

function pushLocationUpdate (channel) {
  if (global.socketStatus) {
  // Fetch location info
    requestLocationPermission(() => {
      Geolocation.getCurrentPosition(info => {
        const body = {
          altitude: info.coords.altitude,
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
          timestamp: info.timestamp,
          token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJjb3ZfdHJhY2tlcl9zZXJ2ZXIiLCJleHAiOjE1OTEzNDMyNzMsImlhdCI6MTU4ODkyNDA3MywiaXNzIjoiY292X3RyYWNrZXJfc2VydmVyIiwianRpIjoiNmQ0Nzg0MWItNDRiZi00MWFlLWI2ZTQtYzQ2NGQ0NjEwNjE5IiwibmJmIjoxNTg4OTI0MDcyLCJzdWIiOiIxIiwidHlwIjoiYWNjZXNzIn0.vb7Q06bhqnJPRROiUy5B3wG-IcTA2ml3FNDB1Gv0QpvY_75m-4VOhFm1N0GkgaacpsOyW5jNH4bO7SvbNlny6Q'
        }

        const push = channel.push('location_update', body)
        push.receive('ok', res => {
          console.log(res)
        })
        push.receive('error', res => {
          console.log('Stopped!')
          stopLocationUpdates()
        })
      })
    })
  }
}

function startLocationUpdates () {
  global.socket = new Socket('http://192.168.0.103:4000/socket')

  global.socket.onOpen(event => {
    const channel = global.socket.channel('room:lobby', {})
    channel.join()
      .receive('ok', resp => {
        global.socketStatus = 1

        pushLocationUpdate(channel, global.socketStatus)
        global.locationUpdateInterval = window.setInterval(() => {
          pushLocationUpdate(channel, global.socketStatus)
        }, 5000)
      })
      .receive('error', resp => {
        global.socketStatus = 0
      })

    pushLocationUpdate(channel)
  })
  global.socket.onClose(() => {
    global.socketStatus = 0
  })
  global.socket.onError(() => {
    global.socketStatus = 0
  })
  global.socket.connect()
}

function stopLocationUpdates () {
  console.log('Stopping location updates')
  window.clearInterval(global.locationUpdateInterval)
  global.socket.disconnect()
}

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

export default function App () {
  // Initialize websocket connection
  console.log('Starting location updates')
  startLocationUpdates()
  window.setTimeout(() => {
    stopLocationUpdates()
  }, 20000)

  // Test async storage
  // (async () => {
  //   // if (await setToken('Fuck my ass') != null) {
  //   //   console.log(await getToken())
  //   // }
  //   console.log(await getToken())
  // })()

  return (
    <View style={styles.container}>
      <Text>Suck my ass!</Text>
      <Text>Fuck my ass!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
