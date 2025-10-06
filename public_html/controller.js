/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

const limpaFormulario = () => {
    document.getElementById('rua').value = "";
    document.getElementById('bairro').value = "";
    document.getElementById('cidade').value = "";
    document.getElementById('estado').value = "";
};

const buscarCEP = (cep) => {
    limpaFormulario();

    // Verifica se o CEP tem o formato correto (8 dígitos)
    const validacep = /^[0-9]{8}$/;

    if (validacep.test(cep)) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado. Digite novamente.");
                } else {
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    document.getElementById('estado').value = data.uf;
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
                alert("Ocorreu um erro ao buscar o CEP.");
            });
    } else {
        alert("Formato de CEP inválido.");
    }
};

// Vincula a função de buscar informacoes pelo cep ao evento blur do campo CEP que é disparado ao sair do mesmo
document.getElementById('cep').addEventListener('blur', (event) => {
    const cepDigitado = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    buscarCEP(cepDigitado);
});