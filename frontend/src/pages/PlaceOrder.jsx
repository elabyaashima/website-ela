import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const [codQrVisible, setCodQrVisible] = useState(false);
  const [codOrderData, setCodOrderData] = useState(null);

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const payload = {
            ...response,
            userId: token, // or decode userId from token / context
          };
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            payload,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message || "Payment verification failed");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const buildOrderData = () => {
    let orderItems = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            products.find((product) => product._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }

    return {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const orderData = buildOrderData();

    try {
      switch (method) {
        case "cod":
          setCodOrderData(orderData);
          setCodQrVisible(true);
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          } else {
            toast.error(responseRazorpay.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleCodPaymentCompleted = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/place",
        codOrderData,
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to place order");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={formData.street}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Zipcode"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>

      {/* Right Side - Payment & Summary */}
      <div className="mt-8 flex flex-col items-start w-full sm:max-w-md">
        <div className="mt-8 min-w-80 w-full">
          <CartTotal />
        </div>

        <div className="mt-12 w-full">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => {
                setMethod("stripe");
                setCodQrVisible(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="stripe" />
            </div>
            <div
              onClick={() => {
                setMethod("razorpay");
                setCodQrVisible(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="razorpay"
              />
            </div>
            <div
              onClick={() => {
                setMethod("cod");
                setCodQrVisible(false);
              }}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-600 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          {!codQrVisible && (
            <div className="w-full text-end mt-8">
              <button
                type="submit"
                className="bg-black text-white px-16 py-3 text-sm"
              >
                PLACE ORDER
              </button>
            </div>
          )}
        </div>

        {/* COD QR Display */}
        {codQrVisible && method === "cod" && (
          <div className="w-full mt-12 border-t pt-8 text-center">
            <img
              src="/qrcode.png"
              alt="QR Code"
              className="mx-auto w-40 h-40 mb-4"
            />
            <p className="text-sm sm:text-base font-medium text-gray-700 mb-3">
              Please complete the payment of ₹{getCartAmount() + delivery_fee}{" "}
              by scanning the QR code above.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              Once done, click the button below to confirm your payment.
            </p>
            <button
              onClick={handleCodPaymentCompleted}
              type="button"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded"
            >
              Payment Completed
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default PlaceOrder;
