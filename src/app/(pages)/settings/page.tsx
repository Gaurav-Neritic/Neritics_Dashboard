"use client"
import CustomInput from "@/components/SettingsPage/CustomInput";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SettingsPage = () => {

  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [form, setForm] = useState([]);
  const [container, setContainer] = useState([])
  const [country, setCountry] = useState([])

  async function getCategories() {
    try {
      const response = await axios.get('api/getCategory');

      if (response.data.data) {
        setCategory(response.data.data)
      } else {
        toast.error("Error Fetching the category");
      }
    } catch (error) {
      console.log("Error Fetching the category", error);
      toast.error("Error Fetching the category");
    }
  }

  async function getTypes() {
    try {
      const response = await axios.get('api/getTypes');

      if (response.data.data) {
        setType(response.data.data)
      } else {
        toast.error("Error Fetching the type");
      }
    } catch (error) {
      console.log("Error Fetching the type", error);
      toast.error("Error Fetching the type");
    }
  }

  async function getProductForms() {
    try {
      const response = await axios.get('api/getFormTypes');

      if (response.data.data) {
        setForm(response.data.data)
      } else {
        toast.error("Error Fetching the form types");
      }
    } catch (error) {
      console.log("Error Fetching the form types", error);
      toast.error("Error Fetching the form types");
    }
  }

  async function getContainerTypes() {
    try {
      const response = await axios.get('api/getContainerTypes');

      if (response.data.data) {
        setContainer(response.data.data)
      } else {
        toast.error("Error Fetching the container type");
      }
    } catch (error) {
      console.log("Error Fetching the container type", error);
      toast.error("Error Fetching the container type");
    }
  }

  async function getCountries() {
    try {
      const response = await axios.get('api/getCountries');

      if (response.data.data) {
        setCountry(response.data.data)
      } else {
        toast.error("Error Fetching the country");
      }
    } catch (error) {
      console.log("Error Fetching the country ", error);
      toast.error("Error Fetching the country ");
    }
  }

  useEffect(() => {
    getCategories();
    getTypes();
    getProductForms();
    getContainerTypes();
    getCountries();
  }, [])

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
            <CustomInput label={"Add Category"} placeholder={"Add New Product Category"}
              apiEndPoint={"api/addCategory"} categoryArray={category}
              deleteApiEndpoint={"api/deleteCategory"} getApi={() => { return getCategories() }} />
            {/* Add Product Type */}
            <CustomInput label={"Add Product Type"} placeholder={"Add New Product Type"}
              apiEndPoint={"api/addType"} categoryArray={type} deleteApiEndpoint={"api/deleteType"} getApi={() => { return getTypes() }} />
            {/* Add Product From */}
            <CustomInput label={"Add Product Form"} placeholder={"Add New Product Form"}
              apiEndPoint={"api/addFormType"} categoryArray={form} deleteApiEndpoint={"api/deleteFormType"} getApi={() => { return getProductForms() }} />
            {/* Add Container Type */}
            <CustomInput label={"Add Container Type"} placeholder={"Add New Container Type"} apiEndPoint={"api/addContainerType"} categoryArray={container} deleteApiEndpoint={"api/deleteContainerType"} getApi={() => { return getContainerTypes() }} />
            {/* Country Of Origin */}
            <CustomInput label={"Add Country"} placeholder={"Add New Country"}
              apiEndPoint={"api/addCountry"} categoryArray={country} deleteApiEndpoint={"api/deleteCountry"} getApi={() => { return getCountries() }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
