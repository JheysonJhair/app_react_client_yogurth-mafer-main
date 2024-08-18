import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { FaCalendarAlt } from "react-icons/fa";

import { fetchPaymentCounts, fetchSalesByDateRange } from "../services/Reports";

export function HomePage() {
  const [datosPayment, setDatosPayment] = useState<any>(null);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [salesData, setSalesData] = useState<any[]>([]);

  //----------------------------------- MONTH
  useEffect(() => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );

    setStartDate(firstDayOfMonth.toISOString().split("T")[0]);
    setEndDate(lastDayOfMonth.toISOString().split("T")[0]);
  }, []);

  //---------------------------------------------------------------- GET DATA PAYMENT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentCountResponse = await fetchPaymentCounts();
        if (paymentCountResponse) {
          setDatosPayment(paymentCountResponse);
        }
        if (startDate && endDate) {
          await handleFilter();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startDate, endDate]);

  const dataMultiLinea = {
    series: [
      {
        name: "Clientes",
        data: datosPayment ? datosPayment.result : [],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: salesData.map((item) => {
          const [year, month] = item.SaleDate.split("-");
          const date = new Date(parseInt(year), parseInt(month) - 1, 1);
          return date.toLocaleString("default", { month: "long" });
        }),
      },
      legend: {
        position: "top",
      },
    } as ApexOptions,
  };
  //---------------------------------------------------------------- FILTER - POST SALES DATE RANGE
  const handleFilter = async () => {
    try {
      const sales = await fetchSalesByDateRange(startDate, endDate);
      setSalesData(sales);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  return (
    <div className="page-content">
      <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 className="mb-3 mb-md-0">Reportes</h4>
        </div>
        <div className="d-flex align-items-center flex-wrap text-nowrap">
          <div
            className="input-group flatpickr wd-200 me-2 mb-2 mb-md-0"
            id="dashboardDate"
          >
            <span
              className="input-group-text input-group-addon bg-transparent border-danger"
              data-toggle
            >
              <FaCalendarAlt className="text-danger" />
            </span>
            <input
              type="date"
              className="form-control bg-transparent border-danger"
              placeholder="Fecha inicio"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div
            className="input-group flatpickr wd-200 me-2 mb-2 mb-md-0"
            id="dashboardDate"
          >
            <span
              className="input-group-text input-group-addon bg-transparent border-danger"
              data-toggle
            >
              <FaCalendarAlt className="text-danger" />
            </span>
            <input
              type="date"
              className="form-control bg-transparent border-danger"
              placeholder="Fecha fin"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary btn-icon-text mb-2 mb-md-0"
            onClick={handleFilter}
          >
            <i className="btn-icon-prepend" data-feather="download-cloud" />
            Filtrar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-12 stretch-card">
          <div className="row flex-grow-1">
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">Productos vendidos</h6>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">
                        {datosPayment ? datosPayment.numberProductsSold : "0"}
                      </h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>Totales</span>
                          <i data-feather="arrow-up" className="icon-sm mb-1" />
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div id="customersChart" className="mt-md-3 mt-xl-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">Cantidad de clientes</h6>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">
                        {datosPayment ? datosPayment.numerUser : "0"}
                      </h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>Totales</span>
                          <i data-feather="arrow-up" className="icon-sm mb-1" />
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div id="customersChart" className="mt-md-3 mt-xl-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-baseline">
                    <h6 className="card-title mb-0">Cantidad de productos</h6>
                  </div>
                  <div className="row">
                    <div className="col-6 col-md-12 col-xl-5">
                      <h3 className="mb-2">
                        {datosPayment ? datosPayment.numberProducts : "0"}
                      </h3>
                      <div className="d-flex align-items-baseline">
                        <p className="text-success">
                          <span>Totales</span>
                          <i data-feather="arrow-up" className="icon-sm mb-1" />
                        </p>
                      </div>
                    </div>
                    <div className="col-6 col-md-12 col-xl-7">
                      <div id="customersChart" className="mt-md-3 mt-xl-0" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-lg-12 d-flex">
          <div className="card radius-10 w-100">
            <div className="card-header">
              <div className="d-flex align-items-center">
                <div>
                  <h6 className="mb-0">Productos vendidos por mes</h6>
                </div>
              </div>
            </div>
            <div className="card-body">
              <Chart
                options={dataMultiLinea.options}
                series={dataMultiLinea.series}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Ventas</h6>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre</th>

                      <th>Apellido</th>
                      <th>Tipo de pago</th>
                      <th>Modalidad de compra</th>
                      <th>Total</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map((sale, index) => (
                      <tr key={index}>
                        <td>{sale.SaleDate}</td>
                        <td>{sale.FirstName}</td>
                        <td>{sale.LastName}</td>
                        <td>
                          {sale.ShippingMethod ? "Recojo en tienda" : "Envio"}
                        </td>
                        <td>{sale.PaymentMethod ? "Izipay" : "Yape"}</td>
                        <td>{sale.Total}</td>
                        <td
                          className={
                            sale.Process
                              ? "text-success font-weight-bold"
                              : "text-warning font-weight-bold"
                          }
                        >
                          {sale.Process ? "Pagado" : "Proceso"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
