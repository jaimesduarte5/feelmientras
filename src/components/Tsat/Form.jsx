import { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { BiAngry, BiSad, BiMeh, BiSmile, BiHappy } from 'react-icons/bi'
import { postTsat } from '../../redux/User/coursesAgentSlice'

export const Form = ({
  title = '',
  options = [{
    id: 'id',
    title: 'title',
    value: '0'
  }],
  handleChangeState = () => {}
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault()
    if(options.find((option) => option.value === '0')) return
    // TODO Conectar endpoint
    dispatch(postTsat({}))
    handleChangeState((prevState) => prevState.map((option) => ({...option, value: '0' })))
  };

  const handleChange = (event, id) => {
    const updatedOptions = options.map(option =>
      option.id === id ? { ...option, value: event.target.value } : option
    );
    handleChangeState(updatedOptions);
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
          {options.map(({ id, title, value }) =>
            <Fragment key={id}>
              <p className='text-white select-none'>{title}</p>
              <div className='grid grid-cols-5 gap-x-4 items-center justify-items-center'>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`1_${id}`}
                    name={id}
                    value={1}
                    onChange={(e) => handleChange(e, id)} checked={value === '1'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '1' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`1_${id}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`2_${id}`}
                    name={id}
                    value={2}
                    onChange={(e) => handleChange(e, id)} checked={value === '2'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '2' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`2_${id}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`3_${id}`}
                    name={id}
                    value={3}
                    onChange={(e) => handleChange(e, id)} checked={value === '3'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '3' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`3_${id}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`4_${id}`}
                    name={id}
                    value={4}
                    onChange={(e) => handleChange(e, id)} checked={value === '4'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '4' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`4_${id}`}
                  />
                </div>
                <div>
                  <input
                    className='hidden'
                    type="radio"
                    id={`5_${id}`}
                    name={id}
                    value={5}
                    onChange={(e) => handleChange(e, id)} checked={value === '5'}
                  />
                  <label
                    className={`inline-block w-8 h-8 rounded hover:bg-primaryPink cursor-pointer ${value === '5' ? 'bg-primaryPink' : 'bg-white'}`}
                    htmlFor={`5_${id}`}
                  />
                </div>
              </div>
            </Fragment>
          )}
        </fieldset>
        <div className='w-auto flex justify-end'>
          <button tton type="submit" className='bg-primaryPink text-white px-2 py-1 mt-5 rounded'>Finish</button>
        </div>
      </form>
    </>
  )
}