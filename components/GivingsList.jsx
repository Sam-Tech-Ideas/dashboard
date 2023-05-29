import React from "react";

const GivingsList = () => {
  const users = [
    {
      id: 1,
      name: "Bob Johnson",
      amount: "130",
      email: "bob@example.com",
      contact: "233559911251",
      type: "Offering",
      payment_method: "Card",
      date: "May 24, 2023",
    },
    {
      id: 2,
      name: "Bob Johnson",
      amount: "180",
      email: "bob@example.com",
      contact: "233559911251",
      type: "Offering",
      payment_method: "Card",
      date: "May 24, 2023",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      contact: "233559911251",
      amount: "120",
      type: "Offering",
      payment_method: "Card",
      date: "May 24, 2023",
    },
  ];
  return (
    <div className="overflow-x-auto p-4">
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
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.contact}</td>
              <td className="border px-4 py-2">{user.amount}</td>
              <td className="border px-4 py-2">{user.type}</td>
              <td className="border px-4 py-2">{user.payment_method}</td>
              <td className="border px-4 py-2">{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GivingsList;
