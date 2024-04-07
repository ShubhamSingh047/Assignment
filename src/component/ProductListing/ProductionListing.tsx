import React, { useContext, useEffect } from "react";
import Loading from "../Loading/Loading";
import ErrorComponent from "../Error/ErrorComponent";
import Product from "./Product";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

interface ProductData {
  productId: string;
  photo: string;
  productName: string;
  categoryName: string;
  brandName: string;
  cost: number;
}

const getCookie = (name: string): string | null => {
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
  const {
    state: { errorState, errorMessage, loading, valid, listing },
    dispatch,
  } = useContext(AppStateContext);

  const url: string = import.meta.env.VITE_API_URL_PRODUCT_LISTING;

  useEffect(() => {
    const productApi = async (): Promise<void> => {
      try {
        const token = getCookie("token");
        if (!token) {
          throw new Error("Token not found in cookies");
        }

        const response = await fetch(`${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.errors);
        }
        const data = await response.json();
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

    if (valid) {
      productApi();
    }
  }, [valid, dispatch, url]);

  if (loading) {
    return <Loading />;
  }

  if (errorState) {
    return <ErrorComponent message={errorMessage} />;
  }

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
