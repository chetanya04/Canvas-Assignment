import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import Modal from "react-modal";
import { ArcherContainer, ArcherElement } from "react-archer";
import "./index.css";

const Canvas = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const addCard = () => {
    const newCard = {
      id: cards.length,
      text: "This is some dummy text that will be partially shown,Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati ipsa quis, in neque ratione illum voluptate incidunt, hic quos totam ipsum, sit impedit reprehenderit beatae deleniti fugit quae tempora numquam! Corrupti blanditiis quo fuga, hic amet ratione voluptas ab obcaecati quaerat modi fugiat maxime ut, nisi quod ipsa ipsum?",
      x: 100,
      y: 100,
      width: 200,
      height: 100,
    };
    setCards([...cards, newCard]);
  };

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="canvas-container">
      <button onClick={addCard}>Add Card</button>
      <ArcherContainer strokeColor="black">
        {cards.map((card, index) => (
          <Draggable key={card.id} defaultPosition={{ x: card.x, y: card.y }}>
            <ResizableBox
              width={card.width}
              height={card.height}
              minConstraints={[100, 50]}
              maxConstraints={[400, 300]}
              onResize={(e, data) => console.log("Resizing", data)}
              onResizeStop={(e, data) => console.log("Resize stopped", data)}
              handle={<span className="custom-handle" />}
              handleSize={[10, 10]}
            >
              <ArcherElement
                id={`card-${card.id}`}
                relations={
                  index > 0
                    ? [
                        {
                          targetId: `card-${index - 1}`,
                          targetAnchor: "top",
                          sourceAnchor: "bottom",
                          style: { strokeColor: "blue", strokeWidth: 1 },
                        },
                      ]
                    : []
                }
              >
                <div className="card">
                  <p>
                    {card.text.substring(0, 20)}...{" "}
                    <button onClick={() => openModal(card)}>Show More</button>
                  </p>
                </div>
              </ArcherElement>
            </ResizableBox>
          </Draggable>
        ))}
      </ArcherContainer>
      {selectedCard && (
        <Modal isOpen={true} onRequestClose={closeModal}>
          <h2>Card Details</h2>
          <p>{selectedCard.text}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default Canvas;
