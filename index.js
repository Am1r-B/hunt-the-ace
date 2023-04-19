const cardObjectDefinitions = [
  { id: 1, imagePath: "/images/card-KingHearts.png" },
  { id: 2, imagePath: "/images/card-JackClubs.png" },
  { id: 3, imagePath: "/images/card-QueenDiamonds.png" },
  { id: 4, imagePath: "/images/card-AceSpades.png" },
];

const cardBackImgPath = "/images/card-back-blue.png";

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

createCards();

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
