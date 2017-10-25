import React from "React";
import PropTypes from "prop-types";

import Connect from "../../containers/Connect/Connect";
import Events from "../../containers/Events/Events";
import Photos from "../../containers/Photos/Photos";
import Calendar from "../Calendar/Calendar";
import Select from "../Select/Select";
import Button from "../Button/Button";

export default function(){
  return (
    <div className="ControlBox">
      <Connect/>
      <Select/>
      <Photos/>
      <Calendar/>
      <Events/>
      <Button/>
    </div>
  )
}
