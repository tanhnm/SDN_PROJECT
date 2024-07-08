import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "Components/ui/card";
import { Button } from "Components/ui/button";
export default function ComboCard({ combo }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      currencyDisplay: 'code',
    }).format(price);
  };
  return (
    <div className="">
      <Card className="w-[300px]">
        <CardHeader>
          {<img alt='service pet shop' className="w-full mb-4" src={combo.image}></img>}
          <CardTitle className=" text-left"> {combo.name}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <p>
              Price : <b>{formatPrice(combo.price)}</b>
            </p>
          </div>
        </CardContent>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <p>
                Status: <b>{combo.status}</b>
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="w-full">
          <Link to={`/services/${combo._id}`} className='w-full'>
            <Button className="bg-green-800 w-full">Detail</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
