import React, { Component } from "react";

export default class DropBox extends Component {
    
    constructor(props){
        super(props);
        this.fileInputHandler = this.fileInputHandler.bind(this);
    }
        
    fileInputHandler(e){
        if( e &&
            e.target.files && 
            e.target.files[0] &&
           (e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png")){
            const url = URL && URL.createObjectURL ? URL.createObjectURL(e.target.files[0]) : null;
            this.props.updateImgBlob({
                url : url
            });
        }
    }

    onDragOver(e){
        e.preventDefault();
        e.currentTarget.classList.add("dragzone-hover");
    }
      
    onDragLeave(e){
        e.currentTarget.classList.remove("dragzone-hover");
    }

    onDrop(e){
        e.preventDefault();
        const dt = e.dataTransfer;
        e.currentTarget.classList.remove("dragzone-hover");        
        if(dt.files[0].type !== "image/jpeg" && dt.files[0].type !== "image/png") return;
        const url = URL && URL.createObjectURL ? URL.createObjectURL(dt.files[0]) : null;
        this.props.updateImgBlob({url});
        e.currentTarget.classList.remove("dragzone-hover");        
    }

    renderUploadInput(){
        const div = document.createElement('div');
        if(this.props.test === true){
            return <input type="file" id="file" onChange={e=>this.fileInputHandler(e)}/>;
        };
        if('draggable' in div || 'ondragstart' in div && 'ondrop' in div && 'FormData' in window && 'FileReader' in window){
            return <div className="dragzone" onDragOver={e => this.onDragOver(e)} onDragLeave={e => this.onDragLeave(e)} onDrop={e => this.onDrop(e)}>Dépose ici ton image</div>;            
        } else {
            return <input type="file" id="file" onChange={e=>this.fileInputHandler(e)}/>;
        }
    }
    
    render(){
        return (
            <div className="margin-lg-bottom">
                <form className="dropbox" method="post" encType="multipart/form-data">
                    {this.renderUploadInput()}
                </form>
            </div>
        );
    }
}