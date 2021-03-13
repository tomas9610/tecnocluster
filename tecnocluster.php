<?php 
/*
Plugin Name: tecnocluster
Plugin URI: https://tuitycode.com
Description: Plugin de ejemplo del post de como crear un plugin en WordPress
Version: 1.0
Author: Tomás Alvarado
Author URI: https://tuitycode.com
License: GPL2
*/
 	
defined('ABSPATH') or die("Bye bye");

///
// define( 'PT_TC_PATH', plugin_dir_path( __FILE__ ) );
// include_once(  PT_TC_PATH . 'includes/index.php' );

//require 
require_once dirname(__FILE__).'/admin/includes/codigoCorto.class.php';
require_once dirname(__FILE__).'/admin/includes/visual.php';

function activeTecno(){
    global $wpdb;

$sql = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}encuestas(
    `encuestaId` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(60) NULL,
    `idShortCode` VARCHAR(60) NULL,
    `shortCode` VARCHAR(60) NULL,
    PRIMARY KEY (`encuestaId`));"; 
$wpdb->query($sql);

$sql2 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}encuestas_detalle(
    `detalleId` INT NOT NULL AUTO_INCREMENT,
    `idShortCode` VARCHAR(60) NULL,
    `pregunta` VARCHAR(60) NULL,
    `tipo` VARCHAR(60) NULL,
    PRIMARY KEY (`detalleId`));
  ";
  $wpdb->query($sql2);

  $sql3 = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}encuestas_respuestas(
    `respuestaId` INT NOT NULL AUTO_INCREMENT,
    `detalleId` INT NULL,
    `codigo` VARCHAR(60) NULL,
    `respuesta` VARCHAR(60) NULL,
    PRIMARY KEY (`respuestaId`));
  ";
    $wpdb->query($sql3);
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
    'newTC',
    'newTC'
);
}

//Edit Cluster
function newTC(){
    require_once dirname(__FILE__).'/admin/newTC.php';
}

function encolarBootstrap($hook){
    if($hook != "tecnocluster/admin/list_view.php" && $hook != "tecnocluster_page_newTC"){
        return;
    }
    wp_enqueue_script('boots',plugins_url('admin/bootstrap/js/bootstrap.min.js',__FILE__),array('jquery'),null,true);
}
add_action('admin_enqueue_scripts','encolarBootstrap');

function EncolarBootstrapCSS($hook){
    if($hook != "tecnocluster/admin/list_view.php" && $hook != "tecnocluster_page_newTC"){
        return ;
    }
    wp_enqueue_style('bootstrapCSS',plugins_url('admin/bootstrap/css/bootstrap.min.css',__FILE__));
    wp_enqueue_style('tecnoMain',plugins_url('admin/css/main.css',__FILE__));
    wp_enqueue_style('tecnoStyle',plugins_url('admin/css/clStyle.css',__FILE__));
}
add_action('admin_enqueue_scripts','EncolarBootstrapCSS');

///Js propio
function newScript($hook){
    if($hook != "tecnocluster/admin/list_view.php" && $hook != "tecnocluster_page_newTC"){
        return;
    }
    wp_enqueue_script('listaEncuestaJs',plugins_url('admin/js/lista_encuesta.js',__FILE__),array('jquery'));
    wp_localize_script('listaEncuestaJs', 'solicitudesAjax',[
        'url' => admin_url('admin-ajax.php'), 'seguridad' => wp_create_nonce('seg')
    ]);
}
add_action('admin_enqueue_scripts','newScript');

function newVisual($hook){
    if($hook != "tecnocluster/admin/list_view.php" && $hook != "tecnocluster_page_newTC"){
        return;
    }
    wp_enqueue_script('scriptVisual',plugins_url('admin/js/cl-visual.js',__FILE__),array(),null,true);
    wp_localize_script('scriptVisual', 'solicitudesAjaxVisual',[
        'url' => admin_url('admin-ajax.php'), 'seguridad' => wp_create_nonce('segVisual')
    ]);
}
add_action('admin_enqueue_scripts','newVisual');

//Carga los archivos en la página
function my_load_scripts($hook) {
 
    // create my own version codes
    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'public/js/test.js' ));
    $my_css_ver = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'public/css/test.css' ));
     
    // 
    wp_enqueue_script( 'custom_js', plugins_url( 'public/js/test.js', __FILE__ ), array(), $my_js_ver );
    wp_register_style( 'my_css',    plugins_url( 'public/css/test.css',    __FILE__ ), false,   $my_css_ver );
    wp_enqueue_style ( 'my_css' );
 
}
add_action('wp_enqueue_scripts', 'my_load_scripts');

//ajax

function EliminarEncuesta(){
    $nonce = $_POST['nonce'];
    if(!wp_verify_nonce($nonce, 'seg')){
        die('no tiene permisos para ejecutar ese ajax');
    }

    $id = $_POST['id'];
    global $wpdb;
    $tabla = "{$wpdb->prefix}encuestas";
    $tabla2 = "{$wpdb->prefix}encuestas_detalle";
    $tabla3 = "{$wpdb->prefix}encuestas_respuestas";
    $wpdb->delete($tabla,array('idShortCode' =>$id));
    $wpdb->delete($tabla2,array('idShortCode' =>$id));
    $wpdb->delete($tabla3,array('codigo' =>$id));
     return true;
}

//peticioneliminar tiene que coincider con el alias del lista_encuesta.js
add_action('wp_ajax_peticioneliminar','EliminarEncuesta');

///Shortcode

//shortcode

function imprimirshortcode($atts){
    $_short = new codigocorto;
    //obtener el id por parametro
    $id= $atts['id'];
    //Programar las acciones del boton
    if(isset($_POST['btnGuardar'])){
        $listadePreguntas = $_short->ObtenerEncuestaDetalle($id);
        $codigo = $id;
        foreach ($listadePreguntas as $key => $value) {
           $idpregunta = $value['detalleId'];
           if(isset($_POST[$idpregunta])){
               $valortxt = $_POST[$idpregunta];
               $datos = [
                   'detalleId' => $idpregunta,
                   'codigo' => $codigo,
                   'respuesta' => $valortxt
               ];
               $_short->GuardarDetalle($datos);
           }
        }
        return " Encuesta enviada exitosamente";
    }
    //Imprimir el formulario
    $html = $_short->Armador($id);
    return $html;
}


add_shortcode("SC_CT","imprimirshortcode");
?>