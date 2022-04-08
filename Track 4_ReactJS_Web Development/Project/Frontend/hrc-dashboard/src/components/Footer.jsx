/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

function Footer() {
  return (
    <footer className="sticky bottom-0 p-3 mt-48 w-full bg-gray-800 rounded-t-lg shadow sm:text-xs md:flex md:justify-between md:items-center md:p-5">
      <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        © 2022{' '}
        <a
          href="https://highradius.com"
          target="_blank"
          rel="noreferrer noopener"
          className="hover:underline"
        >
          HighRadius Corporation™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6 ">
            About
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </a>
        </li>
        <li>
          <a href="#" className="mr-4 hover:underline md:mr-6">
            Licensing
          </a>
        </li>
        <li>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
