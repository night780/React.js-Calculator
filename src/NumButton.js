/**
 * Author: Jacob, Web Dev Simplified
 */


import {ACTIONS} from "./App";

/**
 * It returns a button that, when clicked, dispatches an action to the Redux store
 * that adds the number passed in as a prop to the current value in the store
 * @returns A button with the number passed in as a prop.
 */
export default function NumButton({dispatch, num: Num}) {

    return <button
        onClick={() => dispatch({type: ACTIONS.ADD_NUM, payload: {num: Num}})}>
        {Num}</button>
}