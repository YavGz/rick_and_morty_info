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

let API = "https://rickandmortyapi.com/api/character/";

const appNode = document.querySelector('#app')

const UL = document.createElement('ul')

fetch(API)
.then((response) => response.json())
.then((response) => {
  response.results.forEach( (result) => {
    
    const container = document.createElement('div')
    container.className = 'card col-12 col-md-6'
    container.style = 'width: 30rem'

    const img = document.createElement('img')
    img.className = 'card-img-top'
    img.alt = `imagen del personaje ${result.name}`
    img.dataset.src = `${result.image}`
    registerImage(img)
    
    const content = document.createElement('div')
    content.className = 'card-body'
    
    const title = document.createElement('h5')
    title.className = 'card-title'
    title.appendChild(document.createTextNode(`${result.name}`))

    const status = document.createElement('p')
    status.className = 'card-text'
    if (result.status == 'Alive') {
        status.appendChild(document.createTextNode(`🟢 ${result.status} - ${result.species}`))
      } else if (result.status == 'Dead') {
        status.appendChild(document.createTextNode(`🔴 ${result.status} - ${result.species}`))
      } else {
      status.appendChild(document.createTextNode(`⚫ ${result.status} - ${result.species}`))        
    }
    

    
    // wrapper.appendChild(container)
    content.append(title, status)
    container.append(img, content)
    appNode.appendChild(container)
  });
})
.catch( () => {console.log(Response.error)})