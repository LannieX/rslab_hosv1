'use client'
import { UserInfo } from '@/types/api_type';
import { Card } from '@mui/material'
import { useEffect, useState } from 'react'

const formatThaiDate = (dateString?: string) => {
  if (!dateString) return "ไม่พบวันที่";

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear() + 543;

  return `${day}/${month}/${year}`;
};

const SettingPage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>();

   useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('userInfo');
    console.log('sessionStorage userInfo:',storedUserInfo)
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <div className='flex flex-col'>
      <div className="bg-[#FF8E96] w-full h-[60px] flex items-center justify-start rounded-[8px]">
        <p className="text-[24px] font-kanit text-gray-700 font-bold ml-10">
          Setting
        </p>
      </div>
      <Card className='flex flex-col w-full min-h-[750px] h-fit items-center justify-start mt-5'>
        <div className='text-[#FF8E96] text-[34px] font-bold'>Profile</div>
        <img
            src="/image/User.png"
            alt="logo"
            className="w-27 h-27 rounded-full object-cover"
          />
          <div className='text-[#FF8E96] text-[18px]'>
            {userInfo?.hn ?? '-'}
          </div>
          <div className='flex flex-row w-full justify-center gap-2 mt-5'>
            <div className='flex items-center justify-center w-[9%] h-[40px] border-[1px] border-[#FF8E96] rounded-[8px] '>
              <p className='text-black text-[16px]'>{userInfo?.pname}</p>
            </div>
            <div className='flex items-center justify-center w-[25%] h-[40px] border-[1px] border-[#FF8E96] rounded-[8px]'>
              <p className='text-black text-[16px]'>{userInfo?.fname}</p>
            </div>
            <div className='flex items-center justify-center w-[25%] h-[40px] border-[1px] border-[#FF8E96] rounded-[8px]'>
              <p className='text-black text-[16px]'>{userInfo?.lname}</p>
            </div>
          </div>
          <div className='flex flex-row w-full justify-center gap-2 mt-2'>
            <div className='flex items-center justify-center w-[59%] h-[40px] border-[1px] border-[#FF8E96] rounded-[8px]'>
              <p className='text-black text-[16px]'>{formatThaiDate(userInfo?.birthday ?? '-')}</p>
            </div>
          </div>
      </Card>
    </div>
  )
}

export default SettingPage