export default class ConcentrationGameObject {
  constructor(cardDeckObjectArray) {
    this.cardDeckObjectArray = cardDeckObjectArray;
    this.selectedPreviousCard = null;
    this.selectedCurrentCard = null;
    this.isComparisonTrue = null;
  }

  cardSelectAndCompare(cardDivId) {
    if (this.selectedPreviousCard === null) {
      this.selectedPreviousCard = cardDivId;
    } else if (this.selectedCurrentCard === null) {
      this.selectedCurrentCard = cardDivId;
    }
    console.log(this.cardDeckObjectArray[this.selectedPreviousCard]["code"]);
    // console.log(this.cardDeckObjectArray[this.selectedCurrentCard]["code"]);
    if (this.selectedCurrentCard != null) {
      if (this.cardDeckObjectArray[this.selectedPreviousCard]["code"] == this.cardDeckObjectArray[this.selectedCurrentCard]["code"]) {
        this.isComparisonTrue = true;
        this.cardDeckObjectArray.splice(this.selectedPreviousCard, 1);
        this.cardDeckObjectArray.splice(this.selectedCurrentCard, 1);
        console.log(this.cardDeckObjectArray);
        this.resetSelectionProcess();
      } else {
        this.isComparisonTrue = false;  
        console.log(this.isComparisonTrue);
        this.resetSelectionProcess();
      }
    }
  }

  resetSelectionProcess() {
    this.selectedCurrentCard = null;
    this.selectedPreviousCard = null;
    this.sameSelectedCard = null;
  }
}

// Unused Code 
// if (this.selectedCardArray.length <= 1) {
//   this.selectedPreviousCard = cardDivId;
// }