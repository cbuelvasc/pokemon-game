import { shallowMount } from '@vue/test-utils'
import PokemonImage from '@/components/PokemonImage'

describe('PokemonImage component', () => {

  test('It must match snapshot', () => {
    const wrapper = shallowMount(PokemonImage, {
      props: {
        pokemonId: 1,
        showPokemon: false
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  })

  test('It must show hidden picture and pokemon number 100', () => {
    const wrapper = shallowMount(PokemonImage, {
      props: {
        pokemonId: 100,
        showPokemon: false
      }
    });
    const [imgOne, imgTwo] = wrapper.findAll('img')

    expect(imgOne.exists()).toBeTruthy()
    expect(imgOne.classes('hidden-pokemon')).toBe(true)
    expect(imgTwo).toBe(undefined)
    expect(imgOne.attributes('src')).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg')
  })

  test('It should show the pokemon if the property showPokemon:true', () => {
    const wrapper = shallowMount(PokemonImage, {
      props: {
        pokemonId: 100,
        showPokemon: true
      }
    });
    const img = wrapper.find('img')

    expect(img.exists()).toBeTruthy()
    expect(img.classes('hidden-pokemon')).toBe(false)
    expect(img.classes('fade-in')).toBe(true)
  })
})
