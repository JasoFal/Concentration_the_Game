import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import DeckOfCardsNewDeck from './js/DeckOfCardsNewDeck';

async function createDeckOfNewCards() {
  const response = await DeckOfCardsNewDeck.newDeckApiCall();
  if (response["deck_id"] && response["deck_id"] != "") {
    console.log(response);
    return response["deck_id"];
  } else {
    printError(response);
  }
}

function printError(error) {
  document.querySelector("#errorMessage").innerText = `There was an error accessing Api: ${error}.`;
}

window.addEventListener("load", function() {
  document.querySelector("#startNewGame").addEventListener("click", function (event) {
    event.preventDefault();
    createDeckOfNewCards().then(function(newDeckId) {
      console.log(newDeckId);
    });
  });
});

// Make next call to grab entire deck// getFullDeckOfCards
// 