import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneAlbum } from "../../store/album";
import { deleteAComment } from "../../store/comment";
import "./index.css";

function AlbumComment({ comment }){
  const dispatch = useDispatch();
  const { albumId } = useParams();
  const loggedInUser = useSelector(state => state.session.user);

  let CreatedDate;

  if (comment?.createdAt) {
    const date = new Date(comment?.createdAt);
    const createdDay = date.getDate();
    const createdMonth = date.toLocaleString("default", { month: "short" });
    const createdYear = date.getFullYear();
    const createdStr = `${createdDay} ${createdMonth}, ${createdYear}`;
    CreatedDate = <p className="comment-created">{createdStr}</p>;
  }

  return (
    <div className="one-album-comment">
      <div className="comment-user-div">
        <p className="comment-username">{comment?.User?.username}</p>
        {CreatedDate}
        {loggedInUser && loggedInUser?.id === comment?.User?.id &&
          <button 
          className="delete-comment-btn"
          onClick={async () => await dispatch(deleteAComment(comment?.id))
            .then(() => {dispatch(getOneAlbum(albumId))})}
          >Delete</button>}
      </div>
      <div className="comment-content-photo-div">
        <p className="comment-content">{comment?.body}</p>
      </div>
    </div>
  );
}

export default AlbumComment;