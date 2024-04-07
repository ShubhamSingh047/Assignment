import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import ErrorComponent from "../Error/ErrorComponent";
import Product from "./Product";

const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

const ProductionListing = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const token = getCookie("token");
        if (!token) {
          throw new Error("Token not found in cookies");
        }

        const response = await fetch(
          "https://kiosk-backend.nutritap.in/api/catalogue/get?clientId=25&cid=22",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product listing");
        }

        const data = await response.json();
        setListing(data.catalogueResponse);
        setError(false);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message={error} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {listing.map((data) => (
        <Product key={data.productId} product={data} />
      ))}
    </div>
  );
};

export default ProductionListing;
