import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { formCoursesOrder } from "../../../redux/POC/learningPlanSlice";
import CoursesCardPocMin from "./CoursesCardPocMin";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const CreateLPDnD = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.learningP);
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, source } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }
        const dataOrder = reorder(
          form.courses,
          source.index,
          destination.index
        );
        dispatch(formCoursesOrder(dataOrder));
      }}
    >
      <Droppable droppableId="courses">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="m-2 overflow-y-scroll custom-scroll pr-2 h-40 "
          >
            {form.courses.map((course, index) => (
              <Draggable
                key={course?.idCourse}
                draggableId={course.idCourse.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <CoursesCardPocMin course={course} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default CreateLPDnD;
