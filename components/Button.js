import React from 'react'

const Button = ({ loading, type, children }) => {
  return (
    <button
      className="w-full mt-2 p-4 rounded bg-cyan-700 hover:bg-cyan-900 text-white text-lg"
      type={type}
      disabled={loading}
    >
      { children }
    </button>
  )
}

export default Button;