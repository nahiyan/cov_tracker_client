import { PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import { Socket } from '../phoenix'
import { getToken } from './token'

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

async function pushLocationUpdate (channel, info, c) {
  const token = await getToken()
  const body = {
    altitude: info.coords.altitude,
    longitude: info.coords.longitude,
    latitude: info.coords.latitude,
    timestamp: info.timestamp,
    token: token
  }

  console.log('Push')

  const push = channel.push('location_update', body)
  push.receive('ok', res => {
    c('ok', res)
  })
  push.receive('error', res => {
    c('error', res)
  })
}

async function pushLocationUpdateTest (channel, c) {
  const token = await getToken()
  const body = {
    test: true,
    token: token
  }

  console.log('Test push')

  const push = channel.push('location_update', body)
  push.receive('ok', res => {
    c('ok', res)
  })
  push.receive('error', res => {
    c('error', res)
  })
}

function startLocationUpdates (c) {
  global.socket = new Socket('ws://' + global.serverAddress + '/socket')

  global.socket.onOpen(event => {
    const channel = global.socket.channel('room:lobby', {})
    channel.join()
      .receive('ok', async _ => {
        global.socketStatus = 1

        await pushLocationUpdateTest(channel, (status, message) => {
          c(status, message)
          if (status === 'ok') {
            requestLocationPermission(() => {
              Geolocation.getCurrentPosition(async info => {
                await pushLocationUpdate(channel, info, c)

                // Keep watching
                global.watchID = Geolocation.watchPosition(async info => {
                  await pushLocationUpdate(channel, info, c)
                }, error => {
                  console.log(error)
                  c('error', 'No location provider')
                }, { timeout: 10000, maximumAge: 1000 })
              }, error => {
                console.log(error)
                c('error', 'No location provider')
              }, { timeout: 20000, maximumAge: 1000 })
            })
          }
        })
      })
      .receive('error', resp => {
        global.socketStatus = 0
      })
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
  Geolocation.clearWatch(global.watchID)
  global.socket.disconnect()
}

export { startLocationUpdates, stopLocationUpdates }
