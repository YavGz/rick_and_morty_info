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