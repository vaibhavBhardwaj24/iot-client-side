"use client";
import { createClient } from "@/utils/client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/skeleton";
import axios from "axios";
import { Button } from "@nextui-org/button";
import { white } from "tailwindcss/colors";
import { cn } from "@/lib/utils";
// import React from "react";
import { BentoGrid, BentoGridItem } from "../../../components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

import IDicon from "@/components/icons/id";
import AddDevice from "@/components/addDevice";
// import CardComponent from "@/components/card";
interface IOTItem {
  id: string;
  brand: string;
  createdAt: string;
  model: string | null;
  owner: string;
  ownerEmail: string | null;
  type: string;
  detail: string | null;
}
import { CardComponent } from "@/components/card";
const DashBoard = () => {
  const [user, setUser] = useState([]);
  const [iots, setIOTs] = useState<IOTItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient();
      const res = await supabase.auth.getSession();
      console.log(res.data.session?.user.id, "wertyui");
      const data = await axios.post("/api/dashboard", {
        userId: res.data.session?.user.id,
      });
      if (data.data.success) {
        setIOTs(data.data.iot);
        console.log(data.data.iot);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-full">
      <div className="p-8 md:w-3/4">
        <h1 className="md:text-6xl text-5xl">Dashboard</h1>

        <div className="border-t-[1px] m-2 border-black">
          <div className="flex gap-4 pt-4">
            <AddDevice />
          </div>
        </div>
        <h1 className="text-xl p-2">Linked Devices</h1>
        <BentoGrid className="max-w-4xl mx-auto">
          {iots.map((iot, i) => (
            <BentoGridItem
              id={iot.id}
              key={iot.id}
              title={iot.brand}
              description={iot.model}
              // header={iot.model}
              type={iot.type}
              detail={iot.detail ?? ""}
              // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default DashBoard;
