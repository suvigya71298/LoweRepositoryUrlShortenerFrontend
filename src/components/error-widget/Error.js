import React from 'react'

export default function Error(props) {
    const {message} = props;
  return (
    <div data-testid="error-test" className='container' style={{color: "red"}}>{message}</div>
  )
}
