import Image from "next/image";
import { StepsCardProps } from "./types";

const Steps = ({ image, title, description }: StepsCardProps) => {
  return (
    <>
      <div className="bg-background min-[320px]:w-[280px] min-[320px]:h-[138px]  min-[375px]:w-[300px] min-[375px]:h-[138px] min-[425px]:w-[347px] min-[425px]:h-[138px] md:w-[347px] md:h-[138px] flex items-center justify-between gap-11 mb-10">
        <Image
          src={image ?? "/images/default-image.png"}
          alt={title ?? "Course Image"}
          width={41.67}
          height={41.67}
          className="object-cover"
        />

        <div>
          <p className="text-primary-400 font-bold text-base min-[321px]:text-base sm:text-lg md:text-xl mt-7 mb-3.5">
            {title}
          </p>

          <p className="text-primary-500 font-light text-sm min-[321]:text-sm md:text-base">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Steps;
