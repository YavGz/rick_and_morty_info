let numberPage = 1;


const appNode = document.querySelector('#app')

const pages = document.querySelector('#pages')

const footer = document.querySelector('#footer')

let apiBase = `https://rickandmortyapi.com/api/character/?page=`;

let api;

function fetchAPI () {
  api = `${apiBase}${numberPage}`;

  console.log(api)
  fetch(api)
  .then((response) => response.json())
  .then((response) => {
    // characters 
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
      
      content.append(title, status, gender, dimension)
      container.append(img, content)
      appNode.appendChild(container)
    });
  })
  .catch( () => {console.log(Response.error)})
}

// let api = apiBase + numberPage;

function addButtons () {
  api = `${apiBase}${numberPage}`;

  console.log(api)
  
  fetch(api)
  .then((response) => response.json())
  .then( (response) => {

    const containerPage = document.createElement('div');
    containerPage.className = 'pageButtons'
    const nextPage = document.createElement('div');
    nextPage.className = 'nextPage'
    nextPage.appendChild(document.createTextNode('>'))
    nextPage.src = response.info.next

    let numPage = document.createElement('div')
    numPage.className = 'numPage'
    let pNum = document.createElement('p')
    pNum.appendChild(document.createTextNode(`${numberPage}/${response.info.pages}`))
    numPage.appendChild(pNum)

    const prevPage = document.createElement('div');
    prevPage.className = 'prevPage'
    prevPage.appendChild(document.createTextNode(' < '))
    prevPage.src = response.info.prev

    if ( response.info.next !== null && response.info.prev == null ) {
      containerPage.append(numPage ,nextPage)
    } else if (response.info.next == null && response.info.prev !== null) {
      containerPage.append(prevPage, numPage)
    } else {
      containerPage.append(prevPage, numPage, nextPage)
    }

    pages.appendChild(containerPage)
  })
}

document.addEventListener('click', (event) => {
  console.log(` !!!saludos desde ${event.target.className}`);
  if (event.target.className === 'nextPage') {
    changeNext();
  } else if (event.target.className === 'prevPage'){
    changePrev();
  }
})

function restart() {
  numberPage = 1
  appNode.innerHTML = ''
  pages.innerHTML = ''
  fetchAPI()
  addButtons();
}

function changeNext() {
  numberPage = numberPage + 1
  appNode.innerHTML = ''
  pages.innerHTML = ''
  fetchAPI();
  addButtons();
}

const changePrev = () => {
  numberPage = numberPage - 1
  appNode.innerHTML = ''
  pages.innerHTML = ''
  fetchAPI();
  addButtons();
}

fetchAPI();
addButtons();