import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/dashboard/Home';
import EnquiryDetails from './components/enquirys/EnquiryDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Create from './components/enquirys/CreateEnquiry'
import Edit from './components/enquirys/EditEnquiry';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Switch>
              <Route exact path='/'component={Home} />
              <Route path='/enquiry/:id' component={EnquiryDetails} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              <Route path='/create' component={Create} />
              <Route path="/edit/:id" component={Edit} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
