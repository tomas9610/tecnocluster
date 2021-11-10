<?php 
///Paradigma funcional
function TC_getAllData($idCluster){
    global $wpdb;
    $table = "{$wpdb->prefix}tecnoCluster";
    $query = "SELECT  * FROM $table WHERE idShortCode = '$idCluster'";
    $data = $wpdb->get_results($query, ARRAY_A);
    if(empty($data)){
    $data = array();
    }
    return $data;
    }
    
    function TC_getItems($idCluster,$value,$searchInTheBD){
    global $wpdb;
    $table = "{$wpdb->prefix}tecnoClusterItems";
    if($searchInTheBD == null){
    $query = "SELECT * FROM $table WHERE idShortCode = '$idCluster' AND idPost='$value'";
    $data =  $wpdb->get_results($query,ARRAY_A);
    }else{
    $query = "SELECT * FROM $table WHERE idShortCode = '$idCluster' AND idPost='$value'";
    $data =  $wpdb->get_results($query,ARRAY_A);
    if( $data[0] == null){
        $tablaClus = "{$wpdb->prefix}posts";
        $querys = "SELECT * , LEFT(post_content, 200) AS shortDescription FROM $tablaClus WHERE ID = '$value'";
        $data = $wpdb->get_results($querys,ARRAY_A);
    }
    }
    if(empty($data)){
    $data = array();
    }
    return $data;
    }
    ///Decodificando enteros de una cadena
    function TC_getInt($completeData){
    $re = '/(\d{1,})/';
    $str = $completeData;
    preg_match_all($re, $str, $decodeInt, PREG_SET_ORDER, 0);
    return $decodeInt;
    }
    ///Obteniendo ids
    function TC_getIdS($allId,$ii){
    $decodeData = TC_getInt($allId);
    $theId = $decodeData[$ii][0];
    return $theId;
    }
    
    //Obteniendo el protocolo
    function TC_getProtocol($urlImg){
    $onlyParam = explode("https", $urlImg);
    if($onlyParam[0] == ""){
    $protocol = "https";
    }else{
    $protocol = "http";
    }
    return $protocol;
    }
    
    //Obteniendo titulo y descripcion
    function TC_showTitleAndDescription($showTitle,$showDes,$dataTitle,$dataDes){
    if($showTitle == null || $showTitle == 1){
    $title = $dataTitle;
    if($title == "0"){
        $title = 0;
    }
    }else{
    $title = 0;
    }
    if($showDes == null || $showDes == 1){
    $description = $dataDes;
    if($description == "0"){
        $description = 0;
    }
    }else{
    $description = 0;
    }
    $data = [
    "title" => $title,
    "description" => $description,
    ];
    return $data;
    }

    ///Array de datos a enviar
    function TC_dataSending($allId,$showTitle,$showDes,$data){
        $ii = 0;
        $num = count($data) -1;
        for($a = 0; $a <= $num; $a++){
            foreach($data[$a] as $row){
                $idS = TC_getIdS($allId,$ii);
                $isPost = $row["urlImage"];
                if($isPost != null){
                    $urlImg = $row["urlImage"];
                    $postUrl = $row["postUrl"];
                    $alter = $row["alter"];
                    $dataTitle = $row["title"];
                    $dataDes = $row["description"];
                }else{
                    $postUrl = get_permalink($idS);
                    $thumbID = get_post_thumbnail_id($idS);
                    $urlImg = wp_get_attachment_url( $thumbID);
                    $alter = $row["post_title"];
                    $dataTitle = $row["post_title"];
                    $dataDes = $row["shortDescription"];
                }
                $info = TC_showTitleAndDescription($showTitle,$showDes,$dataTitle,$dataDes);
                $title = $info["title"];
                $description = $info["description"];
                $clusters [] = array(
                    "image" => $urlImg,
                    "urlImage" => $postUrl,
                    "title" => $title,
                    "alter" => $alter,
                    "description" => $description,
                    "idS" => $idS,
                );
                $ii += 1;
            }
        }
    return $clusters;
    }
    
    function TC_getAllClusters($idCluster,$allId,$showTitle,$showDes){
    $searchInTheBD = $showTitle;
    $value = null;
    //Si es null entra y busca en la tabla de tecnoclusterItems
    if($searchInTheBD == null){
        $idS = TC_getInt($allId);
        $totalIds = count($idS) -1;
        for($x = 0; $x <= $totalIds; $x++){
            $id = $idS[$x][0];
            $datax = TC_getItems($idCluster,$id,$searchInTheBD);
            $data [] =
                $datax;
        }
    }else{
    $idS = TC_getInt($allId);
    $totalIds = count($idS) -1;
    
    for($x = 0; $x <= $totalIds; $x++){
        $id = $idS[$x][0];
        $datax = TC_getItems($idCluster,$id,$searchInTheBD);
        $data [] =
            $datax;
    }
    }
    $clusters = TC_dataSending($allId,$showTitle,$showDes,$data);
    return $clusters;
    }

   //Obteniendo tamaños 
    function TC_getSize($clusterSize){
    $allSize = TC_getInt($clusterSize);
    $totaSize = count($allSize) -1;
    $sizeNumber = "";
    for ($i = 0; $i <= $totaSize; $i++) {
    $getSize = $allSize[$i][0];
    if($i != $totaSize){
        $sizeNumber .= $getSize . ",";
    }else{
        $sizeNumber .= $getSize;
    }
    }
    return $sizeNumber;
    }
    
    function TC_getImgSize($clusterImg){
    $allSizeImg = TC_getInt($clusterImg);
    $imgSize = $allSizeImg[0][0];
    return $imgSize;
    }
    
    function TC_getDataStyle($styleCluster,$idCluster){
    $showTitle = null;
    $showDes = null;
    foreach($styleCluster as $row){
    $clSize = $row["clSize"];
    $clImg = $row["clImg"];
    $name = $row["name"];
    $type = $row["type"];
    $header = $row["header"];
    $open = $row["open"];
    $allId = $row["allId"];
    }
    $allClusters = TC_getAllClusters($idCluster,$allId,$showTitle,$showDes);
    $title = $allClusters[0]["title"];
    $description = $allClusters[0]["description"];
    if($title === 0){
    $title = 0;
    }else{
    $title = 1;
    }
    if($description === 0){
    $description = 0;
    }else{
    $description = 1;
    }
    $protocol = TC_getProtocol($allClusters[0]["image"]);
    $clSizeNum = TC_getSize($clSize);
    $clImgSizeNum = TC_getImgSize($clImg);
    $dataStyle [] = array(
    "clSize" => $clSizeNum,
    "clImg" => $clImgSizeNum,
    "name" => $name,
    "type" => $type,
    "open" => $open,
    "protocol" => $protocol,
    "allId" => $allId,
    "showTitle" => $title,
    "showDescription" => $description
    );
    return $dataStyle;
    }
    
    function TC_editCluster(){
    $nonce = $_POST['nonce'];
    $idCluster = $_POST['idCluster'];
    $newNewData = $_POST['getNewData'];
    $showTitle = null;
    $showDes = null;
    
    if(!wp_verify_nonce($nonce, 'segVisual')){
        die('no tiene permisos para ejecutar ese ajax');
    }
    if($newNewData === "false"){
    $styleCluster = TC_getAllData($idCluster);
    $dataStyle = TC_getDataStyle($styleCluster,$idCluster);
    $allClusters = TC_getAllClusters($idCluster,$dataStyle[0]["allId"],$showTitle,$showDes);
    }else{
    $idS = $_POST['idS'];
    $showTitle = $_POST['title'];
    $showDes = $_POST['description'];
    $allClusters = TC_getAllClusters($idCluster,$idS,$showTitle,$showDes);
    $dataStyle = "0";
    }
    $d [] = array(
    "style"=> $dataStyle,
    "allData" =>   $allClusters
    );
        wp_send_json($d);
    }
add_action('wp_ajax_peticionEditar','TC_editCluster');
// ?>