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
        <div class="pokemonDetailPage ${pokemon.type}">
            <div>
                <a href="#" class="previous round" onClick="voltar(event)">&#8249;</a>
            </div>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <div class="divImgDetailPage">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="detailPage">
                <h3> About </h3>
                <ul>
                    <li><span class="labelAbout">Species: </span>${pokemon.about_species}</li>
                    <li><span class="labelAbout">Height: </span>${pokemon.about_height}</li>
                    <li><span class="labelAbout">Weight: </span>${pokemon.about_weight}</li>
                    <li><span class="labelAbout">Abilities: </span>${pokemon.about_species}</li>
                </ul>
                <h3>Breeding</h3>
                <ul>
                    <li><span class="labelAbout">Gender: </span>♂ 87.5 | ♀ 12.5</li>
                    <li><span class="labelAbout">Egg Groups: </span>Monster</li>
                    <li><span class="labelAbout">Egg Cycle: </span>Grass</li>
                </ul>
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
        .then((pokemon) => {
            console.log('data', pokemon);
            const newHtml = convertPokemonDetail(pokemon)
            dataPokemonDetails.innerHTML = newHtml
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
