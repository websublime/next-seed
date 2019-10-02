import { shallow } from 'enzyme';
import React from 'react';

import Nav from '../nav-component';

describe('Nav Component', () => {
  it('Nav shows "Hello World" in a <a> tag', () => {
    const nav = shallow(<Nav title="Hello World" />);
    expect(nav.find('a').text()).toEqual('Hello World');
  });
});
