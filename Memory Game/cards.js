//J.Proctor
//04/13/2020
//CGS2829.OM1

// Edited by Andrew Alvarez 4/21/2020
// My bedroom with a beer


var numCardsSelector = document.getElementById("num_cards");
var numCards = 8;

var deckArray = new Array();
var flippedCardsArray = new Array();
var matchedCards = 0;
var playerNameInput = document.getElementById("player_name");
var playerName = '';
playerNameInput.onchange = () => {
    playerName = playerNameInput.value;
    document.getElementById("player_name_from_input").innerText = playerName;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function clearBoard() {
    let tbody = document.getElementById('cards_table');
    tbody.innerHTML = '';
    matchedCards = 0;
    document.getElementById("score").innerText = 0;
};
function shuffleDeck(numCards) {
    for (var i = 0; i < numCards/2; i++) {
        let cardImage =  `images/card_${i + 8%8}.png`;
        deckArray.push(cardImage);
        deckArray.push(cardImage);
    }

    for (var i = 0; i < numCards; i++) {
        let shuffledCard = deckArray.pop();
        deckArray.splice(getRandomInt(deckArray.length), 0, shuffledCard);
    }

    for (var i = 0; i < numCards; i++) {
        console.log(deckArray[i]);
	}
};
function dealCards(numcards) {
    let table = document.getElementById("cards_table");
    for (var i = 0; i < numcards/8; i++) {
        let row = table.insertRow();
        for (var j = 0; j < 8; j++) {
            let cell = row.insertCell();
            let cellData = document.createElement('img');
            //cellData.src = deckArray[j + i * 8];
            cellData.src = "images/back.png";
            cellData.id = "playerCard" + (j + i * 8);
            cellData.onclick = () => {
                flipCard(cellData);
            };
            cell.appendChild(cellData);
		}
       
    }

};
function flipCard(cellData) {
    console.log(flippedCardsArray.length);
    if (flippedCardsArray.length == 2) { }
    else {
        let cardIndex = parseInt(cellData.id.replace('playerCard', ''));
        cellData.src = deckArray[cardIndex];
        flippedCardsArray.push(cardIndex);
        if (flippedCardsArray.length == 2) {
            if (deckArray[flippedCardsArray[0]] == deckArray[flippedCardsArray[1]]) {
                window.setTimeout(
                    () => {
                        console.log(deckArray[flippedCardsArray[0]]);
                        console.log(deckArray[flippedCardsArray[1]]);
                    },
                    1000);
                flippedCardsArray.pop();
                flippedCardsArray.pop();
                matchedCards += 2;
                document.getElementById("score").innerText = matchedCards / 2;
            }
            else {
                window.setTimeout(
                    () => {
                        document.getElementById("playerCard" + flippedCardsArray[0]).src = "images/back.png";
                        document.getElementById("playerCard" + flippedCardsArray[1]).src = "images/back.png";
                        flippedCardsArray.pop();
                        flippedCardsArray.pop();
                    },
                    1000);
            }
        }
    }
};

function setupGame(numCards) {
    shuffleDeck(numCards);
    dealCards(numCards);
};

// setup game with user input on settings
let saveSettingsBtn = document.getElementById("save_settings");
saveSettingsBtn.onclick = () => {
    clearBoard();
    numCardsSelector.onchange = () => {
        numCards = numCardsSelector.value;
    };
    setupGame(numCards);
};

// default start with 8 cards
setupGame(32);
