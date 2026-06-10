"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValueEvent,
} from "motion/react"
import {
  Broadcast,
  Television,
  Radio,
  Images,
  WifiHigh,
  ShieldCheck,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react"
import Image from "next/image"
import { translations, type Lang, type Translations } from "./translations"

// =============================================================================
// i18n context
// =============================================================================

type LangCtx = { lang: Lang; setLang: (l: Lang) => void }
const LangContext = createContext<LangCtx>({ lang: "en", setLang: () => {} })
function useLang() { return useContext(LangContext) }
function useT(): Translations {
  const { lang } = useLang()
  return translations[lang] as unknown as Translations
}

// =============================================================================
// Static config (non-translatable: icons, styling, image seeds)
// =============================================================================

const FEATURE_STATIC = [
  {
    icon: Television,
    colSpan: "md:col-span-2 lg:col-span-2",
    bg: "bg-blue-500/8 border-blue-500/18",
    accent: "text-blue-300",
    imageSeed: "smart-tv-living-room-dark",
    showImage: true,
  },
  {
    icon: Radio,
    colSpan: "",
    bg: "bg-zinc-800/60 border-zinc-700/50",
    accent: "text-blue-400",
    showImage: false,
  },
  {
    icon: Images,
    colSpan: "",
    bg: "bg-gradient-to-br from-zinc-800/80 to-zinc-900 border-zinc-700/50",
    accent: "text-blue-400",
    showImage: false,
  },
  {
    icon: WifiHigh,
    colSpan: "",
    bg: "bg-zinc-800/60 border-zinc-700/50",
    accent: "text-blue-400",
    showImage: false,
  },
  {
    icon: ShieldCheck,
    colSpan: "",
    bg: "bg-zinc-900 border-blue-500/15",
    accent: "text-blue-400",
    showImage: false,
  },
] as const

const STEP_STATIC = [
  { num: "01", imageSeed: "wifi-home-network-router" },
  { num: "02", imageSeed: "phone-gallery-media-scroll" },
  { num: "03", imageSeed: "large-tv-screen-dark-room" },
] as const

const SHOT_SEEDS = [
  "phone-cast-device-list",
  "phone-media-file-browser",
  "phone-video-playback-ui",
  "phone-audio-music-cast",
] as const

// =============================================================================
// Primitive: fade-up scroll reveal
// =============================================================================

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// =============================================================================
// NavBar
// =============================================================================

function NavBar() {
  const [solid, setSolid] = useState(false)
  const { scrollY } = useScroll()
  const { lang, setLang } = useLang()
  const t = useT()
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 24))

  const navLinks: [string, string][] = [
    [t.nav.features, "#features"],
    [t.nav.how, "#how"],
    [t.nav.screenshots, "#screenshots"],
    [t.nav.privacy, "#privacy"],
  ]

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300 ${
        solid ? "bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between gap-6">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <span className="w-7 h-7 rounded-lg bg-blue-500 grid place-items-center">
            <Broadcast size={14} weight="fill" className="text-white" />
          </span>
          <span className="font-semibold text-[15px] tracking-tight text-zinc-50 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
            CetusCast
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: lang toggle + download CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center border border-zinc-700 rounded-lg overflow-hidden text-sm">
            {(["en", "zh"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 h-8 transition-colors ${
                  lang === l
                    ? "bg-zinc-700 text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {l === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>

          <a
            href="#download"
            className="inline-flex items-center gap-1.5 h-9 px-4 bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white text-sm font-medium rounded-lg transition-all"
          >
            {t.nav.download}
            <ArrowRight size={13} weight="bold" />
          </a>
        </div>
      </div>
    </header>
  )
}

// =============================================================================
// Hero: Asymmetric Split
// =============================================================================

function HeroSection() {
  const reduce = useReducedMotion()
  const t = useT()
  const fadeUp = (delay: number) =>
    ({
      initial: reduce ? false : { opacity: 0, y: 22 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
    }) as const

  return (
    <section className="min-h-[100dvh] flex items-center pt-16 pb-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — copy */}
        <div className="space-y-7 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
          <motion.div className="flex flex-wrap gap-2" {...fadeUp(0)}>
            {["DLNA", "AirPlay", "Android"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center h-6 px-2.5 text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.h1
            className="text-5xl lg:text-[3.5rem] font-bold tracking-tighter leading-[1.06] text-zinc-50"
            {...fadeUp(0.08)}
          >
            {t.hero.headline1}
            <br />
            <span className="text-blue-400">{t.hero.headline2}</span>
          </motion.h1>

          <motion.p
            className="text-lg text-zinc-400 leading-relaxed max-w-[38ch]"
            {...fadeUp(0.15)}
          >
            {t.hero.subtext}
          </motion.p>

          <motion.div className="flex flex-wrap gap-3 pt-1" {...fadeUp(0.22)}>
            <a
              href="#download"
              className="inline-flex items-center gap-2 h-11 px-5 bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-medium rounded-xl transition-all text-sm"
            >
              {t.hero.cta}
              <ArrowRight size={14} weight="bold" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center h-11 px-5 text-sm text-zinc-300 hover:text-zinc-50 border border-zinc-700 hover:border-zinc-500 rounded-xl transition-all"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>
        </div>

        {/* Right — phone mockup */}
        <motion.div
          className="flex justify-center lg:justify-end relative"
          initial={reduce ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-blue-500/12 blur-3xl" />
          </div>
          <div className="relative w-[240px] h-[490px] rounded-[34px] border-2 border-zinc-700 shadow-2xl overflow-hidden bg-zinc-900">
            <Image
              src="https://picsum.photos/seed/android-media-cast-phone/480/980"
              alt="CetusCast app running on Android phone"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/60" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// =============================================================================
// Protocol Strip
// =============================================================================

function ProtocolStrip() {
  const t = useT()
  return (
    <section className="border-y border-zinc-800/70 py-5 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {t.protocols.map((item) => (
            <span
              key={item}
              className="flex items-center gap-2 text-sm text-zinc-500 [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]"
            >
              <CheckCircle size={13} weight="fill" className="text-blue-500 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// Features: Bento Grid
// =============================================================================

function FeaturesGrid() {
  const t = useT()
  return (
    <section id="features" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
            {t.features.title}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-[44ch]">
            {t.features.subtitle}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
          {FEATURE_STATIC.map((feat, i) => {
            const Icon = feat.icon
            const item = t.features.items[i]
            return (
              <Reveal key={item.title} delay={i * 0.06} className={`h-full ${feat.colSpan}`}>
                <div className={`relative h-full rounded-2xl border p-6 flex flex-col justify-between overflow-hidden ${feat.bg}`}>
                  {feat.showImage && "imageSeed" in feat && feat.imageSeed && (
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                      <Image
                        src={`https://picsum.photos/seed/${feat.imageSeed}/800/440`}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Icon size={24} weight="duotone" className={`relative z-10 ${feat.accent}`} />
                  <div className="relative z-10">
                    <h3 className="font-semibold text-zinc-50 mb-1.5 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// How It Works
// =============================================================================

function HowItWorks() {
  const t = useT()
  return (
    <section id="how" className="py-24 bg-zinc-900/40">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
            {t.howItWorks.title}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEP_STATIC.map((step, i) => {
            const item = t.howItWorks.items[i]
            return (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="flex flex-col gap-5">
                  <div className="relative h-48 rounded-xl overflow-hidden bg-zinc-800">
                    <Image
                      src={`https://picsum.photos/seed/${step.imageSeed}/600/384`}
                      alt={item.title}
                      fill
                      className="object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[11px] text-zinc-500 tracking-wider [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]">
                      {step.num}
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-xs text-blue-400 mb-2 [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]">
                      {item.verb}
                    </span>
                    <h3 className="font-semibold text-zinc-50 mb-2 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// Screenshots: horizontal scroll-snap
// =============================================================================

function Screenshots() {
  const t = useT()
  return (
    <section id="screenshots" className="py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
            {t.screenshots.title}
          </h2>
        </Reveal>
      </div>

      <div
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4"
        style={{ paddingLeft: "max(1.5rem, calc((100vw - 72rem) / 2))" }}
      >
        {SHOT_SEEDS.map((seed, i) => {
          const caption = t.screenshots.captions[i]
          return (
            <Reveal key={seed} delay={i * 0.07} className="snap-start shrink-0">
              <div className="flex flex-col gap-3 w-[200px]">
                <div className="relative h-[400px] rounded-[28px] border border-zinc-700/80 overflow-hidden bg-zinc-900 shadow-lg">
                  <Image
                    src={`https://picsum.photos/seed/${seed}/400/800`}
                    alt={caption}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-500 text-center [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]">
                  {caption}
                </p>
              </div>
            </Reveal>
          )
        })}
        <div className="shrink-0 w-6" aria-hidden />
      </div>
    </section>
  )
}

// =============================================================================
// Privacy Statement
// =============================================================================

function PrivacyStatement() {
  const t = useT()
  return (
    <section id="privacy" className="py-28 bg-zinc-900/60 border-y border-zinc-800/70">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6">
            <ShieldCheck size={28} weight="duotone" className="text-blue-400" />
          </div>
        </Reveal>
        <Reveal delay={0.07}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
            {t.privacy.title1}
            <br />
            {t.privacy.title2}
          </h2>
        </Reveal>
        <Reveal delay={0.13}>
          <p className="mt-5 text-zinc-400 text-lg leading-relaxed max-w-[42ch] mx-auto">
            {t.privacy.body}
          </p>
        </Reveal>
        <Reveal delay={0.19}>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {t.privacy.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 h-8 text-sm text-zinc-300 bg-zinc-800 rounded-lg border border-zinc-700"
              >
                <CheckCircle size={13} weight="fill" className="text-blue-400" />
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// =============================================================================
// Download CTA
// =============================================================================

function DownloadCTA() {
  const t = useT()
  return (
    <section id="download" className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 min-h-[360px] flex items-center justify-center text-center px-8 py-16">
            <Image
              src="https://picsum.photos/seed/home-theater-couch-tv/1200/720"
              alt=""
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/50 to-zinc-950/85" />

            <div className="relative z-10 flex flex-col items-center gap-6 max-w-sm">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
                {t.download.title}
              </h2>
              <p className="text-zinc-400 text-base">{t.download.subtitle}</p>

              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 h-14 px-7 bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-semibold rounded-2xl transition-all text-[15px] shadow-lg shadow-blue-500/25"
              >
                <img
                  src="https://cdn.simpleicons.org/googleplay/ffffff"
                  alt="Google Play"
                  width={20}
                  height={20}
                  aria-hidden
                />
                {t.download.cta}
              </a>

              <p className="text-sm text-zinc-600 [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]">
                {t.download.footnote}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// =============================================================================
// Footer
// =============================================================================

function Footer() {
  const t = useT()
  return (
    <footer className="border-t border-zinc-800/70 py-8 mt-4">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-blue-500 grid place-items-center">
            <Broadcast size={12} weight="fill" className="text-white" />
          </span>
          <span className="text-sm font-medium text-zinc-400 [font-family:var(--font-geist-sans,Geist,system-ui,sans-serif)]">
            CetusCast
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://cast.yummbj.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            {t.footer.officialSite}
          </a>
          <a href="#privacy" className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors">
            {t.footer.privacyPolicy}
          </a>
        </div>

        <p className="text-xs text-zinc-700 [font-family:var(--font-geist-mono,'Geist_Mono',monospace)]">
          © 2024 CetusCast
        </p>
      </div>
    </footer>
  )
}

// =============================================================================
// Page export
// =============================================================================

export default function CetusCastPage() {
  const [lang, setLang] = useState<Lang>("en")

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en"
  }, [lang])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="bg-zinc-950 text-zinc-50 min-h-screen antialiased">
        <NavBar />
        <main>
          <HeroSection />
          <ProtocolStrip />
          <FeaturesGrid />
          <HowItWorks />
          <Screenshots />
          <PrivacyStatement />
          <DownloadCTA />
        </main>
        <Footer />
      </div>
    </LangContext.Provider>
  )
}
