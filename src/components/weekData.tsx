import { Pagination } from "@nextui-org/pagination";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const WeekData = ({ deviceId }: { deviceId: string }) => {
  const [coilDiffData, setCoilDiffData] = useState<any[]>([]);
  const [coilDiffLayout, setCoilDiffLayout] = useState<any>({});
  const [efficencyTimeData, setefficencyTimeData] = useState<any[]>([]);
  const [efficencyTimeLayout, setefficencyTimeLayout] = useState<any>({});
  const [indoorTempDiffData, setIndoorTempDiffData] = useState<any[]>([]);
  const [IndoorTempDiffLayout, setIndoorTempDiffLayout] = useState<any>({});
  const [outdoorTempDiffData, setOutdoorTempDiffData] = useState<any>({});
  const [outdoorTempDiffLayout, setOutdoorTempDiffLayout] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    axios
      .post("http://127.0.0.1:5000/graph/week", { id: deviceId })
      .then((response) => {
        try {
          const data = response.data;
          const coilDiff = JSON.parse(data.coilDiff);
          const efficencyTime = JSON.parse(data.efficencyTime);
          const indoorTempDiff = JSON.parse(data.indoorTempDiff);
          const outdoorTempDiff = JSON.parse(data.outdoorTempDiff);

          setCoilDiffData(coilDiff.data);
          setCoilDiffLayout(coilDiff.layout);
          setefficencyTimeData(efficencyTime.data);
          setefficencyTimeLayout(efficencyTime.layout);
          setIndoorTempDiffData(indoorTempDiff.data);
          setIndoorTempDiffLayout(indoorTempDiff.layout);
          setOutdoorTempDiffData(outdoorTempDiff.data);
          setOutdoorTempDiffLayout(outdoorTempDiff.layout);
          setLoading(false);
        } catch (err) {
          console.error("Failed to parse graph data:", err);
          setError("Failed to parse graph data.");
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch data from the server:", err);
        setError("Failed to fetch data from the server.");
        setLoading(false);
      });
  }, [deviceId]);
  return (
    <div className="bgbl">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="m-2">
          <div className=" ">
            {currentPage == 1 && (
              <div className="">
                <p className="text-medium">Temp Humidity Graph</p>
                <div className="rounded-lg overflow-hidden">
                  <Plot
                    data={coilDiffData}
                    layout={coilDiffLayout}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            )}
            {currentPage == 2 && (
              <div className="">
                <p className="text-medium">COP Time Graph</p>
                <div className="rounded-lg overflow-hidden">
                  <Plot
                    data={efficencyTimeData}
                    layout={efficencyTimeLayout}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            )}
            {currentPage == 3 && (
              <div className="">
                <p className="text-medium">COP Temp Graph</p>
                <div className="rounded-lg overflow-hidden">
                  <Plot
                    data={indoorTempDiffData}
                    layout={IndoorTempDiffLayout}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            )}
            {currentPage == 4 && (
              <div className="">
                <p className="text-medium">COP Temp Graph</p>
                <div className="rounded-lg overflow-hidden">
                  <Plot
                    data={outdoorTempDiffData}
                    layout={outdoorTempDiffLayout}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            )}
          </div>
          {/* <hr /> */}
          <div className="pt-4">
            <Pagination
              total={4}
              loop
              color="secondary"
              page={currentPage}
              showControls
              onChange={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekData;
