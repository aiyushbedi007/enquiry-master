import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createEnquiry } from '../../store/actions/enquiryActions'
import { Redirect } from 'react-router-dom'

class CreateEnquiry extends Component {
  state = {
    title: '',
    body: '',
    course: '',
    raisedby: this.props.auth.email
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createEnquiry(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create a New Enquiry</h5>
          <div className="input-field">
            <input type="text" id='title' onChange={this.handleChange} />
            <label htmlFor="title">Enquiry Title</label>
          </div>
          <div className="input-field">
            <input type="text" id='course' onChange={this.handleChange} />
            <label htmlFor="course">Course</label>
          </div>
          <div className="input-field">
            <textarea id="body" className="materialize-textarea" onChange={this.handleChange}></textarea>
            <label htmlFor="body">Enquiry</label>
          </div>
          <div className="input-field">
            <input type="hidden" id='raisedby' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1">Create Enquiry</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEnquiry: (enquiry) => dispatch(createEnquiry(enquiry))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEnquiry)
