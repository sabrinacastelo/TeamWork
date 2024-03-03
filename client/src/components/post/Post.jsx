import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useContext, useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/api";

export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const [comment, setComment] = useState('');
    const [comments, setComments] = useState(post.comments);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            return;
        }

        const newComment = {
            postId: post._id,
            userId: currentUser._id,
            username: currentUser.username,
            text: comment,
        };

        try {
            await api.post(`posts/${post._id}/comment`, newComment);
            setComments(prevComments => [...prevComments, newComment]);
            setComment('');
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await api.get(`/users?userId=${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = async () => {
        try {
            // Atualizar as curtidas no front-end
            setLike(isLiked ? like - 1 : like + 1);
            setIsLiked(!isLiked);

            // Enviar a solicitação para atualizar as curtidas no back-end
            const response = await api.put(`/posts/${post._id}/like`, { userId: currentUser._id });

            if (response.status !== 200) {
                // Se a solicitação falhar, reverta as alterações no front-end
                setLike(isLiked ? like + 1 : like - 1);
                setIsLiked(!isLiked);
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/noAvatar.png"
                                }
                                alt=""
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        {/* <img
                            className="likeIcon"
                            src={`${PF}like.png`}
                            onClick={likeHandler}
                            alt=""
                        /> */}
                        <img
                            className="likeIcon"
                            src={`${PF}heart.png`}
                            onClick={likeHandler}
                            alt=""
                        />
                        <span className="postLikeCounter">{like} pessoas curtiram isso</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText" onClick={openModal}>
                            {post.comments ? post.comments.length : 0} comentários
                        </span>
                        {showModal && (
                            <div className="modal">
                                <div class="container">
                                    <div class="login-form">
                                        <div class="header">
                                            <label class="title">Comentários</label>
                                        </div>
                                        <div className="modalContent">
                                            <div className="comments">
                                                {comments.map((comment) => {
                                                    console.log(comment);
                                                    return (
                                                        <div className="comment" key={comment._id}>
                                                            <img
                                                                className="chatImg"
                                                                src={
                                                                    comment?.user?.profilePicture
                                                                        ? PF + comment.user.profilePicture
                                                                        : PF + "person/noAvatar.png"
                                                                }
                                                                alt=""
                                                            />
                                                            <h5>{comment.user?.username}</h5>
                                                            <p style={{fontSize: '14px'  , whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>{comment.text}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="testimonial">
                                        <div className="comment" key={comment._id}>
                                            <img id="picture"
                                                className="chatImg"
                                                src={
                                                    comment?.user?.profilePicture
                                                        ? PF + comment.user.profilePicture
                                                        : PF + "person/noAvatar.png"
                                                }
                                                alt=""
                                            />
                                            <h5>{comment.user?.username}</h5>
                                            <p>{comment.text}</p>
                                        </div>
                                        <form className="form" onSubmit={handleCommentSubmit}>
                                            <input id="password_field" className="input_field"
                                                type="text"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Adicione um comentário..."
                                            />
                                            <button class="sign-in_btn" type="submit">Comentar</button>
                                        </form>
                                    </div>
                                </div>
                                <button className="fechar" onClick={closeModal}>Fechar</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}