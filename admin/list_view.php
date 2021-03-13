<?php 
    global $wpdb;

    $query = "SELECT *FROM {$wpdb->prefix}encuestas";
    $lista_encuestas = $wpdb->get_results($query,ARRAY_A);
    if(empty($lista_encuestas)){
        $lista_encuestas = array();
    }
?>
<div class="wrap">
<?php 
    echo '<h1>'.get_admin_page_title() .'</h1>';
?>
<a href="<?=admin_url( 'admin.php?page=newTC', __FILE__ )?>" class="page-title-action">Añadir nueva</a>
<br><br><br>

    <table class="wp-list-table widefat fixed striped pages">
        <thead>
        <tr>
            <th>Nombre</th>
            <th>Shortcode</th>
            <th>Acciones</th>
       </tr>
        </thead>
        <tbody id="the-list">
                 <?php 
                    foreach($lista_encuestas as $key => $value){ 
                        $idEc= $value["idShortCode"];
                        $nombre = $value["nombre"];
                        $sc = $value["shortCode"];?>
                        <tr>
                            <td><?=$nombre?></td>
                            <td><?=$sc?></td>
                            <td>
                                <a href="" class="page-title-action">
                                    Ver
                                </a>
                                <a data-id ="<?=$idEc?>" class="page-title-action">
                                    Borrar
                                </a>
                            </td>
                        </tr>
                   <?php } ?>

        </tbody>
    </table>


</div>
