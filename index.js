// lazy loading -----
const observer = new IntersectionObserver((entries) => {
  entries.filter(isIntersecting).forEach(loadImage)
})

const isIntersecting = (entry) => {
  return entry.isIntersecting;
}

const loadImage = (entry) => {
  const imagen = entry.target;
  const url = imagen.dataset.src
  // cargar imagen
  imagen.src = url
  
  imagen.onload = () => {
  }
  // quita el registro de la imagen (unlisten)
  observer.unobserve(imagen)
}

const registerImage = (imagen) => {
  //intersectationObservador -> observer(imagen)
  observer.observe(imagen);
}

// ----- lazy loading

const API = "https://rickandmortyapi.com/api/character/";

const appNode = document.querySelector('#app')

const UL = document.createElement('ul')

fetch(API)
.then((response) => response.json())
.then((response) => {
  response.results.forEach( (result) => {
    const container = document.createElement('div')
    const wrapper = document.createElement('div')
    wrapper.className = 'wrapper'
    const divIMG = document.createElement('li')

    elem.appendChild(
      document.createTextNode(`ID: ${result.id}  Nombre: ${result.name}`)
    );
    container.appendChild(wrapper)

    appNode.appendChild(container)
  });
})
.catch( () => {console.log(Response.error);});