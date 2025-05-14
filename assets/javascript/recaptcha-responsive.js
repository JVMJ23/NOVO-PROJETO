<!-- Script para reCAPTCHA responsivo -->
<script>
  function adjustRecaptcha() {
    var recaptchaContainer = document.querySelector('.recaptcha');
    if (recaptchaContainer) {
      var width = recaptchaContainer.offsetWidth;
      var scale = width / 302; // 302px é a largura padrão do widget reCAPTCHA
      var captcha = document.querySelector('.g-recaptcha');
      if (captcha && scale < 1) {
        captcha.style.transform = 'scale(' + scale + ')';
        captcha.style.transformOrigin = 'left top';
        // Ajusta a altura do contêiner para acomodar o reCAPTCHA escalado
        recaptchaContainer.style.height = (78 * scale) + 'px';
      }
    }
  }
  
  // Chama a função no carregamento e redimensionamento
  if (window.addEventListener) {
    window.addEventListener('load', adjustRecaptcha);
    window.addEventListener('resize', adjustRecaptcha);
  } else if (window.attachEvent) {
    window.attachEvent('onload', adjustRecaptcha);
    window.attachEvent('onresize', adjustRecaptcha);
  }
</script>