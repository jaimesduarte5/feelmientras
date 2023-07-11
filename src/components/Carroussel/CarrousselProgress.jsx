import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAssignment } from "../../redux/User/coursesAgentSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";

//Styles
// importacion de los estilos de swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CircularProgress from "../eventos/CircularProgress";

const CarrousselProgress = () => {
  const dispatch = useDispatch();
  const [carroussell, setCarroussell] = useState([]);
  const { isLoading, learningPlans, courses } = useSelector(
    (state) => state.agentLearning
  );

  useEffect(() => {
    if (courses) {
      if (courses[0]?.idCourse === 0) {
        setCarroussell(learningPlans);
      } else {
        setCarroussell(learningPlans.concat(courses));
      }
    }
  }, [learningPlans, courses]);

  useEffect(() => {
    dispatch(getDataAssignment(1));
    dispatch(getDataAssignment(2));
  }, []);

  return (
    <div className="md:w-[85vw] ">
      <Swiper
        spaceBetween={50}
        modules={[Navigation, Pagination, A11y]}
        // navigation

        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1092: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1390: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {carroussell.length > 0 ? (
          carroussell.map((progress, index) => (
            <SwiperSlide key={index}>
              <CircularProgress
                title={progress.nameLearningPlan || progress.nameCourse}
                progress={progress.advanceAgent || progress.advanceLp || 0}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide></SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default CarrousselProgress;
