import React from 'react';
import { Loading } from './Loading';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';

export class CardDescription extends React.Component {
    state = {
        board: null,
        currListIdx: null,
        currCardIdx: null,
        isEditing: false
    }

    componentDidMount() {
        const { board, currListIdx, currCardIdx } = this.props
        this.setState({ board, currListIdx, currCardIdx })
    }
    onToggleEditing = () => {
        this.setState({ ...this.state, isEditing: true })
    }

    handleChange = ({ target }) => {
        const { currListIdx, currCardIdx } = this.state
        const boardToUpdate = { ...this.state.board }
        boardToUpdate.lists[currListIdx].cards[currCardIdx][target.name] = target.value
        this.setState({ ...this.state, board: boardToUpdate })
    }

    onSaveDescription = (ev) => {
        ev.preventDefault();
        ev.stopPropagation()
        const { board, currListIdx, currCardIdx } = this.state
        const currCard = board.lists[currListIdx].cards[currCardIdx];
        const action = `Changed description`
        const txt = currCard.description
        this.props.OnUpdateBoard({ ...this.state.board }, action, currCard, txt)
        this.setState({ ...this.state, isEditing: false })
    }

    render() {
        const { board, currListIdx, currCardIdx, isEditing } = this.state
        if (!board || currCardIdx === null || currListIdx === null) return <Loading />
        const currCard = board.lists[currListIdx].cards[currCardIdx]
        return (<div className="card-description" >
            <div className="flex direction-row">
                <FormatAlignLeftIcon className="card-details-icon" /> <h3>Description</h3>
            </div>
            {isEditing &&
                <div onClick={this.onToggleEditing}>
                    <form onSubmit={this.onSaveDescription} >
                        <TextareaAutosize
                            name='description'
                            className="text-area-auto desc-edit"
                            type='text'
                            placeholder='Enter title'
                            onChange={this.handleChange}
                            value={currCard.description}
                            onBlur={this.onSaveDescription}
                            autoFocus
                        />
                        {isEditing && <button onClick={this.onSaveDescription}>Save</button>}
                    </form>
                </div>
            }
            {!isEditing && currCard.description && <div className="desc-txt pointer" onClick={this.onToggleEditing}>
                <p >{currCard.description}</p>
            </div>}
            {!isEditing && !currCard.description
                && <div className="desc-txt-placeholder hover" onClick={this.onToggleEditing}>
                    <p>Add a more detailed description...</p>
                </div>}
        </div>
        )
    }

}