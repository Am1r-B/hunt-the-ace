const cardObjectDefinitions = [
  { id: 1, imagePath: "/images/card-KingHearts.png" },
  { id: 2, imagePath: "/images/card-JackClubs.png" },
  { id: 3, imagePath: "/images/card-QueenDiamonds.png" },
  { id: 4, imagePath: "/images/card-AceSpades.png" },
];

const cardBackImgPath = "/images/card-back-blue.png";

let cards;

const playGameButtonElem = document.getElementById("playGame");

const cardContainerElem = document.querySelector(".card-container");

const collapsedGridAreaTemplate = '"a a" "a a"';
const cardCollectionCellClass = ".card-pos-a";

const numCards = cardObjectDefinitions.length;

let cardPositions = [];

/* <div class="card">
  <div class="card-inner">
    <div class="card-front">
      <img src="./images/card-JackClubs.png" alt="" class="card-img" />
    </div>
    <div class="card-back">
      <img src="./images/card-back-Blue.png" alt="" class="card-img" />
    </div>
  </div>
</div> */

loadGame();

function loadGame() {
  createCards();

  cards = document.querySelectorAll(".card");

  playGameButtonElem.addEventListener("click", startGame);
}

function startGame() {
  initializeNewGame();
  startRound();
}

function initializeNewGame() {}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initializeNewRound() {}

function collectCards() {
  transformGridArea(collapsedGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas) {
  cardContainerElem.style.gridTemplateAreas = areas;
}

function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card) => {
    addChildElement(cellPositionElem, card);
  });
}

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  function shuffle() {
    randomizeCardPositions();

    if (shuffleCount === 500) {
      clearInterval(id);
      dealCards();
    } else {
      shuffleCount++;
    }
  }
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards);
  const random2 = Math.floor(Math.random() * numCards);

  const temp = cardPositions[random1];

  cardPositions[random1] = cardPositions[random2];
  cardPositions[random2] = temp;
}
function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}
function returnGridAreasMappedToCardPos() {
  let firstPart = "";
  let secondPart = "";
  let areas = "";

  cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + "a ";
    } else if (cardPositions[index] == 2) {
      areas = areas + "b ";
    } else if (cardPositions[index] == 3) {
      areas = areas + "c ";
    } else if (cardPositions[index] == 4) {
      areas = areas + "d ";
    }

    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = "";
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });
  return `"${firstPart}" "${secondPart}"`;
}

function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}

function createCards() {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function createCard(cardItem) {
  // Create div elements that make up a card
  const cardElem = createElement("div");
  const cardInnerElem = createElement("div");
  const cardFrontElem = createElement("div");
  const cardBackElem = createElement("div");

  // Create front and back image elements for a card
  const cardFrontImg = createElement("img");
  const cardBackImg = createElement("img");

  // Add class and id to card element
  addClassToElement(cardElem, "card");
  addIdToElement(cardElem, cardItem.id);

  // Add class to inner card element
  addClassToElement(cardInnerElem, "card-inner");

  // Add class to front card element
  addClassToElement(cardFrontElem, "card-front");

  // Add class to back card element
  addClassToElement(cardBackElem, "card-back");

  // Add src attribute and appropriate value to img element - back of card
  addSrcToImageElem(cardBackImg, cardBackImgPath);

  // Add src attribute and appropriate value to img element - front of card
  addSrcToImageElem(cardFrontImg, cardItem.imagePath);

  // Assign class to back image element of back of card
  addClassToElement(cardBackImg, "card-img");

  // Assign class to front image element of front of card
  addClassToElement(cardFrontImg, "card-img");

  // Add back image element as child element to back card element
  addChildElement(cardBackElem, cardBackImg);

  // Add back image element as child element to  card element
  addChildElement(cardFrontElem, cardFrontImg);

  // Add back card element as child element to inner card element
  addChildElement(cardInnerElem, cardBackElem);

  // Add front card element as child element to inner card element
  addChildElement(cardInnerElem, cardFrontElem);

  // Add inner card element as child element to card element
  addChildElement(cardElem, cardInnerElem);

  // Add card element as child element to appropriate grid cell
  addCardToGridCell(cardElem);

  initializeCardPositions(cardElem);
}
function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function createElement(elemType) {
  return document.createElement(elemType);
}

function addClassToElement(elem, className) {
  elem.classList.add(className);
}

function addIdToElement(elem, id) {
  elem.id = id;
}

function addSrcToImageElem(imgElem, src) {
  imgElem.src = src;
}

function addChildElement(parentElem, childElem) {
  parentElem.appendChild(childElem);
}

function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);

  const cardPosElem = document.querySelector(cardPositionClassName);

  addChildElement(cardPosElem, card);
}

function mapCardIdToGridCell(card) {
  if (card.id === "1") {
    return ".card-pos-a";
  } else if (card.id === "2") {
    return ".card-pos-b";
  } else if (card.id === "3") {
    return ".card-pos-c";
  } else if (card.id === "4") {
    return ".card-pos-d";
  }
}
