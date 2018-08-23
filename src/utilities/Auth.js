import auth0 from 'auth0-js'

class Auth {
  constructor() {
    this.auth = new auth0.WebAuth({
      domain: process.env.REACT_APP_DOMAIN,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
      audience: process.env.REACT_APP_AUDIENCE,
      responseType: process.env.REACT_APP_RESPONSE_TYPE,
      scope: process.env.REACT_APP_SCOPE
    })
  }

  login = () => {
    this.auth.authorize()
  }

  setSession = (authResult) => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
  }

  handleAuthentication = () => {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        window.location.href = '/'
      } else {
        console.log(err)
        window.location.href = '/error'
      }
    })
  }

  isTokenExpired = () => {
    let expiresAt = localStorage.getItem('expires_at')
    return (new Date().getTime() > expiresAt)
  }

  isLoggedIn = () => {
    let idToken = localStorage.getItem('id_token')
    return (!!idToken && !this.isTokenExpired())
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')

    window.location.href = '/'
  }
}

export default Auth