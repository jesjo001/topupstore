import React, {Component, useCallback, useContext, useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import firebase from './firebase';
import { AuthProvider, AuthContext } from './Auth';
import { usePosition } from 'use-position';
import { observable } from 'mobx';

import Nav from './components/Nav';
import Shop from './components/Shop';
import Listing from './components/Listing';
import Login from './components/Login';
import UpdateUser from './components/updateUser';
import { useUserStore } from './userContex';
//import { useObserver } from 'mobx-react';
import Geocode from './Geocode';
/* firebase.firestore().collection('productData').add({
  productName: 'Iphone X',
  productDescription: 'Brangd New Pink and gold cover 2gb Ram with 2.3GHz processor',
  quantity: 2,
  address: 'No 1 Kunle Street Ikeja Lagos',
  state: 'Lagos State',
  city: 'Ikeja',
  zip: '111102'
})
 */


function App(){
  const userStore = useUserStore()

  return( 
    <AuthProvider>
      <Router>
      <div className="App">
        <Nav />
          <Switch>
            <Route path="/" exact component={Home} /> 
            <Route path="/Listing" component={Listing}  />
            <Route path="/Shop" component={Shop} state2={Home.newState} />            
            <Route path="/updateUser" component={UpdateUser} />
            <Route path="/Login" component={Login} />
          </Switch>      
      </div>
    </Router>
    </AuthProvider>
    
  );

}

 

const Home = ({history}) =>{
  const [userName, setUserName] = useState('')  
  const [zipCode, setZipCode] = useState('')  
  const [state, setState] = useState('')
  const [stateCountry, setStateCountry ] = useState([]);  
  const [userStateLoc, setUserStateLoc] = useState() 
  const [userLongtitude, setUserLongtitude] = useState() 
  const [userLatitude, setUserLatitude] = useState(true) 
  const [userCityLoc, setCityLoc]  = useState();
  const [usersState , setUsersState] = useState();
  const [firstRun , setFirstRun] = useState(false)

  let [ usersCity, setUsersCity ] = useState();
  let [ usersStreet, setUsersStreet ] = useState();  
  let [ usersCountry, setUsersCountry ] = useState();  
  let [ useAddress, setUseAddress] = useState([]);
  
  let [ newState, setNewState] = useState([]);
 
  
  const userStore = useUserStore()
  const watch = true;
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition();

  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const {email, password } = event.target.elements;
      try{
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value,password.value);
          
        history.push("/Shop");
      } catch(error){
        alert(error);        
        
      }
    }, 
    [history]
  );

  
  useEffect(() => {
    if(latitude){
      Geocode.fromLatLng(latitude,longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          const stateCountry = response.results[4].formatted_address;
          const stateState = response.results[4].address_components[0].long_name;
           setUseAddress(address)
           setStateCountry(stateCountry)
           setNewState(stateState)

           alert("your address is" + address)
           console.log( "herEs the address from Geoloc" + address);       
           console.log( "herEs the address from Geoloc 3" + stateCountry);           
           console.log( "heres the address from stateState" + stateState);
           return address;
        },
        error =>{
          console.error(error);      
        }
    
      );
      splitAddress()
      setUserLatitude(true)
    }else{

    }

  }); 

  
  function splitAddress(){

    try{
      let mainAddress = useAddress;      
      let parts = String(mainAddress).split(',');
      const parts2 = String(stateCountry).split(',');
      

      let street = parts[0];
      let  city = parts2[0];
      let  state = parts2[1];
      let  country = parts2[2];  

      setUsersStreet(street);
      setUsersCountry(country);
      setUsersState(state)
      setUsersCity(city)

      userStore.addRecord(state,city)
      const appState = observable({
        stateFrom : state        
      })
      
    console.log("user State is:" + usersState);
    console.log("country: " + country );
    console.log("  street: " + street );
    console.log(" usersState: " + usersState);
    console.log("  city: " + city);
    setFirstRun(true)
    console.log(firstRun)
    }catch(error){
      console.log("Here is the Error" + error)
    }    
   }

  const { currentUser } = useContext(AuthContext);

  const handleSignUP = useCallback(async event =>{
    event.preventDefault();
    const { email, password } = event.target.elements;
    try{
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);        
        history.push("/updateUser");

    } catch(error){
      alert(error);     
    }
  }, [history]);

  if(currentUser){
    return <Redirect to="/Shop" />;
  }  

  return(
    <div className="container" id="homePg" >
      <div className="row">
        <div className="col-2">
        </div>
        <div className="col-8">
          <h3>
          Welcom to topUP Store
          </h3>
          <p></p>
        </div>
        <div className="col-2">
          
        </div>
      </div>
      <div className="row">
        <div className="col-2 col-4-lg ">

        </div>
        <div className="col-8 col-4-lg">
        <form onSubmit={handleLogin}>
            <div className="form-group ">
              <label className="text-white" >Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1"  placeholder="Enter email" />
              <small id="emailHelp" className="form-text text-dark">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label className="text-white">Password</label>
              <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
              <a href="" className="text-dark" data-toggle="modal" data-target="#signupModal">New User ? Then Click Here to Register </a>
           
            </div>
            <div className="form-check">
               </div>
            <button type="submit" className="btn btn-dark">Login</button>
          </form>
        </div>
        <div className="col-2 col-4-lg"></div>
      </div>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-8">
            {/* Modal */}
            <div className="modal fade" id="signupModal" role="dialog" aria-labelledby="exampleModa" data-target="#exampleModal" aria-hidden="true">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Sign Up Form</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={handleSignUP}>
                <div className="modal-body">                  
                  <input type="email" name="email" className="form-control mt-3" id=""  placeholder="Enter email" />
                  <input type="password" name="password" className="form-control mt-3" id="" placeholder="Password" />           
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary " data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-dark " >Save changes</button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2"></div>
      </div>
      
    </div>
  )
  
};

export default App;