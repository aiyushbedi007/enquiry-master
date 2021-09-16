import { useHistory } from "react-router-dom";
import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'


const EnquiryDetails = (props) => {
  const { enquiry, auth } = props;
  const history = useHistory();
  const handleClick = () => {
    fetch('http://localhost:8000/enquirys/' + enquiry.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    }) 
  }

  if (!auth.uid) return <Redirect to='/signin' /> 
  if (enquiry) {
  return (
    <div className="container section enquiry-details">
    <div className="card z-depth-0">
      <div className="card-content">
        <span className="card-title">{enquiry.title}</span>
        <p>{enquiry.body}</p>s
      </div>
      <div className="card-action grey lighten-4 grey-text">
        <div>Posted by {enquiry.authorFirstName} {enquiry.authorLastName}</div>
        <div>{moment(enquiry.createdAt.toDate()).calendar()}</div>
        <button onClick={handleClick}>delete</button>
      </div>
    </div>
  </div>
  )
} else {
  return (
    <div className="container center">
      <p>Loading Enquiry...</p>
    </div>
  )
}
}

const mapStateToProps = (state, ownProps) => {
  // console.log(state);
  const id = ownProps.match.params.id;
  const enquirys = state.firestore.data.enquirys;
  const enquiry = enquirys ? enquirys[id] : null
  return {
    enquiry: enquiry,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{
    collection: 'enquirys'
  }])
)(EnquiryDetails)
