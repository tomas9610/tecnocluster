

let allElement = document.getElementsByClassName("cl-aling")
let widthElement = document.getElementsByClassName("cl-hg-resp")
let clResponsive = document.getElementsByClassName("cl-dv-otr-cnt-resp")
let answerMayor = null


///Cambiando los tamaños adecuados
const imgChangeSize = (el) => {

  if(!el[0].classList.contains("cl-hg-resp")){

    for (const i of el) {

      let widthResonsive = parseInt(window.getComputedStyle(i.children[0]).width, 10)
      let newHei = widthResonsive / 1.333
      i.children[0].style.height = newHei + "px"
      
    }

  }

  return true

}

///Cambiando los tamaños adecuados
const setNewHeight = (newHeight,el) => {

  for (const i of el) {

    if(newHeight > parseInt(window.getComputedStyle(i).height, 10)){

        i.style.height = newHeight + "px"
      
    }
    
  }

}

///Buscando los tamaños adecuados
const containtsChangeSize = (el) => {
  let mayor = 0

  for (const i of el) {

      if(mayor < parseInt(window.getComputedStyle(i).height, 10)){
        mayor = parseInt(window.getComputedStyle(i).height, 10)
      }
    
  }

  return mayor

}

///Seteando el tamaño de las imágenes responsive
const imgSetAll = async () => {

  let count = 0

  for (const element of clResponsive) {


    imgChangeSize(element.children)

    count++

    if(count == clResponsive.length){

      return true

    }

  }

}

const containerSetSize = () => {

  for (const element of clResponsive) {

    answerMayor = containtsChangeSize(element.children)
    setNewHeight(answerMayor,element.children)

  }

}


////Buscando todos los contenedores de tecnocluster
const searchTencocluster = async () => {

  if(clResponsive.length == 0){ return }

  let answer = await imgSetAll()

  if(answer == true){
    containerSetSize()
  }


}


//Resize
window.addEventListener("resize", e => {
  
  searchTencocluster()

})
window.addEventListener("orientationchange", e => {

  searchTencocluster()

})


searchTencocluster()