import { useEffect, useMemo, useRef, useState } from 'react'
import { FaEnvelope, FaGithub, FaLinkedin, FaLocationDot, FaRobot, FaNetworkWired, FaDatabase, FaAws, FaMicrosoft, FaCode, FaUser, FaBriefcase, FaMoneyBillWave, FaMessage, FaPaperPlane, FaArrowRight } from 'react-icons/fa6'
import { WiMoonAltWaningCrescent3, WiDaySunny } from 'react-icons/wi'
import WormholeTour from './components/WormholeTour'
import {
  SiPython, SiJavascript, SiCplusplus, SiR,
  SiN8N, SiZapier, SiTensorflow, SiKeras, SiPytorch,
  SiReact, SiHtml5, SiStreamlit, SiWebflow, SiFramer,
  SiPandas, SiPlotly, SiSelenium, SiGit, SiFigma
} from 'react-icons/si'

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { icon: <SiPython style={{ color: '#3776AB' }} />, label: 'Python' },
      { icon: <SiJavascript style={{ color: '#F7DF1E' }} />, label: 'JavaScript' },
      { icon: <SiCplusplus style={{ color: '#00599C' }} />, label: 'C++' },
      { icon: <FaCode style={{ color: '#9B4F96' }} />, label: 'C#' },
      { icon: <SiR style={{ color: '#276DC3' }} />, label: 'R' },
    ],
  },
  {
    title: 'Automation & Workflows',
    skills: [
      { icon: <SiN8N style={{ color: '#EA4B71' }} />, label: 'n8n' },
      { icon: <FaNetworkWired style={{ color: '#FF6D00' }} />, label: 'Make.com' },
      { icon: <SiZapier style={{ color: '#FF4A00' }} />, label: 'Zapier' },
      { icon: <FaNetworkWired style={{ color: '#4DB6AC' }} />, label: 'Webhooks' },
      { icon: <FaRobot style={{ color: '#7C4DFF' }} />, label: 'CRM Integration' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { icon: <SiTensorflow style={{ color: '#FF6F00' }} />, label: 'TensorFlow' },
      { icon: <SiKeras style={{ color: '#D00000' }} />, label: 'Keras' },
      { icon: <SiPytorch style={{ color: '#EE4C2C' }} />, label: 'PyTorch' },
      { icon: <FaCode style={{ color: '#00BCD4' }} />, label: 'YOLO' },
      { icon: <FaCode style={{ color: '#26A69A' }} />, label: 'U-Net' },
      { icon: <FaCode style={{ color: '#5C6BC0' }} />, label: 'CNN' },
      { icon: <FaCode style={{ color: '#8D6E63' }} />, label: 'LSTM' },
    ],
  },
  {
    title: 'Web Development',
    skills: [
      { icon: <SiReact style={{ color: '#61DAFB' }} />, label: 'React' },
      { icon: <SiHtml5 style={{ color: '#E34F26' }} />, label: 'HTML/CSS' },
      { icon: <SiJavascript style={{ color: '#F7DF1E' }} />, label: 'JavaScript' },
      { icon: <SiStreamlit style={{ color: '#FF4B4B' }} />, label: 'Streamlit' },
      { icon: <SiWebflow style={{ color: '#4353FF' }} />, label: 'Webflow' },
      { icon: <SiFramer style={{ color: '#0055FF' }} />, label: 'Framer' },
    ],
  },
  {
    title: 'Data & Visualization',
    skills: [
      { icon: <SiPython style={{ color: '#3776AB' }} />, label: 'Python' },
      { icon: <SiPandas style={{ color: '#150458' }} />, label: 'Pandas' },
      { icon: <SiPlotly style={{ color: '#3F4F75' }} />, label: 'Plotly' },
      { icon: <SiStreamlit style={{ color: '#FF4B4B' }} />, label: 'Streamlit' },
      { icon: <FaDatabase style={{ color: '#00BCD4' }} />, label: 'SQL' },
      { icon: <SiSelenium style={{ color: '#43B02A' }} />, label: 'Selenium' },
    ],
  },
  {
    title: 'Cloud & Tools',
    skills: [
      { icon: <FaAws style={{ color: '#FF9900' }} />, label: 'AWS' },
      { icon: <FaMicrosoft style={{ color: '#0078D4' }} />, label: 'Azure' },
      { icon: <SiGit style={{ color: '#F05032' }} />, label: 'Git' },
      { icon: <SiFigma style={{ color: '#F24E1E' }} />, label: 'Figma' },
    ],
  },
]

const allSkills = skillCategories.flatMap((cat) => cat.skills)

function App() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [repoError, setRepoError] = useState('')
  const [isJourneyLaunched, setIsJourneyLaunched] = useState(false)
  const [formStatus, setFormStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('portfolio-theme')
    if (storedTheme) {
      return storedTheme
    }
    return 'dark'
  })

  const githubUsername = useMemo(
    () => import.meta.env.VITE_GITHUB_USERNAME || 'chaudhrynihaal',
    [],
  )
  const featuredProjectOrder = useMemo(
    () => ['hostel-finder', 'med-fast-AI-detection', 'stock-prediction-LSTM-RNN', 'n8n'],
    [],
  )
  const projectCovers = useMemo(
    () => ({
      'hostel-finder': '/project-covers/hostel-finder.png',
      'med-fast-AI-detection': '/project-covers/med-fast-AI-detection.png',
      'stock-prediction-LSTM-RNN': '/project-covers/stock-prediction-LSTM-RNN.png',
      n8n: '/project-covers/n8n.png',
    }),
    [],
  )

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      fetch(`https://api.github.com/users/${githubUsername}`, {
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Unable to fetch profile details.')
          }
          return response.json()
        }),
      fetch(
        `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`,
        { signal: controller.signal },
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Unable to fetch repositories.')
        }
        return response.json()
      })
    ])
      .then(([profileData, repoData]) => {
        setProfile(profileData)
        const sorted = [...repoData].sort((a, b) => b.stargazers_count - a.stargazers_count)
        setRepos(sorted)
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setRepoError('Could not load GitHub repositories right now.')
        }
      })

    return () => controller.abort()
  }, [githubUsername])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])



  const featuredRepos = useMemo(() => {
    const byName = new Map(repos.map((repo) => [repo.name, repo]))
    return featuredProjectOrder
      .map((name) => byName.get(name))
      .filter(Boolean)
  }, [featuredProjectOrder, repos])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target);
    formData.append("access_key", "dbc27fe6-67d0-4eb5-8bfa-28d2f5dcc7a9");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      if (data.success) {
        setFormStatus('success');
        e.target.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        console.error("Form error:", data);
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      console.error("Submit error:", error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  if (isJourneyLaunched) {
    return <WormholeTour onExit={() => setIsJourneyLaunched(false)} />
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand"></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="theme-toggle" aria-label="Theme toggle">
          <button
            type="button"
            className={`theme-chip ${theme === 'dark' ? 'theme-chip-dark active' : 'theme-chip-light active'}`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'dark' ? <WiMoonAltWaningCrescent3 size={22} /> : <WiDaySunny size={22} />}
          </button>
        </div>
      </header>

      <section id="home" className="hero-section">
        <div className="hero-copy">
          <h1>Hey, I&apos;m Chaudhry Nihaal</h1>
          <h2>AI &amp; Automation Engineer helping small businesses scale faster</h2>
          <p>
            I build n8n workflows, AI-powered websites, and custom dashboards as a solo
            technical partner.
          </p>
          <div className="hero-cta">
            <a
              className="primary-btn"
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
            <a className="ghost-btn" href="#projects">View My Work</a>
          </div>
          <div className="socials">
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer"><FaGithub size={16} /> GitHub</a>
            <a href="https://linkedin.com/in/nihaalasif" target="_blank" rel="noreferrer"><FaLinkedin size={16} /> LinkedIn</a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nihaalsif5@gmail.com" target="_blank" rel="noreferrer"><FaEnvelope size={16} /> Email</a>
          </div>
        </div>
        <div className="hero-media">
          <img
            className="profile-circle"
            src={profile?.avatar_url || `https://github.com/${githubUsername}.png`}
            alt="Chaudhry Nihaal"
          />
        </div>
      </section>

      <section className="stats">
        <div><strong>16+</strong><span>Projects Delivered</span></div>
        <div><strong>AI</strong><span>Automation Specialist</span></div>
      </section>

      <section id="skills" className="section skills-section">
        <h3>Technical Skills</h3>
        <p className="section-subtitle">
          Comprehensive expertise across modern development stack with focus on scalable
          web applications and DevOps practices.
        </p>
        <div className="skills-marquee-outer">
          <div className="skills-marquee-track">
            {[...allSkills, ...allSkills].map((sk, i) => (
              <span key={i} className="marquee-skill">
                <span className="marquee-icon">{sk.icon}</span>
                <span className="marquee-label">{sk.label}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <h3>Featured Projects</h3>
        <p className="section-subtitle">Selected flagship projects with custom cover art.</p>
        {repoError && <p className="notice">{repoError}</p>}

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <button
            onClick={() => setIsJourneyLaunched(true)}
            style={{
              background: 'linear-gradient(45deg, var(--accent), #c084fc)',
              color: 'black',
              border: 'none',
              padding: '16px 40px',
              borderRadius: '40px',
              fontSize: '16px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(56, 189, 248, 0.4)',
              transition: 'transform 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Launch 3D Journey <FaArrowRight />
          </button>
        </div>

        <div className="projects-grid">
          {featuredRepos.map((repo) => (
            <a
              key={repo.id}
              className="project-card"
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="project-image"
                src={projectCovers[repo.name]}
                alt={repo.name}
                loading="lazy"
              />
              <h4>{repo.name}</h4>
              <p>{repo.description || 'No description provided.'}</p>
              <small>Stars: {repo.stargazers_count} | Language: {repo.language || 'N/A'}</small>
            </a>
          ))}
        </div>
      </section>

      <section id="experience" className="section">
        <h3>Professional Experience</h3>
        <p className="section-subtitle">
          Building AI-powered products, automation systems, and dashboards for startups and small businesses.
        </p>
        <div className="experience-list">
          <article>
            <h4>AI &amp; Automation Engineer</h4>
            <p>Kavtech Solutions | Lahore, Pakistan | Freelance</p>
          </article>
          <article>
            <h4>Solo Technical Partner</h4>
            <p>Workflow automation, AI websites, and custom dashboards for client businesses.</p>
          </article>
        </div>
      </section>

      <section id="contact" className="section contact-horizontal">
        <div className="contact-info-col">
          <h3>Let&apos;s Build Something Together</h3>
          <p>
            Ready to automate your workflows or build an AI-powered product?
            Reach out and I&apos;ll get back to you within 24 hours.
          </p>
          <div className="contact-socials-minimal">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nihaalsif5@gmail.com" target="_blank" rel="noreferrer" title="Email">
              <FaEnvelope size={18} /> <span>nihaalsif5@gmail.com</span>
            </a>
            <a href="https://linkedin.com/in/nihaalasif" target="_blank" rel="noreferrer" title="LinkedIn">
              <FaLinkedin size={18} /> <span>LinkedIn Profile</span>
            </a>
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" title="GitHub">
              <FaGithub size={18} /> <span>GitHub Portfolio</span>
            </a>
          </div>
        </div>

        <div className="contact-form-col">
          <form className="horizontal-form" onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input type="text" name="name" required placeholder="John Doe" />
              </div>
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input type="email" name="email" required placeholder="john@company.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Select Service</label>
              <div className="input-wrapper">
                <FaBriefcase className="input-icon" />
                <select name="service">
                  <option value="AI Automation">AI Automation</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Custom Dashboard">Custom Dashboard</option>
                  <option value="Workflow Optimization">Workflow Optimization</option>
                  <option value="Others">Others</option>
                  <option value="Prefer a call">Prefer a call</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <div className="input-wrapper">
                <FaMessage className="input-icon" />
                <input type="text" name="subject" required placeholder="Project inquiry" />
              </div>
            </div>

            <div className="form-group">
              <label>Message</label>
              <div className="input-wrapper textarea-wrapper">
                <FaPaperPlane className="input-icon" />
                <textarea name="message" required placeholder="Tell me about your project goals..."></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="submit-btn-horizontal" 
              disabled={formStatus === 'submitting'}
              style={{
                background: formStatus === 'success' ? '#22c55e' : formStatus === 'error' ? '#ef4444' : '',
              }}
            >
              {formStatus === 'idle' && <><FaPaperPlane /> Send Message</>}
              {formStatus === 'submitting' && 'Sending...'}
              {formStatus === 'success' && 'Message Sent!'}
              {formStatus === 'error' && 'Error Sending'}
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="footer-brand">Chaudhry Nihaal</div>
          <p className="footer-tagline">AI &amp; Automation Engineer | Solo Technical Partner</p>
          <div className="footer-socials">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=nihaalsif5@gmail.com" target="_blank" rel="noreferrer" title="Email"><FaEnvelope size={18} /></a>
            <a href="https://linkedin.com/in/nihaalasif" target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedin size={18} /></a>
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer" title="GitHub"><FaGithub size={18} /></a>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Chaudhry Nihaal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
