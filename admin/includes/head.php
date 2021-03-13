<?php 
    $tabla1 = "{$wpdb->prefix}encuestas";
    $tabla2 = "{$wpdb->prefix}encuestas_detalle";

    if(isset($_POST['btnGuardar'])){
         $nombre = $_POST["nombreEncuesta"];
         $query = "SELECT encuestaId FROM $tabla1 ORDER BY encuestaId DESC limit 1";
         $resultado = $wpdb->get_results($query,ARRAY_A);
         $codigo = uniqid();
         $proximoId = $codigo . $resultado[0]['encuestaId'] . 1;
         $shortCode = "[SC_CT id='$proximoId']";

         $datos = [
            'encuestaId' => null,
            'nombre' => $nombre,
            'idShortCode' => $proximoId,
            'shortCode' => $shortCode
         ];
         $respuesta = $wpdb->insert($tabla1, $datos);

         if($respuesta){
            $listaPregutas = $_POST['name'];
            $i = 0;
            foreach($listaPregutas as $key => $value){
                $tipo = $_POST['type'][$i];
                $datos2 = [
                    'detalleId' => null,
                    "idShortCode" => $proximoId,
                    'pregunta' => $value,
                    'tipo' => $tipo
                ];
                $wpdb->insert($tabla2, $datos2);

                $i++;
            }
            //  $this_insert = $wpdb->insert_id;
         }
         $newUrl = 'admin.php?page=newTC&id='. $proximoId;
        ?>
    <script>
          window.history.pushState("", "","<?=admin_url( $newUrl, __FILE__ )?>")
    </script>
    <?php
    }
?>