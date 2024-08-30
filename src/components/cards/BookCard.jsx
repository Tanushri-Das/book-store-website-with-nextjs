"use client";
import Image from "next/image";
import React, { useState } from "react";
import BookingModal from "../shared/BookingModal";

const BookCard = ({ book }) => {
  const { book_name, writer_name, image, price } = book || {};
  const [showModal, setShowModal] = useState(false);

  const handleAddToCartClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookingSubmit = async (newBooking) => {
    const res = await fetch(
      "http://localhost:3000/my-bookings/api/new-booking",
      {
        method: "POST",
        body: JSON.stringify(newBooking),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    console.log("booking", res);
    handleCloseModal();
  };

  return (
    <div className="card card-compact border border-[#E8E8E8]">
      <div className="w-full h-[210px] rounded-lg overflow-hidden p-4">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt="Service Card"
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="card-body">
        <h2 className="card-title">{book_name}</h2>
        <h2 className="card-text">{writer_name}</h2>
        <div className="card-actions justify-between items-center">
          <h5 className="text-[20px] text-primary font-semibold">
            Price: ${price}
          </h5>
          <button className="btn btn-accent" onClick={handleAddToCartClick}>
            Add to Cart
          </button>
        </div>
      </div>
      {showModal && (
        <BookingModal
          book={book}
          onClose={handleCloseModal}
          onSubmit={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default BookCard;
