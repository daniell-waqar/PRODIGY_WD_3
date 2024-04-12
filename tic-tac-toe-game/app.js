const newGameBtn = document.querySelector("#new-btn");
const resetBtn = document.querySelector("#reset-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
let boxes = document.querySelectorAll('.Box');
let turnO = true;
let count = 0; // To Track Draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    boxes.forEach(box => {
        box.innerText = ''; 
        box.classList.remove('winning-box'); // Remove winning-box class
        box.disabled = false; // Enable boxes
    });
};


const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
    });
};

const showWinner = (winner, pattern) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();

    pattern.forEach(index => {
        boxes[index].classList.add('winning-box');
    });
};


const checkWinner = () => {
    for (let pattern of winPatterns) {
        let boxVal1 = boxes[pattern[0]].innerText;
        let boxVal2 = boxes[pattern[1]].innerText;
        let boxVal3 = boxes[pattern[2]].innerText;

        if (boxVal1 !== '' && boxVal1 === boxVal2 && boxVal1 === boxVal3) {
            showWinner(boxVal1, pattern);
            return true;
        }
    }
};

// Event listeners for each box
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (box.innerText === '') { // Check if box is empty before proceeding
            if (turnO) {
                box.innerText = 'O';
                turnO = false;
            } else {
                box.innerText = 'X';
                turnO = true;
            }
            box.disabled = true;
            count++;

            let isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
