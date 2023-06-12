import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { CSVLink } from "react-csv";
import { FaFileDownload } from "react-icons/fa";
import { Button, Tooltip } from "@material-tailwind/react";
import { MenuIcon } from "lucide-react";
import { AiOutlineMore } from "react-icons/ai";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@material-tailwind/react";

const GivingsList = () => {
  const [givings, setGivings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  const filteredGivings = givings.filter((giving) => {
    const givingDate = giving.date_paid.toDate();
    const selectedDateFrom = dateFrom ? new Date(dateFrom) : null;
    const selectedDateTo = dateTo ? new Date(dateTo) : null;

    return (
      (category === "" || giving.giving_type === category) &&
      (searchTerm === "" ||
        giving.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        giving.contact.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedDateFrom === null || givingDate >= selectedDateFrom) &&
      (selectedDateTo === null || givingDate <= selectedDateTo)
    );
  });

  const csvData = [
    ["Name", "Contact", "Amount", "Payment Type", "Payment Method", "Date"],
    ...filteredGivings.map((giving) => [
      giving.name,
      giving.contact,
      giving.amount,
      giving.giving_type,
      formatDate(giving.date_paid),
    ]),
  ];

  return (
    <>
      <div className="shadow-sm bg-white">
        <div className="flex md:mt-8 justify-between items-center">
          <div className="flex">
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Date from
              </label>
              <input
                type="date"
                className="border-2 px-4 rounded-full "
                value={dateFrom}
                onChange={handleDateFromChange}
              />
            </div>
            <div className="flex flex-col items-center m-4">
              <label htmlFor="category" className="py-1 ">
                Date to
              </label>
              <input
                type="date"
                className="border-2 px-4 rounded-full "
                value={dateTo}
                onChange={handleDateToChange}
              />
            </div>
          </div>
          <div className="flex flex-row items-center m-4 pt-8">
            <label htmlFor="" placeholder="" className="mx-1">
              Search
            </label>
            <input
              type="text"
              id="category"
              placeholder="Search a giver"
              className="border-2 px-4 rounded-lg"
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <div className=" flex  items-center  pt-8">
            <CSVLink
              filename={"givings_report.csv"}
              data={csvData}
              headers={headers}
            >
              <button className="bg-blue-500 text-white px-6 py-1 rounded-md hover:bg-blue-800 flex items-center">
                Download report
                <FaFileDownload className="ml-2" size={18} />
              </button>
            </CSVLink>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredGivings.length === 0 ? (
            <p className="text-center text-gray-500 py-4">
              No matching records found.
            </p>
          ) : (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-300">
                <tr className="text-black">
                  <th className="px-4 py-4">No.</th>
                  <th className="px-4 py-4">Name</th>
                  <th className="px-4 py-4">Amount (Ghc)</th>
                  <th className="px-4 py-4">Payment Type</th>
                  <th className="px-4 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <Loader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredGivings.map((giving) => (
                    <tr
                      key={giving.id}
                      className="bg-gray-200 text-center hover:bg-gray-100/50"
                    >
                      <td className="border px-4 py-2">
                        {filteredGivings.indexOf(giving) + 1}
                      </td>

                      <td className="border px-4 py-2">Samuel Agyemang</td>
                      <td className="border px-4 py-2">{giving.amount}</td>
                      <td className="border px-4 py-2">{giving.giving_type}</td>
                      <td className="border px-4 py-2">
                        {formatDate(giving.date_paid)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default GivingsList;
