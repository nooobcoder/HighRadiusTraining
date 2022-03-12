import React from 'react';
import AbcLogo from '../assets/AbcLogo.png';
import HighradiusLogo from '../assets/HighradiusLogo.png';

function Header() {
  return (
    <div className="flex  justify-between px-5 py-3 bg-lime-300 ">
      <img
        alt="left_company_logo"
        src={AbcLogo}
        className="hover:shadow-md h-8 md:h-10 lg:h-12"
      />
      <img
        alt="left_company_logo"
        src={HighradiusLogo}
        className="hover:shadow-md h-8 md:h-10 lg:h-12"
      />

      <div className="invisible lg:visible" />
    </div>
  );
}
export default Header;
