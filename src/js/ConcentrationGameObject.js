export default class ConcentrationGameObject {
  constructor(cardDeckObjectArray) {
    this.cardDeckObjectArray = cardDeckObjectArray;
    this.selectedPreviousCard = null;
    this.selectedCurrentCard = null;
    this.isComparisonTrue = null;
    this.matchedCardArray = [];
    this.hasVictoryConditionBeenMet = false;
    this.uniqueCardIdSet = null;
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
    if (this.cardDeckObjectArray[this.selectedPreviousCard]["code"] === this.cardDeckObjectArray[this.selectedCurrentCard]["code"]) {
      this.isComparisonTrue = true;
      this.matchedCardArray.push(this.selectedPreviousCard, this.selectedCurrentCard);
      this.victoryCheck();
    } else {
      this.isComparisonTrue = false;
    }
  }

  victoryCheck() {
    this.uniqueCardIdSet = new Set(this.matchedCardArray);
    if (this.uniqueCardIdSet.size == 32) {
      this.hasVictoryConditionBeenMet = true;
    }
  }

  resetSelectionProcess() {
    this.selectedCurrentCard = null;
    this.selectedPreviousCard = null;
    this.isComparisonTrue = null;
  }
}