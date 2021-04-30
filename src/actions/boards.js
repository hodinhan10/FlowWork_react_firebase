import { myFirebase } from "../firebase/firebase";

export const CREATE_BOARD_REQUEST = "CREATE_BOARD_REQUEST";
export const CREATE_BOARD_SUCCESS = "CREATE_BOARD_SUCCESS";
export const CREATE_BOARD_FAIL = "CREATE_BOARD_FAIL";

export const GET_BOARDS_REQUEST = "GET_BOARDS_REQUEST";
export const GET_BOARDS_SUCCESS = "GET_BOARDS_SUCCESS";
export const GET_BOARDS_FAIL = "GET_BOARDS_FAIL";

export const GET_BOARD_NAME_SUCCESS = "GET_BOARD_NAME_SUCCESS";

// Get Boards
const requestBoards = () => {
    return {
        type: GET_BOARDS_REQUEST
    };
};
const receiveBoards = (boards) => {
    return {
        type: GET_BOARDS_SUCCESS,
        boards
    };
};
const receiveBoardsError = () => {
    return {
        type: GET_BOARDS_FAIL
    };
};


// Create Board
const requestCreateBoard = () => {
    return {
        type: CREATE_BOARD_REQUEST
    };
};
const receiveCreateBoard = (uid) => {
    return {
        type: CREATE_BOARD_SUCCESS,
        uid
    };
};
const createBoardError = () => {
    return {
        type: CREATE_BOARD_FAIL
    };
};

// Listen Board Name
const receiveBoardName = (name, boardId) => {
    return {
        type: GET_BOARD_NAME_SUCCESS,
        name,
        boardId,
    };
};

export const createBoard = (title) => dispatch => {
    dispatch(requestCreateBoard());
    const user = myFirebase.auth().currentUser;
    if (!user) {
        dispatch(createBoardError());
    } else {
        const uid = user.uid;
        const key = myFirebase.database().ref('boards/')
            .push({
                title: title,
                createdBy: user.uid
            }, (err) => {
                if (err) {
                    dispatch(createBoardError());
                }
            }).key;
        myFirebase.database().ref('boards/' + key + '/members').child(uid).set({
            uid: uid,
            email: user.email,
            role: 'admin'
        });
        myFirebase.database().ref('/userBoards/' + uid).child(key).set(true);
        myFirebase.database().ref('/board/' + key).set({
            boardId: key,
            title: title,
        });
        myFirebase.database().ref('board/' + key + '/members').child(uid).set({
            uid: uid,
            email: user.email,
            role: 'admin'
        });
        dispatch(receiveCreateBoard(key));
    }
};

export const deleteBoard = (boardId) => dispatch => {
    // Get a list of all userIds from '/boards/boardId/members/' 
    // Go through that list and delete all occurrences of boardId in each userId
    myFirebase.database().ref('/boards/' + boardId + '/members/').once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                myFirebase.database().ref('/userBoards/' + data.val().uid).child(boardId).remove();
            })
        }
    }).then(() => {
        // remove from '/boards/'
        myFirebase.database().ref('/boards/' + boardId).remove();
        // remove from '/board/'
        myFirebase.database().ref('/board/' + boardId).remove().then(() => {
            dispatch(loadUserBoards());
        });
    });
}

export const loadUserBoards = () => dispatch => {
    dispatch(requestBoards());
    const user = myFirebase.auth().currentUser;
    // Get list of boardIds from /userBoards/
    // Then get boards titles from /boards/ using the boardIds
    let boards = [];
    myFirebase.database().ref('/userBoards/' + user.uid).once('value', function (snapshot) {
        snapshot.forEach(function (data) {

            myFirebase.database().ref('/boards/' + data.key).once('value', function (snap) {
                if (snap.exists()) {
                    // console.log(snap.val())
                    boards.push({
                        boardId: data.key,
                        title: snap.val().title,
                        members: snap.val().members,
                        createdBy: snap.val().createdBy
                    });

                }
                else {
                    console.log("k thay")
                }
            }).then(() => {
                dispatch(receiveBoards(boards));
            })
        });
    });
};

export const addUserToBoard = (email, role, boardId) => dispatch => {
    const emailWithoutDot = email.replace(/\./g, ",");
    // get userId from email
    var userToAdd;
    var nametoAdd;
    var roleToAdd;
    myFirebase.database().ref('/emailToUid/' + emailWithoutDot).once('value', function (snapshot) {
        if (snapshot.exists()) {
            userToAdd = snapshot.val().userId;
            nametoAdd = email
            roleToAdd = role
            // Add boardId as key so that the boardIds are not duplicated 
            // if a user is added to a board multiple times
            myFirebase.database().ref('/userBoards/' + userToAdd).child(boardId).set(true);
            // also add userid to members array
            myFirebase.database().ref('/boards/' + boardId + '/members/').child(userToAdd).set({
                uid: userToAdd,
                email: nametoAdd,
                role: roleToAdd
            })
            myFirebase.database().ref('/board/' + boardId + '/members/').child(userToAdd).set({
                uid: userToAdd,
                email: nametoAdd,
                role: roleToAdd
            })
        }
        else {
            alert('user not found')
        }
    });
    // Todo: dispatch if Add was successful & display error message
}

export const updateBoardName = (boardName, boardId) => dispatch => {
    myFirebase.database().ref('/boards/' + boardId).update({ title: boardName });
    myFirebase.database().ref('/board/' + boardId).update({ title: boardName });
};


export const listenBoardName = (boardId) => dispatch => {
    myFirebase.database().ref('/boards/' + boardId).on('value', function (snapshot) {
        if (snapshot.val() != null)
            dispatch(receiveBoardName(snapshot.val().title, boardId));
    });
};

