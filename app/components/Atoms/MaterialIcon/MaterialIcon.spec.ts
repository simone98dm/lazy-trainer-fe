import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MaterialIcon from './MaterialIcon.vue';

describe('MaterialIcon', () => {
  it('renders correctly', () => {
    const wrapper = mount(MaterialIcon);
    expect(wrapper.classes()).toContain('material-icons');
  });
  it('renders correctly', () => {
    const wrapper = mount(MaterialIcon, {
      props: {
        component: 'add',
      },
    });
    expect(wrapper.html()).toContain('add');
  });
});
