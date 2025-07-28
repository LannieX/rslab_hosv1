"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { getLab } from "@/service/api";
import React from "react";
import { LabResultResponse } from "@/types/api_type";

const HomePage = () => {

  useEffect(() => {
    const hn = JSON.parse(sessionStorage.getItem("userInfo") || "{}")?.hn;
    const token = Cookies.get("token");

    if (!hn || !token) return;

    const fetchLab = async () => {
      const labResult = (await getLab({ hn, token })) as LabResultResponse;
      console.log("labResultZZ", labResult);

      if (labResult.data && labResult.data.length > 0) {
        sessionStorage.setItem("labResult", JSON.stringify(labResult.data));
        console.log("✅ บันทึก labResult ไปที่ sessionStorage");
      } else {
        console.warn("❌ labResult.data is empty or undefined", labResult.data);
      }
    };

    fetchLab();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
<div className="flex items-center overflow-hidden whitespace-nowrap h-[60px] bg-gray-200 p-3 mb-3 border-b-2 border-b-gray-400 rounded-2xl">
  <div
    className="inline-block text-green-600 font-light text-[18px] font-kanit"
    style={{
      animation: "marquee 30s linear infinite",
      whiteSpace: "nowrap",
      display: "inline-block",
      transform: "translateX(100%)",
      willChange: "transform",
    }}
  >
    สุขภาพดีเริ่มต้นจากการดูแลตัวเองทุกวัน อย่าลืมรักและใส่ใจสุขภาพของคุณ
    เพราะร่างกายที่แข็งแรงคือของขวัญที่มีค่าที่สุดสำหรับชีวิตเรา
    การตรวจสุขภาพเป็นประจำคือการให้ความรักกับตัวเองอย่างแท้จริง
    กินอาหารที่ดี นอนหลับให้พอ
    และออกกำลังกายสม่ำเสมอเพื่อให้หัวใจและร่างกายยิ้มได้เสมอ
    อย่ารอให้ป่วยก่อนค่อยเริ่มดูแลสุขภาพ
    เพราะการดูแลตัวเองวันนี้คือการดูแลคนที่คุณรักในวันหน้า
  </div>

  <style jsx global>{`
    @keyframes marquee {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `}</style>
</div>



      <div className="flex flex-col gap-2">
        <img src="/image/ai.jpg" alt="logo" />
      </div>
    </div>
  );
};

export default HomePage;
