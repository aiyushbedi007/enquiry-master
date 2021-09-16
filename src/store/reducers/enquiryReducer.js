const initState = {}

const enquiryReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_ENQUIRY_SUCCESS':
      console.log('create enquiry success', action.enquiry);
      return state;
    case 'CREATE_ENQUIRY_ERROR':
      console.log('create enquiry error', action.err);
      return state;
    case 'DELETE_ENQUIRY_SUCCESS':
      console.log('delete enquiry success');
      return state;
    case 'DELETE_ENQUIRY_ERROR':
      console.log('delete enquiry error', action.err);
      return state;
    case 'EDIT_ENQUIRY_SUCCESS':
      console.log('edit enquiry success', action.enquiry);
      return state;
    case 'EDIT_ENQUIRY_ERROR':
      console.log('edit enquiry error', action.err);
      return state;
  
  
    default:
      return state;
  }
};

export default enquiryReducer;