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
  
  