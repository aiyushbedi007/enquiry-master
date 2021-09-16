import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from 'react-redux'
import { editEnquiry } from '../../store/actions/enquiryActions'


//const USER_KEY = 'auth-user';

const EditEnquiry = (props) => {
  let location = useLocation();
  const enquiry = (location && location.state.enquiry) || {};
  const [title, setTitle] = useState(enquiry.title);
  const [body, setBody] = useState(enquiry.body);
  const [course, setCourse] = useState(enquiry.course);
  const [raisedby, setRaisedby] = useState(enquiry.raisedby);
  const id = enquiry.id;
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editEnquiry({id,title,body,course,raisedby});
    history.push('/');
  }

  return (
    <div className="container">
      <form className="white" onSubmit={handleSubmit}>
        <h5 className="grey-text text-darken-3">Update Enquiry</h5>
        <div className="input-field">
          <input type="text" required value={title} id='title' onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="title">Enquiry Title</label>
        </div>
        <div className="input-field">
          <input type="text" id='course' required value={course} onChange={(e) => setCourse(e.target.value)} />
          <label htmlFor="course">Course</label>
        </div>
        <div className="input-field">
          <textarea id="body" className="materialize-textarea" required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          <label htmlFor="body">Enquiry</label>
        </div>
        <div className="input-field">
          <input type="hidden" value={raisedby} id='raisedby' onChange={(e) => setRaisedby(e.target.value)} />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1">Update Enquiry</button>
        </div>
      </form>
    </div>
  
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEnquiry: (enquiry) => dispatch(editEnquiry(enquiry))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEnquiry)
 
