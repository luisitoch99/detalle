/* =====================================================
   CONFIGURACIÓN PRINCIPAL

   AQUÍ VAMOS A PERSONALIZAR EL JUEGO DESPUÉS.

===================================================== */


const CONFIG = {


    /* ===============================================
       NOMBRE DE ELLA
    =============================================== */

    herName: "TÚ",


    /* ===============================================
       NIVEL 1
    =============================================== */

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



    /* ===============================================
       NIVEL 2
    =============================================== */

    whoQuestions: [

        "¿Quién es más probable que diga 'ya voy' cuando todavía no está listo?",

        "¿Quién es más probable que diga 'no tengo hambre' y termine comiendo del plato del otro?",

        "¿Quién es más probable que se quede dormido primero?",

        "¿Quién es más probable que quiera comprar algo completamente innecesario?",

        "¿Quién es más probable que diga 'no pasa nada' cuando claramente sí pasa algo?"

    ],



    /* ===============================================
       REGALOS
    =============================================== */

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
                "Aquí después vamos a poner una canción que tenga algún significado especial para nosotros. (Fast and F......."

        },


        3: {

            icon: "💌",

            title: "Una carta escondida",

            text:
                "Hoy cumplimos otro ciclo juntos y no hay día en que no agradezca haberte conocido. No necesité llenar una pared de fotos para saber que cada recuerdo a tu lado está guardado en mi corazón. Gracias por tu paciencia, por tu sonrisa en los días difíciles, por tus abrazos que me dan paz y por elegir compartir tu tiempo conmigo."

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
   VARIABLES
===================================================== */


let currentQuestion = 0;

let score = 0;

let currentWhoQuestion = 0;

let openedGifts = 0;



/* =====================================================
   INICIO
===================================================== */


function startGame() {

    currentQuestion = 0;

    score = 0;

    loadQuestion();

    goTo("level1");

}



/* =====================================================
   CAMBIAR DE PANTALLA
===================================================== */


function goTo(screenId) {


    const screens =
        document.querySelectorAll(".screen");


    screens.forEach(screen => {

        screen.classList.remove("active");

    });


    const nextScreen =
        document.getElementById(screenId);


    if (!nextScreen) {

        console.error(
            "No existe la pantalla:",
            screenId
        );

        return;

    }


    nextScreen.classList.add("active");


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


    if (!questionData) {

        showResult();

        return;

    }


    document.getElementById(
        "progress1"
    ).textContent =

        `${String(currentQuestion + 1).padStart(2, "0")} / ${String(CONFIG.questions.length).padStart(2, "0")}`;


    document.getElementById(
        "question-number"
    ).textContent =

        `PREGUNTA ${String(currentQuestion + 1).padStart(2, "0")}`;


    document.getElementById(
        "question"
    ).textContent =

        questionData.question;


    const answersContainer =
        document.getElementById("answers");


    answersContainer.innerHTML = "";


    questionData.answers.forEach(
        (answer, index) => {


            const button =
                document.createElement("button");


            button.className =
                "answer";


            button.textContent =
                answer;


            button.onclick = () => {

                selectAnswer(
                    button,
                    index
                );

            };


            answersContainer.appendChild(
                button
            );

        }
    );

}



/* =====================================================
   RESPUESTA NIVEL 1
===================================================== */


function selectAnswer(
    button,
    selectedIndex
) {


    const questionData =
        CONFIG.questions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".answer"
        );


    buttons.forEach(btn => {

        btn.disabled = true;

    });


    if (
        selectedIndex ===
        questionData.correct
    ) {


        button.classList.add(
            "correct"
        );


        score++;


    } else {


        button.classList.add(
            "wrong"
        );


        if (
            buttons[
                questionData.correct
            ]
        ) {

            buttons[
                questionData.correct
            ].classList.add(
                "correct"
            );

        }

    }


    setTimeout(() => {


        currentQuestion++;


        if (
            currentQuestion <
            CONFIG.questions.length
        ) {


            loadQuestion();


        } else {


            showResult();

        }


    }, 850);

}



/* =====================================================
   RESULTADO NIVEL 1
===================================================== */


function showResult() {


    goTo("result1");


    const percentage =

        Math.round(

            (
                score /
                CONFIG.questions.length
            ) * 100

        );


    /*
       El resultado visual está diseñado
       como parte del juego.

       Nunca baja demasiado porque esto
       NO es realmente un examen 😂
    */

    const finalPercentage =

        Math.max(

            72,

            Math.min(
                99,
                percentage + 50
            )

        );


    document.getElementById(
        "compatibility-bar"
    ).style.width = "0%";


    document.getElementById(
        "compatibility-number"
    ).textContent = "0%";


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
        document.getElementById(
            "result-text"
        );


    if (
        score ===
        CONFIG.questions.length
    ) {


        resultText.textContent =

            "Ok... esto empieza a ser sospechoso. Definitivamente sabes demasiado de mí.";


    } else if (
        score >= 2
    ) {


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


function animateNumber(
    elementId,
    finalNumber
) {


    const element =
        document.getElementById(
            elementId
        );


    let number = 0;


    const interval =
        setInterval(() => {


            number++;


            element.textContent =
                number + "%";


            if (
                number >= finalNumber
            ) {


                clearInterval(
                    interval
                );

            }


        }, 18);

}



/* =====================================================
   COMENZAR NIVEL 2
===================================================== */


function startLevel2() {


    currentWhoQuestion = 0;


    loadWhoQuestion();


    goTo("level2");

}



/* =====================================================
   CARGAR PREGUNTA NIVEL 2
===================================================== */


function loadWhoQuestion() {


    const question =
        CONFIG.whoQuestions[
            currentWhoQuestion
        ];


    if (!question) {


        finishLevel2();


        return;

    }


    document.getElementById(
        "who-progress"
    ).textContent =

        `${String(currentWhoQuestion + 1).padStart(2, "0")} / ${String(CONFIG.whoQuestions.length).padStart(2, "0")}`;


    document.getElementById(
        "who-question-number"
    ).textContent =

        `PREGUNTA ${String(currentWhoQuestion + 1).padStart(2, "0")}`;


    document.getElementById(
        "who-question"
    ).textContent = question;


    enableWhoButtons();

}



/* =====================================================
   RESPONDER NIVEL 2
===================================================== */


function answerWho(person) {


    const buttons =
        document.querySelectorAll(
            ".duel-buttons button"
        );


    buttons.forEach(button => {

        button.disabled = true;

    });


    const resultText =
        document.getElementById(
            "who-result"
        );


    if (person === "her") {


        resultText.textContent =

            "Respuesta registrada. El sistema ha detectado una posible transferencia de responsabilidades.";


    } else {


        resultText.textContent =

            "Acepto la acusación. 😂 Al menos tienes el valor de decirlo.";

    }


    /*
       Pequeña pausa para que la elección
       se sienta como una acción del juego.
    */

    setTimeout(() => {


        currentWhoQuestion++;


        if (
            currentWhoQuestion <
            CONFIG.whoQuestions.length
        ) {


            loadWhoQuestion();


        } else {


            finishLevel2();

        }


    }, 650);

}



/* =====================================================
   REACTIVAR BOTONES NIVEL 2
===================================================== */


function enableWhoButtons() {


    const buttons =
        document.querySelectorAll(
            ".duel-buttons button"
        );


    buttons.forEach(button => {

        button.disabled = false;

    });

}



/* =====================================================
   TERMINAR NIVEL 2
===================================================== */


function finishLevel2() {


    goTo("result2");


    const resultText =
        document.getElementById(
            "who-result"
        );


    resultText.textContent =

        "Investigación completada. Se han registrado suficientes pruebas para futuras discusiones. 😂";

}



/* =====================================================
   REGALOS
===================================================== */


function openGift(number) {


    const gift =
        CONFIG.gifts[number];


    if (!gift) {

        return;

    }


    /*
       EL OBJETO 4 ESTÁ BLOQUEADO
       HASTA ABRIR LOS TRES PRIMEROS.
    */

    if (
        number === 4 &&
        openedGifts < 3
    ) {


        const gift4 =
            document.getElementById(
                "gift4"
            );


        gift4.classList.add(
            "shake"
        );


        setTimeout(() => {

            gift4.classList.remove(
                "shake"
            );

        }, 500);


        return;

    }


    /*
       Mostrar contenido
    */

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
    ).classList.add(
        "show"
    );


    /*
       Marcar como abierto
    */

    const giftButton =
        document.getElementById(
            `gift${number}`
        );


    if (
        !giftButton.classList.contains(
            "opened"
        )
    ) {


        giftButton.classList.add(
            "opened"
        );


        openedGifts++;


        document.getElementById(
            "opened-count"
        ).textContent =
            openedGifts;

    }


    /*
       Desbloquear objeto 4
    */

    if (
        openedGifts >= 3
    ) {


        const gift4 =
            document.getElementById(
                "gift4"
            );


        gift4.classList.remove(
            "locked"
        );


        gift4.querySelector(
            "span"
        ).textContent =
            "🔮";

    }


    /*
       Desbloquear final
    */

    if (
        openedGifts === 4
    ) {


        unlockFinal();

    }

}



/* =====================================================
   DESBLOQUEAR FINAL
===================================================== */


function unlockFinal() {


    const container =
        document.getElementById(
            "final-unlock"
        );


    /*
       Evitar duplicados
    */

    if (
        document.getElementById(
            "continue-final"
        )
    ) {

        return;

    }


    const button =
        document.createElement(
            "button"
        );


    button.id =
        "continue-final";


    button.className =
        "main-button";


    button.innerHTML =
        "CONTINUAR <span>→</span>";


    button.onclick = () => {

        goTo("level4");

    };


    container.appendChild(
        button
    );


    /*
       Pequeña animación
    */

    container.style.animation =
        "screenIn 0.5s ease";

}



/* =====================================================
   CERRAR REGALO
===================================================== */


function closeGift() {


    document.getElementById(
        "gift-modal"
    ).classList.remove(
        "show"
    );

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


    /*
       Limpiar confeti anterior
    */

    container.innerHTML = "";


    for (
        let i = 0;
        i < 100;
        i++
    ) {


        const piece =
            document.createElement(
                "div"
            );


        piece.className =
            "confetti";


        piece.style.left =
            Math.random() * 100 + "%";


        piece.style.animationDuration =

            (
                Math.random() * 2 +
                2
            ) + "s";


        piece.style.animationDelay =

            (
                Math.random() * 1.5
            ) + "s";


        piece.style.transform =

            `rotate(${Math.random() * 360}deg)`;


        /*
           Colores aleatorios para
           que el confeti sea dinámico.
        */

        piece.style.background =

            `hsl(${Math.random() * 360}, 60%, 70%)`;


        container.appendChild(
            piece
        );


        setTimeout(() => {


            piece.remove();


        }, 5000);

    }

}



/* =====================================================
   CERRAR MODAL AL HACER CLICK FUERA
===================================================== */


document.addEventListener(
    "DOMContentLoaded",
    () => {


        /*
           Nombre de ella
        */

        document.getElementById(
            "her-name"
        ).textContent =
            CONFIG.herName;


        /*
           Preparar modal
        */

        const modal =
            document.getElementById(
                "gift-modal"
            );


        modal.addEventListener(
            "click",
            event => {


                if (
                    event.target === modal
                ) {


                    closeGift();

                }

            }
        );


        /*
           Escape para cerrar modal
        */

        document.addEventListener(
            "keydown",
            event => {


                if (
                    event.key === "Escape"
                ) {


                    closeGift();

                }

            }
        );

    }
);
