import React, { useState, useEffect } from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";

function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000"); // Initial text color
  const [buttonColor, setButtonColor] = useState("#000000");

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
      })
      .catch(error => {
        console.error("Error fetching quote:", error);
      });
  };

  const tweetQuote = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote + '" - ' + author)}`);
  };

  const handleNewQuote = () => {
    fetchQuote();
    const newColor = getRandomColor();
    setBackgroundColor(newColor);
    setTextColor(newColor);
    setButtonColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

 

    // Function to generate a random color
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

  return (
    <div style={{ backgroundColor: '#ffffff'}}>
    <div id="quote-box" style={{ color: textColor }}>
      <div id="text">{quote}</div>
      <div id="author">- {author}</div>
      <button id="new-quote" style={{ backgroundColor: buttonColor, color:'#fff'  }} onClick={handleNewQuote}>New Quote</button>
      <a id="tweet-quote"  style={{color:textColor }}  onClick={tweetQuote} href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('"' + quote + '" - ' + author)}`} target="_blank" rel="noopener noreferrer"><FaSquareXTwitter size={32}  /></a>
    
      </div>
      </div>
  );
}

export default Home;
