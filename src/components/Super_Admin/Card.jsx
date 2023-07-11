import { SlArrowRight } from "react-icons/sl";
import { useDispatch } from "react-redux";
import {
  changeCampaign,
  changeLOB,
  changeLP,
} from "../../redux/SuperAdmin/campContentSlice";
import { reqWithData } from "../../apis/requestTypes";

const Card = ({ data, type }) => {
  const dispatch = useDispatch();
  const handleClick = async (id) => {
    if (type === "Campaign") {
      const dataLobs = await reqWithData("su/getcampaigncontent", {
        context: 2,
        idCampaign: id,
      });
      if (dataLobs && dataLobs.data && dataLobs.status === 200) {
        const data1 = dataLobs.data[0].Lobs.map((el, index) => {
          return { ...el, active: false };
          /* if (index === 0) {
						return { ...el, active: true };
					} else {
					} */
        });
        dispatch(changeCampaign({ data: data1, id }));
      }
    } else if (type === "LOB´s") {
      const dataLP = await reqWithData("su/getcampaigncontent", {
        context: 3,
        idLob: id,
      });
      if (dataLP && dataLP.data && dataLP.status === 200) {
        const data1 = dataLP.data[0].LearningPlan.map((el, index) => {
          return { ...el, active: false };
        });
        const data2 = dataLP.data[1].Courses;
        dispatch(
          changeLOB({
            lp: data1,
            courses: data2,
            id,
          })
        );
      }
    } else if (type === "learningPlan") {
      const coursesLP = await reqWithData("su/getcampaigncontent", {
        context: 4,
        idLearningPlan: id,
      });
      if (coursesLP && coursesLP.data && coursesLP.status === 200) {
        const data1 = coursesLP.data[0].LearningPlan;
        dispatch(changeLP({ data: data1, id }));
      }
    }
  };

  return (
    <button
      className={`bg-white h-12 w-full rounded-lg hover:bg-opacity-75 shadow-lg mb-2 flex justify-between items-center px-4
					${data.active ? "text-white font-bold bg-opacity-50 bg-primaryPink" : ""}				
			`}
      disabled={type === "disabled"}
      onClick={() => handleClick(data.id)}
    >
      {data.name}
      {type !== "disabled" && <SlArrowRight /* color="#780096" */ />}
    </button>
  );
};

export default Card;
