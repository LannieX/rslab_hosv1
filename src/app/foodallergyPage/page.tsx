import { Card } from '@mui/material'
import React from 'react'

const foodallergyPage = () => {
  return (
    <div className='flex flex-col'>
      <div className="bg-[#FF8E96] w-full h-[60px] flex items-center justify-start rounded-[8px]">
        <p className="text-[24px] font-kanit text-gray-700 font-bold ml-10">
          การแพ้อาหาร
        </p>
      </div>
      <Card className='flex w-full min-h-[750px] h-fit items-center justify-center mt-5'>
        <p className='text-black text-[16px]'>ไม่พบข้อมูล</p>
      </Card>
    </div>
  )
}

export default foodallergyPage