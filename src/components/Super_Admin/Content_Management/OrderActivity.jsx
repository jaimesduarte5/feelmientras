import React, { useState, useEffect } from "react";
import ActivityCardOrder from "./ActivityCardOrder";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { orderActivities } from "../../../redux/SuperAdmin/cousesManageSlice";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const OrderActivity = () => {
  const dispatch = useDispatch();
  const { newCourse } = useSelector((state) => state.courses);
  const [order, setOrder] = useState(newCourse.activities);

  useEffect(() => {
    dispatch(orderActivities(order));
  }, [order]);

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
        setOrder((prevActivities) =>
          reorder(prevActivities, source.index, destination.index)
        );
      }}
    >
      <div>
        <Droppable droppableId="activities">
          {(provided) => (
            <div
              className="bg-white rounded-md p-4 overflow-y-scroll"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {order.map(({ nameActivity, idActivity }, index) => (
                <Draggable
                  key={idActivity}
                  draggableId={idActivity.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ActivityCardOrder
                        nameActivity={nameActivity}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default OrderActivity;
