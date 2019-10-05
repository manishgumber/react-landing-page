import React, { useContext } from "react";
import AppContext from "./AppContext.js";

const FeedCard = prop => {
  return (
    <div className="card">
      <img src="" className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{prop.name}</h5>
        <p className="card-text">{prop.comment}</p>
        <a href="#" className="btn btn-primary">
          View profile
        </a>
      </div>
    </div>
  );
};

const Feed = prop => {
  
  const [globalState, setGlobalState] = useContext(AppContext);

  let commentField;

  function postHandler() {
    const newComment = commentField.value;
    const newUser = globalState.userName;

    const newEntry = {
      user: newUser,
      comment: newComment
    };

    const newFeedArr = [];
    Object.assign(newFeedArr, globalState.feed);
    newFeedArr.push(newEntry);

    setGlobalState({ ...globalState, feed: newFeedArr });

    commentField.value = "";
  }

  return (
    <div className="feed container">

      {globalState.feed.map(item => (
        <FeedCard name={item.user} comment={item.comment}></FeedCard>
      ))}
      <br></br>

      <div className="input-group">
        <textarea
          ref={txtArea => (commentField = txtArea)}
          type="text"
          className="form-control"
          placeholder="Enter your comment"
          rows="3"
        ></textarea>

        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            id="btnPost"
            onClick={postHandler}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feed;

// if(globalState.loggedIn) {
//     return (
//         <div className="feed container">
//             {

//             }
//         </div>
//     )
//     } else {
//         return (
//             <div />
//         )
//     }

// return(
//         // globalState.users.map(
//         //     name => (
//         //         <div className="container">
//         //         <div className="card">
//         //             <div className="card-body">
//         //                 <h5 className="card-title">{name}</h5>
//         //                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p>
//         //                 <a href="#" className="btn btn-primary">View Profile</a>
//         //             </div>
//         //         </div>
//         //         </div>
//         //     )

//         // )
// );
