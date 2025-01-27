import { Copyright, Mail, Phone } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="mt-[40px] flex bg-[#4338CA] text-[#FAFAFA] gap-[100px] py-8 px-[20px] text-[14px]">
      <div className="mr-auto">
        <Image
          className="mb-3"
          alt={"logo"}
          width={100}
          height={100}
          src={"/Logo copy.svg"}
        />
        <p className="flex ">
          &copy; 2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div className="">
        <p className="mb-3">Contact Information</p>
        <div className="flex items-center gap-2 mb-3">
          <Mail className="w-[16px] h-[16px]" />
          <div>
            <p className="font-semibold ">Email:</p>
            <p className="text-[14px]">support@movieZ.com</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-[16px] h-[16px]" />
          <div>
            <p className="font-semibold">Phone:</p>
            <p className="text-[14px]">+976 (11) 123-4567</p>
          </div>
        </div>
      </div>
      <div>
        <p className=" mb-3">Follow us</p>
        <p className="font-semibold">Facebook Instagram Twitter Youtube</p>
      </div>
    </div>
  );
};
