import React from 'react'

export default function Button(props) {
   
  const {classText, label, onButtonClick }=props;
    
  return (
    <>
      <button data-testid="button-test" type="button" onClick={() => {onButtonClick()}} className={classText}>{label}</button>        
    </>
  )
}
