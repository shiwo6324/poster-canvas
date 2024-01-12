import docCookies from 'src/utils/cookies'

export function logout(callback: () => void) {
  docCookies.removeItem('sessionId')
  docCookies.removeItem('username')
  callback()
}
