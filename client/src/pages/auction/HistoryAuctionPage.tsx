import { useState, useEffect } from "react";
import "../../assets/css/HistoryAuctionPage.css";
import HistoryAunctionCard from "../../components/auction/HistoryAuctionCard";
import UserHomePage from "../user/UserHomePage";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux/es/exports";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountData } from "../../features/axios/api/account/AccountsDetail";
import { loginSuccess } from "../../features/redux/slices/account/accountLoginAuthSlice";
import { userInterface } from "../../types/UserInterface";
import { getHistoryByAccount } from "../../features/axios/api/history/HistoryDetails";
// import { accountData } from "../../../features/axios/api/account/AccountsDetail";
// import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";
// import { userInterface } from "../../../types/UserInterface";
// import { employerData } from "../../../features/axios/api/account/AccountDetails";
import { HistoryInterface } from "../../types/HistoryInterface";
const HistoryAuction = () => {
  const dispatch = useDispatch();
  const [historyAuctions, setHistoryAuctions] = useState<[HistoryInterface] | []>([]);
  const [accountDetails, setAccountDetails] = useState<userInterface | null>(
    null
  ); // Đảm bảo setAccountDetails có thể nhận giá trị null

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("get token")
    if (token) {
      console.log("login success");
      dispatch(loginSuccess());
      fetchData();
    }
  }, [dispatch]); // useEffect sẽ được gọi lại mỗi khi dispatch thay đổi

  const getAccountDetails = async () => {
    try {
      const data = await accountData();
      console.log("data", data);
      setAccountDetails(data);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await accountData();
        console.log("data", data);
        setAccountDetails(data);
      } catch (error) {
        console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
      }
    };

    fetchData();
  }, []);

  const [HisSate, setHisSate] = useState('');
  useEffect(() => {
    setHisSate('chưa thanh toán');
  }, []); // Empty dependency array ensures this effect runs only once after the initial render


  useEffect(() => {
    if (accountDetails) {
      const fetchHistoryAuctions = async () => {
        try {
          console.log("1234");
          console.log("acc", accountDetails);
          const hisData = await getHistoryByAccount(accountDetails.email);
          console.log("hisdata", hisData);
          setHistoryAuctions(hisData);
        } catch (error) {
          console.error("Lỗi xảy ra khi thiết lập lịch sử đấu giá:", error);
        }
      };

      fetchHistoryAuctions();
      console.log("debug hisState", HisSate)
    }
  }, [accountDetails, HisSate]); // Chỉ gọi lại khi accountDetails thay đổi

  const fetchData = async () => {
    console.log("buoc 1");
    await getAccountDetails();
    console.log("buoc 2");
    console.log(accountDetails);
    if (accountDetails) {
      console.log("buoc 3");
      try {
        console.log("1234");
        const hisData = await getHistoryByAccount(accountDetails.email);
        setHistoryAuctions(hisData);

        console.log(hisData);
        console.log(accountDetails);

      } catch (error) {
        console.error("Lỗi xảy ra khi thiết lập lịch sử đấu giá:", error);
      }
    }
  };

  /*  useEffect(()=> {
     debug();
   },[]) */

  /* const debug = async() => {
    const test = await getHistoryByAccount("doanthiminhhangit@gmail.com");
    console.log("test", test);
  } */

  return (
    <>
      <h1 className="title"> Lịch sử đấu giá: </h1>
      {/* <div className="container nav">
                <a href="">Thông tin tài khoản</a>
                <a href="">Giỏ hàng</a>
                <a href="">Sim chờ</a>
                <a href="">Lịch sử đấu giá</a>
                <a href="">Tài liệu của tôi</a>
            </div> */}

      <UserHomePage />

      {historyAuctions?.length > 0 ? (
        <div>
          <div className="container content" style={{ display: "flex" }}>
            <button className="nav" style={{ flex: 1 }} onClick={() => setHisSate('Chưa thanh toán')}>
              Chưa thanh toán
            </button>
            <button className="nav" style={{ flex: 1 }} onClick={() => setHisSate('Đã thanh toán')}>
              Đã thanh toán
            </button>
            <button className="nav" style={{ flex: 1 }} onClick={() => setHisSate('Đã hủy')}>
              Đã hủy thanh toán
            </button>
          </div>

          <div className="container content">
            <table className="custom-table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">Sim</th>
                  <th scope="col">Room</th>
                  <th scope="col">Create at</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>

              <tbody>
                {historyAuctions.filter((historyAuction) => historyAuction.state?.toLowerCase() === HisSate?.toLowerCase()).map((historyAuction) => (
                  <HistoryAunctionCard historyAuction={historyAuction} cardState={HisSate} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="container content">
          <div className="relative top-[-25vh] left-[25%] border-[2px] border-solid border-[#2B394F] rounded-xl w-[65%]">
            <p className="p-2">Bạn chưa có lịch sử đấu giá.</p>
          </div>

          {/* <table className="custom-table table-dark table-striped">
            <tbody>
              <tr>
                <th scope="row">nothing</th>
                <td>nothing</td>
                <td>nothing</td>
                <td>
                  <a className="button Bpay" href="/user/payment/123/1234213">
                    Thanh toán
                  </a>
                  <a className="button BDpay" href="/user/cancel/123/1234213">
                    Hủy thanh toán
                  </a>
                </td>
              </tr>
            </tbody>
          </table> */}
        </div>
      )}

      {/* {historyAuctions?.length > 0 ? (
        <div>
          <div className="container content" style={{ display: "flex" }}>
            <button className="nav" style={{ flex: 1 }} onClick={() => setHisSate('Chưa thanh toán')}>
              Chưa thanh toán
            </button>
            <button className="nav" style={{ flex: 1 }} onClick={() => setHisSate('Đã thanh toán')}>
              Đã thanh toán
            </button>
            <button className="nav" style={{ flex: 1 }} onClick={() => setHisSate('Đã hủy')}>
              Đã hủy thanh toán
            </button>
          </div>

          <div className="container content">
            <table className="custom-table table-dark table-striped">
              <thead>
                <tr>
                  <th scope="col">SIM</th>
                  <th scope="col">ROOM</th>
                  <th scope="col">CREATE AT</th>
                  <th scope="col">#</th>
                </tr>
              </thead>


              <tbody>
                {historyAuctions.filter((historyAuction) => { return historyAuction.state?.toLowerCase() === HisSate?.toLowerCase() }).map((historyAuction) => (
                  <HistoryAunctionCard historyAuction={historyAuction} cardState={HisSate} />
                ))}
              </tbody>
            </table>
          </div>
          ) : (
          <tbody>
            <tr>
              <th scope="row">nothing</th>
              <td>nothing</td>
              <td>nothing</td>
              <td>
                <a className="button Bpay" href="/user/payment/123/1234213">
                  Thanh toán
                </a>
                <a className="button BDpay" href="/user/cancel/123/1234213">
                  Hủy thanh toán
                </a>
              </td>
            </tr>
          </tbody>
          )}

        </div> */}
    </>
  );
};

export default HistoryAuction;
