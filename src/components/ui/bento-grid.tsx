import { cn } from "@/lib/utils";
import FridgeIcon from "../icons/fridge";
import SplitAcIcon from "../icons/split";
import WindowIcon from "../icons/winkdow";
import CentralIcon from "../icons/central";
import WashingMachineIcon from "../icons/wash";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  className,
  title,
  description,
  header,
  detail,
  type,
}: //   icon,
{
  id: string;
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  detail: string;
  type: string;
  //   icon?: React.ReactNode;
}) => {
  return (
    <Link href={`/dashboard/${id}`}>
      <div
        className={cn(
          "border-2 border-black/[0.2] row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200  shadow-none p-4   bg-white   justify-between flex flex-col space-y-4",
          className
        )}
      >
        <div className="group-hover/bento:translate-x-2 transition duration-200">
          <div className="m-2">
            {/* <div className=""> */}
            {type == "Fridge" ? (
              <>
                <FridgeIcon height="150px" width="150px" />
              </>
            ) : (
              <></>
            )}
            {type == "AC" && detail == "Split" ? (
              <>
                <SplitAcIcon height="150px" width="150px" />
              </>
            ) : (
              <></>
            )}
            {type == "AC" && detail == "Window" ? (
              <>
                <WindowIcon height="150px" width="150px" />
              </>
            ) : (
              <></>
            )}
            {type == "AC" && detail == "Central" ? (
              <>
                <CentralIcon height="150px" width="150px" />
              </>
            ) : (
              <></>
            )}
            {type == "Wash" ? (
              <>
                <WashingMachineIcon height="150px" width="150px" />
              </>
            ) : (
              <></>
            )}
          </div>
          <hr />
          <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
        </div>
      </div>
    </Link>
  );
};
