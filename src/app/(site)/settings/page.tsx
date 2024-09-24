"use client"
import { createClient } from "@/utils/client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";

const Settings = () => {
  const [newMail, setNewMail] = useState("");
  const update = async () => {
    const supabase = await createClient();
    const res = await supabase.auth.updateUser({ email: newMail });
    console.log(res);
  };

  return (
    <div className="p-8 md:w-3/4 ">
      <h1 className="md:text-6xl text-5xl">Settings</h1>
      <div className="border-t-[1px] m-2 border-black pt-5">
        <div className="flex w-1/4 flex-wrap flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="email"
              className="border-[1px] border-black/75 rounded-lg"
              placeholder="New Email"
              value={newMail}
              onChange={(e) => {
                setNewMail(e.target.value);
              }}
            />
            <Button
              className=""
              onClick={() => {
                update();
              }}
            >
              Update Email
            </Button>
          </div>
          <Button color="danger">Delete Account</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
