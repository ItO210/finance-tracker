const Card = require("../models/cardModel");

exports.createCard = async (req, res) => {
  try {
    const {
      type,
      bankName,
      tier,
      network,
      lastFourDigits,
      expirationDate,
      annualFee,
    } = req.body;
    const card = new Card({
      type,
      bankName,
      tier,
      network,
      lastFourDigits,
      expirationDate,
      annualFee,
    });
    await card.save();
    res.status(201).json({ message: "Card Created Successfully", card });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Creating Card", error: error.message });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const card = await Card.findById(cardId);
    res.status(200).json({ message: "Card Fetched Successfully", card });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Card", error: error.message });
  }
};

exports.getAllCards = async (req, res) => {
  try {
    const cards = await Cards.find();
    res.status(200).json({ message: "Cards Fetched Successfully", cards });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Cards", error: error.message });
  }
};

exports.updateCardById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const {
      type,
      bankName,
      tier,
      network,
      lastFourDigits,
      expirationDate,
      annualFee,
    } = req.body;
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      {
        type,
        bankName,
        tier,
        network,
        lastFourDigits,
        expirationDate,
        annualFee,
      },
      { new: true }
    );
    res.status(200).json({ message: "Card Updated Successfully", updatedCard });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Card", error: error.message });
  }
};

exports.deleteCardById = async (req, res) => {
  try {
    const cardId = req.params.id;
    const deletedCard = await Card.findByIdAndDelete(cardId);
    res.status(200).json({ message: "Card Deleted Successfully", deletedCard });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Card", error: error.message });
  }
};
