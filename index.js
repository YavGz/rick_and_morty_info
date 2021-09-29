const API = "https://rickandmortyapi.com/api/character/";

const HTMLResponse = document.querySelector('#app')

const UL = document.createElement('ul')

fetch(API)
.then((response) => response.json())
.then((response) => {
  response.results.forEach( (result) => {
    let elem = document.createElement('li')
    elem.appendChild(
      document.createTextNode(`ID: ${result.id}  Nombre: ${result.name}`)
    );
    UL.appendChild(elem)
  });
  HTMLResponse.appendChild(UL)
})
  // .catch(err => console.err(err));