"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import Link from 'next/link';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const changeEmojiTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [randomEmoji, setRandomEmoji] = useState("");
  const [isChangingEmoji, setIsChangingEmoji] = useState(false);
  
  // List of fruit and vegetable emojis - memoized to prevent recreation on each render
  const produceEmojis = useMemo(() => [
    "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", 
    "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🥑", "🥦", "🥬", 
    "🥒", "🌶️", "🌽", "🥕", "🧅", "🥔", "🍠", "🍆"
  ], []);
  
  // Select a random emoji on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * produceEmojis.length);
    setRandomEmoji(produceEmojis[randomIndex]);
  }, [produceEmojis]); // Now it's safe to include produceEmojis in the dependency array
  
  // Function to get a new random emoji different from the current one
  const getNewRandomEmoji = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * produceEmojis.length);
    } while (produceEmojis[newIndex] === randomEmoji && produceEmojis.length > 1);
    
    return produceEmojis[newIndex];
  };
  
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (changeEmojiTimeoutRef.current) {
      clearTimeout(changeEmojiTimeoutRef.current);
      changeEmojiTimeoutRef.current = null;
    }
    
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    // Add a delay before closing the hover section
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
      
      // Set a flag that we're in the process of changing the emoji
      setIsChangingEmoji(true);
      
      // Change the emoji when it's fully dissolved (after 500ms of transition)
      changeEmojiTimeoutRef.current = setTimeout(() => {
        setRandomEmoji(getNewRandomEmoji());
        setIsChangingEmoji(false);
      }, 500); // Match this to the CSS transition duration
      
    }, 500); // 500ms delay before starting to close
  };
  
  const handleTwitterClick = (url: string) => {
    window.open(url, '_blank', 'noopener noreferrer');
  };
  
  const handleProjectClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };
  
  // Handle navigation
  const handleNavClick = (section: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection(section);
  };
  
  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (changeEmojiTimeoutRef.current) {
        clearTimeout(changeEmojiTimeoutRef.current);
      }
    };
  }, []);
  
  // Render the appropriate section content
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <h1 className="title">produce item</h1>
            
            <div className="produce-container">
              <div 
                className={`produce-emoji ${isHovering ? 'dissolving' : ''} ${isChangingEmoji ? 'changing' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {randomEmoji}
              </div>
              
              <div 
                className={`hover-section ${isHovering ? 'visible' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="hover-content">
                  <h2>fresh<br/>&<br/>hand-picked<br/>projects</h2>
                </div>
                
                <div className="email-container">
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
          </>
        );
      
      case 'projects':
        return (
          <div className="section-content projects-section">
            <h1 className="title">projects</h1>
            <div className="projects-grid">
              <div 
                className="project-card" 
                onClick={() => handleProjectClick('')}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label="Flexify project (coming soon)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleProjectClick('');
                  }
                }}
              >
                <div className="project-emoji">💪</div>
                <h3>
                  <span className="project-title-main">flexify</span>
                  <span className="project-title-domain">.xyz</span>
                </h3>
                <p> customizable bragging rights for esports players and social media. <br/> <span className="yellow-gradient-text">(coming soon)</span></p>
              </div>
              <div 
                className="project-card"
                onClick={() => handleProjectClick('')}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label="JuiceMe project (coming soon)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleProjectClick('');
                  }
                }}
              >
                <div className="project-emoji">🧃</div>
                <h3>
                  <span className="project-title-main">juiceMe</span>
                  <span className="project-title-domain-tropical">.xyz</span>
                </h3>
                <p>find the cheapest energy drink prices <br/> in your area. <br/> <span className="yellow-gradient-text">(coming soon)</span></p>
              </div>
              <div 
                className="project-card"
                onClick={() => handleProjectClick('https://feetdle.xyz')}
                style={{ cursor: 'pointer' }}
                role="button"
                tabIndex={0}
                aria-label="Feetdle project"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleProjectClick('https://feetdle.xyz');
                  }
                }}
              >
                <div className="project-emoji">🦶</div>
                <h3>
                  <span className="project-title-main">feetdle</span>
                  <span className="project-title-domain-gold">.xyz</span>
                </h3>
                <p>we aren&apos;t freaks, <br/> but we satisfied the people who are. <br/> <span className="yellow-gradient-text">(coming soon)</span></p>
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="section-content about-section">
            <h1 className="title">about us</h1>
            <div className="about-content">
              <div className="about-item">
                <span className="about-text">
                  produce item - a couple of devs making fresh projects.
                </span>
              </div>
              <div className="about-item">
                <span className="about-text">
                  founded in 2025 -  we want to start off running, deploying fun apps for all users. 
                </span>
              </div>
              <div className="about-item">
                <span className="about-text">
                   driven off of fun - creating apps that inspire and entertain.
                </span>
              </div>
              
              {/* X account links section */}
              <div className="about-x-accounts">
                <a 
                  href="https://twitter.com/konalol_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="about-x-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTwitterClick('https://twitter.com/konalol_');
                  }}
                >
                  <span className="about-x-icon">𝕏</span>
                  <span className="about-x-username">@konalol_</span>
                </a>
                
                <a 
                  href="https://twitter.com/ChocolateAura" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="about-x-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTwitterClick('https://twitter.com/ChocolateAura');
                  }}
                >
                  <span className="about-x-icon">𝕏</span>
                  <span className="about-x-username">@ChocolateAura</span>
                </a>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="container">
      {/* Blurred background blob */}
      <div className="blob"></div>
      
      {/* Header navigation */}
      <header className="header">
        <nav>
          <ul className="navList">
            <li>
              <Link 
                href="#home" 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => handleNavClick('home', e)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="#projects"
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => handleNavClick('projects', e)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link 
                href="#about"
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => handleNavClick('about', e)}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      
      {/* Main content with section transitions */}
      <main className="main">
        <div className={`section-container ${activeSection}-active`}>
          {renderSectionContent()}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="footer">
        <p>© 2025 produceitem - all rights reserved</p>
      </footer>
    </div>
  );
}
