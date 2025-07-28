'use client';

import { useEffect, useState } from "react";
const PieChart = dynamic(() => import("../componants/circleChart"), { ssr: false });
const ApexAreaChart = dynamic(() => import("../componants/lineChart"), { ssr: false });

import { useMobileSize } from "../contexts/MobileSizeContext";
import { LabResultItem } from "@/types/api_type";
import { Divider } from "@mui/material";
import dynamic from "next/dynamic";

const HealthResultPage = () => {
  const [labData, setLabData] = useState<LabResultItem[]>([]);
  const mobileSize = useMobileSize();

  const [HDL, setHDL] = useState<number[]>([]);
  const [Cholesterol, setCholesterol] = useState<number[]>([]);
  const [LDL, setLDL] = useState<number[]>([]);
  const [HDLavg, setHDLavg] = useState<number>(0);
  const [Cholesterolavg, setCholesterolavg] = useState<number>(0);
  const [LDLavg, setLDLavg] = useState<number>(0);
  const [HDLDate, setHDLDate] = useState<string[]>([]);
  const [CholesterolDate, setCholesterolDate] = useState<string[]>([]);
  const [LDLDate, setLDLDate] = useState<string[]>([]);

  const average = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("labResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log("โหลด labResult จาก sessionStorage:", parsed);
        setLabData(parsed);
      } catch (error) {
        console.error("Error parsing labResult from sessionStorage:", error);
      }
    } else {
      console.log("ไม่พบ labResult ใน sessionStorage");
    }
  }, []);

  useEffect(() => {
    if (labData.length === 0) return;

    const extractValue = (text: string, key: string): number | null => {
      const regex = new RegExp(`${key}\\s*=?\\s*(\\d+(\\.\\d+)?)`, "i");
      const match = text.match(regex);
      if (match) {
        return Number(match[1]);
      }
      return null;
    };

    const hdlArr: number[] = [];
    const cholesterolArr: number[] = [];
    const ldlArr: number[] = [];

    const hdlDateArr: string[] = [];
    const cholesterolDateArr: string[] = [];
    const ldlDateArr: string[] = [];

    labData.forEach((item) => {
      if (!item.lab_result) return;

      const labResultStr = item.lab_result;
      const vstDate = item.vstdate;

      const hdl = extractValue(labResultStr, "HDL");
      if (hdl !== null) {
        hdlArr.push(hdl);
        hdlDateArr.push(vstDate);
      }

      const chol = extractValue(labResultStr, "Cholesterol");
      if (chol !== null) {
        cholesterolArr.push(chol);
        cholesterolDateArr.push(vstDate);
      }

      const ldl = extractValue(labResultStr, "LDL");
      if (ldl !== null) {
        ldlArr.push(ldl);
        ldlDateArr.push(vstDate);
      }
    });

    setHDL(hdlArr);
    setCholesterol(cholesterolArr);
    setLDL(ldlArr);

    setHDLDate(hdlDateArr);
    setCholesterolDate(cholesterolDateArr);
    setLDLDate(ldlDateArr);

    const avgHDL = average(hdlArr);
    const avgChol = average(cholesterolArr);
    const avgLDL = average(ldlArr);

    setHDLavg(avgHDL);
    setCholesterolavg(avgChol);
    setLDLavg(avgLDL);
  }, [labData]);

  return (
    <div className="flex flex-col gap-1">
      <div className="bg-[#FF8E96] w-full h-[60px] flex items-center justify-start rounded-[8px]">
        <p className="text-[24px] font-kanit text-gray-700 font-bold ml-10">
          ผลสุขภาพ
        </p>
      </div>
      <div className="flex flex-col mt-5 w-full">
        <div>
          <p className="text-black font-kanit text-[16px] text-right w-full">
            ผลแล็บ
          </p>
          <div className="flex w-full h-[3px]">
            <div className="w-[60%] bg-gray-300" />
            <div className="w-[40%] bg-black" />
          </div>
        </div>
        <div
          className={`flex w-full ${
            mobileSize ? "flex-col items-center mt-5" : "flex-row p-7"
          }`}
        >
          <div
            className={`flex flex-1 flex-col justify-center items-center ${
              mobileSize ? "mb-7" : ""
            }`}
          >
            <p className="text-[14px] text-gray-500 mb-2">HDL</p>
            <PieChart value={HDLavg} limit={80} color="#83e3b3" />
          </div>

          <div
            className={`flex flex-1 flex-col justify-center items-center ${
              mobileSize ? "mb-7" : ""
            }`}
          >
            <p className="text-[14px] text-gray-500 mb-2">Cholesterol</p>
            <PieChart value={Cholesterolavg} limit={250} color="#ff5e69" />
          </div>

          <div
            className={`flex flex-1 flex-col justify-center items-center ${
              mobileSize ? "mb-5" : ""
            }`}
          >
            <p className="text-[14px] text-gray-500 mb-2">LDL</p>
            <PieChart value={LDLavg} limit={190} color="#6268fe" />
          </div>
        </div>
        <div className="mt-10">
          <p className="text-black font-kanit text-[16px] text-right w-full">
            เปรียบเทียบผลแล็บ
          </p>
          <div className="flex w-full h-[3px]">
            <div className="w-[60%] bg-gray-300" />
            <div className="w-[40%] bg-black" />
          </div>
        </div>
        <div className="w-full mt-5 overflow-x-auto">
          <div className="min-w-[700px] flex flex-col justify-center items-center gap-5">
            <ApexAreaChart
              label="HDL"
              data={HDL}
              dates={HDLDate}
              color="#83e3b3"
            />
            <p className="text-2xl text-black mb-3">HDL</p>
          </div>
        </div>
        <Divider className="bg-[#FF8E96]" />

        <div className="w-full mt-5 overflow-x-auto">
          <div className="min-w-[700px] flex flex-col justify-center items-center gap-5">
            <ApexAreaChart
              label="Cholesterol"
              data={Cholesterol}
              dates={CholesterolDate}
              color="#ff5e69"
            />
            <p className="text-2xl text-black mb-3">Cholesterol</p>
          </div>
        </div>
        <Divider className="bg-[#FF8E96]" />

        <div className="w-full mt-5 overflow-x-auto">
          <div className="min-w-[700px] flex flex-col justify-center items-center gap-5 text-2xl text-black">
            <ApexAreaChart
              label="LDL"
              data={LDL}
              dates={LDLDate}
              color="#6268fe"
            />
            <p className="text-2xl text-black mb-3">LDL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthResultPage;
