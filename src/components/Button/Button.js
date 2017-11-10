import React from 'react';

export default function (props) {
  return (
    <div className="Button">
      <button onClick={()=>props.clickHandler()}>{props.title}</button>
    </div>
  )
}
