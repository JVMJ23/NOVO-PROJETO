document.addEventListener("DOMContentLoaded", function() {
    // Seleção dos elementos do slider
    const slides = document.querySelectorAll('.banner-slider .slide');
    let currentSlide = 0;
    
    // Função para criar os indicadores (bolinhas)
    function createIndicators() {
        const indicatorsContainer = document.querySelector('.slider-indicators');
        
        // Limpa o container de indicadores (caso tenha algo)
        indicatorsContainer.innerHTML = '';
        
        // Cria um indicador para cada slide
        for (let i = 0; i < slides.length; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            
            // Adiciona evento de clique para navegar para o slide correspondente
            indicator.addEventListener('click', function() {
                goToSlide(i);
                // Reset do timer automático quando clicado manualmente
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    // Função para ir para um slide específico
    function goToSlide(index) {
        // Remove a classe 'active' do slide atual
        slides[currentSlide].classList.remove('active');
        
        // Remove a classe 'active' do indicador atual
        const indicators = document.querySelectorAll('.indicator');
        indicators[currentSlide].classList.remove('active');
        
        // Atualiza o índice do slide atual
        currentSlide = index;
        
        // Adiciona a classe 'active' ao novo slide e indicador
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Função para ir para o próximo slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        goToSlide(newIndex);
    }
    
    // Função para ir para o slide anterior
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(newIndex);
    }
    
    // Cria os indicadores
    createIndicators();
    
    // Configura o slider automático
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Configura os controles de navegação
    const prevControl = document.querySelector('.slider-controls .prev');
    const nextControl = document.querySelector('.slider-controls .next');
    
    if (prevControl) {
        prevControl.addEventListener('click', function() {
            prevSlide();
            // Reset do timer automático quando clicado manualmente
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
    
    if (nextControl) {
        nextControl.addEventListener('click', function() {
            nextSlide();
            // Reset do timer automático quando clicado manualmente
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
});


      // Controles do Slider
      const prevControl = document.querySelector('.slider-controls .prev');
      const nextControl = document.querySelector('.slider-controls .next');
      if (prevControl) {
        prevControl.addEventListener('click', function() {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide - 1 + slides.length) % slides.length;
          slides[currentSlide].classList.add('active');
        });
      }
      if (nextControl) {
        nextControl.addEventListener('click', nextSlide);
      }
    
    
    // Scroll suave apenas para links com href iniciando com "#"
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
      if(link.getAttribute('href').charAt(0) === "#") {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetSection = document.getElementById(targetId);
          if (targetSection) {
            window.scrollTo({
              top: targetSection.offsetTop - 100,
              behavior: 'smooth'
            });
          }
        });
      }
    });
  
  document.querySelectorAll(".galeria a").forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.opacity = "0.8";
    });
    link.addEventListener("mouseout", () => {
        link.style.opacity = "1";
    });
  });
  
  document.getElementById("formulario-trabalho").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
  
    // Capturando os valores dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const loja = document.getElementById("loja").value.trim();
    const setor = document.getElementById("setor").value.trim();
    const curriculo = document.getElementById("curriculo").files;
    const naoSouRobo = document.getElementById("nao-sou-robo").checked;
    const erroMsg = document.getElementById("erro-msg");
  
    // Expressões regulares para validar email e telefone
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefoneRegex = /^\d{10,11}$/; // Aceita 10 ou 11 dígitos

    const form = document.getElementById('formulario-trabalho');
    const checkbox = document.getElementById('nao-sou-robo');

    form.addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio real por enquanto

  const campos = form.querySelectorAll('input[type="text"], input[type="email"]');
  let valid = true;

  campos.forEach(campo => {
    if (campo.value.trim() === '') {
      valid = false;
      campo.style.borderColor = 'red';
    } else {
      campo.style.borderColor = '#ccc';
    }
  });

  if (!inputFile.files.length) {
    alert('Por favor, anexe seu currículo.');
    valid = false;
  }

  if (!checkbox.checked) {
    alert('Por favor, confirme que você não é um robô.');
    valid = false;
  }

  if (valid) {
    alert('Formulário enviado com sucesso!');
    form.submit(); // aqui você pode substituir por envio via backend
  }
});
  
    // Validações
    if (
        nome === "" ||
        email === "" ||
        telefone === "" ||
        cidade === "" ||
        bairro === "" ||
        loja === "" ||
        setor === "" ||
        curriculo.length === 0 ||
        !naoSouRobo
    ) {
        erroMsg.textContent = "Por favor, preencha todos os campos corretamente!";
        erroMsg.style.display = "block";
        return;
    }
  
    if (!emailRegex.test(email)) {
        erroMsg.textContent = "Por favor, insira um email válido!";
        erroMsg.style.display = "block";
        return;
    }
  
    if (!telefoneRegex.test(telefone)) {
        erroMsg.textContent = "Por favor, insira um telefone válido com 10 ou 11 dígitos!";
        erroMsg.style.display = "block";
        return;
    }
  
    // Se tudo estiver correto, enviar formulário
    erroMsg.style.display = "none";
    alert("Formulário enviado com sucesso!");
  });
  