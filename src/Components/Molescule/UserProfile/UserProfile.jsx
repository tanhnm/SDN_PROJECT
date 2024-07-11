import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyAxios from "setup/configAxios";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      MyAxios.get(`http://localhost:5000/api/v1/user/${userId}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
          setError(err.message);
          console.error("API call error:", err);
        });
    }
  }, []);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-7xl px-6 py-4 md:p-8 rounded-lg shadow-md bg-white">
        <h2 className="text-3xl font-bold text-[#161931] mb-6">Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-6">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-[#166534]"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />
            <button
              type="button"
              className="py-3.5 px-7 text-base font-medium text-white bg-[#166534] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 focus:outline-none"
            >
              Thay đổi ảnh
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#166534]">
                Tên
              </label>
              <input
                type="text"
                id="name"
                className="bg-white border border-[#166534] text-[#166534] text-sm rounded-lg focus:ring-[#166534] focus:border-[#166534] block w-full p-2.5"
                value={user.name}
                required
              />
            </div>
            <div>
              <label htmlFor="dob" className="block mb-2 text-sm font-medium text-[#166534]">
                Ngày sinh
              </label>
              <input
                type="text"
                id="dob"
                className="bg-white border border-[#166534] text-[#166534] text-sm rounded-lg focus:ring-[#166534] focus:border-[#166534] block w-full p-2.5"
                value={user.dob}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#166534]">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-white border border-[#166534] text-[#166534] text-sm rounded-lg focus:ring-[#166534] focus:border-[#166534] block w-full p-2.5"
                value={user.email}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-[#166534]">
                Điện thoại
              </label>
              <input
                type="text"
                id="phone"
                className="bg-white border border-[#166534] text-[#166534] text-sm rounded-lg focus:ring-[#166534] focus:border-[#166534] block w-full p-2.5"
                value={user.phone}
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block mb-2 text-sm font-medium text-[#166534]">
                Địa chỉ
              </label>
              <input
                type="text"
                id="address"
                className="bg-white border border-[#166534] text-[#166534] text-sm rounded-lg focus:ring-[#166534] focus:border-[#166534] block w-full p-2.5"
                value={user.address}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="py-3.5 px-7 text-base font-medium text-white bg-[#166534] rounded-lg border border-[#166534] hover:bg-[#145c43] focus:ring-4 focus:ring-[#166534] focus:outline-none"
          >
            Lịch sử đặt hàng
          </button>
          <button
            type="submit"
            className="py-3.5 px-7 text-base font-medium text-white bg-[#166534] rounded-lg border border-[#166534] hover:bg-[#145c43] focus:ring-4 focus:ring-[#166534] focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
