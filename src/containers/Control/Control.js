import React, { Component } from "react";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Month } from "./Control.utils";
import logo from "../../assets/img/logo.svg";

import DropBox from "../DropBox/DropBox";
import Select from "../../components/Select/Select";
import Styles from "../../components/Styles/Styles";
import Switch from "../../components/Switch/Switch";

import "./Control.anim.less";

export default class Control extends Component {

    constructor(props){
        super(props);
        this.state = {
            showMonthOptions : false
        };
        this.switchHandler = this.switchHandler.bind(this);
        this.toggleShowMontOptions = this.toggleShowMonthOptions.bind(this);
    };

    componentDidMount(){
        this.props.updateSelectedMonth(Month.getCurrentMonth());
    }

    renderCalendarSwitches(){        
        return this.props.calendarList.map(el => {
            return <Switch key={el.id} title={el.summary} id={el.id} switchHandler={this.switchHandler} />
        })
    }

    switchHandler(selected){
        let selectedCalendars = this.props.selectedCalendars;
        if(selected.add){
            selectedCalendars.push(selected.data);
            this.props.updateSelectedCalendars(selectedCalendars);
        } else {
            this.props.updateSelectedCalendars(selectedCalendars.filter(el => {
                return el !== selected.data
            }));
        }
    }

    toggleShowMonthOptions(){
        this.setState({
            showMonthOptions : !this.state.showMonthOptions
        })
    };

    render(){
        return (
            <div className="control">
                <div className="control-header">
                    <img src={logo}/>
                    <span onClick={() => {
                        this.props.signOut(this.props.updateIsSignedIn);
                        this.props.resetState();
                    }} className="link-underline">Se déconnecter</span>
                </div>
                <ReactCSSTransitionGroup
                    component="div"
                    className="reactCSSTransitionGroupDiv"
                    transitionAppear={true}
                    transitionAppearTimeout={250}                
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}
                    transitionName="SlideUp">
                    <div className="control-box">
                        <h2 className="link-underline margin-md-top" onClick={() => this.toggleShowMontOptions()}>{this.props.selectedMonth.string}</h2>
                        {this.state.showMonthOptions ? <Select options={Month.createList()} updateSelectedMonth={this.props.updateSelectedMonth} clickCallback={this.toggleShowMonthOptions.bind(this)}/> : null}
                        <h2 className="margin-lg-top">Style</h2>
                        <Styles updateSelectedStyle={this.props.updateSelectedStyle}/>
                        <h2 className="margin-lg-top">Calendriers à intégrer</h2>
                        {this.renderCalendarSwitches()}
                        <h2 className="margin-lg-top">Image</h2>
                        <DropBox updateImgBlob={this.props.updateImgBlob} />
                    </div>
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}