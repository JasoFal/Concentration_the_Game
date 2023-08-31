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

function setImageOnFalseBoolTimeOut(object) {
  let imgSelectorFalse = document.getElementById(`img${object.selectedPreviousCard}`);
  const backOfCardImg = "https://deckofcardsapi.com/static/img/back.png";
  imgSelectorFalse.src = backOfCardImg;
  imgSelectorFalse = document.getElementById(`img${object.selectedCurrentCard}`);
  console.log(object.selectedCurrentCard);
  imgSelectorFalse.src = backOfCardImg;
  object.resetSelectionProcess();
}

function setMatchedOnTrueBool(object) {
  let imgSelectorTrue = document.getElementById(`img${object.selectedPreviousCard}`);
  imgSelectorTrue.setAttribute("class", "onCorrectMatch");
  imgSelectorTrue = document.getElementById(`img${object.selectedCurrentCard}`);
  imgSelectorTrue.setAttribute("class", "onCorrectMatch");
  console.log(imgSelectorTrue);
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
          div.addEventListener("click", function eventHandler() {
            if (concentrationGameObject.selectedPreviousCard != null && concentrationGameObject.selectedCurrentCard != null) { return; }
            if (div.id === concentrationGameObject.selectedPreviousCard) { return; }
            if (concentrationGameObject.matchedCardArray.includes(div.id)) { return; }
            concentrationGameObject.cardSelectAndCompare(div.id);
            if (div.class === "onCorrectMatch") { return; }
            img.src = element["image"];
            img.setAttribute("class", "clicked");
            if (concentrationGameObject.isComparisonTrue === true) {
              setMatchedOnTrueBool(concentrationGameObject);
            } else if (concentrationGameObject.isComparisonTrue === false) {
              setTimeout(() => setImageOnFalseBoolTimeOut(concentrationGameObject), 1000);
              let selectImgRemoveClicked = document.querySelector(`#img${concentrationGameObject.selectedPreviousCard}`);
              selectImgRemoveClicked.removeAttribute("class", "clicked");
              selectImgRemoveClicked = document.querySelector(`#img${concentrationGameObject.selectedCurrentCard}`);
              selectImgRemoveClicked.removeAttribute("class", "clicked");
            }
          });
          deckOutputEle.appendChild(div);
        });
      });
    });
  });
});