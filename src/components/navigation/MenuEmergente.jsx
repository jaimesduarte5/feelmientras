import { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/loginSlice";
import useClickOutside from "../../Hooks/useClickOutside";

const MenuEmergente = ({ setShowMenu }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);
  const { role, nameCampaign, nameLob, wave } = userData;
  //clickoutside cierra el menu
  useClickOutside(ref, () => setShowMenu(false));

  return (
    <div
      ref={ref}
      className="h-96 w-60 bg-primaryDark rounded-md absolute text-white p-4 z-50"
      style={{ zIndex: "1000 !important" }}
      onClick={() => {
        setShowMenu(false);
      }}
    >
      <div className="flex items-center">
        <div className="bg-primaryPink rounded-lg h-12 w-12 mr-4"></div>
        <div>
          <p className="text-sm">{userData.nombre || ""}</p>
          <p className="text-xs">{userData.role || ""}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between h-72  pt-4">
        {role === "Agent" ? (
          <div>
            <h3 className="text-primaryPink font-semibold">Campaign</h3>
            <p className="text-sm  mb-1">{nameCampaign}</p>
            <div className="bg-white w-full h-[1px]" />
            <h3 className="text-primaryPink mt-4 font-semibold">LOB</h3>
            <p className="text-sm mb-1">{nameLob}</p>
            <div className="bg-white w-full h-[1px]" />
            <h3 className="text-primaryPink mt-4 font-semibold">WAVE</h3>
            <p className="text-sm mb-1">{wave}</p>
            <div className="bg-white w-full h-[1px]" />
          </div>
        ) : (
          <div className="flex flex-col justify-between ml-16  h-72 pt-4">
            <div className="flex flex-col">
              <Link to="#">
                <span className="text-sm hover mb-1">Inbox</span>
              </Link>
              <Link to="#">
                <span className="text-sm hover:text-primaryPink mb-1">
                  Notifications
                </span>
              </Link>
              <Link to="#">
                <span className="text-sm hover:text-primaryPink mb-1">
                  Meetings
                </span>
              </Link>
            </div>
            <div className="flex flex-col">
              <Link to="#">
                <span className="text-sm  hover:text-primaryPink mb-1">
                  Documents
                </span>
              </Link>
              <Link to="#">
                <span className="text-sm hover:text-primaryPink mb-1">
                  Notes
                </span>
              </Link>
            </div>
            <div className="flex flex-col">
              <Link to="#">
                <span className="text-sm hover:text-primaryPink mb-1">
                  Settings
                </span>
              </Link>
              <Link to="#">
                <span className="text-sm hover:text-primaryPink mb-1">
                  Help
                </span>
              </Link>
            </div>
          </div>
        )}
        <div className="flex flex-col mt-4 ">
          <Link to="/logout">
            <span className="text-sm hover:text-primaryPink mb-1">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MenuEmergente;
