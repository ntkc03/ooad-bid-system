import { useEffect, useState } from "react";
import { userInterface } from "../../types/UserInterface";
import { accountData, getAccountsByEmail } from "../../features/axios/api/account/AccountsDetail";
import { NotificationInterface } from "../../types/NotificationInterface";
import { getNotificationByAccount } from "../../features/axios/api/notification/NotificationDetails";
import createNewNotification from "../../features/axios/api/notification/CreateNotification";
import { updateAccount } from "../../features/axios/api/account/UpdateAccount";
import deleteAccount from "../../features/axios/api/account/DeleteAccount";
import axios from "axios";
import apiConfig from "../../utils/apiConfig";
import { login } from "../../features/axios/api/account/AccountAuthentication";
import { LoginPayload } from "../../types/PayloadInterface";
import { getHistoryByAccount, getHistoryById } from "../../features/axios/api/history/HistoryDetails";
import { HistoryInterface } from "../../types/HistoryInterface";
import { RoomInterface } from "../../types/RoomInterface";
import { getRoomByAccount } from "../../features/axios/api/room/RoomDetails";


export default function TestDB() {

  const [accountDetails, setAccountDetails] = useState<HistoryInterface>();
  const getAccountDetails = async () => {
    console.log("running")
    const data = await getHistoryById("6640bd1506ce0e198c201f94");
    setAccountDetails(data);
  };

  useEffect(() =>{
    getAccountDetails();
  },[])
 
  return (
    <div className="justify-center py-36 flex min-h-screen bg-background">
      <p>Hello</p>
    </div>
  );
}
