import { components } from "react-select";
import { AddCard } from '../AddCard.jsx';

export function ActionList({ list, board, onUpdateBoard }) {

    function onDeleteList() {
        const listIdx = board.lists.findIndex(listToFind => listToFind.listId === list.listId)
        board.lists.splice(listIdx, 1);
        console.log('board from delete', board);
        const action = `Delete list ${list.listTitle}`;
        onUpdateBoard(action);
    }

    return (
        <div>
            <p onClick={onDeleteList}>Delete</p>
        </div>
    )

}