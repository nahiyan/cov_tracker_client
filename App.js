import React from 'react'
import { StyleSheet, Text, View, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { Socket } from './phoenix'

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

function pushLocationUpdate (channel, socketStatus) {
  if (socketStatus) {
  // Fetch location info
    requestLocationPermission(() => {
      Geolocation.getCurrentPosition(info => {
        const body = {
          altitude: info.coords.altitude,
          longitude: info.coords.longitude,
          latitude: info.coords.latitude,
          timestamp: info.timestamp
        }

        channel.push('location_update', body)
      })
    })
  }
}

export default function App () {
  const socket = new Socket('http://192.168.0.100:4000/socket')

  let socketStatus = 0
  socket.onOpen(event => {
    const channel = socket.channel('room:lobby', {})
    channel.join()
      .receive('ok', resp => {
        socketStatus = 1

        pushLocationUpdate(channel, socketStatus)
        window.setInterval(() => {
          pushLocationUpdate(channel, socketStatus)
        }, 5000)
      })
      .receive('error', resp => {
        socketStatus = 0
      })

    pushLocationUpdate(channel)
  })
  socket.onClose(() => {
    socketStatus = 0
  })
  socket.onError(() => {
    socketStatus = 0
  })
  socket.connect()

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
