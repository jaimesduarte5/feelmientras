import { useState, useEffect } from "react";

const useCounter = () => {
  const [diff, setDiff] = useState(null);
  const [initial, setInitial] = useState(null);

  const tick = () => {
    setDiff(new Date(+new Date() - initial));
  };

  const start = () => {
    setInitial(+new Date());
  };

  useEffect(() => {
    if (initial) {
      requestAnimationFrame(tick);
    }
  }, [initial]);

  useEffect(() => {
    if (diff) {
      requestAnimationFrame(tick);
    }
  }, [diff]);

  let time = timeFormat(diff);

  return { start, time };
};

const timeFormat = (date) => {
  if (!date) return "00:00:00:00";
  let mm = date.getUTCMinutes(),
    ss = date.getSeconds(),
    cm = Math.round(date.getMilliseconds() / 10);

  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;
  cm = cm < 10 ? "0" + cm : cm;
  return `${mm}:${ss}:${cm}`;
};

export default useCounter;
