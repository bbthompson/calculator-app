import { Textfit } from "react-textfit";
import "./Screen.css";

// Screen Component:
//  child of the Wrapper component
//  displays the calculated values in the calculator

const Screen = ({ value }) => {
  return (
    <Textfit className="screen" mode="single" max={70}>
      {value}
    </Textfit>
  );
};

export default Screen;