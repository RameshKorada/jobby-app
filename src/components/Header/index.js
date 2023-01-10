import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  logoutUser = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <ul className="header-container">
          <li>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
                alt="website logo"
              />
            </Link>
          </li>
          <li>
            <ul className="ul-header-list-items">
              <div className="ul-header-list">
                <Link className="linked-items" to="/">
                  <li>Home</li>
                </Link>
                <Link className="linked-items" to="/jobs">
                  <li className="header-list">Jobs</li>
                </Link>
              </div>
            </ul>
          </li>
          <li>
            <button
              className="logout-button"
              type="button"
              onClick={this.logoutUser}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(Header)
