
    $(document).ready(function() {
      if ('webkitSpeechRecognition' in window) {
        const reconocimiento = new webkitSpeechRecognition();
        const $textoVozInput = $('#textoVoz');
        const $botonVoz = $('#botonVoz');

        reconocimiento.continuous = false;
        reconocimiento.interimResults = false;
        reconocimiento.lang = 'es-CO';

        reconocimiento.onstart = function() {
          $botonVoz.text('Grabando...');
        };

        reconocimiento.onresult = function(evento) {
          const transcripcion = evento.results[0][0].transcript;
          $textoVozInput.val(transcripcion);
          $("body").css("background",transcripcion);
          $botonVoz.text('Iniciar Grabación');
        };

        reconocimiento.onerror = function(evento) {
          console.error('Error en el reconocimiento de voz:', evento.error);
          $botonVoz.text('Iniciar Grabación');
        };

        $botonVoz.on('click', function() {
          reconocimiento.start();
        });
      } else {
        $('#textoVoz').prop('placeholder', 'La API de reconocimiento de voz no es compatible con este navegador.');
        $('#botonVoz').prop('disabled', true);
      }
    });
