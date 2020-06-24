import React, { useContext, useState, useEffect} from 'react';
import {BrowserRouter as Route,  Redirect } from 'react-router-dom';
import { AuthContext } from '../Auth';

import "../App.css";

import firebase from '../firebase';

function Listing(){

  const { currentUser } = useContext(AuthContext);
 
  const [user, setUser] = useState()
  const [userId, setUserId] = useState()
 
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [address, setAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')




    if(currentUser == null ){
      alert("You need to Log in to List an item")
      return <Redirect to={"/"} />;
    }else if(currentUser.displayName == null){  
      alert("You need to update Your Profile to List an item")
      return <Redirect to={"/updateUser"} />;
    }
  

  function userAsign(){
    let  name = currentUser.displayName;
    /*let  email = currentUser.email;
    let  photoUrl = currentUser.photoURL;
    let  emailVerified = currentUser.emailVerified;
    let  uid = currentUser.uid; */
    setUser(name)
    setUserId(currentUser.uid)
    console.log(name)
  }




  function onSubmit(e){
    e.preventDefault()
    userAsign();

     firebase
    .firestore()
    .collection('productData')
    .add({
      productName,
      productDescription,
      quantity: parseInt(quantity),
      address,
      state,
      city,
      zip,
      user : currentUser.uid
    })
    .then(() =>{
      setProductName('')
      setProductDescription('')
      setQuantity('')
      setAddress('')
      setState('')
      setCity('')
      setZip('')

    })

  }

 
    return(
      <div className="container" id="ListPg" >        
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
              <h4>List Your Product </h4>
            </div>
            <div className="col-3">

            </div>
            <div className="col"></div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" onChange={e => setProductName(e.currentTarget.value)} value={productName} className="form-control" name="productName"  placeholder="Product Name" />
              </div>
              <div className="form-group">
                <textarea className="form-control" name="productDescription" onChange={e => setProductDescription(e.currentTarget.value)} rows="3" value={productDescription} placeholder="Product Description"></textarea>
              </div>
              <div className="form-group">
                  <label id="exampleFormControlSelect1">Quantity</label>
                  <select className="form-control" name="quantity" value={quantity} onChange={e => setQuantity(e.currentTarget.value) } placeholder="Quantity">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
              </div>
              <div className="form-group">
                
                <input type="text" className="form-control" value={address} onChange={e => setAddress(e.currentTarget.value)} name="address1" placeholder="Address"  />
              </div>
              <div className="row pb-3">
                <div className="col"><input type="text" value={state} onChange={e => setState(e.currentTarget.value)} className="form-control" name="State" placeholder="State"  /></div>
                <div className="col"><input type="text" value={city} onChange={e => setCity(e.currentTarget.value)} className="form-control" name="city" placeholder="City" /></div>
              
              </div>
              
              <div className="form-group">
                <input type="text" className="form-control" value={zip} onChange={e => setZip(e.currentTarget.value)} name="zipcode" placeholder="Zip Code"  />
              </div>
              <button type="submit" value="Submit">Submit</button>
              <button type="submit" value="" onClick={userAsign} >Log</button>
            </form>
            </div>
          <div className="col-3"></div>
          
        </div>
        
      </div>
    );
  

}


export default Listing;