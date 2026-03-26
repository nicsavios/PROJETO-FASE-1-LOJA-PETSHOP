// JavaScript para o PetShop Amigo Fiel

// Função para exibir mensagem baseada no horário
function exibirMensagemHorario() {
    const agora = new Date();
    const hora = agora.getHours();
    let mensagem = "";
    
    if (hora >= 5 && hora < 12) {
        mensagem = "🌅 Bom dia! Que tal começar o dia cuidando do seu melhor amigo?";
    } else if (hora >= 12 && hora < 18) {
        mensagem = "☀️ Boa tarde! Aproveite para trazer seu pet para um banho relaxante!";
    } else {
        mensagem = "🌙 Boa noite! Agende um horário para amanhã e cuide do seu pet!";
    }
    
    const elemento = document.getElementById("mensagemHorario");
    if (elemento) {
        elemento.innerHTML = mensagem;
    }
}

// Função para validar CPF (simples)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Validação básica dos dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digito1 = resto >= 10 ? 0 : resto;
    
    if (parseInt(cpf.charAt(9)) !== digito1) return false;
    
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digito2 = resto >= 10 ? 0 : resto;
    
    return parseInt(cpf.charAt(10)) === digito2;
}

// Função para formatar telefone automaticamente
function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, '');
    if (valor.length <= 10) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    input.value = valor;
}

// Função para validar data de agendamento (não pode ser no passado)
function validarDataAgendamento(data) {
    const dataSelecionada = new Date(data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    if (dataSelecionada < hoje) {
        return false;
    }
    return true;
}

// Função para validar horário de funcionamento (9h às 19h)
function validarHorarioFuncionamento(hora) {
    const horaInt = parseInt(hora.split(':')[0]);
    return horaInt >= 9 && horaInt < 19;
}

// Configurar formulário de cadastro
function configurarFormCadastro() {
    const form = document.getElementById('formCadastro');
    if (!form) return;
    
    // Formatar telefone enquanto digita
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            formatarTelefone(this);
        });
    }
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Validar CPF
        const cpfInput = document.getElementById('cpf');
        if (cpfInput && !validarCPF(cpfInput.value)) {
            alert('CPF inválido! Por favor, digite um CPF válido.');
            cpfInput.focus();
            return;
        }
        
        // Validar campos obrigatórios
        const nome = document.getElementById('nome')?.value;
        const endereco = document.getElementById('endereco')?.value;
        const telefone = document.getElementById('telefone')?.value;
        const email = document.getElementById('email')?.value;
        const sexo = document.querySelector('input[name="sexo"]:checked')?.value;
        const nomePet = document.getElementById('nomePet')?.value;
        
        if (!nome || !endereco || !telefone || !email || !sexo || !nomePet) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        // Mensagem de sucesso
        const mensagemDiv = document.getElementById('mensagemSucesso');
        if (mensagemDiv) {
            mensagemDiv.classList.remove('d-none');
            mensagemDiv.innerHTML = `✅ Cadastro realizado com sucesso!<br>
                Bem-vindo(a) ${nome}! Obrigado por se cadastrar com seu pet ${nomePet}.`;
            
            // Limpar formulário após 3 segundos
            setTimeout(() => {
                form.reset();
                mensagemDiv.classList.add('d-none');
            }, 3000);
        }
    });
}

// Configurar formulário de agendamento
function configurarFormAgendamento() {
    const form = document.getElementById('formAgendamento');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Coletar dados
        const servico = document.querySelector('input[name="servico"]:checked')?.value;
        const metodo = document.querySelector('input[name="metodo"]:checked')?.value;
        const data = document.getElementById('dataAgendamento')?.value;
        const hora = document.getElementById('horaAgendamento')?.value;
        const nomePet = document.getElementById('nomePetAgendamento')?.value;
        
        // Validações
        if (!servico) {
            alert('Por favor, selecione um serviço.');
            return;
        }
        
        if (!metodo) {
            alert('Por favor, selecione o método de agendamento.');
            return;
        }
        
        if (!data) {
            alert('Por favor, selecione uma data.');
            return;
        }
        
        if (!validarDataAgendamento(data)) {
            alert('A data selecionada não pode ser no passado. Escolha uma data futura.');
            return;
        }
        
        if (!hora) {
            alert('Por favor, selecione um horário.');
            return;
        }
        
        if (!validarHorarioFuncionamento(hora)) {
            alert('Nosso horário de funcionamento é das 9h às 19h. Por favor, escolha um horário dentro deste período.');
            return;
        }
        
        if (!nomePet) {
            alert('Por favor, informe o nome do pet.');
            return;
        }
        
        // Formatar data para exibição
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
        
        // Mensagem de sucesso
        const mensagemDiv = document.getElementById('mensagemAgendamento');
        if (mensagemDiv) {
            mensagemDiv.classList.remove('d-none');
            mensagemDiv.innerHTML = `✅ Agendamento confirmado!<br>
                Serviço: ${servico}<br>
                Método: ${metodo}<br>
                Pet: ${nomePet}<br>
                Data: ${dataFormatada} às ${hora}<br><br>
                Em breve entraremos em contato para confirmar o agendamento.`;
            
            // Limpar formulário após 3 segundos
            setTimeout(() => {
                form.reset();
                mensagemDiv.classList.add('d-none');
            }, 5000);
        }
    });
}

// Inicializar todas as funções quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    exibirMensagemHorario();
    configurarFormCadastro();
    configurarFormAgendamento();
});
