<?php 
/*Obtiene todos los datos de la encuesta*/
function obtenerDatosCluster($getId){
    global $wpdb;
    $tablaClus = "{$wpdb->prefix}posts";
    $query = "SELECT * , LEFT(post_content, 200) AS shortDescription FROM $tablaClus WHERE ID = '$getId'";
    $datos = $wpdb->get_results($query,ARRAY_A);
    if(empty($datos)){
        $datos = array();
    }
    return $datos;
}

//Obtiene solo las imágines
function getImage($getId){
    global $wpdb;
    $tablaClus = "{$wpdb->prefix}posts";
    $attch = "attachment";
    $query = "SELECT * FROM $tablaClus WHERE post_parent = '$getId' && post_type ='$attch'";
    $datos = $wpdb->get_results($query,ARRAY_A);
    if(empty($datos)){
        $datos = array();
    }
    return $datos;
}

//Funcion por ajax atraves de visual.js
function visualAjax(){
    $nonce = $_POST['nonce'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    if(!wp_verify_nonce($nonce, 'segVisual')){
        die('no tiene permisos para ejecutar ese ajax');
    }
    $clusterId = $_POST['id'];
    $re = '/(\d{1,})/';
        $str = $clusterId;

        preg_match_all($re, $str, $allId, PREG_SET_ORDER, 0);

        $totalId = count($allId) - 1;
        for ($i = 0; $i <= $totalId; $i++) {
                $getId = $allId[$i][0];
                $listaCluster = obtenerDatosCluster($getId);
                foreach ($listaCluster as $key => $value) {
                    $clusId= $value['ID'];
                    if($title == 0){
                        $clusTitle= 0;
                    }else{
                        $clusTitle= $value['post_title'];
                    }
                    if($description == 0){
                        $clusDesc= 0;
                    }else{
                        $clusDesc= $value['shortDescription'];
                    }
                    // //attachment
                    // $listaCluster = obtenerDatosCluster($getId);
                    if($clusId == $getId){
                        $imgs = getImage($getId);
                        foreach($imgs as $row){
                            $img = $row['guid'];
                        }
                    $d [] = array(
                        "idS"=> $allId[$i][0],
                        "title" =>   $clusTitle,
                        "description" => $clusDesc,
                        "image" => $img 
                    );
                    }
                }
        }
    wp_send_json( $d );

}

//peticioneliminar tiene que coincider con el alias del lista_encuesta.js
add_action('wp_ajax_peticionVisualizar','visualAjax');

?>