import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";
import { UserContext } from "../../App";
import PostContainer from "./PostContainer";
import { getComments } from "../../utils/getComments";
import addNewComment from "../../utils/addNewComment";
import Comment from "./Comment";

const CommentsModal = ({ post, open, close }) => {
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const modalRef = useRef(null);
  const { user } = useContext(UserContext);
  useOutsideClick(modalRef, close);

  const handleComment = (e) => {
    if (e.target.value.length < 100) {
      setComment(e.target.value);
    }
  };

  const fetchComments = async () => {
    const info = await getComments(post.id);
    setData(info);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addNewComment(comment, user, post.id);
    setComment("");
    fetchComments();
  };

  const mappedComments = data.map((comment) => (
    <Comment comment={comment} key={comment.id} />
  ));

  return (
    <Modal open={open}>
      <div className="w-[100%] h-[100%] items-center align-center justify-center flex">
        <div
          ref={modalRef}
          className="border-2 border-solid flex flex-col border-white p-[25px] text-center items-center align-center bg-[black]"
        >
          <PostContainer post={post} />
          {data.length == 0 ? <p>No comments yet.</p> : mappedComments}
          <div className="max-h-[50vh]">
            {user.loggedIn ? (
              <div className="w-full">
                <input
                  className="w-[50vw]"
                  type="text"
                  value={comment}
                  onChange={handleComment}
                ></input>
                <button onClick={onSubmit}>Comment</button>
              </div>
            ) : (
              <small>Login to comment.</small>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CommentsModal;
