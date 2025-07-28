"use client";

import { LabResultItem } from "@/types/api_type";
import React, { useEffect, useState } from "react";

const formatThaiDate = (dateString?: string) => {
  if (!dateString) return "ไม่พบวันที่";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear() + 543;

  return `${day}/${month}/${year}`;
};

const AllResultPage = () => {
  const [labData, setLabData] = useState<LabResultItem[]>([]);

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

  return (
    <div className="w-full h-screen">
      <div className="bg-[#FF8E96] w-full h-[60px] flex items-center justify-start rounded-[8px]">
        <p className="text-[24px] font-kanit text-gray-700 font-bold ml-10">
          ข้อมูลเชิงลึก
        </p>
      </div>
      <div className="flex flex-col gap-5 mt-7 mb-7 pb-7">
        {labData.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-[8px] shadow-md">
            <p className="text-black font-kanit text-[16px] font-bold">
             เมื่อวันที่ <span>{formatThaiDate(item?.vstdate)}</span>{" "}
            </p>
            <p className="text-black font-kanit text-[16px] font-bold">
              ผลแล็บ:{" "}
              <span className="text-gray-500 font-light block">
                {item?.lab_result
                  ? item.lab_result
                      .split(",")
                      .map((result, idx) => (
                        <div key={idx}>{result.trim()}</div>
                      ))
                  : "ไม่พบข้อมูล"}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllResultPage;
