import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import PlaceholderCard from './PlaceholderCard.vue';

describe('PlaceholderCard', () => {
  it('renders correctly', () => {
    const wrapper = mount(PlaceholderCard);
    expect(wrapper.find('.animate-pulse')).toBeTruthy();
  });
});
