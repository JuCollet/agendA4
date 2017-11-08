import React, { Component } from "react";

import PDFDocument from "./pdfkit";
import downloadjs from "downloadjs";

import Button from "../../components/Button/Button";

export default class Print extends Component {
    
    
    
    render(){
        return (
            <Button onClick={()=>console.log('click')} title={"Print !"}/>
        );
    }
    
    
}