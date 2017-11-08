import React from "react";
import { mount, shallow } from "enzyme";
import { expect } from "chai";

import DropBox from "./DropBox";

const setup = customProps => {
    
    const props = Object.assign({
        ...customProps
    });
    
    const wrapper = shallow(<DropBox {...props} />);
    
    return {
        wrapper
    };
    
}

describe('<DropBox/>', function(){
    it('should update the imgBlobUrl on input change', function(){
        expect(false).to.equal(true);
    });
})