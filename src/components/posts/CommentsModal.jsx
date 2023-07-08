import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";
import { UserContext } from "../../App";
import { getComments } from "../../utils/getComments";
import addNewComment from "../../utils/addNewComment";
import Comment from "./Comment";
import CommentPostCont from "./CommentPostCont";

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
    const sortedArray = info.sort((a, b) => b.time.seconds - a.time.seconds);
    setData(sortedArray);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await addNewComment(comment, user, post.id);
    setComment("");
    setTimeout(() => {
      fetchComments();
    }, 2000);
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
          <CommentPostCont post={post} />
          {data.length == 0 ? (
            <p>No comments yet.</p>
          ) : (
            <div className="max-h-[30vh] overflow-auto w-full flex flex-col items-center border-2">
              {mappedComments}
            </div>
          )}
          <div className="max-h-[50vh]">
            {user.loggedIn ? (
              <div className="w-full">
                <form onSubmit={onSubmit}>
                  <input
                    className="text-black w-[40vw] lg:w-[60vw]"
                    type="text"
                    value={comment}
                    onChange={handleComment}
                  ></input>
                  <button type="submit">Comment</button>
                </form>
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
