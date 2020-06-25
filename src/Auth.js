import React, {useEffect, useState} from 'react';
import firebase from './firebase';
import { usePosition } from 'use-position';
import Geocode from './Geocode';

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserState, setCurrentUserState] = useState(null);
    
    const [addressString1, setAddressString1] = useState(null);
    const [addressString2, setAddressString2] = useState(null);
/* 
    const watch = true;
    const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(); */

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
/* 
        Geocode.fromLatLng(latitude,longitude).then(
            response => {
              const address = response.results[0].formatted_address;
              const stateCountry = response.results[4].formatted_address;
              const stateState = response.results[4].address_components[0].long_name;
              setAddressString1(address)
              setAddressString2(stateCountry)
               setCurrentUserState(stateState)
    
            //   alert("your address is" + address)
               console.log( "heres the address from Geoloc" + address);       
            //   console.log( "heres the address from Geoloc 3" + stateCountry);           
           //    console.log( "heres the address from stateState" + stateState);
               return address;
            },
            error =>{
              console.error(error);      
            }
        
          ); */


    }, []);

    return(
        <AuthContext.Provider
        value={{
            currentUser,
            currentUserState,
            addressString1,
            addressString2
        }}
        >
        {children}
        </AuthContext.Provider>
    );

}