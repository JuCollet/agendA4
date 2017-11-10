import React, { Component } from "react";

export default class DropBox extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            canDragnDrop: false
        };
        this.fileInputHandler = this.fileInputHandler.bind(this);
    }
    
    componentDidMount(){
     
        const div = document.createElement('div');
        if('draggable' in div || 'ondragstart' in div && 'ondrop' in div && 'FormData' in window && 'FileReader' in window){
            this.setState({
                canDragnDrop : true
            });
        }
    }
    
    fileInputHandler(e){
        if( e &&
            e.target.files && 
            e.target.files[0] &&
           (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png")){
            this.props.updateImgBlobUrl(URL && URL.createObjectURL ? URL.createObjectURL(e.target.files[0]) : null);
        }
    }
    
    render(){
        return (
            <div>
                <form className="dropbox" method="post" encType="multipart/form-data">
                    <div className="dropbox_input">
                        <input type="file" id="file" onChange={e=>this.fileInputHandler(e)}/>
                        {this.state.canDragnDrop ? "can drag" : "cannot drag"}
                    </div>
                </form>
            </div>
        );
    }
}