export type Lang = "en" | "zh"

export const translations = {
  en: {
    nav: {
      features: "Features",
      how: "How It Works",
      screenshots: "Screenshots",
      privacy: "Privacy",
      download: "Download",
    },
    hero: {
      headline1: "Turn Your Phone Into",
      headline2: "a Wireless Remote",
      subtext:
        "Auto-scan your LAN for DLNA and AirPlay devices. Stream photos, videos, and music wirelessly to your TV.",
      cta: "Download on Google Play",
      ctaSecondary: "See Features",
    },
    protocols: [
      "DLNA 1.5",
      "AirPlay 2",
      "UPnP Support",
      "LAN Discovery",
      "Works Offline",
      "No Cloud Required",
    ],
    features: {
      title: "Built for Wireless Casting",
      subtitle: "From LAN scan to playback, every step kept simple.",
      items: [
        {
          title: "DLNA Casting",
          body: "Works with most smart TVs, players, and NAS devices. Instant connect, no pairing code required.",
        },
        {
          title: "AirPlay Support",
          body: "Connect to Apple TV and compatible devices for wireless audio and video streaming.",
        },
        {
          title: "Local Media",
          body: "Stream videos, audio, and photos from your device. Major formats supported, no transcoding.",
        },
        {
          title: "Auto-Discovery",
          body: "Scans your LAN automatically. No IP addresses to enter manually.",
        },
        {
          title: "Clean, No Ads",
          body: "No trackers, no pop-ups, no personal data collected. Just a clean experience.",
        },
      ],
    },
    howItWorks: {
      title: "Three Steps to Start Casting",
      items: [
        {
          verb: "Open",
          title: "Launch and Auto-Scan",
          body: "Open CetusCast and it scans your Wi-Fi for all DLNA and AirPlay-compatible devices. Usually done in seconds.",
        },
        {
          verb: "Select",
          title: "Pick Your Media",
          body: "Browse your gallery or file manager for photos, videos, or audio. Most formats work without any conversion.",
        },
        {
          verb: "Cast",
          title: "Send to the Big Screen",
          body: "Tap a device to start streaming. Control playback from your phone. No need to reach for the TV remote.",
        },
      ],
    },
    screenshots: {
      title: "A Clean, Simple Interface",
      captions: ["Device List", "Media Browser", "Playback Controls", "Music Cast"],
    },
    privacy: {
      title1: "Zero data collected.",
      title2: "Zero behavior tracked.",
      body: "CetusCast never uploads data to any server. All operations happen on your local network. Your files never leave your device.",
      tags: [
        "No account required",
        "No data uploads",
        "No third-party tracking",
        "Encrypted transfers",
      ],
    },
    download: {
      title: "Start Casting Wirelessly",
      subtitle: "Free on Android. No subscriptions. No in-app purchases.",
      cta: "Download on Google Play",
      footnote: "Android 6.0+",
    },
    footer: {
      officialSite: "Official Website",
      privacyPolicy: "Privacy Policy",
    },
  },

  zh: {
    nav: {
      features: "功能",
      how: "使用方式",
      screenshots: "截图",
      privacy: "隐私",
      download: "下载",
    },
    hero: {
      headline1: "把手机变成",
      headline2: "无线遥控器",
      subtext:
        "自动扫描局域网设备，支持 DLNA 与 AirPlay，无线投送照片、视频与音乐到大屏幕。",
      cta: "Google Play 下载",
      ctaSecondary: "查看功能",
    },
    protocols: [
      "DLNA 1.5",
      "AirPlay 2",
      "UPnP 支持",
      "局域网发现",
      "离线可用",
      "无云依赖",
    ],
    features: {
      title: "专为无线投屏而生",
      subtitle: "从局域网扫描到媒体播放，每一步都尽量简单。",
      items: [
        {
          title: "DLNA 投屏",
          body: "支持主流智能电视、播放器与 NAS，即连即用，无需配对码。",
        },
        {
          title: "AirPlay 支持",
          body: "连接 Apple TV 及兼容设备，音视频无线传输，无感切换。",
        },
        {
          title: "本地媒体",
          body: "视频、音频与照片一键投送，主流格式均支持，无需转码。",
        },
        {
          title: "自动发现",
          body: "扫描局域网，无需手动输入 IP，设备自动出现在列表中。",
        },
        {
          title: "纯净无广告",
          body: "无追踪，无弹窗，不收集任何个人数据，体验干净纯粹。",
        },
      ],
    },
    howItWorks: {
      title: "三步开始投屏",
      items: [
        {
          verb: "打开",
          title: "启动，自动扫描",
          body: "打开 CetusCast，应用扫描局域网内全部支持 DLNA 或 AirPlay 协议的设备，通常几秒内完成。",
        },
        {
          verb: "选择",
          title: "选择媒体文件",
          body: "从相册或文件管理器中选取照片、视频或音频，支持主流格式，无需转码或压缩。",
        },
        {
          verb: "投送",
          title: "发送到大屏幕",
          body: "选择目标设备后一键发送。可用手机控制播放、暂停与进度，无需再碰电视遥控器。",
        },
      ],
    },
    screenshots: {
      title: "简洁的操作界面",
      captions: ["设备列表", "媒体浏览", "播放控制", "音乐投送"],
    },
    privacy: {
      title1: "零数据收集。",
      title2: "零行为追踪。",
      body: "CetusCast 不向任何服务器上传数据。所有操作在局域网内完成，媒体文件从不离开你的设备。",
      tags: ["无账号注册", "无数据上传", "无第三方追踪", "传输加密"],
    },
    download: {
      title: "立即开始无线投屏",
      subtitle: "Android 免费下载，无订阅，无内购。",
      cta: "Google Play 下载",
      footnote: "Android 6.0+",
    },
    footer: {
      officialSite: "官方网站",
      privacyPolicy: "隐私政策",
    },
  },
} as const

export type Translations = typeof translations.en
