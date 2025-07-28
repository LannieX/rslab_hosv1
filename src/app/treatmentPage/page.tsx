"use client";

import { LabResultItem } from "@/types/api_type";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";

const TreatmentPage = () => {
  const [labData, setLabData] = useState<LabResultItem[]>([]);
  const [filteredLabData, setFilteredLabData] = useState<LabResultItem | null>(
    null
  );

  const [DateList, setDateList] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedDate(event.target.value as string);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("labResult");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log(
          "treatmentPage: โหลด labResult จาก sessionStorage:",
          parsed
        );
        setLabData(parsed);

        const uniqueDates: string[] = Array.from(
          new Set(
            parsed
              .map((item: LabResultItem) => item.vstdate)
              .filter((v: unknown): v is string => Boolean(v))
          )
        );

        const formattedDates = uniqueDates.map((dateStr: string) => {
          const date = new Date(dateStr);
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = date.getFullYear() + 543;
          return `${day}/${month}/${year}`;
        });

        setDateList(formattedDates);
      } catch (error) {
        console.error("Error parsing labResult from sessionStorage:", error);
      }
    } else {
      console.log("ไม่พบ labResult ใน sessionStorage");
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const [day, month, year] = selectedDate.split("/");
      const formattedDate = `${Number(year) - 543}-${month}-${day}`;

      const matched =
        labData.find((item) => item.vstdate === formattedDate) || null;
      setFilteredLabData(matched);
    } else {
      setFilteredLabData(null);
    }
  }, [selectedDate, labData]);

  return (
    <div className="flex flex-col gap-1">
      <div className="bg-[#FF8E96] w-full h-[60px] flex items-center justify-start rounded-[8px]">
        <p className="text-[24px] font-kanit text-gray-700 font-bold ml-10">
          ผลการรักษา
        </p>
      </div>
      <div className="flex justify-start items-center gap-3 w-full mt-5">
        <div className="text-black font-kanit">วันที่มารับบริการ : </div>
        <div className="flex w-[300px]">
          <FormControl fullWidth>
            <InputLabel>เลือก</InputLabel>
            <Select
              value={selectedDate}
              label="วันที่มารับบริการ"
              onChange={handleChange}
            >
              {DateList.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Card className="flex flex-col mt-5 min-h-[700px] h-fit p-5">
        {selectedDate ? (
          <div className="flex flex-col gap-3">
            <p className="text-black text-[17px]">ผลวินิฉัย : <span className="text-gray-600 text-[16px] font-light">{filteredLabData?.diagnosis ?? "ไม่มีข้อมูล"}</span></p>
            <div className="w-full border-t border-dashed border-gray-400 my-4 mt-2 mb-2" />
            <p className="text-black text-[17px]">รายการยา : <span className="text-gray-600 text-[16px] font-light">{filteredLabData?.drug_list ?? "ไม่มีข้อมูล"}</span></p>
            <div className="w-full border-t border-dashed border-gray-400 my-4  mt-2 mb-2" />
            <p className="text-black text-[17px]">
              รายการแล็บ :{" "}
              <span className="text-gray-600 text-[16px] font-light">
                {filteredLabData?.lab_result
                  ? filteredLabData.lab_result
                      .split(",")
                      .map((result, idx) => <div key={idx}>{result.trim()}</div>)
                  : "ไม่พบข้อมูล"}
              </span>
            </p>
          </div>
        ) : (
          <div className="flex w-full h-[650px] justify-center items-center">
            <p className="text-black text-[16px]">โปรดเลือกวันที่มารับบริการ</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TreatmentPage;
