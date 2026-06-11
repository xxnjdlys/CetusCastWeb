"use client"

import { useEffect, useRef, useState } from "react"

const PLAY_URL =
  "https://play.google.com/store/apps/details?id=miracast.chromecast.tvcast.screenmirroring.cetuscast"
const ICON_URL =
  "https://play-lh.googleusercontent.com/bLxeIaiJ4_5Olb_x44EEQgzYi-ocpMtVXJn8xZPdlVkgmF6SNBZ4qrMpz71Nj4MiK8UY=w240-h480-rw"

type Dot = {
  id: number
  left: string
  top: string
  cyan: boolean
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let width = 0
    let height = 0
    let frameId = 0
    const mouse = { x: -9999, y: -9999 }
    const pointCount = 68
    const distance = 125
    const points = Array.from({ length: pointCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }

    const frame = () => {
      ctx.clearRect(0, 0, width, height)

      points.forEach((point) => {
        const dx = point.x - mouse.x
        const dy = point.y - mouse.y
        const d = Math.hypot(dx, dy)

        if (d > 0 && d < 150) {
          const force = ((150 - d) / 150) * 0.04
          point.vx += (dx / d) * force
          point.vy += (dy / d) * force
        }

        point.vx *= 0.994
        point.vy *= 0.994
        point.x += point.vx
        point.y += point.vy

        if (point.x < 0) point.x = width
        if (point.x > width) point.x = 0
        if (point.y < 0) point.y = height
        if (point.y > height) point.y = 0

        ctx.beginPath()
        ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0,234,255,.35)"
        ctx.fill()
      })

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y)
          if (d < distance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,234,255,${(1 - d / distance) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.moveTo(points[i].x, points[i].y)
            ctx.lineTo(points[j].x, points[j].y)
            ctx.stroke()
          }
        }
      }

      frameId = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMouseMove)
    frame()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" />
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  )
}

function HeroTitle() {
  const [main, setMain] = useState("Cetus")
  const [sub, setSub] = useState("Cast")

  useEffect(() => {
    const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>+=?|#~"
    const timers: ReturnType<typeof setTimeout>[] = []

    const scramble = (
      target: string,
      setter: (value: string) => void,
      onDone?: () => void,
    ) => {
      let resolved = 0
      let stopped = false

      const render = () => {
        if (stopped) return
        let value = target.slice(0, resolved)
        for (let i = resolved; i < target.length; i++) {
          value += pool[Math.floor(Math.random() * pool.length)]
        }
        setter(value)
        timers.push(setTimeout(render, 38))
      }

      const lock = () => {
        resolved += 1
        if (resolved >= target.length) {
          stopped = true
          setter(target)
          onDone?.()
          return
        }
        timers.push(setTimeout(lock, 95))
      }

      render()
      timers.push(setTimeout(lock, 95))
    }

    timers.push(setTimeout(() => {
      scramble("Cetus", setMain, () => {
        timers.push(setTimeout(() => scramble("Cast", setSub), 160))
      })
    }, 400))

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <h1 className="hero-title" data-text="CETUSCAST">
      <span className="h1-main">{main}</span>
      <span className="h1-sub">{sub}</span>
    </h1>
  )
}

function useRevealEffects() {
  useEffect(() => {
    const revealTargets = Array.from(document.querySelectorAll(".reveal"))
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("vis")
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    revealTargets.forEach((element) => revealObserver.observe(element))

    const heroTimer = setTimeout(() => {
      document.querySelectorAll(".hero .reveal").forEach((element) => element.classList.add("vis"))
    }, 150)

    const missionGrid = document.getElementById("mission-grid")
    const missionObserver = missionGrid
      ? new IntersectionObserver(
          ([entry], observer) => {
            if (!entry.isIntersecting) return
            document.querySelectorAll(".mission").forEach((mission, index) => {
              setTimeout(() => mission.classList.add("vis"), index * 130)
            })
            observer.disconnect()
          },
          { threshold: 0.1 },
        )
      : null
    if (missionGrid) missionObserver?.observe(missionGrid)

    const checks = document.getElementById("check-list")
    const checkObserver = checks
      ? new IntersectionObserver(
          ([entry], observer) => {
            if (!entry.isIntersecting) return
            document.querySelectorAll(".check").forEach((check, index) => {
              setTimeout(() => check.classList.add("vis"), index * 160)
            })
            observer.disconnect()
          },
          { threshold: 0.2 },
        )
      : null
    if (checks) checkObserver?.observe(checks)

    const hudTimer = setTimeout(() => {
      document.querySelectorAll(".hud-card").forEach((card, index) => {
        setTimeout(() => card.classList.add("vis"), 900 + index * 350)
      })
    }, 300)

    return () => {
      clearTimeout(heroTimer)
      clearTimeout(hudTimer)
      revealObserver.disconnect()
      missionObserver?.disconnect()
      checkObserver?.disconnect()
    }
  }, [])
}

function Counter() {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return
        let current = 0
        const target = 50
        const interval = setInterval(() => {
          current = Math.min(current + Math.ceil(target / 36), target)
          setValue(current)
          if (current >= target) clearInterval(interval)
        }, 45)
        obs.disconnect()
      },
      { threshold: 0.5 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return <b ref={ref}>{value}K+</b>
}

function Terminal() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [content, setContent] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const lines = [
      { text: "$ initialize cast session", className: "c" },
      { text: "✓ scan local network for TV / DLNA devices", className: "g" },
      { text: "✓ select photo, video, or audio payload", className: "g" },
      { text: "✓ route media stream to big screen", className: "g" },
      { text: "✓ keep playback controls available on phone", className: "g" },
      { text: "" },
      { text: "DEVICE CATEGORY: TOOLS" },
      { text: "STORE STATUS: GOOGLE PLAY LISTED" },
      { text: "UPDATED AT: 2026-06-11" },
      { text: "DOWNLOADS: 50K+" },
      { text: "" },
      { text: "primary action: open Google Play listing", className: "c" },
    ]
    const timers: ReturnType<typeof setTimeout>[] = []
    let started = false

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting || started) return
        started = true
        obs.disconnect()

        let lineIndex = 0
        const nextLine = () => {
          if (lineIndex >= lines.length) {
            setContent((old) => [...old, <span key="cursor" className="cursor" />])
            return
          }

          const line = lines[lineIndex]
          lineIndex += 1
          let charIndex = 0
          const key = `line-${lineIndex}`

          const typeChar = () => {
            if (charIndex < line.text.length) {
              const text = line.text.slice(0, charIndex + 1)
              setContent((old) => [
                ...old.filter((item) => (item as React.ReactElement).key !== key),
                <span key={key} className={line.className}>{text}</span>,
              ])
              charIndex += 1
              timers.push(setTimeout(typeChar, line.text.startsWith("$") ? 38 : 16))
              return
            }

            setContent((old) => [...old, <span key={`${key}-br`}>{"\n"}</span>])
            timers.push(setTimeout(nextLine, line.text === "" ? 70 : 100))
          }

          typeChar()
        }

        nextLine()
      },
      { threshold: 0.25 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <div className="term-out" ref={ref}>
      {content}
    </div>
  )
}

function RadarDots() {
  const [dots, setDots] = useState<Dot[]>([])

  useEffect(() => {
    let mounted = true
    let id = 0
    const timers: ReturnType<typeof setTimeout>[] = []

    const spawnBatch = () => {
      if (!mounted) return
      const count = Math.random() < 0.3 ? Math.floor(Math.random() * 2) + 2 : 1
      for (let i = 0; i < count; i++) {
        timers.push(setTimeout(() => {
          const angle = Math.random() * Math.PI * 2
          const dist = 14 + Math.random() * 32
          const dot = {
            id: id++,
            left: `calc(50% + ${Math.cos(angle) * dist}%)`,
            top: `calc(50% + ${Math.sin(angle) * dist}%)`,
            cyan: Math.random() < 0.25,
          }
          setDots((old) => [...old, dot])
          timers.push(setTimeout(() => {
            setDots((old) => old.filter((item) => item.id !== dot.id))
          }, 3700))
        }, i * (180 + Math.random() * 320)))
      }
      timers.push(setTimeout(spawnBatch, 1800 + Math.random() * 3700))
    }

    spawnBatch()
    return () => {
      mounted = false
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className={`radar-dot${dot.cyan ? " cyan" : ""}`}
          style={{ left: dot.left, top: dot.top }}
        />
      ))}
    </>
  )
}

function PlayMark() {
  return <span className="play-mark" aria-hidden="true" />
}

export default function CetusCastPage() {
  useRevealEffects()

  useEffect(() => {
    document.documentElement.lang = "en"
  }, [])

  return (
    <>
      <ParticleCanvas />
      <div className="hud-frame" aria-hidden="true" />
      <div className="corner-a" aria-hidden="true" />
      <div className="corner-b" aria-hidden="true" />

      <nav className="nav" aria-label="Primary navigation">
        <div className="shell nav-inner">
          <a className="brand" href="#top">
            <img src={ICON_URL} alt="CetusCast app icon" />
            <span>CetusCast</span>
          </a>
          <div className="nav-links">
            <a href="#mission">Features</a>
            <a href="#ops">How It Works</a>
            <a href="#safety">Privacy</a>
            <a href="#download">Download</a>
          </div>
          <a className="hud-btn primary" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
            <PlayMark />
            Google Play
          </a>
        </div>
      </nav>

      <main id="top">
        <header className="hero shell">
          <div className="hero-grid">
            <div>
              <Reveal className="status">
                <span className="tag ok">CAST LINK ONLINE</span>
                <span className="tag">DLNA READY</span>
                <span className="tag">MEDIA READY</span>
              </Reveal>
              <HeroTitle />
              <Reveal delay={0.18}>
                <p className="lead">
                  Cast photos, videos, and audio from your Android phone to the TV.
                  CetusCast connects your media to TVs and DLNA-compatible devices
                  without complicated setup.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="hero-actions">
                <a className="hud-btn primary" href={PLAY_URL} target="_blank" rel="noopener noreferrer">
                  <PlayMark />
                  Get it on Google Play
                </a>
                <a className="hud-btn" href="#mission">Explore features</a>
              </Reveal>
              <div className="readout" aria-label="App overview">
                <div><Counter /><span>Downloads</span></div>
                <div><b>DLNA</b><span>Screen Mirroring</span></div>
                <div><b>Media</b><span>Photo / Video / Audio</span></div>
              </div>
            </div>

            <div className="radar-zone" aria-hidden="true">
              <div className="radar">
                <RadarDots />
              </div>
              <div className="tv-panel"><div className="tv-inner"><div className="cast-word">TV</div></div></div>
              <div className="data-line" />
              <div className="phone-node">
                <img src="https://picsum.photos/seed/cetuscast-hero/270/480" alt="" />
              </div>
              <div className="hud-card one"><b>SIGNAL</b>wireless casting route</div>
              <div className="hud-card two"><b>MEDIA</b>photo / video / audio</div>
              <div className="hud-card three"><b>LATENCY</b>smooth streaming target</div>
            </div>
          </div>
        </header>

        <section id="mission">
          <div className="shell">
            <Reveal className="section-head">
              <div><div className="kicker">Casting Toolkit</div><h2>Built for big-screen playback</h2></div>
              <p>
                CetusCast focuses the casting flow around four practical jobs: finding
                compatible TVs, selecting media, sending it wirelessly, and keeping
                playback easy to control from the phone.
              </p>
            </Reveal>
            <div className="mission-grid" id="mission-grid">
              <article className="mission" data-id="MOD-01"><h3>DLNA Screen Link</h3><p>Connect to TVs and DLNA-compatible devices with fewer setup steps, so phone media reaches the big screen faster.</p></article>
              <article className="mission" data-id="MOD-02"><h3>Media Payload</h3><p>Cast photos, videos, and audio for family sharing, living-room playback, and everyday media viewing.</p></article>
              <article className="mission" data-id="MOD-03"><h3>Phone Control</h3><p>Browse media, start casting, and keep the playback path understandable from a familiar Android screen.</p></article>
              <article className="mission" data-id="MOD-04"><h3>Stable Stream</h3><p>Designed for smooth, reliable media streaming with less waiting between the phone and the TV.</p></article>
            </div>
          </div>
        </section>

        <section id="ops">
          <div className="shell ops">
            <Reveal className="terminal">
              <div className="terminal-head"><span>CETUSCAST / OPS LOG</span><span>ONLINE</span></div>
              <Terminal />
            </Reveal>
            <div className="preview-stack" aria-label="App screenshot preview">
              <Reveal delay={0.1} className="shot"><img src="https://picsum.photos/seed/cetuscast-shot1/270/480" alt="CetusCast app screenshot 1" /></Reveal>
              <Reveal delay={0.22} className="shot"><img src="https://picsum.photos/seed/cetuscast-shot2/270/480" alt="CetusCast app screenshot 2" /></Reveal>
              <Reveal delay={0.34} className="shot"><img src="https://picsum.photos/seed/cetuscast-shot3/270/480" alt="CetusCast app screenshot 3" /></Reveal>
            </div>
          </div>
        </section>

        <section id="safety">
          <div className="shell safety">
            <Reveal className="safety-panel">
              <div className="kicker">Data Safety Layer</div>
              <h3>Clear privacy signals</h3>
              <p>
                Based on the Google Play data safety section, CetusCast lists no
                third-party data sharing, no data collection, encrypted data in
                transit, and an available data deletion request path.
              </p>
            </Reveal>
            <div className="check-list" id="check-list">
              <div className="check">No data shared with third parties</div>
              <div className="check">No data collected</div>
              <div className="check">Data encrypted in transit</div>
              <div className="check">Deletion request available</div>
            </div>
          </div>
        </section>

        <section id="download" className="download">
          <div className="shell">
            <Reveal className="download-box">
              <div>
                <div className="kicker">Download App</div>
                <h2>Start casting to your TV</h2>
                <p>
                  Download CetusCast from Google Play and send photos, videos,
                  and audio from your phone to the big screen. The visual system is
                  cinematic; the download path stays direct.
                </p>
              </div>
              <a className="play-badge" href={PLAY_URL} target="_blank" rel="noopener noreferrer" aria-label="Get CetusCast on Google Play">
                <PlayMark />
                <span><small>GET IT ON</small><b>Google Play</b></span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="shell foot">
          <div className="foot-brand">
            <img src={ICON_URL} alt="" />
            <span>CETUSCAST / CINEMATIC CASTING WEBSITE</span>
          </div>
          <div className="foot-sig"><div className="sig-dot" /><span>CAST LINK ACTIVE</span></div>
          <div>BASED ON PUBLIC GOOGLE PLAY LISTING</div>
        </div>
      </footer>
    </>
  )
}
