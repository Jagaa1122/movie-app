import { Copyright, Mail, Phone } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="h-[280px] flex bg-[#4338CA] w-full text-[#FAFAFA] gap-10 pt-6 justify-around items-baseline">
      <div>
        <Image
          className=""
          alt={"logo"}
          width={100}
          height={100}
          src={"/Logo copy.svg"}
        />
        <p className="flex">
          <Copyright className="size-4" />
          2024 Movie Z. All Rights Reserved.
        </p>
      </div>
      <div className="">
        <p className="text-[14px]">Contact Information</p>
        <div className="flex items-center">
          <Mail className="w-[16px] h-[16px]" />
          <div>
            <p className="text-[14px]">Email:</p>
            <p className="text-[14px]">support@movieZ.com</p>
          </div>
        </div>
        <div className="flex items-center">
          <Phone className="w-[16px] h-[16px]" />
          <div>
            <p className="text-[14px]">Phone:</p>
            <p className="text-[14px]">+976 (11) 123-4567</p>
          </div>
        </div>
      </div>
      <div>
        <p className="text-[14px]">Follow us</p>
        <p className="font-semibold">Facebook Instagram Twitter Youtube</p>
      </div>
    </div>
  );
};
