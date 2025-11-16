import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Loading from './Loading.vue';

describe('Loading', () => {
  it('renders correctly', () => {
    const wrapper = mount(Loading);
    expect(wrapper.find('svg').classes()).toContain('w-16');
    expect(wrapper.find('svg').classes()).toContain('h-16');
    expect(wrapper.find('svg').classes()).toContain('text-green-600');
  });
  it('renders correctly', () => {
    const wrapper = mount(Loading, {
      props: {
        color: 'purple',
        small: true,
      },
    });
    expect(wrapper.find('svg').classes()).toContain('w-6');
    expect(wrapper.find('svg').classes()).toContain('h-6');
    expect(wrapper.find('svg').classes()).toContain('text-purple-600');
  });
});
