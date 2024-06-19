import "./Wrapper.css";


// Wrapper component:
//  frame that holds all the children components of the calculator in place
//  centers the whole calculator 

const Wrapper = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;