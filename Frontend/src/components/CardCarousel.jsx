import { useEffect, useState } from "react";

const CardCarousel = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:3000/cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCards(data.cards); // Extract the cards array from the response
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCards();
  }, []);

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

  // Only proceed if there are cards in the array
  if (cards.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading cards...</p>
      </div>
    );
  }

  const numCards = 5;
  const totalCards = cards.length;

  // Get previous 2 cards, ensuring indices are valid
  const prevCards = [
    cards[(currentIndex - 2 + totalCards) % totalCards],
    cards[(currentIndex - 1 + totalCards) % totalCards],
  ];

  const currentCard = cards[currentIndex];

  const nextCards = [
    cards[(currentIndex + 1) % totalCards],
    cards[(currentIndex + 2) % totalCards],
  ];

  let visibleCards = [...prevCards, currentCard, ...nextCards];

  while (visibleCards.length < numCards) {
    visibleCards = [...visibleCards, ...cards];
  }

  visibleCards = visibleCards.slice(0, numCards);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      <div className="flex w-full h-full justify-center items-center overflow-hidden">
        {visibleCards.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            className={`flex items-center justify-center shrink-0 w-2/3 h-2/3 rounded-3xl ${
              transitioning === false && index === 2 && "w-[80%] h-[80%]"
            }`}
            style={{
              transform: transitioning
                ? direction === "Next"
                  ? "translateX(-100%)"
                  : "translateX(100%)"
                : "translateX(0)",
              transition: transitioning && "transform 0.3s ease",
            }}
            onClick={() => {
              if (index === 1) {
                handleTransition("Prev");
              } else if (index === 3) {
                handleTransition("Next");
              }
            }}
          >
            <div
              className={`m-2 w-full h-full items-center justify-center flex rounded-3xl bg-neutral-400 shadow-lg`}
            >
              {card.bankName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
