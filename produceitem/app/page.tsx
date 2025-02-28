"use client";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    // Add a delay before closing the hover section
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 500); // 500ms delay
  };
  
  const handleTwitterClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <div className="container">
      {/* Blurred background blob */}
      <div className="blob"></div>
      
      {/* Header navigation */}
      <header className="header">
        <nav>
          <ul className="navList">
            <li><a href="/">Home</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/contact">About</a></li>
          </ul>
        </nav>
      </header>
      
      {/* Main content */}
      <main className="main">
        <h1 className="title">produce item</h1>
        
        <div className="banana-container">
          <div 
            className={`banana-emoji ${isHovering ? 'dissolving' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            🍌
          </div>
          
          <div 
            className={`hover-section ${isHovering ? 'visible' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="hover-content">
              <h2>fresh<br/>&<br/>hand-picked</h2>
            </div>
            
            <div className="email-container">
              <div className="email-icon">✉️</div>
              <a 
                href="mailto:produceitem@gmail.com"
                className="email-link"
              >
                produceitem@gmail.com
              </a>
            </div>
            
            <div className="twitter-links-container">
              <div className="x-logo">𝕏</div>
              <a 
                href="https://twitter.com/produceitem_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="twitter-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleTwitterClick('https://twitter.com/produceitem_');
                }}
              >
                @produceitem_
              </a>
            </div>
          </div>
        </div>
        
        <p className="slogan">
          &quot;fresh perspectives in a digital world.&quot;
        </p>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2023 produceitem - all rights reserved</p>
      </footer>
    </div>
  );
}
