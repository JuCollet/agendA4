import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";

import DropBox from "./DropBox";

const setup = customProps => {
    
    const props = Object.assign({
        ...customProps
    });

    const mockOnChange = sinon.spy();
    
    const wrapper = shallow(<DropBox {...props} updateImgBlob={mockOnChange} />);
    
    return {
        mockOnChange,
        wrapper
    };
    
}

describe('<DropBox/>', function(){
    it('should update the imgBlobUrl on input change', function(){
        const { wrapper, mockOnChange } = setup();
        wrapper.find('#file').simulate('change', {target : { files : [ { type : "image/jpeg" }]}});
        expect(mockOnChange.calledOnce).to.equal(true);
    });
})