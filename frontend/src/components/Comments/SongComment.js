import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneSong } from "../../store/song";
import { deleteAComment } from "../../store/comment";
import csrfFetchFunction from "../../store/csrf";
import "./index.css";

function SongComment({ comment }){
  const dispatch = useDispatch();
  const { songId } = useParams();
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
    <div className="one-song-comment">
      <div className="comment-user-div">
        <p className="comment-username">{comment?.User?.username}</p>
        {CreatedDate}
        {loggedInUser && loggedInUser?.id === comment?.userId &&
          <button 
          className="delete-comment-btn"
          onClick={async () => await dispatch(deleteAComment(comment?.id))
            .then(() => {dispatch(getOneSong(songId))})}
          >Delete</button>}
      </div>
      <div className="comment-content-photo-div">
        <p className="comment-content">{comment?.body}</p>
      </div>
    </div>
  );
}

export default SongComment;