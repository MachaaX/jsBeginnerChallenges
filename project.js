//Challange1: your age in days
function ageInDays() {
    if (document.getElementById("ageInDays") !== null) {
        document.getElementById("ageInDays").remove();
    }
    var birthYear = prompt("what year were you born?");
    if (birthYear===null) {
        return;
    }
    var result = "you are " + ((2021-birthYear)*365) + " days old." ;
    var h1 = document.createElement("h1");
    var text = document.createTextNode(result);
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(text);
    document.getElementById("flex-box1-result").appendChild(h1);
}

function reset() {
    if (document.getElementById("ageInDays") != null) {
        document.getElementById("ageInDays").remove();
    }
}
//Challenge2: Image Generator
function generateImage() {
    var image= document.createElement("img");
    var div = document.getElementById("flex-box2-generator");
    image.src = "img1.jpg";
    image.alt = "image of rubik\'s cube";
    div.appendChild(image);
}
//Challenge3: Rock, Paper, Scissors
var items = {
    "rock" : document.getElementById("rock").src,
    "paper" : document.getElementById("paper").src,
    "scissors" : document.getElementById("scissors").src,
    "isClicked" : false,
};
document.querySelector("#rps-reset-button").addEventListener("click",rpsReset);

function rpsGame(myChoice) {
    botChoice = randomId();
    var div = document.getElementById("rps-generator");
    document.getElementById("rock").remove();
    document.getElementById("paper").remove();
    document.getElementById("scissors").remove();

    var botImage = document.createElement("img");
    botImage.src = items[botChoice];
    botImage.setAttribute('height', "150px");
    botImage.setAttribute('style', "box-shadow: 0px 10px 50px red");
    botImage.alt = "image of human choice";
    var resultText = document.createElement("h2");
    var text = document.createTextNode(message(result_gen(myChoice.id,botChoice))["message"]);
    resultText.appendChild(text);
    resultText.setAttribute("style", "color: "+message(result_gen(myChoice.id,botChoice))["colour"]+"; padding: 30px; font-size:60px;");
    div.innerHTML = " <img src= '" +items[myChoice.id]+"' height = \"150px\" alt = \"image of computer choice\" style=\"box-shadow: 0px 10px 50px blue\" > " ;
    div.appendChild(resultText);
    div.appendChild(botImage);
    items.isClicked = true;    
}
function rpsReset() {
    if(items.isClicked === true){
        let images = document.querySelector("#rps-generator").querySelectorAll("img");
        let h2 = document.querySelector("#rps-generator").querySelectorAll("h2");
        for (let i = 0; i < images.length; i++) {
            images[i].remove();      
        }
        for (let i = 0; i < h2.length; i++) {
            h2[i].remove();      
        }
        let indexData = {
            "0":"rock",
            "1":"paper",
            "2":"scissors",
        }
        let div = document.getElementById("rps-generator");
        div.innerHTML = " <img id=\"rock\" src=\"rps1.png\"  height=\"150px\" alt=\"rock-paper-scissors\" onclick=\"rpsGame(this)\"> " +
                        " <img id=\"paper\" src=\"rps2.png\"  height=\"150px\" alt=\"rock-paper-scissors\" onclick=\"rpsGame(this)\"> " +
                        " <img id=\"scissors\" src=\"rps3.png\"  height=\"150px\" alt=\"rock-paper-scissors\" onclick=\"rpsGame(this)\"> " ;
    }
}

function result_gen(me, bot) {
    var data = {
        "rock" : {"rock":0.5, "paper":0, "scissors":1},
        "paper" : {"rock":1, "paper":0.5, "scissors":0},
        "scissors" : {"rock":0, "paper":1, "scissors":0.5},
    };
    return data[me][bot];
}

function randomId() {
    return ["rock", "paper", "scissors"][Math.floor(Math.random()*3)];
}
function message(score) {
    if (score === 1 ) {
        return {"message": "You Won!","colour": "green"};
    } else if (score === 0) {
        return {"message": "You Lost!","colour": "red"};
    } else{
        return {"message": "You Tied!","colour": "yellow"};
    }
}
//Challange4: Change the colour of All Buttons
var allButtons = document.getElementsByTagName("button");
var copyAllButtons = [];

for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);  
}
function buttonColorChange(choice) {
    
    if (choice.value === "red") {
        buttonRed();
    } else if (choice.value === "green") {
        buttonGreen();
    } else if (choice.value === "reset") {
        buttonReset();
    }else if(choice.value === "random"){
        buttonRandom();
    }
}
function buttonRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}
function buttonGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}
function buttonReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);     
    }
}
function buttonRandom() {
    var choices =  ["btn-primary","btn-danger","btn-warning","btn-success"];
    for (let i = 0; i < allButtons.length; i++) {
        var random = Math.floor(Math.random()*choices.length);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[random]);     
    }
}
//Challlenge5: BlackJack
var blackJackData = {
    "you" : {"scoreSpan": "#your-result-score", "div": "#your-box", "score": 0},
    "dealer" : {"scoreSpan": "#dealer-result-score", "div": "#dealer-box", "score": 0},
    "cards": ["AC", "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC","KC", "QC",
                "AD", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD","KD", "QD",
                "AH", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH","KH", "QH",
                "AS", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS","KS", "QS"],
    "cardsMap": {"AC": [1,11], "2C": 2, "3C": 3, "4C": 4, "5C": 5, "6C": 6, "7C": 7, "8C": 8, "9C": 9, "10C": 10, "JC": 10,"KC": 10, "QC": 10,
                "AD": [1,11], "2D": 2, "3D": 3, "4D": 4, "5D": 5, "6D": 6, "7D": 7, "8D": 8, "9D": 9, "10D": 10, "JD": 10,"KD": 10, "QD": 10,
                "AH": [1,11], "2H": 2, "3H": 3, "4H": 4, "5H": 5, "6H": 6, "7H": 7, "8H": 8, "9H": 9, "10H": 10, "JH": 10,"KH": 10, "QH": 10,
                "AS": [1,11], "2S": 2, "3S": 3, "4S": 4, "5S": 5, "6S": 6, "7S": 7, "8S": 8, "9S": 9, "10S": 10, "JS": 10,"KS": 10, "QS": 10, },
    "wins": 0,
    "losses": 0,
    "draws": 0,
    "isBust":false,
    "isStand": false,
    "isTurnOver": false,
};
const YOU = blackJackData["you"];
const DEALER = blackJackData["dealer"];
const hitAudio = new Audio("sounds/swish.m4a");
const winAudio = new Audio("sounds/cash.mp3");
const lossAudio = new Audio("sounds/aww.mp3");
const drawAudio = new Audio("sounds/draw.mp3");

document.querySelector("#hit-button").addEventListener("click", blackJackHit);
document.querySelector("#deal-button").addEventListener("click", blackJackDeal);
document.querySelector("#stand-button").addEventListener("click", blackJackStand);

function blackJackHit() {
    if (blackJackData.isStand === false && blackJackData.isBust === false) {
        if (document.querySelector(YOU.div).querySelectorAll("img").length === 0) {
            showCard(YOU);
            showCard(YOU);
            showCard(DEALER);        
        }
        else{
            showCard(YOU);
            if(YOU.score > 21){
                showResult(declareWinner());
                blackJackData.isBust = true;
            }
        }
    }
}
async function blackJackStand() {
    if (blackJackData.isStand === false && blackJackData.isBust === false) {
        blackJackData.isStand = true;
        let bestStops = ["16","17"];
        let randomChoice = Math.floor(Math.random()*bestStops.length);
        while (DEALER.score <= bestStops[randomChoice]) {
            showCard(DEALER);
            await sleep(1000);//await is asynchronizing the appearance of dealer cards
        }
        blackJackData.isTurnOver = true;
        showResult(declareWinner());
    }
}
function blackJackDeal() {
    if ((blackJackData.isStand === true && blackJackData.isTurnOver === true) || blackJackData.isBust === true) {
        let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }    
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU["score"] = 0;
        DEALER["score"] = 0;
    
        document.querySelector(YOU.scoreSpan).textContent = 0;
        document.querySelector(DEALER.scoreSpan).textContent = 0;
        document.querySelector(YOU.scoreSpan).style.color = "white";
        document.querySelector(DEALER.scoreSpan).style.color = "white";
        document.querySelector("#blackjack-result").textContent = "Let\'s Play";
        document.querySelector("#blackjack-result").style.color = "black";
    }
    blackJackData.isStand = false;
    blackJackData.isTurnOver = false;
    blackJackData.isBust = false;
}
//sleep function for asynchronizing Stand Button
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}
function showCard(activePlayer) {
    if (activePlayer["score"] < 21) {
        let cardImage = document.createElement("img");
        let card = randomCard();
        cardImage.src = `images/png/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        hitAudio.play();
        updateScore(card,activePlayer);
        showScore(activePlayer);
    }
}
function randomCard() {
    return blackJackData["cards"][Math.floor(Math.random()*52)];
}
function updateScore(card,activePlayer) {
    if(card === "AC" || card === "AD" || card === "AH" || card === "AS"){
        if ((activePlayer["score"] + blackJackData["cardsMap"][card][1]) <= 21) {
            activePlayer["score"] += blackJackData["cardsMap"][card][1];
        } else {
            activePlayer["score"] += blackJackData["cardsMap"][card][0];
        }
    }else {
        activePlayer["score"] += blackJackData["cardsMap"][card];
    }
}
function showScore(activePlayer) {
    if (activePlayer["score"] >21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST!";
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red" ;
    } else{
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"];
    }
}
function declareWinner() {
    let winner;
    if (YOU.score <= 21) {
        if (YOU.score === DEALER.score) {
            winner = null;
            blackJackData.draws++;
        } else if((YOU.score > DEALER.score) || (DEALER.score > 21)){
            winner = YOU;
            blackJackData.wins++;
        } else if ((YOU.score < DEALER.score) && (DEALER.score <= 21)) {
            winner = DEALER;
            blackJackData.losses++;
        }
    } else {
        winner = DEALER;
        blackJackData.losses++;
    }
    return winner;
}
function showResult(winner) {
    let message, msgColour;
    if (winner === YOU) {
        message = "You Won!";
        msgColour = "green";
        document.querySelector("#wins").textContent = blackJackData.wins;
        document.querySelector("#wins").style.color = msgColour;
        winAudio.play();
    } else if (winner === DEALER) {
        message = "You Lost!";
        msgColour = "red";
        document.querySelector("#losses").textContent = blackJackData.losses;
        document.querySelector("#losses").style.color = msgColour;
        lossAudio.play();
    } else if(winner === null){
        message = "You Drew!";
        msgColour = "black";
        document.querySelector("#draws").textContent = blackJackData.draws;
        document.querySelector("#draws").style.color = msgColour;
        drawAudio.play();
        
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = msgColour;
}
