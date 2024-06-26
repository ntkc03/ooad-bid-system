import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useAuctionData } from "../auction/utils/utils";


//************************************
// Description: Phần Header cho trang chung của người dùng.
//************************************

// Mảng lưu trữ thông tin chuyển hướng cho navigation section trên header.
/* const navigation = [
  { name: "DS công bố", href: "/auction-list", current: false },
  { name: "Sim sắp đấu giá", href: "/upcomming-auction-list", current: false },
  { name: "Kết quả đấu giá", href: "/auction/completed", current: false },
  { name: "Thông báo đấu giá", href: "/", current: false },
]; */

// Hàm tạo một chuỗi tên lớp dựa trên các đối số đầu vào.
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function CommonHeader() {
  const [allAuctions, completedAuctions] = useAuctionData();

  // Example useEffect hook that runs when `completedAuctions` changes
  useEffect(() => {
    console.log("Completed auctions updated:", completedAuctions);
  }, [completedAuctions]);

  return (
    <Disclosure as="nav" className="bg-background z-50">
      {({ open }) => (
        <>
          <div className="lg:mx-2 mx-auto px-4 md:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Tên của trang web */}
              <a
                href="/auction-list"
                className="text-white flex text-bold text-4xl font-logo"
              >
                DGS
              </a>

              {/* Tương ứng với một đối tượng trong mảng navigation, tạo ra một bộ chuyển hướng có tên và đường dẫn đã được lưu. */}
              {/* Navigation trên kích thước lớn hơn kích thước điện thoại (lgall).*/}
              {/* <div className="flex-1 justify-center items-center hidden lg:flex">
                <div className="flex space-x-4 ">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        "text-white hover:text-currentText",
                        "rounded-lg px-3 py-2 text-base font-mediun"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div> */}

              <div className="absolute right-0 flex lg:relative lg:block">
                <Disclosure.Button className="flex items-center float-right rounded-lg p-2 hover:text-currentText text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <a href="/signup" className="font-bold">Đăng ký</a>
                </Disclosure.Button>
                {/* Nút đăng nhập --> Chuyển hướng sang trang đăng nhập tài khoản. */}
                <Disclosure.Button className="flex items-center float-right rounded-lg p-2 hover:text-currentText text-textColor focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <a href="/login" className="font-bold">Đăng nhập</a>
                </Disclosure.Button>
                <div className="flex lg:hidden">
                  {/* Nút mở navigation đối với điện thoại*/}
                  <Disclosure.Button className="flex float-right items-center rounded-lg p-2 text-white hover:bg-white hover:bg-opacity-30 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                
              </div>
            </div>
          </div>

          {/* Navigation của trang web trên điện thoại. Khi lớn hơn kích thước điện thoại thì nó sẽ không xuất hiện. */}
        {/*   <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    "bg-white bg-opacity-20 text-textColor",
                    "hover:text-currentText",
                    "block rounded-lg px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
}

export default CommonHeader;
export {};
