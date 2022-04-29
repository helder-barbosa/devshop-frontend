import React from 'react'
import Link from 'next/link'

const Button = ({ children, type = 'submit' }) => {
  return (
    <button
      type={type}
      className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
    >
      {children}
    </button>
  )
}

const ButtonLink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        {children}
      </a>
    </Link>
  )
}

const ButtonLinkOutline = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className=' bg-transparent border-solid border-2 border-blue-500 hover:bg-blue-500 text-blue-700 hover:text-white font-bold py-2 px-4 mx-2 rounded'>
        {children}
      </a>
    </Link>
  )
}

Button.LinkOutline = ButtonLinkOutline
Button.Link = ButtonLink

export default Button
