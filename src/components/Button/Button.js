import React from "React";

export default function(props){
  return (
    <div className="Button">
      <button onClick={()=>props.clickHandler()}>{props.title}</button>
    </div>
  )
}
