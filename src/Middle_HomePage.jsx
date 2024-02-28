export default function Middle_HomePage() {
 return (
   <div className="relative overflow-hidden bg-white">
     <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
       <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
         <div className="sm:max-w-lg">
           <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
           Make it an incredible journey 
           </h1>
           <p className="mt-4 text-xl text-gray-500">
           Explore the SkyBound experience and plan an unforgettable trip beyond your flight.
           </p>
         </div>
         <div>
           <div className="mt-10">
             {/* Decorative image grid */}
             <div
               aria-hidden="true"
               className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
             >
               <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                 <div className="flex items-center space-x-6 lg:space-x-8">
                   <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                     <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                       <img
                         src="https://www.nerdwallet.com/assets/blog/wp-content/uploads/2021/12/GettyImages-1335029467-1920x1152.jpg"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                     <div className="h-64 w-44 overflow-hidden rounded-lg">
                       <img
                         src="https://robbreport.com/wp-content/uploads/2018/11/emirates-private-suite_image-4web.jpg"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                   </div>
                   <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                     <div className="h-64 w-44 overflow-hidden rounded-lg">
                       <img
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJmN-UpC17CtqeZ_Xg_L07dow9nS2ZfYjsr37EJGRZ2zIKkLFdip3LyGJ6wiXCuaJM7c4&usqp=CAU"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                     <div className="h-64 w-44 overflow-hidden rounded-lg">
                       <img
                         src="https://i2-prod.dailystar.co.uk/incoming/article26367490.ece/ALTERNATES/s615/0_Stewardess-handing-champagne-to-man.jpg"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                     <div className="h-64 w-44 overflow-hidden rounded-lg">
                       <img
                         src="https://static01.nyt.com/images/2011/11/21/business/sub-cabin/sub-cabin-articleLarge.jpg?quality=75&auto=webp&disable=upscale"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                   </div>
                   <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                     <div className="h-64 w-44 overflow-hidden rounded-lg">
                       <img
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWWmk5oRIW22nU0rexHJpeI7x8mQcI7sKSUw&usqp=CAU"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                     <div className="h-64 w-44 overflow-hidden rounded-lg">
                       <img
                         src="https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2022/11/09/plane.jpg"
                         alt=""
                         className="h-full w-full object-cover object-center"
                       />
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             <a
               href="#"
               className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
             >
               Learn More
             </a>
           </div>
         </div>
       </div>
     </div>
   </div>
 )
}