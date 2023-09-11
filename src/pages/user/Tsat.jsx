import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";

import { Form } from "../../components/Tsat/Form";

import { getTsatQuestions, postTsatAnswers } from "../../redux/User/coursesAgentSlice";

const Tsat = () => {
  const dispatch = useDispatch();
  const { isLoading, tsat } = useSelector(
    (state) => state.agentLearning
  );
  const { email } = useSelector(
    (state) => state.login.userData
  );
  const languages = {
    ES: {
      name: 'spanishQ',
      code: 2
    },
    EN: {
      name: 'englishQ',
      code: 1
    }
  }
  const [options, setOptions] = useState([])
  const [language, setLanguage] = useState(languages.EN)

  useEffect(() => {
    dispatch(getTsatQuestions(1)) // TODO change
  }, [])

  useEffect(() => {
    if(tsat[language.name]) {
      setOptions(tsat[language.name].map(option => ({
        ...option,
        value: '0'
      })))
    }
  }, [tsat, language])

  const handleChangeOptions = (value) => {
    setOptions(value)
  }

  const handleChangeLanguage = () => {
    if(language.name === languages.EN.name) {
      setLanguage(languages.ES)
    }

    if(language.name === languages.ES.name) {
      setLanguage(languages.EN)
    }
  }

  const handleSubmitData = () => {
    const sendData = {
      requestedBy: email,
      idLTsat: language.code,
      idTTsat: tsat.idTTsat,
      idCourse: 4, // TODO change
      idLP: null, // TODO change
      answers: options.map(({ idQTsat, value }) => ({
        idQTsat,
        value
      }))
    }

    dispatch(postTsatAnswers(sendData))
  }

  return (
    <div className="w-full bg-primaryDark bg-opacity-75 min-h-full rounded-lg p-4">
      {isLoading ? (
        <div className="w-full h-56 flex justify-center items-center">
          <RotateSpinner size={60} color="#FF0082" />
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button type="button" className={`bg-primaryPink text-white px-2 py-1 rounded self-end`} onClick={handleChangeLanguage}>
              {language.name === languages.EN.name && 'Español'}
              {language.name === languages.ES.name && 'English'}
            </button>
          </div>
          <Form title={tsat.typeTsat} options={options} handleChangeOptions={handleChangeOptions} handleSubmitData={handleSubmitData}/>
        </>
      )}
    </div>
  );
};

export default Tsat;
