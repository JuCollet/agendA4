import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

import { 
  selectedMonthMock, 
  selectedCalendarsMock, 
  fetchedDataMock, 
  sortedDataMock
  } from "./Connect.mock.js";

import Connect from "./Connect";

const setup = function(customProps){
  
  const props = {
    updateFetchedData : ()=>null,
    ...customProps
  };

  const wrapper = shallow(<Connect {...props} />);
  
  return {
    props,
    wrapper
  };
  
};


describe('<Connect/>', function(){
  const { wrapper } = setup();
  it('should have a class "Connect"', function(){
    expect(wrapper.first().hasClass('Connect')).to.equal(true);
  });
  
  describe('ComponentwillReceiveNewProps()', ()=>{

    const fetchMock = sinon.spy(Connect.prototype, 'fetchCal');
    const wrapper = mount(<Connect selectedCalendars={['calB']} />);
    
    it('should not fetch data if user is signed in but got no props', ()=>{
      fetchMock.reset();
      wrapper.setState({isSignedIn : true});
      expect(fetchMock.calledOnce).to.equal(false);
    });
    
    it('should fetch data if user is signed in and receive new month', ()=>{
      fetchMock.reset();
      wrapper.setState({isSignedIn : true});
      wrapper.setProps({selectedCalendars:['calB'], selectedMonth:{timeMin:"foo"}, googleApiMock:'ok'});
      expect(fetchMock.calledOnce).to.equal(true);
    });    
    
    it('should fetch data if user is signed in and receive new calendars', ()=>{
      fetchMock.reset();
      wrapper.setState({isSignedIn : true});
      wrapper.setProps({selectedCalendars:['calA'], selectedMonth:{timeMin:"foo"}, googleApiMock:'ok'});
      expect(fetchMock.calledOnce).to.equal(true);
    });
    
    it('should not fetch data if user is not signed in', ()=>{
      fetchMock.reset();
      wrapper.setState({isSignedIn : false});
      wrapper.setProps({selectedCalendars:['calB']});
      expect(fetchMock.calledOnce).to.equal(false);
    });
    
  });
  
  describe('processData()', () => {
    it('should set the correct output based on fetchedData state', () => {
      const { wrapper } = setup();
      wrapper.setProps({selectedMonth : selectedMonthMock, selectedCalendars : selectedCalendarsMock});
      wrapper.instance().processData(fetchedDataMock);
      expect(wrapper.state('processedData')).to.eql(sortedDataMock);
    });
  });
  
  
  
});
