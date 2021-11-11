<?php 

defined('ABSPATH') or die("Bye bye");


/*Obtiene todos los datos de la encuesta*/
function TC_getDataCluster($getId){
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
function TC_getImage($getId){
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
function TC_visualAjax(){
    if(isset($_POST['title']) && isset($_POST['description']) && isset($_POST['id']) && isset($_POST['nonce'])){
        $nonce = $_POST['nonce'];
        $title = sanitize_text_field( $_POST['title'] );
        $description = sanitize_text_field( $_POST['description'] );
        $clusterId = sanitize_text_field( $_POST['id'] );
        if(!wp_verify_nonce($nonce, 'segVisual')){
            die('no tiene permisos para ejecutar ese ajax');
        }
        $re = '/(\d{1,})/';
            $str = $clusterId;

            preg_match_all($re, $str, $allId, PREG_SET_ORDER, 0);

            $totalId = count($allId) - 1;
            for ($i = 0; $i <= $totalId; $i++) {
                    $getId = $allId[$i][0];
                    $listaCluster = TC_getDataCluster($getId);
                    foreach ($listaCluster as $key => $value) {
                        $clusId= $value['ID'];
                        $alter = $value['post_title'];
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
                        // $listaCluster = TC_getDataCluster($getId);
                        if($clusId == $getId){
                            $urlImage = get_permalink($getId);
                            $thumbID = get_post_thumbnail_id($getId);
                            $imgUrl = wp_get_attachment_url( $thumbID);
                            $imgs = TC_getImage($getId);
                            foreach($imgs as $row){
                                $img = $row['guid'];
                            }
                        $d [] = array(
                            "idS"=> $allId[$i][0],
                            "title" =>   $clusTitle,
                            "alter" =>   $alter,
                            "description" => $clusDesc,
                            "image" => $imgUrl,
                            'urlImage' => $urlImage
                        );
                        }
                    }
            }
        wp_send_json( $d );
    }
}

//peticioneliminar tiene que coincider con el alias del cl-visual
add_action('wp_ajax_peticionVisualizar','TC_visualAjax');

?>