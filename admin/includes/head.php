<?php 

    defined('ABSPATH') or die("Bye bye");


    $tabla1 = "{$wpdb->prefix}tecnoCluster";
    $tabla2 = "{$wpdb->prefix}tecnoClusterItems";
    $proximoId = "";
    $answer = null;
    $showTitle = 0;
    $showDescription = 0;

    if(isset($_POST['btnSave']) || isset($_POST["btnUpdate"]) && isset($_POST["nonce"])){

        $isEdit = false;
         $name = sanitize_text_field( $_POST['nombreCluster'] );

         /*Todos los ids */
         $allId = sanitize_text_field( $_POST['allId'] );
         /*Fin */

         /*Encabezado y tipo de enlace */
         $protocol = sanitize_text_field( $_POST['clusterProtocolo'] );
         $header = "h3";
         $open = sanitize_text_field( $_POST['urlOpen'] );
         /* fin */

        //Mostrar description titulo si o no   1--- 0
        if(isset($_POST["showTitle"])){
            $showTitle = sanitize_text_field( $_POST["showTitle"] );
        }
        if(isset($_POST["showDescription"])){
            $showDescription = sanitize_text_field( $_POST["showDescription"] );
        }
        //

         /*Arrays de contenido */
        //  $setIds = sanitize_text_field( $_POST["setIds"] );
        $setIds = esc_html( $_POST["setIds"] );

         $notTitle = 0;
         $notDescription  = 0;
         /*Fin del array */

         /*Es responsive o personalizado */
         $typeDesig = sanitize_text_field( $_POST["typeDesig"] );
         /*Fin */

         /*Rango del diseño responsivo */
         $rangeMobile = sanitize_text_field( $_POST["rangeMobile"] );
         $rangeDesktop = sanitize_text_field( $_POST["rangeDesktop"] );
         $rangeTablet = sanitize_text_field( $_POST["rangeTablet"] );

         $clSizeResp = "cl-size-dk-resp-".$rangeDesktop." cl-size-tb-resp-".$rangeTablet." cl-size-mv-resp-".$rangeMobile;
         $clImgResp = "cl-img-mv-resp-1 cl-hg-resp"; /* Todos miden lo mismo en imagenes borrar los necesarios en el css mv-dk-tb */
         /*Fin del rango */

         /*Rango del diseño personalizado */
         $typeDesigW = sanitize_text_field( $_POST["typeDesigW"] );
         $typeDesigH = sanitize_text_field( $_POST["typeDesigH"] );

         $clSizePer = "cl-size-".$typeDesigW." cl-nr cl-bg-ld";
         $clImgPer = "cl-img-".$typeDesigH;
         /*Fin del rango */

         if($typeDesig == "responsive"){
            $clSize = $clSizeResp;
            $clImg = $clImgResp;

         }else if($typeDesig == "personality"){
            $clSize = $clSizePer;
            $clImg = $clImgPer;
         }

         if(isset($_POST["btnSave"])){
            $query = "SELECT tecnoClusId FROM $tabla1 ORDER BY tecnoClusId DESC limit 1";
            $resultado = $wpdb->get_results($query,ARRAY_A);
            $codigo = uniqid();

            if( $resultado != null){
                $proximoId = $codigo . $resultado[0]['tecnoClusId'] . 1;
            }else{
                $proximoId = $codigo . 1;
            }


         }else{
             if(isset($_GET["edit"])){
                $proximoId = sanitize_text_field( $_GET["edit"] );
             }
         }

         $shortCode = "[cc_ct id=".'"'.$proximoId.'"'."]";

         $datos = [
            // 'tecnoClusId' => null,
            'name' => $name,
            'idShortCode' => $proximoId,
            'shortCode' => $shortCode,
            'clSize' => $clSize,
            'clImg' => $clImg,
            'type' => $typeDesig,
            'header' => $header,
            'open' => $open,
            'allId' => $allId
         ];
            if(isset($_POST["btnSave"])){
                $answer = $wpdb->insert($tabla1, $datos);
            }else{
                $where = [
                    "idShortCode" => $proximoId
                ];
                $answer = $wpdb->update($tabla1,$datos,$where);
                $isEdit = true;
            }
         if($answer || $isEdit){
            $ClusterChange = null;
            $i = 0;
            $sentence = null;
            foreach($setIds as $key => $value){
                //Obteniendo los datos enviados para borrar los que no 
                //se vayan a actualizar
                $dinamicSentece = " && idPost != '$value'";
                $sentence .=$dinamicSentece;


                $setImg = $_POST["setImg"][$i];
                $setUrl = $_POST["setUrl"][$i];
                $setAlter = $_POST["setAlter"][$i];
                if($protocol == "https://"){
                    $removeProtocol = "http://";
                }else{
                    $removeProtocol = "https://";
                }
                $onlyParam = explode($removeProtocol, $setImg);
                if($onlyParam[0] == ""){
                    $imgHttps = $protocol.$onlyParam[1];
                }else{
                    $imgHttps = $setImg;
                }

                if($showTitle == 1){
                    $titleClusters = $_POST["titleClusters"][$i];
                }else{
                    $titleClusters = $notTitle;
                }
                if($showDescription == 1){
                    $descriptionClusters = $_POST["descriptionClusters"][$i];
                }else{
                    $descriptionClusters = $notDescription;
                }
                $datos2 = [
                    // 'itemsId' => null,
                    "idShortCode" => $proximoId,
                    'urlImage' => $imgHttps,
                    'postUrl' => $setUrl,
                    'alter' => $setAlter,
                    'title' => $titleClusters,
                    'description' => $descriptionClusters,
                    'idPost' => $value
                ];
                if(isset($_POST["btnSave"])){
                    $wpdb->insert($tabla2, $datos2);
                }else{
                    $ClusterChange =  $proximoId;
                    $queryB = "SELECT idPost,itemsId FROM $tabla2 WHERE idShortCode = '$ClusterChange' &&
                    idPost = '$value'";
                    $results = $wpdb->get_results($queryB,ARRAY_A);

                   if(count($results) == 1){
                    foreach($results as $row){
                        $editItems = $row["itemsId"];
                        $idPostDB = $row["idPost"];
                    }
                    $where = [
                        "itemsId" => $editItems
                    ];
                    $wpdb->update($tabla2,$datos2,$where);
                   }else{
                    $wpdb->insert($tabla2, $datos2);
                   }
                }

                $i++;
            }
            if(isset($_POST["btnUpdate"])){

                $sentece1 = " idShortCode = '$ClusterChange' ";
                $totalSentence = $sentece1 . $sentence;
                $wpdb->query("DELETE FROM $tabla2 WHERE $totalSentence");

            }

         }
         if(isset($_POST["btnSave"])){
         $newUrl = 'admin.php?page=tcam_tcam_newTC&id='. $proximoId;
        ?>
    <script>
          window.history.pushState("", "","<?php echo $newUrl?>")
    </script>
    <?php
         }
    }
?>