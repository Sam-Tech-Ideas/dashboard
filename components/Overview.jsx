import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Card } from "@material-tailwind/react";
import OverviewDoughnut from "./OverviewDoughnut";
import GivingsList from "./GivingsList";

const Overview = () => {
  const [totalPartnership, setTotalPartnership] = useState(0);
  const [totalTithes, setTotalTithes] = useState(0);
  const [totalOffering, setTotalOffering] = useState(0);
  const [tottalOthers, setTotalOthers] = useState(0);

  useEffect(() => {
    const fetchTotalAmounts = async () => {
      // Fetch total partnership
      const partnershipQuery = query(
        collection(db, "givings"),
        where("giving_type", "==", "Partnership")
      );
      const partnershipUnsubscribe = onSnapshot(
        partnershipQuery,
        (snapshot) => {
          let total = 0;
          snapshot.forEach((doc) => {
            total += doc.data().amount;
          });
          setTotalPartnership(total);
        }
      );

      // Fetch total tithes
      const tithesQuery = query(
        collection(db, "givings"),
        where("giving_type", "==", "Tithes")
      );
      const tithesUnsubscribe = onSnapshot(tithesQuery, (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          total += doc.data().amount;
        });
        setTotalTithes(total);
      });

      // Fetch total offering
      const offeringQuery = query(
        collection(db, "givings"),
        where("giving_type", "==", "Offering")
      );
      const offeringUnsubscribe = onSnapshot(offeringQuery, (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          total += doc.data().amount;
        });
        setTotalOffering(total);
      });

      // Fetch total offering
      const othersQuery = query(
        collection(db, "givings"),
        where("giving_type", "==", "Others")
      );
      const othersUnsubscribe = onSnapshot(othersQuery, (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          total += doc.data().amount;
        });
        setTotalOthers(total);
      });

      // Clean up listeners when component is unmounted or dependencies change
      return () => {
        partnershipUnsubscribe();
        tithesUnsubscribe();
        offeringUnsubscribe();
      };
    };

    fetchTotalAmounts();
  }, []);

  return (
    <div className="">
      {/**chart and amounts */}
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <OverviewDoughnut />

        <div className="w-full md:w-2/3 p-4 flex flex-col ">
          <div className="flex flex-col md:flex-row justify-around">
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc {totalPartnership}
                </h1>
                <p className="text-black  text-lg ">Total Partnership</p>
              </div>
            </Card>
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc {totalTithes}
                </h1>
                <p className="text-black  text-lg ">Total Tithes</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col md:flex-row justify-around">
            <Card className="m-1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc {totalOffering}
                </h1>
                <p className="text-black  text-lg ">Total Offering</p>
              </div>
            </Card>
            <Card className="m -1">
              <div className="flex flex-col m-8">
                <h1 className="text-2xl sm:text-5xl font-bold text-black">
                  Ghc {totalPartnership}
                </h1>
                <p className="text-black  text-lg ">Total Others</p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Card className="border-gray-500">
        <GivingsList />
      </Card>
    </div>
  );
};

export default Overview;
