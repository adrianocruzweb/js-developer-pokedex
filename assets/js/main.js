const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const sectionPrincipal = document.getElementById('principal')
const sectionDetail = document.getElementById('detail')
const dataPokemonDetails = document.getElementById('dataPokemonDetails')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" onClick="openDetail(event,${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function convertPokemonDetail(pokemon) {
    return `
        <div class="pokemonDetailPage ${pokemon.type}" onClick="openDetail(event,${pokemon.number})">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function loadDataPokemonDetail(id) {
    pokeApi.getPokemonDetailPage(id)
        .then((data) => {
            console.log('data', data);
            /* const newHtml = pokemons.map(convertPokemonToLi).join('')
            dataPokemonDetails.innerHTML += newHtml */
        })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function openDetail(event, idPokemon) {
    sectionPrincipal.style.display = 'none';
    sectionDetail.style.display = 'block';
    loadDataPokemonDetail(idPokemon);
}

function voltar(event) {
    sectionPrincipal.style.display = 'block';
    sectionDetail.style.display = 'none';
}
