// cardVisual
let newStyle = ""
let newCal = 0
let max = 0
let option = null
let allElement = document.getElementsByClassName("cl-aling")
let getUrl = window.location.href.split("&")
let getNewData = false

//Función de activación de busqueda
const searchActive = async () => {
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
    if(getUrl[1] != undefined){
        let idCluster = getUrl[1].split("edit=")
            if(idCluster[1] != undefined){
                getNewData = true
                searchData(idCluster[1],getId,title,description,getNewData)
            }
        }else{
            newVisualization(getId,title,description)
        }
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

// Tipo de visualización
const typeVisual = (quantity,select,type) => {
    if(select == 0){ select = 1}
    let maxScreen = 100,  defaultSize = 500, size = 1.333, newCount = 1
    const typeSee = { 1:100, 2:48, 3:32, 4:24, 5:19, 6:15.6 }
    for(let i = 0; i < quantity; i++){
        if(select == newCount){ newCal = ((defaultSize * typeSee[newCount]) / maxScreen) / size; newStyle = "height:"+newCal + "px"}
        newCount++
    }
    sizeWaitW = "cl-size-"+type+"-resp-" + select
    sizeWaitH = "cl-img-"+type+"-resp-" +select+ " cl-hg-resp"
    const data = {
        'sizeWaitW': sizeWaitW,
        'sizeWaitH': sizeWaitH
    }
    return data 
}

///Tamaños del cluster del plugin
const sizeCluster = () => {
    let data = null
    let sizesVisual = null, quantity = null, positionQuantity = null,typeOfDesig = typeDesig.value,typeOfDesigW = typeDesigW.value,typeOfDesigH = typeDesigH.value
    if(typeOfDesig != "responsive"){
        sizeWaitW = "cl-size-" + typeOfDesigW + " cl-nr"
        sizeWaitH = "cl-img-" + typeOfDesigH
        newStyle = "height:calc( "+typeOfDesigH+"px * var(--scale-select))"
         data = {'sizeWaitW': sizeWaitW,'sizeWaitH': sizeWaitH}
    }else{
        if(typeVisualization.value == "dk"){quantity = 6; positionQuantity = positionQuantity1.textContent}
        if(typeVisualization.value == "tb"){quantity = 4; positionQuantity = positionQuantity3.textContent}
        if(typeVisualization.value == "mv"){ quantity = 2; positionQuantity = positionQuantity2.textContent}
        sizesVisual = typeVisual(quantity,positionQuantity,typeVisualization.value)
        data = {'sizeWaitW': sizesVisual.sizeWaitW,'sizeWaitH': sizesVisual.sizeWaitH}
    }
    return data
}
//Obteniene los tamaños dados por el usuario
const getMeasure = (var2) => {
    var vars = var2.split(",");
     typeDesigW.value = vars[0]
     typeDesigH.value = vars[1]
     sendMeasure()
}

//Borrando Items
const deleteElement = (data,id) =>{
    for(let i = 0; i < data.length;i++){
        let deleteElem = document.getElementById(data[i]+id)
        if (deleteElem != null){
            deleteElem.parentNode.removeChild(deleteElem)
        }
    }
}
//Buscando espejos de datos
const searchMirror = (thisData,thatData) => {
    thisData.sort(minToMax)
    thatData.sort(minToMax)
        for (var i=0; i < thatData.length ; i++) {
            let exist = thisData.includes(thatData[i])
             if(exist == false){
                const dataArray = ["titleMirror","descriptionMirror","idSMirror","urlMirror","imgMirror","alterMirror"]
                deleteElement(dataArray,thatData[i])
             }

        }
}

//Listo para eliminar los que ya no se ocupen
let thatData = []
const deleteItems = () => {
    let thisData = []
            if(allId.value != ""){
            let varQuanti = allId.value
            let numTotal = varQuanti.split(",");
             allGet = numTotal
         }
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
                ///Thatdata
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
            })
            searchMirror(thisData,thatData)
}
//SStar new Cluster
const startCluster = () => {
    const son = document.createElement("div")
    son.setAttribute("id", "waitId")
    son.setAttribute("class", "cl-dv-otr-cnt-resp")
    startNewCluster.appendChild(son)
    let getSizeCluster = sizeCluster()
    let sizeWaitH = getSizeCluster.sizeWaitH
    let sizeWaitW = getSizeCluster.sizeWaitW
        //Obteniendo cantidad de número de datos a llamar 
        if(allId.value != ""){
            let varQuanti = allId.value
            let numTotal = varQuanti.split(",");
             allGet = numTotal
         }else{
             allGet = [ 0.1 ,0.2 , 0.3]
         }
            allGet.map( dato => {   
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
            })
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

//Pintando botones edición o nuevo
const contentAreaBtn = (dato) => {
    const newChild = document.createElement("div")
    newChild.setAttribute("class", "cl-active-new-desc cl-btn-inactive")
    newChild.setAttribute("data-edit",dato.idS)
    newChild.setAttribute("onclick","clickEdit(this)")

    newChild.innerHTML = `
        <span id="btn${dato.idS}">${dato.idS}</span>
    `

    if(allIdGet.appendChild(newChild)){
        /// Code Here
    }
}

//pintando botones
const activePaintDesc = (data) => {
    const newContein = document.createElement("div")
    newContein.setAttribute("id","allIdGet")
    newContein.setAttribute("style","width: 200px;position:relative;top:5px;")
    if(editPerId.appendChild(newContein)){
        data.map(dato => {
            contentAreaBtn(dato)
        })
        return true
    }
}

//Pintando los espejos de los datos
const createMirror = (datoIds,type,cluster,content) => {
    let createInput = null
    let searchElement = null
    for(let i = 0; i < type.length; i++){
        searchElement = document.getElementById(type[i]+datoIds)
        if ( searchElement === null ) {
            if(type[i] != "descriptionMirror"){
               createInput = document.createElement("input")
               createInput.setAttribute("type","hidden")
            }else{
               createInput = document.createElement("textarea")
               createInput.setAttribute("style","display:none")
            }
            createInput.setAttribute("id",type[i]+ datoIds)
            createInput.setAttribute("name",cluster[i]+"[]")
            if(allInputDinamic.appendChild(createInput)){
                let insertTitle = document.getElementById(type[i]+ datoIds)
                insertTitle.value = content[i]
            }
        }
    }
}

///Creando Elementos Espejos
const createElements = (datoIds,datoAlter,datoUrlImage,datoImage,datoTitle,datoDescription) => {
    const type = [ "idSMirror","imgMirror","urlMirror","alterMirror","titleMirror","descriptionMirror"]
    const cluster = [ "setIds","setImg","setUrl","setAlter","titleClusters","descriptionClusters"]
    const content = [datoIds, datoImage,datoUrlImage, datoAlter, datoTitle, datoDescription]
    createMirror(datoIds,type,cluster,content)
}

//Obteniendo el total del String a guardar
const getTotalString = (getNewString,stringTitle) => {
    let getDescription = ""
    if(getUrl[1] == undefined){
        if(typeof getNewString.children[1] !== 'undefined'){
            getDescription = getNewString.children[1].innerText
       }else{
           getDescription = ""
       }
    }else{
        if(typeof getNewString !== 'undefined'){
            getDescription = getNewString.innerText
       }else{
           getDescription = ""
       }
    }
    if(stringTitle == 0){
        stringTitle = ""
    } 
    let totalString = {
        "title" : stringTitle,
        "description" : getDescription
    }

    return totalString
}
//De mayor a menor
function minToMax(elem1, elem2) {return elem1-elem2;}

//Creando Dom
const createDom = (dato,getNewString,sizeWaitH,sizeWaitW) => {
    const hijo = document.createElement("div")
    hijo.setAttribute("class", sizeWaitW + " cl-aling")
            hijo.innerHTML= `
                <div class="${sizeWaitH} cl-bg-img" style="${newStyle}">
                    <a href="${dato.urlImage}">
                        <img class="cl-img-bg" src="${dato.image}" alt="${dato.alter}">
                    </a>
                </div>
                <div class="cl-dc-content">
                   ${dato.title != 0 ? `
                   <h3 class="cl-title-cluster" id="title${dato.idS}"><a href="${dato.urlImage}" class="cl-no-dc cl-a-href-cl"></a></h3>
                   ` :``}
                    <div>
                        ${getNewString.innerText != 0 ? `
                        <p class="cl-txt-cluster" id="description${dato.idS}">
                        
                        </p>
                        `:`` }
                    </div>
                </div>
            `
            return hijo
}
///Pinta los datos por pantalla
const paintData = (data,existCl) => {
    //Dividiendo datos DB Cluster y DB Post
        let getSizeCluster = sizeCluster()
        let sizeWaitH = getSizeCluster.sizeWaitH
        let sizeWaitW = getSizeCluster.sizeWaitW
        let countBtnEdit = 0
        data.map( dato => {   
            let total = "save"
            sessionStorage.setItem(dato.idS, total)
            let stringDesc = dato.description
            let description = showDescription.value
            let title = showTitle.value
            if(description == 1){
                if(dato.description == 0){
                    stringDesc = "Agregar descripción" 
                }
            }
            if(title == 1){
                if(dato.title == 0){
                    dato.title = "Agregar Título" 
                }
            }
            
            const child0 = document.createElement("div")
            child0.setAttribute("id", "descrip"+ dato.idS)
            child0.setAttribute("style", "display:none")
            child0.innerHTML = stringDesc
    
            if(clAllContent.appendChild(child0)){
                let getNewString = document.getElementById("descrip"+dato.idS)
                if(getNewString.innerText === ""){
                    getNewString.innerText = "Agregar descripción" 
                }
                let stringTitle = dato.title
                let child = createDom(dato,getNewString,sizeWaitH,sizeWaitW)
                        if(clAllContent.appendChild(child)){
                            // Creando inputs espejos 
                            //Obteniendo el total del String
                                let totalString = getTotalString(getNewString,stringTitle)
                                createElements(dato.idS,dato.alter,dato.urlImage,dato.image,totalString.title,totalString.description)
                                let titleStorage = document.getElementById("title"+dato.idS)
                                let descriptionStorage = document.getElementById("description"+dato.idS)
                                let insertTitle = document.getElementById("titleMirror"+ dato.idS).value
                                let insertDescription = document.getElementById("descriptionMirror"+ dato.idS).value
                                if(titleStorage != null){
                                    if(insertTitle == 0){
                                        titleStorage.style.display = "none"
                                    }else{
                                        titleStorage.style.display = "block"
                                    }
                                  titleStorage.childNodes[0].innerText = insertTitle
                                }
                                if(descriptionStorage != null){
                                    if(insertDescription == 0){
                                        descriptionStorage.style.display = "none"
                                    }else{
                                        descriptionStorage.style.display = "block"
                                    }
                                  descriptionStorage.innerText = insertDescription   
                                }
                                //Pintando primer boton
                                //Buscar error tratar de cambiar esto al buscar nuevos cluster en post 
                                if(countBtnEdit == 0){
                                    let activeButton = null
                                    if(getUrl[1] != undefined){
                                        if(existCl == false){
                                            activeButton = document.getElementById("btn"+dato.idS).offsetParent
                                        }else{
                                            activeButton = document.getElementById("btn"+dato.idS).parentElement
                                        }
                                    }else{
                                         activeButton = document.getElementById("btn"+dato.idS).offsetParent
                                    }
                                    activeButton.classList.remove("cl-btn-inactive")
                                    activeButton.classList.add("cl-btn-active")
                                    if(insertDescription == 0){
                                        insertDescription = ""
                                    }
                                    newDescriptionEdit.value = insertDescription
                                    newTitleEdit.value = insertTitle
                                    editDataStorage.setAttribute("data-storage",dato.idS)
                                }
                        }
            }
            countBtnEdit++
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
                    paintData(data,false)
                }
            }
        break
        default:
            console.log('Upps hubo algún error')
        break
    }
    deleteItems()
}
//Funciones de visualización ES NECESARIO OPTIMIZAR
const typeDevice = (type,scale, devices) => {
    const device = [activeDK,activeTB,activeMV]
    document.documentElement.style.setProperty('--scale-select', scale);
    typeVisualization.value = devices
    for(let i = 0;i < device.length; i++){
        if(type == device[i]){
            device[i].classList.remove("btn-outline-primary")
            device[i].classList.add("btn-primary")
        }else{
            device[i].classList.remove("btn-primary")
            device[i].classList.add("btn-outline-primary")
        }
    }
}
const saveStorage = (that) =>{
    let setStorageId = that.getAttribute("data-storage")
    let titleMirrorEdit = document.getElementById("titleMirror"+setStorageId)
    let descriptionMirrorEdit = document.getElementById("descriptionMirror"+setStorageId)
    titleMirrorEdit.value = newTitleEdit.value
    descriptionMirrorEdit.value = newDescriptionEdit.value
    searchFunction()
}
//Editando titulo y descripción
const clickEdit = (that) => {
    let editData = that
    let idForEdit = editData.getAttribute("data-edit")
    let changeColorBtn = document.getElementsByClassName("cl-active-new-desc")
    for(let i = 0; i <  changeColorBtn.length; i++){
        changeColorBtn[i].classList.remove("cl-btn-active")
        changeColorBtn[i].classList.add("cl-btn-inactive")
        let getDataId = changeColorBtn[i].getAttribute("data-edit") 
        if(getDataId == idForEdit){
            changeColorBtn[i].classList.remove("cl-btn-inactive")
            changeColorBtn[i].classList.add("cl-btn-active")
            let existTitleMirror = document.getElementById("titleMirror"+ getDataId).value 
            let existDescriptionMirror = document.getElementById("descriptionMirror"+ getDataId).value 
            newTitleEdit.value = existTitleMirror
            if(existDescriptionMirror == 0){
                existDescriptionMirror = ""
            }
            newDescriptionEdit.value = existDescriptionMirror
            editDataStorage.setAttribute("data-storage",idForEdit)  
        }
    }
}

//Función que cambia el Título por el nombre dado por el usuario
//funcion de busqueda 
const searchFunction = () => {
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
}


const changeTitle = e => {
    nameCluster.textContent = nombreCluster.value
}

//Cantidad de tamaño en Personalizado
const quantitySize = (newSize) => {
    for(var i = 0; i < measure.length; i++){
        let getSizes = measure.children[i].value
        if(newSize == getSizes){
            measure.children[i].setAttribute("selected","")
        }else{
            measure.children[i].removeAttribute("selected")
        }
    }
}
//Parte de edición en el área de responsive
const responsiveEdit = () => {
    thPersonali.style.display = "none"
    trPersonali.style.display = "none"
    thResponsive.style.display = "block"
    trResponsive1.style.display = "block"
}
///Parte de edición en el área de personality
const personalityEdit = (newSize) => {
    thResponsive.style.display = "none"
    trResponsive1.style.display = "none"
    thPersonali.style.display = "block"
    trPersonali.style.display = "block"
    quantitySize(newSize)
}
//Obtener medidas responsivas
const getSizeResponsive = (data) => {
    let theSize = data.split(",")
    return theSize
}
///ChangeDataStyle
const changeDataStyle = async (data,printData) => {
        nombreCluster.value = data.name
        allId.value = data.allId
        typeDesig.value = data.type
        //Check protocolo
        if(data.protocol == "http"){
            clusterProtocolo.value = data.protocol+"://"
            httpsActive.removeAttribute("checked")
            httpActive.setAttribute("checked", "")
        }else{
            clusterProtocolo.value = data.protocol+"://"
            httpActive.removeAttribute("checked")
            httpsActive.setAttribute("checked", "")
        }
        //Tipo de enlace
        if(data.open == "_self"){
            typeOpenPage.value = data.open
            openSelf.setAttribute("checked","")
            openBlank.removeAttribute("checked")
        }else{
            typeOpenPage.value = data.open
            openBlank.setAttribute("checked","")
            openSelf.removeAttribute("checked")
        }
        //Mostrando tilulo o descripción
        if(data.showTitle == 0){
            showTitle.value = "0"
            showTitle.removeAttribute("checked")
        }
        if(data.showDescription == 0){
            showDescription.value = "0"
            showDescription.removeAttribute("checked")
        }
        if(data.type == "responsive"){
            openResponsive.setAttribute("checked","checked")
            openPersonali.removeAttribute("checked")
            let sizeResponsive = getSizeResponsive(data.clSize)
            rangeDesktop.valueAsNumber = sizeResponsive[0]
            positionQuantity1.textContent = sizeResponsive[0]
            rangeTablet.valueAsNumber = sizeResponsive[1]
            positionQuantity3.textContent = sizeResponsive[1]
            rangeMobile.valueAsNumber = sizeResponsive[2]
            positionQuantity2.textContent = sizeResponsive[2]
            responsiveEdit()
        }else{
            let newSize = data.clSize + ","+ data.clImg
            typeDesigW.value = data.clSize
            typeDesigH.value = data.clImg
            openResponsive.removeAttribute("checked")
            openPersonali.setAttribute("checked","checked")
            personalityEdit(newSize)
        }
        if (typeof clAllContent !== 'undefined'){
            let continuePaint = await paintTheDescrip(printData)
            if(continuePaint == true){
                if(allId.value == ""){
                    allChangeThis.style.display = "none"
                }else{
                    allChangeThis.style.display = "table-row"
                }
                paintData(printData,true)
            }
        }  
}
//Edición del cluster Search Data
const searchData = async (idCluster,ids,title,description,getNewData) => {
    const dataForm = new FormData
    dataForm.append('action','peticionEditar')
    dataForm.append('idCluster', idCluster) 
    dataForm.append('title',title)
    dataForm.append('idS',ids)
    dataForm.append('description',description)
    dataForm.append('nonce',solicitudesAjaxVisual.seguridad)
    dataForm.append('getNewData', getNewData)

    const newEdit = new Headers
    const allDataEdit = {
        method : 'POST',
        headers : newEdit,
        body : dataForm
    }
    let dataEdit = {}
    waitId.style.display="block"
    clusterWait()
    const responseEdit = await fetch(solicitudesAjaxVisual.url, allDataEdit)
    switch(responseEdit.status){
        case 200:
            waitId.style.display="none"
            dataEdit = await responseEdit.json()
            if(getNewData == false){
                changeDataStyle(dataEdit[0].style[0],dataEdit[0].allData)
            }else{
                if (typeof clAllContent !== 'undefined'){
                    let continuePaint = await paintTheDescrip(dataEdit[0].allData)
                    if(continuePaint == true){
                        paintData(dataEdit[0].allData,false)
                    }
                }  
            }
        break

        default:
            console.log("Upps existe un error")
        break
    }
    deleteItems()
}
//Edición del cluster
if(getUrl[1] != undefined){
    let idCluster = getUrl[1].split("edit=")
    if(idCluster[1] != undefined){
     startCluster()
     let description = showDescription.value
     let title = showTitle.value
     let ids = allId.value
     getNewData = false
     searchData(idCluster[1],ids,title,description,getNewData)
    }
}

///Activación de eventos
nombreCluster.addEventListener("keyup", e => {
    changeTitle()
})

nombreCluster.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
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
allId.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
})

//Editando titulo o description
newTitleEdit.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
})
newDescriptionEdit.addEventListener("keydown", e => {
    if (e.key == "Enter") {
        e.preventDefault();
    }
})
//Mostrando titulo o descripcion
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

//Borrando la espera
const deleteWait = () => {
    if (typeof waitId !== 'undefined'){
        if(waitId.parentNode.removeChild(waitId)){ startCluster()}
    }else{ startCluster()}
    if(allId.value != ""){searchActive() }
}

rangeDesktop.addEventListener("mouseup", e => {
    positionQuantity1.textContent = rangeDesktop.valueAsNumber
    typeDevice(activeDK,"0.26041","dk")
    deleteWait()
})
rangeTablet.addEventListener("mouseup", e => {
    positionQuantity3.textContent = rangeTablet.valueAsNumber
    typeDevice(activeTB,"0.78125","tb")
    deleteWait()
})
rangeMobile.addEventListener("mouseup", e => {
    positionQuantity2.textContent = rangeMobile.valueAsNumber
    typeDevice(activeMV,"1.38888","mv")
    deleteWait()
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
//Tipo de protocolo
httpsActive.addEventListener("change", e => {
    clusterProtocolo.value ="https://"
})
httpActive.addEventListener("change", e => {
    clusterProtocolo.value ="http://"
})
//Diseño responsivo
openResponsive.addEventListener("change", e => {
    typeDesig.value ="responsive"
    responsiveEdit()
    sendMeasure()
})
openPersonali.addEventListener("change", e => {
    typeDesig.value ="personality"
    getMeasure(measure.value) 
    personalityEdit(measure.value)
})

//Tipos de visualizaciones
activeDK.addEventListener("click", e => {
    typeDevice(activeDK,"0.26041","dk")
    deleteWait()
})
activeTB.addEventListener("click", e => {
    typeDevice(activeTB,"0.78125","tb")
    deleteWait()
})
activeMV.addEventListener("click", e => {
    typeDevice(activeMV,"1.38888","mv")
    deleteWait()
})

//Función autoejecutable
if(getUrl[1] == undefined){
startCluster()
}