import React from 'react';
import Background from 'assets/images/PetDog.png';
export default function AuthenticationLayout({ children }) {
  return (
    <div className='w-full h-screen flex justify-center items-center relative'>
      <div className='w-full h-full flex flex-col absolute top-0 left-0 z-[1]'>
        <img
          src={
            'https://t3.ftcdn.net/jpg/05/31/09/74/360_F_531097423_y1scBnLigyQpMNjLmleTWRh96WmULQo8.jpg'
          }
          className='w-full h-full'
          alt='Pet Dog'
        />
      </div>
      <div className='w-1/2 !h-fit bg-white/70 flex flex-col p-20 items-center z-[10000000000000] relative '>
        {children}
      </div>
    </div>
  );
}
