import React from 'react'

export default function TextField(props) {
  const {text, classText, placeHolderText}=props;
  return (
    <div data-testid="text-field-test" className='container'>
        <div className="mb-3">
        <label data-testid="text-field-label-test" htmlFor="inputUrl" className="form-label">{props.label}</label>
        <input data-testid="text-field-input-test" type="text" onChange={(event) => {props.onFieldChange(event)}} value={text} className={classText} id="inputUrl"
         placeholder={placeHolderText} />
        </div>
    </div>
  )
}
