import {
  FaChartBar,
  FaBriefcase,
  FaEnvelope,
  FaFacebookMessenger,
  FaUser,
  FaCrosshairs,
  FaCross,
  FaAutoprefixer,
} from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { GoHistory } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaSimCard } from "react-icons/fa";

//************************************
// Description: Xử lý navigation
//************************************

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const ProviderNav = [
  {
    layout: "provider",
    pages: [
      {
        icon: <FaRegUser {...icon} />,
        name: "Thông tin tài khoản",
        path: "/provider/profile",
      },
      /*  {
          icon: <MdOutlineShoppingCart {...icon} />,
          name: "Giỏ hàng",
          path: "/user/applications",
        }, */
      {
        icon: <FaSimCard {...icon} />,
        name: "Yêu cầu tạo auction",
        path: "/provider/yeucau",
      },
      {
        icon: <FaAutoprefixer {...icon} />,
        name: "Yêu cầu xóa auction",
        path: "/provider/xoa",
      },
      /*  {
          icon: <GoHistory {...icon} />,
          name: "Lịch sử đấu giá",
          path: "/provider/auction",
        }, */

      {
        icon: <FaFacebookMessenger {...icon} />,
        name: "Trò chuyện",
        path: "/provider/messager",
      },
    ],
  },
];
