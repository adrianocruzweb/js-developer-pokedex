
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function convertPokeApiDetailToPokemonGetONE(pokeDetail) {
    const pokemon = new PokemonDetail()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
    pokemon.about_species = pokeDetail.species.name;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.about_height = pokeDetail.height;
    pokemon.about_weight = pokeDetail.weight;
    pokemon.about_abilities = abilities;



    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getPokemonDetailPage = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonGetONE)
        //.then((jsonBody) => {console.log('aqui',jsonBody)})
        //.then((pokemonDetail) => {console.log('pokemonDetail',pokemonDetail)})
}