export default class ConcentrationGameObject {
  constructor(cardDeckObjectArray) {
    this.cardDeckObjectArray = cardDeckObjectArray;
    this.selectedPreviousCard = null;
    this.selectedCurrentCard = null;
    this.isComparisonTrue = null;
    this.matchedCardArray = [];
    this.previousAndCurrentCardArray = [this.selectedPreviousCard, this.selectedCurrentCard];
    this.hasVictoryConditionBeenMet = false;
  }

  cardSelectAndCompare(cardDivId) {
    if (this.selectedPreviousCard === null) {
      this.selectedPreviousCard = cardDivId;
    } else if (this.selectedCurrentCard === null) {
      this.selectedCurrentCard = cardDivId;
    }
    if (this.selectedPreviousCard != null && this.selectedCurrentCard != null) {
      this.cardComparison();
    }
  }

  cardComparison() {
    if (this.selectedCurrentCard != this.selectedPreviousCard) {
      if (this.cardDeckObjectArray[this.selectedPreviousCard]["code"] === this.cardDeckObjectArray[this.selectedCurrentCard]["code"]) {
        this.isComparisonTrue = true;
        console.log(this.cardDeckObjectArray);
        this.matchedCardArray.push(this.selectedPreviousCard, this.selectedCurrentCard);
        console.log("ComparisonIsTrue", this.isComparisonTrue);
        this.victoryCheck();
      } else {
        this.isComparisonTrue = false;
        console.log("ComparisonIsTrue", this.isComparisonTrue);
        // this.resetSelectionProcess();
      }
    } else {
      this.resetSelectionProcess();
    }
  }

  victoryCheck() {
    let uniqueCardIdSet = new Set(this.matchedCardArray);
    console.log("uniqueCardIdSet", uniqueCardIdSet);
    if (uniqueCardIdSet.length === 103) {
      this.hasVictoryConditionBeenMet = true;
    }
  }

  resetSelectionProcess() {
    this.selectedCurrentCard = null;
    this.selectedPreviousCard = null;
    this.isComparisonTrue = null;
  }
}