$(function(){
    //al clicar en uno de los avatares, queda seleccionado
    $("#registro").on('click', ".avatar", function () {
        let avatares = $(".avatar")

        for (let i = 0; i < avatares.length; i++) {
            avatares.eq(i).removeClass("seleccionado")
        }

        $(this).addClass("seleccionado")
    })
})