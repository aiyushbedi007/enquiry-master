export const createEnquiry = (enquiry) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('enquirys').add({
      ...enquiry,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_ENQUIRY_SUCCESS',enquiry});
    }).catch(err => {
      dispatch({ type: 'CREATE_ENQUIRY_ERROR' }, err);
    });
  }
};

export const deleteEnquiry = (enquiry) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('enquirys').doc(enquiry.id).delete().then(() => {
      dispatch({ type: 'DELETE_ENQUIRY_SUCCESS'});
    }).catch(err => {
      dispatch({ type: 'DELETE_ENQUIRY_ERROR'},err);
    });
  }
}

export const editEnquiry = (enquiry) => {
  // console.log(enquiry)
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('enquirys').doc(enquiry.id).update({
      title: enquiry.title,
      body: enquiry.body,
      course: enquiry.course
    }).then(() => {
      dispatch({ type: 'EDIT_ENQUIRY_SUCCESS',enquiry});
    }).catch(err => {
      dispatch({ type: 'EDIT_ENQUIRY_ERROR'},err);
    });
  }
}