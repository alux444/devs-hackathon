import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";
import { UserContext } from "../../App";
import { getComments } from "../../utils/getComments";
import addNewComment from "../../utils/addNewComment";
import Comment from "./Comment";
import CommentPostCont from "./CommentPostCont";
import bg from "../../img/waves2.svg";

const CommentsModal = ({ post, open, close }) => {
  const backgroundImage = {
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

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
          className="border-[1px] rounded-lg border-solid flex flex-col border-white p-[25px] text-center items-center align-center bg-[black] max-w-[80%] max-h-[90%] overflow-auto"
          style={backgroundImage}
        >
          <CommentPostCont post={post} />
          {data.length == 0 ? (
            <p>No comments yet.</p>
          ) : (
            <div className="max-h-[30vh] overflow-auto w-full flex flex-col items-center border-[1px] rounded-xl">
              {mappedComments}
            </div>
          )}
          <div className="max-h-[50vh]">
            {user.loggedIn ? (
              <form className="w-full flex gap-5 mt-5" onSubmit={onSubmit}>
                <input
                  className="w-[40vw] lg:w-[45vw] border-[1px]"
                  type="text"
                  value={comment}
                  onChange={handleComment}
                ></input>
                <button type="submit">Comment</button>
              </form>
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
