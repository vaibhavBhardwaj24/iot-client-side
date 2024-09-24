"use client";
import DayData from "@/components/dayData";
import MonthData from "@/components/monthData";
import { Tabs } from "@/components/ui/tabs";
import WeekData from "@/components/weekData";
import { createClient } from "@/utils/client";
import axios from "axios";
import { format, subDays } from "date-fns";
// import { efficiencyPoint } from "../../../../../migrations/schema";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface LatestEntry {
  coilTemp: number | null;
  surroundingHumidity: number | null;
  surroundingTemp: number | null;
  Relative_COP: number | null;
}

interface WeekData {
  [key: string]: number;
}

interface DashData {
  latest_entry: LatestEntry;
  monthlyAvgCOP: number | null;
  week: WeekData;
}

const DeviceId = () => {
  const [dashData, setDashData] = useState<DashData>({
    latest_entry: {
      coilTemp: null,
      surroundingHumidity: null,
      surroundingTemp: null,
      Relative_COP: null,
    },
    monthlyAvgCOP: null,
    week: {}, // Initialize with an empty object or a valid WeekData object
  });

  const [percentile, setPercentile] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  const [percentage, setPercetnage] = useState(0);
  const size = 300;
  const strokeWidth = 30;

  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const colors = ["#FF4C4C", "#FF9F00", "#F0E700", "#8CFF00", "#00D084"];
  const segmentIndex = Math.min(Math.floor(percentage / 20), colors.length - 1);

  const catagory = (value: number) => {
    if (percentile && percentile.length > 0) {
      // Use the first percentile object for comparison
      const p = percentile[0];

      if (value < p.minVal) {
        return 0;
      } else if (value >= p.minVal && value < p.q20) {
        return 1;
      } else if (value >= p.q20 && value < p.q40) {
        return 2;
      } else if (value >= p.q40 && value < p.q60) {
        return 3;
      } else if (value >= p.q60 && value < p.q80) {
        return 4;
      } else if (value >= p.q80 && value < p.maxVal) {
        return 5;
      } else {
        return 6;
      }
    }

    // Return a default category if percentile data is not available
    return -1; // Or another default value indicating that percentile data is missing
  };
  const param = useParams();
  const deviceId = Array.isArray(param.deviceId)
    ? param.deviceId[0]
    : param.deviceId;

  useEffect(() => {
    const data = async () => {
      const supabase = await createClient();
      const resa = await axios.post("http://127.0.0.1:5000/dashboard", {
        id: deviceId,
      });
      setDashData(resa.data);
      // const faaf = JSON.parse(resa.data);
      console.log(resa.data);
      const { data, error } = await supabase
        .from("efficiencyPoint")
        .select("*");
      setPercentile(data);
      console.log(data, error);
      if (data != null) {
        const p = data[0];

        if (resa.data.latest_entry.Relative_COP < p.minVal) {
          setPercetnage(0);
        } else if (
          resa.data.latest_entry.Relative_COP >= p.minVal &&
          resa.data.latest_entry.Relative_COP < p.q20
        ) {
          setPercetnage(20);
        } else if (
          resa.data.latest_entry.Relative_COP >= p.q20 &&
          resa.data.latest_entry.Relative_COP < p.q40
        ) {
          setPercetnage(40);
        } else if (
          resa.data.latest_entry.Relative_COP >= p.q40 &&
          resa.data.latest_entry.Relative_COP < p.q60
        ) {
          setPercetnage(60);
        } else if (
          resa.data.latest_entry.Relative_COP >= p.q60 &&
          resa.data.latest_entry.Relative_COP < p.q80
        ) {
          setPercetnage(80);
        } else if (
          resa.data.latest_entry.Relative_COP >= p.q80 &&
          resa.data.latest_entry.Relative_COP < p.maxVal
        ) {
          setPercetnage(100);
        } else {
          setPercetnage(-1);
        }
        // const stage = catagory(resa.data.latest_entry.Relative_COP) / 5;
        // console.log(catagory(resa.data.latest_entry.Relative_COP));

        // setPercetnage(stage);
      }
      setLoading(false);
    };
    data();
  }, []);

  const tabs = [
    {
      title: "Day",
      value: "Day",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Last day</p>
          <DayData deviceId={deviceId} />
        </div>
      ),
    },
    {
      title: "Week",
      value: "Week",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Last Week</p>
          <WeekData deviceId={deviceId} />
        </div>
      ),
    },
    {
      title: "Month",
      value: "Month",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Last Month</p>
          <MonthData deviceId={deviceId} />
        </div>
      ),
    },
  ];
  const pastelColors = [
    "#F5C1C1", // pastel coral
    "#F28D35", // pastel orange
    "#D83367", // pastel pink
    "#77DD77", // pastel green
    "#E3C6E7", // pastel lavender
    "#FFB3B3", // pastel orange
    "#FDFD96", // pastel yellow
    "#FFDAB9", // pastel peach
    "#98FF98", // pastel mint
  ];
  const getBackgroundColor = (index: number) => {
    return pastelColors[index % pastelColors.length];
  };
  return (
    <div className="h-full w-full">
      {loading ? (
        <>loading...</>
      ) : (
        <div className="h-1/2 w-full gap-4 flex flex-row p-4">
          <div className="h-full w-2/3 rounded-xl bg-black/10 flex p-6 items-start">
            <div className="w-2/3 gap-4 flex flex-col">
              <h1 className="text-5xl font-bold">Latest Readings</h1>
              <div className="w-full flex gap-2">
                <div className="w-1/3">
                  <div className="text-4xl">
                    {dashData.latest_entry.coilTemp}°C
                  </div>
                  <p className="text-xs">Coil Temprature</p>
                </div>
                <div className="w-1/3">
                  <div className="text-4xl">
                    {dashData.latest_entry.surroundingHumidity}%
                  </div>
                  <p className="text-xs">Surrounding Humidity</p>
                </div>
                <div className="w-1/3">
                  <div className="text-4xl">
                    {dashData.latest_entry.surroundingTemp}°C
                  </div>
                  <p className="text-xs">Surrounding Temprature</p>
                </div>
              </div>
              <div className="text-3xl">
                Month Average COP {dashData.monthlyAvgCOP?.toFixed(2)}
              </div>
              <div className="text-3xl">
                Month Average Rating {catagory(dashData.monthlyAvgCOP || 0)}
              </div>
            </div>
            <div className="w-1/3 flex flex-col ">
              <h1 className="text-2xl">Weekly Avg COP</h1>
              <hr />
              {Object.entries(dashData.week).map(
                ([dateString, value], index) => {
                  const date = new Date(dateString);
                  const sevenDaysAgo = subDays(new Date(), 7);
                  const lastWeekDate = format(sevenDaysAgo, "dd/MM");
                  const formattedDate = format(date, "dd/MM");
                  const formatedVal = value.toFixed(2);
                  const bgColor = getBackgroundColor(index);
                  return (
                    <div
                      key={dateString}
                      className="m-2 py-3 rounded-xl flex justify-around text-xl overflow-auto "
                      style={{ backgroundColor: bgColor }}
                    >
                      <span className="font-light">
                        {formattedDate}-{lastWeekDate}
                      </span>
                      {formatedVal}
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div
            className={`className="h-full w-1/3 rounded-xl border-2 bg-black/5 flex flex-col p-6 items-center `}
          >
            <div className="flex justify-center items-center flex-col gap-1">
              <h1 className="font-bold text-5xl">Latest Rating</h1>
              <svg
                width={size}
                height={size / 2}
                viewBox={`0 0 ${size} ${size / 2}`}
              >
                <path
                  d={`M ${strokeWidth / 2}, ${size / 2} 
             A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
                  fill="none"
                  stroke="lightgray"
                  strokeWidth={strokeWidth}
                />
                <path
                  d={`M ${strokeWidth / 2}, ${size / 2} 
             A ${radius},${radius} 0 0,1 ${size - strokeWidth / 2},${size / 2}`}
                  fill="none"
                  stroke={colors[segmentIndex]}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="square"
                  className="transition-stroke duration-300"
                />
                <text
                  x="50%"
                  y="90%"
                  dominantBaseline="middle"
                  textAnchor="middle"
                  className="text-6xl font-bold"
                >
                  {catagory(dashData.latest_entry.Relative_COP || 0)}
                </text>
              </svg>
              <p className="">Rating</p>
            </div>
            <div className="text-2xl">
              COP - {dashData.latest_entry.Relative_COP?.toFixed(2)}
            </div>
          </div>
        </div>
      )}
      <div className="h-full md:h-[42rem] [perspective:1000px] relative  flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my- 40">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default DeviceId;
