import CustomInput from "@/components/SettingsPage/CustomInput";

const SettingsPage = () => {
  return (
    <div className="p-5">
      <div className="">
        <h1 className="text-2xl font-bold"> General Settings</h1>
      </div>
      {/* Category Settings: */}
      <div className="w-auto">
        <div className="mt-5 border border-lightBorder dark:border-darkBorder rounded">
          <div className="p-4">
            <h1 className="text-lg mb-1">Category Settings:</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* Add Category */}
            <CustomInput label={"Add Category"} placeholder={"Add New Product Category"} apiEndPoint={"api/addCategory"} />
            {/* Add Product Type */}
            <CustomInput label={"Add Product Type"} placeholder={"Add New Product Type"} apiEndPoint={"api/addCategory"} />
            {/* Add Product From */}
            <CustomInput label={"Add Product Form"} placeholder={"Add New Product Form"} apiEndPoint={"api/addCategory"} />
            {/* Add Container Type */}
            <CustomInput label={"Add Container Type"} placeholder={"Add New Container Type"} apiEndPoint={"api/addCategory"} />
            {/* Country Of Origin */}
            <CustomInput label={"Add Country"} placeholder={"Add New Country"} apiEndPoint={"api/addCategory"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
