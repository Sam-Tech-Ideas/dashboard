import React, { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Card } from "@material-tailwind/react";
import TitheList from "./TitheLists";

const Tithe = () => {
  const [totalTithes, setTotalTithes] = useState(0);
  const [subcategories, setSubcategories] = useState([]);

 
  useEffect(() => {
    const fetchTithesAndSubcategories = async () => {
      // Fetch total tithes
      const totalTithesQuery = query(
        collection(db, "givings"),
        where("giving_type", "==", "Offering")
      );
      const totalTithesUnsubscribe = onSnapshot(
        totalTithesQuery,
        (snapshot) => {
          let tithesAmount = 0;
          snapshot.forEach((doc) => {
            tithesAmount += doc.data().amount;
          });
          setTotalTithes(tithesAmount);
        }
      );

      // Fetch subcategories with type "Offering"
      const subcategoriesQuery = query(
        collection(db, "subcategory"),
        where("type", "==", "Tithes")
      );
      const subcategoriesUnsubscribe = onSnapshot(
        subcategoriesQuery,
        (snapshot) => {
          const subcategoriesData = [];

          snapshot.forEach((doc) => {
            const subcategory = doc.data();
            const subcategoryId = doc.id;

            // Fetch the corresponding giving for the subcategory
            const givingQuery = query(
              collection(db, "givings"),
              where("subcategory", "==", subcategoryId)
            );
            getDocs(givingQuery).then((givingSnapshot) => {
              let subcategoryAmount = 0;
              givingSnapshot.forEach((givingDoc) => {
                subcategoryAmount += givingDoc.data().amount;
              });

              subcategoriesData.push({
                id: subcategoryId,
                ...subcategory,
                amount: subcategoryAmount,
              });

              // Update the state with the updated subcategories data
              setSubcategories(subcategoriesData);
            });
          });
        }
      );

      // Clean up listeners when component is unmounted or dependencies change
      return () => {
        totalTithesUnsubscribe();
        subcategoriesUnsubscribe();
      };
    };

    fetchTithesAndSubcategories();
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">
        Total Tithes: Ghc {totalTithes}
      </h1>
      <div className="mt-10 w-full md:w-2/3">
        <Card>

          <h1 className="text-lg font-bold mb-3">Available Sub Categories</h1>
          <ul>

            
            {subcategories.map((subcategory) => (
              <li
                key={subcategory.id}
                className="flex flex-row justify-between py-2 px-4 border-b"
              >
                <div>
                  
                  <p className="text-md">{subcategory.name}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <TitheList/>
      </div>
    </div>
  );
};

export default Tithe;
