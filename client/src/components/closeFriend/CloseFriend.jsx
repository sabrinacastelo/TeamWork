import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const renderFollowings = () => {
    return user && user.followings ? user.followings.map(following => (
      <li className="sidebarFriend" key={following.id}>
        <img className="sidebarFriendImg" src={PF + following.profilePicture} alt="" />
        <span className="sidebarFriendName">{following.username}</span>
      </li>
    )) : null;
  };

  return (
    <li>
      {renderFollowings()}
    </li>
  );
}