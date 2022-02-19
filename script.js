const main = document.getElementById("main");
const form = document.getElementById("form");
const apiUrl = 'https://www.omdbapi.com?apiKey=769a9225'
const BASE_URL = "https://www.omdbapi.com?apiKey=769a9225&i="
const movie = document.getElementById("movies");
const favLists = document.getElementById('favLists');


const search = document.getElementById("search")
const datalists = document.getElementById("datalist")
const button = document.querySelector(".btn")


search.oninput = function() {
    allhero(search.value);
}



const keyss = {}
async function allhero(input) {
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
    button.onclick = function(e) {
        e.preventDefault()
        searchMovie(data)
        main.style.display = "flex"
        fav2.style.display = "none"
    }
}


function searchMovie(input) {
    let i = 0;
    main.innerHTML = ""
    for (let element of input.Search) {

        console.log(element.Title);
        let movie1 = document.createElement("div")

        movie1.innerHTML = `<img id=${element.imdbID} src=${element.Poster} alt=${element.Title}>
        <p>${element.Title}</p>
        <p>Release Year: ${element.Year}</p>
        <button id=${i}> Add Favourites </button>
        `
        main.append(movie1)

        document.getElementById(`${i}`).onclick = function() {
            let fav = element.Title;
            arr.push(fav);
            p.push(element.Poster);
            console.log(arr);
            console.log(p);

            localStorage["heroes"] = JSON.stringify(arr);
            localStorage["pictures"] = JSON.stringify(p);
        }


        document.getElementById(element.imdbID).addEventListener("click", () => {

            console.log(element.Title);
            openNav(element.imdbID)
        })
        i++;
    }
}

function openNav(movie) {
    console.log(movie);
    main.innerHTML = ""
    fetch(BASE_URL + movie).then(res => res.json()).then(videoData => {
        console.log(videoData);
        const { Poster, Actors, Director, Released, Genre, Title, Ratings, Plot } = videoData
        let newDiv = document.createElement("div")
        newDiv.className = "each-movie"
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
    let storedDatas = JSON.parse(localStorage["heroes"]);
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
            console.log(pic);
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
            console.log("hyeaaa");
            eleDelete(a, storedDatas, pictures)
        }

    }

}


movie.onclick = function() {
    main.style.display = "none";
    fav2.style.display = "none";
}



// function registerClickHandler() {
//     // Register click event handler for button of class 'remove'
//     "use strict";
//     var node = document.getElementById("image");
//     if (node.parentNode) {
//         node.parentNode.removeChild(node);
//     }
// }




function eleDelete(index, storedDatas, pictures) {
    console.log("hello");
    console.log(index);
    storedDatas.splice(index, 1)
    pictures.splice(index, 1)
    console.log(storedDatas);
    console.log(pictures);
    localStorage["heroes"] = JSON.stringify(storedDatas);
    localStorage["pictures"] = JSON.stringify(pictures);
    fav2.innerHTML = ""

    showfavs()
}