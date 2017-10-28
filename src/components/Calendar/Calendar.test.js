import React from "react";
import { mount, shallow} from 'enzyme';
import { expect } from "chai";
import sinon from "sinon";

import Calendar from "./Calendar";

const mockData = [{id:"perso", resume:"cal perso"},{id:"pro", resume:"cal pro"},{id:"anniversaires", resume:"cal anniversaires"}];

const setup = (customProps) => {
  
  const props = Object.assign({
    calendarList : [0,1,2],
    ...customProps
  });
  
  const mockOnChange = sinon.spy();
  
  const wrapper = shallow(<Calendar {...props} calendarCheckHandler={mockOnChange} />);

  return {
    mockOnChange,
    props,
    calendarItem : wrapper.find('.calendar-list-item'),
    wrapper,
  };
  
};

describe('<Calendar/>', function(){
  
  it('should have a class "Calendar"', function(){
    const { wrapper } = setup();
    expect(wrapper.first().hasClass('Calendar')).to.equal(true);
  });
  
  it('should have the number of calendars passed to the element', ()=>{
    const calendarList = [0,1,2,3,4];
    const { calendarItem } = setup({calendarList});
    expect(calendarItem).to.have.length(calendarList.length);
  });
  
  it('should not throw an error if no calendars are provided', ()=>{
    const calendarList = null;
    const { calendarItem } = setup({calendarList});
    expect(calendarItem).to.have.length(0);
  });  
  
  it('should display the correct content', ()=>{
    const { calendarItem } = setup({calendarList : mockData});
    calendarItem.forEach((node,index)=>{
      expect(node.html()).to.equal(`<div class="calendar-list-item"><input type="checkbox" name="${mockData[index].resume}" value="${mockData[index].id}"/><span>${mockData[index].resume}</span></div>`);
    });
  });
  
  it('should send the selected values back to parent', ()=> {
    const { calendarItem, mockOnChange } = setup();
    calendarItem.find('input').first().simulate('change');
    expect(mockOnChange.calledOnce).to.equal(true);
  });
  
});