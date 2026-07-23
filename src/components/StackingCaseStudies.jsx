import { FaArrowDown, FaArrowRight, FaCheck } from 'react-icons/fa6'

const CARD_PEEK = 64

function DeviceMockup({ accent }) {
  return (
    <div className="device device-phone">
      <div className="device-phone-notch" />
      <div className="device-screen-ui">
        <div className="device-screen-bar">
          <span style={{ background: accent }} />
          <span className="device-screen-bar-track" />
        </div>
        <div className="device-screen-hero" style={{ background: `${accent}26`, borderColor: `${accent}55` }} />
        <div className="device-screen-grid">
          <div style={{ background: `${accent}1f` }} />
          <div style={{ background: `${accent}1f` }} />
          <div style={{ background: `${accent}1f` }} />
        </div>
      </div>
    </div>
  )
}

function PhoneEmulatorFrame({ children }) {
  return (
    <div className="phone-emulator">
      <span className="phone-emulator-button phone-emulator-button--mute" />
      <span className="phone-emulator-button phone-emulator-button--vol-up" />
      <span className="phone-emulator-button phone-emulator-button--vol-down" />
      <span className="phone-emulator-button phone-emulator-button--power" />
      <div className="phone-emulator-screen">
        {children}
        <div className="phone-emulator-notch" />
        <div className="phone-emulator-home-indicator" />
      </div>
    </div>
  )
}

function StackingCaseStudies({ cases }) {
  return (
    <div className="stacking-case-studies">
      <div className="stack-intro">
        <span className="stack-eyebrow">Case Studies</span>
        <h3>Selected client work</h3>
        <p>Real products shipped for real businesses.</p>
        <div className="stack-scroll-cue">
          <span>Scroll to explore</span>
          <FaArrowDown />
        </div>
      </div>

      <div className="stack-track">
        {cases.map((item, i) => (
          <article
            key={item.id}
            className="stack-card"
            style={{ zIndex: i + 1, top: `${i * CARD_PEEK}px` }}
          >
            <div
              className="stack-card-surface"
              style={{ background: item.gradient, '--stack-accent': item.accent }}
            >
              <div className="stack-card-grain" />
              <div className="stack-card-label">
                <span className="stack-eyebrow" style={{ color: item.accent }}>
                  {item.eyebrow}
                </span>
              </div>
              <div className="stack-card-inner">
                <div className="stack-card-copy">
                  <span className="stack-eyebrow" style={{ color: item.accent }}>
                    {item.eyebrow}
                  </span>
                  <h4>{item.title}</h4>
                  {item.description && <p>{item.description}</p>}
                  {item.stats?.length > 0 && (
                    <ul className="stack-card-stats">
                      {item.stats.map((stat) => (
                        <li key={stat}>
                          <FaCheck style={{ color: item.accent }} />
                          <span>{stat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    className="stack-card-cta"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ '--stack-accent': item.accent }}
                  >
                    {item.ctaLabel || 'View GitHub'} <FaArrowRight />
                  </a>
                </div>
                <div className="stack-card-device">
                  {item.portrait && item.video ? (
                    <PhoneEmulatorFrame>
                      <video className="phone-emulator-media" src={item.video} autoPlay muted loop playsInline />
                    </PhoneEmulatorFrame>
                  ) : item.portrait && item.image ? (
                    <PhoneEmulatorFrame>
                      <img className="phone-emulator-media" src={item.image} alt="" />
                    </PhoneEmulatorFrame>
                  ) : item.video ? (
                    <video className="stack-card-media" src={item.video} autoPlay muted loop playsInline />
                  ) : item.image ? (
                    <img className="stack-card-media" src={item.image} alt="" />
                  ) : item.logo ? (
                    <div className="stack-card-logo-panel">
                      <img className="stack-card-logo" src={item.logo} alt={item.eyebrow} />
                    </div>
                  ) : (
                    <DeviceMockup accent={item.accent} />
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="stack-outro">
        <p>Want to see more, or start a project of your own?</p>
        <a href="#contact">Let&apos;s talk <FaArrowRight /></a>
      </div>
    </div>
  )
}

export default StackingCaseStudies
