import { Fragment, useState } from 'react'
import { BiAngry, BiSad, BiMeh, BiSmile, BiHappy } from 'react-icons/bi'

export const Form = ({
  title = '',
  options = [{
    idLTsat: 0,
    idQTsat: 0,
    questionTsat: 'title',
    value: '0'
  }],
  handleChangeOptions = () => {},
  handleSubmitData = () => {}
}) => {
  const [isValidated, setIsValidated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if(!isValidated) return
    handleSubmitData()
    setIsValidated(false)
    handleChangeOptions((prevState) => prevState.map((option) => ({...option, value: '0' })))
  };

  const handleChange = (event, id) => {
    const updatedOptions = options.map(option =>
      option.idQTsat === id ? { ...option, value: event.target.value } : option
    );
    handleChangeOptions(updatedOptions);
    if(updatedOptions.find((option) => option.value === '0')) return
    setIsValidated(true)
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 h-auto"
      >
        <fieldset className='grid grid-cols-2 gap-x-4 gap-y-3'>
          <h3 className='bg-primaryPink text-white p-2 text-center text-lg font-semibold outline-offset-2 rounded'>{title}</h3>
          <div className='grid grid-cols-5 gap-x-4 items-center justify-items-center' >
            <i className='flex relative items-center justify-center bg-primaryPink text-white w-11 h-11 rounded'>
              <BiAngry className='w-full h-full p-1' />
            </i>
            <i className='flex relative items-center justify-center bg-primaryPink text-white w-11 h-11 rounded'>
              <BiSad className='w-full h-full p-1' />
            </i>
            <i className='flex relative items-center justify-center bg-primaryPink text-white w-11 h-11 rounded'>
              <BiMeh className='w-full h-full p-1' />
            </i>
            <i className='flex relative items-center justify-center bg-primaryPink text-white w-11 h-11 rounded'>
              <BiSmile className='w-full h-full p-1' />
            </i>
            <i className='flex relative items-center justify-center bg-primaryPink text-white w-11 h-11 rounded'>
              <BiHappy className='w-full h-full p-1' />
            </i>
          </div>
          {options.map(({ idQTsat, questionTsat, value }) =>
            <Fragment key={idQTsat}>
              <p className='text-white select-none'>{questionTsat}</p>
              <div className='grid grid-cols-5 gap-x-4 items-center justify-items-center'>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`1_${idQTsat}`}
                    name={idQTsat}
                    value={1}
                    onChange={(e) => handleChange(e, idQTsat)} checked={value === '1'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '1' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`1_${idQTsat}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`2_${idQTsat}`}
                    name={idQTsat}
                    value={2}
                    onChange={(e) => handleChange(e, idQTsat)} checked={value === '2'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '2' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`2_${idQTsat}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`3_${idQTsat}`}
                    name={idQTsat}
                    value={3}
                    onChange={(e) => handleChange(e, idQTsat)} checked={value === '3'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '3' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`3_${idQTsat}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`4_${idQTsat}`}
                    name={idQTsat}
                    value={4}
                    onChange={(e) => handleChange(e, idQTsat)} checked={value === '4'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '4' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`4_${idQTsat}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`5_${idQTsat}`}
                    name={idQTsat}
                    value={5}
                    onChange={(e) => handleChange(e, idQTsat)} checked={value === '5'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '5' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`5_${idQTsat}`}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </fieldset>
        <div className='w-auto flex justify-end'>
          <button type="submit" className={`${isValidated ? 'bg-primaryPink' : 'bg-primaryDark'} border-2 border-primaryPink text-white px-2 py-1 mt-5 rounded`}>Send</button>
        </div>
      </form>
    </>
  )
}