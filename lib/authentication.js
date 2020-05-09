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
  }).then(async response => {
    c(await response.json())
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
      password_again: passwordAgain

    })
  }).then(async response => {
    c(await response.json())
  })
}

async function logout () {
  return (await setToken('') != null)
}

export { login, register, logout }
