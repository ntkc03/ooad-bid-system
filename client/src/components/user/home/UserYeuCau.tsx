import { CONNREFUSED } from "dns";
import CommonHeader from "../../header/CommonHeader";
import UserSideFooter from "../../footer/UserSideFooter";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { RoomInterface } from "../../../types/RoomInterface";
import createNewRoom from "../../../features/axios/api/room/CreateRoom";
import { loginSuccess } from "../../../features/redux/slices/account/accountLoginAuthSlice";
import { accountData } from "../../../features/axios/api/account/AccountsDetail";
import { SimInterface } from "../../../types/SimInterface";
import createNewSim from "../../../features/axios/api/sim/CreateSim";
import createNewNotification from "../../../features/axios/api/notification/CreateNotification";
import { NotificationInterface } from "../../../types/NotificationInterface";
import { userInterface } from "../../../types/UserInterface";
function UserYeuCau() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();
  const [sim, setSim] = useState<SimInterface>({} as SimInterface);
  const [room, setRoom] = useState<RoomInterface>({} as RoomInterface);
  const [notification, setNotification] = useState<NotificationInterface>(
    {} as NotificationInterface
  );
  const [user, setUser] = useState<userInterface>({} as any);
  const notify = (msg: string, type: string) =>
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });
  const getAccountDetails = async () => {
    try {
      const data = await accountData();
      setUser(data);
      //console.log("data", user);
    } catch (error) {
      console.error("Lỗi xảy ra khi lấy chi tiết tài khoản:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(loginSuccess());
      getAccountDetails();
    }
  }, [dispatch]);
  const submitHandler = async (data: any) => {
    if (data.start_at) {
      data.start_at = new Date(data.start_at);
    }
    if (data.provider === "Viettel") {
      data.code = "VTL" + "-" + Math.floor(Math.random() * 1000000);
    } else if (data.provider === "Vinaphone") {
      data.code = "VNP" + "-" + Math.floor(Math.random() * 1000000);
    } else if (data.provider === "Mobifone") {
      data.code = "MBF" + "-" + Math.floor(Math.random() * 1000000);
    } else if (data.provider === "Vietnamobile") {
      data.code = "VNM" + "-" + Math.floor(Math.random() * 1000000);
    } else if (data.provider === "Gmobile") {
      data.code = "GMB" + "-" + Math.floor(Math.random() * 1000000);
    } else {
      data.code = "OTH" + "-" + Math.floor(Math.random() * 1000000);
    }

    room.phone = data.phone;
    room.provider = data.provider;
    room.price = data.price;
    room.time_limit = data.time_limit;
    room.start_at = data.start_at;
    room.state = "Chờ duyệt";
    room.code = data.code;

    sim.number = data.phone;
    sim.provider = data.provider;
    sim.type = data.type;
    sim.start_at = data.start_at;
    sim.time_limit = data.time_limit;
    sim.starting_price = data.price;

    notification.account = "admin@gmail.com";
    notification.content = "Yêu cầu tạo phiên đấu giá";
    notification.type = "yeuCauDuyet";
    notification.from = user.email;

    createNewNotification(notification)
      .then((response: any) => {
/*         notify("Ziu create notification thành công", "success");
 */      })
      .catch((error: any) => {
        notify(error.message, "error");
        console.log(error);
      });
    console.log(data);
    createNewRoom(room)
      .then((response: any) => {
        console.log(room);
        notify("Ziu create room thành công", "success");
      })
      .catch((error: any) => {
/*         notify(error.message, "error");
 */        console.log(error);
      });
    createNewSim(sim)
      .then((response: any) => {
/*         notify("Ziu create sim thành công", "success");
 */      })
      .catch((error: any) => {
/*         notify(error.message, "error");
 */        console.log(error);
      });
  };

  return (
    <div>
      {/* <CommonHeader /> */}
      <ToastContainer />
      <div className="ml-20 mr-20 mt-10">
        <div className="w-full flex flex-col sm:flex-col md:flex-row items-start justify-between max-h-fit profile-top-title-wrap">
          <h2 className=" py-1 md:text-3xl lg:text-[40px] font-bold drop-shadow-2xl mb-3 text-white">
            {" "}
            Yêu cầu tạo phiên đấu giá{" "}
          </h2>
          {/* button with text */}
          {/* svg lock button  */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <button
              type="submit"
              className="border border-border rounded-2xl flex items-center text-white font-bold py-2 px-4 rounded-lgn  hover:backdrop-brightness-200 "
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.18 8.03933L18.6435 7.57589C19.4113 6.80804 20.6563 6.80804 21.4241 7.57589C22.192 8.34374 22.192 9.58868 21.4241 10.3565L20.9607 10.82M18.18 8.03933C18.18 8.03933 18.238 9.02414 19.1069 9.89309C19.9759 10.762 20.9607 10.82 20.9607 10.82M18.18 8.03933L13.9194 12.2999C13.6308 12.5885 13.4865 12.7328 13.3624 12.8919C13.2161 13.0796 13.0906 13.2827 12.9882 13.4975C12.9014 13.6797 12.8368 13.8732 12.7078 14.2604L12.2946 15.5L12.1609 15.901M20.9607 10.82L16.7001 15.0806C16.4115 15.3692 16.2672 15.5135 16.1081 15.6376C15.9204 15.7839 15.7173 15.9094 15.5025 16.0118C15.3203 16.0986 15.1268 16.1632 14.7396 16.2922L13.5 16.7054L13.099 16.8391M13.099 16.8391L12.6979 16.9728C12.5074 17.0363 12.2973 16.9867 12.1553 16.8447C12.0133 16.7027 11.9637 16.4926 12.0272 16.3021L12.1609 15.901M13.099 16.8391L12.1609 15.901"
                  stroke="#ffffff"
                  stroke-width="1.5"
                />
                <path
                  d="M8 13H10.5"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8 9H14.5"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M8 17H9.5"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M19.8284 3.17157C18.6569 2 16.7712 2 13 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3 4.34315 3 6.22876 3 10V14C3 17.7712 3 19.6569 4.17157 20.8284C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8284C20.7715 19.8853 20.9554 18.4796 20.9913 16"
                  stroke="#ffffff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <span className="ml-2">Tạo yêu cầu</span>
            </button>
          </form>
        </div>
        <div className="border border-border rounded-2xl text-white mt-5">
          <form>
            {/* add space */}

            <div className="px-8 text-base pt-6 pb-6">
              <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label className="block font-medium leading-6 text-white">
                    Số sim:
                    <span className="ml-2"></span>
                    <input
                      required
                      type="text"
                      {...register("phone", { required: true })}
                      className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                    />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="block  font-medium leading-6 text-white">
                    Loại sim:
                    <span className="ml-2"></span>
                    <select
                      {...register("type", { required: true })}
                      className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                    >
                      <option value="Lặp2">Tam hoa, Tứ quý, ... </option>
                      <option value="Soi gương">Soi gương ABC.CBA</option>
                      <option value="Lặp">Lặp AB.AB</option>
                      <option value="Tiến">Tiến 1234, 010203</option>
                      <option value="Số gánh">Số gánh ABBA, ABBBA</option>
                    </select>{" "}
                  </label>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 justify-center gap-x-6 gap-y-8 sm:grid-cols-4">
                <div className="sm:col-span-2">
                  <label className="block  font-medium leading-6 text-white">
                    Nhà mạng:
                    <span className="ml-2"></span>
                    {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                    <input
                      {...register("provider", { required: true })}
                      type="text"
                      className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                      value={user.name}
                      readOnly
                    />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium leading-6 text-white">
                    Đặt mức sàn (đơn vị: Đồng):
                    <span className="ml-2"></span>
                    <input
                      required
                      {...register("price", { required: true })}
                      type="text"
                      className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                    />
                  </label>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 justify-center gap-x-6  sm:grid-cols-4">
                <p className="sm:col-span-4 text-white font-medium">
                  Thời gian
                </p>
                <div className="sm:col-span-2">
                  <label className="block  font-medium leading-6 text-white text-xs">
                    Bắt đầu:
                    <span className="ml-2"></span>
                    {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                    {/* create time, date */}
                    <input
                      required
                      {...register("start_at", { required: true })}
                      type="datetime-local"
                      className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                    />
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <label className="block  font-medium leading-6 text-white text-xs">
                    Kết thúc:
                    <span className="ml-2"></span>
                    {/* <input type="text" className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none" /> */}
                    {/* create time, date */}
                    <input
                      {...register("time_limit", { required: true })}
                      className="w-full mt-2 h-12 px-4 border bg-background text-white border-gray-800 rounded-lg focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/*   <div className="mt-10">
        <UserSideFooter />
      </div> */}
    </div>
  );
}
export default UserYeuCau;
