import React from 'react';
import AttributeTag from './AttributeTag';

const BookDisplay = ({ 
  currentBook, 
  loading, 
  error, 
  onFetchBook, 
  onAddToBanList, 
  isBanned 
}) => {
  return (
    <div className="book-display">
      <div className="book-display-header">
        <h2 className="section-title">Current Discovery</h2>
        <button
          onClick={onFetchBook}
          disabled={loading}
          className={`discover-btn ${loading ? 'loading' : ''}`}
        >
          <span className={`refresh-icon ${loading ? 'spinning' : ''}`}>🔄</span>
          {loading ? 'Discovering...' : 'Discover New Book'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {currentBook && (
        <div className="book-content">
          <div className="book-image-container">
            <img
              src={currentBook.image}
              alt={currentBook.title}
              className="book-image"
            />
          </div>
          
          <div className="book-details">
            <h3 className="book-title">{currentBook.title}</h3>
            
            <div className="book-attributes">
              <div className="attribute-group">
                <span className="attribute-label">Authors:</span>
                <div className="attribute-tags">
                  {currentBook.authors.map((author, index) => (
                    <AttributeTag
                      key={index}
                      type="author"
                      value={author}
                      isBanned={isBanned('author', author)}
                      onClick={() => onAddToBanList('author', author)}
                    />
                  ))}
                </div>
              </div>

              <div className="attribute-group">
                <span className="attribute-label">Categories:</span>
                <div className="attribute-tags">
                  {currentBook.categories.map((category, index) => (
                    <AttributeTag
                      key={index}
                      type="category"
                      value={category}
                      isBanned={isBanned('category', category)}
                      onClick={() => onAddToBanList('category', category)}
                    />
                  ))}
                </div>
              </div>

              <div className="attribute-group">
                <span className="attribute-label">Publisher:</span>
                <div className="attribute-tags">
                  <AttributeTag
                    type="publisher"
                    value={currentBook.publisher}
                    isBanned={isBanned('publisher', currentBook.publisher)}
                    onClick={() => onAddToBanList('publisher', currentBook.publisher)}
                  />
                </div>
              </div>

              <div className="attribute-group">
                <span className="attribute-label">Published:</span>
                <span className="attribute-value">{currentBook.publishedDate}</span>
              </div>

              <div className="attribute-group">
                <span className="attribute-label">Pages:</span>
                <span className="attribute-value">{currentBook.pageCount}</span>
              </div>

              <div className="attribute-group">
                <span className="attribute-label">Description:</span>
                <p className="book-description">
                  {currentBook.description.replace(/<[^>]*>/g, '')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDisplay;