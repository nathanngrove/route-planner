import React from 'react'

const AddressList = ({children}) => {
  return (
    <ul className='address-list'>
        {...children}
    </ul>
  )
}

export default AddressList