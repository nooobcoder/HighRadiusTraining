import React from 'react';
import AbcLogo from '../assets/AbcLogo.png';
import HighradiusLogo from '../assets/HighradiusLogo.png';

function Header() {
  return (
    <div className="flex  justify-between px-5 py-3 ">
      <img
        alt="left_company_logo"
        src={AbcLogo}
        className="hover:shadow-md h-12"
      />
      <img
        alt="left_company_logo"
        src={HighradiusLogo}
        className="hover:shadow-md h-12"
      />

      <div>2</div>
    </div>
  );
}
export default Header;
