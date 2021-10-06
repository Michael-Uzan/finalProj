import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { LogoName } from './LogoName';
import { DynamicPopover } from '../DynamicPopover';
import { CreateBoard } from '../CreateBoard';
import { socketService } from "../../services/socket.service";
import { setNotif } from '../../store/board.actions';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

class _AppHeader extends React.Component {

    state = {
        isCreateBoard: false,
        isUserBoardsOpen: false,
        isStarredBoardsOpen: false,
        isNotif: false
    }

    onToggleCreateBoard = () => {
        const { isCreateBoard } = this.state
        this.setState(prevState => ({ ...prevState, isCreateBoard: !isCreateBoard }))
    }

    onToggleUserBoards = () => {
        const { isUserBoardsOpen } = this.state
        this.setState(prevState => ({ ...prevState, isUserBoardsOpen: !isUserBoardsOpen }))
    }

    onToggleStarredBoards = () => {
        const { isStarredBoardsOpen } = this.state
        this.setState(prevState => ({ ...prevState, isStarredBoardsOpen: !isStarredBoardsOpen }))
    }

    markReadNotif = () => {
        this.props.setNotif(false);
    }

    render() {
        const { loggedInUser, isNotif } = this.props;
        const { } = this.state;
        if (!loggedInUser) return (<></>)
        const notificaion = isNotif ? 'newNotif' : 'noNotif';
        return (
            <>
                <header className="main-header">
                    <nav className="nav-bar flex space-between" >
                        <div className="main-nav-links flex align-center">
                            <LogoName isLoggedIn={true} />
                            <span className={`user-boards${this.state.isUserBoardsOpen ? " open" : ""}`}>
                                <DynamicPopover type={'userBoards'} titleModal={'Boards'} onToggle={this.onToggleUserBoards} />
                            </span>
                            <span className={`user-boards${this.state.isStarredBoardsOpen ? " open" : ""}`}>
                                <DynamicPopover type={'starredBoards'} titleModal={'Starred boards'} onToggle={this.onToggleStarredBoards} />
                            </span>
                            {/* <NavLink className="header-btn" to="/boards">
                                <span>Boards</span>
                                <img src="" alt="" />
                            </NavLink> */}
                            <button className="header-btn create" onClick={this.onToggleCreateBoard}>Create</button>
                        </div>
                        <div className="user-section flex align-center">
                            <div className="notifications">
                                <DynamicPopover type={notificaion}
                                    titleModal={'Notifications'} markReadNotif={this.markReadNotif} />
                            </div>
                            <div className="user-avatar">
                                <DynamicPopover type={'userMenu'} titleModal={'Account'} loggedInUser={loggedInUser} />
                            </div>
                        </div>

                        {/* {!isNotifi && <div><NotificationsNoneIcon /> </div>}
                        {isNotifi && <div><NotificationsActiveOutlinedIcon /></div>} */}
                    </nav >
                </header >
                {this.state.isCreateBoard && <CreateBoard onToggleCreateBoard={this.onToggleCreateBoard} />}
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardReducer.board,
        boards: state.boardReducer.boards,
        loggedInUser: state.userReducer.loggedInUser,
        isNotif: state.boardReducer.isNotif,
        notifCount: state.boardReducer.notifCount
    }
}

const mapDispatchToProps = {
    setNotif,
}

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)