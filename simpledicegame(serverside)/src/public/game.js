function sum(dices){
  let sum = 0;
  for(let i =0; i<dices.length; i++){
    if(dices[i]=== 3){
      sum += 0;
    }
    else{
    sum += dices[i];
    }
  }

  return sum;
}

function genComputerdice(input, temp){
  if(temp === undefined || null){
    temp = [];}
  for(let i=0; i<input-temp.length; i++){
    temp.push(Math.floor((Math.random() * 6) + 1));
  }
  if(temp.includes(3)){
    return 3;
  }
  else{
    return temp.reduce((a, b) => Math.min(a, b));
  }
}


function rolldice(){
  return Math.floor((Math.random() * 6) + 1);
}

function check3(number){
  if(number === 3){
    return "0 (3)";
  }
  else{
    return `${number}`;
  }
}

function game(){
  //const content = document.getElementById('content');
  let intro = document.getElementById("intro");
  let game = document.getElementById("game");
  let err = document.getElementById("error-message");
  intro.classList.add("display");

  const gobutton = document.querySelector("button");
  gobutton.addEventListener('click', function(evt){
    intro.classList.remove("display");
    intro.classList.add("none");
    game.classList.toggle("hidden");

    let computerdice = [];
    let userdice = [];

    //input dice
    let input = document.getElementById("diceValues").value;
    let inputdicelist = [];
    //if input exist
    const input1 =[];
    const input2 =[];
    const input3 =[];
    const input4 =[];
    const input5 =[];

    if (input !== ""){
      inputdicelist = input.split(",");
      for(let i =0; i<5; i++){
        if(inputdicelist[i]){
          input1.push(parseInt(inputdicelist[i]));
        }
      }


      for(let i =5; i<9; i++){
        if(inputdicelist[i]){
          input2.push(parseInt(inputdicelist[i]));
        }
      }

      for(let i =9; i<12; i++){
        if(inputdicelist[i]){
          input3.push(parseInt(inputdicelist[i]));
        }
      }

      for(let i =12; i<14; i++){
        if(inputdicelist[i]){
          input4.push(parseInt(inputdicelist[i]));
        }
      }

      for(let i =14; i<15; i++){
        if(inputdicelist[i]){
          input5.push(parseInt(inputdicelist[i]));
        }
      }
    }



    //containers
    let container = document.createElement("container");
    container.className = "container";

    let bcontainer = document.createElement("container");
    bcontainer.className = "container";

    //computerscore div
    let cscore = document.createElement("div");
    cscore.className = "cscore";

    //playerscore div
    let pscore = document.createElement("div");
    pscore.className = "pscore";


    //5 dices
    let d1 = document.createElement("div");
    d1.className = "dice";
    d1.appendChild(document.createTextNode(""));
    let d2 = document.createElement("div");
    d2.className = "dice";
    d2.appendChild(document.createTextNode(""));
    let d3 = document.createElement("div");
    d3.className = "dice";
    d3.appendChild(document.createTextNode(""));
    let d4 = document.createElement("div");
    d4.className = "dice";
    d4.appendChild(document.createTextNode(""));
    let d5 = document.createElement("div");
    d5.className = "dice";
    d5.appendChild(document.createTextNode(""));

    const start = document.createElement("button");
    start.className = "button";
    start.appendChild(document.createTextNode("Start"));

    const roll = document.createElement("button");
    roll.className = "button";
    roll.disabled = true;
    roll.appendChild(document.createTextNode("Roll"));

    const pin = document.createElement("button");
    pin.className = "button";
    pin.disabled = true;
    pin.appendChild(document.createTextNode("Pin"));



    container.appendChild(d1);
    container.appendChild(d2);
    container.appendChild(d3);
    container.appendChild(d4);
    container.appendChild(d5);

    bcontainer.appendChild(start);
    bcontainer.appendChild(roll);
    bcontainer.appendChild(pin);

    game.appendChild(container);
    game.appendChild(bcontainer);

    let possibledice = [d1, d2, d3, d4, d5];
    let selected_dice = [];
    let selecteddicecount = 0;
    start.addEventListener("click", function(evt){

      computerdice.push(genComputerdice(5,input1));
      computerdice.push(genComputerdice(4,input2));
      computerdice.push(genComputerdice(3,input3));
      computerdice.push(genComputerdice(2,input4));
      computerdice.push(genComputerdice(1,input5));

      const computersum = sum(computerdice);

      let cresult = "Computer Score: " + check3(computerdice[0]) + " + " + check3(computerdice[1]) + " + " + check3(computerdice[2])+ " + " + check3(computerdice[3])+ " + "+ check3(computerdice[4])+ " = " + computersum;
      cscore.appendChild(document.createTextNode(cresult));

      let usersum = sum(userdice);

      pscore.appendChild(document.createTextNode("Your Score = " + usersum));
      game.insertBefore(cscore, container);
      game.insertBefore(pscore, container);
      bcontainer.removeChild(start);
      roll.disabled = false;

       //to check roll happened
      roll.addEventListener("click", function(evt){
        for(let i=0; i<possibledice.length; i++){
          possibledice[i].replaceChild(document.createTextNode(rolldice()), possibledice[i].childNodes[0]);
        }
        roll.disabled = true;
        pin.disabled = false;
      });


      d1.addEventListener("click", function(evt){
        if(d1.disabled !== true && roll.disabled === true){
          d1.classList.toggle("clicked");
        }

        else if(d1.disabled !== true && (roll.disabled === false || undefined)){
          err.style.display = "block";

          const ptext = document.querySelector("p");
          ptext.innerHTML = "Do NOT click on the dice when it's blank";
          ptext.style.color = "red";
          const closebutton = document.querySelector("button.closeButton");
          closebutton.style.display = "block";

          closebutton.addEventListener('click', function(evt){
            err.classList.toggle("none");
            err.style.display = "none";
            closebutton.style.display = "none";
            ptext.innerHTML = "";
          });
        }
      });

      d2.addEventListener("click", function(evt){
        if(d2.disabled !== true && roll.disabled === true){
          d2.classList.toggle("clicked");
        }

        else if(d2.disabled !== true && (roll.disabled === false || undefined)){
          err.style.display = "block";

          const ptext = document.querySelector("p");
          ptext.innerHTML = "Do NOT click on the dice when it's blank";
          ptext.style.color = "red";
          const closebutton = document.querySelector("button.closeButton");
          closebutton.style.display = "block";

          closebutton.addEventListener('click', function(evt){
            err.classList.toggle("none");
            err.style.display = "none";
            closebutton.style.display = "none";
            ptext.innerHTML = "";
          });
        }
      });

      d3.addEventListener("click", function(evt){
        if(d3.disabled !== true && roll.disabled === true){
          d3.classList.toggle("clicked");
        }
        else if(d3.disabled !== true && (roll.disabled === false || undefined)){
          err.style.display = "block";

          const ptext = document.querySelector("p");
          ptext.innerHTML = "Do NOT click on the dice when it's blank";
          ptext.style.color = "red";
          const closebutton = document.querySelector("button.closeButton");
          closebutton.style.display = "block";

          closebutton.addEventListener('click', function(evt){
            err.classList.toggle("none");
            err.style.display = "none";
            closebutton.style.display = "none";
            ptext.innerHTML = "";
          });
        }
      });

      d4.addEventListener("click", function(evt){
        if(d4.disabled !== true && roll.disabled === true){
          d4.classList.toggle("clicked");
        }

        else if(d4.disabled !== true && (roll.disabled === false || undefined)){
          err.style.display = "block";

          const ptext = document.querySelector("p");
          ptext.innerHTML = "Do NOT click on the dice when it's blank";
          ptext.style.color = "red";
          const closebutton = document.querySelector("button.closeButton");
          closebutton.style.display = "block";

          closebutton.addEventListener('click', function(evt){
            err.classList.toggle("none");
            err.style.display = "none";
            closebutton.style.display = "none";
            ptext.innerHTML = "";
          });
        }
      });

      d5.addEventListener("click", function(evt){
        if(d5.disabled !== true && roll.disabled === true){
          d5.classList.toggle("clicked");
        }

        else if(d5.disabled !== true && (roll.disabled === false || undefined)){
          err.style.display = "block";

          const ptext = document.querySelector("p");
          ptext.innerHTML = "Do NOT click on the dice when it's blank";
          ptext.style.color = "red";
          const closebutton = document.querySelector("button.closeButton");
          closebutton.style.display = "block";

          closebutton.addEventListener('click', function(evt){
            err.classList.toggle("none");
            err.style.display = "none";
            closebutton.style.display = "none";
            ptext.innerHTML = "";
          });
        }
      });

      pin.addEventListener("click", function(evt){
        //array list of clicked divs
        const clicked = document.querySelectorAll(".clicked");
        if(clicked.length === selecteddicecount){
          err.style.display = "block";

          const ptext = document.querySelector("p");
          ptext.innerHTML = "Pin at least 1 dice";
          ptext.style.color = "red";
          const closebutton = document.querySelector("button.closeButton");
          closebutton.style.display = "block";

          closebutton.addEventListener('click', function(evt){
            err.classList.toggle("none");
            err.style.display = "none";
            closebutton.style.display = "none";
            ptext.innerHTML = "";
          });
        }

        else{
        for(let i =0; i<clicked.length; i++){
          clicked[i].disabled = true; //disable click
          clicked[i].style.backgroundColor = "#696969"; //change to dark gray
          if(!selected_dice.includes(clicked[i])){
            selected_dice.push(clicked[i]); //user's selected dice
            selecteddicecount++;
          }
        }
        const tempvalue = []; //number value of dice

        for(let i =0; i<selected_dice.length; i++){
          const index = possibledice.indexOf(selected_dice[i]);
          if (index >= 0){ //get rid of selected dice from possibledice list
            possibledice.splice(index,1);
          }
          tempvalue.push(parseInt(selected_dice[i].childNodes[0].nodeValue));
        }

        for(let i=0; i<possibledice.length; i++){ //set unselected dice to empty string
          possibledice[i].replaceChild(document.createTextNode(""), possibledice[i].childNodes[0]);
        }

        usersum = sum(tempvalue);
        pscore.childNodes[0].nodeValue = "Your Score = " + usersum;
        roll.disabled = false;
        pin.disabled = true;

        if(possibledice.length===0){
          roll.disabled = true;
          let gameresult = document.createElement("div");
          gameresult.className = "gameresult";

          if(computersum < usersum){ //computerwin
            gameresult.appendChild(document.createTextNode("You Lost!"));
            gameresult.style.color="red";

          }
          else if(computersum > usersum){ //userwin
            gameresult.appendChild(document.createTextNode("You Won!"));
            gameresult.style.color="green";
          }
          else{ //tie
            gameresult.appendChild(document.createTextNode("Tie Game!!"));
            gameresult.style.color="blue";
          }
          game.insertBefore(gameresult, container);

        }
      }
    });

  });
});

}

document.addEventListener('DOMContentLoaded', game);
