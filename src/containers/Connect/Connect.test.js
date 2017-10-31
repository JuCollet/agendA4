import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

import { 
  selectedMonthMock, 
  selectedCalendarsMock, 
  fetchedDataMock, 
  sortedDataMock} 
  from "./ControlBox.mock";

import Connect from "./Connect";

const setup = function(customProps){
  
  const props = {
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
  
  it('should drop a calendar data in dataFetched if user deselect calendar', () => {
    const { wrapper } = setup();
    const startState = { fetchedData : { cal1: [1,2], cal2: [2,3] }};
    wrapper.setProps({selectedCalendars : 'cal1' });
    wrapper.setState(startState);
    expect(wrapper.state('fetchedData')).to.eql(startState.fetchedData);
    wrapper.setProps({selectedCalendars : 'cal3'});
    expect(wrapper.state('fetchedData')).to.not.eql(startState.fetchedData);
  });
  
  it('should reset the dataFetched if user change date', () => {
    const { wrapper } = setup({selectedCalendars : []});
    const startState = { fetchedData : { cal1: [1,2], cal2: [2,3] }};
    wrapper.setProps({selectedMonth : ['1'] });
    wrapper.setState(startState);
    expect(wrapper.state('fetchedData')).to.eql(startState.fetchedData);
    wrapper.setProps({selectedMonth : ['2'] });
    expect(wrapper.state('fetchedData')).to.not.eql(startState.fetchedData);
  });  
  
  describe('fetch', ()=>{
    const fetchMock = sinon.spy(Connect.prototype, 'fetchCal');
    const wrapper = mount(<Connect/>);
    
    it('should refetch data when receive new props if user is signed in', ()=>{
      wrapper.setState({isSignedIn : true});
      wrapper.setProps({selectedCalendars:['calA'], selectedMonth:{timeMin:"foo"}});
      expect(fetchMock.calledOnce).to.equal(true);
    });
    
    it('should not refetch data when receive new props if user is not signed in', ()=>{
      fetchMock.reset();
      wrapper.setState({isSignedIn : false});
      wrapper.setProps({selectedCalendars:['calB']});
      expect(fetchMock.calledOnce).to.equal(false);
    });  
    
  });
  
});
