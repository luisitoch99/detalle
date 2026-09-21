// --- SIMULACIÓN DE CARGA / ANÁLISIS ---
let progress = 0;
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

const steps = [
  { id: 'check-1', time: 500 },
  { id: 'check-2', time: 1200 },
  { id: 'check-3', time: 1900 },
  { id: 'check-4', time: 2600 }
];

// Activar pasos de la checklist progresivamente
steps.forEach(step => {
  setTimeout(() => {
    const el = document.getElementById(step.id);
    el.classList.add('active');
    el.querySelector('.mark').textContent = '✓';
  }, step.time);
});

// Anular barra de progreso hasta el 87% y detenerse
const loadingInterval = setInterval(() => {
  if (progress < 87) {
    progress++;
    progressFill.style.width = progress + '%';
    progressText.textContent = progress + '%';
  } else {
    clearInterval(loadingInterval);
    // Mostrar el error 404 después de un segundo
    setTimeout(() => {
      document.querySelector('.terminal-header').style.display = 'none';
      progressFill.parentElement.style.display = 'none';
      progressText.style.display = 'none';
      document.querySelector('.checklist').style.display = 'none';
      document.getElementById('error-container').classList.remove('hidden');
    }, 600);
  }
}, 30);

// Botón para entrar a la experiencia real
function startExperience() {
  const intro = document.getElementById('intro-screen');
  const main = document.getElementById('main-content');
  
  intro.style.opacity = '0';
  intro.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    intro.classList.add('hidden');
    main.classList.remove('hidden');
    generateSky();
  }, 500);
}

// --- GENERAR FONDO DE ESTRELLAS ---
function generateSky() {
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
}

// --- MEMORIAS DE LAS ESTRELLAS ---
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

  text.textContent = memories[index];
  display.classList.remove('hidden');

  buttons[index].classList.add('opened');
  openedStars.add(index);

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
