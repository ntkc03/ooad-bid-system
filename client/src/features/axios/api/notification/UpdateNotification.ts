import { NotificationInterface } from "../../../../types/NotificationInterface";
import apiConfig from "../../../../utils/apiConfig";
import setupAxiosInterceptors from "../../interceptors/axiosInterceptor";
import { AxiosRequestConfig } from "axios";

const api = setupAxiosInterceptors();

export const updateNotification = async (payload: NotificationInterface): Promise<any> => {
    try {
        const config: AxiosRequestConfig = {
            url: `${apiConfig.updateNotification}`,
            method: "put",
            data: payload
        };
        const response = await api(config);
        return response.data;
    } catch (error) {
        throw new Error("Gặp lỗi khi cập nhật dữ liệu");
    }
};