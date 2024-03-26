import React from 'react'
import { useEffect } from 'react'
import Images_HomePages from './Images_HomePages'
import Middle_HomePage from './Middle_HomePage'
import ChatBot from "react-simple-chatbot";
import {script} from "../../components/Chatbox/chatbox"
import { stepifyScript } from "../../components/Chatbox/utils";
import Packages from '../../components/Packages';

export default function HomePage() {

  useEffect(() => {
    document.title = "SkyBound";
  }, [])

  return (
    <div>
      <Images_HomePages />

      <div className='flex justify-center space-x-2 relative bottom-7'>
        <select className="select select-bordered w-full max-w-xs">
          <option disabled selected>Choose your destination</option>
          <option>Dubai</option>
          <option>Thailand</option>
        </select>
        <label className="flex justify-center w- form-control w-full max-w-xs">
          <input type="text" placeholder="Departure Airport" className="input input-bordered w-full max-w-xs" />
        </label>
        <label className="flex justify-center w- form-control w-full max-w-xs">
          <input type="text" placeholder="Arrival Airport" className="input input-bordered w-full max-w-xs" />
        </label>

      </div>

      <Middle_HomePage />
      <Packages/>


    </div>
  )
}
