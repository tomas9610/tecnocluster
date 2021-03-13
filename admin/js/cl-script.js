

let allElement = document.getElementsByClassName("cl-aling")
let widthElement = document.getElementsByClassName("cl-hg-resp")
let mayor = 0
let widthResonsive = 0

//Buscando los tamaños
const sizeResult = (value) =>{
    for(var i = 0; i < allElement.length; i++){
        allElement[i].style.height = value + "px"
    }
}
const sizeResultHeight = (value) =>{
  for(var i = 0; i < widthElement.length; i++){
    widthElement[i].style.height = value + "px"
  }
  maxSize()
}
const sizeError = (error) =>{
    return error
}

//Promesa de tamaños
const maxSize = () => {
    let getSize = new Promise(function(resolve, reject) {
        for(var i = 0; i < allElement.length; i++){
            if(mayor < allElement[i].offsetHeight){
                mayor = allElement[i].offsetHeight
            }
        }
      
        if (mayor > 0) {
          resolve(mayor);
        } else {
          reject("Ocurrio un error");
        }
      });
      
      getSize.then(
        function(value) {sizeResult(value);
        },
        function(error) { sizeError(error);}
      );
}

const maxSizeHight = () => {
  if(widthElement.length != 0){
    let getSize = new Promise(function(resolve, reject) {
      for(var i = 0; i < widthElement.length; i++){
        widthResonsive = widthElement[i].offsetWidth
      }
      let newHei = widthResonsive / 1.333
        resolve(newHei);
        reject("Ocurrio un error");
    });
    
    getSize.then(
      function(value) {sizeResultHeight(value);
      },
      function(error) { sizeError(error);}
    );
  }
}

//Función autoejecutable
const executeFunction = () => {
  if(widthElement.length != 0){
    maxSizeHight()
  }else{
    maxSize()
  }
}

//Resize
  window.addEventListener("resize", e => {
    if(widthElement.length != 0){
      maxSizeHight()
    }else{
      maxSize()
    }
  })
  window.addEventListener("orientationchange", e => {
    if(widthElement.length != 0){
      maxSizeHight()
    }else{
      maxSize()
    }
  })

//Ejecutar
executeFunction()