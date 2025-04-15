
import AddAdmin from "@/components/Admin/AddAdmin";
import GeneralCategory from "@/components/SettingsPage/GeneralCategory";

const page = () => {
  return (
    <div>
      <div className="p-5">
        <h1 className="text-2xl font-bold"> General Settings</h1>
      </div>
      <GeneralCategory />
      <AddAdmin />
    </div >
  );
};

export default page;
