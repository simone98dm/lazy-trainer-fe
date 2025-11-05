import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Switch from './Switch.vue';

describe('Switch', () => {
  it('renders correctly', () => {
    const wrapper = mount(Switch, {
      props: {
        id: 'test',
        name: 'test-1',
      },
    });
    expect(wrapper.find('#test').attributes('type')).toBe('checkbox');
  });
});
