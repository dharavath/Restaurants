import React,{useEffect} from 'react';
import { useLocation } from 'react-router';
// import { Router, navigate } from '@reach/router'
import {Link } from "react-router-dom";



const Restaurant = ({restDetails}) => {



const location = useLocation()
const {state:restaurant}=location || {}

// useEffect(async() => {

// 	const response=  await  fetch( `https://developers.zomato.com/api/v2.1/restaurant?res_id=${restaurant.R.res_id}`,
      
//       {
//         method: 'GET',
//         headers: {
//             Accept: 'application/json',
//             'user-key': '2ad63f94902019632381f2df301a60cc'
//         }
//     }
//       );
//       const data = await response.json();
// 	  console.log("menu",data)
	
// }, [restaurant])

	console.log("deta",restaurant)
	return (
		<div className="restaurant-tile">
			<img alt="" src={restaurant.thumb} className="rest-img" />
			<div className="rest-rating">
			<Link to={{  pathname: "/" }}><button  className = "back-btn" >Back</button> </Link>
			
			</div>
			<div className="rest-details">
				<h2 className="rest-name">{restaurant.name}</h2>
				<div className="rest-loc">{restaurant.location.locality}</div>
				<div className="rest-add">{restaurant.location.address}</div>
				<hr/>
				<div className="rest-cusines"><strong>CUISINES:</strong> {restaurant.cuisines}</div>
				<div className="rest-cost"><strong>COST FOR TWO:</strong> Rs.{restaurant.average_cost_for_two}</div>
				<div className="rest-cost"><strong>Menu:</strong>{restaurant.cuisines}</div>
			</div>
			
		</div>
	)
}

export default Restaurant
