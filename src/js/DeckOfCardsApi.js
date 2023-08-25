export default class DeckOfCardsApi {
  static async newDeckApiCall() {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2`);
      const jsonifiedNewDeckResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return jsonifiedNewDeckResponse;
    } catch(error) {
      return error;
    }
  }

  static async drawFullDeckOfCards(deckId) {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=104`);
      const jsonifiedDrawCardResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return jsonifiedDrawCardResponse;
    } catch(error) {
      return error;
    }
  }
}

// ?deck_count=2
// Card draw ?=104