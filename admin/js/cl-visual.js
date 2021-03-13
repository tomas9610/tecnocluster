// cardVisual
let newStyle = ""
let newCal = 0
let max = 0
let option = null
let allElement = document.getElementsByClassName("cl-aling")

//Función de activación de busqueda
const searchActive = () => {
    let description = showDescription.value
    let title = showTitle.value
    let getId = allId.value
    if (typeof clAllContent !== 'undefined'){
        createContent()
    }else{
        const son0 = document.createElement("div")
        son0.setAttribute("id", "clAllContent")
        let typeOfDesig = typeDesig.value
        if(typeOfDesig != "responsive"){
            son0.setAttribute("class","cl-dv-otr-cnt")
        }else{
            son0.setAttribute("class","cl-dv-otr-cnt-resp")
        }
        startNewCluster.appendChild(son0)
    }
    newVisualization(getId,title,description)
}

//Buscando los tamaños
const sizeResult = (value,option) =>{
        for(var i = 0; i < allElement.length; i++){
            if(option == "add"){
                allElement[i].style.height = value + "px"
            }
        }
        max = 0
    }
const sizeError = (error) =>{
    return error
}

//Promesa de tamaños
const maxSize = (option) => {
    let getSize = new Promise(function(resolve, reject) {
        for(var i = 0; i < allElement.length; i++){
            if(max < allElement[i].scrollHeight){
                max = allElement[i].scrollHeight
            }
        }
        if (max > 0) {
          resolve(max,option);
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

//Obteniene los tamaños dados por el usuario
const getMeasure = (var2) => {
    var vars = var2.split(",");
     typeDesigW.value = vars[0]
     typeDesigH.value = vars[1]
     sendMeasure()
}
let thatData = []
//SStar new Cluster
const startCluster = () => {
    let thisData = []
    const son = document.createElement("div")
    son.setAttribute("id", "waitId")
    startNewCluster.appendChild(son)
        let typeOfDesig = typeDesig.value
        let typeOfDesigW = typeDesigW.value
        let typeOfDesigH = typeDesigH.value
        if(typeOfDesig != "responsive"){
            sizeWaitW = "cl-size-" + typeOfDesigW + " cl-nr"
            sizeWaitH = "cl-img-" + typeOfDesigH
            newStyle = "height:calc( "+typeOfDesigH+"px * var(--scale-select))"
        }else{
                if(typeVisualization.value == "DK"){
                    if(positionQuantity1.textContent == 0){
                        positionQuantity1.textContent = 1
                    }
                    //relaciones
                        if(positionQuantity1.textContent == 6){
                             newCal = ((500 * 15.6) / 100) / 1.333
                            newStyle = "height:"+newCal + "px"
                        }
                        if(positionQuantity1.textContent == 5){
                            newCal = ((500 * 19) / 100) / 1.333
                           newStyle = "height:"+newCal + "px"
                       }
                       if(positionQuantity1.textContent == 4){
                        newCal = ((500 * 24) / 100) / 1.333
                       newStyle = "height:"+newCal + "px"
                        }
                        if(positionQuantity1.textContent == 3){
                            newCal = ((500 * 32) / 100) / 1.333
                           newStyle = "height:"+newCal + "px"
                            }
                        if(positionQuantity1.textContent == 2){
                        newCal = ((500 * 48) / 100) / 1.333
                        newStyle = "height:"+newCal + "px"
                        }
                        if(positionQuantity1.textContent == 1){
                            newCal = ((500 * 100) / 100) / 1.333
                            newStyle = "height:"+newCal + "px"
                            }
                    //fin
                    sizeWaitW = "cl-size-dk-resp-" + positionQuantity1.textContent
                    sizeWaitH = "cl-img-dk-resp-" +positionQuantity1.textContent+ " cl-hg-resp"
                }
                if(typeVisualization.value == "TB"){
                    if(positionQuantity3.textContent == 0){
                        positionQuantity3.textContent = 1
                    }
                    if(positionQuantity3.textContent == 4){
                        newCal = ((500 * 24) / 100) / 1.333
                       newStyle = "height:"+newCal + "px"
                        }
                        if(positionQuantity3.textContent == 3){
                            newCal = ((500 * 32) / 100) / 1.333
                           newStyle = "height:"+newCal + "px"
                            }
                        if(positionQuantity3.textContent == 2){
                        newCal = ((500 * 48) / 100) / 1.333
                        newStyle = "height:"+newCal + "px"
                        }
                        if(positionQuantity3.textContent == 1){
                            newCal = ((500 * 100) / 100) / 1.333
                            newStyle = "height:"+newCal + "px"
                            }
                    sizeWaitW = "cl-size-tb-resp-" + positionQuantity3.textContent
                    sizeWaitH = "cl-img-tb-resp-" +positionQuantity3.textContent+ " cl-hg-resp"
                }
                if(typeVisualization.value == "MB"){
                    if(positionQuantity2.textContent == 0){
                        positionQuantity2.textContent = 1
                    }
                    if(positionQuantity2.textContent == 2){
                        newCal = ((500 * 48) / 100) / 1.333
                        newStyle = "height:"+newCal + "px"
                        }
                        if(positionQuantity2.textContent == 1){
                            newCal = ((500 * 100) / 100) / 1.333
                            newStyle = "height:"+newCal + "px"
                            }
                    sizeWaitW = "cl-size-mv-resp-" + positionQuantity2.textContent
                    sizeWaitH = "cl-img-mv-resp-" +positionQuantity2.textContent+ " cl-hg-resp"
                }
        }
        //Obteniendo cantidad de número de datos a llamar 
        if(allId.value != ""){
            let varQuanti = allId.value
            let numTotal = varQuanti.split(",");
             allGet = numTotal
         }else{
             allGet = [ 0.1 ,0.2 , 0.3]
         }
         let countDato = 0
            allGet.map( dato => {   
                let foundId = false
                for(var i = 0; i<thisData.length; i++){
                    if(thisData[i] == dato){
                        foundId = true
                    }
                }
                if(foundId != true){
                    if(dato != 0.1 && dato != 0.2 && dato != 0.3){
                        thisData.push(dato)
                    }
                }

                if(countDato == 0){
                    let foundIdB = false
                    for(var i = 0; i < sessionStorage.length; i++){
                        let idForEdit = sessionStorage.key(i)
                        for(var x = 0; x < thatData.length; x++){
                            if(thatData[x] == idForEdit){
                                foundIdB = true
                            }
                        }
                        if(foundIdB != true){
                            thatData.push(idForEdit)
                           }
                    }
                }

                const son = document.createElement("div")
                son.setAttribute("class", sizeWaitW+" cl-aling")
                son.innerHTML= ` 
                <div class="${sizeWaitH} cl-bg-img tiles" style="${newStyle}">
                </div>
                <div class="cl-dc-content">
                    <div class="cl-ld-wd-a cl-ld-otr tiles"></div>
                    <div class="cl-ld-wd-b cl-ld-otr tiles"></div>
                    <div class="cl-ld-wd-c cl-ld-otr tiles"></div>
                    <div class="cl-ld-wd-d cl-ld-otr tiles"></div>
                </div>
                `
           
                waitId.appendChild(son)
                countDato += 1
            })
            thisData.sort(deMenorAMayor)
            thatData.sort(deMenorAMayor)
                for (var i=0; i < thatData.length ; i++) {
                    if(thisData[i] != undefined){
                        let exist = thatData[i].includes(thisData[i])
                        if(exist == false){
                            sessionStorage.removeItem(thatData[i])
                        }
                    }else{
                        sessionStorage.removeItem(thatData[i])
                    }
                }
}
//creando el contenedor de los cluster
const createContent = () => {
    if(clAllContent.parentNode.removeChild(clAllContent)){
        const son1 = document.createElement("div")
        son1.setAttribute("id", "clAllContent")
        let typeOfDesig = typeDesig.value
        if(typeOfDesig != "responsive"){
            son1.setAttribute("class","cl-dv-otr-cnt")
        }else{
            son1.setAttribute("class","cl-dv-otr-cnt-resp")
        }
        startNewCluster.appendChild(son1)
    }
}

//Pintando los datos
const paintTheDescrip = async (data) => {
    let waitAnswer = null
    if (typeof allIdGet !== 'undefined'){
        if(allIdGet.parentNode.removeChild(allIdGet)){
            waitAnswer = await activePaintDesc(data)
        }
    }else{
        waitAnswer = await activePaintDesc(data)
    }
    return waitAnswer
}

//pintando
const activePaintDesc = (data) => {
    const newContein = document.createElement("div")
    newContein.setAttribute("id","allIdGet")
    newContein.setAttribute("style","width: 200px;position:relative;top:5px;")

    editPerId.appendChild(newContein)
    data.map(dato => {
        const newChild = document.createElement("div")
        newChild.setAttribute("class", "cl-active-new-desc cl-btn-inactive")
        newChild.setAttribute("data-edit",dato.idS)

        newChild.innerHTML = `
            <span id="btn${dato.idS}">${dato.idS}</span>
        `

        allIdGet.appendChild(newChild)
    })
    return true
}

function deMenorAMayor(elem1, elem2) {return elem1-elem2;}
                                    
function deMayorAMenor(elem1, elem2) {return elem2-elem1;}

let thisDataA = []
let thatDataA = []
///Pinta los datos por pantalla
const paintData = (data) => {
    let getGetId = allId.value
    let notNull = getGetId.split(",")

    let typeOfDesig = typeDesig.value
    let typeOfDesigW = typeDesigW.value
    let typeOfDesigH = typeDesigH.value
    if(typeOfDesig != "responsive"){
        sizeWaitW = "cl-size-" + typeOfDesigW + " cl-nr"
        sizeWaitH = "cl-img-" + typeOfDesigH
        newStyle = "height:calc( "+typeOfDesigH+"px * var(--scale-select))"
    }else{
        if(typeVisualization.value == "DK"){
            if(positionQuantity1.textContent == 0){
                positionQuantity1.textContent = 1
            }
                                //relaciones
                                if(positionQuantity1.textContent == 6){
                                    newCal = ((500 * 15.6) / 100) / 1.333
                                    newStyle = "height:"+newCal + "px"
                               }
                               if(positionQuantity1.textContent == 5){
                                   newCal = ((500 * 19) / 100) / 1.333
                                  newStyle = "height:"+newCal + "px"
                              }
                              if(positionQuantity1.textContent == 4){
                               newCal = ((500 * 24) / 100) / 1.333
                              newStyle = "height:"+newCal + "px"
                               }
                               if(positionQuantity1.textContent == 3){
                                   newCal = ((500 * 32) / 100) / 1.333
                                  newStyle = "height:"+newCal + "px"
                                   }
                               if(positionQuantity1.textContent == 2){
                               newCal = ((500 * 48) / 100) / 1.333
                               newStyle = "height:"+newCal + "px"
                               }
                               if(positionQuantity1.textContent == 1){
                                   newCal = ((500 * 100) / 100) / 1.333
                                   newStyle = "height:"+newCal + "px"
                                   }
                           //fin
            sizeWaitW = "cl-size-dk-resp-" + positionQuantity1.textContent
            sizeWaitH = "cl-img-dk-resp-" +positionQuantity1.textContent+ " cl-hg-resp"
        }
        if(typeVisualization.value == "TB"){
            if(positionQuantity3.textContent == 0){
                positionQuantity3.textContent = 1
            }
            if(positionQuantity3.textContent == 4){
                newCal = ((500 * 24) / 100) / 1.333
               newStyle = "height:"+newCal + "px"
                }
                if(positionQuantity3.textContent == 3){
                    newCal = ((500 * 32) / 100) / 1.333
                   newStyle = "height:"+newCal + "px"
                    }
                if(positionQuantity3.textContent == 2){
                newCal = ((500 * 48) / 100) / 1.333
                newStyle = "height:"+newCal + "px"
                }
                if(positionQuantity3.textContent == 1){
                    newCal = ((500 * 100) / 100) / 1.333
                    newStyle = "height:"+newCal + "px"
                    }
            sizeWaitW = "cl-size-tb-resp-" + positionQuantity3.textContent
            sizeWaitH = "cl-img-tb-resp-" +positionQuantity3.textContent+ " cl-hg-resp"
        }
        if(typeVisualization.value == "MB"){
            if(positionQuantity2.textContent == 0){
                positionQuantity2.textContent = 1
            }
            if(positionQuantity2.textContent == 2){
                newCal = ((500 * 48) / 100) / 1.333
                newStyle = "height:"+newCal + "px"
                }
                if(positionQuantity2.textContent == 1){
                    newCal = ((500 * 100) / 100) / 1.333
                    newStyle = "height:"+newCal + "px"
                    }
            sizeWaitW = "cl-size-mv-resp-" + positionQuantity2.textContent
            sizeWaitH = "cl-img-mv-resp-" +positionQuantity2.textContent+ " cl-hg-resp"
        }
    }
    let changeClassCountBtn = 0
    data.map( dato => {   
        let foundId = false
        for(var i = 0; i<thisDataA.length; i++){
            if(thisDataA[i] == dato.idS){
                foundId = true
            }
        }
        if(foundId != true){
            thisDataA.push(dato.idS)
        }
        let stringDesc = dato.description
        const child0 = document.createElement("div")
        child0.setAttribute("id", "descrip"+ dato.idS)
        child0.setAttribute("style", "display:none")
        child0.innerHTML = stringDesc

        if(clAllContent.appendChild(child0)){
            let getNewString = document.getElementById("descrip"+dato.idS)
            let stringTitle = dato.title
            let stringId = dato.idS
            const hijo = document.createElement("div")
            hijo.setAttribute("class", sizeWaitW + " cl-aling")
                    hijo.innerHTML= `
                        <div class="${sizeWaitH} cl-bg-img" style="${newStyle}">
                            <a href="https://tuitycode.com">
                                <img class="cl-img-bg" src="${dato.image}" alt="Página de idea">
                            </a>
                        </div>
                        <div class="cl-dc-content">
                           ${dato.title != 0 ? `
                           <h3 class="cl-title-cluster" id="title${dato.idS}"><a class="cl-no-dc cl-a-href-cl"></a></h3>
                           ` :``}
                            <div>
                                ${getNewString.innerText != 0 ? `
                                <p class="cl-txt-cluster" id="description${dato.idS}">
                                
                                </p>
                                `:`` }
                            </div>
                        </div>
                    `
                    if(clAllContent.appendChild(hijo)){
                        let getDescription = ""
                        if(typeof getNewString.children[1] !== 'undefined'){
                             getDescription = getNewString.children[1].innerText
                        }else{
                            getDescription = ""
                        }
                        if(stringTitle == 0){
                            stringTitle = ""
                        } 
                        let totalString = stringTitle +","+ getDescription
                        ///Guardar atraves de sessionStorage la descripcion y el titulo


                        //////////////////Solucionar error del null 
                            let searchItem = sessionStorage.key(0)
                            if(searchItem == null || changeClassCountBtn == 0 || notNull == 1){
                                sessionStorage.setItem(stringId, totalString)
                            }else{
                                thisDataA.sort(deMenorAMayor)
                                
                                let compareItem = thisDataA[changeClassCountBtn]
                                let compareItemB = sessionStorage.key(changeClassCountBtn)
                                if(compareItemB != null){
                                    let foundIdB = false
                                    for(var i = 0; i<thatDataA.length; i++){
                                        if(thatDataA[i] == compareItemB){
                                            foundIdB = true
                                        }
                                    }
                                    if(foundIdB != true){
                                        thatDataA.push(compareItemB)
                                    }
                                }
                                thatDataA.sort(deMenorAMayor)
                                let compareItemC = thatDataA[changeClassCountBtn]
                                let existItem = compareItem.includes(compareItemC)
                               if(existItem == false){
                                     sessionStorage.setItem(stringId, totalString)
                               }
                            }

                        for(var x = 0; x < sessionStorage.length; x++){
                            let idStorage = sessionStorage.key(x)
                            let contentStorage = sessionStorage.getItem(idStorage)
                            let separeContent = contentStorage.split(",")
                            let titleStorage = document.getElementById("title"+dato.idS)
                            let descriptionStorage = document.getElementById("description"+dato.idS)
                            if(idStorage == dato.idS){
                                if ( titleStorage !== null ) {
                                    titleStorage.innerText = separeContent[0]
                                }
                                if ( descriptionStorage !== null ) {
                                    descriptionStorage.innerText = separeContent[1]
                                }
                            }
                            if(x == 0 && changeClassCountBtn == 0){
                                let activeButton = document.getElementById("btn"+idStorage).offsetParent
                                activeButton.classList.remove("cl-btn-inactive")
                                activeButton.classList.add("cl-btn-active")
                                newDescriptionEdit.value = separeContent[1]
                                newTitleEdit.value = separeContent[0]
                            }
                        }
                    }
        }
        changeClassCountBtn += 1
    })
    option = "add"
    maxSize(option)
}

///Recibiendo los tamaños 
const sendMeasure = () => {
    if(allId.value == ""){
        if (typeof waitId !== 'undefined'){
            if(waitId.parentNode.removeChild(waitId)){
                startCluster()
            }
        }else{
            startCluster()
        }
    }else{
        if (typeof waitId !== 'undefined'){
            if(waitId.parentNode.removeChild(waitId)){
                startCluster()
            }
        }else{
            startCluster()
        }
           searchActive()
    }
}

//wait
const clusterWait = () => {
    let waitClass = document.getElementsByClassName("tiles")
        for(var i = 0; i < waitClass.length; i++){
            waitClass[i].classList.add("tile")
        }
}
//Remove vait
const clusterRemoveWait = () => {
    if (typeof clAllContent !== 'undefined'){
        clAllContent.parentNode.removeChild(clAllContent)
    }
    let waitClass = document.getElementsByClassName("tiles")
        for(var i = 0; i < waitClass.length; i++){
            waitClass[i].classList.remove("tile")
        }
}
//Buscando los datos en la base de datos 
const newVisualization = async (id,title,description) => {
    let dataId = "" + id + ""
    const data_noti = new FormData()
    data_noti.append('action','peticionVisualizar')
    data_noti.append('nonce',solicitudesAjaxVisual.seguridad)
    data_noti.append('id',dataId)
    data_noti.append('title',title)
    data_noti.append('description',description)
    const headerNoti = new Headers()
    const optionsNoti = {
        method : 'POST',
        headers: headerNoti,
        body: data_noti
    }
    ///Variable para obtener un array
    let data =  {}
    //wait
        waitId.style.display="block"
        clusterWait()
    //endWait
    const response = await fetch(solicitudesAjaxVisual.url, optionsNoti)
    switch(response.status){
        case 200:
            waitId.style.display="none"
            data = await response.json()
            if (typeof clAllContent !== 'undefined'){
                let continuePaint = await paintTheDescrip(data)
                if(continuePaint == true){
                    paintData(data)
                }
            }
        break
        default:
            console.log('Upps hubo algún error')
        break
    }
}
//Funciones de visualización ES NECESARIO OPTIMIZAR
const showDK = () => {
    activeDK.classList.remove("btn-outline-primary")
    activeDK.classList.add("btn-primary")
    activeTB.classList.remove("btn-primary")
    activeTB.classList.add("btn-outline-primary")
    activeMB.classList.remove("btn-primary")
    activeMB.classList.add("btn-outline-primary")
    typeVisualization.value = "DK"
    document.documentElement.style.setProperty('--scale-select', "0.26041");
}
const showTB = () => {
    activeTB.classList.remove("btn-outline-primary")
    activeTB.classList.add("btn-primary")
    activeDK.classList.remove("btn-primary")
    activeDK.classList.add("btn-outline-primary")
    activeMB.classList.remove("btn-primary")
    activeMB.classList.add("btn-outline-primary")
    typeVisualization.value = "TB"
    document.documentElement.style.setProperty('--scale-select', "0.78125");
}
const showMB = () => {
    activeMB.classList.remove("btn-outline-primary")
    activeMB.classList.add("btn-primary")
    activeDK.classList.remove("btn-primary")
    activeDK.classList.add("btn-outline-primary")
    activeTB.classList.remove("btn-primary")
    activeTB.classList.add("btn-outline-primary")
    typeVisualization.value = "MB"
    document.documentElement.style.setProperty('--scale-select', "1.38888");
}

//Función que cambia el Título por el nombre dado por el usuario
const changeTitle = () => {
    nameCluster.textContent = nombreCluster.value
}

nombreCluster.addEventListener("keyup", e => {
    changeTitle()
})

// //Buscando en  la base de datos
allId.addEventListener("keyup", e => {
    if(allId.value == ""){
        clusterRemoveWait()
        allChangeThis.style.display = "none"
    }else{
        allChangeThis.style.display = "table-row"
    }
})
showTitle.addEventListener("change", e => {
    if(showTitle.value == 0){
        newTitleEdit.style.display = "block"
        showTitle.value = 1
    }else{
        newTitleEdit.style.display = "none"
        showTitle.value = 0
    }
    if(allId.value != ""){
        searchActive()
    }
})
  allId.addEventListener('focusout', (event) => {
    if (typeof waitId !== 'undefined'){
        if(waitId.parentNode.removeChild(waitId)){
            startCluster()
        }
    }else{
        startCluster()
    }
    if(allId.value != ""){
        searchActive()
    }else{
        waitId.style.display="block"
    }
  })


////////// buscar en la base de datos
showDescription.addEventListener("change", e => {
    if(showDescription.value == 0){
        newDescriptionEdit.style.display = "block"
        showDescription.value = 1
    }else{
        newDescriptionEdit.style.display = "none"
        showDescription.value = 0
    }
    if(allId.value != ""){
        searchActive()
    }
})
rangeDesktop.addEventListener("mouseup", e => {
    positionQuantity1.textContent = rangeDesktop.valueAsNumber
    if (typeof waitId !== 'undefined'){
        if(waitId.parentNode.removeChild(waitId)){
            startCluster()
        }
    }else{
        startCluster()
    }
    showDK()
    if(allId.value != ""){
        searchActive()
    }
})
rangeTablet.addEventListener("mouseup", e => {
    positionQuantity3.textContent = rangeTablet.valueAsNumber
    if (typeof waitId !== 'undefined'){
        if(waitId.parentNode.removeChild(waitId)){
            startCluster()
        }
    }else{
        startCluster()
    }
    showTB()
    if(allId.value != ""){
        searchActive()
    }
})
rangeMobile.addEventListener("mouseup", e => {
    positionQuantity2.textContent = rangeMobile.valueAsNumber
    if (typeof waitId !== 'undefined'){
        if(waitId.parentNode.removeChild(waitId)){
            startCluster()
        }
    }else{
        startCluster()
    }
    showMB()
    if(allId.value != ""){
        searchActive()
    }
})
measure.addEventListener("change", e => {
    getMeasure(measure.value) 
})

//Obteniendo tipo de cluster
clusterPage.addEventListener("change", e => {
    typeCluster.value ="page"
})
clusterEntry.addEventListener("change", e => {
    typeCluster.value ="entry"
})
//Tipo de enlace
openSelf.addEventListener("change", e => {
    typeOpenPage.value ="_self"
})
openBlank.addEventListener("change", e => {
    typeOpenPage.value ="_blank"
})
//Diseño responsivo
openResponsive.addEventListener("change", e => {
    typeDesig.value ="responsive"
    thPersonali.style.display = "none"
    trPersonali.style.display = "none"
    thResponsive.style.display = "block"
    trResponsive1.style.display = "block"
    sendMeasure()
})
openPersonali.addEventListener("change", e => {
    typeDesig.value ="personality"
    getMeasure(measure.value) 
    thResponsive.style.display = "none"
    trResponsive1.style.display = "none"
    thPersonali.style.display = "block"
    trPersonali.style.display = "block"
})

//Tipos de visualizaciones
activeDK.addEventListener("click", e => {
        if (typeof waitId !== 'undefined'){
            if(waitId.parentNode.removeChild(waitId)){
                startCluster()
            }
        }else{
            startCluster()
        }
    showDK()
    if(allId.value != ""){
        searchActive()
    }
})
activeTB.addEventListener("click", e => {
        if (typeof waitId !== 'undefined'){
            if(waitId.parentNode.removeChild(waitId)){
                startCluster()
            }
        }else{
            startCluster()
        }
    showTB()
    if(allId.value != ""){
        searchActive()
    }
})
activeMB.addEventListener("click", e => {
        if (typeof waitId !== 'undefined'){
            if(waitId.parentNode.removeChild(waitId)){
                startCluster()
            }
        }else{
            startCluster()
        }
    showMB()
    if(allId.value != ""){
        searchActive()
    }
})

//Función autoejecutable
startCluster()