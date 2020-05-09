import { setToken } from './token'

function login (c, username, password) {
  window.fetch('http://' + global.serverAddress + '/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  }).then(async response_ => {
    const response = await response_.json()
    if (response.status === 'ok') {
      if (await setToken(response.token) != null) {
        c(await response)
      } else {
        c({ status: 'error', reason: 'Failed to set token.' })
      }
    } else {
      c(await response)
    }
  })
}

function register (c, username, phoneNumber, password, passwordAgain) {
  window.fetch('http://' + global.serverAddress + '/api/register', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      phone_number: phoneNumber,
      password: password,
      password_confirmation: passwordAgain
    })
  }).then(async response_ => {
    const response = await response_.json()
    if (response.status === 'ok') {
      if (await setToken(response.token) != null) {
        c(await response)
      } else {
        c({ status: 'error', reason: 'Failed to set token.' })
      }
    } else {
      c(await response)
    }
  })
}

async function logout () {
  return (await setToken('') != null)
}

export { login, register, logout }
