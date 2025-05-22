import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/action/authAction";
import { FaGripLines, FaThreads } from "react-icons/fa6";
import { CgHomeAlt } from "react-icons/cg";
import { FaRegUser, FaUserAlt } from "react-icons/fa";
import { TextField, Button, Typography } from "@mui/material";
import { FaRegComment } from "react-icons/fa";

const Home = () => {
  const profile = useSelector((root) => root?.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProfile(profile?.token));
  }, []);

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#000000" }}>
      {/* Sidebar yang kiri */}
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
          <FaGripLines className="text-2xl cursor-pointer mb-2" />
        </div>
      </div>

      {/* Utama */}
      <div className="flex-1 ml-20 p-6 text-white">
        <h1 className="text-3xl font-semibold text-center mb-4">Post</h1>
        <div
          className="p-4 rounded-lg shadow-md"
          style={{ backgroundColor: "#222222" }}
        >
          <div className="flex gap-5">
            <div className="flex items-center justify-center p-3 w-11 h-11 rounded-full border-2 border-slate-300">
              <FaUserAlt />
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="font-semibold text-lg">username</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque iaculis nisi vel nunc eleifend, et finibus lorem
                  consectetur. Donec eget aliquet urna. Fusce eget consectetur
                  dolor. Suspendisse consequat ipsum vitae elit iaculis, nec
                  tempor purus porttitor. Integer sit amet massa at ipsum
                  consequat sodales. Curabitur hendrerit a lectus vitae
                  tincidunt. Integer erat odio, dictum sit amet odio pulvinar,
                  vestibulum commodo augue. Phasellus eu luctus ex. Fusce
                  gravida blandit sapien, quis lobortis tellus dignissim
                  porttitor.
                </p>
              </div>
              <div className="bg-slate-500 h-96 w-72  rounded-xl"></div>
              <div className="flex gap-10 text-xl">
                <FaRegComment />
              </div>
            </div>
          </div>
          <hr className="my-5 border-slate-400" />

          {/*  */}
          <div className="flex gap-5">
            <div className="flex items-center justify-center p-3 w-11 h-11 rounded-full border-2 border-slate-300">
              <FaUserAlt />
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="font-semibold text-lg">username</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque iaculis nisi vel nunc eleifend, et finibus lorem
                  consectetur. Donec eget aliquet urna. Fusce eget consectetur
                  dolor. Suspendisse consequat ipsum vitae elit iaculis, nec
                  tempor purus porttitor. Integer sit amet massa at ipsum
                  consequat sodales. Curabitur hendrerit a lectus vitae
                  tincidunt. Integer erat odio, dictum sit amet odio pulvinar,
                  vestibulum commodo augue. Phasellus eu luctus ex. Fusce
                  gravida blandit sapien, quis lobortis tellus dignissim
                  porttitor.
                </p>
              </div>
              <div className="flex gap-10 text-xl">
                <FaRegComment />
              </div>
            </div>
          </div>
          <hr className="my-5 border-slate-400" />
        </div>
      </div>

      {/* form */}
      <div
        className="w-1/4 p-6 text-white"
        style={{ backgroundColor: "#222222" }}
      >
        <Typography variant="h6" gutterBottom>
          Buat Postingan
        </Typography>
        <form className="flex flex-col gap-4 mt-4">
          <label className="text-sm font-medium text-gray-200">
            Tambahkan Keterangan
          </label>
          <TextField
            label="Keterangan"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            InputProps={{
              style: {
                color: "white",
              },
            }}
            InputLabelProps={{
              style: {
                color: "#1DCD9F",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#1DCD9F",
                },
                "&:hover fieldset": {
                  borderColor: "#169976",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#169976",
                },
              },
            }}
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-200">Image</label>
            <button
              type="button"
              onClick={handleChooseFile}
              className="border rounded-md px-4 py-2 text-sm text-white bg-[#1DCD9F] hover:bg-[#169976] transition"
            >
              Pilih Gambar
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#1DCD9F",
              "&:hover": {
                backgroundColor: "#169976",
              },
            }}
          >
            Kirim
          </Button>

          <div className="flex flex-col gap-2 mt-6">
            <div className="bg-[#222222] h-96 w-75 rounded-xl flex flex-col justify-between p-3 border border-[#1DCD9F]">
              <label className="text-sm font-medium text-[#1DCD9F] mb-2">
                Chat
              </label>

              <div className="flex-1 overflow-y-auto text-sm space-y-2 pr-1">
                <div className="bg-[#1DCD9F] text-black rounded-lg px-3 py-1 self-end max-w-[80%]">
                  Hai! 👋
                </div>
                <div className="bg-[#333333] text-white rounded-lg px-3 py-1 self-start max-w-[80%]">
                  Halo, ada yang bisa dibantu?
                </div>
              </div>
              <div className="mt-2 flex gap-2 items-center">
                <TextField
                  placeholder="Ketik pesan..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  InputProps={{
                    style: {
                      color: "white",
                      backgroundColor: "#000000",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#1DCD9F",
                      },
                      "&:hover fieldset": {
                        borderColor: "#169976",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#169976",
                      },
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
                    "&:hover": {
                      backgroundColor: "#169976",
                    },
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