import "./ButtonBox.css";

// ButtonBox component:
//  frame for the Button components
const ButtonBox = ({ children }) => {
  return <div className="buttonBox">{children}</div>;
};

export default ButtonBox;