import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Link } from "react-router-dom";
import { CalendarRange } from "lucide-react";
function Navbar() {
  const [isDichVuOpen, setIsDichVuOpen] = useState(false);
  const [isCuaHangOpen, setIsCuaHangOpen] = useState(false);
  const [isSpaOpen, setIsSpaOpen] = useState(false);
  const [isDanhChoChoOpen, setIsDanhChoChoOpen] = useState(false);
  const [isDanhChoMeoOpen, setIsDanhChoMeoOpen] = useState(false);

  return (
    <div className="w-full flex items-center bg-white justify-around py-4 font-mainText3">
      <span />
      <ul className="list-none text-center relative p-0">
        <li className="inline-block font-montserrat font-bold text-xs uppercase tracking-widest text-black py-2.5 px-5 relative cursor-pointer transition-colors duration-300 ease">
          <Link to="/introduction" className="hover:text-gray-700 text-lg">
            Giới Thiệu
          </Link>
        </li>
        <li
          className="inline-block font-montserrat font-bold text-xs uppercase tracking-widest text-black py-2.5 px-5 relative cursor-pointer transition-colors duration-300 ease"
          onMouseEnter={() => setIsDichVuOpen(true)}
          onMouseLeave={() => setIsDichVuOpen(false)}
        >
          <div className="dropdown-icon flex items-center">
            <Link to="/services" className="hover:text-gray-700 text-lg ">
              Spa & groom
            </Link>
            <ArrowDropDownIcon />
          </div>
          {isDichVuOpen && (
            <ul className="dropdown absolute bg-white border border-gray-300 py-2 list-none min-w-40 shadow-md left-0 top-full text-left z-50  ">
              <li
                className="relative px-5 py-2 transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue"
                onMouseEnter={() => setIsSpaOpen(true)}
                onMouseLeave={() => setIsSpaOpen(false)}
              >
                <div className="dropdown-icon flex items-center justify-between">
                  <span>Spa Thú Cưng</span>
                  <ArrowDropDownIcon />
                </div>
                {isSpaOpen && (
                  <ul className="absolute left-full top-0 bg-white border border-gray-300 py-2 list-none min-w-40 shadow-md text-left z-50">
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      Tắm, gội, vệ sinh
                    </li>
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      Cắt, tỉa
                    </li>
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      Tắm, vệ sinh, cạo
                    </li>
                  </ul>
                )}
              </li>
              <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                Khách sạn thú cưng
              </li>
            </ul>
          )}
        </li>
        <li
          className="inline-block font-montserrat font-bold text-xs uppercase tracking-widest text-black py-2.5 px-5 relative cursor-pointer transition-colors duration-300 ease"
          onMouseEnter={() => setIsCuaHangOpen(true)}
          onMouseLeave={() => setIsCuaHangOpen(false)}
        >
          <div className="dropdown-icon flex items-center">
            <Link to="/general-product" className="hover:text-gray-700 text-lg">
              Sản phẩm
            </Link>
            <ArrowDropDownIcon />
          </div>
          {isCuaHangOpen && (
            <ul className="dropdown absolute bg-white border border-gray-300 py-2 list-none min-w-40 shadow-md left-0 top-full text-left z-50">
              <li
                className="relative px-5 py-2 transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue"
                onMouseEnter={() => setIsDanhChoChoOpen(true)}
                onMouseLeave={() => setIsDanhChoChoOpen(false)}
              >
                <div className="dropdown-icon flex items-center justify-between">
                  <Link
                    to="/dog-product-general"
                    className="hover:text-royalblue"
                  >
                    Dành cho chó
                  </Link>
                  <ArrowDropDownIcon />
                </div>
                {isDanhChoChoOpen && (
                  <ul className="absolute left-full top-0 bg-white border border-gray-300 py-2 list-none min-w-40 shadow-md text-left z-50">
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      <Link to="/dog-food">Thức ăn cho chó</Link>
                    </li>
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      <Link to="/dog-product">Phụ kiện cho chó</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li
                className="relative px-5 py-2 transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue"
                onMouseEnter={() => setIsDanhChoMeoOpen(true)}
                onMouseLeave={() => setIsDanhChoMeoOpen(false)}
              >
                <div className="dropdown-icon flex items-center justify-between">
                  <Link
                    to="/cat-product-general"
                    className="hover:text-royalblue"
                  >
                    Dành cho mèo
                  </Link>
                  <ArrowDropDownIcon />
                </div>
                {isDanhChoMeoOpen && (
                  <ul className="absolute left-full top-0 bg-white border border-gray-300 py-2 list-none min-w-40 shadow-md text-left z-50">
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      <Link to="/cat-food">Thức ăn cho mèo</Link>
                    </li>
                    <li className="px-5 py-2 text-xs font-bold transition-colors duration-300 ease hover:bg-gray-100 hover:text-royalblue">
                      <Link to="/cat-product">Phụ kiện cho mèo</Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          )}
        </li>
        <li className="inline-block font-montserrat font-bold text-xs uppercase tracking-widest text-black py-2.5 px-5 relative cursor-pointer transition-colors duration-300 ease">
          <Link to="/blog" className="hover:text-gray-700 text-lg">
            Bài Viết
          </Link>
        </li>
      </ul>
      <div className=" animate-bounce  navbar-booking flex items-center gap-2 px-5 py-1 text-xs font-bold uppercase tracking-widest text-gray-100 bg-black border-none rounded-full shadow-md hover:bg-royalblue cursor-pointer">
        <Link
          to="/appointment-booking"
          className="flex justify-center items-center gap-2 p-2"
        >
          {" "}
          <CalendarRange /> <p>Đặt Lịch Ngay</p>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
