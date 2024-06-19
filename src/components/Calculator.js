import React, { useState } from "react";

import Wrapper from "./Wrapper";
import Screen from "./Screen";
import ButtonBox from "./ButtonBox";
import Button from "./Button";

// Array with Button Values
const btnValues = [
    ["C", "+/-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "="],
  ];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
  
const removeSpaces = (num) => num.toString().replace(/\s/g, "");
  
// math function
//  peforms calculation based upon math operator clicked by user
const math = (a, b, sign) =>
    sign === "+"
    ? a + b
    : sign === "-"
    ? a - b
    : sign === "X"
    ? a * b
    : a / b;

// Calculator Component 

function Calculator() {

    // state variables:
    //  num (entered value)
    //  sign (selected sign)
    //  res (calculated value)
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });


    // Function numClickHandler
    //  triggered when number buttons (0-9) are pressed
    //  gets value of the button and adds it to the current num value
    //  makes sure:
    //    no whole numbers start with zero
    //    there are no multiple zeroes before the comma(.)
    //    the format will be a "0." if "." is pressed first
    //    numbers are entered up to 16 integers long
    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                        ? toLocaleString(Number(removeSpaces(calc.num + value)))
                        : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    // commaClickHandler function:
    //  gets fired if decimal point (.) is pressed
    //  adds decimal point to the current num value to make it a decimal number
    //  makes sure that no multiple decimal points are possible
    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };


    // signClickHandler function:
    //  gets fired when the user press either +, –, * or /
    //  particular value is then set as a current sign value in the calc (calculator) object
    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.num
                ? calc.res
                : !calc.res
                ? calc.num 
                : toLocaleString(
                    math(
                    Number(removeSpaces(calc.res)),
                    Number(removeSpaces(calc.num)),
                    calc.sign
                    )
                ),
            num: 0,
        });
    };


    // equalsClickHandler function:
    //  calculates the result when the equals button (=) is pressed
    //    calculation is based on the current num, sign selected, and res value
    //  ensures:
    //    there are no effect on repeated calls
    //    users are unable to divide by 0
    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? "Can't divide with 0"
                        : toLocaleString(
                            math(
                                Number(removeSpaces(calc.res)),
                                Number(removeSpaces(calc.num)),
                                calc.sign
                            )
                        ),
                sign: "",
                num: 0,
            });
        }
    };

    // invertClickHanlder function
    //  checks if there is an entered value (num) or calculated value (res) and 
    //  then inverts them by multiplying by -1
    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    // percentClickHandler function
    //    checks if there’s any entered value (num) or calculated value (res) and 
    //    then calculates the percentage 
    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    // resetClickHandler function
    //  defaults all the initial values of calc (state object)
    //  which returns the calc state to initial state when the Calculator 
    //  app was first rendered
    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    return (
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res} />
            <ButtonBox>
                {/* map through and render all the buttons in the ButtonBox */}
                {btnValues.flat().map((btn, i) => {
                    return (
                        <Button
                            key={i}
                            className={ btn === "=" 
                                ? "equals" 
                                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                ? "operator"
                                : btn === "C"
                                ? "clear"
                                : btn === "+/-" || btn === "%"
                                ? "percent-signs"
                                : ""}
                            value={btn}
                            onClick={
                                btn === "C"
                                ? resetClickHandler
                                : btn === "+/-"
                                ? invertClickHandler
                                : btn === "%"
                                ? percentClickHandler
                                : btn === "=" 
                                ? equalsClickHandler
                                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                ? signClickHandler
                                : btn === "."
                                ? commaClickHandler
                                : numClickHandler
                            }
                        />
                    );
                })}
            </ButtonBox>
        </Wrapper>
    )
};

export default Calculator;