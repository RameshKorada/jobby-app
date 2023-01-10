import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: '', isError: false}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  passwordSuccess = JWTtoken => {
    //  console.log(jwtToken)
    Cookies.set('jwt_token', JWTtoken, {expires: 50})
    //  console.log(this.props)
    const {history} = this.props
    history.replace('/')
  }

  onSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    //  console.log(username, password)

    const url = 'https://apis.ccbp.in/login'
    const details = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }
    const data = await fetch(url, options)
    const parsedData = await data.json()
    console.log(parsedData)
    if (data.ok === true) {
      this.passwordSuccess(parsedData.jwt_token)
    } else {
      //  console.log(parsedData.error_msg)
      this.setState({errorMessage: parsedData.error_msg, isError: true})
    }
  }

  render() {
    const {username, password, errorMessage, isError} = this.state
    const jwtToken = Cookies.get('jwt_token')
    //  console.log(jwtToken)
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main-container">
        <form onSubmit={this.onSubmit} className="login-container">
          <div className="website-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
            />
          </div>
          <div>
            <div>
              <label className="label-elements" htmlFor="username">
                USERNAME
              </label>
              <br />
              <input
                value={username}
                className="input-elements"
                id="username"
                type="text"
                onChange={this.onUsername}
                placeholder="Username"
              />
            </div>
            <div className="password-container">
              <label className="label-elements" htmlFor="password">
                PASSWORD
              </label>
              <br />
              <input
                value={password}
                className="input-elements"
                id="password"
                type="password"
                onChange={this.onPassword}
                placeholder="Password"
              />
            </div>
            <div>
              <button type="submit" className="login-button">
                Login
              </button>
              {isError ? <p className="error-message">*{errorMessage}</p> : ''}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
