var pokemons = [];
var container = document.querySelector('.pokemon-container');
var offset = 0;
var page = 1;

var left = document.querySelectorAll('.btn-wraper .left');
var right = document.querySelectorAll('.btn-wraper .right');

var pageSpan = document.querySelectorAll('.btn-wraper .pageNumber');

var loading = document.querySelector('section.load');

for(let i = 0; i < left.length; i++){

    left[i].addEventListener('click',function(){

        if(offset != 0){
            offset-=12;
            page--;
        }

        fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=12&offset='+offset);

    });
}

for(let i = 0; i < right.length; i++){

    right[i].addEventListener('click',function(){

        offset+=12;
        page++;
        fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=12&offset='+offset);

    });
}

function changePageNumber(page){

    for(let i = 0; i < pageSpan.length; i++){

        pageSpan[i].innerHTML = page;

    }

}

function fetchPokemons(url){

    loading.style.display = 'flex';

    fetch(url)
    .then(response => response.json())
    .then(allpokemon => {

        allpokemon.results.map(function(val){

            fetch(val.url).then(response => response.json()).then(pokemonSingle => {

                pokemons.push({nome : val.name, img : pokemonSingle.sprites.front_default, id:pokemonSingle.id});

                console.log(pokemonSingle)

                if(pokemons.length == 12){
                    
                    addPokemons();
                    changePageNumber(page);
                    pokemons = [];
                    loading.style.display = 'none';

                }

            });

        });

    });

}

fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=12&offset='+offset);

function addPokemons(){

    container.innerHTML = ""

    for(let i = 0; i < pokemons.length; i++){

        pokemons.sort(function(a,b){
            return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        });
    
        container.innerHTML += `
        
        <div class="pokemon-box">
            <img src="${pokemons[i].img}", alt="">
            <div class="info">
                <span class="name">${pokemons[i].nome}</span><!--name-->
                <span class="id">id:${pokemons[i].id}</span><!--id-->
            </div><!--info--></div>
        <!--pokemon-box-->`
    }

}