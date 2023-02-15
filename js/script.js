var pokemons = [];
var container = document.querySelector('.pokemon-container');

var offset = 0;
var page = 1;

var lastOffset;
var lastPage;

var left = document.querySelectorAll('.btn-wraper .left');
var right = document.querySelectorAll('.btn-wraper .right');

var pageSpan = document.querySelectorAll('.btn-wraper .pageNumber');

var loading = document.querySelector('section#load');
var error = document.querySelector('section#error');
var rand;

for(let i = 0; i < left.length; i++){

    left[i].addEventListener('click',function(){

        if(offset != 0){

            lastOffset = offset;
            lastPage = page;

            offset-=12;
            page--;

            playSong();

            document.querySelector('audio#blip'+rand).play();

            fetchPokemons('https://pokeapi.co/api/v2/pokemon?limit=12&offset='+offset);

        }

    });
}

for(let i = 0; i < right.length; i++){

    right[i].addEventListener('click',function(){

        lastOffset = offset;
        lastPage = page;

        offset+=12;
        page++;

        console.log(`
        lastOffset:${lastOffset}
        offset:${offset}
        lastPage:${lastPage}
        page:${page}
        `)

        playSong();

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

            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {

                pokemons.push({nome : val.name, img : pokemonSingle.sprites.front_default, id:pokemonSingle.id});

                if(pokemons.length == 12){
                    
                    addPokemons();
                    changePageNumber(page);
                    pokemons = [];
                    loading.style.display = 'none';

                }

            }).catch(function(e){

                getError(e)

            });

        });

    }).catch(function(e){

        getError(e)

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
            <img src="${pokemons[i].img}", alt="${pokemons[i].nome} image">
            <div class="info">
                <span class="name">${pokemons[i].nome}</span><!--name-->
                <span class="id">id:${pokemons[i].id}</span><!--id-->
            </div><!--info--></div>
        <!--pokemon-box-->`
    }

}

function playSong(){

    rand = Math.floor((Math.random() * 5) + 1);
    document.querySelector('audio#blip'+rand).play();

}

function getError(e){

    pokemons = [];
    loading.style.display = 'none';
    offset = lastOffset;
    page = lastPage;
    error.style.display = 'flex'
    error.querySelector('h1#errMsg').innerHTML = e;
    return false;

}

error.querySelector('span#close').addEventListener('click',function(){
    error.style.display = 'none'
});