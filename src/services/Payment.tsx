import { SalePayment } from "../types/Payment";

const API_URL = "https://bkmaferyogurt-production.up.railway.app/api";
//---------------------------------------------------------------- GET SALE
export const fetchSales = async (): Promise<SalePayment[]> => {
  try {
    const response = await fetch(`${API_URL}/sale`);
    const data = await response.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error("No se pudo cargar las ventas");
    }
  } catch (error) {
    throw new Error("Oppss, algo salió mal!");
  }
};
