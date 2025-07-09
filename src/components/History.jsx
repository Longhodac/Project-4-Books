import React from 'react';

const History = ({ history }) => {
  return (
    <div className="history">
      <h3 className="sidebar-title">
        <span className="history-icon">📖</span>
        Discovery History ({history.length})
      </h3>
      
      {history.length === 0 ? (
        <p className="empty-message">No discoveries yet!</p>
      ) : (
        <div className="history-items">
          {history.map((book, index) => (
            <div key={index} className="history-item">
              <img
                src={book.image}
                alt={book.title}
                className="history-image"
              />
              <div className="history-details">
                <h4 className="history-title">{book.title}</h4>
                <p className="history-author">{book.authors[0]}</p>
                <p className="history-category">{book.categories[0]}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;