"use client";
import { useSession } from "next-auth/react";
import React from "react";

const BookingModal = ({ book, onClose, onSubmit }) => {
  const { data } = useSession();
  console.log("user details", data);

  const { book_name, writer_name, price, _id } = book || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      email: data?.user?.email,
      name: data?.user?.name,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
      bookName: book_name,
      writerName: writer_name,
      bookID: _id,
      price: price,
    };
    onSubmit(newBooking);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={data?.user?.name || ""}
              readOnly
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={data?.user?.email || ""}
              readOnly
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              required
              className="w-full mt-1 p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
