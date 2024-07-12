import React, { useEffect, useState } from "react";
import { Button } from "Components/ui/button";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DetailService,
  getAllPet,
  CreateServiceBooking,
} from "lib/api/services-api";
import { Skeleton } from "Components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "Components/ui/select";
export default function ServicesDetail() {
  const [card, setCard] = useState(null);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "code",
    }).format(price);
  };

  const { id } = useParams();
  useEffect(() => {
    const fetchDetailService = async () => {
      try {
        const data = await DetailService(id);
        setCard(data.data);
      } catch (error) {
        console.error("Error fetching service detail:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const getAllPets = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const data = await getAllPet(userId);
        setPets(data.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
      getAllPets();
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
    }

    fetchDetailService();
  }, [id]);

  const handleBooking = async () => {
    const bookingTime = new Date();
    const bookingData = {
      petId: selectedPet,
      timeStartService: bookingTime.toISOString(),
      productId: id,
    };

    const result = await CreateServiceBooking(bookingData);
    console.log("da", result);
    console.log("kq", result.response.status);
    if (result.response.data.status === "error") {
      toast.error(`Error: ${result.response.data.message}`, {
        position: "top-left",
      });
    } else {
      toast.success(`Success: ${result.response.data.message}`, {
        position: "top-right",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center  flex-row-reverse gap-10 ">
        <Skeleton className="h-[20vw] w-[20vw] rounded-xl mb-5" />
        <div className="space-y-6 ">
          <Skeleton className="h-10 w-[20vw] mb-10" />
          <Skeleton className="h-7 w-[10vw] " />
          <Skeleton className="h-5 w-[15vw] " />
          <Skeleton className="h-4 w-[8vw] " />
        </div>
      </div>
    );
  }
  return (
    <div className="mx-[20%]">
      <div className="flex justify-center mb-5">
        <img
          src={card && card.image}
          alt={card && card.name}
          className="w-[20vw] rounded-md shadow-inner mr-5"
        />
        <div className="p-5 ">
          <h1 className="text-3xl font-bold text-green-800 mb-7">
            {card && card.name}
          </h1>
          <p className="font-bold mb-3">{card && formatPrice(card.price)}</p>
          <p className="mb-3">
            <b>Trạng thái: </b>
            {card && card.status}
          </p>
          {isLoggedIn && pets?.length > 0 ? (
            <div className="mb-7 self-end">
              <Select onValueChange={setSelectedPet}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn thú cưng" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet._id} value={pet._id}>
                      {pet.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={handleBooking}
                className="text-white bg-green-700 rounded-2xl px-10 mt-3 w-full"
              >
                ĐẶT DỊCH VỤ
              </Button>
            </div>
          ) : (
            <div>
              <p className="text-red-500">
                {(isLoggedIn === false &&
                  "Vui lòng đăng nhập để sử dụng dịch vụ") ||
                  (pets?.length === 0 && "Bạn không có thú cưng nào")}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="min-h-10 p-5 ring-1  ring-gray-500 rounded-sm mb-5">
        <p className="font-bold text-green-900 text-2xl mb-5">Mô tả</p>
        <p className="whitespace-pre-line">{card && card.des}</p>
      </div>
    </div>
  );
}
