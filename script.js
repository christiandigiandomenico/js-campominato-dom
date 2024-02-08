const gridElement = document.querySelector("#grid");
const buttonElement = document.querySelector("#start-game");
const difficultyElement = document.querySelector("#difficulty");
const safeCells = document.querySelector("#safe-cells");

buttonElement.addEventListener("click", function () {
    let numeroCaselle = 0;
    const selEle = document.getElementById("difficulty");

    let difficulty = selEle.value;

    let aggClasse = "a";

    if (difficulty == 1) { numeroCaselle = 100; }
    if (difficulty == 2) { aggClasse = "square_81"; numeroCaselle = 81; }
    if (difficulty == 3) { aggClasse = "square_49"; numeroCaselle = 49; }

    gridElement.innerHTML = "";

    const bombList = [];
    const totalBombs = 16;

    while (bombList.length < totalBombs) {
        const randomNumber = Math.floor(Math.random() * numeroCaselle)

        if (!bombList.includes(randomNumber)) {
            bombList.push(randomNumber);
        }
    }

    let gameOver = false;
    let safeClicks = 0;

    for (let i = 1; i <= numeroCaselle; i++) {
        const newElement = document.createElement("div");
        newElement.classList.add("square");
        newElement.classList.add(aggClasse);
        newElement.classList.add("hidden");
        newElement.innerText = i;

        if (bombList.includes(i)) {
            newElement.classList.add("bomb")
            newElement.classList.add("hidden")
        }

        newElement.addEventListener("click", handleCellClick);

        function handleCellClick() {
            if (gameOver) return;
            this.classList.add("active");

            if (!this.classList.contains("clicked") && !this.classList.contains("bomb")) {
                this.classList.remove("hidden");
                this.classList.add("clicked");
                safeClicks++;
                safeCells.innerText = safeClicks;
            }

            if (this.classList.contains("bomb")) {
                this.classList.remove("hidden");
                this.style.backgroundColor = "red";
                console.log("BOOM! Hai colpito una bomba!");
                gameOver = true;

                for (let i = 0; i < numeroCaselle; i++) {
                    const cell = document.querySelector(`.square:nth-child(${i + 1})`);
                    if (bombList.includes(i + 1)) {
                        cell.classList.remove("hidden");
                    }
                }
            } else {
                console.log("Hai cliccato su una casella sicura.");
            }
        }

        gridElement.append(newElement);
    }

    const endMessage = document.createElement("div");
    endMessage.classList.add("message")
    gridElement.append(endMessage);
})