import { useState } from "react";
import { FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "antd";

export const DepositPage = () => {
  const predefinedAmounts = [
    50000, 100000, 200000, 500000, 1000000, 2000000, 4000000, 5000000,
  ];
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(""); // Reset custom amount input
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null); // Deselect predefined buttons
  };

  const handleDeposit = () => {
    setLoading(true);
    const amount = selectedAmount || parseInt(customAmount);
    if (!amount || amount < 1000) {
      toast.error("Please enter a valid amount to deposit (>= 1000 VND)");
      return;
    }
    try {
      fetch(
        `http://localhost:8080/api/v1/payment/vn-pay?amount=${amount}&bankCode=NCB`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          window.location.href = data.data.paymentUrl;
        })
        .catch((error) => console.log(error));
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center mb-4 d-flex align-items-center justify-content-center">
          <FaMoneyBillWave className="me-2 text-success" /> Nạp Tiền
        </h2>

        {/* Chọn số tiền nhanh */}
        <div className="row g-2">
          {predefinedAmounts.map((amount, index) => (
            <div className="col-6" key={index}>
              <button
                className={`btn w-100 py-2 fw-bold ${
                  selectedAmount === amount
                    ? "btn-success text-white"
                    : "btn-outline-secondary"
                }`}
                onClick={() => handleAmountClick(amount)}
              >
                {amount.toLocaleString()} VND
              </button>
            </div>
          ))}
        </div>

        {/* Nhập số tiền tùy chỉnh */}
        <div className="mt-3">
          <input
            type="number"
            className="form-control form-control-lg text-center"
            placeholder="Nhập số tiền khác"
            value={customAmount}
            onChange={handleCustomAmountChange}
            min="1000"
          />
        </div>

        {/* Nút xác nhận */}
        <Button
          loading={loading}
          onClick={handleDeposit}
          type="primary"
          block
          className="mt-4"
          size="large"
        >
          <FaPlusCircle className="me-2" /> Xác nhận nạp tiền
        </Button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
