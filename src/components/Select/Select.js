import React from "react";

export default function(props){
  return (
    <div className="Select">
      <select onChange={e=>props.selectOnChangeHandler(e)}> 
        {props.selectOptions.map(el=>{
          return <option key={el} value={el}>{el}</option>;
        })}
      </select>
    </div>
  );
}