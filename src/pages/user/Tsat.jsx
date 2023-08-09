import { useState } from "react";
import { useSelector } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";
import { Form } from "../../components/Tsat/Form";

const Tsat = () => {
  const { isLoading } = useSelector(
    (state) => state.agentLearning
  );

  const [options, setOptions] = useState([
    {
      id: '1q',
      title: 'I fell like a 2.0 Trainer now',
      value: '0'
    },
    {
      id: '2q',
      title: 'I am satisfied with the training',
      value: '0'
    },
    {
      id: '3q',
      title: 'I enjoyed this learning process',
      value: '0'
    },
    {
      id: '4q',
      title: 'I am ready to start applying the 2.0 strategies',
      value: '0'
    },
    {
      id: '5q',
      title: 'Tools used in this training were dynamic',
      value: '0'
    },
    {
      id: '6q',
      title: 'All topics have been covered',
      value: '0'
    },
    {
      id: '7q',
      title: 'I would like to keep learning new subjects this way',
      value: '0'
    },
    {
      id: '8q',
      title: 'I can do this training independently and at my own place',
      value: '0'
    },
    {
      id: '9q',
      title: 'The purpose of the activity and its goals were clear to me',
      value: '0'
    },
    {
      id: '10q',
      title: 'This learning strategy was helpful for me',
      value: '0'
    },
  ])

  const handleChangeState = (value) => {
    setOptions(value)
  }

  return (
    <div className="w-full bg-primaryDark bg-opacity-75 min-h-full rounded-lg p-4">
      {isLoading ? (
        <div className="w-full h-56 flex justify-center items-center">
          <RotateSpinner size={60} color="#FF0082" />
        </div>
      ) : (
        <Form title='T-SAT FOR TRAINERS' options={options} handleChangeState={handleChangeState}/>
      )}
    </div>
  );
};

export default Tsat;
