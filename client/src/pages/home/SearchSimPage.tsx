import SearchSim from "../../components/auction/SearchSim";
import UserSideFooter from "../../components/footer/UserSideFooter";
import CommonHeader from "../../components/header/CommonHeader";
import UserHeader from "../../components/header/UserHeader";

function SearchSimPage() {
  return (
    <div>
      {localStorage.getItem("token") ? <UserHeader /> : <CommonHeader />}

      <SearchSim />
      <UserSideFooter />
    </div>
  );
}

export default SearchSimPage;
