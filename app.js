//chamamos a função gerarNumeroAleatorio
let listaNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//função com parametros:
function exibirTextoNaTela(tag, texto){
    //aqui vamos interligar o JavaScript com o HTML
    //estamos colocando textos pelo JavaScript
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    //responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exbibirMensagemInicial(){
    //passando os parâmetros para a função
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 100');
}

exbibirMensagemInicial();

//no clique do botao chutar tem uma funcionalidade, que no nosso documento html tem o exato nome 'verificarChute()', com isso podemos criar uma função 
function verificarChute(){
    //aqui estamos pegando apenas o valor que é colocado no input
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou');
        //vendo se a palavra tentativa será no plural ou singular
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        //a mensagem que será enviada sobre as tentativas
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p', mensagemTentativas)
        //desabilitando o atributo disable do botão 'Novo Jogo', com isso, vamos ativar o botão
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if (chute > numeroSecreto){
            exibirTextoNaTela('h1', 'Tente novamente');
            exibirTextoNaTela('p', 'O número secreto é menor que o seu chute');
        } else {
            exibirTextoNaTela('h1', 'Tente novamente');
            exibirTextoNaTela('p', 'O número secreto é maior que o seu chute');
        }

        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLita = listaNumerosSorteados.length;

    //limpando a lista quando ela chegar ao seu limite
    if(quantidadeElementosLita == numeroLimite){
        listaNumerosSorteados = [];
    }

    //verificando se o número já foi sorteado e está na lista
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        //adicionando o número sorteado na nossa lista
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    //deixando o campo vazio
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exbibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}