import React from "react";
import {
  Card,
  CardBody,
  Divider,
  Image,
  Button,
  Slider,
} from "@nextui-org/react";
import FridgeIcon from "./icons/fridge";
import SplitAcIcon from "./icons/split";
import WindowIcon from "./icons/winkdow";
import CentralIcon from "./icons/central";
import WashingMachineIcon from "./icons/wash";
interface cardProps {
  brand: string;
  createdAt: string;
  id: string;
  model: string | null;
  owner: string;
  ownerEmail: string | null;
  type: string;
  detail: string;
}
export const CardComponent: React.FC<cardProps> = ({
  brand,
  createdAt,
  id,
  model,
  owner,
  ownerEmail,
  type,
  detail,
}) => {
  const [liked, setLiked] = React.useState(false);
  console.log(type, detail);

  return (
    <Card
      isBlurred
      className=" border-none bg-background/60 dark:bg-default-100/50 max-w-[710px] hover:translate-x-2 duration-500"
      shadow="sm"
      fullWidth
      isPressable
    >
      <CardBody>
        <div className="h-60 flex items-center">
          <div className="h-5/6 w-1/3 rounded-md mx-5 flex justify-center items-center border- [1px] border-black">
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
          <div>
            <h1>Brand- {brand}</h1>
            <h2>Model- {model}</h2>
            
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
