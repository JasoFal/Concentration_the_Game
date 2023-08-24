import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DeckOfCardsApi from './js/DeckOfCardsApi';

async function createDeckOfNewCards() {
  const newResponse = await DeckOfCardsApi.newDeckApiCall();
  if (newResponse["deck_id"] && newResponse["deck_id"] != "") {
    console.log(newResponse);
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
        const cardObjectArray = drawnDeckOfCardsObject["cards"];
        cardObjectArray.forEach((element, index) => {
          let div = document.createElement(`div`);
          div.id = `${index}`;
          // addDiv(index);
          console.log(element);
          console.log(div);
        });
      });
    });
  });
});

// let img = document.createElement("img");
// img.src = "https://deckofcardsapi.com/static/img/back.png";
