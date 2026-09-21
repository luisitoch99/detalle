/* =====================================================
   CONFIGURACIÓN
   =====================================================

   ESTA PARTE LA VAMOS A PERSONALIZAR DESPUÉS.

   Por ahora NO necesita cambiar nada.
===================================================== */

const CONFIG = {

    herName: "TÚ",

    /* ---------------------------------------------
       PREGUNTAS DEL NIVEL 1
    --------------------------------------------- */

    questions: [

        {
            question:
                "¿Cuál de estas opciones describe mejor una cita perfecta?",

            answers: [
                "Quedarnos juntos viendo algo",
                "Salir a comer algo rico",
                "Salir sin saber exactamente a dónde",
                "Cualquier cosa mientras estemos juntos"
            ],

            correct: 3
        },

        {
            question:
                "¿Qué creo que es más importante en una relación?",

            answers: [
                "Tener siempre la razón",
                "Poder reírnos juntos",
                "No discutir nunca",
                "Responder rápido los mensajes"
            ],

            correct: 1
        },

        {
            question:
                "Si tuviéramos un día completamente libre, ¿qué elegiría?",

            answers: [
                "Dormir todo el día",
                "Hacer algo juntos",
                "Trabajar 😭",
                "No sé, probablemente improvisar"
            ],

            correct: 1
        },

        {
            question:
                "Pregunta difícil... ¿quién tuvo más suerte?",

            answers: [
                "Yo",
                "Tú",
                "Los dos",
                "La pregunta está mal planteada 😂"
            ],

            correct: 2
        }

    ],


    /* ---------------------------------------------
       PREGUNTAS "QUIÉN ES MÁS PROBABLE"
    --------------------------------------------- */

    whoQuestions: [

        "¿Quién es más probable que diga 'ya voy' cuando todavía no está listo?",

        "¿Quién es más probable que diga 'no tengo hambre' y termine comiendo del plato del otro?",

        "¿Quién es más probable que se quede dormido primero?",

        "¿Quién es más probable que quiera comprar algo completamente innecesario?",

        "¿Quién es más probable que diga 'no pasa nada' cuando claramente sí pasa algo?"

    ],


    /* ---------------------------------------------
       CONTENIDO DE LAS CAJAS
    --------------------------------------------- */

    gifts: {

        1: {
            icon: "🎁",
            title: "Una pequeña confesión",
            text:
                "Hice este juego porque quería darte algo diferente. Algo que no fuera simplemente copiar una idea de internet y cambiarle el nombre."
        },

        2: {
            icon: "🎧",
            title: "Una canción",
            text:
                "Aquí después vamos a poner una canción que tenga algún significado especial para nosotros."
        },

        3: {
            icon: "💌",
            title: "Una carta escondida",
            text:
                "Esta caja guarda una pequeña parte de todo lo que todavía quiero decirte."
        },

        4: {
            icon: "🔮",
            title: "Algo que todavía no existe",
            text:
                "Todavía no puedo enseñártelo porque es algo que tenemos que vivir primero."
        }

    }

};


/* =====================================================
   VARIABLES DEL JUEGO
===================================================== */

let currentQuestion = 0;
let score = 0;

let currentWhoQuestion = 0;

let openedGifts = 0;


/* =====================================================
   INICIO
===================================================== */

function startGame() {

    goTo("level1");

    loadQuestion();

}


/* =====================================================
   CAMBIAR DE PANTALLA
===================================================== */

function goTo(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const nextScreen = document.getElementById(screenId);

    if (nextScreen) {
        nextScreen.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   NIVEL 1
===================================================== */

function loadQuestion() {

    const questionData =
        CONFIG.questions[currentQuestion];

    document.getElementById("progress1").textContent =
        `${String(currentQuestion + 1).padStart(2, "0")} / ${String(CONFIG.questions.length).padStart(2, "0")}`;

    document.getElementById("question").textContent =
        questionData.question;

    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";


    questionData.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.className = "answer";

        button.textContent = answer;

        button.onclick = () =>
            selectAnswer(button, index);

        answersContainer.appendChild(button);

    });

}


/* =====================================================
   RESPONDER NIVEL 1
===================================================== */

function selectAnswer(button, selectedIndex) {

    const questionData =
        CONFIG.questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer");


    buttons.forEach(btn => {
        btn.disabled = true;
    });


    if (selectedIndex === questionData.correct) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");

        buttons[questionData.correct]
            .classList.add("correct");

    }


    setTimeout(() => {

        currentQuestion++;

        if (currentQuestion < CONFIG.questions.length) {

            loadQuestion();

        } else {

            showResult();

        }

    }, 800);

}


/* =====================================================
   RESULTADO NIVEL 1
===================================================== */

function showResult() {

    goTo("result1");

    const percentage =
        Math.round(
            (score / CONFIG.questions.length) * 100
        );

    let finalPercentage;

    /*
       No queremos que el resultado pueda ser 0%.

       Es un juego romántico, no un examen de universidad 😂
    */

    finalPercentage =
        Math.max(
            72,
            Math.min(99, percentage + 50)
        );


    setTimeout(() => {

        document.getElementById(
            "compatibility-bar"
        ).style.width =
            finalPercentage + "%";


        animateNumber(
            "compatibility-number",
            finalPercentage
        );

    }, 300);


    const resultText =
        document.getElementById("result-text");


    if (score === CONFIG.questions.length) {

        resultText.textContent =
            "Ok... esto empieza a ser sospechoso. Definitivamente sabes demasiado de mí.";

    } else if (score >= 2) {

        resultText.textContent =
            "No estuvo nada mal. Creo que podemos seguir adelante.";

    } else {

        resultText.textContent =
            "Tenemos algunas cosas que conversar... 😂";

    }

}


/* =====================================================
   ANIMAR PORCENTAJE
===================================================== */

function animateNumber(elementId, finalNumber) {

    const element =
        document.getElementById(elementId);

    let number = 0;

    const interval =
        setInterval(() => {

            number++;

            element.textContent =
                number + "%";

            if (number >= finalNumber) {

                clearInterval(interval);

            }

        }, 20);

}


/* =====================================================
   NIVEL 2
===================================================== */

function loadWhoQuestion() {

    if (
        currentWhoQuestion >=
        CONFIG.whoQuestions.length
    ) {

        currentWhoQuestion = 0;

    }

    document.getElementById(
        "who-question"
    ).textContent =
        CONFIG.whoQuestions[currentWhoQuestion];

}


/* =====================================================
   RESPONDER "QUIÉN ES MÁS PROBABLE"
===================================================== */

function answerWho(person) {

    const resultTitle =
        document.getElementById(
            "who-result-title"
        );

    const resultText =
        document.getElementById(
            "who-result"
        );


    if (person === "her") {

        resultTitle.textContent =
            "Respuesta registrada. 👀";

        resultText.textContent =
            "El sistema ha detectado una posible transferencia de responsabilidades.";

    } else {

        resultTitle.textContent =
            "Acepto la acusación. 😂";

        resultText.textContent =
            "Bueno... al menos tienes el valor de decirlo.";

    }


    goTo("result2");

    currentWhoQuestion++;

}


/* =====================================================
   INICIALIZAR NIVEL 2
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadWhoQuestion();

        document.getElementById(
            "her-name"
        ).textContent =
            CONFIG.herName;

    }
);


/* =====================================================
   REGALOS
===================================================== */

function openGift(number) {

    const gift =
        CONFIG.gifts[number];

    if (!gift) return;


    /*
       El objeto 4 se desbloquea solamente
       cuando los primeros tres están abiertos.
    */

    if (
        number === 4 &&
        openedGifts < 3
    ) {

        alert(
            "🔒 Todavía no puedes abrir este objeto.\n\nPrimero abre los otros tres."
        );

        return;

    }


    document.getElementById(
        "gift-icon"
    ).textContent =
        gift.icon;


    document.getElementById(
        "gift-title"
    ).textContent =
        gift.title;


    document.getElementById(
        "gift-text"
    ).textContent =
        gift.text;


    document.getElementById(
        "gift-modal"
    ).classList.add("show");


    const giftButton =
        document.querySelectorAll(".gift")[number - 1];


    if (!giftButton.classList.contains("opened")) {

        giftButton.classList.add("opened");

        openedGifts++;

        document.getElementById(
            "opened-count"
        ).textContent =
            openedGifts;

    }


    /*
       Cuando se abren los 4 regalos,
       desbloqueamos el siguiente nivel.
    */

    if (openedGifts >= 4) {

        setTimeout(() => {

            const button =
                document.createElement("button");

            button.className =
                "main-button";

            button.textContent =
                "CONTINUAR →";

            button.onclick = () =>
                goTo("level4");

            const container =
                document.querySelector(
                    ".boxes-content"
                );

            /*
               Evitamos duplicarlo.
            */

            if (
                !document.getElementById(
                    "continue-final"
                )
            ) {

                button.id =
                    "continue-final";

                container.appendChild(button);

            }

        }, 500);

    }

}


/* =====================================================
   CERRAR REGALO
===================================================== */

function closeGift() {

    document.getElementById(
        "gift-modal"
    ).classList.remove("show");

}


/* =====================================================
   CARTA FINAL
===================================================== */

function showLetter() {

    goTo("letter");

    launchConfetti();

}


/* =====================================================
   CONFETI
===================================================== */

function launchConfetti() {

    const container =
        document.getElementById(
            "confetti-container"
        );


    for (let i = 0; i < 80; i++) {

        const piece =
            document.createElement("div");

        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =
            (Math.random() * 2 + 2) + "s";


        piece.style.animationDelay =
            Math.random() * 1.5 + "s";


        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        /*
           No usamos colores definidos
           individualmente en CSS.
        */

        piece.style.background =
            `hsl(${Math.random() * 360}, 60%, 70%)`;


        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}


/* =====================================================
   CERRAR MODAL AL HACER CLICK FUERA
===================================================== */

document.getElementById(
    "gift-modal"
).addEventListener(
    "click",
    function(event) {

        if (event.target === this) {

            closeGift();

        }

    }
);
