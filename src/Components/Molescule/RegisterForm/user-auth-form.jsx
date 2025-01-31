import React from "react";
import { registerUser } from "lib/api/register-api";
import { cn } from "lib/utils.js";
import { Input } from "Components/ui/input";
import { Button } from "Components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { LoaderCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "Components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "Components/ui/select";

// check chuan form dien thoai viet nam
const phoneRegex = new RegExp(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/);

const formLoginSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "username ít nhất 3 ký tự" })
      .max(30, { message: "username không quá 30 kí tự" }),
    email: z
      .string()
      .min(1, { message: "không được bỏ trống" })
      .email({ message: "Email không hợp lệ" }),
    phone: z
      .string()
      .min(1, { message: "không được bỏ trống" })
      .regex(phoneRegex, { message: "Phone không hợp lệ" }),
    password: z
      .string()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/, {
        message:
          "pass phải ít nhất 6 kí tự bao gồm(chữ in hoa, chữ thường, kí tự đặt biệt, và số)",
      }),
    confirmPassword: z.string().min(1, { message: "không được bỏ trống" }),
    sex: z.string(),
    dob: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords không đúng!",
    path: ["confirmPassword"],
  });

export default function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      sex: "",
      dob: "",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    const { confirmPassword, ...dataToStore } = values;
    const result = await registerUser({
      ...dataToStore,
    });
    setIsLoading(false);
    console.log("test data :", result);

    if (result.error) {
      toast.error(`Error: ${result.error}`, {
        position: "top-left",
      });
    } else if (result.data.status === "error") {
      toast.error(`Error: ${result.data.message}`, {
        position: "top-left",
      });
    } else {
      //set data in local
      localStorage.setItem("registerData", JSON.stringify(dataToStore));
      toast.success(`Success: ${result.data.message}`, {
        position: "top-right",
      });
      setTimeout(() => {
        navigate("/verify");
      }, 1000);
    }
    setIsLoading(false);
  }

  return (
    <div
      className={cn("grid gap-6 space-y-4  px-10 border-none ", className)}
      {...props}
    >
      <Form {...form}>
        <form
          method="POST"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên người dùng</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="phone"
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Ngày sinh</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giới tính</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      className="border-none !bg-black"
                    >
                      <SelectTrigger className="border-black">
                        <SelectValue placeholder="Giới tính" />
                      </SelectTrigger>
                      <SelectContent className="!text-black !z-[100000000000000000000]">
                        <SelectItem value="nam">Nam</SelectItem>
                        <SelectItem value="nu">Nữ</SelectItem>
                        <SelectItem value="khac">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isLoading}
            className="w-full text-white bg-primary hover:bg-primary/90 rounded-full"
          >
            {isLoading ? (
              <div className="flex gap-1 text-gray-500">
                Loading <LoaderCircle className="animate-spin"></LoaderCircle>
              </div>
            ) : (
              "Đăng ký"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
