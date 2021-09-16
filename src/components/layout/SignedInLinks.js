import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create'>New Enquiry</NavLink></li>
        <li><NavLink to='/' onClick={props.signOut}>Log Out</NavLink></li>
        <li><span className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </span></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
