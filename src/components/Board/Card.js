import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid, TextField } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import SubjectIcon from '@material-ui/icons/Subject';
import WorkIcon from '@material-ui/icons/Work';
import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect, useDispatch, useStore } from 'react-redux';
import styled from 'styled-components';
import { deleteCard, listenBoard, loadBoard, updateBoard } from '../../actions';
import { myFirebase } from '../../firebase/firebase';
import CheckList from '../BoardCardCheckList/CheckList';
import ShowComment from '../BoardCardComment/ShowComment';
import DayDeadLine from '../BoardCardModalRest/DayDeadLine';
import Description from '../BoardCardModalRest/Description';
import TitleModal from '../BoardCardModalRest/TitleModal';
import InviteMenuCard from './../Navbar/InviteMenuCard';
const Div = styled.div`
    margin-bottom: 8px;
    margin-left: 8px;
    margin-right: 8px;
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #172b4d;
`;



const StyledCardContent = styled(CardContent)`
    display: inline-block;
    word-wrap: break-word;
    
`;

const CardOptions = styled.div`
    visibility: hidden;
    display: inline-block;
    margin-right: 15px;
    border-radius: .3rem;
    padding: 0.4rem 0.6rem 0.4rem 0.6rem;
    color: #172b4d;
    opacity: 0.7;
    word-wrap: break-word;
    
    &:hover {
        background-color: #e1e2e6;
    }
`;

const StyledCard = styled(Card)`
    justify-content: space-between;
    display: inline-flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    &:hover {
        background-color: rgb(240, 240, 240);

    }
    &:hover ${CardOptions} {
        visibility: visible;
    }
`;



function TrelloCard({ text, id, index, listID, title, boardId, indexList, comment, todo, daytime, todoID }, props) {
    // console.log('todoID', todoID[1])
    console.log("todo[todoID].workList", todo ? Object.entries(todo[todoID[1]].workList) : '')
    // 
    // console.log(todo)
    // const todoDone = Object.keys(todo).filter(key => todo[key].complete == true)
    var re = /(?:\.([^.]+))?$/;
    var ext = re.exec('hi.txt')
    if (ext = 'txt') {
        // console.log('ok')
    }
    const userID = myFirebase.auth().currentUser.uid
    const displayName = myFirebase.auth().currentUser.displayName
    const [fileList, setFileList] = useState();
    useEffect(() => {
        const listRef = myFirebase.database().ref('upload/cardFile/').orderByChild('cardId').equalTo(id)
        listRef.on('value', snapshot => {

            const lists = snapshot.val();
            const fileList = []
            for (let id in lists) {
                fileList.push(lists[id])
            }
            setFileList(fileList);
        })
    }, [])
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const user = myFirebase.auth().currentUser.uid;
        myFirebase.database().ref('/board/' + boardId + '/members').orderByKey().equalTo(user).on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                var role = childSnapshot.val().role
                if (role == 'admin') {
                    setIsAdmin(true)
                }
            })
        })
    })
    // console.log('isAdmin', isAdmin)
    const [memberList, setMemberList] = useState();
    useEffect(() => {
        const listRef = myFirebase.database().ref('cardMembers/')
        listRef.on('value', snapshot => {
            snapshot.forEach(function (snap) {

                myFirebase.database().ref('cardMembers/' + id).on('value', function (childSnap) {

                    const lists = childSnap.val();
                    const memberList = []
                    for (let id in lists) {
                        memberList.push(lists[id])
                    }
                    setMemberList(memberList);
                    // console.log(memberList)
                })
            })
        })
    }, [])

    const dispatch = useDispatch();
    const store = useStore();
    const useStyles = makeStyles((theme) => ({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'auto',
            '&:hover': {
                border: 'none'
            },

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            //border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        gridduoi: {
            "& > *": {
                display: "flex",
                flexWrap: "wrap"
            },
        },
        gird: {
            "backgroundColor": "#ffffff", "borderRadius": "4px", "margin": "48px 0 80px", "position": "visible", "width": '85%', "zIndex": "25", height: 550, '&:hover': {
                border: 'none'
            }, marginTop: 80,
            overflow: 'auto',
        },
        // {
        //     // margin: "-50px auto 50px",
        //     // maxWidth: 1000,
        //     width : '80%',
        //     overflow: "visible",
        //     backgroundColor: "#ffffff",
        //     height: 'auto',
        // }
        root: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
        },
        notchedOutline: {
            border: 'none',
        },
        view: {
            border: '1px solid #DCDCDC'
        },
        margin: {
            margin: theme.spacing(1)
        },
        link: { backgroundColor: "rgba(9,30,66,.04)", backgroundPosition: "50%", backgroundSize: "contain", backgroundRepeat: "no-repeat", borderRadius: "3px", height: "80px", textAlign: "center", textDecoration: "none", zIndex: "1", width: "112px" },
        link1: { "color": "#5e6c84", "display": "block", "fontSize": "18px", "fontWeight": "700", "height": "100%", "lineHeight": "80px", "textAlign": "center", "textTransform": "uppercase", "textDecoration": "none", "width": "100%" },
        link2: { "boxSizing": "border-box", "cursor": "pointer", "padding": "8px 8px 8px 128px", "minHeight": "80px", "margin": "0", "zIndex": "0" },
        addfile: { "color": "#1f488d", "fontFamily": "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", "fontSize": "14px", "lineHeight": "20px", "fontWeight": "400", "boxSizing": "border-box", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "borderRadius": "3px", "cursor": "pointer", "padding": "6px 12px", "textDecoration": "none", "backgroundColor": "rgba(9,30,66,.04)", "boxShadow": "none", "border": "none", "transitionProperty": "background-color,border-color,box-shadow", "transitionDuration": "85ms", "transitionTimingFunction": "ease" },
        listcv: { "display": "flex", "justifyContent": "space-between", "alignItems": "center", "flexFlow": "row wrap", marginTop: -18, },
        number: { "color": "#5e6c84", "fontSize": "11px", "lineHeight": "10px", "textAlign": "center", "width": "32px", },
        tiendo: { "background": "rgba(9,30,66,.08)", "borderRadius": "4px", "clear": "both", "height": "8px", "margin": "-13px 0 0 40px", "overflow": "hidden", "position": "relative" },
        colortiendo: { "background": "#5ba4cf", "bottom": "0", "left": "0", "position": "absolute", "top": "0", "transitionProperty": "width,background", "transitionDuration": ".14s", "transitionTimingFunction": "ease-in" },
        listcvs: { "clear": "both", "paddingLeft": "40px", "position": "relative", "borderRadius": "3px", "transformOrigin": "left bottom", "transitionProperty": "transform,opacity,height,padding,margin", "transitionDuration": ".14s", "transitionTimingFunction": "ease-in" },
        check: { "borderRadius": "2px", "height": "16px", "width": "16px", "overflow": "hidden", "whiteSpace": "nowrap", "transition": "all .2s ease-in-out", "backgroundColor": "#fafbfc", "boxShadow": "inset 0 0 0 2px #dfe1e6", "top": "5px", "margin": "6px", "textAlign": "center", "cursor": "pointer", marginLeft: -38 },
        listitemcv: { "minHeight": "20px", "marginBottom": "0", "alignSelf": "center", "flex": "1", marginTop: -23 },
        button: { "backgroundColor": "#e4f0f6", "boxShadow": "none", "border": "none", "color": "#0079bf", "outline": "0" },
        positioncv: { "color": "#172b4d", "fontFamily": "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif", "fontSize": "14px", "lineHeight": "20px", "fontWeight": "400", "boxSizing": "border-box", "display": "inline-flex", "alignItems": "center", "justifyContent": "center", "borderRadius": "3px", "cursor": "pointer", "padding": "6px 12px", "textDecoration": "none", "backgroundColor": "rgba(9,30,66,.04)", "boxShadow": "none", "border": "none", "transitionProperty": "background-color,border-color,box-shadow", "transitionDuration": "85ms", "transitionTimingFunction": "ease" },
        thanhvien: { "display": "block", "float": "left", "margin": "0 8px 8px 0", "maxWidth": "100%" },
        member: { "backgroundColor": "#dfe1e6", "borderRadius": "25em", "color": "#172b4d", "cursor": "pointer", "display": "block", "float": "left", "height": "32px", "margin": "0 4px 4px 0", "overflow": "visible", "position": "relative", "width": "32px", "textDecoration": "none", "WebkitUserSelect": "none", "userSelect": "none", "zIndex": "0" },
        listmember: { "display": "block", "fontSize": "12px", "fontWeight": "700", "height": "32px", "left": "0", "lineHeight": "32px", "overflow": "hidden", "position": "absolute", "textAlign": "center", "top": "0", "width": "100%" }
    }));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [showInviteMenu, setShowInviteMenu] = React.useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ontoggle = () => {
        alert('123')
    }
    const onChange = (e) => {
        const file = e.target.files[0]
        const StorageRef = myFirebase.storage().ref()
        const key = myFirebase.database().ref().push().key
        const fileRef = StorageRef.child(file.name)
        fileRef.put(file).then((snap) => {
            snap.ref.getDownloadURL().then(url => {
                myFirebase.database().ref('/upload/cardFile').child(key).set({
                    id: key,
                    userID: userID,
                    displayName: displayName,
                    "url": url,
                    cardId: id,
                    name: file.name,
                    time: new Date().toISOString()
                })
            })

        })
    }
    const handleSubmitInvite = (e) => {
        e.preventDefault();
        const email = inviteEmail;
        const emailWithoutDot = email.replace(/\./g, ",");
        myFirebase.database().ref('/emailToUid/' + emailWithoutDot).once('value', function (snapshot) {
            if (snapshot.exists()) {
                const userId = snapshot.val().userId
                myFirebase.database().ref('/userBoards/' + userId).once('value', function (snap) {
                    // console.log(snap.val())
                    if (snap.exists()) {
                        myFirebase.database().ref('/cardMembers/' + id + userId).child('name').once('value', function (childsnap) {
                            if (childsnap.exists()) {
                                alert('Người dùng đã được gán vào card!')
                            }
                            else {
                                if (email.length > 0 && email.length < 50) {
                                    myFirebase.database().ref('/cardMembers/' + id).child(userId).set({
                                        cardId: id,
                                        name: email
                                    })
                                }
                                setShowInviteMenu(!showInviteMenu);
                            }
                        })
                    }
                    else {
                        alert('Người dùng không phải là thành viên của bảng!')
                    }
                })
            }
            else {
                alert('Không tìm thấy user với email đã nhập, vui lòng nhập lại!')
            }
        });

    }
    const onEmailChange = (e) => {
        e.preventDefault();
        setInviteEmail(e.target.value);
        // console.log(inviteEmail)
    }
    const onDeleteFile = (e) => {
        e.preventDefault();
        let name = e.currentTarget.value
        myFirebase.database().ref('/upload/cardFile/').child(name).remove()
        myFirebase.storage().ref().child(name).delete()

    }
    const handleDeleteCard = () => {
        dispatch(deleteCard(id, listID, title));
        const tempboard = store.getState().board; // ugly solution, try fix
        dispatch(updateBoard(tempboard));
    }

    const handleShowInvite = () => {
        setShowInviteMenu(!showInviteMenu);
    }
    const oneDay = 24 * 60 * 60 * 1000
    const [number, setNumber] = useState();
    return (
        <>
            <Draggable draggableId={String(id)} index={index}>
                {(provided) => (
                    <Div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <StyledCard onClick={() => isAdmin ? setOpen(true) : ((new Date(daytime.match(/(\d+)/g)[0], daytime.match(/(\d+)/g)[1] - 1, daytime.match(/(\d+)/g)[2])).getTime() - (new Date().getTime()) > 0 ? setOpen(true) : setOpen(false))}>
                            <Grid container>
                                <Grid item md={12}>
                                    <StyledCardContent style={{ wordWrap: "break-word", width: "80%" }} >
                                        <div variant="body2" color="textSecondary" component="p">
                                            {text}
                                        </div>

                                    </StyledCardContent>
                                    {isAdmin ? <CardOptions onMouseUp={handleDeleteCard} style={{ marginLeft: 9 }}><FontAwesomeIcon icon={faTrash} /></CardOptions> : null}


                                </Grid>
                                {/* daytime.match(/(\d+)/g) */}
                                {daytime ?
                                    ((new Date(daytime.match(/(\d+)/g)[0], daytime.match(/(\d+)/g)[1] - 1, daytime.match(/(\d+)/g)[2])).getTime() - (new Date().getTime()) > oneDay ?
                                        <Button style={{ "background": "green" }}>{daytime.match(/(\d+)/g)[0] + "/" + daytime.match(/(\d+)/g)[1] + "/" + daytime.match(/(\d+)/g)[2]}</Button> :
                                        ((new Date(daytime.match(/(\d+)/g)[0], daytime.match(/(\d+)/g)[1] - 1, daytime.match(/(\d+)/g)[2])).getTime() - (new Date().getTime()) > 0 ?
                                            <Button style={{ "background": "yellow" }}>{daytime.match(/(\d+)/g)[0] + "/" + daytime.match(/(\d+)/g)[1] + "/" + daytime.match(/(\d+)/g)[2]}</Button> :
                                            <Button style={{ "background": "red" }}>{daytime.match(/(\d+)/g)[0] + "/" + daytime.match(/(\d+)/g)[1] + "/" + daytime.match(/(\d+)/g)[2]}</Button>
                                        )) : ''
                                }

                                {comment ?
                                    <Grid item md={3}>
                                        <Grid container style={{ padding: '0px 12px' }}>
                                            <Grid item md={1}>
                                                <ChatIcon />
                                            </Grid>
                                            <Grid item md={2} style={{ "marginLeft": "25px" }}>
                                                {Object.keys(comment).length}
                                            </Grid>
                                        </Grid>
                                    </Grid> : ''}
                                {todo ?
                                    <Grid item md={3}>
                                        <Grid container style={{ padding: '0px 12px' }}>
                                            <Grid item md={1}>
                                                <PlaylistAddCheckIcon />
                                            </Grid>
                                            <Grid item md={2} style={{ "marginLeft": "25px" }}>
                                                {/* workList */}
                                                {/* {Object.keys(todo).filter(key => todo[key].complete === true).length + '/' + Object.keys(todo).length} */}
                                                {/* {todo[todoID].workList ? Object.keys(todo[todoID].workList).filter(key => todo[key].complete === true).length : ''} */}

                                                {/* {
                                                    Object.entries(todo).filter(key =>
                                                        key[1].workList
                                                            ?
                                                            (Object.values(key[1].workList).some((keyWork) => keyWork.complete === true)).length : ''
                                                    )
                                                }
                                                {console.log("number", number)} */}

                                            </Grid>
                                        </Grid>
                                    </Grid> : ''}

                                {memberList ? memberList.map((member, i) =>
                                    <Grid item md={12}>
                                        <Grid container style={{ padding: '0px 12px', height: 45, width: 70, float: 'right', marginBottom: 10 }}>
                                            <Grid item md={12} style={{ "fontWeight": "600", "fontSize": "16px", "backgroundColor": "#dfe1e6", "borderRadius": "45px", "textAlign": "center", "lineHeight": "40px" }}>
                                                {member.name[0]}
                                            </Grid>
                                        </Grid>
                                    </Grid>) : ''}
                            </Grid>
                        </StyledCard>
                    </Div>
                )}

            </Draggable>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}

                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <Grid container spacing={3} className={classes.gird}>
                            <Grid item xs={12} sm={12}>
                                <CardContent className={classes.gridduoi}>
                                    <Grid container>
                                        <TitleModal text={text} indexCard={index} boardId={boardId} title={title} indexList={indexList} />

                                        <Grid item md={8} style={{ width: '58%' }}>
                                            <Grid container>
                                                <Grid item xs={12} sm={12}>
                                                    <Grid container>
                                                        <Grid item md={1} >
                                                            <SubjectIcon />
                                                        </Grid>
                                                        <Grid item md={11} >
                                                            <div className={classes.thanhvien}>
                                                                <h3 style={{ "color": "#5e6c84", "fontSize": "12px", "fontWeight": "500", "letterSpacing": ".04em", "lineHeight": "20px", "marginTop": "16px", "textTransform": "uppercase", "display": "block", "margin": "0 8px 4px 0", "whiteSpace": "nowrap", "textOverflow": "ellipsis", "overflow": "hidden" }}>Thành Viên</h3>
                                                            </div>
                                                            {memberList ? memberList.map((member, i) =>


                                                                <div style={{ marginTop: 20, }} >
                                                                    <div className={classes.member} >
                                                                        <span className={classes.listmember} key={i}>
                                                                            {member.name[0]}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ) : ''}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <DayDeadLine indexCard={index} indexList={indexList} boardId={boardId} />

                                                <Description indexCard={index} indexList={indexList} boardId={boardId} />
                                                <Grid item xs={12} sm={12}>
                                                    <Grid container>
                                                        <Grid item md={1} >
                                                            <FormatListNumberedIcon />
                                                        </Grid>
                                                        <Grid item md={11} >
                                                            <div style={{ fontWeight: 'bold' }}>Các Tập Tin Đính Kèm</div>

                                                            {fileList ?
                                                                fileList.map((file, i) =>
                                                                    <>
                                                                        <div key={i}>
                                                                            {file === file.url ? <a className={classes.link} style={{ float: 'left' }} href={file.url}
                                                                            ><span className={classes.link1}>Link</span></a> :
                                                                                <img className={classes.link} style={{ float: 'left' }} src={file.url}
                                                                                ></img>}

                                                                            <p className={classes.link2}><span style={{ fontWeight: 'bold' }}> {file.name}</span>

                                                                                <br />
                                                                                <span style={{ marginBottom: 8 }}>
                                                                                    <span>Đã thêm: {file.time}</span>
                                                                                </span>
                                                                                <br />
                                                                                <span style={{ marginBottom: 8 }}>
                                                                                    <span>Người đăng: {file.displayName}</span>
                                                                                </span>
                                                                            </p>
                                                                            {userID === file.userID ? <Button onClick={onDeleteFile} value={file.id}>Xóa</Button> : isAdmin === <Button onClick={onDeleteFile} value={file.id}>Xóa</Button>}

                                                                        </div>
                                                                        <br />
                                                                    </>
                                                                ) : ''}
                                                            <p style={{ margin: '10 0 8px' }}>
                                                                <input style={{ display: 'none' }} id="contained-button-file" multiple type="file" onChange={onChange} />
                                                                <label htmlFor="contained-button-file">
                                                                    <Button style={{ backgroundColor: '#eaecf0' }} component="span">
                                                                        Thêm mục đính kèm
                                                            </Button>
                                                                </label>
                                                            </p>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>


                                                <CheckList listID={listID} indexList={indexList} indexCard={index} />

                                                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                                                    <Grid container style={{ width: '100%' }}>
                                                        <Grid item md={1} style={{ width: '10%' }}>
                                                            <WorkIcon />
                                                        </Grid>
                                                        <Grid item md={11} style={{ width: '90%' }}>
                                                            <div className={classes.listcv} style={{ width: 'auto' }}>
                                                                <h3 >Bình Luận</h3>

                                                            </div>
                                                            <ShowComment indexCard={index} listID={listID} indexList={indexList} />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={4} style={{ width: '40%' }}>
                                            <Grid item md={12}> <div style={{ margin: 'auto', textAlign: 'center', }}>Thêm vào thẻ</div></Grid>
                                            <Grid container>
                                                <Grid item md={12}
                                                    style={{ margin: 'auto', textAlign: 'center', width: '100%', marginBottom: 10 }}>
                                                    <Grid container>

                                                        <Grid item md={12}>
                                                            <Button style={{ width: '100%', backgroundColor: '#eaecf0' }} onClick={handleShowInvite}>Thành viên</Button>
                                                            {showInviteMenu && (
                                                                <InviteMenuCard
                                                                    handleShowInvite={handleShowInvite}
                                                                    handleSubmitInvite={handleSubmitInvite}
                                                                    onEmailChange={onEmailChange}
                                                                />
                                                            )}
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                <Grid item md={12}
                                                    style={{ margin: 'auto', textAlign: 'center', width: '100%', marginBottom: 10 }}>
                                                    <Grid container>
                                                        <Grid item md={12}>
                                                            <Button style={{ width: '100%', backgroundColor: '#eaecf0' }}>Việc cần làm</Button>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                <Grid item md={12}
                                                    style={{ margin: 'auto', textAlign: 'center', width: '100%', marginBottom: 10 }}>
                                                    <Grid container>
                                                        <Grid item md={12}>
                                                            <Button style={{ width: '100%', backgroundColor: '#eaecf0' }}>Ngày hết hạn</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item md={12}
                                                    style={{ margin: 'auto', textAlign: 'center', width: '100%', marginBottom: 10 }}>
                                                    <Grid container>
                                                        <Grid item md={12}>
                                                            <input style={{ display: 'none' }} id="contained-button-file" multiple type="file" onChange={onChange} />
                                                            <label htmlFor="contained-button-file">
                                                                <Button style={{ width: '100%', backgroundColor: '#eaecf0' }} component="span">
                                                                    Đính kèm
                                                            </Button>
                                                            </label>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    boards: state.boards,
    board: state.board,
    theme: state.theme,
});

export default connect(mapStateToProps, { loadBoard, listenBoard })(TrelloCard);