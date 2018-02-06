import axios from 'axios'
import { browserHistory, Link } from 'react-router'
import { getCart } from './cartItems'
const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'

export const authenticated = user => ({
  type: AUTHENTICATED, user
})

//login
export const login = (email, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      { email, password })
      .then((user) => {
        return dispatch(whoami())

      })
      .catch(() => dispatch(authenticated({ user: 'error' })))


//logout
export const logout = () =>
  dispatch => {
    return axios.delete('/api/notlogged')
      .then(() => {
        return axios.post('/api/auth/logout')
      })
      .then(() =>
        dispatch(whoami())
      )
      .then(() => {
        dispatch(getCart([]))
      })
      .catch(() => dispatch(whoami()))
  }
  //sign up
export const signup = (email, password, name) =>
  dispatch =>
    axios.post('/api/auth/signup',
      { email, password, name })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(authenticated({ user: 'error' })))

//authenticate
export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))

      })
      .catch(failed => dispatch(authenticated(null)))

export default reducer
