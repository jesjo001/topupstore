import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import firebase from '../firebase';
 
function Nav(){
  
  const [ useAddress, setUseAddress] = useState();
  const [stateCountry, setStateCountry ] = useState();  
  const [userStreet, setUsersStreet] = useState() 
  const [userCountry, setUsersCountry] = useState() 
  const [userCity, setUsersCity] = useState(false) 
  const [userCityLoc, setCityLoc]  = useState();
  
  const [usersState , setUsersState] = useState();


  return(
    <nav>
        <h3 className="titleNav">My Shop</h3>

        <ul>        
          <Link to="/">
            <li>Login</li>
          </Link>
          <Link to="/updateUser">
            <li>Update Profile</li>
          </Link>
          <Link to="/Listing">
            <li>Listing</li>
          </Link>
          <Link to="/Shop" >
            <li>Shop</li>
          </Link>
          <Link to="/">
            <li>Home</li>
          </Link>           
            
        </ul>

        <button className="btn btn-dark" onClick={() => firebase.auth().signOut()} >Sign Out</button>

    </nav>
  );
}

export default Nav;