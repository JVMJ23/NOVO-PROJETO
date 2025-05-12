// responsive-exact-layout.js
class ExactLayoutResponsive {
  constructor() {
    this.designWidth = 1340; // Largura exata do seu design
    this.init();
  }
  
  init() {
    // Cria container apenas uma vez
    if (!document.getElementById('exact-wrapper')) {
      this.createExactWrapper();
    }
    
    // Aplica escala inicial
    this.applyExactScale();
    
    // Monitora mudanças
    window.addEventListener('resize', () => this.applyExactScale());
    window.addEventListener('load', () => this.applyExactScale());
  }
  
  createExactWrapper() {
    // Cria wrapper que preserva layout
    const wrapper = document.createElement('div');
    wrapper.id = 'exact-wrapper';
    
    // Move TODOS os elementos do body para o wrapper
    while (document.body.firstChild) {
      wrapper.appendChild(document.body.firstChild);
    }
    
    // Estilos do wrapper
    wrapper.style.width = this.designWidth + 'px';
    wrapper.style.position = 'relative';
    wrapper.style.margin = '0';
    wrapper.style.padding = '0';
    
    // Adiciona wrapper ao body
    document.body.appendChild(wrapper);
    
    // Estilos do body
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
  }
  
  applyExactScale() {
    const wrapper = document.getElementById('exact-wrapper');
    if (!wrapper) return;
    
    // Calcula escala exata
    const currentWidth = window.innerWidth;
    const scale = currentWidth / this.designWidth;
    
    // Aplica transformação
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.transformOrigin = 'top left';
    
    // Ajusta altura do documento
    const originalHeight = wrapper.scrollHeight;
    const scaledHeight = originalHeight * scale;
    
    document.body.style.height = scaledHeight + 'px';
    document.documentElement.style.height = scaledHeight + 'px';
    
    // Permite scroll vertical mas não horizontal
    document.documentElement.style.overflowX = 'hidden';
    document.documentElement.style.overflowY = 'auto';
  }
}

// Inicializa
document.addEventListener('DOMContentLoaded', () => {
  new ExactLayoutResponsive();
});