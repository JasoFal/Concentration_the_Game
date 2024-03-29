export default class DeckOfCardsApi {
  static async newDeckApiCall() {
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2&cards=AS,AC,AD,AH,KS,KC,KD,KH,QS,QC,QD,QH,JS,JC,JD,JH`);
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
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=32`);
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
