import React from 'react';
import Form from './Form';
import CommentList from './CommentList';

export default function ShowComment({ indexCard, boardId, indexList }) {
    return (
        <div className="App">
            <Form indexCard={indexCard} boardId={boardId} indexList={indexList} />
            <CommentList indexCard={indexCard} boardId={boardId} indexList={indexList} />
        </div>
    );
}