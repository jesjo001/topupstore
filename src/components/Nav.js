import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import Geocode from '../Geocode';
import { usePosition } from 'use-position';
import firebase from '../firebase';
 
function findLocation(){
  if(Nav.latitude){
    Geocode.fromLatLng(Nav.latitude,Nav.longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        const stateCountry = response.results[5].formatted_address;
  
         Nav.setUseAddress(address)
         Nav.setStateCountry(stateCountry)
         alert("your address is" + address)
         console.log( "herEs the address from Geoloc" + address);       
         console.log( "herEs the address from Geoloc 3" + stateCountry);
         return address;
      },
      error =>{
        console.error(error);      
      }
  
    );
    Nav.splitAddress()

  }else{

  }
}



function Nav(){
  const watch = true;
  const {
   latitude,
  longitude,
  timestamp,
  accuracy,
  error,
} = usePosition();
  const [ useAddress, setUseAddress] = useState();
  const [stateCountry, setStateCountry ] = useState();  
  const [userStreet, setUsersStreet] = useState() 
  const [userCountry, setUsersCountry] = useState() 
  const [userCity, setUsersCity] = useState(false) 
  const [userCityLoc, setCityLoc]  = useState();
  
  const [usersState , setUsersState] = useState();

 
function splitAddress(){

  try{
    let mainAddress = useAddress;      
    let parts = String(mainAddress).split(',');
    const parts2 = String(stateCountry).split(',')

    let street = parts[0];
    let  city = parts2[0];
    let  state = parts2[1];
    let  country = parts2[2];  

    setUsersStreet(street);
    setUsersCountry(country);
    setUsersState(state)
    setUsersCity(city)


  console.log("user State is:" + usersState);
  console.log("country: " + country );
  console.log("  street: " + street );
  console.log(" usersState: " + usersState);
  console.log("  city: " + city);

 // setFirstRun(true)
 // console.log(firstRun)

  }catch(error){
    console.log("Here is the Error" + error)
  }    
 }

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