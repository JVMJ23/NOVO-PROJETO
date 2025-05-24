// Esperar o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
  // Elementos principais
  const formulario = document.getElementById('formulario-trabalho');
  const inputCurriculo = document.getElementById('curriculo');
  const spanFileName = document.querySelector('.file-name');
  const btnAbrirPolitica = document.getElementById('abrir-politica');
  const modalPolitica = document.getElementById('modal-politica');
  const btnFecharModais = document.querySelectorAll('.fechar');
  const checkboxTermos = document.getElementById('Li-termos');
  
  // Variáveis para rastrear o status de preenchimento
  let formCompleto = false;
  let recaptchaVerificado = false;
  
  // Função para verificar se todos os campos estão preenchidos
  function verificarFormularioCompleto() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const loja = document.getElementById('loja').value.trim();
    const setor = document.getElementById('setor').value.trim();
    const arquivo = inputCurriculo.files[0];
    const termosAceitos = checkboxTermos.checked;
    
    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValido = emailRegex.test(email);
    
    // Validar telefone
    const telefoneRegex = /^(\(\d{2}\)|\d{2})[- ]?(\d{4,5})[- ]?(\d{4})$/;
    const telefoneValido = telefoneRegex.test(telefone);
    
    // Verificar se tudo está preenchido e válido
    formCompleto = nome && email && emailValido && telefone && telefoneValido && 
                  cidade && bairro && loja && setor && arquivo && termosAceitos;
    
    // Se tudo estiver preenchido e o reCAPTCHA estiver verificado, enviar o formulário
    if (formCompleto && recaptchaVerificado) {
      enviarFormulario();
    }
    
    return formCompleto;
  }
  
  // Função para enviar o formulário
  function enviarFormulario() {
    const formData = new FormData(formulario);
    
    // Adicionar informação do reCAPTCHA ao FormData, se não estiver usando FormSubmit
    formData.append('g-recaptcha-response', grecaptcha.getResponse());
    
    // Iniciar o envio via AJAX
    const xhr = new XMLHttpRequest();
    xhr.open('POST', formulario.action || 'seu-endpoint-de-processamento.php', true);
    
    // Mostrar indicador de carregamento (opcional)
    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-indicator';
    loadingElement.innerHTML = 'Enviando currículo...';
    formulario.appendChild(loadingElement);
    
    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
            // Limpar formulário e mostrar mensagem de sucesso
            formulario.reset();
            spanFileName.textContent = 'Nenhum arquivo escolhido';
            grecaptcha.reset();
            recaptchaVerificado = false;
            alert('Currículo enviado com sucesso!');
            
          } else {
            alert('Erro ao enviar o currículo: ' + (response.message || 'Tente novamente mais tarde.'));
          }
        } catch (e) {
          // Se estiver usando FormSubmit, não haverá resposta JSON
          alert('Currículo enviado com sucesso! Entraremos em contato em breve.');
          formulario.reset();
          spanFileName.textContent = 'Nenhum arquivo escolhido';
        }
      } else {
        alert('Erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
      }
      
      // Remover indicador de carregamento
      if (loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
      }
    };
    
    xhr.onerror = function() {
      alert('Erro de conexão. Verifique sua internet e tente novamente.');
      if (loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
      }
    };
    
    xhr.send(formData);
  }
  
  // Função para mostrar o nome do arquivo selecionado
  inputCurriculo.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      spanFileName.textContent = this.files[0].name;
    } else {
      spanFileName.textContent = 'Nenhum arquivo escolhido';
    }
    verificarFormularioCompleto(); // Verificar formulário após seleção de arquivo
  });
  
  // Funções para o modal da política de privacidade
  btnAbrirPolitica.addEventListener('click', function(e) {
    e.preventDefault();
    modalPolitica.style.display = 'flex';
  });
  
  // Fechar o modal quando clicar no botão de fechar ou fora do modal
  btnFecharModais.forEach(btn => {
    btn.addEventListener('click', function() {
      modalPolitica.style.display = 'none';
    });
  });
  
  window.addEventListener('click', function(e) {
    if (e.target === modalPolitica) {
      modalPolitica.style.display = 'none';
    }
  });
  
  // Adicionar listener de eventos para todos os campos de texto para verificar o preenchimento
  const camposTexto = formulario.querySelectorAll('input[type="text"], input[type="email"]');
  camposTexto.forEach(campo => {
    campo.addEventListener('blur', verificarFormularioCompleto); // Verificar ao sair do campo
    campo.addEventListener('input', verificarFormularioCompleto); // Verificar durante digitação
  });
  
  // Adicionar listener para o checkbox de termos
  checkboxTermos.addEventListener('change', verificarFormularioCompleto);
  
  // Função de callback para o reCAPTCHA
  // Adicione isso ao HTML: data-callback="recaptchaCallback" na div g-recaptcha
  window.recaptchaCallback = function() {
    recaptchaVerificado = true;
    verificarFormularioCompleto(); // Verificar se podemos enviar o formulário
  };
  
  // Aplicar máscara ao telefone
  const inputTelefone = document.getElementById('telefone');
  inputTelefone.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);
    
    if (value.length > 2) {
      value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
    }
    if (value.length > 10) {
      value = value.substring(0, 10) + '-' + value.substring(10);
    }
    
    this.value = value;
    verificarFormularioCompleto(); // Verificar quando o telefone mudar
  });
  
  // Verificar o formulário uma vez quando a página carregar
  setTimeout(verificarFormularioCompleto, 1000);
});

/*recaptcha carregado*/


 const abrir = document.getElementById("abrir-politica");
              const modal = document.getElementById("modal-politica");
              const fecharBtns = document.querySelectorAll(".fechar");

              abrir.addEventListener("click", function (e) {
                e.preventDefault();
                modal.style.display = "block";
              });

              fecharBtns.forEach(btn => {
                btn.addEventListener("click", function () {
                  modal.style.display = "none";
                });
              });

              window.addEventListener("click", function (e) {
                if (e.target === modal) {
                  modal.style.display = "none";
                }
              });

/* seleção */
                function mostrarSelecao() {
            const select = document.getElementById('loja');
            const resultado = document.getElementById('resultado');
            
            if (select.value) {
                const textoSelecionado = select.options[select.selectedIndex].text;
                resultado.innerHTML = `<strong>Loja selecionada:</strong> ${textoSelecionado}`;
                resultado.style.display = 'block';
            } else {
                resultado.innerHTML = '<strong>Por favor, selecione uma loja.</strong>';
                resultado.style.display = 'block';
                resultado.style.color = '#dc3545';
            }
        }