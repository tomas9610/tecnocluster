

let allElement = document.getElementsByClassName("cl-aling")
let widthElement = document.getElementsByClassName("cl-hg-resp")
let mayor = 0
let widthResonsive = 0

//Buscando los tamaños
const sizeResult = (value,option) =>{
    for(var i = 0; i < allElement.length; i++){
        if(option == "add"){
          allElement[i].style.height = value + "px"
        }else if(option == "remove"){
          allElement[i].removeAttribute("style")
        }
    }
    mayor = 0
}
const sizeResultHeight = (value) =>{
  for(var i = 0; i < widthElement.length; i++){
    widthElement[i].style.height = value + "px"
  }
  widthResonsive = 0
  maxSize()
}
const sizeError = (error) =>{
    return error
}

//Promesa de tamaños
const maxSize = () => {
    let getSize = new Promise(function(resolve, reject) {
      option = "remove"
      let notValue = null
      sizeResult(notValue,option)
        for(var i = 0; i < allElement.length; i++){
            if(mayor < allElement[i].scrollHeight){
                mayor = allElement[i].scrollHeight
            }
        }
        if (mayor > 0) {
          option = "add"
          resolve(mayor,option);
        } else {
          reject("Ocurrio un error");
        }
      });
      
      getSize.then(
        function(value) {sizeResult(value,option);
        },
        function(error) { sizeError(error);}
      );
}

const maxSizeHight = () => {
  if(widthElement.length != 0){
    let getSize = new Promise(function(resolve, reject) {
      for(var i = 0; i < widthElement.length; i++){
        widthResonsive = widthElement[i].scrollWidth
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