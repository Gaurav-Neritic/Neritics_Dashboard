import AddAdmin from "@/components/Admin/AddAdmin";
import GeneralCategory from "@/components/SettingsPage/GeneralCategory";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold"> General Settings</h1>
      </div>
      <div >
      <GeneralCategory />
      <AddAdmin />
      </div>
    </div>
  );
};

export default page;
