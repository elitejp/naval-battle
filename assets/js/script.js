const grid = [];
const gridEnemy = [];
const field = document.querySelector(".field");
const fieldEnemy = document.querySelector(".field-enemy");
let shipClass;
let x, y;
let aux = ""; // Auxiliar para colocar Navio - Estado do "colocamento"
let gameStatus = "preGame"
console.log(field);

let splashSound = new Audio("assets/sounds/splash.mp3");
let explosionSound = new Audio("assets/sounds/explosion.mp3");

function criarGrids() {
  for (let i=0;i<8; i++) {
    grid[i] = [];
    gridEnemy[i] = [];
    for (let j=0;j<8; j++) {
      grid[i].push("0");
      gridEnemy[i].push("0");
      let divGrid = document.createElement("div");
      divGrid.setAttribute("class", `${i}${j}`);
      field.appendChild(divGrid);
      let divGridEnemy = document.createElement("div");
      divGridEnemy.setAttribute("class", `${i}${j}`);
      fieldEnemy.appendChild(divGridEnemy);
    }
  }
  console.log(grid);
}

function resetGrids() {
  for (let i=0;i<8; i++) {
    for (let j=0;j<8; j++) {
      grid[i][j] = "0"
      gridEnemy[i][j] = "0"
    }
  }
}

if (gameStatus == "preGame") {
  document.addEventListener("click", putShip);
}
let itemClicked;
let ship1Ready, ship2Ready, ship3Ready, ship4Ready, ship5Ready = false;
function putShip(event) {
  itemClicked = event.target;
  console.log(itemClicked.tagName);

  if (itemClicked.tagName == "LI") {
    shipClass = itemClicked.className;

    switch (shipClass) {
      case "ship1":
        if (ship1Ready) {
          alert("Ja posicionou esse Navio");
          aux = "shipNotGet";
        } else {aux = "getShip"}
        break;
      case "ship2":
        if (ship2Ready) {
          alert("Ja posicionou esse Navio");
          aux = "shipNotGet";
        } else {aux = "getShip"}
        break;
      case "ship3":
        if (ship3Ready) {
          alert("Ja posicionou esse Navio");
          aux = "shipNotGet";
        } else {aux = "getShip"}
        break;
      case "ship4":
        if (ship4Ready) {
          alert("Ja posicionou esse Navio");
          aux = "shipNotGet";
        } else {aux = "getShip"}
        break;
      case "ship5":
        if (ship5Ready) {
          alert("Ja posicionou esse Navio");
          aux = "shipNotGet";
        } else {aux = "getShip"}
        break;
    }
  }

  if (itemClicked.tagName == "DIV") {
    x = parseInt(itemClicked.className[0]);
    y = parseInt(itemClicked.className[1]);

    if (aux == "getShip") {
      for (let i=1; i<=5; i++) {
        switch (shipClass) {
          case "ship1":
            if ((i<=1) && (grid[x][(y+i-1)] != "0")) {
              aux = "putFail";
            }
            break;
            case "ship2":
              if ((i<=2) && (grid[x][(y+i-1)] != "0")) {
                aux = "putFail";
              }
              break;
            case "ship3":
              if ((i<=3) && (grid[x][(y+i-1)] != "0")) {
                aux = "putFail";
              }
              break;
            case "ship4":
              console.log(x+" - "+y);
              if ((i<=4) && (grid[x][(y+i-1)] != "0")) {
                aux = "putFail";
              }
              break;
            case "ship5":
              if ((grid[x][(y+i-1)] != "0")&&(i<=3)) {
                aux = "putFail";
              }
              if ((x+i-3)<8){
                if ((i>3)&&(grid[(x+i-3)][(y+1)] != "0")) {
                  aux = "putFail";
                }
              } else {
                aux = "putFail";
              }
              break;
        }
      }
    }

    if (aux == "getShip") {
      aux = "putShip"
      switch (shipClass) {
        case "ship1":
          let newShip = document.createElement("img");
          let fieldTarget = field.getElementsByClassName(""+x+(y));
          newShip.setAttribute("class", ("ship1-1" + ` ${x}${y}`));
          newShip.setAttribute("src", `assets/img/ship1-1.png`);
          fieldTarget[0].appendChild(newShip);
          grid[x][y] = "1";
          ship1Ready = true;
          break;
        case "ship2":
          for (let i=1;i<=2;i++) {
            let newShip = document.createElement("img");
            let fieldTarget = field.getElementsByClassName(""+x+(y+i-1));
            newShip.setAttribute("class", ("ship2-"+i + ` ${x}${(y+i-1)}`));
            newShip.setAttribute("src", `assets/img/ship2-${i}.png`);
            fieldTarget[0].appendChild(newShip);
            grid[x][(y+i-1)] = "1";
          }
          ship2Ready = true;
          break;
        case "ship3":
          for (let i=1;i<=3;i++) {
            let newShip = document.createElement("img");
            let fieldTarget = field.getElementsByClassName(""+x+(y+i-1));
            newShip.setAttribute("class", ("ship3-"+i + ` ${x}${(y+i-1)}`));
            newShip.setAttribute("src", `assets/img/ship3-${i}.png`);
            fieldTarget[0].appendChild(newShip);
            grid[x][(y+i-1)] = "1";
          }
          ship3Ready = true;
          break;
        case "ship4":
          for (let i=1;i<=4;i++) {
            let newShip = document.createElement("img");
            let fieldTarget = field.getElementsByClassName(""+x+(y+i-1));
            newShip.setAttribute("class", ("ship4-"+i + ` ${x}${(y+i-1)}`));
            newShip.setAttribute("src", `assets/img/ship4-${i}.png`);
            fieldTarget[0].appendChild(newShip);
            grid[x][(y+i-1)] = "1";
          }
          ship4Ready = true;
          break;
        case "ship5":
          for (let i=1;i<=5;i++) {
            let newShip = document.createElement("img");
            newShip.setAttribute("src", `assets/img/ship5-${i}.png`);
            if (i<=3) {
              let fieldTarget = field.getElementsByClassName(""+x+(y+i-1));
              newShip.setAttribute("class", ("ship5-"+i + ` ${x}${(y+i-1)}`));
              fieldTarget[0].appendChild(newShip);
              grid[x][(y+i-1)] = "1";
            } else {
              let fieldTarget = field.getElementsByClassName(""+(x+i-3)+(y+1));
              newShip.setAttribute("class", ("ship5-"+i + ` ${(x+i-3)}${(y+1)}`));
              fieldTarget[0].appendChild(newShip);
              grid[(x+i-3)][(y+1)] = "1";
            }
          }
          ship5Ready = true;
          break;
      }
    } else {aux == "putFail" ? "": aux = "shipNotGet";}

    if (aux == "putFail") {
      alert("Não foi possível inserir o Navio, tente novamente");
      aux = "getShip";
    }
    aux == "shipNotGet" ? alert("Não foi selecionado um Navio") : undefined;
  }
}

function shotShip(coordinateX, coordinateY, fieldAtk) {
  let element = fieldAtk.getElementsByClassName(""+coordinateX+coordinateY);
  
  element[1].setAttribute("src", "assets/img/explosion.png");
  grid[coordinateX][coordinateY] = "-2";

  if (fieldAtk.className == "field-enemy") {
    let newExplosion = document.createElement("img");
    newExplosion.setAttribute("class", ("explosion " + coordinateX+coordinateY));
    newExplosion.setAttribute("src", `assets/img/explosion.png`);
    element[0].appendChild(newExplosion);
  }

  explosionSound.play();
  console.log(grid);
}

function shotWater(coordinateX, coordinateY, fieldAtk) {
  let element = fieldAtk.getElementsByClassName(""+coordinateX+coordinateY);
  let newSplash = document.createElement("img");

  newSplash.setAttribute("class", ("splash " + coordinateX+coordinateY));
  newSplash.setAttribute("src", `assets/img/splash.png`);
  element[0].appendChild(newSplash);

  splashSound.play();
}


function putEnemyShip(shipEnemy) {
  let xEnemy = Math.round(Math.random()*7);
  let yEnemy = Math.round(Math.random()*7);
  let auxEnemy = "putFail"
  
  while (auxEnemy == "putFail") {
    xEnemy = Math.round(Math.random()*7);
    yEnemy = Math.round(Math.random()*7);
    auxEnemy = "putShip";
    for (let i=1; i<=5; i++) {
      switch (shipEnemy) {
        case "ship1":
          if ((i<=1) && (gridEnemy[xEnemy][(yEnemy+i-1)] != "0")) {
            auxEnemy = "putFail";
          }
          break;
        case "ship2":
          if ((i<=2) && (gridEnemy[xEnemy][(yEnemy+i-1)] != "0")) {
            auxEnemy = "putFail";
          }
          break;
        case "ship3":
          if ((i<=3) && (gridEnemy[xEnemy][(yEnemy+i-1)] != "0")) {
            auxEnemy = "putFail";
          }
          break;
        case "ship4":
          if ((i<=4) && (gridEnemy[xEnemy][(yEnemy+i-1)] != "0")) {
            auxEnemy = "putFail";
          }
          break;
        case "ship5":
          if ((gridEnemy[xEnemy][(yEnemy+i-1)] != "0")&&(i<=3)) {
            auxEnemy = "putFail";
          }
          if ((xEnemy+i-3)<8){
            if ((i>3)&&(gridEnemy[(xEnemy+i-3)][(yEnemy+1)] != "0")) {
              auxEnemy = "putFail";
            }
          } else {
            auxEnemy = "putFail";
          }
          break;
      }
    }
  }

  if (auxEnemy == "putShip") {
    console.log("test");
    switch (shipEnemy) {
      case "ship1":
        gridEnemy[xEnemy][yEnemy] = "1";
        break;
      case "ship2":
        for (let i=1;i<=2;i++) {
          gridEnemy[xEnemy][(yEnemy+i-1)] = "2";
        }
        break;
      case "ship3":
        for (let i=1;i<=3;i++) {
          gridEnemy[xEnemy][(yEnemy+i-1)] = "3";
        }
        break;
      case "ship4":
        for (let i=1;i<=4;i++) {
          gridEnemy[xEnemy][(yEnemy+i-1)] = "4";
        }
        break;
      case "ship5":
        for (let i=1;i<=5;i++) {
          if (i<=3) {
            gridEnemy[xEnemy][(yEnemy+i-1)] = "5";
          } else {
            gridEnemy[(xEnemy+i-3)][(yEnemy+1)] = "5";
          }
        }
        break;
    }
  }
}

criarGrids();
putEnemyShip("ship1");
putEnemyShip("ship2");
putEnemyShip("ship3");
putEnemyShip("ship4");
putEnemyShip("ship5");