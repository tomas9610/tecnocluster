/* New script */

jQuery(document).ready(function($){

    // console.log(solicitudesAjax)

    $(document).on('click',"a[data-id]",function(){
        var id = this.dataset.id;
        var url = solicitudesAjax.url;
        $.ajax({
            type: "POST",
            url: url,
            data:{
                action : "TC_deleteCluster",
                nonce : solicitudesAjax.seguridad,
                id: id,
            },
            success:function(){
                alert("Datos borrados");
                location.reload();
            }
        });
    });

})