// Sudoku Generator Class
class Sudoku {
    constructor(N, K) {
        this.N = N;
        this.K = K;
        const SRNd = Math.sqrt(N);
        this.SRN = Math.floor(SRNd);
        this.mat = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
    }

    fillValues() {
        this.fillDiagonal();
        this.fillRemaining(0, this.SRN);
        this.removeKDigits();
    }

    fillDiagonal() {
        for (let i = 0; i < this.N; i += this.SRN) {
            this.fillBox(i, i);
        }
    }

    unUsedInBox(rowStart, colStart, num) {
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                if (this.mat[rowStart + i][colStart + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    fillBox(row, col) {
        let num = 0;
        for (let i = 0; i < this.SRN; i++) {
            for (let j = 0; j < this.SRN; j++) {
                while (true) {
                    num = this.randomGenerator(this.N);
                    if (this.unUsedInBox(row, col, num)) {
                        break;
                    }
                }
                this.mat[row + i][col + j] = num;
            }
        }
    }

    randomGenerator(num) {
        return Math.floor(Math.random() * num + 1);
    }

    checkIfSafe(i, j, num) {
        return (
            this.unUsedInRow(i, num) &&
            this.unUsedInCol(j, num) &&
            this.unUsedInBox(i - (i % this.SRN), j - (j % this.SRN), num)
        );
    }

    unUsedInRow(i, num) {
        for (let j = 0; j < this.N; j++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    unUsedInCol(j, num) {
        for (let i = 0; i < this.N; i++) {
            if (this.mat[i][j] === num) {
                return false;
            }
        }
        return true;
    }

    fillRemaining(i, j) {
        if (i === this.N - 1 && j === this.N) {
            return true;
        }
        if (j === this.N) {
            i += 1;
            j = 0;
        }
        if (this.mat[i][j] !== 0) {
            return this.fillRemaining(i, j + 1);
        }
        for (let num = 1; num <= this.N; num++) {
            if (this.checkIfSafe(i, j, num)) {
                this.mat[i][j] = num;
                if (this.fillRemaining(i, j + 1)) {
                    return true;
                }
                this.mat[i][j] = 0;
            }
        }
        return false;
    }

    removeKDigits() {
        let count = this.K;
        while (count !== 0) {
            let i = Math.floor(Math.random() * this.N);
            let j = Math.floor(Math.random() * this.N);
            if (this.mat[i][j] !== 0) {
                count--;
                this.mat[i][j] = 0;
            }
        }
    }
}

var arr = [[], [], [], [], [], [], [], [], []];

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);
    }
}

var board = [[], [], [], [], [], [], [], [], []];

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j];
            } else {
                arr[i][j].innerText = '';
            }
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
    let N = 9;
    let K = 40;
    let sudoku = new Sudoku(N, K);
    sudoku.fillValues();
    board = sudoku.mat;
    FillBoard(board);
};

SolvePuzzle.onclick = () => {
    SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
    if (i === n) {
        FillBoard(board);
        return true;
    }

    if (j === n) {
        return SudokuSolver(board, i + 1, 0, n);
    }

    if (board[i][j] !== 0) {
        return SudokuSolver(board, i, j + 1, n);
    }

    for (let num = 1; num <= 9; num++) {
        if (isValid(board, i, j, num, n)) {
            board[i][j] = num;
            if (SudokuSolver(board, i, j + 1, n)) {
                return true;
            }
            board[i][j] = 0;
        }
    }

    return false;
}

function isValid(board, row, col, num, n) {
    for (let x = 0; x < n; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }

    let startRow = row - row % 3, startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }

    return true;
}
