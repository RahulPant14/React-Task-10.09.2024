import axios from 'axios';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import "./comp1.css";

const  Comp1=() => {

  const [users,setUsers]=useState([]);
  const [search, setSearch]=useState('');
  let key="cRQ_1IS22LHB1uFIxK1DshXQOmOJJROBmeUdSVekkIg"

  const handleChange =(e)=>{
    
    setSearch(e.target.value);

  }
  const handleSearch=()=>{

    axios.get(`https://api.unsplash.com/search/photos?query=${search}&client_id=${key}`)
    .then( (response) => {
      console.log(response.data);
      setUsers(response.data.results);
    })
    .catch((error) => {
      console.log(error);
    })

  }
     

  return (
    <>
      <div className='container'>
       <div className="myName">
       <p>Name: RAHUL PANT</p>
       <p>Email: ROHANPANT80@GMAIL.COM</p>
       </div>
        <div className="header">
              <input className='input' type="text" placeholder='ENTER YOUR SEARCH TERM' value={search} onChange={handleChange} />
              <button className='btn' onClick={handleSearch} ><i className="fa-solid fa-magnifying-glass"></i> </button>
                    
        </div>

        <div className="carts">
        {
         users.map(user => {return (
          <div className='cart' key={user.id}>
            <img src={user.urls.small} alt="#" />
            <Link to={`/addcaption/${user.id}`}><button>Add Caption</button></Link>
          </div>
         )}) 
        }
        </div>  
      </div>
     
    </>
  )
}

export default Comp1;
