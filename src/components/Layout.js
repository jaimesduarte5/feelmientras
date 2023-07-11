import Footer from "./navigation/Footer";
import SideBar from "./navigation/SideBar";
import TopBar from "./navigation/TopBar";
import DownBar from "./navigation/DownBar";
import bgbody from "../assets/img/bg_lines.png";
import { useSelector } from "react-redux";
import Loading from "./eventos/Loading";
import Toast from "./eventos/Toast";
import Alerts from "./eventos/Alerts";

function Layout({ children }) {
  const { loading, toast, confirmation } = useSelector((state) => state.alerts);
  return (
    <>
      <div
        className={`bg-secondaryDark bg-cover`}
        style={{
          backgroundImage: `url(${bgbody})`,
        }}
      >
        <div>
          {" "}
          <TopBar />{" "}
        </div>
        <div className=" flex">
          <div>
            <SideBar />
          </div>
          <main className=" md:m-2 lg:m-8 w-screen">{children}</main>
        </div>
      </div>
      <Footer />
      <div className="h-16 md:h-0">
        {" "}
        <DownBar />{" "}
      </div>
      {loading && <Loading />}
      {toast.show && <Toast />}
      {confirmation.show && <Alerts />}
    </>
  );
}

export default Layout;
