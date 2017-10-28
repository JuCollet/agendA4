import React from "react";

export default function(props){
  
  function renderCalendarList(){
    if(!props.calendarList){
      return;
    }
    return props.calendarList.map((el,index)=>{
      return (
        <div className="calendar-list-item" key={index}>
          <input type="checkbox" name={el.resume} value={el.id} onChange={e=>props.calendarCheckHandler(e)}/>
          <span>{el.resume}</span>
        </div>
      );
    });
  }
  
  return (
    <div className="Calendar">
      {renderCalendarList()}
    </div>
  );
}