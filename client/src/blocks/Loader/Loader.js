import React from 'react';
import './Loader.scss';

const Loader = React.memo(() => {
  return (
    <div className='Loader'>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: "auto",
          backgroundImage: "none",
          backgroundPosition: "initial initial",
          backgroundRepeat: "initial initial"
        }}
        width="200"
        height="200"
        display="block"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" r="0" fill="none" stroke="#fc0" strokeWidth="2">
          <animate
            attributeName="r"
            begin="-0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.2 0.8 1"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="0;40"
          ></animate>
          <animate
            attributeName="opacity"
            begin="-0.5s"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0 0.8 1"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="1;0"
          ></animate>
        </circle>
        <circle
          cx="50"
          cy="50"
          r="0"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="2"
        >
          <animate
            attributeName="r"
            calcMode="spline"
            dur="1s"
            keySplines="0 0.2 0.8 1"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="0;40"
          ></animate>
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="1s"
            keySplines="0.2 0 0.8 1"
            keyTimes="0;1"
            repeatCount="indefinite"
            values="1;0"
          ></animate>
        </circle>
      </svg>
    </div>
  )
});

export default Loader;
