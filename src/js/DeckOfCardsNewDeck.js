export default class DeckOfCardsNewDeck {
  static async NewDeckApiCall() {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/`)
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error
    }
  } 
}