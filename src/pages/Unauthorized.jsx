import React from 'react'

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Unauthorized</h1>
      <div className="max-w-lg text-center">
        <p className="mb-4">You are not welcomed</p>
      </div>
    </div>
  )
}

export default Unauthorized