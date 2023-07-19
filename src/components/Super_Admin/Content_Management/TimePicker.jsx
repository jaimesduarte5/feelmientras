import { useEffect, useState } from 'react';

export const TimePicker = ({ activity, handleActivity }) => {
  const [time, setTime] = useState('00:00');

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleTimeInSeconds = () => {
    const [minute, second] = time.split(':');
    const timeInSeconds = parseInt(minute) * 60 + parseInt(second);
    handleActivity({ target: { name: 'timeActivity', value: timeInSeconds } });
  }

  const generateTimeOptions = () => {
    const options = [];
    for (let min = 0; min < 60; min += 1) {
      for (let sec = 0; sec < 60; sec += 30) {
        const formattedMinute = min.toString().padStart(2, '0');
        const formattedSecond = sec.toString().padStart(2, '0');
        options.push(`${formattedMinute}:${formattedSecond}`);
      }
    }
    return options;
  };

  useEffect(() => {
    handleTimeInSeconds();
  }, [time]);

  return (
    <select className="bg-primaryDark text-md text-white rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5" id="time" value={time} onChange={handleTimeChange}>
      {generateTimeOptions().map((option) => (
        <option key={option} value={option} className=''>
          {option}
        </option>
      ))}
    </select>
  );
};