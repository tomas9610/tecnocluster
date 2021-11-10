<?php

defined('ABSPATH') or die("Bye bye");

class TC_shortcode{
   
    public function TC_getCluster($clusterId){
        global $wpdb;
        $tabla = "{$wpdb->prefix}tecnoCluster";
        $query = "SELECT * FROM $tabla WHERE idShortCode = '$clusterId'";
        $datos = $wpdb->get_results($query,ARRAY_A);
        if(empty($datos)){
            $datos = array();
        }
        return $datos[0];
    }


    public function TC_getClusterItems($clusterId){
        global $wpdb;
        $tabla = "{$wpdb->prefix}tecnoClusterItems";
        $query = "SELECT * FROM $tabla WHERE idShortCode = '$clusterId'";
        $datos = $wpdb->get_results($query,ARRAY_A);
        if(empty($datos)){
            $datos = array();
        }
        return $datos;
    }


    public function formOpen($name){
        $html = "
        <div id='clAllContent' class='cl-dv-otr-cnt-resp'>
        ";

        return $html;
    }

    public function formClose(){
        $html = "
          </div>  
        ";

        return $html;
    }


    function fromInput($urlImage,$title,$description,$clSize,$clImg,$open,$header,$postUrl,$alter){
        $descriptionP = "";
        $titleP = "";
        if($description !== "0"){
            $descriptionP = "<p class='cl-txt-cluster'> $description</p>";
        }
        if($title !== "0"){
            $titleP = "<$header class='cl-title-cluster'><a href='$postUrl' class='cl-no-dc cl-a-href-cl' target='$open'>$title</a></$header>";
        }
        $html="";
            $html="
            <div class ='$clSize cl-aling'>
            <div class='$clImg cl-bg-img'>
            <a href='$postUrl' target='$open'>
            <img class='cl-img-bg' src='$urlImage' alt='$alter'>
                </a>
            </div>
            <div class='cl-dc-content'>
                $titleP
                <div>
                    $descriptionP
                </div>
            </div>
            </div>
            ";
        return $html;
    }


    function TC_assemble($clusterId){
        $tec = $this->TC_getCluster($clusterId);
         $name = $tec['name'];
         $clSize = $tec['clSize'];
         $clImg = $tec['clImg'];
         $open = $tec['open'];
         $header = $tec['header'];
         $type = $tec['type'];

        //obtener todas las preguntas
        $allClusters = "";
        $listapregutas = $this->TC_getClusterItems($clusterId);
        foreach ($listapregutas as $key => $value) {
            $urlImage = $value['urlImage'];
            $postUrl = $value['postUrl'];
            $title = $value['title'];
            $alter = $value['alter'];
            $description =$value['description'];
            $tecid = $value['idShortCode'];

            if($tecid == $clusterId){
                $allClusters .= $this->fromInput($urlImage,$title,$description,$clSize,$clImg,$open,$header,$postUrl,$alter);
            }
        }

        $html = $this->formOpen($name);
        $html .= $allClusters;
        $html .= $this->formClose();

        return $html;

    } 


}

?>