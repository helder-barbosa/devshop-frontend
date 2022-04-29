import React from 'react'

const Input = ({
  type = 'text',
  placeholder = '',
  label = '',
  value,
  onChange,
  name
}) => {
  return (
    <div className='w-full md:w-full px-3 mb-6'>
      <label
        className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
        htmlFor='name'
      >
        {label}
      </label>
      <input
        className='appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none'
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  )
}

export default Input
