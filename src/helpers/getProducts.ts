"use client"
import axios from "axios";

export async function getProducts() {
    try {
        const response = await axios.get("api/getProducts");
        if (response.data.data) {
            return response.data.data;
        }
        return []
    } catch (error) {
        console.log("Error fetching the products : ", error);
        return []
    }
}