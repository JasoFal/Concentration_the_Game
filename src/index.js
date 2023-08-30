import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DeckOfCardsApi from './js/DeckOfCardsApi';
import ConcentrationGameObject from './js/ConcentrationGameObject';

async function createDeckOfNewCards() {
  const newResponse = await DeckOfCardsApi.newDeckApiCall();
  if (newResponse["deck_id"] && newResponse["deck_id"] != "") {
    console.log("newDeck ApiResponse", newResponse);
    return newResponse["deck_id"];
  } else {
    printError(newResponse);
  }
}

async function getFullDeckOfCards(newDeckId) {
  const drawResponse = await DeckOfCardsApi.drawFullDeckOfCards(newDeckId);
  if (drawResponse) {
    return drawResponse;
  } else {
    printError(drawResponse);
  }
}

function printError(error) {
  document.querySelector("#errorMessage").innerText = `There was an error accessing Api: ${error}.`;
}

window.addEventListener("load", function () {
  document.querySelector("#startNewGame").addEventListener("click", function (event) {
    event.preventDefault();
    createDeckOfNewCards().then(function (newDeckId) {
      getFullDeckOfCards(newDeckId).then(function (drawnDeckOfCardsObject) {
        document.querySelector("#startZone").setAttribute("class", "hidden");
        let cardObjectArray = drawnDeckOfCardsObject["cards"];
        const concentrationGameObject = new ConcentrationGameObject(cardObjectArray);
        console.log("Array Of Card Objects", concentrationGameObject.cardDeckObjectArray);
        const deckOutputEle = document.querySelector("#deckOutput");
        const cardBackImg = "https://deckofcardsapi.com/static/img/back.png";
        cardObjectArray.forEach((element, index) => {
          let div = document.createElement("div");
          div.id = `${index}`;
          div.class = "cardDiv";
          let img = document.createElement("img");
          img.src = cardBackImg;
          img.id = `img${index}`;
          img.alt = "Picture of Card";
          div.appendChild(img);
          div.addEventListener("click", function () {
            img.src = element["image"];
            concentrationGameObject.cardSelectAndCompare(div.id);
            if (concentrationGameObject.isComparisonTrue === true) {
              let imgSelector = document.getElementById(`img${concentrationGameObject.selectedPreviousCard}`); 
              console.log("imgSelect1", imgSelector);
              imgSelector.src = cardBackImg;
              imgSelector = document.getElementById(`img${concentrationGameObject.selectedCurrentCard}`);
              console.log("imgSelect2", imgSelector);
              imgSelector.src = cardBackImg;
              concentrationGameObject.resetSelectionProcess();
            }
          });
          deckOutputEle.appendChild(div);
        });
      });
    });
  });
});

//TODO target both divs inside click event
//TODO Use CSS filter
//TODO Will probably have to use EventListener inside the forEach loop
//TODO Onclick want 2 things to happen 1: spit out a div id, 2: reveal card picture
//TODO Create a class for handling card comparison and game mechanics
//TODO

// let divSelect = document.querySelector("div.cardDiv");
// if (concentrationGameObject.selectedCardArray[0] === true) {
//   console.log("wow");
//   divSelect.img = cardBackImg;
//   concentrationGameObject.resetSelectionProcess();
// } else if (concentrationGameObject.sameSelectedCard === false) {
//   divSelect.img = cardBackImg;
//   concentrationGameObject.resetSelectionProcess();
// }

//
// console.log("Divs", div);