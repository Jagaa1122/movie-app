import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCard() {
  return (
    <div className=" flex flex-col justify-between items-center  gap-6 mx-auto max-w-full">
      <Skeleton className="h-[600px] w-full rounded-xl" />
      {/* <div className="w-full h-[450px] flex gap-5 m-auto justify-center">
        <Skeleton className="h-[450px] w-[300px] cursor-pointer rounded-lg" />
        <Skeleton className="w-[650px]" />
      </div> */}
      <div className="w-full px-20 flex gap-4">
        <Skeleton className=" w-full h-4" />
        <Skeleton className=" w-full h-4" />
        <Skeleton className=" w-full h-4" />
        <Skeleton className=" w-full h-4" />
      </div>
      <Skeleton className=" w-full h-[50px]" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className=" w-[230px] h-[380px] rounded-xl overflow-hidden my-5"
          />
        ))}
      </div>
    </div>
  );
}
