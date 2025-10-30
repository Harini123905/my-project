import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [shoes, setShoes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        // ✅ Fetch from your backend server
       const response = await fetch("http://localhost:5050/api/shoes");
;

        if (!response.ok) {
          throw new Error("Failed to fetch shoes");
        }

        const data = await response.json();
        console.log("🟢 API Response:", data);

        // ✅ Handle different possible data formats
        if (Array.isArray(data)) {
          setShoes(data);
        } else if (data.shoes && Array.isArray(data.shoes)) {
          setShoes(data.shoes);
        } else if (data.results && Array.isArray(data.results)) {
          setShoes(data.results);
        } else {
          console.warn("⚠️ Unexpected data format:", data);
          setShoes([]);
        }
      } catch (err) {
        console.error("❌ Error fetching shoes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  // ✅ Loading and error messages
  if (loading) {
    return (
      <p className="text-center text-blue-600 mt-10 text-xl">
        Loading shoes...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to fetch shoes. Please try again later.
      </p>
    );
  }

  // ✅ Display the shoes list
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Shoe Collection
      </h1>

      {shoes.length === 0 ? (
        <p className="text-center text-gray-500">No shoes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shoes.map((shoe, index) => (
            <div
              key={shoe.id || index}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={shoe.image || shoe.imageUrl || "https://via.placeholder.com/150"}
                alt={shoe.name || "Shoe"}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">
                {shoe.name || "Unknown Shoe"}
              </h2>
              <p className="text-gray-600">
                ₹{shoe.price || "N/A"}
              </p>
              <button
                onClick={() => navigate(`/product/${shoe.id || index}`)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;










        




