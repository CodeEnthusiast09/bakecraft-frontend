import Image from "next/image";
import { SolutionCardProps } from "./types";

const SolutionCard = ({ image, title, description }: SolutionCardProps) => {
  return (
    <>
      <div className="bg-background min-[320px]:w-[280px] min-[320px]:h-[280px]  min-[375px]:w-[300px] min-[375px]:h-[300px] min-[425px]:w-[350px] min-[425px]:h-[350px] md:w-[350px] md:h-[350px] min-[320px]:py-7 min-[320px]:px-7 min-[375px]:py-[47px] min-[375px]:px-[40px] md:py-[47px] md:px-[40px] shadow-xl rounded-[20px]">
        <Image
          src={image ?? "/images/default-image.png"}
          alt={title ?? "Course Image"}
          width={41.67}
          height={41.67}
          className="object-cover"
        />

        <p className="text-primary-400 font-bold text-base min-[321px]:text-base sm:text-lg md:text-xl mt-7 mb-3.5">
          {title}
        </p>

        <p className="text-primary-500 font-light text-sm min-[321]:text-sm md:text-base">
          {description}
        </p>
      </div>
    </>
  );
};

export default SolutionCard;
