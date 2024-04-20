import { Types } from "mongoose";

export interface accountInterface {
    _id?: string;
    name?: string;
    password?: string;
    cccd?: string;
    bank?: string;
    bankAccount?: string;
    bankOwner?: string;
    email: string;
    role?: string;
    phone?: string;
    address?: string;
    state?: boolean;
}