import React, { useState } from 'react'

export default function Weather() {
 const api ={
  key:'d3d0141fb40ed2ae9c90d59cd44166e0',
  base:'https://api.openweathermap.org/data/2.5/'
 }
 const [ search,setsearch] = useState("")
 const [max,setMax] = useState()
 const [min,setMin] = useState()
 const [sky,setsky] = useState()
 const [time,setTime] = useState()
 const [backgroundColor, setBackgroundColor] = useState('');

 const searchPressed =() =>{
  console.log(search)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api.key}`
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=Metric&appid=${api.key}`)
  .then(result => result.json())
  .then(result=>{
   console.log(result.timezone)
   const timezoneOffsetSeconds = result.timezone;
   const timezoneOffsetMilliseconds = timezoneOffsetSeconds * 1000;
   const localTime = new Date().getTime() + timezoneOffsetMilliseconds;
   const formattedDate = new Date(localTime).toLocaleDateString();
   console.log(formattedDate)
   setTime(formattedDate)
   setsky(result.weather[0].description)
   setMax(result.main.temp_max)
   setMin(result.main.temp_min)
   if (result.main.temp_max > 20) {
    setBackgroundColor('bg-yellow-400');
  } else {
    setBackgroundColor('bg-blue-500');
  }
  })

 }
  return (
    <div className='flex justify-center flex-col items-center mb-36 '>
      

    <div className='flex items-center'>
    <input onChange={(e)=> setsearch(e.target.value)} type="text" placeholder="Search Here" className="input input-bordered w-full max-w-xs" />

     
     <button onClick={searchPressed} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg m-4">Search</button>
    </div>
     



     

    <div className={`flex flex-col justify-center items-center p-8 rounded-md w-80 sm:px-12 ${backgroundColor}`}>
        <div className="text-center">
         <h2 className="text-xl font-semibold">{search}</h2>
         <p className="text-sm dark:text-gray-600"><span className='text-2xl '>{time}</span></p>
        </div>
        {max>=20?
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-32 h-32 p-6 dark:text-yellow-600 fill-current">
         <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
         <rect width="32" height="48" x="240" y="16"></rect>
         <rect width="32" height="48" x="240" y="448"></rect>
         <rect width="48" height="32" x="448" y="240"></rect>
         <rect width="48" height="32" x="16" y="240"></rect>
         <rect width="32" height="45.255" x="400" y="393.373" transform="rotate(-45 416 416)"></rect>
         <rect width="32.001" height="45.255" x="80" y="73.373" transform="rotate(-45 96 96)"></rect>
         <rect width="45.255" height="32" x="73.373" y="400" transform="rotate(-45.001 96.002 416.003)"></rect>
         <rect width="45.255" height="32.001" x="393.373" y="80" transform="rotate(-45 416 96)"></rect>
        </svg>:null
        }
{/* weather svg */}
{max<20?
 <svg
      className='m-12'
      viewBox="0 0 24 24"
      fill="currentColor"
      height="4em"
      width="5em"
      
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M8 5a4 4 0 118 0v5.255a7 7 0 11-8 0V5zm1.144 6.895a5 5 0 105.712 0L14 11.298V5a2 2 0 10-4 0v6.298l-.856.597zM8 16h8a4 4 0 11-8 0z" />
    </svg>:null
}
        <div className="mb-2 text-3xl font-semibold">{max}
         <span className="mx-1 font-normal">/</span>{min}
        </div>
        <p className="dark:text-gray-600"><span className='text-2xl'>{sky}</span></p>
       </div>
    </div>
  )
}
