/**
 * Author: Jacob, Web Dev Simplified
 */
import {ACTIONS} from "./App"

/**
 * It returns a button that, when clicked, dispatches an action to the Redux store
 * that tells the store to update the operation property of the state
 * @returns A button that when clicked, dispatches an action to the store.
 */
export default function OperationButton({dispatch, operation}) {
    return (
        <button
            onClick={() =>
                dispatch({
                    type: ACTIONS.CHOOSE_OPERATION,
                    payload: {operation}
                })
            }
        >
            {operation}
        </button>
    )
}