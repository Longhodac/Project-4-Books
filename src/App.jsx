import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookDisplay from './components/BookDisplay';
import BanList from './components/BanList';
import History from './components/History';
import './App.css';

const App = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [banList, setBanList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  // Random search terms to get diverse results
  const searchTerms = [
    'fiction', 'science', 'history', 'mystery', 'romance', 'fantasy', 'biography',
    'adventure', 'drama', 'comedy', 'philosophy', 'psychology', 'travel', 'cooking',
    'art', 'music', 'poetry', 'thriller', 'horror', 'classic', 'modern', 'contemporary'
  ];

  const fetchRandomBook = async () => {
    setLoading(true);
    setError('');
    
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      try {
        // Get random search term and random start index
        const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
        const randomStart = Math.floor(Math.random() * 100);
        
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${randomTerm}&startIndex=${randomStart}&maxResults=20`
        );
        
        if (!response.ok) {
          throw new Error('API request failed');
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          attempts++;
          continue;
        }
        
        // Filter out books that match ban list criteria
        const filteredBooks = data.items.filter(book => {
          const volumeInfo = book.volumeInfo;
          
          // Check if any banned attributes match this book
          return !banList.some(bannedItem => {
            switch (bannedItem.type) {
              case 'author':
                return volumeInfo.authors && volumeInfo.authors.includes(bannedItem.value);
              case 'category':
                return volumeInfo.categories && volumeInfo.categories.includes(bannedItem.value);
              case 'publisher':
                return volumeInfo.publisher === bannedItem.value;
              default:
                return false;
            }
          });
        });
        
        if (filteredBooks.length === 0) {
          attempts++;
          continue;
        }
        
        // Select random book from filtered results
        const randomBook = filteredBooks[Math.floor(Math.random() * filteredBooks.length)];
        
        // Ensure the book has required information
        if (randomBook.volumeInfo.title && 
            (randomBook.volumeInfo.imageLinks?.thumbnail || randomBook.volumeInfo.imageLinks?.smallThumbnail)) {
          
          const bookData = {
            id: randomBook.id,
            title: randomBook.volumeInfo.title,
            authors: randomBook.volumeInfo.authors || ['Unknown Author'],
            categories: randomBook.volumeInfo.categories || ['Uncategorized'],
            publisher: randomBook.volumeInfo.publisher || 'Unknown Publisher',
            publishedDate: randomBook.volumeInfo.publishedDate || 'Unknown Date',
            description: randomBook.volumeInfo.description || 'No description available',
            image: randomBook.volumeInfo.imageLinks?.thumbnail || 
                   randomBook.volumeInfo.imageLinks?.smallThumbnail ||
                   'https://via.placeholder.com/150x200?text=No+Image',
            pageCount: randomBook.volumeInfo.pageCount || 'Unknown'
          };
          
          setCurrentBook(bookData);
          setHistory(prev => [bookData, ...prev]);
          setLoading(false);
          return;
        }
        
        attempts++;
      } catch (err) {
        attempts++;
        if (attempts >= maxAttempts) {
          setError('Failed to fetch book data. Please try again.');
          setLoading(false);
          return;
        }
      }
    }
    
    setError('No books found that match your criteria. Try removing some banned items.');
    setLoading(false);
  };

  const addToBanList = (type, value) => {
    const existingBan = banList.find(item => item.type === type && item.value === value);
    
    if (existingBan) {
      // Remove from ban list
      setBanList(prev => prev.filter(item => !(item.type === type && item.value === value)));
    } else {
      // Add to ban list
      setBanList(prev => [...prev, { type, value }]);
    }
  };

  const isBanned = (type, value) => {
    return banList.some(item => item.type === type && item.value === value);
  };

  useEffect(() => {
    fetchRandomBook();
  }, []);

  return (
    <div className="app">
      <Header />
      
      <div className="main-container">
        <div className="content-grid">
          {/* Main Discovery Area */}
          <div className="discovery-section">
            <BookDisplay 
              currentBook={currentBook}
              loading={loading}
              error={error}
              onFetchBook={fetchRandomBook}
              onAddToBanList={addToBanList}
              isBanned={isBanned}
            />
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <BanList 
              banList={banList}
              onAddToBanList={addToBanList}
            />
            
            <History 
              history={history}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;