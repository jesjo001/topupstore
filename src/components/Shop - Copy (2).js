import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import { AuthProvider, AuthContext } from '../Auth';
import firebase from '../firebase';
import Geocode from '../Geocode';
import { usePosition } from 'use-position';

const filterLoc = true; 

const Shop = (props) =>{
  const [message, setMessage] = useState('')
  const products = useShop();
  const { currentUser } = useContext(AuthContext);
  const [ userName, setUserName] = useState();  
  let [ state, setState ] = useState();  
  let [ city, setCity ] = useState();
  let [ zip, setZip ] = useState();
//  let [ userState, setUsersState ] = useState();  
  let [ usersCity, setUsersCity ] = useState();
  let [ usersStreet, setUsersStreet ] = useState();  
  let [ usersCountry, setUsersCountry ] = useState();  
  let [ useAddress, setUseAddress] = useState([]);
  const [stateCountry, setStateCountry ] = useState([]);  
  const [userStateLoc, setUserStateLoc] = useState() 
  const [userLongtitude, setUserLongtitude] = useState() 
  const [userLatitude, setUserLatitude] = useState(false) 

  const [userCityLoc, setCityLoc]  = useState();
  
  const [usersState , setUsersState] = useState();
  const [firstRun , setFirstRun] = useState(false)
  const watch = true;
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition();

  useEffect(() => {
    if(latitude){
      Geocode.fromLatLng(latitude,longitude).then(
        response => {
          const address = response.results[0].formatted_address;
          const stateCountry = response.results[5].formatted_address;          
        const stateState = response.results[4].address_components[0].long_name;
    
           setUseAddress(address)
           setStateCountry(stateCountry)
           alert("your address is" + address)
           console.log( "herEs the address from Geoloc" + address);       
           console.log( "herEs the address from Geoloc 3" + stateCountry);
           console.log( "herEs the address from state 3" + stateState);
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
  
/*   function logUser(){
   let  useName = currentUser.displayName;
    let  state = currentUser.email;
    let  zip = currentUser.photoURL;
    let  city = currentUser.emailVerified;     
  } */

  //function splitUserInfo(){
    /*
    let  name = currentUser.displayName;
    let parts = String(currentUser.displayName).split('|');

    let userName = parts[0];
    let  zip = parts[1];
    let  state = parts[2];
    let  city = parts[3];    
     
    setUserName(userName);
    setZip(zip);
    setState(state)
    setCity(city)  
    */ 
   /*  console.log("Sign-in name: " + name );
    console.log("  zip: " + zip );
    console.log("  state: " + state);
    console.log("  city: " + city); 
    */
 //  }

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

    setFirstRun(true)
    console.log(firstRun)

    }catch(error){
      console.log("Here is the Error" + error)
    }    
   }
 
 /* let address = "";
  const watch = true;
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    error,
  } = usePosition(watch, {enableHighAccuracy: true});

*/
/*

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);

  }
  
   function getPosition(position) {
    setUserLongtitude(position.coords.latitude);
    setUserLatitude(position.coords.latitude);
    console.log(position.coords.latitude, position.coords.longitude);
  } */
  



function useShop(){

  
  const [ products, setProducts] = useState([]);  
  //console.log("splited Address is " + userStateLoc)
  useEffect(() => {

    if(firstRun){
      console.log("first run sucessfull")
      if(userLatitude){

        console.log("i ran and state is " + usersState)
        const unsubscribe = firebase
        .firestore()
        .collection('productData')
        .where('state', '==', usersState )
        .onSnapshot((snapshot) => {
          const newProducts = snapshot.docs.map((doc) =>({
            id: doc.id,
            ...doc.data()
          }))
          setProducts(newProducts) 
        })
        return () => unsubscribe() 
        
      }else{
        const unsubscribe = firebase
        .firestore()
        .collection('productData')
        .onSnapshot((snapshot) => {
          const newProducts = snapshot.docs.map((doc) =>({
            id: doc.id,
            ...doc.data()
          }))
          setProducts(newProducts) 
        })
        return () => unsubscribe() 
      }   
    }


    //setFirstRun(false);
  }, []) 
  return products
}


  function getLocate(){
    

  }
  function onSubmit(e){

  }

  return(
    <div className="container" id="shopPage" >
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4"> <h3> </h3></div>
        <div className="col-4"></div>

      </div>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-8" id="productDisplay" >
          <ul>
            {products.map((product) =>
            <li key={product.id}>
              
              <div className="card mt-3">
                <div className="card-header">
                  Product: {product.productName}
              	  <span className="">Quantity: {product.quantity}</span>
            <span>City {product.city}</span>
                </div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{product.productDescription}</p>
                    <footer className="blockquote-footer">Address: {product.address} <span title="Source Title" className="stateDisp ml-3">   State: {product.state}</span>  <a href="" className="btn btn-dark msgLink" data-toggle="modal" data-target="#exampleModal">Send Message</a></footer>
                  </blockquote>
                </div>
              </div>

                                          
                <div className="modal fade" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <div className="form-group">
                          <textarea className="form-control" name="productDescription" onChange={e => setMessage(e.currentTarget.value)} rows="3" value={message} placeholder="Enter Mesage to seller"></textarea>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                       {/* <button type="button" onClick={logUser} className="btn btn-danger">Save changes</button> */}
                      </div>
                    </div>
                  </div>
                </div>

            </li>)}
            <li></li>
          </ul>
        </div>
        <div className="col-2"></div>
      </div>

      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col"></div>
      </div>

      
    </div>
  );
}

export default Shop;