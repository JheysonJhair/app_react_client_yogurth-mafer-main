import {
  CountResponse,
  PaymentCounts,
  DateRange,
  Sale,
  SalesResponse,
} from "../types/Report";

const API_BASE_URL = "https://bkmaferyogurt-production.up.railway.app/api/";

//----------------------------------------------------------------------------- GET COUNT SALES
export async function fetchPaymentCounts(): Promise<PaymentCounts> {
  try {
    const response = await fetch(`${API_BASE_URL}sale/counts`);

    if (!response.ok) {
      throw new Error("Error al obtener los totales");
    }

    const data: CountResponse = await response.json();

    if (data.success) {
      return {
        numerUser: parseInt(data.count.numerUser, 10),
        numberProducts: parseInt(data.count.numberProducts, 10),
        numberProductsSold: parseInt(data.count.numberProductsSold, 10),
        result: data.count.result.map((item: string | number) =>
          typeof item === "string" ? parseInt(item, 10) : item
        ),
      };
    } else {
      throw new Error("Error en la respuesta de la API");
    }
  } catch (error) {
    console.error("Error al obtener los totales:", error);
    throw new Error("Ocurrió un error al obtener los totales");
  }
}

//----------------------------------------------------------------------------- GET SALE BY DATE RANGE
export async function fetchSalesByDateRange(
  startDate: string,
  endDate: string
): Promise<Sale[]> {
  const requestBody: DateRange = {
    StartDate: startDate,
    EndDate: endDate,
  };

  try {
    const response = await fetch(`${API_BASE_URL}sale/getSalesByDateRange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Error al obtener las ventas");
    }

    const data: SalesResponse = await response.json();

    if (data.success) {
      return data.data;
    } else {
      throw new Error("Error en la respuesta de la API");
    }
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    throw new Error("Ocurrió un error al obtener las ventas");
  }
}
