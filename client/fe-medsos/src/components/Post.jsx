import React, { useEffect, useState } from "react";
import { FaUserAlt, FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/action/authAction";
import { fetchPost } from "../redux/action/postAction";

const Post = ({ username = "username", content, showImage = false }) => {
  const [showComment, setShowComment] = useState(false);
  const profile = useSelector((root) => root?.auth);
  const posting = useSelector((root) => root?.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile(profile?.token));
    dispatch(fetchPost(profile?.token));
  }, []);

  const toggleComment = () => {
    setShowComment((prev) => !prev);
  };

  return (
    <div>
      {posting?.data.map((post) => (
      <div className="flex gap-5" key={post?.id}>
        <div className="flex items-center justify-center p-3 w-11 h-11 rounded-full border-2 border-slate-300">
          <FaUserAlt />
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-semibold text-lg">{post?.user.username}</h1>
            <br />
            <p>{post?.content_text}</p>
          </div>
          {showImage && (
            <div className="bg-slate-500 h-96 w-72 rounded-xl"></div>
          )}
          <div className="flex gap-10 text-xl">
            <button onClick={toggleComment}>
              <FaRegComment />
            </button>
          </div>
          <hr className="my-5 border-slate-400 w-full" />
          {showComment && (
            <div className="mt-4 p-4 bg-gray-100 rounded shadow text-black">
              <h2 className="text-lg font-bold mb-2">Komentar</h2>
              <ul className="list-disc pl-5">
                <li>Komentar pertama</li>
                <li>Komentar kedua</li>
                <li>Komentar ketiga</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      ))}
    </div>
  );
};

export default Post;
