import React, { useState } from 'react'

export default function Weather() {
 const api ={
  key:'d3d0141fb40ed2ae9c90d59cd44166e0',
  base:'https://api.openweathermap.org/data/2.5/'
 }
 const [ search,setsearch] = useState("")

 const searchPressed =() =>{
  console.log()
 }
  return (
    <div>
      <p>Weather App</p>

     <input 
     
     onChange={(e)=> setsearch(e.target.value)}
     type='text'/>

     <button onClick={searchPressed}>Search</button>


     

     <p>Dhaka,Bd</p>

     <p>32C,Bd</p>
    </div>
  )
}
