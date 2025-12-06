import React from 'react'

export default function Label({className, labelText, id}) {
  return (
    <label id={id} className= {className}> {labelText} </label>
  )
}
