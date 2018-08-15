import auth0 from 'auth0-js'

const auth = new auth0.WebAuth({
  domain: process.env.REACT_APP_DOMAIN,
  clientID: process.env.REACT_APP_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  audience: process.env.REACT_APP_AUDIENCE,
  responseType: process.env.REACT_APP_RESPONSE_TYPE,
  scope: process.env.REACT_APP_SCOPE
})

export function login() {
  auth.authorize()
}

export function isLoggedIn() {

}