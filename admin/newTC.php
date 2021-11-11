<?php 
    global $wpdb;
    require_once 'includes/head.php';
    require_once 'includes/edit.php';
?>
<div class="wrap">
<?php 
    $idUrl = null;
    echo '<h1 id="nameCluster">'.get_admin_page_title() .'</h1>';
    
?>
<?php if (isset($_GET['id']) || isset($_POST['btnSave'])) :?>
    <?php
        $permited = ["h1"];
        if(strlen($proximoId) > 0){
            $idUrl = $proximoId;
        }else{
            $idUrl = $_GET['id'];
        }
        $shortCodeUrl = "[cc_ct id=".'"'.$idUrl.'"'."]"; 
        
    ?>
    <div class="card border-primary mb-3" style="max-width: 28rem;">
        <div class="card-header">ShortCode</div>
            <div class="card-body text-primary">
                <?php echo wp_kses($shortCodeUrl,$permited,array ())?>
            </div>
        </div>
    <?php endif; ?>

</div><br>

 <!---->
 <?php if($idUrl == null ) :?>

 <div class="container">
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-2" >
    <div class="col">
        <form method="post" >
        <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('seg2') ?>">
        <input type="hidden" id="typeCluster" value="page">
        <input class="form-check-input" type="radio" name="exampleRadios" id="clusterPage" value="option1" checked>
            Páginas
        <input class="form-check-input" type="radio" name="exampleRadios" id="clusterEntry" value="option2">
            Entradas

        <div class="modal-body">
                <table id="camposdinamicos">
                <tr>  
                        <td>
                        <label for="txtnombre" class="col-form-label" style="margin-right:5px">Nombre del cluster</label>
                        </td>
                        <td>
                            <input type="text" id="nombreCluster" name="nombreCluster" style="width:100%" placeholder="Cluster ' Página 1 '">
                        </td>
                    </tr>
                    <tr>  
                        <td>
                        <label for="txtnombre" class="col-form-label" style="margin-right:5px">Agregar ID <b style="font-size:12px">(id1, id2 etc.)<b></label>
                        </td>
                        <td>
                            <input type="text" name="allId" id="allId" class="form-control name_list" placeholder="Actualiza fuera del cuadro">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" value="1" id="showTitle" name="showTitle" checked>
                            Mostrar título
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="checkbox" value="1" id="showDescription" name="showDescription" checked>
                            Mostrar descripción
                        </td>
                    </tr>
                <tr id="allChangeThis" style="display: none;">
                    <td id="editPerId">
                            <!--Obteniendo los id para editar los cluster-->
                    </td>
                    <td>
                    <input type="text" id="newTitleEdit" name="newTitleEdit" style="width:100%" placeholder="Titulo">
                    <textarea id="newDescriptionEdit" spellcheck="false" name="newDescriptionEdit" style="width:100%" rows="3"></textarea>
                    <button class="cl-btn-edit-data" id="editDataStorage" onclick="event.preventDefault();saveStorage(this)">Listo</button>
                    <!--Ingresando los otros inputs-->
                        <div id="allInputDinamic">
                            <!--Here content-->
                        </div>
                    </td>
                </tr>
                    <!--Diseño responsivo--->
                    <th style="padding: 20px 0px 20px 0px;position:relative">Tamaños</th>
                    <input type="hidden" id="typeDesig" value="responsive" name="typeDesig"><!--personality-->
                        <tr>
                        <td>
                            <input class="form-check-input" type="radio" name="howSize" id="openResponsive" checked>
                            Diseño responsivo
                        </td>
                        </tr>
                        <tr>
                            <td>
                            <input class="form-check-input" type="radio" name="howSize" id="openPersonali" >
                                Personalizado
                            </td>
                        </tr>
                    <!----->
                    <th id="thResponsive" style="padding: 20px 0px 20px 0px;position:relative;font-size:14px;">Responsivo (cantidades)</th>
                    <tr id="trResponsive1">  
                        <td>
                            <div style="width: 200px;">
                                <label for="txtnombre" class="col-form-label" style="margin-right:5px">Desktop (<span id="positionQuantity1" style="color:blue">3</span>)</label>
                                <input type="range" class="form-range" min="0" max="6" id="rangeDesktop" name="rangeDesktop">
                                <label for="txtnombre" class="col-form-label" style="margin-right:5px">Tablet (<span id="positionQuantity3" style="color:blue">2</span>)</label>
                                <input type="range" class="form-range" min="0" max="4" id="rangeTablet" name="rangeTablet">
                                <label for="txtnombre" class="col-form-label" style="margin-right:5px">Mobile (<span id="positionQuantity2" style="color:blue">1</span>)</label>
                                <input type="range" class="form-range" min="0" max="2" id="rangeMobile" name="rangeMobile">
                            </div>
                        </td>
                    </tr>
                    <!--Personalizado-->
                    <th id="thPersonali" style="padding: 20px 0px 20px 0px;position:relative;font-size:14px;display:none;">Personalizado</th>
                    <tr id="trPersonali" style="display: none;">
                        <td>
                        <label for="txtnombre" class="col-form-label" style="margin-right:5px;display:none;">Tamaño</label>
                        </td>
                        <td>
                        <div style="width: 200px;">
                        <input type="hidden" id="typeDesigW" value="150" name="typeDesigW">
                        <input type="hidden" id="typeDesigH" value="150" name="typeDesigH">
                            <select name="measure[]" id="measure" class="form-control type_list"  style="margin-left:5px">
                                    <option value="150,150" select>150 x 150</option>
                                    <option value="300,300">300 x 300</option>
                                    <option value="320,240">320 x 240</option>
                                    <option value="350,200">350 x 200</option>
                                    <option value="480,480">480 x 480</option>
                                    <option value="750,490">750 x 490</option>
                                    <option value="1024,1024">1024 x 1024</option>
                                    <option value="1536,1536">1536 x 1536</option>
                            </select>
                        </div>
                        </td>
                    </tr>
                    <!---FIN--->
                    </tr>
                        <th style="padding: 20px 0px 20px 0px;position:relative">Abrir enlace</th>
                        <input type="hidden" id="typeOpenPage" name="urlOpen" value="_self">
                        <tr>
                        <td>
                            <input class="form-check-input" type="radio" name="howPage" id="openSelf" checked>
                            Misma página
                        </td>
                        </tr>
                        <tr>
                            <td>
                            <input class="form-check-input" type="radio" name="howPage" id="openBlank" >
                                Nueva página
                            </td>
                        </tr>
                        <!--Https-->
                        <th style="padding: 20px 0px 20px 0px;position:relative">Protocolo</th>
                        <input type="hidden" name="clusterProtocolo" id="clusterProtocolo" value="https://">
                        <tr>
                        <td>
                            <input class="form-check-input" type="radio" name="howProtocolo" id="httpsActive" checked>
                            https://
                        </td>
                        </tr>
                        <tr>
                            <td>
                            <input class="form-check-input" type="radio" name="howProtocolo" id="httpActive" >
                                http://
                            </td>
                        </tr>
                </table>


        </div>
        <div class="modal-footer">
            <?php if(isset($_GET["edit"])): ?>
                <button type="submit" class="btn btn-primary" name="btnUpdate" id="btnUpdate">Actualizar</button>
            <?php else : ?>
                <button type="submit" class="btn btn-primary" name="btnSave" id="btnSave">Guardar</button>
            <?php endif; ?>
        </div>
        </form>
    </div>
    <div class="col" style="width:500px;padding: 0;min-height:320px;">
    <div id="cardVisual" style="padding:0;width:500px;height:100%;">
        <div class="card-header">
            Visualización
            <input type="hidden" id="typeVisualization" value="dk">
            <button type="button" class="btn btn-primary" id="activeDK">Desktop</button>
            <button type="button" class="btn btn-outline-primary" id="activeTB">Tablet</button>
            <button type="button" class="btn btn-outline-primary" id="activeMV">Mobile</button>
        </div>
          <div style="padding: 5px 5px;">
            <div id="startNewCluster" style="background-color: rgba( 212, 214, 215 , 0.4);height:600px;overflow-y: auto;">
                <div id="clAllContent" class="cl-dv-otr-cnt-resp">

                </div>
                   <!--Contenido de espera-->
            </div>
        </div>
        </div>
    </div>
  </div>
</div>
<?php else : ?>
    <a href="<?php echo admin_url( 'admin.php?page=tcam_tcam_newTC', __FILE__ )?>" class="page-title-action">Añadir nueva</a>
 <?php endif; ?>