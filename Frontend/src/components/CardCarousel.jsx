import { useState } from "react";

const CardCarousel = () => {
  const cards = [{ id: 1, name: "card1", color: "#ee4035" }];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("");

  const handleTransition = (direction) => {
    if (transitioning) return;

    setDirection(direction);
    setTransitioning(true);

    setTimeout(() => {
      setTransitioning(false);
      if (direction === "Next") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
      } else if (direction === "Prev") {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
        );
      }
    }, 300);
  };

  // Ensure exactly 5 cards are displayed by repeating them
  const numCards = 5;
  const totalCards = cards.length;

  // Get previous 2 cards, ensuring indices are valid
  const prevCards = [
    cards[(currentIndex - 2 + totalCards) % totalCards],
    cards[(currentIndex - 1 + totalCards) % totalCards],
  ];

  // Get current card
  const currentCard = cards[currentIndex];

  // Get next 2 cards, ensuring indices are valid
  const nextCards = [
    cards[(currentIndex + 1) % totalCards],
    cards[(currentIndex + 2) % totalCards],
  ];

  // Combine and repeat the cards to display exactly 5 cards
  let visibleCards = [...prevCards, currentCard, ...nextCards];

  // Repeat the cards if there are fewer than 5
  while (visibleCards.length < numCards) {
    visibleCards = [...visibleCards, ...cards];
  }

  // Slice the array to ensure exactly 5 cards are shown
  visibleCards = visibleCards.slice(0, numCards);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div>
        <button onClick={() => handleTransition("Prev")}>Prev</button>
        <button onClick={() => handleTransition("Next")}>Next</button>
      </div>

      <div
        className="flex w-full h-full justify-center items-center overflow-hidden"
        style={{
          transition: "transform 0.3s ease",
        }}
      >
        {visibleCards.map((card, index) => (
          <div
            key={`${card.id}-${index}`} // Ensure unique key by appending index
            className={`flex items-center justify-center shrink-0 w-2/3 h-2/3 rounded-3xl`}
            style={{
              transform: transitioning
                ? direction === "Next"
                  ? "translateX(-100%)"
                  : "translateX(100%)"
                : "translateX(0)",
              transition: transitioning && "transform 0.3s ease",
            }}
          >
            <div
              className={`m-2 w-full h-full items-center justify-center flex rounded-3xl bg-neutral-400 shadow-lg ${
                index === 2 ? "scale-100" : "scale-90"
              } transition-transform`}
            >
              {card.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
