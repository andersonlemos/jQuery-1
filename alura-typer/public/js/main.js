var campo = $('.campo-digitacao');
var tempoInicial = $('#tempo-digitacao').text();

//$(document).ready(function(){});
$(function () {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializarMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
})

function atualizaTamanhoFrase() {
    var frase = $('.frase').text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on('input', function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;

        $("#contador-palavras").text(qtdPalavras);

        var conteudoSemEspaco = conteudo.replace(/\s+/g, '');

        var qtdCaracteres = conteudoSemEspaco.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}

function inicializaCronometro() {
    campo.one('focus', function () {
        var tempoRestante = $('#tempo-digitacao').text();
        var cronometroID = setInterval(
            function () {
                tempoRestante--;
                $('#tempo-digitacao').text(tempoRestante);
                if (tempoRestante < 1) {
                    campo.attr("disabled", true);
                    clearInterval(cronometroID);
                    campo.toogleClass('campo-desativado');
                }
            }, 1000);

    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");

    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);

    inicializaCronometro();

    campo.toggleClass("campo-desativado");

    campo.removeClass("borda-vermelha"); //novo
    campo.removeClass("borda-verde"); //novo
}

function inicializarMarcadores() {
    var frase = $('.frase').text();
    campo.on('input', function () {
        var digitado = campo.val();
        var digitouCorreto = frase.startsWith(digitado);
        if( frase.startsWith(digitado)) {
            campo.addClass("borda-verde");
           } else {
            campo.addClass("borda-vermelha");
           }
    });
}