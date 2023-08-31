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

function setImageOnComparisonFalseTimeOut(object) {
  let imgSelectorFalse = document.getElementById(`img${object.selectedPreviousCard}`);
  const backOfCardImg = "https://deckofcardsapi.com/static/img/back.png";
  imgSelectorFalse.src = backOfCardImg;
  imgSelectorFalse = document.getElementById(`img${object.selectedCurrentCard}`);
  imgSelectorFalse.src = backOfCardImg;
  object.resetSelectionProcess();
}

function setMatchedOnComparisonTrue(object) {
  let imgSelectorTrue = document.getElementById(`img${object.selectedPreviousCard}`);
  imgSelectorTrue.setAttribute("class", "onCorrectMatch");
  imgSelectorTrue = document.getElementById(`img${object.selectedCurrentCard}`);
  imgSelectorTrue.setAttribute("class", "onCorrectMatch");
  object.resetSelectionProcess();
}

function removeClickedClassOnComparisonFalse(object) {
  let selectImgRemoveClicked = document.querySelector(`#img${object.selectedPreviousCard}`);
  selectImgRemoveClicked.removeAttribute("class", "clicked");
  selectImgRemoveClicked = document.querySelector(`#img${object.selectedCurrentCard}`);
  selectImgRemoveClicked.removeAttribute("class", "clicked");
}

function divAndImgCreation(index) {
  let createDiv = document.createElement("div");
  createDiv.id = `${index}`;
  createDiv.class = "cardDiv";
  let createImg = document.createElement("img");
  createImg.src = "https://deckofcardsapi.com/static/img/back.png";
  createImg.id = `img${index}`;
  createImg.alt = "Picture of Card";
  return [createDiv, createImg];
}

function showVictoryAndHideDomGameElements() {
  document.querySelector("#deckOutput").setAttribute("class", "hidden");
  document.querySelector("#victoryScreen").removeAttribute("class", "hidden");
}

window.addEventListener("load", function () {
  document.querySelector("#startNewGame").addEventListener("click", function (event) {
    event.preventDefault();
    createDeckOfNewCards().then(function (newDeckId) {
      getFullDeckOfCards(newDeckId).then(function (drawnDeckOfCardsObject) {
        document.querySelector("#startZone").setAttribute("class", "hidden");
        let cardObjectArray = drawnDeckOfCardsObject["cards"];
        const concentrationGameObject = new ConcentrationGameObject(cardObjectArray);
        const deckOutputEle = document.querySelector("#deckOutput");
        cardObjectArray.forEach((element, index) => {
          let div = divAndImgCreation(index)[0];
          let img = divAndImgCreation(index)[1];
          div.appendChild(img);
          div.addEventListener("click", function () {
            if (concentrationGameObject.selectedPreviousCard != null && concentrationGameObject.selectedCurrentCard != null) { return; }
            if (div.id === concentrationGameObject.selectedPreviousCard) { return; }
            if (concentrationGameObject.matchedCardArray.includes(div.id)) { return; }
            concentrationGameObject.cardSelectAndCompare(div.id);
            if (div.class === "onCorrectMatch") { return; }
            img.src = element["image"];
            img.setAttribute("class", "clicked");
            if (concentrationGameObject.isComparisonTrue === true) {
              setMatchedOnComparisonTrue(concentrationGameObject);
            } else if (concentrationGameObject.isComparisonTrue === false) {
              setTimeout(() => setImageOnComparisonFalseTimeOut(concentrationGameObject), 1000);
              removeClickedClassOnComparisonFalse(concentrationGameObject);
              concentrationGameObject.resetSelectionProcess();
            }
            if (concentrationGameObject.hasVictoryConditionBeenMet === true) {
              showVictoryAndHideDomGameElements();
              document.querySelector("#playAgain").addEventListener("click", function () {
                window.location.reload();
              });
            }
          });
          deckOutputEle.appendChild(div);
        });
      });
    });
  });
});