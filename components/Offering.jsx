import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { Card } from "@material-tailwind/react";
import OfferingList from "./OfferingList";

const Offering = () => {
  const [totalOfferings, setTotalOfferings] = useState(0);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryTotals, setSubcategoryTotals] = useState({});

  useEffect(() => {
    const fetchOfferingsAndSubcategories = async () => {
      // Fetch total offerings
      const totalOfferingsQuery = query(
        collection(db, "givings"),
        where("giving_type", "==", "Offering")
      );
      const totalOfferingsUnsubscribe = onSnapshot(
        totalOfferingsQuery,
        (snapshot) => {
          let offeringsAmount = 0;
          snapshot.forEach((doc) => {
            offeringsAmount += doc.data().amount;
          });
          setTotalOfferings(offeringsAmount);
        }
      );

      // Fetch subcategories with type "Offering"
      const subcategoriesQuery = query(
        collection(db, "subcategory"),
        where("type", "==", "Offering")
      );
      const subcategoriesSnapshot = await getDocs(subcategoriesQuery);
      const subcategoriesData = [];

      subcategoriesSnapshot.forEach((doc) => {
        const subcategory = doc.data();
        const subcategoryId = doc.id;
        subcategoriesData.push({
          id: subcategoryId,
          ...subcategory,
          amount: 0, // Initialize the amount to 0
        });
      });

      setSubcategories(subcategoriesData);

      // Fetch givings for each subcategory
      const givingPromises = subcategoriesData.map((subcategory) => {
        const givingQuery = query(
          collection(db, "givings"),
          where("subcategory", "==", subcategory.id)
        );
        return getDocs(givingQuery);
      });

      const givingSnapshots = await Promise.all(givingPromises);

      const updatedSubcategoriesData = subcategoriesData.map(
        (subcategory, index) => {
          let subcategoryAmount = 0;
          givingSnapshots[index].forEach((doc) => {
            subcategoryAmount += doc.data().amount;
          });
          return {
            ...subcategory,
            amount: subcategoryAmount,
          };
        }
      );

      // Calculate subcategory totals
      const totals = updatedSubcategoriesData.reduce((acc, subcategory) => {
        acc[subcategory.id] = subcategory.amount;
        return acc;
      }, {});

      // Set the subcategory totals in state
      setSubcategoryTotals(totals);

      // Clean up listeners when component is unmounted or dependencies change
      return () => {
        totalOfferingsUnsubscribe();
      };
    };

    fetchOfferingsAndSubcategories();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mt-10">
        Total Offerings: Ghc {totalOfferings}
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
                <div>
                  <p className="text-md">
                    Total: Ghc {subcategoryTotals[subcategory.id] || 0}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <OfferingList />
      </div>
    </div>
  );
};

export default Offering;
