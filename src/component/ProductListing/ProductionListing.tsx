import React, { useContext, useEffect } from "react";
import Loading from "../Loading/Loading";
import ErrorComponent from "../Error/ErrorComponent";
import Product from "./Product";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

// Define the interface for product data
interface ProductData {
  productId: string;
  photo: string;
  productName: string;
  categoryName: string;
  brandName: string;
  cost: number;
}

const getCookie = (name: string): string | null => {
  // Function to get cookie by name from document
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
};

const ProductionListing: React.FC = () => {
  // Accessing global state and dispatch function using useContext
  const {
    state: { errorState, errorMessage, loading, valid, listing },
    dispatch,
  } = useContext(AppStateContext);

  // API URL for product listing
  const url: string = import.meta.env.VITE_API_URL_PRODUCT_LISTING;

  // Fetch product listing from API on component mount
  useEffect(() => {
    const productApi = async (): Promise<void> => {
      try {
        // Get token from cookies
        const token = getCookie("token");
        if (!token) {
          throw new Error("Token not found in cookies");
        }

        // Fetch product listing with token
        const response = await fetch(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response is OK
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.errors);
        }

        // Parse response data
        const data = await response.json();

        // If API call is successful, update global state with product listing
        if (data.success) {
          dispatch({
            type: "product/listing",
            payload: data.catalogueResponse,
          });
        } else {
          // Handle incorrect password scenario
          dispatch({
            type: "error",
            payload: {
              errorState: true,
              loading: false,
              errorMessage: "Something went Wrong try again later !",
            },
          });
        }
      } catch (error) {
        // Dispatch error if API call fails
        dispatch({
          type: "error",
          payload: {
            errorState: true,
            loading: false,
            errorMessage: error.message,
          },
        });
      }
    };

    // Fetch product listing only if valid state is true
    if (valid) {
      productApi();
    }
  }, [valid, dispatch, url]);

  // Show loading component while data is being fetched
  if (loading) {
    return <Loading />;
  }

  // Show error component if there is an error
  if (errorState) {
    return <ErrorComponent message={errorMessage} />;
  }

  // Render product listing
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {listing &&
          listing.map((data: ProductData) => (
            <div key={data.productId} className="mb-4">
              <div className="bg-white rounded-md shadow-md overflow-hidden h-full bg-gray-100">
                <Product product={data} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductionListing;
