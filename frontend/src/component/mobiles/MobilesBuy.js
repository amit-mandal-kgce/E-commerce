import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { quentity } from "../../utils/dropdown";
import OrderAddress from "../sattings/OrderAddress";

const MobilesBuy = () => {
  const { id, formattedDate } = useParams();
  const [getData, setGetData] = useState([]);
  // drop down box
  const [dropItems, setdropItems] = useState(1);
  const handelDrop = (event) => {
    setdropItems(event.target.value);
  };
  const [addressSet, isAddressSet] = useState(false);
  const handelAddersSet = () => {
    isAddressSet(!addressSet);
  };
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
    isAddressSet(false);
  };
  // Get Request.................
  const [isAddress, setAddress] = useState([]);
  console.log("isAddress", isAddress);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rese = await fetch(
          `https://e-commerce-nu-seven.vercel.app/api/order/address/${selectedAddressId}`
        );
        const jsonData = await rese.json();
        setAddress(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, [selectedAddressId]);
  // API CAlllll.........................
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-nu-seven.vercel.app/api/mobiles/data"
        );
        const jsonData = await res.json();
        setGetData(jsonData);
      } catch (error) {
        console.log("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  if (!getData) {
    return <div>Loading...</div>;
  }
  const data = getData.find((p) => p.product.id === id);

  if (data)
    return (
      <div className="flex flex-col justify-center items-center px-4">
        <div className="w-full p-3">
          <div className="w-full my-4 md:px-20 flex flex-row justify-between">
            <div className="">
              <h1 className="font-bold">Deliver to:</h1>
              <h1 className="font-light">
                {isAddress.place}, {isAddress.post}, {isAddress.police},{" "}
                {isAddress.dist}, {isAddress.pin}, {isAddress.state}
              </h1>
              <h1 className="font-light">{isAddress.mobil}</h1>
            </div>
            <div>
              <button
                onClick={handelAddersSet}
                className="bg-blue-500 px-3 py-2 rounded text-white font-semibold"
              >
                Change
              </button>
            </div>
          </div>
        </div>
        {addressSet && (
          <div className="absolute w-full h-screen flex items-center justify-center top-0 left-0 bg-opacity-40 z-50 bg-teal-500">
            <OrderAddress
              isAddressSet={isAddressSet}
              handleSelectAddress={handleSelectAddress}
              selectedAddressId={selectedAddressId}
            />
          </div>
        )}
        <div className="flex flex-row justify-around gap-4">
          <div className="p-3">
            <img
              src={data.product.img}
              alt={data.product.title}
              width={1000}
              height={1000}
              className="w-[100px] sm:w-[200px] h-[100px] sm:h-[200px] mb-3"
            />
            <div
              className="border flex flex-row sm:mx-12 justify-center text-xs sm:text-base items-center shadow"
              value={setdropItems}
              onChange={handelDrop}
            >
              <h1>Qty:</h1>
              <select className="form-select outline-none">
                {quentity.map((option) => (
                  <option key={option} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-start items-start p-3">
            <h1 className="text-sm md:text-xl font-light">
              {data.product.title}
            </h1>
            <div className="flex gap-2 md:text-2xl text-green-400">
              {[1, 2, 3, 4, 5].map((w) =>
                w <= data.product.stars ? (
                  <AiFillStar key={w} />
                ) : (
                  <AiOutlineStar key={w} />
                )
              )}
            </div>
            <h1 className="text-sm md:text-xl font-bold">
              <span className="text-sm md:text-lg font-bold text-blue-400">
                {data.product.discount}% Off
              </span>{" "}
              ₹
              {Math.round(
                data.product.price -
                  (data.product.price / 100) * data.product.discount
              )}{" "}
              <del className="text-xs md:text-sm text-gray-500">
                ₹{data.product.price}
              </del>
            </h1>
            <h1 className="text-xs sm:text-base">
              Delivery by {formattedDate} |{" "}
              <del className="text-gray-400">₹40</del>{" "}
              <span className="text-green-500">FREE Delivery</span>
            </h1>
          </div>
        </div>
        <div className="w-full h-1 my-2 bg-gray-100" />
        <div className="w-full my-2 md:px-20">
          <h1 className="text-sm md:text-base font-bold mb-3">Price Details</h1>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">
              Price ({dropItems} item)
            </h1>
            <h1 className="text-xs md:text-sm font-light">
              ₹{data.product.price * dropItems}
            </h1>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">Discount</h1>
            <del className="text-xs md:text-sm font-light text-green-400">
              -₹
              {Math.round(
                dropItems * (data.product.price / 100) * data.product.discount
              )}
            </del>
          </div>
          <div className="flex flex-row justify-between mb-2">
            <h1 className="text-xs md:text-sm font-light">Delivery Charge</h1>
            <h1 className="text-xs md:text-sm font-light">
              <del>₹40</del>{" "}
              <span className="text-green-400">FREE Delivery</span>
            </h1>
          </div>
          <div className="flex flex-row justify-between py-2 border-t-2 border-dotted">
            <h1 className="text-xs md:text-sm font-semibold">Total Amount</h1>
            <h1 className="text-xs md:text-sm font-semibold">
              ₹
              {Math.round(
                dropItems *
                  (data.product.price -
                    (data.product.price / 100) * data.product.discount)
              )}
            </h1>
          </div>
          <div className="py-2 border-t-2">
            <h1 className="text-xs md:text-sm font-semibold text-green-600">
              You will save{" "}
              <span>
                ₹
                {Math.round(
                  dropItems *
                    ((data.product.price / 100) * data.product.discount)
                )}
              </span>{" "}
              on this order
            </h1>
          </div>
        </div>
        <div className="w-full my-2 md:px-20 flex flex-row justify-between items-center bg-stone-100 p-3">
          <h1 className="flex flex-col">
            <del className="font-light text-xs">
              ₹
              {Math.round(
                dropItems * (data.product.price / 100) * data.product.discount
              )}
            </del>
            <span className="font-semibold">
              ₹
              {Math.round(
                dropItems *
                  (data.product.price -
                    (data.product.price / 100) * data.product.discount)
              )}
            </span>
          </h1>
          <Link
            to={`/mobile/payment/${id}/${dropItems}/${formattedDate}/${selectedAddressId}`}
            className="bg-yellow-400 text-xs md:text-sm py-1 px-4 rounded font-semibold"
          >
            Place order
          </Link>
        </div>
      </div>
    );
};

export default MobilesBuy;
