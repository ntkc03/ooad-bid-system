import ProviderList from "../../components/admin/ProviderList";
import HappeningAuctionList from "../../components/auction/HappeningAuctionList";
import UserSideFooter from "../../components/footer/UserSideFooter";
import AdminHeader from "../../components/header/AdminHeader";
import CommonHeader from "../../components/header/CommonHeader";
import UserHeader from "../../components/header/UserHeader";

function ProviderListPage() {
    return (
      <div>
          <AdminHeader />
          <ProviderList />
          <UserSideFooter/>
      </div>
    )
  }
  
  export default ProviderListPage;