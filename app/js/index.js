$(function(){
    //Al cargar la página, si el usuario no tiene datos de sesion loggeados...
    if (sessionStorage.getItem("usernameLogged") === null) {
        //a la pagina de inicio al cargar si no esta loggeado
        irAHome()
    } else {
        //si está loggeado, cargo sus datos
        cargarDatos()
    }

    //redirecciones
    $('body').on('click', ".irAMenu", function() {
        irAJuego()
    })

    $('body').on('click', ".irAAdminMenu", function() {
        $.ajax({
        
        url: 'html/adminMenu.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
        });
    })

    $('body').on('click', ".irAPerfil", function() {
        $.ajax({
        
        url: 'html/perfil.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
        });
    })

    $('body').on('click', ".registro", function() {
        $.ajax({
        
        url: 'html/registro.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
        });
    })
    
    //Al hacer login compruebo si los datos son correctos y guardo los datos pertinentes si es así, además de iniciar sesión
    $('body').on('click', ".login-modal", function() {
        let user = $("#inputUsername").val()
        let pass = $("#inputPassword").val()

        $.ajax({
            url: 'php/funciones.php',
            type: 'POST',
            data: {
                "loginDB": true,
                "user": user,
                "pass": pass
            },
            success: function (respuesta) {
                var datos = JSON.parse(respuesta);
                if (datos.length > 0) {
                    //si se logea correctamente, guardo todos los datos que necesito en variables de sesión
                    
                    $.each(datos, function (index, usuario) {                      
                        usernameLogged = usuario.username;
                        nombreUserLogged = usuario.nombre;
                        imgUserLogged = usuario.avatar;
                        idUserLogged = parseInt(usuario.id_cuenta);
                        moneyLogged = usuario.money;
                        isAdmin = usuario.admin;
                        fechaLogged = usuario.fecha_creacion;
                        correoLogged = usuario.correo;
                    });
                    sessionStorage.setItem("usernameLogged", usernameLogged)
                    sessionStorage.setItem("nombreUserLogged", nombreUserLogged)
                    sessionStorage.setItem("imgUserLogged", imgUserLogged)
                    sessionStorage.setItem("idUserLogged", idUserLogged)
                    sessionStorage.setItem("moneyLogged", moneyLogged)
                    sessionStorage.setItem("isAdmin", isAdmin)
                    sessionStorage.setItem("fechaLogged", fechaLogged)
                    sessionStorage.setItem("correoLogged", correoLogged)

                    cargarDatos()
                } else {
                    $("#alertas .toast-body").html("¡Datos erroneos!")
                    $('#alertas').toast('show')
                }
            },
            error: function () {
                console.log('Error al cargar el JSON');
            }
        });
    })

    //funciones de registro.html

    //añade la vuelta atrás al botón para ir al menú inicial de login si no se quiere registrar
    $('body').on('click', ".botonIndex", function() {
        irAHome()
    })

    //al clicar en el boton de registrar cuenta, tomo los datos de los campos del formulario y los paso por el filtro de validarRegistro
    $("body").on('click', ".registrarCuenta", function () {
        let username = $("#usernameRegistro").val()
        let password = $("#passwordRegistro").val()
        let correo = $("#correoRegistro").val()
        let nombre = $("#nombreRegistro").val()
        let avatar = $(".seleccionado").attr("src")

        let todoCorrecto = validarRegistro(username, password, correo, nombre, avatar)
        if (todoCorrecto == true) {
            //si se pasa el filtro sin errores, tomo la fecha y llamo a comprobarUser con todos los datos
            let fecha = getFechaActual()
            comprobarUser(username, password, correo, nombre, fecha, avatar)
        }
    })

    //Funcion de boton seleccionCompi.html
    //al clicar en el boton de comenzar la aventura, se revisará si hay un starter seleccionado
    //y si tiene un nombre, y se procederá al registro si es así
    $('body').on('click', ".registrarCompi", function() {
        let cardSelected = $(".seleccionadoSt")
        let fallos = $(".fallosRegistroCompi")
        fallos.empty()//limpiamos los mensajes de error anteriores si hay
        //alert(cardSelected.find(".idSt").html())
        let idSelected = cardSelected.find(".idSt").html()
        let moteCompi = $("#moteCompiInput").val()

        let algunFallo = false //si algo falla no se procederá con el registro
        //alert(idSelected + ", " + moteCompi) //si no tiene nada seleccionado, lanza undefined en la id
        if (idSelected === undefined || idSelected == "" || idSelected === NaN) {
            fallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* ¡Tienes que seleccionar un compañero! Clica sobre el que quieras.</span>")
            algunFallo = true
        }
        
        if (moteCompi == "") {
            fallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* Dale un nombre a tu compañero.</span>")
            algunFallo = true
        }

        //si no hay fallos...
        if (algunFallo == false) {
            registrarCompi(idSelected, moteCompi)
        }
    })

    //Funcion botones batalla.html
    $('body').on('click', ".atacarBt", function() {
        lanzarAtaqueCompi()
    })
    $('body').on('click', ".huirBt", function() {
        $("#resultadoHuir .toast-body").html("Has huido.")
        $('#resultadoHuir').toast('show')
        irAJuego()
    })

    //funciones botones juego.html
    $('body').on('click', ".irABatalla", function() {
        $.ajax({
        
        url: 'html/batalla.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
            sessionStorage.setItem("enId", "")
            sessionStorage.setItem("enNombre", "")
            sessionStorage.setItem("enHpActual", "")
            sessionStorage.setItem("enHpMax", "")
            sessionStorage.setItem("enAtk", "")
            sessionStorage.setItem("enNivel", "")
            sessionStorage.setItem("enExp", "")
            sessionStorage.setItem("enMoney", "")
            sessionStorage.setItem("enImg", "")
            $("#batalla").removeClass("batalla1")
            $("#batalla").removeClass("batalla2")
            $("#batalla").removeClass("batalla3")
            $("#batalla").removeClass("batalla4")
            $(".plataforma").attr("src", "")

            prepararCampoBatalla()
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
    })

    //funciones de objetos y tienda
    $('body').on('click', ".irATienda", function() {
        $.ajax({
        url: 'html/tienda.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
            cargarItemsTienda()
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
        });
    })

    //al pulsar el botón de comprar item...
    $('body').on('click', ".comprarItem", function() {
        $(this).parent().find(".comprarItem").prop("disabled", true)
        let idItem = parseInt($(this).parent().parent().find(".idItem").html())
        let nombreItem = $(this).parent().parent().find(".nombreItem").html()
        let precio = parseInt($(this).parent().parent().find(".precioItem").html())
        let moneyActual = parseInt(sessionStorage.getItem("moneyLogged"))
        let idUser = parseInt(sessionStorage.getItem("idUserLogged"))
        if (moneyActual >= precio) {
            quitarMoney(precio)
            aumentarItem(idItem, idUser, nombreItem)
        } else {
            $("#alertas .toast-body").html("¡No tienes suficiente dinero!")
            $('#alertas').toast('show')
        }
        setTimeout(() => $(this).parent().find(".comprarItem").prop("disabled", false), 1000)
    })

    //al pulsar el boton de usar item...
    $('body').on('click', ".usarItem", function() {
        $(this).parent().parent().find(".usarItem").prop("disabled", true)
        let idItem = parseInt($(this).parent().parent().find(".idItem").html())
        let idUser = parseInt(sessionStorage.getItem("idUserLogged"))
        let cantidad = parseInt($(this).parent().parent().find(".cantidadItem").html())
        let efecto = $(this).parent().parent().find(".efectoItem").html()
        if (cantidad >= 1) {
            reduceItem(idItem, idUser)
            efectoObjeto(efecto)
            setTimeout(() => loadCantidadItemInventario(idItem, idUser), 100)
        }
        setTimeout(() => $(this).parent().parent().find(".usarItem").prop("disabled", false), 1000)
    })

    //añado las funciones a los botones del menú admin
    $('body').on('click', ".add1k", function() {
        addMoney(1000)
    })
    $('body').on('click', ".add10k", function() {
        addMoney(10000)
    })
    $('body').on('click', ".quitar1k", function() {
        quitarMoney(1000)
    })
    $('body').on('click', ".quitar10k", function() {
        quitarMoney(10000)
    })
    $('body').on('click', ".curarFull", function() {
        healFull()
    })

    //si clico en cerrar sesión, limpia todas las variables de sesión y vuelve al estado inicial sin imagenes de usuario ni sus datos
    $('body').on('click', ".cerrarSesion", function() {
        sessionStorage.clear()

        $(".loginConFoto").addClass("d-none")
        $(".loginBoton").removeClass("d-none").addClass("d-block")
        $(".footerAvatar").attr("src", "")
        $(".footerCompi").attr("src", "")
        $(".moneyLogged").parent().removeClass("d-block").addClass("d-none")
        $(".irAPerfil").removeClass("d-block").addClass("d-none")
        $(".irAAdminMenu").removeClass("d-block").addClass("d-none")
        irAHome()
    })
})

//CARGA DE DATOS------------------------
//función que situa todos los datos del usuario, su imagen, nombre, y dinero
function cargarDatos() {
    $(".nombreUsuario").html(sessionStorage.getItem("nombreUserLogged"))
    $(".fotoPerfil").attr("src", sessionStorage.getItem("imgUserLogged"))
    $(".footerAvatar").attr("src", sessionStorage.getItem("imgUserLogged"))
    $(".footerCompi").attr("src", sessionStorage.getItem("imgFullCompiLogged"))
    $(".moneyLogged").html(sessionStorage.getItem("moneyLogged"))
    $(".moneyLogged").parent().removeClass("d-none").addClass("d-block")

    $(".loginBoton").addClass("d-none")
    $(".loginConFoto").removeClass("d-none").addClass("d-block")

    //si es admin, muestro el botón para acceder al menú de admin
    if (sessionStorage.getItem("isAdmin") == "1") {
        $(".irAAdminMenu").removeClass("d-none").addClass("d-block")
    }

    getIdCompi()
}

//funcion que consigue y guarda todos los datos del compi si lo tiene y manda a cargar los datos de su raza
//si no tiene compi, se redirecciona al usuario al registro de compi
function getIdCompi() {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getCompiDB": true,
            "idCuenta": sessionStorage.getItem("idUserLogged")
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length > 0) {
                $.each(datos, function (index, compi) {
                    idCompiLogged = compi.id_compi;
                    idRazaCompiLogged = compi.id_raza;
                    moteCompiLogged = compi.mote;
                    nivelCompiLogged = compi.nivel;
                    expCompiLogged = compi.exp;
                    expNextCompiLogged = compi.exp_next;
                    hpActualCompiLogged = compi.hp_actual;
                    hpMaxCompiLogged = compi.hp_max;
                    atkCompiLogged = compi.atk;
                });
                //me guardo todos los datos del compañero para poder trabajar con ellos y tenerlos a facil acceso
                sessionStorage.setItem("idCompiLogged", idCompiLogged)
                sessionStorage.setItem("idRazaCompiLogged", idRazaCompiLogged)
                sessionStorage.setItem("moteCompiLogged", moteCompiLogged)
                sessionStorage.setItem("nivelCompiLogged", nivelCompiLogged)
                sessionStorage.setItem("expCompiLogged", expCompiLogged)
                sessionStorage.setItem("expNextCompiLogged", expNextCompiLogged)
                sessionStorage.setItem("hpActualCompiLogged", hpActualCompiLogged)
                sessionStorage.setItem("hpMaxCompiLogged", hpMaxCompiLogged)
                sessionStorage.setItem("atkCompiLogged", atkCompiLogged)

                getDatosRazaCompi()
            } else {
                irASeleccionarCompi()
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion que obtiene todos los datos de la raza que es actualmente el compi y los guarda
//al terminar manda al juego, ya que ha cargado todos los datos satisfactoriamente
function getDatosRazaCompi() {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getDatosRazaCompiDB": true,
            "idRaza": sessionStorage.getItem("idRazaCompiLogged")
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length > 0) {
                
                $.each(datos, function (index, starter) {
                    nombreRazaCompiLogged = starter.nombre;
                    hpOnLvlCompiLogged = starter.hp_onlvl;
                    atkOnLvlCompiLogged = starter.atk_onlvl;
                    evoLvlCompiLogged = starter.evolucion_lvl;
                    evoIdCompiLogged = starter.evolucion_id;
                    imgCompiLogged = starter.ruta_img;
                    imgFullCompiLogged = starter.ruta_img_fullbody;
                    descripcionCompiLogged = starter.descripcion;
                });
                //me guardo todos los datos de la raza del compañero para poder trabajar con ellos y tenerlos a facil acceso
                sessionStorage.setItem("nombreRazaCompiLogged", nombreRazaCompiLogged)
                sessionStorage.setItem("hpOnLvlCompiLogged", hpOnLvlCompiLogged)
                sessionStorage.setItem("atkOnLvlCompiLogged", atkOnLvlCompiLogged)
                sessionStorage.setItem("evoLvlCompiLogged", evoLvlCompiLogged)
                sessionStorage.setItem("evoIdCompiLogged", evoIdCompiLogged)
                sessionStorage.setItem("imgCompiLogged", imgCompiLogged)
                sessionStorage.setItem("imgFullCompiLogged", imgFullCompiLogged)
                sessionStorage.setItem("descripcionCompiLogged", descripcionCompiLogged)
                
                //añado visibilidad al botón que muestra el perfil y para ir al menú principal del juego ahora que los datos necesarios están completamente cargados
                $(".irAPerfil").removeClass("d-none").addClass("d-block")
                $(".irAMenu").removeClass("d-none").addClass("d-block")
                //añado al compi al footer para que te acompañe visualmente :)
                $(".footerCompi").attr("src", sessionStorage.getItem("imgFullCompiLogged"))

                //cargo los objetos del inventario que pueda tener la cuenta
                cargarItemsCuenta()
                //mando al juego
                irAJuego()
            } else {
                console.log("Algo anda mal")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//función que carga los items en la tienda
function cargarItemsTienda() {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "cargarItemsDB": true
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta)
            if (datos.length > 0) {
                let ids = []
                $.each(datos, function (index, item) {
                    ids.push(item.id_item)
                });
                ids.sort()
                for (let i = 0; i < ids.length; i++) {
                    setTimeout(() => generarDivTienda(ids[i]), (i*100))
                }
            } else {
                console.log('No IDs found')
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//función que carga los items del inventario asociado a la cuenta
function cargarItemsCuenta() {
    $("#inventarioBody").html()
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "cargarItemsDB": true
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta)
            if (datos.length > 0) {
                let ids = []
                $.each(datos, function (index, item) {
                    ids.push(item.id_item)
                });
                ids.sort()
                for (let i = 0; i < ids.length; i++) {
                    let idActual = parseInt(ids[i])
                    setTimeout(() => generarDivCuenta(idActual), (i*100))    
                }
            } else {
                console.log('No IDs found')
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });

}

//FUNCIONES DE REDIRECCION-----------------------------
//esta funcion te redirecciona al menú principal del juego
function irAJuego() {
    $.ajax({
        url: 'html/juego.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
    });
}

//esta función te redirecciona al menú home, al iniciar la página si no tienes datos de login o al salir del registro, por ejemplo
function irAHome() {
    $.ajax({
        url: 'html/avhome.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
    });
}

//esta función redirecciona a la selección de compi cuando no has terminado tu registro y aun no tienes compi
function irASeleccionarCompi() {
    $.ajax({
        url: 'html/seleccionCompi.html',
        type: 'GET',
        success: function (respuesta) {
            $(".contenido").html(respuesta)
        },
        error: function () {
        console.log('Error al cargar el JSON');
        }
    });
}

//FUNCIONES DE BATALLA---------------------------------------------------------
//funcion preparar campo de batalla en batalla.html
function prepararCampoBatalla() {
    //saco un número random para tener probabilidades y que los enemigos más flojos tengan más % de aparición
    //guardo diferentes rutas para crear el escenario y guardo el id generado tambien para cargar los datos del enemigo
    let randomId = randomNumber(1,100);
    let chosenId
    let biomaId

    if (randomId > 0 && randomId <= 25) {
            chosenId = 1 //Rattata con un 25% de prob
            biomaId = 1//bosque
    } else if (randomId > 25 && randomId <= 50) {
            chosenId = 2 //Snorunt con un 25% de prob
            biomaId = 4//Area de hielo
    } else if (randomId > 50 && randomId <= 70) {
            chosenId = 3 //Ursaring con un 20% de prob
            biomaId = 2//cueva
    } else if (randomId > 70 && randomId <= 85) {
            chosenId = 4 //Snorlax con un 15% de prob
            biomaId = 1//bosque
    } else if (randomId > 85 && randomId <= 95) {
            chosenId = 5 //Sharpedo con un 10% de prob
            biomaId = 3//mar
    } else if (randomId > 95 && randomId <= 100) {
            chosenId = 6 //Chansey con un 5% de prob
            biomaId = 2//cueva
    }
    //alert("bioma: " + biomaId + " | chosenId: " + chosenId)
    let texto1 = "batalla" + biomaId
    $("#batalla").addClass(texto1)
    let texto2 = "./img/plataforma" + biomaId + ".png"
    $(".plataforma").attr("src", texto2)

    putCompiDatos()
    getEnemy(chosenId)
}

//pone todos los datos del compañero en pantalla
function putCompiDatos() {
    $(".imgCompiBt").attr("src", sessionStorage.getItem("imgFullCompiLogged"))
    $(".statsCompiNombre").html(sessionStorage.getItem("moteCompiLogged"))
    $(".statsCompiNivel").html(sessionStorage.getItem("nivelCompiLogged"))
    $(".statsCompiHpActual").html(sessionStorage.getItem("hpActualCompiLogged"))
    $(".statsCompiHpMax").html(sessionStorage.getItem("hpMaxCompiLogged"))
    $(".statsCompiExpActual").html(sessionStorage.getItem("expCompiLogged"))
    $(".statsCompiExpNext").html(sessionStorage.getItem("expNextCompiLogged"))

    setBarraVidaCompi(sessionStorage.getItem("hpActualCompiLogged"), sessionStorage.getItem("hpMaxCompiLogged"))
    setBarraExpCompi(sessionStorage.getItem("expCompiLogged"), sessionStorage.getItem("expNextCompiLogged"))
}

//consigo todos los datos del enemigo elegido por probabilidad
function getEnemy(chosenId) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getEnemyDB": true,
            "idEnemigo": chosenId
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length > 0) {
                $.each(datos, function (index, enemigo) {
                    nombreEn = enemigo.nombre;
                    hpActualEn = parseInt(enemigo.hp_max);
                    hpMaxEn = parseInt(enemigo.hp_max);
                    atkEn = parseInt(enemigo.atk);
                    nivelEn = parseInt(enemigo.nivel);
                    expEn = parseInt(enemigo.exp_yield);
                    moneyEn = parseInt(enemigo.money_yield);
                    imgEn = enemigo.ruta_img;
                });
                //guardo los datos del enemigo
                sessionStorage.setItem("enId", chosenId)
                sessionStorage.setItem("enNombre", nombreEn)
                sessionStorage.setItem("enHpActual", hpActualEn)
                sessionStorage.setItem("enHpMax", hpMaxEn)
                sessionStorage.setItem("enAtk", atkEn)
                sessionStorage.setItem("enNivel", nivelEn)
                sessionStorage.setItem("enExp", expEn)
                sessionStorage.setItem("enMoney", moneyEn)
                sessionStorage.setItem("enImg", imgEn)

                $(".imgEneBt").attr("src", imgEn)
                $(".statsEneNombre").html(nombreEn)
                $(".statsEneNivel").html(nivelEn)
                $(".statsEneHpActual").html(hpActualEn)
                $(".statsEneHpMax").html(hpMaxEn)

                setBarraVidaEnemigo(hpActualEn, hpMaxEn)
            } else {
                console.log("Algo anda mal cargando enemigo")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion que controla la barra de vida del compañero para actualizaciones
function setBarraVidaCompi(hpActual, hpMax) {
    let porcentaje = getPorcentaje(hpActual, hpMax)

    let size = porcentaje + "%"
    $(".statsCompiBarraHpVerde").css("width", size)
}

//funcion que controla la barra de vida del enemigo
function setBarraVidaEnemigo(hpActual, hpMax) {
    let porcentaje = getPorcentaje(hpActual, hpMax)

    let size = porcentaje + "%"
    $(".statsEneBarraHpVerde").css("width", size)
}

//funcion que controla la barra de experiencia del compañero
function setBarraExpCompi(expActual, expNext) {
    let porcentaje = getPorcentaje(expActual, expNext)

    let size = porcentaje + "%"
    $(".barraExpActual").css("width", size)
}

//funcion llamada al darle al boton de atacar, lanza un ataque y, si el enemigo no muere, este contraataca.
function lanzarAtaqueCompi() {
    //desactivo el boton de ataque mientras ocurre la acción
    $(".atacarBt").prop("disabled", true)
    $(".inventarioBt").prop("disabled", true)
    $(".huirBt").prop("disabled", true)
    setTimeout(() => $(".atacarBt").prop("disabled", false), 3000)
    setTimeout(() => $(".inventarioBt").prop("disabled", false), 3000)
    setTimeout(() => $(".huirBt").prop("disabled", false), 3000)

    let atkCompi = parseInt(sessionStorage.getItem("atkCompiLogged"))
    let hpEnemigo = parseInt(sessionStorage.getItem("enHpActual"))
    
    $(".imgCompiBt").css("animation-name", "ataquecompi")
    setTimeout(() => $(".imgCompiBt").css("animation-name", ""), 1000)

    $(".imgEneBt").css("animation-name", "enemigorecibeataque")
    setTimeout(() => $(".imgEneBt").css("animation-name", ""), 1000)
    
    let nuevoHpEnemigo
    if (atkCompi >= hpEnemigo) {
        nuevoHpEnemigo = 0
    } else {
        nuevoHpEnemigo = hpEnemigo - atkCompi
    }
    sessionStorage.setItem("enHpActual", nuevoHpEnemigo)
    setTimeout(() => $(".statsEneHpActual").html(sessionStorage.getItem("enHpActual")), 500)
    setBarraVidaEnemigo(sessionStorage.getItem("enHpActual"), sessionStorage.getItem("enHpMax"))
    
    if (sessionStorage.getItem("enHpActual") == "0") {
        setTimeout(() => $(".imgEneBt").css("animation-name", "enemigomuere"), 1000)
        setTimeout(() => $(".imgEneBt").css("display", "none"), 2000)
        setTimeout(() => ganas(), 2000)
    } else {
        setTimeout(() => lanzarAtaqueEnemigo(), 1000)
    }
}

//contraataque del enemigo
function lanzarAtaqueEnemigo() {
    let atkEnemigo = parseInt(sessionStorage.getItem("enAtk"))
    let hpCompi = parseInt(sessionStorage.getItem("hpActualCompiLogged"))

    $(".imgEneBt").css("animation-name", "ataqueenemigo")
    setTimeout(() => $(".imgEneBt").css("animation-name", ""), 1000)

    $(".imgCompiBt").css("animation-name", "compirecibeataque")
    setTimeout(() => $(".imgCompiBt").css("animation-name", ""), 1000)

    let nuevoHpCompi
    if (atkEnemigo >= hpCompi) {
        nuevoHpCompi = 0
    } else {
        nuevoHpCompi = hpCompi - atkEnemigo
    }

    setTimeout(() => $(".statsCompiHpActual").html(nuevoHpCompi), 500)
    setBarraVidaCompi(nuevoHpCompi, sessionStorage.getItem("hpMaxCompiLogged"))
    
    if (nuevoHpCompi == 0) {
        setTimeout(() => $(".imgCompiBt").css("animation-name", "compimuere"), 1000)
        setTimeout(() => $(".imgCompiBt").css("display", "none"), 2000)
        setTimeout(() => pierdes(), 2000)
    } else {
        updateHpActual(nuevoHpCompi)
    }
}

//funcion que se ejecuta si finaliza el combate contigo ganando al enemigo
function ganas() {
    $("#resultadoGanas .toast-body").html("¡Has ganado! Recibes " + sessionStorage.getItem("enExp") + " exp y " + sessionStorage.getItem("enMoney") + "💰.")
    $('#resultadoGanas').toast('show')

    addMoney(sessionStorage.getItem("enMoney"))
    updateCompi()
    setTimeout(() => irAJuego(), 1000)
}

//funcion que se ejecuta si finaliza el combate contigo perdiendo ante el enemigo
function pierdes() {
    $("#resultadoPierdes .toast-body").html("Has perdido... Has huido antes de que " + sessionStorage.getItem("moteCompiLogged") + " sufriese daños más graves.")
    $('#resultadoPierdes').toast('show')

    updateHpActual(1)
    setTimeout(() => irAJuego(), 1000)
}

//funcion que actualiza al compi cuando termina la pelea
function updateCompi() {
    //variables modificables si se sube de nivel
    let id_compi = parseInt(sessionStorage.getItem("idCompiLogged"))
    let id_raza = parseInt(sessionStorage.getItem("idRazaCompiLogged"))
    let nivel = parseInt(sessionStorage.getItem("nivelCompiLogged"))
    let exp = parseInt(sessionStorage.getItem("expCompiLogged"))
    let exp_next = parseInt(sessionStorage.getItem("expNextCompiLogged"))
    let hp_actual = parseInt(sessionStorage.getItem("hpActualCompiLogged"))
    let hp_max = parseInt(sessionStorage.getItem("hpMaxCompiLogged"))
    let atk = parseInt(sessionStorage.getItem("atkCompiLogged"))
    
    //calculo la exp ganada. Si se está a nivel 5, que es el máximo de esta prueba de concepto, se deja de ganar experiencia y queda a 0
    let expGanada
    if (nivel == 5) {
        expGanada = 0
        exp = 0
    } else {
        expGanada = parseInt(sessionStorage.getItem("enExp"))
    }
    let levelUp = false
    

    exp = exp + expGanada
    if (exp >= exp_next) {
        levelUp = true
    }

    if (levelUp == true) {
        //si se sube de nivel, se suma 1 al nivel, se resta la exp necesaria para subir de nivel y se deja el resto
        //y se aumenta en 20 la exp necesaria para volver a subir de nivel
        nivel = nivel + 1
        exp = exp - exp_next
        exp_next = exp_next + 20

        if (nivel == parseInt(sessionStorage.getItem("evoLvlCompiLogged"))) {
            //EVOLUCIONA
            evolucionar(id_compi, nivel, exp, exp_next, hp_actual, hp_max)
        } else {
            //SOLO SUBE DE NIVEL
            //si solo sube de nivel, tomo el valor de ataque y vidas a aumentar y se lo añado a los actuales
            hp_actual = hp_actual + parseInt(sessionStorage.getItem("hpOnLvlCompiLogged"))
            hp_max = hp_max + parseInt(sessionStorage.getItem("hpOnLvlCompiLogged"))
            atk = atk + parseInt(sessionStorage.getItem("atkOnLvlCompiLogged"))
            lanzarUpdateCompi(id_compi, id_raza, nivel, exp, exp_next, hp_actual, hp_max, atk)
        }
        $(".statsCompiNivel").html(nivel)
    } else {
        lanzarUpdateCompi(id_compi, id_raza, nivel, exp, exp_next, hp_actual, hp_max, atk)
    }

    $(".statsCompiExpActual").html(exp)
    $(".statsCompiExpNext").html(exp_next)
    setBarraExpCompi(exp, exp_next)
}

//funcion para la evolución del compi. Algunos compis evolucionan al llegar a cierto nivel,
//cambiando de raza y recalculando sus stats para el nivel de la nueva raza
function evolucionar(id_compi, nivel, exp, exp_next, hp_actual, hp_max) {
    let idRazaNueva = parseInt(sessionStorage.getItem("evoIdCompiLogged"))
    let hpFaltante = hp_max - hp_actual
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getDatosRazaCompiDB": true,
            "idRaza": idRazaNueva
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length > 0) {
                $.each(datos, function (index, starter) {
                    nombreRazaNuevo = starter.nombre;
                    hpOnLvlNuevo = starter.hp_onlvl;
                    hpBaseNuevo = starter.hp_base;
                    atkOnLvlNuevo = starter.atk_onlvl;
                    atkBaseNuevo = starter.atk_base;
                    evoLvlNuevo = starter.evolucion_lvl;
                    evoIdNuevo = starter.evolucion_id;
                    imgNuevo = starter.ruta_img;
                    imgFullNuevo = starter.ruta_img_fullbody;
                    descripcionNuevo = starter.descripcion;
                });
                //reemplazo los datos de raza guardados con la nueva raza
                sessionStorage.setItem("nombreRazaCompiLogged", nombreRazaNuevo)
                sessionStorage.setItem("hpOnLvlCompiLogged", hpOnLvlNuevo)
                sessionStorage.setItem("atkOnLvlCompiLogged", atkOnLvlNuevo)
                sessionStorage.setItem("evoLvlCompiLogged", evoLvlNuevo)
                sessionStorage.setItem("evoIdCompiLogged", evoIdNuevo)
                sessionStorage.setItem("imgCompiLogged", imgNuevo)
                sessionStorage.setItem("imgFullCompiLogged", imgFullNuevo)
                sessionStorage.setItem("descripcionCompiLogged", descripcionNuevo)

                let nuevoAtk = parseInt(atkBaseNuevo)
                let nuevoHpMax = parseInt(hpBaseNuevo)

                for (let i = 1; i < nivel; i++) {
                    nuevoAtk = nuevoAtk + parseInt(atkOnLvlNuevo)
                    nuevoHpMax = nuevoHpMax + parseInt(hpOnLvlNuevo)
                }
                let nuevoHpActual = nuevoHpMax - hpFaltante

                setTimeout(() => $("#evolucion .toast-body").html("¡Felicidades! Tu " + sessionStorage.getItem("moteCompiLogged") + " ha evolucionado. Ahora es un " + nombreRazaNuevo + "."), 2000)
                setTimeout(() => $('#evolucion').toast('show'), 2000)

                //reemplazo la foto del compi con su nueva raza
                $(".footerCompi").attr("src", sessionStorage.getItem("imgFullCompiLogged"))

                lanzarUpdateCompi(id_compi, idRazaNueva, nivel, exp, exp_next, nuevoHpActual, nuevoHpMax, nuevoAtk)
            } else {
                console.log("Algo anda mal")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion para lanzar una update al terminar un combate, subiendo de nivel o no.
function lanzarUpdateCompi(id_compi, id_raza, nivel, exp, exp_next, hp_actual, hp_max, atk) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "updateCompiDB": true,
            "id_compi": id_compi,
            "id_raza": id_raza,
            "nivel": nivel,
            "exp": exp,
            "exp_next": exp_next,
            "hp_actual": hp_actual,
            "hp_max": hp_max,
            "atk": atk
        },
        success: function (respuesta) {
            //alert(respuesta)
            if (respuesta != "0") {
                sessionStorage.setItem("idRazaCompiLogged", id_raza)
                sessionStorage.setItem("nivelCompiLogged", nivel)
                sessionStorage.setItem("expCompiLogged", exp)
                sessionStorage.setItem("expNextCompiLogged", exp_next)
                sessionStorage.setItem("hpActualCompiLogged", hp_actual)
                sessionStorage.setItem("hpMaxCompiLogged", hp_max)
                sessionStorage.setItem("atkCompiLogged", atk)
            } else {
                console.log("error updateando compi")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//OBJETOS-----------------------------------------------
//funcion principal para llamar a otras funciones recibidas como parámetro por objeto
function efectoObjeto(nombreFuncion) {
    if (typeof window[nombreFuncion] === 'function') {
        window[nombreFuncion]();
    } else {
        console.log(`${nombreFuncion} no es una funcion.`);
    }
}

//funcion al usar una pocion, vease, curar 20 puntos de vida
function pocion() {
    heal(20)
}

//funcion que recibe la cantidad de vida a curar (tras usar una poción que cure un numero de puntos de vida exacto)
function heal(cantidad) {
    let vidaMax = parseInt(sessionStorage.getItem("hpMaxCompiLogged"))
    let vidaActual = parseInt(sessionStorage.getItem("hpActualCompiLogged"))
    let nuevoHpActual = vidaActual + parseInt(cantidad)

    if (nuevoHpActual > vidaMax) {
        nuevoHpActual = vidaMax
    }

    //setTimeout(() => setBarraVidaCompi(nuevoHpActual, vidaMax), 1000)
    updateHpActual(nuevoHpActual)
}

//funcion que cura la vida a tope (tras usar una poción máxima)
function healFull() {
    let nuevoHpActual = parseInt(sessionStorage.getItem("hpMaxCompiLogged"))

    //setTimeout(() => setBarraVidaCompi(nuevoHpActual, nuevoHpActual), 1000)
    updateHpActual(nuevoHpActual)
}

//funcion que genera los slots de item en el inventario
function generarDivCuenta(id) {
    id = parseInt(id)
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getItemDB": true,
            "idItem": id
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length > 0) {
                $.each(datos, function (index, item) {
                    nombre = item.nombre;
                    efecto = item.efecto;
                    precio = parseInt(item.precio);
                    img = item.ruta_img;
                    desc = item.descripcion;
                });
                let divInventario = "<div class='itemSlot d-flex align-items-center justify-content-between p-1'>" +
                "<span class='idItem d-none'>" + id + "</span>" + "<span class='efectoItem d-none'>" + efecto + "</span>" +
                "<img src='" + img + "' alt='' class='img-fluid'>" + 
                "<div class='d-flex flex-column p-1'>" +
                "<span class='nombreItem fw-bold'>" + nombre + "</span>" +
                "<span class='descItem bordeSup'>" + desc + "</span></div>" +
                "<span class='cantidadItem px-1 fw-bold bordeItemCantidad'>0</span>" +
                "<div><button class='btn btn-verde d-inline-block usarItem'>Usar</button></div></div>"
                $("#inventarioBody").append(divInventario)
                setTimeout(() => loadCantidadItemInventario(id, sessionStorage.getItem("idUserLogged")), 100)
            } else {
                console.log("Algo anda mal cargando item")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion que genera los slots de items en la tienda
function generarDivTienda(id) {
    id = parseInt(id)
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getItemDB": true,
            "idItem": id
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length > 0) {
                $.each(datos, function (index, item) {
                    nombre = item.nombre;
                    efecto = item.efecto;
                    precio = parseInt(item.precio);
                    img = item.ruta_img;
                    desc = item.descripcion;
                });
                let divTienda = "<div class='itemSlot d-flex align-items-center justify-content-between p-1'>" +
                "<img src='" + img + "' alt='' class='img-fluid'>" + 
                "<div class='d-flex flex-column p-1'>" +
                "<span class='nombreItem'>" + nombre + "</span>" +
                "<span class='descItem'>" + desc + "</span></div>" +
                "<span class='precioItem px-1'>" + precio + "</span><span class='idItem d-none'>" + id + "</span>" +
                "<div><button class='btn btn-amarillo d-inline-block comprarItem'>Comprar</button></div></div>"
                $("#containerTienda").append(divTienda)
            } else {
                console.log("Algo anda mal cargando item tienda")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion para aumentar en 1 el item seleccionado para la cuenta seleccionada
function aumentarItem(idItem, idUser, nombreItem) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "addItemInventarioDB": true,
            "idCuenta": idUser,
            "idItem": idItem
        },
        success: function (respuesta) {
            if (respuesta != "0") {
                $("#toastCompra .toast-body").html("Has comprado 1 " + nombreItem + ".")
                $('#toastCompra').toast('show')

                setTimeout(() => loadCantidadItemInventario(idItem, idUser), 100)
            } else {
                console.log("error comprando item: " + idItem + ", cuentaid: " + idUser + ". Respuesta: " + respuesta)
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion para reducir en uno un item de una cuenta seleccionada, ya que al usarse se resta uno
function reduceItem(idItem, idUser) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "reduceItemInventarioDB": true,
            "idCuenta": idUser,
            "idItem": idItem
        },
        success: function (respuesta) {
            if (respuesta != "0") {
                setTimeout(() => loadCantidadItemInventario(idItem, idUser), 100)
            } else {
                console.log("error usando item: " + idItem + ", cuentaid: " + idUser + ". Respuesta: " + respuesta)
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion para cargar la cantidad de un item de una cuenta
function loadCantidadItemInventario(idItem, idUser) {
    idItem = parseInt(idItem)
    idUser = parseInt(idUser)
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "getCantidadItemDB": true,
            "idCuenta": idUser,
            "idItem": idItem
        },
        success: function (respuesta) {
            let cantidad = parseInt(respuesta)
            if (respuesta != -1) {
                let objetos = $("#inventarioBody .itemSlot")
                let size = objetos.length
                for (let i = 0; i < size; i++) {
                    let objetoActual = objetos.eq(i)
                    if (parseInt(objetoActual.find(".idItem").html()) == idItem) {
                        objetoActual.find(".cantidadItem").html(cantidad)
                        if (parseInt(cantidad) == 0) {
                            //console.log("cantidad es 0? " + cantidad)
                            objetoActual.removeClass("d-block")
                            objetoActual.removeClass("d-none")
                            objetoActual.addClass("d-none")
                        } else {
                            //console.log("cantidad no es 0? " + cantidad)
                            objetoActual.removeClass("d-block")
                            objetoActual.removeClass("d-none")
                            objetoActual.addClass("d-block")
                        }
                    }
                }
            } else {
                //console.log("cantidad es -1? " + respuesta)
                let objetos = $("#inventarioBody .itemSlot")
                let size = objetos.length
                cantidad = 0
                for (let i = 0; i < size; i++) {
                    let objetoActual = objetos.eq(i)
                    if (parseInt(objetoActual.find(".idItem").html()) == idItem) {
                        objetoActual.find(".cantidadItem").html(cantidad)
                        if (parseInt(cantidad) == 0) {
                            //console.log("cantidad es 0? " + cantidad)
                            objetoActual.removeClass("d-block")
                            objetoActual.removeClass("d-none")
                            objetoActual.addClass("d-none")
                        } else {
                            //console.log("cantidad no es 0? " + cantidad)
                            objetoActual.removeClass("d-block")
                            objetoActual.removeClass("d-none")
                            objetoActual.addClass("d-block")
                        }
                    }
                }
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//FUNCIONES UTILES-------------------------------
//funcion que añade dinero a la cuenta
function addMoney(cantidad) {
    let moneyActual = parseInt(sessionStorage.getItem("moneyLogged"))
    let nuevoMoney = moneyActual + parseInt(cantidad)

    updateMoney(nuevoMoney)
}

//funcion que quita dinero de la cuenta
function quitarMoney(cantidad) {
    let moneyActual = parseInt(sessionStorage.getItem("moneyLogged"))
    let aRestar = parseInt(cantidad)

    if (moneyActual < aRestar) {
        console.log("No hay suficiente dinero. No deberías ver este mensaje nunca.")
    } else {
        let nuevoMoney = moneyActual - aRestar
        updateMoney(nuevoMoney)
    }
}

//función para modificar el dinero de la cuenta
function updateMoney(nuevoMoney) {
    //console.log("money")
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "updateMoneyDB": true,
            "idCuenta": sessionStorage.getItem("idUserLogged"),
            "nuevoMoney": nuevoMoney
        },
        success: function (respuesta) {
            if (respuesta != "0") {
                //console.log("nuevo dinero de cuenta: " + nuevoMoney + ".")
                sessionStorage.setItem("moneyLogged", nuevoMoney)

                $(".moneyLogged").html(sessionStorage.getItem("moneyLogged"))
            } else {
                console.log("error dinero")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion para actualizar la vida actual del compi
function updateHpActual(nuevoHpActual) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "updateHpDB": true,
            "idCompi": sessionStorage.getItem("idCompiLogged"),
            "nuevoHp": nuevoHpActual
        },
        success: function (respuesta) {
            if (respuesta != "0") {
                sessionStorage.setItem("hpActualCompiLogged", nuevoHpActual)
                setTimeout(() => $(".statsCompiHpActual").html(nuevoHpActual), 500)
                setBarraVidaCompi(nuevoHpActual, sessionStorage.getItem("hpMaxCompiLogged"))
            } else {
                console.log("error update hp")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//funcion para devolver un numero entre un mínimo dado y un máximo dado, ambos incluidos
function randomNumber(min, max) {
    if (min > max) {
      let temp = max;
      max = min;
      min = temp;
    }
  
    if (min <= 0) {
      return Math.floor(Math.random() * (max + Math.abs(min) + 1)) + min;
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

//funcion para conseguir el porcentaje calculado de una cifra y un máximo (barras de vida, exp)
function getPorcentaje(actual, max) {
    actual = parseInt(actual)
    max = parseInt(max)

    let porciento = (100 * actual) / max
    return Math.ceil(porciento)
}

//FUNCIONES DE REGISTRO.HTML
//Validacion de datos de registro
function validarRegistro(username, password, correo, nombre, avatar) {
    let divFallos = $(".fallosRegistro")//div para mostrar errores
    divFallos.empty()//limpio los mensajes anteriores
    let algunFallo = false//si algo falla no devolverá true

    if (validateEmail(correo) == false) {
        divFallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* El correo no es válido.</span>")
        algunFallo = true
    }

    if (username == "") {
        divFallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* El nombre de usuario no puede estar vacío.</span>")
        algunFallo = true
    } else if (username.indexOf(" ")>=0) {
        divFallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* El nombre de usuario no puede tener espacios.</span>")
        algunFallo = true
    }

    if (password.length < 4) {
        divFallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* La contraseña debe tener 4 carácteres o más.</span>")
        algunFallo = true
    }

    if (avatar == undefined) {
        divFallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* Debes seleccionar un avatar.</span>")
        algunFallo = true
    }

    if (nombre == "") {
        divFallos.append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* Elige un nombre para tu personaje.</span>")
        algunFallo = true
    }

    //si no hay fallos devuelve true
    if (algunFallo == false) {
        return true
    }
    //si ha habido algun fallo, devuelve false y no continua el registro
    return false
}
//función que toma la fecha actual y la manda como string formateado para subirlo a base de datos
function getFechaActual() {
    let fechaObj = new Date()
    let fecha = ""
    fecha = fechaObj.getFullYear() + "-" + (fechaObj.getMonth() + 1) + "-" + fechaObj.getDate()
    return fecha
}

//funcion que hace una validación del email con un regex, asegurandose de que tenga: texto, @, texto, un punto y texto.
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

//funcion para comprobar si el username está en uso en la base de datos
function comprobarUser(username, password, correo, nombre, fecha, avatar) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "comprobarUsernameDB": true,
            "user": username
        },
        success: function (respuesta) {
            var datos = JSON.parse(respuesta);
            if (datos.length == 0) {
                //si no está en uso, creo cuenta
                crearCuenta(username, password, correo, nombre, fecha, avatar)
            } else {
                //si está en uso, añado un fallo al div de fallos
                $(".fallosRegistro").append("<span class='my-1 fw-bold fondoGrisOp bordeFancy3'>* El nombre de usuario ya está en uso</span>")
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

//esta funcion crea cuenta ya habiendo comprobado que todos los datos son validos
function crearCuenta(username, password, correo, nombre, fecha, avatar) {
    $.ajax({
        url: 'php/funciones.php',
        type: 'POST',
        data: {
            "addCuentaDB": true,
            "username": username,
            "password": password,
            "correo": correo,
            "nombre": nombre,
            "fecha_creacion": fecha,
            "avatar": avatar,
            "money": "200",
            "admin": "0"
        },
        success: function (respuesta) {
            if (respuesta != "0") {
                //si se crea, llamo al toast y redirecciono a home para que inicie sesion
                $("#alertas .toast-body").html("Se ha creado tu cuenta! Inicia sesión con tus credenciales.")
                $('#alertas').toast('show')
                irAHome()
            } else {
                $("#alertas .toast-body").html("Ha ocurrido un error al darte de alta.")
                $('#alertas').toast('show')
            }
        },
        error: function () {
            console.log('Error al cargar el JSON');
        }
    });
}

