import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import RegistrationForm from './components/RegistrationForm';

import HostList from './components/HostList';
import HostCard from './components/HostCard';
import Host from './components/Host';
import SavedList from './components/SavedList';
import SampleServices from './components/SampleServices';
import LogOutWarning from './components/LogOutWarning';
import './App.css';

// import { ClientPage } from './ClientComponents/ClientPage';
// import { AdminPage } from './AdminComponents/AdminPage';
// import { PrivateRoute } from './components/PrivateRoute';

function App() {

  // state to hold current logged in user, initial user object values
  const [currentUser, setCurrentUser] = useState({
      username: '',
      role: '',
      token: '' 
    });

  // function to get the current logged in user, passed as props to signup and login forms
  const getUser = (user) => {
    const loggedInUser = {...currentUser,
      username: user.username,
      role: user.role,
      tolen: user.token
    }
    setCurrentUser(loggedInUser);
  }
  const [savedList, setSavedList] = useState( [] );
  const addToSavedList = host => {
    setSavedList( [...savedList, host] );
  };

  return (
    <div className="App">
      
      <Header currentUser={currentUser}/>
      <Route path='/' render={props => <SavedList {...props} list={savedList} />} />
      {/* Routes */}
      <Switch>
        <Route path='/logout' render={() => <LogOutWarning currentUser={currentUser} />}/>
        <Route path='/signup' render={()=> <SignUp />}/>
        <Route path='/login' render={()=> <LogIn currentUser={currentUser} getUser={getUser}/>}/>
        <Route path='/sampleservices' component={SampleServices} />
        <Route exact path='/form'><RegistrationForm /></Route>
        <Route exact path='/hosts'><HostList /></Route>
        {/* <Route exact path='/users'><UserList /></Route> */}
        <Route exact path='/'><HostCard /></Route>
        {/* <Route path='/hosts/:id' component={Host} /> */}
        <Route path='/hosts/:id' render={props => <Host {...props} addToSavedList={addToSavedList}/>}/>

        {/* <PrivateRoute path='/clientPage' component={ClientPage}/>
        <PrivateRoute path='/AdminPage' component={AdminPage}/> */}
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
