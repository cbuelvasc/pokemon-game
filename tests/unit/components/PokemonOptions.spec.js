import { shallowMount } from '@vue/test-utils';
import PokemonOptions from '@/components/PokemonOptions';

import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonOptions Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonOptions, {
      props: {
        pokemons
      }
    });
  });

  test('It must match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('It should show the 4 options correctly', () => {
    const liTags = wrapper.findAll('li');
    expect(liTags.length).toBe(4);

    expect(liTags[0].text()).toBe('pikachu');
    expect(liTags[1].text()).toBe('charmander');
    expect(liTags[2].text()).toBe('venusaur');
    expect(liTags[3].text()).toBe('mew');
  });

  test('It must issue "selection" with their respective parameters when clicking', () => {
    const [li1, li2, li3, li4] = wrapper.findAll('li');

    li1.trigger('click');
    li2.trigger('click');
    li3.trigger('click');
    li4.trigger('click');
    expect(wrapper.emitted('selection').length).toBe(4);
    expect(wrapper.emitted('selection')[0]).toEqual([5]);
    expect(wrapper.emitted('selection')[1]).toEqual([10]);
    expect(wrapper.emitted('selection')[2]).toEqual([15]);
    expect(wrapper.emitted('selection')[3]).toEqual([20]);
  });
});
