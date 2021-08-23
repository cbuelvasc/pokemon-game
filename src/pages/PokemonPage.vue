<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <h1>¿Quién es este pokémon?</h1>
    <PokemonImage
      v-bind:pokemonId="pokemon.id"
      v-bind:showPokemon="showPokemon"
    />
    <PokemonOptions
      v-bind:pokemons="pokemons"
      @selection="checkAnswer"
    />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>

  </div>
</template>

<script>
import PokemonImage from '@/components/PokemonImage.vue'
import PokemonOptions from '@/components/PokemonOptions.vue'
import getPokemonOptions from '@/helpers/getPokemonOptions'

export default {
  name: 'Pokemon',
  components: {
    PokemonImage,
    PokemonOptions
  },
  data () {
    return {
      pokemons: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemons () {
      this.pokemons = await getPokemonOptions()
      const randomNumber = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemons[randomNumber]
    },
    checkAnswer (pokemonId) {
      this.showPokemon = true
      this.showAnswer = true
      if (pokemonId === this.pokemon.id) {
        this.message = `Correcto, ${this.pokemon.name}`
      } else {
        this.message = `Oops, era ${this.pokemon.name}`
      }
    },
    newGame () {
      this.pokemons = []
      this.pokemon = null
      this.showPokemon = false
      this.showAnswer = false

      this.mixPokemons()
    }
  },
  mounted () {
    this.mixPokemons()
  }
}
</script>
