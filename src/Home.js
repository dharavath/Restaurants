import React, {useEffect, useState} from 'react';
import './App.css';
import Restaurant from './components/Restaurant';
import {Link } from "react-router-dom";



function Home() {

	const [restaurant, setRest] = useState([]);
	const [id, setId] = useState();	
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState([0, ""])
	const [restDetails,setRestDetails]=useState();
	const [isshow,setIsShow]=useState(false)
    const [lat,setLat]=useState()

    const  success=async(pos)=> {
        let crd = pos.coords;
    const response=  await  fetch( `https://developers.zomato.com/api/v2.1/geocode?lat=${crd.latitude}&lon=${crd.longitude}`,
      
      {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'user-key': '2ad63f94902019632381f2df301a60cc'
        }
    }
      );
      const data = await response.json();
    //   setRest(data.restaurants);
      console.log("locations",data.nearby_restaurants)
      setRest(data.nearby_restaurants);

        setLat(pos)
        console.log("Your current position is:");
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
      }

    useEffect(() => {
        if (navigator.geolocation) {

            navigator.permissions
            .query({ name: "geolocation" })
            .then(function (result) {
              if (result.state === "granted") {
                console.log(result.state);
                
                navigator.geolocation.watchPosition(success)
              } else if (result.state === "prompt") {
                console.log(result.state);
                navigator.geolocation.getCurrentPosition(success, );
              } else if (result.state === "denied") {
                //If denied then you have to show instructions to enable location
              }
              result.onchange = function () {
                console.log(result.state);
              };
            });
            console.log('GeoLocation is Available!');
            } else {
            console.log('Sorry Not available!');
        }
    },[])
	
	const getRestaurants = async () => {
		if(!(query[0] === 0 || query[1] === "")){
			const response = await fetch(
				`https://developers.zomato.com/api/v2.1/search?entity_id=${query[0]}&entity_type=city&q=${query[1]}&count=10`, 
				{
					method: 'GET',
					headers: {
						Accept: 'application/json',
						'user-key': '2ad63f94902019632381f2df301a60cc'
					}
				}
			);
			const data = await response.json();
			setRest(data.restaurants);
			console.log("rest",data.restaurants)
		}
		
	};
	
	const updateID = e => {
		setId(e.target.value);
	}
	
	const updateSearch = e => {
		setSearch(e.target.value);
        
	}
	
	const getSearch = e => {
		setQuery([id, search]);
        getRestaurants();
       
	}

	console.log("e",restDetails)
	
	return (
	    <div className="App">
	  		<div className="jumbotron"></div>
			  <form className="searchBar"  onSubmit={getSearch}>
					<div>
						<select id="select_id" className="city form-control" onChange={updateID}>
		  					<option value="0" hidden>Select City</option>
		  					<option value="4">Bengaluru</option>
		  					<option value="3" >Mumbai</option>
		  					<option value="1">Delhi</option>
		  					<option value="6">Hyderabad</option>
		  					<option value="5">Pune</option>
		  					<option value="11290">Trivandrum</option>
		  					<option value="7">Chennai</option>
		  					<option value="11">Ahmedabad</option>				  
		  				</select>
						<input id="getText" type="text" className="restaurant" placeholder="Search for Restaurant" onChange={updateSearch}/>
		  				<button id = "getMessage" className = "search-btn">Search</button>
					</div>
				</form>


			{restaurant.map(rest => (
				<Link to={{
                    pathname: "/restaurant",
                    state: rest.restaurant,
                    
                 }}>
				  <div className="restaurant-tile-list"  key={rest.restaurant.id}>
			  <div className="rest-details">
				  <h2 className="rest-name">{rest.restaurant.name}</h2>
				  <div className="rest-loc">{rest.restaurant.location.locality}</div>
				  <div className="rest-add">{rest.restaurant.location.address}</div></div>
				 
				  </div>
				  </Link>
					  
			))}
	    </div>
  );
}

export default Home;
