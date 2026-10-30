// Una Noche, Dos Ciudades — invitación privada
// Flujo: escenario (entrega) -> invitación revelada -> despedida

(function () {
  'use strict';

  var sceneStage = document.getElementById('scene-stage');
  var sceneInvitation = document.getElementById('scene-invitation');
  var sceneFarewell = document.getElementById('scene-farewell');

  var stageWrap = document.getElementById('mapache-stage-wrap');
  var envelope = document.getElementById('envelope');
  var btnReceive = document.getElementById('btn-receive');
  var btnContinue = document.getElementById('btn-continue');

  var card = document.getElementById('card');
  var revealLines = card ? Array.prototype.slice.call(card.querySelectorAll('.reveal-line')) : [];

  var farewellWrap = document.getElementById('mapache-farewell-wrap');

  var opened = false;
  var closed = false;

  // Escalona el retardo de cada línea del texto según data-delay.
  revealLines.forEach(function (el) {
    var step = parseInt(el.getAttribute('data-delay'), 10) || 0;
    el.style.setProperty('--d', (step * 0.18) + 's');
  });

  function switchScene(fromEl, toEl) {
    if (fromEl) fromEl.classList.remove('is-active');
    if (toEl) toEl.classList.add('is-active');
    window.scrollTo(0, 0);
  }

  function openInvitation() {
    if (opened) return;
    opened = true;

    btnReceive.setAttribute('disabled', 'true');
    envelope.setAttribute('aria-disabled', 'true');

    stageWrap.classList.add('is-bowing');

    window.setTimeout(function () {
      envelope.classList.add('is-flying');
    }, 650);

    window.setTimeout(function () {
      envelope.classList.add('is-opened');
      switchScene(sceneStage, sceneInvitation);
    }, 1650);

    window.setTimeout(function () {
      if (card) card.classList.add('is-revealing');
    }, 2050);
  }

  function closeInvitation() {
    if (closed) return;
    closed = true;

    switchScene(sceneInvitation, sceneFarewell);

    window.setTimeout(function () {
      if (farewellWrap) farewellWrap.classList.add('is-bowing');
    }, 60);
  }

  btnReceive.addEventListener('click', openInvitation);
  envelope.addEventListener('click', openInvitation);
  envelope.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openInvitation();
    }
  });

  if (btnContinue) {
    btnContinue.addEventListener('click', closeInvitation);
  }
})();
