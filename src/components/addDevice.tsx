import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import LinkIcon from "@/components/icons/link";
import type { Selection } from "@nextui-org/react";
import { white } from "tailwindcss/colors";
import SplitAcIcon from "./icons/split";
import WindowIcon from "./icons/winkdow";
import CentralIcon from "./icons/central";
import { createClient } from "@/utils/client";
import axios from "axios";
const AddDevice = () => {
  const addDev = async () => {
    const supabase = await createClient();
    const user = await supabase.auth.getSession();
    const data = {
      LinkId: LinkId,
      Brand: Brand,
      Model: Model,
      Type: selectedKeys,
      Detail: appType,
      owner: user.data.session?.user.id,
      ownerMail:
        user.data.session?.user.new_email || user.data.session?.user.email,
    };
    const res = await axios.post("/api/linkDevice", data);
    console.log(res);
    setMessage(res.data.message);
  };
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["Type"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const [appType, setAppType] = React.useState<Selection>(new Set(["Type"]));

  const selectedType = React.useMemo(
    () => Array.from(appType).join(", ").replaceAll("_", " "),
    [appType]
  );
  const [message, setMessage] = useState("");
  const [LinkId, setLinkId] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  //   const [Type, setType] = useState(selectedValue);
  //   const [Detail, setDetail] = useState(selectedType);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        color="success"
        size="lg"
        startContent={<LinkIcon height={"40px"} width={"40px"} />}
        style={{ color: white, fontWeight: "bolder", zIndex: 0 }}
        onPress={onOpen}
        // onClick={() => {
        //   setAddDevice(!addDevice);
        // }}
      >
        Link Device
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <h1>{message}</h1>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Link New Device
              </ModalHeader>
              <ModalBody>
                <Input
                  value={LinkId}
                  onChange={(e) => {
                    setLinkId(e.target.value);
                  }}
                  isRequired
                  autoFocus
                  description="Enter the ID mentioned on device"
                  placeholder="Device ID"
                  variant="bordered"
                />
                <Input
                  value={Brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  isRequired
                  placeholder="Enter Brand"
                  variant="bordered"
                />
                <Input
                  value={Model}
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                  isRequired
                  placeholder="Enter Model"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 gap-4 justify-b etween">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button variant="bordered" className="capitalize">
                        {selectedValue}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      className="p-4 text-xl"
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      onSelectionChange={setSelectedKeys}
                    >
                      <DropdownItem key="AC" className="p-2">
                        Air Conditioner
                      </DropdownItem>
                      <DropdownItem key="Fridge" className="p-2">
                        Fridge
                      </DropdownItem>
                      <DropdownItem key="Wash" className="p-2">
                        Washing Machine
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>

                  {selectedValue == "Type" ? <></> : <></>}
                  {selectedValue == "Fridge" ? (
                    <>
                      {/* <Dropdown className="w-1/2">
                        <DropdownTrigger>
                          <Button variant="bordered" className="capitalize">
                            {appType}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          className="p-4 text-xl"
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selectedKeys}
                          onSelectionChange={setAppType}
                        >
                          <DropdownItem key="AC" className="p-2">
                            Air Conditioner
                          </DropdownItem>
                          <DropdownItem key="Fridge" className="p-2">
                            Fridge
                          </DropdownItem>
                          <DropdownItem key="Wash" className="p-2">
                            Washing Machine
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}
                    </>
                  ) : (
                    <></>
                  )}
                  {selectedValue == "Wash" ? (
                    <>
                      {/* <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" className="capitalize">
                            {appType}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          className="p-4 text-xl"
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={appType}
                          onSelectionChange={setAppType}
                        >
                          <DropdownItem key="AC" className="p-2">
                            Air Conditioner
                          </DropdownItem>
                          <DropdownItem key="Fridge" className="p-2">
                            Fridge
                          </DropdownItem>
                          <DropdownItem key="Wash" className="p-2">
                            Washing Machine
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}
                    </>
                  ) : (
                    <></>
                  )}
                  {selectedValue == "AC" ? (
                    <>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="bordered" className="capitalize">
                            {appType}
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu
                          className="p-4 text-xl"
                          aria-label="Single selection example"
                          variant="flat"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={appType}
                          onSelectionChange={setAppType}
                        >
                          <DropdownItem key="Split" className="p-2">
                            <SplitAcIcon height="60px" width="60px" />
                            <p className="text-xs text-gray-500">Split AC</p>
                          </DropdownItem>
                          <DropdownItem key="Window" className="p-2">
                            <WindowIcon height="45px" width="45px" />
                            <p className="text-xs text-gray-500">Window AC</p>
                          </DropdownItem>
                          <DropdownItem key="Central" className="p-2">
                            <CentralIcon height="45px" width="45px" />
                            <p className="text-gray-500 text-xs">Central AC</p>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={async () => {
                    const res = await addDev();
                    onClose;
                  }}
                >
                  Add device
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddDevice;
