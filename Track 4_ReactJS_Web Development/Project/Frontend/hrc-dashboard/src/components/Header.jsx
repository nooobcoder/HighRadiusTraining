import * as Mantine from '@mantine/core';
import React from 'react';
import AbcLogo from '../assets/AbcLogo.png';
import HighradiusLogo from '../assets/HighradiusLogo.png';

function Header() {
  return (
    <div className="flex justify-between py-3 px-5 bg-lime-300 ">
      <img alt="left_company_logo" src={AbcLogo} className="h-8 hover:shadow-md md:h-10 lg:h-12" />
      <img
        alt="left_company_logo"
        src={HighradiusLogo}
        className="h-8 hover:shadow-md md:h-10 lg:h-12"
      />

      {/* <div className="invisible lg:visible" /> */}
      <Mantine.Badge className="bg-opacity-50">BETA</Mantine.Badge>
    </div>
  );
}
export default Header;
