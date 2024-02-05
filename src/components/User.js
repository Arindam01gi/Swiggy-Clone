import { useState } from "react";

const User = ({ name }) => {
  const [count, setCount] = useState(0);
  const [count1] = useState(1);
  return (
    <div className="user-card">
      <h1>
        Count:{count}
        <span>
          <button onClick={() => {setCount(count+1)}}>+</button>
          <button onClick={() => {setCount(count-1)}}>-</button>
        </span>
      </h1>
      <h2>{name}</h2>
      <h4>Location: Baguiati</h4>
      <p>arindammaiti2018@gmail.com</p>
    </div>
  );
};

export default User;
