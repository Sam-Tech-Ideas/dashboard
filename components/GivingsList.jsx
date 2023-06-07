import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";
import { Tooltip } from "@material-tailwind/react";

const GivingsList = () => {
  const [givings, setGivings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGivings = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "givings"));
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchGivings();
  }, []);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  const headers = [
    { label: "Name", key: "name" },
    { label: "Contact", key: "contact" },
    { label: "Amount", key: "amount" },
    { label: "Payment Type", key: "giving_type" },
    { label: "Payment Method", key: "paymentMethod" },
    { label: "Date", key: "date_paid" },
  ];

  const csvData = [
    ["Name", "Contact", "Amount", "Payment Type", "Payment Method", "Date"],
    ...givings.map((giving) => [
      giving.name,
      giving.contact,
      giving.amount,
      giving.giving_type,
      giving.paymentMethod,
      formatDate(giving.date_paid),
    ]),
  ];

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGivings = givings.filter((giving) => {
    return (
      (category === "" || giving.giving_type === category) &&
      (searchTerm === "" ||
        giving.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        giving.contact.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="overflow-x-auto p-4">
      {/* <div>
        <label htmlFor="category">Category:</label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Card">Card</option>
          <option value="Type 2">Type 2</option>
          <option value="Type 3">Type 3</option>
        </select>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div> */}
      <CSVLink filename={"givings_report.csv"} data={csvData} headers={headers}>
        <Tooltip content="Download report" placement="right-end">
          <button className="hover:text-blue-500">
            <FaFileDownload size={30} />
          </button>
        </Tooltip>
      </CSVLink>

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Amount (Ghc)</th>
            <th className="px-4 py-2">Payment Type</th>
            <th className="px-4 py-2">Payment Method</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <div className="flex justify-center  items-center space-x-2">
                  <Loader />
                </div>
              </td>
            </tr>
          ) : (
            filteredGivings.map((giving) => (
              <tr key={giving.id}>
                <td className="border px-4 py-2">{giving.name}</td>
                <td className="border px-4 py-2">{giving.contact}</td>
                <td className="border px-4 py-2">{giving.amount}</td>
                <td className="border px-4 py-2">{giving.giving_type}</td>
                <td className="border px-4 py-2">{giving.paymentMethod}</td>
                <td className="border px-4 py-2">
                  {formatDate(giving.date_paid)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GivingsList;
