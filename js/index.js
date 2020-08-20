document.addEventListener("DOMContentLoaded", function () {
  console.log("Lets mine some bombs");

  let rows = parseInt(document.querySelector('select[name="rows"]').value);
  let cols = parseInt(document.querySelector('select[name="cols"]').value);

  const mines = (rows * cols) / 4;

  let minesArr = new Array([]);

  const initArr = (m, n, arr) => {
    for (let i = 0; i < m; i++) {
      arr[i] = [];
      for (let j = 0; j < n; j++) {
        arr[i][j] = -1;
      }
    }
  };

  const colSelectField = document.querySelector('select[name="cols"]');
  const rowSelectField = document.querySelector('select[name="rows"]');

  colSelectField.addEventListener("change", (e) => {
    const updatedCols = e.target.value;
    cols = updatedCols;

    newGame();
  });

  rowSelectField.addEventListener("change", (e) => {
    const updatedRows = e.target.value;
    rows = updatedRows;

    newGame();
  });

  document.querySelector(".reset-btn ").addEventListener("click", function () {
    newGame();
    document.querySelector(".game-over").classList.remove("is-active");
  });

  const mineWrapper = document.querySelector("#minesweeper");

  const createBoxes = (arr, m, n) => {
    mineWrapper.style.width = `${26 * cols}px`;

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        const box = document.createElement("div");
        box.setAttribute("class", "minebox");
        box.setAttribute("data-index", `${i}-${j}`);

        if (arr[i][j]) {
          box.innerHTML = arr[i][j];
        } else {
          box.innerHTML = "";
        }

        if (arr[i][j] === 0) {
          box.addEventListener("click", (e) => {
            e.target.classList.add("revealed");
            // revealBoxValue(minesArr, i, j);
          });
        } else if (arr[i][j] !== "💣") {
          box.addEventListener("click", (e) => {
            e.target.classList.add("revealed");
          });
        } else if (arr[i][j] == "💣") {
          box.addEventListener("click", (e) => {
            e.target.classList.add("revealed");
            revealAllBombs();
          });
        }

        mineWrapper.append(box);
      }
    }
  };

  const placeMines = (arr, num, rows, cols) => {
    let count = 0;
    while (count < num) {
      const rowValue = getRandomInt(rows);
      const colValue = getRandomInt(cols);

      if (arr[rowValue][colValue] != 9) {
        arr[rowValue][colValue] = "💣";
        count++;
      }
    }
  };

  const revealAllBombs = () => {
    const boxes = document.querySelectorAll(".minebox");

    boxes.forEach((box) => {
      if (box.innerHTML === "💣") {
        box.classList.add("revealed");
      }
    });

    document.querySelector(".game-over").classList.add("is-active");
  };

  const setBoxValues = (arr, x, y) => {
    calculateEachBoxValue(arr);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  function calculateEachBoxValue(matrix) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        var cnt = 0;
        if (matrix[i][j] !== "💣") {
          if (i > 0) {
            if (matrix[i - 1][j] === "💣") {
              cnt += 1;
            }
            if (matrix[i - 1][j + 1] === "💣") {
              cnt += 1;
            }
            if (matrix[i - 1][j - 1] === "💣") {
              cnt += 1;
            }
          }
          if (i < matrix.length - 1) {
            if (matrix[i + 1][j] === "💣") {
              cnt += 1;
            }
            if (matrix[i + 1][j + 1] === "💣") {
              cnt += 1;
            }
            if (matrix[i + 1][j - 1] === "💣") {
              cnt += 1;
            }
          }

          if (matrix[i][j + 1] === "💣") {
            cnt += 1;
          }

          if (matrix[i][j - 1] === "💣") {
            cnt += 1;
          }

          matrix[i][j] = cnt;
        }
      }
    }
  }

  function revealBoxValue(matrix, i, j) {
    document
      .querySelector(`.minebox[data-index="${i}-${j}"]`)
      .classList.add("revealed");
    matrix[i][j] = -1;
    if (i > 0) {
      if (matrix[i - 1][j] === "💣") {
        //Do nothing
      } else if (matrix[i - 1][j] === 0) {
        revealBoxValue(matrix, i - 1, j);
      } else {
        //Reveal it
        document
          .querySelector(`.minebox[data-index="${i - 1}-${j}"]`)
          .classList.add("revealed");
      }

      if (matrix[i - 1][j + 1] === "💣") {
        //Do nothing
      } else if (matrix[i - 1][j + 1] === 0) {
        revealBoxValue(matrix, i - 1, j + 1);
      } else {
        //Reveal it
        document
          .querySelector(`.minebox[data-index="${i - 1}-${j + 1}"]`)
          .classList.add("revealed");
      }

      if (matrix[i - 1][j - 1] === "💣") {
        //Do nothing
      } else if (matrix[i - 1][j - 1] === 0) {
        revealBoxValue(matrix, i - 1, j - 1);
      } else {
        //Reveal it
        document
          .querySelector(`.minebox[data-index="${i - 1}-${j - 1}"]`)
          .classList.add("revealed");
      }
    }

    if (i < matrix.length - 1) {
      if (matrix[i + 1][j - 1] === "💣") {
        //Do nothing
      } else if (matrix[i + 1][j - 1] === 0) {
        revealBoxValue(matrix, i + 1, j - 1);
      } else {
        //Reveal it
        document
          .querySelector(`.minebox[data-index="${i + 1}-${j - 1}"]`)
          .classList.add("revealed");
      }

      if (matrix[i + 1][j] === "💣") {
        //Do nothing
      } else if (matrix[i + 1][j] === 0) {
        revealBoxValue(matrix, i + 1, j);
      } else {
        //Reveal it
        document
          .querySelector(`.minebox[data-index="${i + 1}-${j}"]`)
          .classList.add("revealed");
      }

      if (matrix[i + 1][j + 1] === "💣") {
        //Do nothing
      } else if (matrix[i + 1][j + 1] === 0) {
        revealBoxValue(matrix, i + 1, j + 1);
      } else {
        //Reveal it
        document
          .querySelector(`.minebox[data-index="${i + 1}-${j + 1}"]`)
          .classList.add("revealed");
      }
    }

    if (matrix[i][j + 1] === "💣") {
      //Do nothing
    } else if (matrix[i][j + 1] === 0) {
      revealBoxValue(matrix, i, j + 1);
    } else {
      //Reveal it
      document
        .querySelector(`.minebox[data-index="${i}-${j + 1}"]`)
        .classList.add("revealed");
    }

    if (matrix[i][j - 1] === "💣") {
      //Do nothing
    } else if (matrix[i][j - 1] === 0) {
      revealBoxValue(matrix, i, j - 1);
    } else {
      //Reveal it
      document
        .querySelector(`.minebox[data-index="${i}-${j - 1}"]`)
        .classList.add("revealed");
    }
  }

  const newGame = () => {
    document.querySelector(".mines-container").innerHTML = "";

    initArr(rows, cols, minesArr);
    placeMines(minesArr, mines, rows, cols);
    setBoxValues(minesArr, rows, cols);
    createBoxes(minesArr, rows, cols);
  };

  newGame();
});
