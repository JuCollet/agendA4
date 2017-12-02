import React from "react";
import _ from "lodash";
import './Select.styles.less';
import './Select.anim.less';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function(props){

  const clickHandler = e => {
    props.updateSelectedMonth(_.find(props.options, {string : e.target.innerText}));
    if(props.clickCallback) props.clickCallback();
  }

  return (
    <ul className="Select" onClick={e => clickHandler(e)}>
      <ReactCSSTransitionGroup
      component="div"
      className="reactCSSTransitionGroupDiv"
      transitionAppear={true}
      transitionAppearTimeout={250}                
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
      transitionName="FadeIn">
        {props.options.map(el=>{
          return <li key={el.string}><span className="option-box"><span>{el.string}</span></span></li>;
        })}
      </ReactCSSTransitionGroup>
    </ul>
  );
}