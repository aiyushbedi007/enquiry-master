import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { deleteEnquiry } from '../../store/actions/enquiryActions'

class EnquiryList extends Component {
  render() { 
    const handleClick = (enquiry) => {
      this.props.deleteEnquiry(enquiry);
    }
    const {auth, profile, enquirys} = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="enquiry-list">
      <form className="search">
        <input className="form-control mb-4" id="tableSearch" type="text" placeholder="Search..." />
      </form>
  
      <table id="tblList" className="table table-bordered table-striped table-hover">
        <thead>  
          <tr>  
          <th>S.No</th>  
          <th>Title</th>
          <th>Course</th>       
          <th>Enquiry</th>
          <th>Raised On</th>          
           { profile.role === "admin" && ( <> 
            <th>Raised by</th>
          </> )}  
          <th colSpan="2">Action</th> 
         </tr>  
       </thead>  
       <tbody id='myTable'>
      { enquirys && enquirys.map((enquiry,i) => (
           (profile.role === 'admin' || enquiry.raisedby === profile.email) && (
            <tr key={enquiry.id}>
            <td> {i+1}</td>   
             <td> {enquiry.title}</td>  
            <td> {enquiry.course}</td>    
            <td> {enquiry.body}</td>
            <td> {moment(enquiry.createdAt.toDate()).format('L')}</td>    
            { profile.role === "admin" && (<>
              <td> {enquiry.raisedby }</td>
            </> )}
            <td><Link to={{pathname:`/edit/${enquiry.id}`, state: {enquiry}}}><button>Edit</button></Link></td>
            <td><button onClick={() => {handleClick(enquiry);}}>Delete</button></td>
          </tr>
          )))
      }
      </tbody>
      </table>
      </div>
    );
  }
}

// const EnquiryList = ({ enquirys,user }) => {
//   const handleClick = (e) => {
//     this.props.deleteEnquiry(this.state);
//     this.props.history.push('/');
//   }

//   return (
//     <div className="enquiry-list">
//     <form className="search">
//       <input className="form-control mb-4" id="tableSearch" type="text" placeholder="Search..." />
//     </form>

//     <table id="tblList" className="table table-bordered table-striped table-hover">
//       <thead>  
//         <tr>  
//         <th>S.No</th>  
//         <th>Title</th>
//         <th>Course</th>       
//         <th>Enquiry</th>
//         <th>Raised On</th>          
//          { user.role === "admin" && ( <> 
//           <th>Raised by</th>
//         </> )}  
//         <th colSpan="2">Action</th> 
//        </tr>  
//      </thead>  
//      <tbody id='myTable'>
//     { enquirys && enquirys.map((enquiry,i) => (
//          (user.role === 'admin' || enquiry.raisedby === user.email) && (
//           <tr key={enquiry.id}>
//           <td> {i+1}</td>   
//          	<td> {enquiry.title}</td>  
//           <td> {enquiry.course}</td>    
//           <td> {enquiry.body}</td>
//           <td> {moment(enquiry.createdAt.toDate()).format('L')}</td>    
//           { user.role === "admin" && (<>
//             <td> {enquiry.raisedby }</td>
//           </> )}
//           <td><Link to={{pathname:`/edit/${enquiry.id}`, state: {enquiry}}}><button>Edit</button></Link></td>
//           <td><button onClick={() => {handleClick(enquiry.id);}}>Delete</button></td>
//         </tr>
//         )))
//     }
//     </tbody>
//     </table>
//     </div>
//   );
// }

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    enquirys: state.firestore.ordered.enquirys,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteEnquiry: (enquiry) => dispatch(deleteEnquiry(enquiry))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnquiryList)
