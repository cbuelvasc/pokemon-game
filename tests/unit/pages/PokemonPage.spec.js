import { shallowMount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import { pokemons } from '../mocks/pokemons.mock';

describe('PokemonPage Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test('It must match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('It should call mixPokemons when mounting', () => {
    const mixPokemonSpy = jest.spyOn(
      PokemonPage.methods,
      'mixPokemons'
    );
    const wrapper = shallowMount(PokemonPage);

    expect(mixPokemonSpy).toHaveBeenCalled();
  });

  test('It must match with the snapshot when the pokemons load', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        };
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test('It should show the PokemonPicture and PokemonOptions components', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        };
      }
    });

    const image = wrapper.find('pokemon-image-stub');
    const options = wrapper.find('pokemon-options-stub');

    expect(image.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    expect(image.attributes('pokemonid')).toBe('5');
    expect(options.attributes('pokemons')).toBeTruthy();
  });

  test('Test with checkAnswer', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemons: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: ''
        };
      }
    });

    await wrapper.vm.checkAnswer(5);

    expect(wrapper.find('h2').exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`);

    await wrapper.vm.checkAnswer(10);

    expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`);
  });
});
