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

//TODO Bug is caused by the thing getting stuck on if condition adding a if that stops it immediately if cards are the same
//TODO Want to create feature that stops user from clicking card again if card has already been matched probably will be some sort of id selection maybe taken from the SET object
//TODO Create End Screen for game over condition with play again feature a maybe goal is probably a counter for how many moves taken or time spent an accuracy counter would be neat
//TODO 