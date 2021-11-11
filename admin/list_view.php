<?php 

    defined('ABSPATH') or die("Bye bye");

    global $wpdb;

    $query = "SELECT * FROM {$wpdb->prefix}tecnoCluster";
    $list_clusters = $wpdb->get_results($query,ARRAY_A);
    if(empty($list_clusters)){
        $list_clusters = array();
    }
?>
<div class="wrap">
<?php 
    echo '<h1>'.get_admin_page_title() .'</h1>';
?>
<a href="<?php echo admin_url( 'admin.php?page=tcam_tcam_newTC', __FILE__ )?>" class="page-title-action">Añadir nueva</a>
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

                    $permited = ["h1"];

                    foreach($list_clusters as $key => $value){ 
                        $idEc= $value["idShortCode"];
                        $name = $value["name"];
                        $sc = $value["shortCode"];?>
                        <tr>
                            <td><?php echo wp_kses($name,$permited,array ())?></td>
                            <td><?php echo wp_kses($sc,$permited,array ())?></td>
                            <td>
                                <a href="<?php echo admin_url( 'admin.php?page=tcam_tcam_newTC&edit='.wp_kses($idEc,$permited,array ()), __FILE__ )?>" class="page-title-action">
                                    Editar
                                </a>
                                <a data-id ="<?php echo wp_kses($idEc,$permited,array ())?>" class="page-title-action">
                                    Borrar
                                </a>
                            </td>
                        </tr>
                   <?php } ?>

        </tbody>
    </table>


</div>
