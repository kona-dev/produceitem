"use client";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const changeEmojiTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [randomEmoji, setRandomEmoji] = useState("");
  const [isChangingEmoji, setIsChangingEmoji] = useState(false);
  
  // List of fruit and vegetable emojis
  const produceEmojis = [
    "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", 
    "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🥑", "🥦", "🥬", 
    "🥒", "🌶️", "🌽", "🥕", "🧅", "🥔", "🍠", "🍆"
  ];
  
  // Select a random emoji on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * produceEmojis.length);
    setRandomEmoji(produceEmojis[randomIndex]);
  }, []);
  
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
                <p>we aren't freaks, <br/> but we satisfied the people who are. <br/> <span className="yellow-gradient-text">(coming soon)</span></p>
              </div>
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="section-content about-section">
            <h1 className="title">about us</h1>
            <div className="about-content">
              <p>
                <span className="about-emoji">🌱</span>
                <span className="about-text">
                  Produce Item is a creative studio specializing in digital experiences that feel fresh, 
                  organic, and nourishing. We believe in cultivating ideas that grow into meaningful projects.
                </span>
              </p>
              <p>
                <span className="about-emoji">🌿</span>
                <span className="about-text">
                  Founded in 2023, we work with clients who share our passion for sustainable design 
                  and innovative technology solutions.
                </span>
              </p>
              <p>
                <span className="about-emoji">🌞</span>
                <span className="about-text">
                  Our team brings together diverse talents and perspectives, 
                  creating a rich environment where creativity flourishes.
                </span>
              </p>
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
              <a 
                href="/" 
                className={activeSection === 'home' ? 'active' : ''}
                onClick={(e) => handleNavClick('home', e)}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/projects" 
                className={activeSection === 'projects' ? 'active' : ''}
                onClick={(e) => handleNavClick('projects', e)}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => handleNavClick('about', e)}
              >
                About
              </a>
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
        <p>© 2023 produceitem - all rights reserved</p>
      </footer>
    </div>
  );
}
