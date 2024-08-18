import { Product, ApiResponse } from "../types/Product";

const API_URL = "https://bkmaferyogurt-production.up.railway.app/api/product";

//---------------------------------------------------------------- POST PRODUCT
export const addProduct = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/insert`, {
      method: "POST",
      body: formData,
    });

    const result: ApiResponse = await response.json();

    if (!response.ok) {
      throw new Error(result.msg || "Failed to insert product.");
    }

    return result;
  } catch (error) {
    return { msg: (error as Error).message, success: false };
  }
};

//---------------------------------------------------------------- GET PRODUCTS
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.msg || "No se pudo cargar los productos");
    }

    return result.data;
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};

//---------------------------------------------------------------- DELETE PRODUCT
export const deleteProduct = async (
  productId: string
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/Delete/${productId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    const result: ApiResponse = await response.json();
    return result;
  } catch (error) {
    return { msg: (error as Error).message, success: false };
  }
};

//---------------------------------------------------------------- UPDATE PRODUCT
export const updateProduct = async (
  formData: FormData
): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_URL}/Update`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      throw new Error(result.msg);
    }

    return result;
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw new Error("No se pudo actualizar el producto");
  }
};
