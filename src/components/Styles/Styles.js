import React from "react";

import styleList from "../../assets/calendarStyles";
import "./Styles.styles.less";

export default props => {

    const clickHandler = function(e){
        [].forEach.call(e.currentTarget.parentNode.querySelectorAll('.styles-item'), el => {
            el.classList.remove('active');
        });
        e.currentTarget.querySelector('.styles-item').classList.add('active');
    }

    return (
        <ul className="styles-list">
            {styleList.map((el, index) => {
                return (
                    <li key={index} onClick={e => clickHandler(e)}>
                        <div className={index === 0 ? "styles-item active" : "styles-item"}>
                            <img height="90" width="70"/>
                            <span className="styles-label">Style {index+1}</span>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}