import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DeckOfCardsApi from './js/DeckOfCardsApi';
import ConcentrationGameObject from './js/ConcentrationGameObject';

async function createDeckOfNewCards() {
  const newResponse = await DeckOfCardsApi.newDeckApiCall();
  if (newResponse["deck_id"] && newResponse["deck_id"] != "") {
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

function setImageOnFalseFlagTimeOut(object) {
  let imgSelector = document.getElementById(`img${object.selectedPreviousCard}`);
  const backOfCardImg = "https://deckofcardsapi.com/static/img/back.png";
  imgSelector.src = backOfCardImg;
  imgSelector = document.getElementById(`img${object.selectedCurrentCard}`);
  console.log(object.selectedCurrentCard);
  imgSelector.src = backOfCardImg;
  object.resetSelectionProcess();
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
        cardObjectArray.forEach((element, index) => {
          let div = document.createElement("div");
          div.id = `${index}`;
          div.class = "cardDiv";
          let img = document.createElement("img");
          img.src = "https://deckofcardsapi.com/static/img/back.png";
          img.id = `img${index}`;
          img.alt = "Picture of Card";
          div.appendChild(img);
          div.addEventListener("click", function () {
            if (concentrationGameObject.selectedPreviousCard != null && concentrationGameObject.selectedCurrentCard != null) {return}
              img.src = element["image"];
              concentrationGameObject.cardSelectAndCompare(div.id);
              if (concentrationGameObject.isComparisonTrue === true) {
                console.log("WOO!");
                concentrationGameObject.resetSelectionProcess();
              } else if (concentrationGameObject.isComparisonTrue === false) {
                setTimeout(() => setImageOnFalseFlagTimeOut(concentrationGameObject), 1000);
              }
          });
          deckOutputEle.appendChild(div);
        });
      });
    });
  });
});

//TODO Use CSS filter for card detailing
