'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  ChartColumnBigIcon,
  HeartIcon,
  HomeIcon,
  SettingsIcon,
  ShoppingBasket,
  SquareUserRound,
} from 'lucide-react';
import { Button } from '@mui/material';
import { UserInfo } from '@/types/api_type';
import { deleteCookie } from 'cookies-next';

const menuItems = [
  { id: 1, name: 'Home', href: '/', icon: <HomeIcon /> },
  { id: 2, name: 'ผลสุขภาพ', href: '/healthResultPage', icon: <ChartColumnBigIcon /> },
  { id: 3, name: 'ข้อมูลเชิงลึก', href: '/allResultPage', icon: <ChartColumnBigIcon /> },
  { id: 4, name: 'ผลการรักษา', href: '/treatmentPage', icon: <SquareUserRound /> },
  { id: 5, name: 'การแพ้ยา', href: '/allergymedPage', icon: <HeartIcon /> },
  { id: 6, name: 'การแพ้อาหาร', href: '/foodallergyPage', icon: <ShoppingBasket /> },
  { id: 7, name: 'Setting', href: '/settingPage', icon: <SettingsIcon /> },
];

const Sidebar = () => {

  const router = useRouter()
  const pathname = usePathname();

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const handleLogout = () => {
    localStorage.removeItem('token')
    deleteCookie('token');

    router.replace('/loginPage')
  }

 useEffect(() => {
    const storedUserInfo = sessionStorage.getItem('userInfo');
    console.log('sessionStorage userInfo:',storedUserInfo)
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  return (
    <aside className="w-64 h-screen bg-white border-r shadow-md p-4 flex flex-col justify-between">
      <div>
        <div className="flex flex-col justify-center items-center gap-2 mb-5 p-3">
          <img
            src="/image/User.png"
            alt="logo"
            className="w-27 h-27 rounded-full object-cover"
          />
          <p className="text-[18px] text-black font-normal mt-3">{userInfo?.fname} {userInfo?.lname}</p>
          <p className="text-[14px] text-black font-light">{userInfo?.hn}</p>
        </div>
        <nav className="flex flex-col space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.id} href={item.href}>
                <div
                  className={`flex flex-row gap-5 items-center p-3 rounded-md cursor-pointer transition
                    ${
                      isActive
                        ? 'bg-[#f19192] text-white'
                        : 'text-gray-700 hover:bg-[#ffd3d39f] hover:text-gray-700'
                    }`}
                >
                  {item.icon}
                  {item.name}
                </div>
              </Link>
            );
          })}
          <div className='flex justify-center mt-5'>
            <Button variant="outlined" color='error' sx={{ fontFamily: '"Kanit", sans-serif' }} onClick={handleLogout}>ออกจากระบบ</Button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
