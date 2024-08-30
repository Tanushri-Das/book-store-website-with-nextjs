"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { MdOutlineModeEdit } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import Link from "next/link";
import { toast } from "react-toastify";

const BookingsPage = () => {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);

  const loadData = async () => {
    if (session?.user?.email) {
      try {
        const res = await fetch(
          `http://localhost:3000/my-bookings/api/${session.user.email}`
        );
        const data = await res.json();
        console.log("API Response:", data);

        if (data?.mybookings && Array.isArray(data.mybookings)) {
          setBookings(data.mybookings);
          console.log("Bookings set:", data.mybookings);
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

  useEffect(() => {
    console.log("Bookings state:", bookings);
  }, [bookings]);
  const handleDelete = async (id) => {
    const deleted = await fetch(
      `http://localhost:3000/my-bookings/api/booking/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(deleted);
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
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <Link href={`/my-bookings/update/${booking._id}`}>
                        <button>
                          <MdOutlineModeEdit className="text-xl text-blue-500 hover:text-blue-700" />
                        </button>
                      </Link>
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
    </div>
  );
};

export default BookingsPage;
