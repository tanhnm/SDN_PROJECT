import imgContext1 from "assets/images/hotel_wallpaper.webp";
import imgContext2 from "assets/images/hotel2-img-7.webp";
import imgContext3 from "assets/images/hotel3_img_4.webp";
import imgContext31 from "assets/images/hotel3.1_img_3.webp";
import imgContext32 from "assets/images/hote3.2l_img_9.webp";
import imgContext33 from "assets/images/hotel3.3_img_10.webp";
import imgContext34 from "assets/images/hotel3.4_img_11.webp";
import imgContext36 from "assets/images/hotel3.5_img_12.webp";
import imgContextVip from "assets/images/hotelvip_15.webp";

const HomePage = () => {
  const activities = [
    {
      time: "07:00 - 08:30",
      description: "Nhân viên chuẩn bị bữa sáng, kiểm tra lau dọn chuồng",
    },
    { time: "08:30 - 09:00", description: "Bắt đầu ăn sáng" },
    { time: "09:00 - 12:00", description: "Tự do vui chơi trong vườn" },
    { time: "12:00 - 12:30", description: "Các bé trở về phòng và ăn trưa" },
    { time: "12:30 - 14:00", description: "Các bé nghỉ trưa trong phòng" },
    { time: "14:00 - 17:00", description: "Tự do vui chơi trong vườn" },
    {
      time: "17:00 - 19:00",
      description: "Các bé trở về phòng, bắt đầu ăn tối",
    },
    { time: "Sau 19:00", description: "Các bé nghỉ ngơi trong phòng" },
  ];
  return (
    <div className="px-20 py-10 flex items-center justify-center flex-col font-mainText3">
      <img
        src={imgContext1}
        alt="img context 1"
        className="w-[80%] rounded-md"
      />
      <div className="p-10 flex justify-center items-center flex-col text-center max-w-[50%]">
        <h1 className="text-4xl font-bold">Lo lắng khi gửi bé yêu</h1>
        <p>
          Chúng tôi hiểu rõ những lo lắng của bạn, vì vậy PETSHOP tập trung vào
          việc cung cấp chế độ ăn uống đáng tin cậy và sự quan sát thông qua hệ
          thống camera tiên tiến. Hãy yên tâm, chủ có thể xem thú cưng của mình
          thoải mái chơi đùa qua các camera, và PETSHOP tạo điều kiện thuận lợi
          để các bé được thả chơi tự do một cách an toàn và vui vẻ từ sáng đến
          tối.
        </p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <p className="text-5xl font-bold flex gap-1 mb-2">
          Lịch trình hàng ngày của <p className="text-green-500 ">Các bé</p>
        </p>
        <p>
          Tất cả các phòng đều có camera giám sát thông minh, đàm thoại 2 chiều
        </p>
        <div className=" flex gap-1 items-center justify-center mb-2">
          <img src={imgContext2} alt="" className="w-[40%] rounded-md" />

          <div className="max-w-md mx-auto p-5 mx-0 ">
            {activities.map((activity, index) => (
              <div key={index} className="mb-1 my-1">
                <div className="text-green-500 font-bold">{activity.time}</div>
                <div className="break-words">{activity.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-1 items-center justify-center mb-2">
          <div className=" flex gap-1 items-center justify-center mb-2 flex-col">
            <h1 className="font-bold text-green-500 text-4xl">Phòng cực VIP</h1>
            <p>
              Phòng cực rộng, cực đẹp, view sân vườn, wifi miễn phí kèm các bữa
              ăn được đưa đến tận phòng
            </p>
          </div>
          <img src={imgContextVip} alt="vip" className="w-[50%]" />
        </div>
        <h1 className="text-4xl font-bold flex gap-1 mb-2">Hình ảnh</h1>
        <div className="grid grid-cols-3 gap-3 w-[80%]">
          <img src={imgContext3} alt=" ct 3" className="w-[100%] rounded-md" />
          <img src={imgContext31} alt=" ct 3" className="w-[100%] rounded-md" />
          <img src={imgContext32} alt=" ct 3" className="w-[100%] rounded-md" />
          <img src={imgContext33} alt=" ct 3" className="w-[100%] rounded-md" />
          <img src={imgContext34} alt=" ct 3" className="w-[100%] rounded-md" />
          <img src={imgContext36} alt=" ct 3" className="w-[100%] rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
