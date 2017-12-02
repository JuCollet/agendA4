import React from "react";
import "./Switch.styles.less";

export default props => {

    function clickHandler(e){
        e.currentTarget.classList.toggle('active');
        props.switchHandler({
            add : e.currentTarget.classList.contains('active'),
            data : e.currentTarget.getAttribute('data-id')
        });
    }

    return (
        <div className="switch" onClick={e => clickHandler(e)} data-id={props.id}>
            <div className="switch-toggle">
                <div className="switch-toggle-cursor"></div>
            </div>
            <div className="switch-label">{props.title}</div>
        </div>
    )
}