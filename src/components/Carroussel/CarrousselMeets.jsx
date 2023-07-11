import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MeetingCardHome from "../POC/Meetings/MeetingCardHome";
import { getMeetings } from "../../redux/POC/meetingSlice";

//importaciones de swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";

//Styles
// importacion de los estilos de swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CarrousselMeets = () => {
  const dispatch = useDispatch();
  const { meetings } = useSelector((state) => state.meetingsManage);
  useEffect(() => {
    dispatch(getMeetings());
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
        {meetings.map((meeting) => (
          <SwiperSlide key={meeting.idMeet}>
            <MeetingCardHome meeting={meeting} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CarrousselMeets;
