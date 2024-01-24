const form = document.querySelector('form');
form.addEventListener('submit', evento => {
    evento.preventDefault();

    validaNome();
    validaCpf();
    validaIdadeMinima();
    validaApenasNumerosIdade();

    listaAreaCampoForm[0].firstElementChild.addEventListener('keyup', validaNome);
    listaAreaCampoForm[1].firstElementChild.addEventListener('keyup', validaCpf);
    listaAreaCampoForm[2].firstElementChild.addEventListener('keyup', validaIdadeMinima);
    listaAreaCampoForm[2].firstElementChild.addEventListener('keyup', validaApenasNumerosIdade);

    const validacoes = [validaNome(), validaCpf(), validaIdadeMinima(), validaApenasNumerosIdade()];
    const formularioValido = validacoes.every(valido => valido);

    formularioValido ? (mostrarDados(areaCampoForm), mostrarDialog(evento)) : null;
});

const listaAreaCampoForm = document.querySelectorAll('.area-campoForm');
const areaCampoForm = document.querySelector('.area-campoForm');

function validaNome() {
    const nomeRegex = /[^a-zA-Z \u0080-\u024F]/g;
    const nome = areaCampoForm.firstElementChild.value;
    const outrosCaracteres = nome.match(nomeRegex);

    if(outrosCaracteres) {
        areaCampoForm.lastElementChild.classList.add('invalido');
        areaCampoForm.firstElementChild.classList.add('tremer');
        setTimeout(() => {
            areaCampoForm.firstElementChild.classList.remove('tremer');
        }, 300);
        return false;
    } else {
        areaCampoForm.lastElementChild.classList.remove('invalido');
        return true;
    }
}

function validaCpf() {
    const cpfRegex = /\D/g;
    const cpfValor = areaCampoForm.nextElementSibling.firstElementChild.value;
    const apenasNumeros = cpfValor.replace(cpfRegex, '');

    if(apenasNumeros.length == 11) {
        areaCampoForm.nextElementSibling.lastElementChild.classList.remove('invalido');
        return true;
    } else {
        areaCampoForm.nextElementSibling.lastElementChild.classList.add('invalido');
        areaCampoForm.nextElementSibling.firstElementChild.classList.add('tremer');
        setTimeout(() => {
            areaCampoForm.nextElementSibling.firstElementChild.classList.remove('tremer');
        }, 300);
        return false;
    }
}

function validaIdadeMinima() {
    const idade = Number(listaAreaCampoForm[2].firstElementChild.value);

    if(idade > 17 && idade <= 100) {
        listaAreaCampoForm[2].children[3].classList.remove('invalido');
        return true;
    } else {
        listaAreaCampoForm[2].children[3].classList.add('invalido');
        listaAreaCampoForm[2].firstElementChild.classList.add('tremer');
        setTimeout(() => {
            listaAreaCampoForm[2].firstElementChild.classList.remove('tremer');
        }, 300);
        return false;
    }
}

function validaApenasNumerosIdade() {
    const idadeRegex = /\D/g;
    const idade = listaAreaCampoForm[2].firstElementChild.value;
    const outrosCaracteres = idade.match(idadeRegex);

    if(outrosCaracteres) {
        listaAreaCampoForm[2].lastElementChild.classList.add('invalido');

        listaAreaCampoForm[2].children[3].classList.remove('invalido');
        listaAreaCampoForm[2].firstElementChild.classList.add('tremer');
        setTimeout(() => {
            listaAreaCampoForm[2].firstElementChild.classList.remove('tremer');
        }, 300);
        return false;
    } else {
        listaAreaCampoForm[2].lastElementChild.classList.remove('invalido');
        return true;
    }
}

const divErro = document.querySelectorAll('div.erro');
let index = 0;

const limparCampos = campo => {
    const divErro = document.querySelectorAll('div.erro');

    divErro[index].classList.remove('invalido');
    index = (index + 1) % divErro.length;

    const proximoCampo = campo.nextElementSibling;
    index ? limparCampos(proximoCampo) : null;
}

const dialog = document.querySelector('dialog');
const listaDadosMostrados = document.querySelectorAll('dialog li');
let indiceMostrarDados = 0;
const mostrarDados = campo => {
    const campoAtual = campo.firstElementChild.value;
    const atributo = campo.firstElementChild.getAttributeNode('name').value;

    if(atributo == 'cpf') {
        const cpfEditado = campoAtual.split('');
        cpfEditado.splice(9, 0, '-');
        listaDadosMostrados[indiceMostrarDados].textContent = `${atributo}: ${cpfEditado.join('')}`;
    } else {
        listaDadosMostrados[indiceMostrarDados].textContent = `${atributo}: ${campoAtual}`;
    }

    indiceMostrarDados = (indiceMostrarDados + 1) % listaAreaCampoForm.length;
    
    if(indiceMostrarDados) {
        const proximoCampo = campo.nextElementSibling;
        mostrarDados(proximoCampo);
    }
}

function mostrarDialog(e) {
    e.preventDefault();
    dialog.showModal();
    dialog.classList.add('visivel');
}

function fecharDialog() {
    dialog.close();
    dialog.classList.remove('visivel');
    form.reset();
    window.location.reload();
}