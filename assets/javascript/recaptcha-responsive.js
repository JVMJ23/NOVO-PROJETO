// Função para ajustar o reCAPTCHA responsivamente
function adjustRecaptcha() {
    // Aguarda um pouco para garantir que o reCAPTCHA foi carregado
    setTimeout(function() {
        var recaptchaContainer = document.querySelector('.recaptcha');
        var captcha = document.querySelector('.g-recaptcha');
        
        if (!recaptchaContainer || !captcha) {
            console.log('reCAPTCHA não encontrado, tentando novamente...');
            return;
        }
        
        var containerWidth = recaptchaContainer.offsetWidth;
        var viewportWidth = window.innerWidth;
        
        // Define escalas específicas para diferentes tamanhos de tela
        var scale = 1;
        
        if (viewportWidth <= 320) {
            scale = Math.min(containerWidth / 302, 0.55);
        } else if (viewportWidth <= 375) {
            scale = Math.min(containerWidth / 302, 0.65);
        } else if (viewportWidth <= 425) {
            scale = Math.min(containerWidth / 302, 0.77);
        } else if (viewportWidth <= 768) {
            scale = Math.min(containerWidth / 302, 0.85);
        } else {
            scale = Math.min(containerWidth / 302, 1);
        }
        
        // Aplica a transformação apenas se necessário
        if (scale < 1) {
            captcha.style.transform = 'scale(' + scale + ')';
            captcha.style.transformOrigin = 'left top';
            captcha.style.width = '100%';
            captcha.style.maxWidth = '304px';
            
            // Ajusta a altura do contêiner
            var newHeight = 78 * scale;
            recaptchaContainer.style.height = newHeight + 'px';
            recaptchaContainer.style.overflow = 'hidden';
            
            console.log('reCAPTCHA ajustado - Scale:', scale, 'Height:', newHeight);
        } else {
            // Reset para tamanho normal em telas maiores
            captcha.style.transform = 'none';
            captcha.style.width = 'auto';
            recaptchaContainer.style.height = 'auto';
        }
    }, 100);
}

// Função para detectar quando o reCAPTCHA foi totalmente carregado
function waitForRecaptcha(callback, maxAttempts = 20) {
    var attempts = 0;
    
    function check() {
        var recaptcha = document.querySelector('.g-recaptcha');
        var recaptchaFrame = document.querySelector('iframe[src*="recaptcha"]');
        
        if (recaptcha && (recaptchaFrame || document.querySelector('.g-recaptcha > div'))) {
            callback();
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(check, 250);
        } else {
            console.log('reCAPTCHA não foi carregado após', maxAttempts, 'tentativas');
        }
    }
    
    check();
}

// Executa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    waitForRecaptcha(adjustRecaptcha);
});

// Executa quando a janela estiver totalmente carregada
window.addEventListener('load', function() {
    setTimeout(function() {
        waitForRecaptcha(adjustRecaptcha);
    }, 500);
});

// Executa quando a tela for redimensionada
window.addEventListener('resize', function() {
    clearTimeout(window.recaptchaResizeTimeout);
    window.recaptchaResizeTimeout = setTimeout(adjustRecaptcha, 100);
});

// Callback para quando o reCAPTCHA for renderizado (se usando a API)
window.onRecaptchaLoad = function() {
    setTimeout(adjustRecaptcha, 200);
};

// Observador de mutação para detectar quando o reCAPTCHA é adicionado dinamicamente
if (window.MutationObserver) {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    if (node.nodeType === 1) { // Element node
                        if (node.querySelector && node.querySelector('.g-recaptcha')) {
                            setTimeout(adjustRecaptcha, 300);
                            break;
                        }
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}