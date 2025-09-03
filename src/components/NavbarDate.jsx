import React from 'react';

function NavbarDate() {
  const today = new Date();
  return (
    <span id="currentDate">{today.toDateString()}</span>
  );
}

export default NavbarDate;