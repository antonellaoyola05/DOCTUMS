document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const rollDiceButton = document.getElementById("rollDice");
    const diceResult = document.getElementById("diceResult");
    const eventCard = document.getElementById('eventCard');
    const closeCard = document.getElementById('closeCard');
    const eventDescription = document.getElementById('eventDescription');
    const eventLevel = document.getElementById('eventLevel');
    const cantidadJugadores = parseInt(localStorage.getItem('cantidadJugadores')) || 2;
    const volverMenuButton = document.getElementById('volverMenu');
    const cells = document.querySelectorAll(".cell");

    const players = [];
    for (let i = 0; i < cantidadJugadores; i++) {
        players.push({ name: ` ${i + 1}`,
        position: 0,
        piece: null,
        class: `player${i + 1}`,
        budget: 5000 // Presupuesto inicial
     });
    }

    let currentPlayerIndex = 0;

    // Ejemplo de tarjetas de eventos
    const events = [
        {
            level: 1,
            description: "El equipo enfrenta un problema técnico menor.",
            efficiency: "Capacidad para gestionar cambios",
            success: "+2 puntos en eficiencia.",
            failure: "Pierdes $500 del presupuesto."
        },
        {
            level: 2,
            description: "Un cliente importante solicita una solución urgente.",
            efficiency: "Conocimiento del negocio y de sus desafíos",
            success: "Ganas $1000 de presupuesto adicional.",
            failure: "Pierdes un turno por reconfiguración."
        },
        // Agregar más eventos...
    ];
    

    // Lógica para inicializar y mostrar los jugadores en el tablero
    players.forEach(player => {
        const piece = document.createElement('div');
        piece.classList.add('piece', player.class);
        // Coloca la ficha en la casilla inicial
        document.getElementById('board').children[0].appendChild(piece);
        player.piece = piece;
    });

    

    // Lanzar dados
    rollDiceButton.addEventListener("click", () => {
        const diceRolls = [];
        let totalRoll = 0;
    
        // Lanzar 5 dados
        for (let i = 0; i < 5; i++) {
            const roll = Math.floor(Math.random() * 6) + 1; // Generar número entre 1 y 6
            diceRolls.push(roll);
            totalRoll += roll;
        }
        // Mostrar resultados
    diceResult.innerHTML = `
    <p class="player">Jugador ${players[currentPlayerIndex].name} lanzó: ${diceRolls.join(", ")}</p>
    <p class="player">Total: ${totalRoll}</p>
    <p class="player">Presupuesto actual: $${players[currentPlayerIndex].budget}</p>
    `;
 // Mover al jugador según el total de los dados
 movePlayer(players[currentPlayerIndex], totalRoll);

        // Pasar turno
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    });

    cells.forEach((cell, index) => {
        if (index % 6 !== 0 && !cell.classList.contains("weekend")) {
            cell.classList.add("numbered");
            cell.textContent = index % 6 || 6; // Asignar números del 1 al 6
        }
    });
    

    // Agrega el evento de clic
    volverMenuButton.addEventListener('click', () => {
    // Aplica la clase fade-out para la transición
    document.body.classList.add('fade-out');
        
        // Redirige a index.html y recarga la página
        window.location.href = 'index.html';
    });


    // Mover jugador
    function movePlayer(player, steps) {
        const currentCell = board.children[player.position];
        player.position = Math.min(player.position + steps, 359);
        const nextCell = board.children[player.position];

        currentCell.removeChild(player.piece); // Remover ficha de la casilla actual
        nextCell.appendChild(player.piece); // Agregar ficha a la nueva casilla

        checkEvent(nextCell);
    }
    // Revisar eventos
    function checkEvent(cell) {

        if (cell.classList.contains("start")) {
            console.log("Casilla de salida: no hay evento.");
            return;
        }
    
        if (cell.classList.contains("finish")) {
            alert("¡Felicidades! Llegaste a la meta.");
            return;
        }

        if (cell.classList.contains("numbered")) {
            const eventLevelNumber = parseInt(cell.textContent) % 6 || 6; // Nivel entre 1 y 6
            const event = events.find(e => e.level === eventLevelNumber);

            showEvent(event);
        } else if (cell.classList.contains("weekend")) {
            // Casilla de fin de semana: no hacer nada
            console.log("Casilla de fin de semana: no hay evento.");

        } else if (cell.classList.contains("finish")) {
            alert("¡Felicidades! Llegaste a la meta.");

        }
    }

    

    function showEvent(event) {
        if (event) {
            document.getElementById("eventLevel").textContent = event.level;
            document.getElementById("eventDescription").textContent = event.description;
            document.getElementById("eventEfficiency").textContent = event.efficiency || "N/A";
            document.getElementById("successResult").textContent = event.success || "Beneficio no definido.";
            document.getElementById("failureResult").textContent = event.failure || "Consecuencia no definida.";
    
            // Mostrar el modal
            document.getElementById("eventModal").classList.remove("hidden");
       }
    }

// Cerrar el modal al hacer clic en el botón de cierre
document.getElementById("closeEventButton").addEventListener("click", () => {
document.getElementById("eventModal").classList.add("hidden");

});
 const eventModal = document.getElementById("eventModal");
    if (eventModal) {
        eventModal.classList.add("hidden"); // Oculta el modal
    } else {
        console.error("No se encontró el modal del evento.");
    }

    console.log("Jugadores inicializados con presupuesto:");
 players.forEach(player => console.log(`${player.name} - Presupuesto: $${player.budget}`));

});



 