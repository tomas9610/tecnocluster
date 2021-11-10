<?php 

/**
 * Plugin Name:       tecnocluster
 * Plugin URI:        https://example.com/plugins/the-basics/
 * Description:       Este es un super plugin para crear diseños de imágenes tipo cluster, la última moda aconsejada en el mundo del SEO esto con el fin de acomodar tus articulos de una manera muy linda, entonces que opinas ahora.
 * Version:           1.0.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Tomás Alvarado Matamoros
 * Author URI:        https://tuitycode.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tecnocluster
 */
 	
defined('ABSPATH') or die("Bye bye");


//require 
require_once dirname(__FILE__).'/admin/includes/TC_shortcode.class.php';
require_once dirname(__FILE__).'/admin/includes/visual.php';
require_once dirname(__FILE__).'/admin/includes/edit.php';

function activeTecno(){
    global $wpdb;

$sql = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tecnoCluster(
    `tecnoClusId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(60) NULL,
    `idShortCode` VARCHAR(60) NULL,
    `shortCode` VARCHAR(60) NULL,
    `clSize` VARCHAR(100) NULL,
    `clImg` VARCHAR(100) NULL,
    `type` VARCHAR(30) NULL,
    `header` VARCHAR(30) NULL,
    `open` VARCHAR(30) NULL,
    `allId` VARCHAR(30) NULL,
    PRIMARY KEY (`tecnoClusId`));"; 
$wpdb->query($sql);

$sql2 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}tecnoClusterItems(
    `itemsId` INT NOT NULL AUTO_INCREMENT,
    `idShortCode` VARCHAR(60) NULL,
    `urlImage` VARCHAR(200) NULL,
    `postUrl` VARCHAR(200) NULL,
    `title` VARCHAR(100) NULL,
    `alter` VARCHAR(100) NULL,
    `description` VARCHAR(200) NULL,
    `idPost` int(11) NULL,
    PRIMARY KEY (`itemsId`));
  ";
  $wpdb->query($sql2);
}
function inactiveTecno(){
    flush_rewrite_rules();
}


register_activation_hook(__FILE__,"activeTecno");
register_deactivation_hook(__FILE__, "inactiveTecno");


add_action('admin_menu', "crearMenu");

function crearMenu(){
add_menu_page(
    'super clusters',//Titulo de la página
    'Tecnocluster',//Titulo del menu
    'manage_options',//capability
    plugin_dir_path(__FILE__).'admin/list_view.php',
    null,
    plugin_dir_url(__FILE__).'admin/img/icon.png',
    '1'
);
add_submenu_page(
    plugin_dir_path(__FILE__).'admin/list_view.php',//parent slug
    'Agregar nuevo',//Titulo de página
    'Agregar nuevo',//Titulo de menu
    'manage_options',
    'tcam_newTC',
    'tcam_newTC'
);
}

//Edit Cluster
function tcam_newTC(){
    require_once dirname(__FILE__).'/admin/newTC.php';
}

function tcam_mixBootstrap($hook){
    if($hook != "tecnocluster/admin/list_view.php" && $hook != "tecnocluster_page_tcam_newTC"){
        return;
    }
    wp_enqueue_script('boots',plugins_url('admin/bootstrap/js/bootstrap.min.js',__FILE__),array('jquery'),null,true);
}
add_action('admin_enqueue_scripts','tcam_mixBootstrap');

function tcam_mixBootstrapCSS($hook){
    if($hook != "tecnocluster/admin/list_view.php" && $hook != "tecnocluster_page_tcam_newTC"){
        return ;
    }
    wp_enqueue_style('bootstrapCSS',plugins_url('admin/bootstrap/css/bootstrap.min.css',__FILE__));
    wp_enqueue_style('tecnoMain',plugins_url('admin/css/main.css',__FILE__));
    wp_enqueue_style('tecnoStyle',plugins_url('admin/css/clStyle.css',__FILE__));
}
add_action('admin_enqueue_scripts','tcam_mixBootstrapCSS');

///Js propio
function tcam_newScript($hook){
    if($hook != "tecnocluster/admin/list_view.php"){
        return;
    }
    wp_enqueue_script('listClustersJs',plugins_url('admin/js/list_clusters.js',__FILE__),array('jquery'));
    wp_localize_script('listClustersJs', 'solicitudesAjax',[
        'url' => admin_url('admin-ajax.php'), 'seguridad' => wp_create_nonce('seg')
    ]);
}
add_action('admin_enqueue_scripts','tcam_newScript');

////Función que evita que el script se muestre en la lista de cluster

function tcam_onlyNewClusterAndEdit($hook){
    if($hook != "tecnocluster_page_tcam_newTC"){
        return;
    }
    wp_enqueue_script('scriptVisual',plugins_url('admin/js/cl-visual.js',__FILE__),array(),null,true);
    wp_localize_script('scriptVisual', 'solicitudesAjaxVisual',[
        'url' => admin_url('admin-ajax.php'), 'seguridad' => wp_create_nonce('segVisual')
    ]);
}
add_action('admin_enqueue_scripts','tcam_onlyNewClusterAndEdit');

//Carga los archivos en la página visual del cliente
function tcam_my_load_scripts($hook) {
 
    // create my own version codes
    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'public/js/script.js' ));
    $my_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'public/css/main.css' ));
     
    // 
    wp_enqueue_script( 'custom_js', plugins_url( 'public/js/script.js', __FILE__ ), array(), $my_js_ver,true );
    wp_register_style( 'my_css',    plugins_url( 'public/css/main.css',    __FILE__ ), false,   $my_css_ver );
    wp_enqueue_style ( 'my_css' );
 
}
add_action('wp_enqueue_scripts', 'tcam_my_load_scripts');

//ajax

function tcam_deleteCluster(){
    $nonce = $_POST['nonce'];
    if(!wp_verify_nonce($nonce, 'seg')){
        die('no tiene permisos para ejecutar ese ajax');
    }

    if(isset($_POST['id'])){
        $id = $_POST['id'];
        global $wpdb;
        $tabla = "{$wpdb->prefix}tecnoCluster";
        $tabla2 = "{$wpdb->prefix}tecnoClusterItems";
        $wpdb->delete($tabla,array('idShortCode' =>$id));
        $wpdb->delete($tabla2,array('idShortCode' =>$id));
         return true;
    }else{
        return false;
    }

}

//deleteCluster tiene que coincider con el alias del lista_encuesta.js
//Si no cambia cambiar deleteCluster
add_action('wp_ajax_TC_deleteCluster','tcam_deleteCluster');

///Shortcode

//shortcode

function tcam_printShortCode($atts){
    $_short = new TC_shortcode;
   // obtener el id por parametro
    $id= $atts['id'];
   // Imprimir el formulario
    $html = $_short->TC_assemble($id);
    return $html;
}


add_shortcode("cc_ct","tcam_printShortCode");
?>