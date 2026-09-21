// Generar fondo de estrellas titilantes
const sky = document.getElementById('sky');
const starCount = 60;

for (let i = 0; i < starCount; i++) {
  const star = document.createElement('div');
  star.classList.add('star-particle');
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  const size = Math.random() * 3 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.animationDuration = `${Math.random() * 2 + 1}s`;
  star.style.animationDelay = `${Math.random() * 2}s`;
  sky.appendChild(star);
}

// Mensajes de cada estrella (Personalízalos a tu gusto)
const memories = [
  "✨ La primera vez que te vi reír con ganas: supe de inmediato que tu sonrisa iba a ser mi lugar seguro.",
  "✨ Tus abrazos espontáneos: no imaginas cómo me calmas y cómo me cambias cualquier mal día con un solo abrazo.",
  "✨ Nuestras charlas nocturnas: hablar contigo de todo y de nada a la vez es de mis partes favoritas de la vida.",
  "✨ Tu mirada cuando me dices que me quieres: es el recordatorio más lindo de lo afortunado que soy de tenerte."
];

const openedStars = new Set();

function revealMemory(index) {
  const display = document.getElementById('memory-display');
  const text = document.getElementById('memory-text');
  const buttons = document.querySelectorAll('.star-btn');

  // Mostrar texto
  text.textContent = memories[index];
  display.classList.remove('hidden');

  // Marcar botón como visto
  buttons[index].classList.add('opened');
  openedStars.add(index);

  // Si abrió las 4 estrellas, desbloquear el botón de la carta final
  if (openedStars.size === 4) {
    document.getElementById('final-action').classList.remove('hidden');
  }
}

function openLetter() {
  document.getElementById('letter-modal').classList.remove('hidden');
}

function closeLetter() {
  document.getElementById('letter-modal').classList.add('hidden');
}
