$(function(){
    //starter1 == id_raza 1 - starter2 == id_raza 4 - starter3 == id_raza 6

    //funcion para rellenar toda la info de las tarjetas, obteniendo los valores de base de datos
    rellenarStarters()

    $("#seleccionCompi").on('click', ".starter", function () {
        $(".imgStSeleccionado").attr("src", "")
        let cards = $(".starter")

        for (let i = 0; i < cards.length; i++) {
            cards.eq(i).removeClass("seleccionadoSt")
        }

        let urlImgIcono = $(this).find(".imgSt").attr("src")
        $(".imgStSeleccionado").attr("src", urlImgIcono)
        $(this).addClass("seleccionadoSt")

        idSelected = $(this).find(".idSt").html()
    })
})

function rellenarStarters() {
    let ids = [1, 4, 6]

    for (let i = 0; i < ids.length; i++) {
        let starterCard = $(".starter").eq(i)
        let currentId = ids[i]

        $.ajax({
            url: 'php/funciones.php',
            type: 'POST',
            data: {
                "getDatosRazaCompiDB": true,
                "idRaza": currentId
            },
            success: function (respuesta) {
                var datos = JSON.parse(respuesta);
                if (datos.length > 0) {
                    $.each(datos, function (index, starter) {   
                        idSt = parseInt(starter.id_raza);
                        nombreSt = starter.nombre;
                        hpSt = parseInt(starter.hp_base);
                        atkSt = parseInt(starter.atk_base);
                        imgSt = starter.ruta_img;
                        imgFullSt = starter.ruta_img_fullbody;
                        descripcionSt = starter.descripcion;
                    });
                    starterCard.find(".idSt").html(idSt)
                    starterCard.find(".nombreSt").html(nombreSt)
                    starterCard.find(".hpSt").html(hpSt)
                    starterCard.find(".atkSt").html(atkSt)
                    starterCard.find(".descripcionSt").html(descripcionSt)
                    starterCard.find(".imgSt").attr("src", imgSt)
                    starterCard.find(".imgFullSt").attr("src", imgFullSt)
                } else {
                    console.log("Fallo al cargar starter " + (i+1))
                }
            },
            error: function () {
                console.log('Error al cargar el JSON');
            }
        });
    }
}

function registrarCompi(idSelected, moteCompi) {
    let hp = $(".seleccionadoSt").find(".hpSt").html()
    let atk = $(".seleccionadoSt").find(".atkSt").html()
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "addCompiDB": true,
            "id_cuenta": sessionStorage.getItem("idUserLogged"),
            "id_raza": idSelected,
            "mote": moteCompi,
            "hp": hp,
            "atk": atk
        },
        success: function (respuesta) {
            //var datos = JSON.parse(respuesta);
            if (respuesta != "0") {
                //si se crea...
                $("#evolucion .toast-body").html("¡Felicidades! Dile hola a " + moteCompi + " y pasadlo bien.")
                $('#evolucion').toast('show')
                cargarDatos()
            } else {
                $("#alertas .toast-body").html("Error en el registro...")
                $('#alertas').toast('show')
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}