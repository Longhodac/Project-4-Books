import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title">
        <span className="book-icon">📚</span>
        Book Discovery - Veni Vici!
      </h1>
      <p className="header-subtitle">
        Discover amazing books! Click on attributes to ban them from future results.
      </p>
    </div>
  );
};

export default Header;