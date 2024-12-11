document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    function createBoard() {
        const totalCells = 360;
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;


            // Definir tipo de casilla
            if (i === 0) {
                cell.classList.add("start");
                cell.textContent = "Salida";
            } else if (i === totalCells - 1) {
                cell.classList.add("finish");
                cell.textContent = "Meta";
            } else if ((i + 1) % 7 === 0 || (i + 1) % 7 === 6) {
                cell.classList.add("weekend");
                cell.textContent = "FDS";
            } else {
                cell.classList.add("numbered");
                cell.textContent = i + 1;
            }

            board.appendChild(cell);
        }
    }

    createBoard();
});
