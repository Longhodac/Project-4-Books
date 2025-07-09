import React from 'react';

const BanList = ({ banList, onAddToBanList }) => {
  return (
    <div className="ban-list">
      <h3 className="sidebar-title">
        <span className="ban-icon">🚫</span>
        Ban List ({banList.length})
      </h3>
      
      {banList.length === 0 ? (
        <p className="empty-message">
          No banned items yet. Click on book attributes to ban them!
        </p>
      ) : (
        <div className="ban-items">
          {banList.map((item, index) => (
            <div key={index} className="ban-item">
              <div className="ban-item-info">
                <span className="ban-item-type">{item.type}</span>
                <p className="ban-item-value">{item.value}</p>
              </div>
              <button
                onClick={() => onAddToBanList(item.type, item.value)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BanList;