"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";
import UpdateModal from "@/components/UpdateModal/UpdateModal";

const BookingsPage = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const loadData = async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch(
          `http://localhost:3000/my-bookings/api/${session.user.email}`
        );
        const data = await res.json();
        if (data?.mybookings && Array.isArray(data.mybookings)) {
          setBookings(data.mybookings);
        } else {
          console.error("mybookings not found or not an array in response");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      loadData();
    }
  }, [status, session]);

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const deleted = await fetch(
      `http://localhost:3000/my-bookings/api/booking/${id}`,
      {
        method: "DELETE",
      }
    );
    const res = await deleted.json();
    if (res?.response?.deletedCount > 0) {
      toast.success("Service deleted successfully");
      loadData();
    }
  };

  return (
    <div className="m-6 md:m-12">
      <h1 className="text-white text-3xl font-bold flex justify-center items-center">
        My Bookings
      </h1>
      <div className="mt-12">
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-left text-sm font-light">
            <thead className="bg-gray-700 text-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Book Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Writer Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings?.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.bookName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.writerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      ${booking.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <button onClick={() => handleEdit(booking)}>
                        <MdOutlineModeEdit className="text-xl text-blue-500 hover:text-blue-700" />
                      </button>
                      <button onClick={() => handleDelete(booking._id)}>
                        <FiTrash className="text-xl text-red-500 hover:text-red-700 ms-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center px-6 py-4 text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <UpdateModal
          booking={selectedBooking}
          onClose={() => {
            setShowModal(false);
            loadData(); // Reload the data when modal closes
          }}
        />
      )}
    </div>
  );
};

export default BookingsPage;
