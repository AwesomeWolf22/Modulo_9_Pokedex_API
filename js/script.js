var pokemons = [];
var container = document.querySelector('.pokemon-container');
var offset = 0;
var page = 1;

var left = document.querySelectorAll('.btn-wraper .left');
var right = document.querySelectorAll('.btn-wraper .right');

var pageSpan = document.querySelectorAll('.btn-wraper .pageNumber')

for(let i = 0; i < left.length; i++){

    left[i].addEventListener('click',function(){

        if(offset != 0){
            offset-=12;
            page--;
        }

        fetchPokemons(offset)

    });
}

for(let i = 0; i < right.length; i++){

    right[i].addEventListener('click',function(){

        offset+=12;
        page++;
        fetchPokemons(offset)

    });
}

function changePageNumber(page){

    for(let i = 0; i < pageSpan.length; i++){

        pageSpan[i].innerHTML = page;

    }

}

function fetchPokemons(offset){

    fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset='+offset)
    .then(response => response.json())
    .then(allpokemon => {

        allpokemon.results.map(function(val){

            fetch(val.url).then(response => response.json()).then(pokemonSingle => {

                pokemons.push({nome : val.name, img : pokemonSingle.sprites.front_default});

                if(pokemons.length == 12){
                    addPokemons();
                    changePageNumber(page);
                    pokemons = [];
                }

            });

        });

    });

}

fetchPokemons(offset);

function addPokemons(){

    container.innerHTML = ""

    for(let i = 0; i < pokemons.length; i++){
    
        container.innerHTML += `
        
        <div class="pokemon-box">
            <img src="${pokemons[i].img}", alt="">
            <div class="info">
                <span class="name">${pokemons[i].nome}</span><!--name-->
            </div><!--info--></div>
        <!--pokemon-box-->`
    }

}

