import { Link } from 'react-router-dom'

export function BoardPreview({ boardInfo }) {
    console.log('isStarred:', boardInfo.isStarred)
    return (
        <Link to={`/boards/${boardInfo.boardId}`}>
            <div className="board-preview">
                <h3>{boardInfo.boardTitle}</h3>
                {/* {boardInfo.isStarred ? 🌟 : ⭐} */}
            </div>
        </Link>
    )

}