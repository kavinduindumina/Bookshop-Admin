import { useState, useEffect } from 'react';

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="mt-3 ms-2 fw-bold">
      <p>{currentDateTime.toLocaleString()}</p>
    </div>
  );
}

export default DateTime;
