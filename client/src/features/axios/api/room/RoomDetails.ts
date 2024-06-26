import { propTypesOverlayProps } from "@material-tailwind/react/types/components/drawer";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";
import apiConfig from "../../../../utils/apiConfig";

const api = setupAxiosInterceptors();

export const getRoomByAccount = async (email: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.roomAccount}/${email}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về room");
    }
}

export const getRoomByCode = async (code: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.roomCode}/${code}`,
            method: "get",
        };
        console.log("Lấy phiên đấu giá!")
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về room");
    }
}

export const getRoomByPhone = async (phone: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.roomPhone}/${phone}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về room");
    }
}

export const getRoomByProvider = async (email: string): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.roomProvider}/${email}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về room");
    }
}

export const getOngoingRoom = async (date: Date): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.ongogingRooms}/${date}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về room");
    }
}

export const getAllHistories = async (): Promise<any> =>{
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.allRooms}`,
            method: "get",
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi lấy dữ liệu về room");
    }
}

