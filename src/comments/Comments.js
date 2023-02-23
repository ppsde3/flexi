import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  getComments as getCommentsApi,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  upVoteCount as upVoteCountApi,
} from "../Data";

const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const [rootComments, setRootComment] = useState([]);

  const setFilterComment = (backendComments) => {
    const rootComment =
      backendComments.filter(
        (backendComment) => backendComment.parentId === null
      ) || [];
    setRootComment(rootComment);
  };

  const getReplies = (commentId) =>
    backendComments.length > 0
      ? backendComments
          .filter((backendComment) => backendComment.parentId === commentId)
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
      : [];

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  const upVoteCount = (commentId, parentId) => {
    upVoteCountApi(commentId).then((data) => {
      setBackendComments(data);
    });
  };

  useEffect(() => {
    getCommentsApi().then((data) => {
      setBackendComments(data);
      setFilterComment(data);
    });
  }, []);

  return (
    <div className="comments">
      <h3 className="comments-title">Flexiple</h3>
      <div className="comment-form-title">Test Comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            upVoteCount={upVoteCount}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
