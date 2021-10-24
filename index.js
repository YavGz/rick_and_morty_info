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

let numberPage = 2;

let API = `https://rickandmortyapi.com/api/character/?page=${numberPage}`;

const appNode = document.querySelector('#app')

const pages = document.querySelector('#pages')

const UL = document.createElement('ul')

let nextPage;

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
        status.appendChild(document.createTextNode(`${result.species} - ${result.status} 🟢`))
      } else if (result.status == 'Dead') {
        status.appendChild(document.createTextNode(`${result.species} - ${result.status} 🔴`))
      } else {
      status.appendChild(document.createTextNode(`${result.species} - ${result.status} ⚫`))        
    }

    const gender = document.createElement('p')
    gender.className = 'card-text'
    gender.appendChild(document.createTextNode(`Gender: ${result.gender}`))
    
    const dimension = document.createElement('p')
    dimension.className = 'card-text'
    dimension.appendChild(document.createTextNode(`Dimension: ${result.location.name}`))

    
    // wrapper.appendChild(container)
    content.append(title, status, gender, dimension)
    container.append(img, content)
    appNode.appendChild(container)
  });
})
.catch( () => {console.log(Response.error)})

fetch(API)
  .then((response) => response.json())
  .then( (response) => {

    let containerPage = document.createElement('div');
    containerPage.className = 'pageButtons'
    let nextPage = document.createElement('div');
    let pNext = document.createElement('p')
    pNext.appendChild(document.createTextNode('>'))
    nextPage.appendChild(pNext)
    nextPage.src = response.info.next
    let prevPage = document.createElement('div');
    prevPage.appendChild(document.createTextNode(' < '))
    prevPage.src = response.info.prev

    if ( response.info.next !== null && response.info.prev == null ) {
      containerPage.appendChild(nextPage)
    } else if (response.info.next == null && response.info.prev !== null) {
      containerPage.appendChild(prevPage)
    } else {
      containerPage.append(prevPage, nextPage)
    }

    pages.appendChild(containerPage)
  })

const changePage = () => {
  
}