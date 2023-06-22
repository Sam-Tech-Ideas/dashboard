import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Card, Typography } from "@material-tailwind/react";
import { FaEdit, FaPencilAlt } from "react-icons/fa";
import { useRouter } from "next/router";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [givings, setGivings] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  console.log(id);

  useEffect(() => {
    // const docRef = doc(db, "users", id);

    // const unsubscribe = onSnapshot(docRef, (docSnap) => {
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     setUser(docSnap.data());
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // });

    // return () => unsubscribe();

    const fetchGivings = async () => {
      try {
        const givingsColRef = collection(db, "givings");
        const querySnapshot = await getDocs(
          query(givingsColRef, where("user_id", "==", id))
        );
        const givingsData = querySnapshot.docs.map((doc) => doc.data());
        setGivings(givingsData);
        console.log(id);

        console.log("Givings", givingsData);
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchGivings();
    }
  }, [id]);

  useEffect(() => {
    const docRef = doc(db, "users", id);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    });

    return () => unsubscribe();

    if (id) {
      fetchGivings();
    }
  }, [id]);

  const TABLE_HEAD = ["Giving Type", "Amount", "Date"];

  const TABLE_ROWS = [
    ["Tithe", "1000", "12/12/2021"],
    ["Offering", "1000", "12/12/2021"],
  ];

  return (
    <div>
      <div className="p-8">
        <div class="px-4 sm:px-0 ">
          <h3 class="text-3xl font-semibold leading-7 text-gray-900">
            User's personal information
          </h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-red-500">
            Only user's role can be updated
          </p>
        </div>
        <div class="mt-6 border-t border-gray-100">
          {user && (
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Full name
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.fullName}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  User's role
                </dt>
                <dd class="mt-1 text-sm flex items-center  leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.profileType}
                  <span className="px-4 hover:cursor-pointer">
                    <FaPencilAlt color="green" size={19} />
                  </span>
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Email address
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.email}
                </dd>
              </div>

              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Date of birth
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.dateOfBirth &&
                    new Date(
                      user.dateOfBirth.seconds * 1000
                    ).toLocaleDateString()}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Contact
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {user.phoneNumber}
                </dd>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-sm font-medium leading-6 text-gray-900">
                  Group
                </dt>
                <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  No Group available
                </dd>
              </div>
            </dl>
          )}
        </div>
      </div>

      {/* <h1 className="p-8">
        <Typography variant="h5" className="mb-6">
          User's Giving History
        </Typography>
        <p>
          Total Givings: <span className="text-green-500">Ghc 1000</span>
        </p>
      </h1> */}

      {/* <Card className="overflow-scroll h-full w-full">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ giving_type, amount, date_paid }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={giving_type}>
                  
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {giving_type}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date_paid}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card> */}

      {givings.length > 0 && (
        <div className="p-8">
          <div class="px-4 sm:px-0 ">
            <h3 class="text-3xl font-semibold leading-7 text-gray-900">
              User's Giving History
            </h3>
          </div>

          <div class="mt-6 border-t border-gray-100">
            <dl class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt class="text-xl  font-medium leading-6 text-gray-900">
                  Total Givings
                </dt>
                <dd class="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Gh{givings.reduce((a, b) => a + b.amount, 0)}
                </dd>
              </div>
              {givings.map((giving) => (
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt class="text-sm font-medium leading-6 text-gray-900">
                    {giving.giving_type}
                  </dt>
                  <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    Ghc {giving.amount} -{" "}
                    {new Date(
                      giving.date_paid.seconds * 1000
                    ).toLocaleDateString()}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
