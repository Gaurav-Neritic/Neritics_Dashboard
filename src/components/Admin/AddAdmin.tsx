"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import Loader from "../Loaders/Loader";
import { useUser } from "@/app/context/UserContext";
import toast from "react-hot-toast";

const AddAdmin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();

  async function getAdminRequests() {
    try {
      const response = await axios.get('../api/getAdminRequests');

      if (response.data.data) {
        return response.data.data
      }

      return [];
    } catch (error) {
      console.log("Failed to get the requests : ", error)
      return []
    }
  }

  const { data: userRequests = [], isLoading } = useQuery({ queryFn: getAdminRequests, queryKey: ['userRequests'], refetchOnWindowFocus: false })

  async function giveAdminAccess(_id: string) {
    try {
      const response = await axios.put('../api/authorizeAdmin', { data: { _id } });
      if (response.data.data) {
        return response.data.data
      }

      return []
    } catch (error) {
      console.log("Error giving Access", error)
      return []
    }
  }

  const accessMutation = useMutation({
    mutationFn: giveAdminAccess,
    onSuccess: () => {
      toast.success("Authorized As Admin");
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    }
  })

  const handelAccess = (_id: string) => {
    accessMutation.mutate(_id);
  }

  async function removeAdminAccess(_id: string) {
    try {
      const response = await axios.put('../api/unAuthorizeAdmin', { data: { _id } });
      if (response.data.data) {
        return response.data.data
      }

      return []
    } catch (error) {
      console.log("Error removing Access", error)
      return []
    }
  }

  const removeAccessMutation = useMutation({
    mutationFn: removeAdminAccess,
    onSuccess: () => {
      toast.success("Access Removed");
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    }
  })

  const handelRemoveAccess = (_id: string) => {
    removeAccessMutation.mutate(_id);
  }

  async function deleteUserRequest(_id: string) {
    try {
      const response = await axios.delete('../api/deleteUserRequest', { data: { _id } });
      if (response.data.data) {
        return response.data.data
      }

      return []
    } catch (error) {
      console.log("Error removing Access", error)
      return []
    }
  }

  const deleteUserMutation = useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: () => {
      toast.success("User Removed");
      queryClient.invalidateQueries({ queryKey: ['userRequests'] });
    }
  })

  const handelDeleteUser = (_id: string) => {
    deleteUserMutation.mutate(_id)
  }

  const totalRequests = userRequests.filter((user: any) => user?.isAdmin === false)
  accessMutation?.isError ? toast.error("Something Went Wrong") : "";
  removeAccessMutation?.isError ? toast.error("Something Went Wrong") : "";

  if (user?.isSuperAdmin === false) return null
  return (
    <>
      <div className="p-5">
        <h1 className="text-2xl font-bold"> Admin Settings</h1>
      </div>
      <div className="p-5 ">
        <div className="border border-lightBorder dark:border-darkBorder rounded">
          <div className="p-4 flex justify-between items-center">
            <h1 className={`text-lg mb-1 flex`}>Admin Access Requests :
              <span className={`ml-2 ${totalRequests.length > 0 ? "animate-pulse text-red-600 font-semibold bg-red-100 px-2 rounded" : ""}`}>
                {totalRequests.length}
              </span>
            </h1>
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="cursor-pointer flex gap-2"
            >
              {isVisible ? "Show Less" : "Show More"}{" "}
              {isVisible ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>


          {isLoading && <div className='p-2 m-5 border border-lightBorder rounded dark:border-darkBorder'><Loader title='Fetching...' /></div>}

          {isVisible && (
            <>
              {(!isLoading && userRequests.length <= 0) && <div className='p-2 m-5 border text-center border-lightBorder rounded dark:border-darkBorder'>No Requests As Of Now</div>}
              {
                userRequests?.map(({ name, _id, avatar, email, isAdmin, isSuperAdmin }: { name: string, _id: string, avatar: string, email: string, isAdmin: boolean, isSuperAdmin: boolean }) => {
                  return (
                    <div key={_id} className="grid grid-cols-[1fr_2fr_2fr_3fr] place-items-center m-5 py-2 border border-lightBorder dark:border-darkBorder rounded ">
                      <div>
                        <Image
                          src={avatar || "/placeholder.jpg"}
                          alt="image"
                          width={50}
                          height={50}
                          className="w-10 h-10 object-cover ring-lightBorder rounded-full ring-2" />
                      </div>
                      <div>
                        <h1 className="capitalize">{name}</h1>
                      </div>
                      <div>
                        <h1 className="">{email}</h1>
                      </div>
                      <div className="flex items-center justify-center gap-2 flex-wrap">
                        <button
                          disabled={isAdmin ? true : false}
                          onClick={(e) => { e.preventDefault(); handelAccess(_id) }}
                          className={`bg-green-600  px-4 py-1 relative rounded text-white ${isAdmin ? "cursor-not-allowed" : "cursor-pointer hover:bg-green-700"}`}>
                          {isAdmin ? "Authorized" : "Authorize"}
                          {isAdmin && <span className="absolute text-black text-[10px] -top-2 px-[4px] -right-1 bg-white rounded-full ring ring-lightBorder dark:ring-darkBorder">Admin</span>}
                        </button>
                        {!isSuperAdmin && <>
                          <button
                            onClick={(e) => { e.preventDefault(); handelRemoveAccess(_id) }} className="bg-red-600 cursor-pointer hover:bg-red-500 px-4 py-1 rounded text-white"> Un-Set</button>
                          <button
                            onClick={(e) => { e.preventDefault(); handelDeleteUser(_id) }} className="bg-red-600 cursor-pointer hover:bg-red-500 px-4 py-1 rounded text-white">
                            <Trash2 />
                          </button>
                        </>
                        }

                        {isSuperAdmin && <div className="py-1 px-3 text-xs rounded-full bg-gradient-to-r from-red-500 to-yellow-400 text-white ring-2 ring-red-300">
                          Super Admin
                        </div>
                        }
                      </div>
                    </div>
                  )
                })
              }
            </>
          )
          }
        </div >
      </div >
    </>

  );
};

export default AddAdmin;
