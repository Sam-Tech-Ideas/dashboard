import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Overview from "@/components/Overview";
import Tithe from "@/components/Tithe";
import Partnership from "@/components/Partnership";
import Offering from "@/components/Offering";
import Other from "@/components/Other";

const NewGiving = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const data = [
    {
      label: "Overview",
      value: "overview",
      desc: <Overview />,
    },
    {
      label: "Tithes",
      value: "tithe",
      desc: <Tithe />,
    },

    {
      label: "Partnership",
      value: "partnership",
      desc: <Partnership />,
    },
    {
      label: "Offering",
      value: "offering",
      desc: <Offering />,
    },

    {
      label: "Other",
      value: "other",
      desc:<Other/>,
    },
  ];
  return (
    <div>
      <Tabs value={activeTab} className="m-4">
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
          }}
        >
          {data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={activeTab === value ? "text-blue-500" : ""}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default NewGiving;
