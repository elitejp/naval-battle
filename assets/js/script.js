const grid = [];
const gridEnemy = [];
const field = document.querySelector(".field");
let shipClass;
let x, y;
let aux = "";
console.log(field);

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

document.addEventListener("click", putShip);
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
        if (ship3Ready) {
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

function shotShip(coordinateX, coordinateY) {
  let element = field.getElementsByClassName(""+coordinateX+coordinateY);
  console.log(element);
  element[0].setAttribute("src", "assets/img/explosion.png");
  grid[coordinateX][coordinateY] = "0";
  let explosionSound = new Audio("assets/sounds/explosion.mp3");
  explosionSound.play();
  console.log(grid);
}

function shotWater(coordinateX, coordinateY) {
  let element = field.getElementsByClassName(""+coordinateX+coordinateY);
  let newSplash = document.createElement("img");

  newSplash.setAttribute("class", ("splash " + coordinateX+coordinateY));
  newSplash.setAttribute("src", `assets/img/splash.png`);
  element[0].appendChild(newSplash);

  let explosionSound = new Audio("assets/sounds/explosion.mp3");
  explosionSound.play();
}

criarGrids();