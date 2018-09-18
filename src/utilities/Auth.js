import auth0 from 'auth0-js'
import history from './history'

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

    this.authorizationNamespace = 'https://myt-world.com/user-authorization-info'
    this.metadataNamespace = 'https://myt-world.com/meta-data'
  }

  login = () => {
    this.auth.authorize()
  }

  stringifyUserAuthData = (authResult, userAuthData) => {
    return authResult.idTokenPayload[this.authorizationNamespace][userAuthData].join(' ')
  }

  hasPermission = (requiredPermission) => {
    const userPermissions = localStorage.getItem('permissions').split(' ')
    return userPermissions.includes(requiredPermission)
  }

  hasRole = (requiredRole) => {
    const userRoles = localStorage.getItem('roles').split(' ')
    return userRoles.includes(requiredRole)
  }

  getDisplayName = () => {
    return localStorage.getItem('displayName')
  }

  setSession = (authResult) => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('displayName', authResult.idTokenPayload[this.metadataNamespace].displayName)
    localStorage.setItem('groups', this.stringifyUserAuthData(authResult, 'groups'))
    localStorage.setItem('roles', this.stringifyUserAuthData(authResult, 'roles'))
    localStorage.setItem('permissions', this.stringifyUserAuthData(authResult, 'permissions'))
  }

  handleAuthentication = () => {
    this.auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        // window.location.href = '/'
        history.push('/')
        // console.log(authResult)
      } else {
        console.log(err)
        // window.location.href = '/error'
        history.push('/error')
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
    localStorage.removeItem('groups')
    localStorage.removeItem('roles')
    localStorage.removeItem('permissions')

    // window.location.href = '/'
    history.push('/')
  }
}

export default Auth