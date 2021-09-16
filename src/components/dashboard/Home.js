import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import EnquiryList from "../enquirys/EnquiryList";
// import useFetch from "../../useFetch";

//const TOKEN_KEY = 'auth-token';
// const USER_KEY = 'auth-user';

class Home extends Component {
  render() {
    const { error, isPending, enquirys, auth, profile } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    // const { error, isPending, data: enquirys } = useFetch('http://localhost:8000/enquirys')
    // const user = window.sessionStorage.getItem(USER_KEY);

    return (
      <div className="home container">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { enquirys && <EnquiryList user={profile} enquirys={enquirys} /> }
      </div>
    )
  }
}
 
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    enquirys: state.firestore.ordered.enquirys,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'enquirys', orderBy: ['createdAt', 'desc']},
  ])
)(Home)
