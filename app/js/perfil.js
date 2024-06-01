$(function(){
    ponerDatosPerfil()
})

function ponerDatosPerfil() {
    //cargo datos de usuario
    $(".perfilImg").attr("src", sessionStorage.getItem("imgUserLogged"))
    $(".perfilNombreJugador").html(sessionStorage.getItem("nombreUserLogged"))
    $(".perfilDinero").html(sessionStorage.getItem("moneyLogged"))
    $(".perfilFecha").html(formatearFecha(sessionStorage.getItem("fechaLogged")))
    $(".perfilUsername").html(sessionStorage.getItem("usernameLogged"))
    $(".perfilCorreo").html(sessionStorage.getItem("correoLogged"))

    //cargo datos de compi
    $(".perfilImgCompi").attr("src", sessionStorage.getItem("imgFullCompiLogged"))
    $(".perfilMote").html(sessionStorage.getItem("moteCompiLogged"))
    $(".perfilRaza").html(sessionStorage.getItem("nombreRazaCompiLogged"))
    $(".perfilImgRaza").attr("src", sessionStorage.getItem("imgCompiLogged"))
    $(".perfilNivel").html(sessionStorage.getItem("nivelCompiLogged"))
    $(".perfilExpActu").html(sessionStorage.getItem("expCompiLogged"))
    $(".perfilExpNext").html(sessionStorage.getItem("expNextCompiLogged"))
    $(".perfilHpActu").html(sessionStorage.getItem("hpActualCompiLogged"))
    $(".perfilHpMax").html(sessionStorage.getItem("hpMaxCompiLogged"))
    $(".perfilAtaque").html(sessionStorage.getItem("atkCompiLogged"))
    $(".perfilDescripcion").html(sessionStorage.getItem("descripcionCompiLogged"))
}

function formatearFecha(fecha) {
    let array = fecha.split("-")
    let newFecha = array[2] + "-" + array[1] + "-" + array[0]
    return newFecha
}