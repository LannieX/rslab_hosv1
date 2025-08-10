"use client";

import { useEffect, useState } from "react";
const PieChart = dynamic(() => import("../componants/circleChart"), {
  ssr: false,
});
const ApexAreaChart = dynamic(() => import("../componants/lineChart"), {
  ssr: false,
});

import { useMobileSize } from "../contexts/MobileSizeContext";
import { LabResultItem } from "@/types/api_type";
import { Divider } from "@mui/material";
import dynamic from "next/dynamic";

type AdviceLevel = "normal" | "warning" | "danger";

function getHDLAdvice(
  HDLavg: number
): { message: string; level: AdviceLevel } {
  if (HDLavg < 0) {
    return {
      message: "ค่าผิดปกติ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      level: "danger",
    };
  }

  if (HDLavg < 35) {
    return {
      message:
        "ระดับ HDL ต่ำ เสี่ยงต่อโรคหัวใจ ควรออกกำลังกายเพิ่ม รับประทานอาหารดี เช่น ปลา ถั่ว และน้ำมันมะกอก และหลีกเลี่ยงบุหรี่",
      level: "danger",
    };
  }

  if (HDLavg <= 60) {
    return {
      message:
        "ระดับ HDL ปกติ ควรรักษาวิถีชีวิตสุขภาพดีต่อไป เช่น ออกกำลังกายสม่ำเสมอ และรับประทานอาหารสมดุล",
      level: "normal",
    };
  }

  return {
    message:
      "ระดับ HDL สูงดีมาก ช่วยลดความเสี่ยงโรคหัวใจ รักษาวิถีชีวิตสุขภาพดีต่อไป",
    level: "normal",
  };
}


function getCholesterolAdvice(totalCholesterol: number): {
  message: string;
  level: AdviceLevel;
} {
  if (totalCholesterol < 0) {
    return {
      message: "ค่าผิดปกติ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      level: "danger",
    };
  }

  if (totalCholesterol <= 200) {
    return {
      message:
        "ระดับคอเลสเตอรอลอยู่ในเกณฑ์ปกติ รักษาพฤติกรรมสุขภาพดีต่อไป เช่น ออกกำลังกายและรับประทานอาหารที่มีประโยชน์",
      level: "normal",
    };
  }

  if (totalCholesterol > 200) {
    return {
      message:
        "ระดับคอเลสเตอรอลค่อนข้างสูง ควรควบคุมอาหาร หลีกเลี่ยงของมัน ของทอด ออกกำลังกาย และตรวจสุขภาพสม่ำเสมอ",
      level: "warning",
    };
  }

  return {
    message:
      "ระดับคอเลสเตอรอลสูงมาก เสี่ยงต่อโรคหลอดเลือดหัวใจ ควรปรึกษาแพทย์และปรับเปลี่ยนพฤติกรรมอย่างเร่งด่วน",
    level: "danger",
  };
}

function getLDLRecommendation(LDLavg: number): {
  message: string;
  level: AdviceLevel;
} {
  if (LDLavg < 0) {
    return {
      message: "ค่าผิดปกติ กรุณาตรวจสอบข้อมูลอีกครั้ง",
      level: "danger",
    };
  }

  if (LDLavg < 100) {
    return {
      message: "ค่าดีมาก ควรรักษาระดับนี้ไว้",
      level: "normal",
    };
  } else if (LDLavg < 160) {
    return {
      message: "ค่าปกติ ควรควบคุมอาหารและออกกำลังกายอย่างสม่ำเสมอ",
      level: "normal",
    };
  } else if (LDLavg > 160) {
    return {
      message: "ค่อนข้างสูง ควรลดอาหารไขมันอิ่มตัว และออกกำลังกายมากขึ้น",
      level: "warning",
    };
  } else if (LDLavg > 190) {
    return {
      message: "สูง ควรพบแพทย์ และควบคุมอาหารอย่างเข้มงวด",
      level: "danger",
    };
  } else {
    return {
      message: "สูงมาก มีความเสี่ยงต่อโรคหัวใจ ควรปรึกษาแพทย์โดยด่วน",
      level: "danger",
    };
  }
}

const HealthResultPage = () => {
  const [labData, setLabData] = useState<LabResultItem[]>([]);
  const [HDL, setHDL] = useState<number[]>([]);
  // const HDLMax = Math.max(...HDL);
  const [Cholesterol, setCholesterol] = useState<number[]>([]);
  // const CholesterolMin = Math.min(...Cholesterol);
  const [LDL, setLDL] = useState<number[]>([]);
  // const LDLMin = Math.min(...LDL);
  const [HDLavg, setHDLavg] = useState<number>(0);
  const [Cholesterolavg, setCholesterolavg] = useState<number>(0);
  const [LDLavg, setLDLavg] = useState<number>(0);
  const [HDLDate, setHDLDate] = useState<string[]>([]);
  const [CholesterolDate, setCholesterolDate] = useState<string[]>([]);
  const [LDLDate, setLDLDate] = useState<string[]>([]);

  const rcmHDL = getHDLAdvice(HDLavg);
  // const rcmHDLLine = getHDLAdvice(HDLMax);
  const rcmCholesterol = getCholesterolAdvice(Cholesterolavg);
  // const rcmCholesterolLine = getCholesterolAdvice(CholesterolMin);
  const rcmLDL = getLDLRecommendation(LDLavg);
  // const rcmLDLLine = getLDLRecommendation(LDLMin);
  const mobileSize = useMobileSize();

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

    console.log('hdlArr',hdlArr)
    console.log('cholesterolArr',cholesterolArr)
    console.log('ldlArr',ldlArr)
    setHDL(hdlArr);
    setCholesterol(cholesterolArr);
    setLDL(ldlArr);


    setHDLDate(hdlDateArr);
    setCholesterolDate(cholesterolDateArr);
    setLDLDate(ldlDateArr);

    const firstHDL = hdlArr.length > 0 ? hdlArr[0] : 0;
    const firstChol = cholesterolArr.length > 0 ? cholesterolArr[0] : 0;
    const firstLDL = ldlArr.length > 0 ? ldlArr[0] : 0;

    setHDLavg(firstHDL);
    setCholesterolavg(firstChol);
    setLDLavg(firstLDL);
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
          className={`flex w-full gap-7 ${
            mobileSize ? "flex-col items-center mt-5" : "flex-row p-7"
          }`}
        >
          <div
            className={`flex flex-1 flex-col justify-start items-center ${
              mobileSize ? "mb-7 " : ""
            }`}
          >
            <p className="text-[16px] text-black mb-1">HDL</p>
            <span className="text-[14px] text-gray-500 mb-3">
              ค่า HDL ปกติ 35-60 mg/dl
            </span>

            <PieChart
              value={HDLavg}
              limit={80}
              color={
                rcmHDL.level === "normal"
                  ? "#16a34a"
                  : rcmHDL.level === "warning"
                  ? "#f97316"
                  : "#dc2626"
              }
            />
            <p className="mt-5 text-[14px] text-black">
              คำแนะนำ :{" "}
              <span
                className={
                  rcmHDL.level === "normal"
                    ? "text-green-600"
                    : rcmHDL.level === "warning"
                    ? "text-orange-500"
                    : "text-red-600"
                }
              >
                {rcmHDL.message ?? "-"}
              </span>
            </p>
          </div>
          <div
            className={`flex flex-1 flex-col justify-start items-center ${
              mobileSize ? "mb-7" : ""
            }`}
          >
            <p className="text-[16px] text-black mb-1">Cholesterol</p>
            <span className="text-[14px] text-gray-500 mb-3">
              ค่า Cholesterol ปกติ 150-200 mg%
            </span>
            <PieChart
              value={Cholesterolavg}
              limit={250}
              color={
                rcmCholesterol.level === "normal"
                  ? "#16a34a"
                  : rcmCholesterol.level === "warning"
                  ? "#f97316"
                  : "#dc2626"
              }
            />
            <p className="mt-5 text-[14px] text-black">
              คำแนะนำ :{" "}
              <span
                className={
                  rcmCholesterol.level === "normal"
                    ? "text-green-600"
                    : rcmCholesterol.level === "warning"
                    ? "text-orange-500"
                    : "text-red-600"
                }
              >
                {rcmCholesterol.message ?? "-"}
              </span>
            </p>
          </div>
          <div
            className={`flex flex-1 flex-col justify-start items-center ${
              mobileSize ? "mb-5" : ""
            }`}
          >
            <p className="text-[16px] text-black mb-1">LDL</p>
            <span className="text-[14px] text-gray-500 mb-3">
              ค่า LDL ปกติ 135.0-159.0 mg/dl
            </span>

            <PieChart
              value={LDLavg}
              limit={190}
              color={
                rcmLDL.level === "normal"
                  ? "#16a34a"
                  : rcmLDL.level === "warning"
                  ? "#f97316"
                  : "#dc2626"
              }
            />
            <p className="mt-5 text-[14px] text-black">
              คำแนะนำ :{" "}
              <span
                className={` ${
                  rcmLDL.level === "normal"
                    ? "text-green-600"
                    : rcmLDL.level === "warning"
                    ? "text-orange-500"
                    : "text-red-600"
                }`}
              >
                {rcmLDL.message ?? "-"}
              </span>
            </p>
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
              color={
                rcmHDL.level === "normal"
                  ? "#16a34a"
                  : rcmHDL.level === "warning"
                  ? "#f97316"
                  : "#dc2626"
              }
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
              color={
                rcmCholesterol.level === "normal"
                  ? "#16a34a"
                  : rcmCholesterol.level === "warning"
                  ? "#f97316"
                  : "#dc2626"
              }
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
              color={
                rcmLDL.level === "normal"
                  ? "#16a34a"
                  : rcmLDL.level === "warning"
                  ? "#f97316"
                  : "#dc2626"
              }
            />
            <p className="text-2xl text-black mb-3">LDL</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthResultPage;
