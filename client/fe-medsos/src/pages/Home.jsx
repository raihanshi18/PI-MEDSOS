import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/action/authAction";
import { FaThreads } from "react-icons/fa6";
import { CgHomeAlt } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { TextField, Button, Typography } from "@mui/material";
import Post from "../components/Post";
import { fetchPost, storePost } from "../redux/action/postAction";

const WEBSOCKET_URL = 'ws://127.0.0.1:3001'

const Home = () => {

  // const [isConnected, setIsConnected ] = useState(false)
  // const [ websocket, setWebsocket ] = useState(true)

  // const [ text, setText ] = useState('')

  const ws = useRef(null)

  const profile = useSelector((root) => root?.auth);
  const posting = useSelector((root) => root?.post);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile(profile?.token));
    dispatch(fetchPost(profile?.token))
    const socket = new WebSocket(WEBSOCKET_URL);

    socket.onopen = () => console.log("conencted to websocket server");
    socket.onmessage = (event) => {
      console.log(`onmessage: ${JSON.stringify(event)}`);
    }

    socket.onerror = (event) => console.log(`onerror: ${JSON.stringify(event)}`);
    socket.onclose = (event) => console.log(`onclose: ${JSON.stringify(event)}`);
  }, [dispatch, profile?.token]);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleAddPost = (newPostContent) => {
    console.log(newPostContent)
    return
    if(newPostContent.trim() === '') return;
    dispatch(storePost(profile?.token, {
      content_text: newPostContent
    }))
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#000000" }}>
      {/* Sidebar kiri */}
      <div
        className="w-20 text-white flex flex-col justify-between items-center py-4 fixed top-0 left-0 h-full"
        style={{ backgroundColor: "#222222" }}
      >
        <div>
          <FaThreads className="text-4xl mb-6 cursor-pointer" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <CgHomeAlt className="text-3xl cursor-pointer" />
          <FaRegUser className="text-3xl cursor-pointer" />
        </div>
        <div>
          <div className="text-2xl cursor-pointer mb-2">≡</div>
        </div>
      </div> 

      {/* Konten utama */}
      <div className="flex-1 ml-20 p-6 text-white">
        <h1 className="text-3xl font-semibold text-center mb-4">Post</h1>
        <div className="p-4 rounded-lg shadow-md" style={{ backgroundColor: "#222222" }}>
          <Post />
        </div>
      </div>

      {/* Form samping */}
      <div className="w-1/4 p-6 text-white" style={{ backgroundColor: "#222222" }}>
        <Typography variant="h6" gutterBottom>
          Buat Postingan
        </Typography>
        <form className="flex flex-col gap-4 mt-4">
          <label className="text-sm font-medium text-gray-200">Tambahkan Keterangan</label>
          <TextField
            label="Keterangan"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            InputProps={{ style: { color: "white" } }}
            InputLabelProps={{ style: { color: "#1DCD9F" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1DCD9F" },
                "&:hover fieldset": { borderColor: "#169976" },
                "&.Mui-focused fieldset": { borderColor: "#169976" },
              },
            }}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-200">Image</label>
            <button
              type="button"
              onClick={handleChooseFile}
              className="border rounded-md px-4 py-2 text-sm text-white bg-[#1DCD9F] hover:bg-[#169976] transition"
              name="content_image"
            >
              Pilih Gambar
            </button>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" />
          </div>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1DCD9F",
              "&:hover": { backgroundColor: "#169976" },
            }}
            onClick={handleAddPost()}
          >
            Kirim
          </Button>


          {/* Chat box */}
          <div className="flex flex-col gap-2 mt-6">
            <div className="bg-[#222222] h-96 w-75 rounded-xl flex flex-col justify-between p-3 border border-[#1DCD9F]">
              <label className="text-sm font-medium text-[#1DCD9F] mb-2">Chat</label>
              <div className="flex-1 overflow-y-auto text-sm space-y-2 pr-1">
                <div className="bg-[#1DCD9F] text-black rounded-lg px-3 py-1 self-end max-w-[80%]">Hai! 👋</div>
                <div className="bg-[#333333] text-white rounded-lg px-3 py-1 self-start max-w-[80%]">Halo, ada yang bisa dibantu?</div>
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <TextField
                  placeholder="Ketik pesan..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    style: { color: "white", backgroundColor: "#000000" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "#1DCD9F" },
                      "&:hover fieldset": { borderColor: "#169976" },
                      "&.Mui-focused fieldset": { borderColor: "#169976" },
                    },
                  }}
                />
                <Button
                  type="button"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1DCD9F",
                    minWidth: "80px",
                    color: "#000000",
                    fontWeight: 600,
                    "&:hover": { backgroundColor: "#169976" },
                  }}
                >
                  Kirim
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
