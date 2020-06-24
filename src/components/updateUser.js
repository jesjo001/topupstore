import React, { useContext, useState} from 'react';
import "../App.css";
import {  AuthContext } from '../Auth';import {BrowserRouter as Route,  Redirect } from 'react-router-dom';



function UpdateUser({history}){
    
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState('') 
  const [userAddress, setUserAddress] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  if(currentUser == null ){
    alert("You need to Log in to update your profile ")
    return <Redirect to={"/Shop"} />;
    
  }
  
  function onSubmit(e){
    e.preventDefault()

    if(currentUser){
        currentUser.updateProfile({
          displayName : userName + '|' + zip + '|' + state + '|' + city 
    
        }).then(function() {
        // Update successful.
        history.push("./Listing")
        
        }).catch(function(error) {
          // An error happened.
          alert(error)
        });
        
      } 
  }
 
    return(
      <div className="container" id="ListPg" data-dismiss="modal" >   
        
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6 text-white"><h4>Update Your Profile to Continue</h4></div>
            <div className="col-3"></div>
        </div>
  
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" onChange={e => setUserName(e.currentTarget.value)} value={userName} className="form-control" name="userName"  placeholder="UserName" />
              </div>              
              <div className="form-group">
                <input type="text" className="form-control" value={userAddress} onChange={e => setUserAddress(e.currentTarget.value)} name="address1" placeholder="Address"  />
              </div>
              <div className="row pb-3">
                <div className="col"><input type="text" value={state} onChange={e => setState(e.currentTarget.value)} className="form-control" name="State" placeholder="State"  /></div>
                <div className="col"><input type="text" value={city} onChange={e => setCity(e.currentTarget.value)} className="form-control" name="city" placeholder="City" /></div>
              
              </div>
              
              <div className="form-group">
                <input type="text" className="form-control" value={zip} onChange={e => setZip(e.currentTarget.value)} name="zipcode" placeholder="Zip Code"  />
              </div>
              <button type="submit" value="Submit">Submit</button>
            </form>
            </div>
          <div className="col-3"></div>
          
        </div>
        
      </div>
    );
  

}


export default UpdateUser;