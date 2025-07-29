"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { getLab } from "@/service/api";
import React from "react";
import { LabResultResponse } from "@/types/api_type";
import { getLinkPreview } from "link-preview-js";
import { useMobileSize } from "../contexts/MobileSizeContext";

const HomePage = () => {
  const mobileSize = useMobileSize();

  getLinkPreview("https://www.thaihealth.or.th/rsv-...")
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

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
    <div className="flex flex-col h-fit w-full">
      <div className="flex items-center overflow-hidden whitespace-nowrap min-h-[60px] bg-gray-200 p-3 mb-3 border-b-2 border-b-gray-400 rounded-2xl">
        <div
          className="inline-block text-green-600 font-light text-[18px] font-kanit"
          style={{
            animation: "marquee 50s linear infinite",
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
      <div
        className={
          mobileSize
            ? "w-full flex flex-col gap-10 h-fit justify-center items-center"
            : "w-full flex flex-row gap-10 mt-10 h-fit"
        }
      >
        <div className={mobileSize ? "w-full" : "w-[50%]"}>
          <img src="/image/b.jpg" alt="logo" className="rounded-2xl" />
        </div>
        <div
          className={
            mobileSize
              ? "flex flex-col justify-center items-center w-[90%] p-2"
              : "w-[50%] p-5"
          }
        >
          <img src="/image/h2.png" />
          <div className="text-[#f19192] text-[52px] font-bold">
            Health Care{" "}
          </div>
          <p className="text-black">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi{" "}
          </p>
        </div>
      </div>
      <div
        className={
          mobileSize
            ? "flex flex-col items-center justify-center gap-5 w-full mt-10 pb-10"
            : "flex flex-row gap-5 w-full mt-10 overflow-x-auto whitespace-nowrap mb-10"
        }
      >
        <div
          className={
            mobileSize ? "flex justify-center w-full" : "min-w-[300px]"
          }
        >
          <a
            href="https://www.thaihealth.or.th/rsv-%e0%b8%a3%e0%b8%b0%e0%b8%9a%e0%b8%b2%e0%b8%94%e0%b8%a4%e0%b8%94%e0%b8%b9%e0%b8%9d%e0%b8%99-%e0%b8%9b%e0%b9%88%e0%b8%a7%e0%b8%a2%e0%b9%81%e0%b8%a5%e0%b9%89%e0%b8%a7%e0%b8%81%e0%b8%a7%e0%b9%88/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/image/news1.png"
              alt="RSV ข่าวสุขภาพ"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                RSV ระบาดฤดูฝน ป่วยแล้วกว่า 2 หมื่นราย!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                กรมควบคุมโรคเตือนประชาชนระวังโรค RSV ที่มากับหน้าฝน
                โดยเฉพาะเด็กเล็ก
              </p>
              <span className="mt-3 inline-block text-blue-500 hover:underline">
                อ่านต่อ...
              </span>
            </div>
          </a>
        </div>
        <div
          className={
            mobileSize
              ? "flex justify-center w-full"
              : "min-w-[300px] bg-white rounded-xl shadow-md"
          }
        >
          <a
            href="https://www.thaihealth.or.th/%e0%b8%a3%e0%b8%b0%e0%b8%a7%e0%b8%b1%e0%b8%87-%e0%b9%84%e0%b8%a7%e0%b8%a3%e0%b8%b1%e0%b8%aa%e0%b8%8b%e0%b8%b4%e0%b8%81%e0%b8%b2%e0%b8%81%e0%b8%a5%e0%b8%b1%e0%b8%9a%e0%b8%a1%e0%b8%b2-%e0%b9%80/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/image/news2.png"
              alt="ไวรัสซิกา ข่าวสุขภาพ"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                ระวัง ไวรัสซิกากลับมา! เผยไทยพบผู้ป่วยแล้ว 7 ราย
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                กรมควบคุมโรค เตือนประชาชนระวังการกลับมาของไวรัสซิกา
                โดยเฉพาะหญิงตั้งครรภ์
              </p>
              <span className="mt-3 inline-block text-blue-500 hover:underline">
                อ่านต่อ...
              </span>
            </div>
          </a>
        </div>
        <div
          className={
            mobileSize
              ? "flex justify-center w-full"
              : "min-w-[300px] bg-white rounded-xl shadow-md"
          }
        >
          <a
            href="https://www.thaihealth.or.th/%e0%b9%80%e0%b8%95%e0%b8%b7%e0%b8%ad%e0%b8%99-%e0%b9%80%e0%b8%88%e0%b9%87%e0%b8%9a%e0%b8%84%e0%b8%ad%e0%b9%84%e0%b8%a1%e0%b9%88%e0%b8%ab%e0%b8%b2%e0%b8%a2%e0%b8%ab%e0%b8%a5%e0%b8%b1%e0%b8%87/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/image/news3.png"
              alt="เจ็บคอไม่หายหลังโควิด"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                เตือน! เจ็บคอไม่หายหลังหายโควิด อาจเป็นสัญญาณเตือนร้าย
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                กรมการแพทย์ เตือนผู้ป่วยหลังติดเชื้อโควิด หากเจ็บคอเรื้อรัง
                เสี่ยงโรคเนื้อร้ายในลำคอ
              </p>
              <span className="mt-3 inline-block text-blue-500 hover:underline">
                อ่านต่อ...
              </span>
            </div>
          </a>
        </div>
        <div
          className={
            mobileSize
              ? "flex justify-center w-full"
              : "min-w-[300px] bg-white rounded-xl shadow-md"
          }
        >
          <a
            href="https://www.thaihealth.or.th/%e0%b9%81%e0%b8%9c%e0%b8%a5%e0%b8%81%e0%b8%a3%e0%b8%b0%e0%b8%88%e0%b8%81%e0%b8%95%e0%b8%b2-%e0%b9%80%e0%b8%aa%e0%b8%b5%e0%b9%88%e0%b8%a2%e0%b8%87%e0%b8%97%e0%b8%b3%e0%b8%95%e0%b8%b2%e0%b8%9a%e0%b8%ad/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/image/news4.png"
              alt="แผลกระจกตา เสี่ยงทำตาบอด"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                แผลกระจกตา เสี่ยงทำตาบอด
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                หมอตาเตือน แผลที่กระจกตาจากการติดเชื้อหรือได้รับอุบัติเหตุ
                อาจทำให้ตาบอดได้หากไม่รีบรักษา
              </p>
              <span className="mt-3 inline-block text-blue-500 hover:underline">
                อ่านต่อ...
              </span>
            </div>
          </a>
        </div>
        <div
          className={
            mobileSize
              ? "flex justify-center w-full"
              : "min-w-[300px] bg-white rounded-xl shadow-md"
          }
        >
          <a
            href="https://www.thaihealth.or.th/%e0%b9%80%e0%b8%ad%e0%b8%8a%e0%b9%84%e0%b8%ad%e0%b8%a7%e0%b8%b5-%e0%b8%95%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b9%80%e0%b8%a3%e0%b9%87%e0%b8%a7-%e0%b8%a3%e0%b8%b9%e0%b9%89%e0%b8%97%e0%b8%b1%e0%b8%99/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/image/news5.png"
              alt="เอชไอวี ตรวจเร็ว รู้ทัน รักษาได้"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                เอชไอวี ตรวจเร็ว รู้ทัน รักษาได้
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                กรมควบคุมโรคเน้นย้ำความสำคัญของการตรวจเชื้อเอชไอวีแต่เนิ่น ๆ
                เพื่อเข้าสู่กระบวนการรักษาอย่างรวดเร็ว
              </p>
              <span className="mt-3 inline-block text-blue-500 hover:underline">
                อ่านต่อ...
              </span>
            </div>
          </a>
        </div>
        <div
          className={
            mobileSize
              ? "flex justify-center w-full"
              : "min-w-[300px] bg-white rounded-xl shadow-md"
          }
        >
          <a
            href="https://www.thaihealth.or.th/%e0%b9%80%e0%b8%95%e0%b8%b7%e0%b8%ad%e0%b8%99%e0%b8%9c%e0%b8%b9%e0%b9%89%e0%b8%ab%e0%b8%8d%e0%b8%b4%e0%b8%87-%e0%b8%ab%e0%b8%a1%e0%b8%ad%e0%b9%80%e0%b8%9c%e0%b8%a2-2-%e0%b8%a1%e0%b8%b0%e0%b9%80/"
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-sm bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src="/image/news6.png"
              alt="เตือนผู้หญิง หมอเผย 2 มะเร็งที่ผู้หญิงควรระวัง"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                เตือนผู้หญิง หมอเผย 2 มะเร็งที่ผู้หญิงควรระวัง
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                แพทย์เตือนผู้หญิงเกี่ยวกับ 2
                มะเร็งสำคัญที่ควรระวังและตรวจสุขภาพอย่างสม่ำเสมอเพื่อการป้องกันและรักษาที่ทันท่วงที
              </p>
              <span className="mt-3 inline-block text-blue-500 hover:underline">
                อ่านต่อ...
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
