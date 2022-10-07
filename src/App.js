/**
 * This is a calculator application in react
 *
 * Author: Jacob, Web Dev Simplified
 */

import {useReducer} from "react"
import NumButton from "./NumButton"
import OperationButton from "./OperationButton"
import "./styles.css"

/** A constant that is used to define the actions that can be taken by the
 calculator. */
export const ACTIONS = {
    /* Defining the actions that can be taken by the calculator. */
    ADD_NUM: "add-num",
    CHOOSE_OPERATION: "choose-Operation",
    CLEAR: "clear",
    DELETE_NUM: "delete-num",
    EVALUATE: "evaluate",
}

/**
 * If the action is to add a number, add the number to the current operation. If
 * the action is to choose an operation, set the operation. If the action is to
 * clear, clear the state. If the action is to delete a number, delete the last
 * number from the current operation. If the action is to evaluate, evaluate the
 * current operation
 * @param state - the current state of the calculator
 */
function reducer(state, {type, payload}) {
    switch (type) {
        case ACTIONS.ADD_NUM:
            /* This is checking if the state is being overwritten. If it is, it
            will
            return the state with the current operation and the payload number. */
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperation: payload.num,
                    overwrite: false,
                }
            }
            /* This is checking if the current operation is 0 and the payload is
            0. If
            it is, it will return the state. */
            if (payload.num === "0" && state.currentOperation === "0") {
                return state
            }
            /* This is checking if the current operation already has a decimal
            point. If it does, it will return the state. */
            if (payload.num === "." && state.currentOperation.includes(".")) {
                return state
            }

            /* Returning the state with the current operation and the payload
            number. */
            return {
                ...state,
                currentOperation: `${state.currentOperation || ""}${payload.num}`,
            }
        /* This is checking if the current operation and the previous operation
        are null. If they are, it will return the state. */
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperation == null && state.previousOperation == null) {
                return state
                /* This is checking if the current operation is null. If it is, it
                will
                return the state with the operation. */
            }

            if (state.currentOperation == null) {
                return {
                    ...state,
                    operation: payload.operation,
                }
            }

            /* This is checking if the previous operation is null. If it is, it
            will
            return the state with the operation, the previous operation, and
            the current
            operation. */
            if (state.previousOperation == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    previousOperation: state.currentOperation,
                    currentOperation: null,
                }
            }

            /* Returning the state with the previous operation, the operation,
            and the current operation. */
            return {
                ...state,
                previousOperation: evaluate(state),
                operation: payload.operation,
                currentOperation: null,
            }
        /* Returning an empty object. */
        case ACTIONS.CLEAR:
            return {}

        /* This is checking if the state is being overwritten. If it is, it will
        return the state with the overwrite set to false and the current
        operation set
        to null. */
        case ACTIONS.DELETE_NUM:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperation: null,
                }
            }
            /* Checking if the current operation is null. If it is, it will
            return the state. */
            if (state.currentOperation == null) return state

            /* Checking if the current operation is null. If it is, it will
            return the state. */
            if (state.currentOperation.length === 1) {
                return {...state, currentOperation: null}
            }

            /* Returning the state with the current operation and the payload
             number. */
            return {
                ...state,
                currentOperation: state.currentOperation.slice(0, -1),
            }
        /* This is checking if the operation, current operation, and previous
        operation are null. If they are, it will return the state. */
        case ACTIONS.EVALUATE:
            if (
                state.operation == null ||
                state.currentOperation == null ||
                state.previousOperation == null
            ) {
                return state
            }

            /* Returning the state with the overwrite set to true, the previous
            operation set to null, the operation set to null, and the current
            operation set
            to the result of the evaluate function. */
            return {
                ...state,
                overwrite: true,
                previousOperation: null,
                operation: null,
                currentOperation: evaluate(state),
            }
    }
}

/**
 * It takes in an object with three properties: currentOperation,
 * previousOperation, and operation. It parses the previousOperation and
 * currentOperation into floats, and if either of them are NaN, it returns an
 * empty string. Otherwise, it performs the operation on the two numbers and
 * returns the result as a string
 * @returns the result of the computation.
 */
function evaluate({currentOperation, previousOperation, operation}) {
    /* Parsing the previousOperation and currentOperation into floats. */
    const prev = parseFloat(previousOperation)
    const current = parseFloat(currentOperation)

    /* Checking if the previous operation or the current operation is
    not a number. If it is, it will return an empty string. */
    if (isNaN(prev) || isNaN(current)) return ""

    /* Setting the computation to an empty string. */
    let computation = ""

    /* Checking if the operation is equal to the case. If it is, it will
    return the computation. */
    switch (operation) {
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "*":
            computation = prev * current
            break
        /* Creating a new Intl.NumberFormat object that will format numbers
        with no decimal places. */
        case "÷":
            computation = prev / current
            break
    }

    return computation.toString()
}

/** Creating a new Intl.NumberFormat object that will format numbers
 with no decimal places. */
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionNums: 0,
})

/**
 * It takes a string representing a number, and returns a string representing the
 * same number, but with commas inserted in the appropriate places
 * @param operand - The operand to format.
 * @returns the formatted integer and decimal.
 */
function formatOperand(operand) {
    /* Checking if the operand is null. If it is, it will return. */
    if (operand == null) return
    /* Splitting the operand into an integer and a decimal. */
    const [integer, decimal] = operand.split(".")
    /* Checking if the decimal is null. If it is, it will return the
    integer. */
    if (decimal == null) return INTEGER_FORMATTER.format(integer)
    /* Returning the formatted integer and decimal. */
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

/**
 * We're using the useReducer hook to create a reducer function that will handle
 * the state of our calculator.
 *
 * The reducer function is a function that takes in the current state and an
 * action and returns the next state.
 *
 * The useReducer hook takes in the reducer function and an initial state and
 * returns the current state and a dispatch function.
 *
 * The dispatch function is a function that takes in an action and calls the
 * reducer function with the current state and the action.
 *
 * The reducer function then returns the next state.
 *
 * The useReducer hook then updates the current state with the next state.
 *
 * The useReducer hook is a lot like the useState hook, except that it takes in a
 * reducer function instead of a state updater function.
 *
 * The useReducer hook is also a lot like the useState hook, except that it
 * returns the current state and a dispatch
 * @returns A React component
 */
function App() {
    const [{
        currentOperation,
        previousOperation,
        operation
    }, dispatch] = useReducer(
        reducer,
        {}
    )

    return (
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-Operation">
                    {formatOperand(previousOperation)} {operation}
                </div>
                <div
                    className="current-Operation">{formatOperand(currentOperation)}</div>
            </div>
            { /* This is the part of the code that is responsible for the buttons
            on
            the
            calculator. */}
            <button
                className="span-two"
                onClick={() => dispatch({type: ACTIONS.CLEAR})}
            >
                AC
            </button>

            <button onClick={() => dispatch({type: ACTIONS.DELETE_NUM})}>
                DEL
            </button>
            <OperationButton operation="÷" dispatch={dispatch}/>
            <NumButton num="1" dispatch={dispatch}/>
            <NumButton num="2" dispatch={dispatch}/>
            <NumButton num="3" dispatch={dispatch}/>
            <OperationButton operation="*" dispatch={dispatch}/>
            <NumButton num="4" dispatch={dispatch}/>
            <NumButton num="5" dispatch={dispatch}/>
            <NumButton num="6" dispatch={dispatch}/>
            <OperationButton operation="+" dispatch={dispatch}/>
            <NumButton num="7" dispatch={dispatch}/>
            <NumButton num="8" dispatch={dispatch}/>
            <NumButton num="9" dispatch={dispatch}/>
            <OperationButton operation="-" dispatch={dispatch}/>
            <NumButton num="." dispatch={dispatch}/>
            <NumButton num="0" dispatch={dispatch}/>
            <button
                className="span-two"
                onClick={() => dispatch({type: ACTIONS.EVALUATE})}
            >
                =
            </button>
        </div>
    )
}

/* Exporting the App component. */
export default App
