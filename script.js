//Accessing All The Elements from index.html
const apiUrl = 'https://www.omdbapi.com?apiKey=769a9225';
const BASE_URL = "https://www.omdbapi.com?apiKey=769a9225&i=";
const main = document.getElementById("main");
const form = document.getElementById("form");

const movie = document.getElementById("movies");
const favLists = document.getElementById('favLists');


const search = document.getElementById("search");
const datalists = document.getElementById("datalist");
const button = document.querySelector(".btn");

//Searching Movies 
search.oninput = function() {
    allhero(search.value);
}

//Function For Adding suggestions like Google While Typing Movie Name
const keyss = {}
async function allhero(input) {
    //Fetching Data From OMDB Using  OMDB API
    const resp = await fetch(`https://www.omdbapi.com?apiKey=769a9225&s=${input}`)
    const data = await resp.json()
    for (let i in data.Search) {
        if (keyss[data.Search[i].Title]) {
            continue
        } else {
            keyss[data.Search[i].Title] = i
            let opt = document.createElement("option")
            opt.value = data.Search[i].Title
            datalists.appendChild(opt)
        }
    }
    //Search Movie Button
    button.onclick = function(e) {
        e.preventDefault()
        searchMovie(data)
        main.style.display = "flex"
        fav2.style.display = "none"
    }
}

//Function For Showing Search Result in Main Tag
function searchMovie(input) {
    let i = 0;
    main.innerHTML = ""
    for (let element of input.Search) {

        let movie1 = document.createElement("div")

        movie1.innerHTML = `<img id=${element.imdbID} src=${element.Poster} alt=${element.Title}>
        <p>${element.Title}</p>
        <p>Release Year: ${element.Year}</p>
        <button id=${i}> Add Favourites </button>
        `
            //  appending above created element to main 
        main.append(movie1)

        document.getElementById(`${i}`).onclick = function() {
            let fav = element.Title;
            arr.push(fav);
            p.push(element.Poster);


            //local storage so that my favourites will not get dissapeared
            localStorage["movies"] = JSON.stringify(arr);
            localStorage["pictures"] = JSON.stringify(p);
        }


        document.getElementById(element.imdbID).addEventListener("click", () => {

            openNav(element.imdbID)

        })
        i++;
    }
}

//Function For Showing More Details Of Any Movies
function openNav(movie) {
    main.innerHTML = ""
    fetch(BASE_URL + movie).then(res => res.json()).then(videoData => {

        const { Poster, Actors, Director, Released, Genre, Title, Ratings, Plot } = videoData

        //creating elements for extra details of movies and appending to main 
        let newDiv = document.createElement("div")
        newDiv.className = "each-movie"
        newDiv.style.height = "100 vh"
        newDiv.innerHTML = `<img src=${Poster}>    
    <p>${Title}<p>
    <div><span>${Released}</span> <span>${Ratings[0].Value}</span></div>
    <p>Directed by: ${Director}</p>
    <p>Genre: ${Genre}</p>
    <p> Cast: ${Actors}</p>
    <p> Plot: ${Plot}</p>
    `
        main.appendChild(newDiv)
    })
}



let arr = [];
let p = [];

const fav2 = document.getElementById('favourites');

//function for adding our Favourite superhero to Favourite List
favLists.onclick = function() {
    showfavs()
};

function showfavs() {
    var keys = {};
    fav2.style.display = "block"
    main.style.display = "none";
    let storedDatas = JSON.parse(localStorage["movies"]);
    let pictures = JSON.parse(localStorage["pictures"]);
    let b;
    let pic;

    for (let a in storedDatas) {

        if (keys[storedDatas[a]]) {
            continue;
        } else {
            keys[storedDatas[a]] = a;
            b = storedDatas[a];
            pic = pictures[a];
            const div1 = document.createElement('div');
            div1.innerHTML = `
     <div>
      <img style="width:300px; height:300px; margin-top:40px " src="${pic}"> </img>
       <p>${b}</p>
       <button id=delete${a}> Remove favourites </button>
     </div>
     `
            fav2.appendChild(div1);
        }

        document.getElementById(`delete${a}`).onclick = function() {
            eleDelete(a, storedDatas, pictures);

        }

    }

}

//Function For Deleting Favourites 
function eleDelete(index, storedDatas, pictures) {

    storedDatas.splice(index, 1)
    pictures.splice(index, 1)

    localStorage["movies"] = JSON.stringify(storedDatas);
    localStorage["pictures"] = JSON.stringify(pictures);

    fav2.innerHTML = ""

    showfavs()
}

//Go to Home
movie.onclick = function() {
    main.style.display = "none";
    fav2.style.display = "none";
}