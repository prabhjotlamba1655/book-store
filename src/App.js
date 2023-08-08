import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BooksList from './components/bookList/BooksList';
import BookDetails from './components/bookDetails/BookDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<BooksList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
