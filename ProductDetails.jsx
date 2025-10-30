import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShoeDetails = async () => {
      try {
        // ✅ Fetch from your local backend proxy
        const response = await fetch(`http://localhost:5000/api/shoes/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch shoe details");
        }

        const data = await response.json();
        console.log("🟢 Shoe Details Response:", data);

        // ✅ Handle different possible data structures
        if (data && typeof data === "object") {
          if (data.shoe) {
            setShoe(data.shoe);
          } else if (Array.isArray(data)) {
            setShoe(data.find((item) => item.id === id) || data[0]);
          } else {
            setShoe(data);
          }
        } else {
          setShoe(null);
        }
      } catch (err) {
        console.error("❌ Error fetching shoe details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoeDetails();
  }, [id]);

  // ✅ Loading state
  if (loading) {
    return (
      <p className="text-center text-blue-600 mt-10 text-xl">
        Loading shoe details...
      </p>
    );
  }

  // ✅ Error state
  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to fetch shoe details. Please try again later.
      </p>
    );
  }

  // ✅ No data found
  if (!shoe) {
    return (
      <p className="text-center text-gray-500 mt-10">
        Shoe not found.
      </p>
    );
  }

  // ✅ Product details display
  return (
    <div className="p-6 max-w-xl mx-auto">
      <img
        src={shoe.image || shoe.imageUrl || "https://via.placeholder.com/300"}
        alt={shoe.name || "Shoe"}
        className="w-full h-80 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{shoe.name || "Unknown Shoe"}</h2>
      <p className="text-gray-600 text-lg mt-2">₹{shoe.price || "N/A"}</p>
      <p className="mt-4 text-gray-700">
        {shoe.description || "No description available."}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ProductDetails;



