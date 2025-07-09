import React from 'react';

const AttributeTag = ({ type, value, isBanned, onClick }) => {
  const getTagClass = () => {
    if (isBanned) return 'attribute-tag banned';
    
    switch (type) {
      case 'author':
        return 'attribute-tag author';
      case 'category':
        return 'attribute-tag category';
      case 'publisher':
        return 'attribute-tag publisher';
      default:
        return 'attribute-tag';
    }
  };

  return (
    <button
      onClick={onClick}
      className={getTagClass()}
    >
      {value} {isBanned ? '✗' : ''}
    </button>
  );
};

export default AttributeTag;