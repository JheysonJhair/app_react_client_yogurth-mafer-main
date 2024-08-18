import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { fetchSales } from "../../../services/Payment";
import { SalePayment } from "../../../types/Payment";
import "../styles.css";

const Payment: React.FC = () => {
  const [izipayPayments, setIzipayPayments] = useState<SalePayment[]>([]);
  const [yapePayments, setYapePayments] = useState<SalePayment[]>([]);
  const [modalImage, setModalImage] = useState<string | null>(null);

  //---------------------------------------------------------------- GET SALES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sales = await fetchSales();
        const izipay = sales.filter((sale) => sale.PaymentMethod);
        const yape = sales.filter((sale) => !sale.PaymentMethod);
        setIzipayPayments(izipay);
        setYapePayments(yape);
      } catch (error) {
        Swal.fire("Error", "Opps, algo salio mal", "error");
      }
    };

    fetchData();
  }, []);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="page-content">
      <nav className="page-breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Ventas</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            IZIPAY - YAPE
          </li>
        </ol>
      </nav>
      <div className="container mt-4">
        <div className="payment-container">
          <div className="table-container">
            <h4 className="mb-4">Pagos realizados con IziPay</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Método de compra</th>
                  <th>Método de pago</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {izipayPayments.map((payment) => (
                  <tr key={payment.IdSales}>
                    <td>{payment.SaleDate}</td>
                    <td>
                      {payment.ShippingMethod ? "Recojo en tienda" : "Envio"}
                    </td>
                    <td>{payment.PaymentMethod ? "Izipay" : "Yape"}</td>
                    <td>{payment.Total}</td>
                    <td
                      className={
                        payment.Process
                          ? "text-success font-weight-bold"
                          : "text-warning font-weight-bold"
                      }
                    >
                      {payment.Process ? "Pagado" : "Proceso"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="table-container mt-4">
            <h4 className="mb-4">Pagos realizados con Yape</h4>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Método de compra</th>
                  <th>Método de pago</th>
                  <th>Numero de tarjeta</th>
                  <th>Monto</th>
                  <th>Voucher</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {yapePayments.map((payment) => (
                  <tr key={payment.IdSales}>
                    <td>{payment.SaleDate}</td>
                    <td>
                      {payment.ShippingMethod ? "Recojo en tienda" : "Envio"}
                    </td>
                    <td>{payment.PaymentMethod ? "Izipay" : "Yape"}</td>
                    <td>{payment.CardNumber}</td>
                    <td>S/ {payment.Total} </td>
                    <td className="text-center">
                      {payment.ImagePayment && (
                        <img
                          src={payment.ImagePayment}
                          alt="Comprobante"
                          className="small-image mx-auto d-block"
                          onClick={() => openModal(payment.ImagePayment)}
                        />
                      )}
                    </td>

                    <td
                      className={
                        payment.Process
                          ? "text-success font-weight-bold"
                          : "text-warning font-weight-bold"
                      }
                    >
                      {payment.Process ? "Pagado" : "Proceso"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {modalImage && (
        <div className="modal-overlay2" onClick={closeModal}>
          <div className="modal-content2">
            <img src={modalImage} alt="Comprobante" className="modal-image2" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
