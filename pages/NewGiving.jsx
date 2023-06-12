import React, { useState } from 'react';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Overview from '@/components/Overview';
 

const NewGiving = () => {
     const [activeTab, setActiveTab] = useState("overview");
  const data = [
    {
      label: "Overview",
      value: "overview",
      desc: <Overview/>,
    },
    {
      label: "Tithes",
      value: "tithe",
      desc: `All tithes`,
    },

    {
      label: "Partnership",
      value: "partnership",
      desc: `All partnership`,
    },
    {
      label: "Offering",
      value: "offering",
      desc: `All offering`,
        },
   
    {
      label: "Other",
        value: "other",
        desc: `All other givings`,
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
}

export default NewGiving