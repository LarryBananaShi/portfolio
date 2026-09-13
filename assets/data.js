/*
 * Centralized profile data.
 * This is the single source of truth for the whole site — edit values here
 * and every page updates. Sourced from Larry Shi's resume.
 */
window.PROFILE = {
  name: "Larry Shi",
  role: "Computer Engineering @ Waterloo",
  tagline: "",
  location: "Waterloo, ON",
  email: "l77shi@uwaterloo.ca",
  phone: "519-722-2589",
  links: {
    github: "https://github.com/LarryBananaShi",
    linkedin: "https://www.linkedin.com/in/larry-shi-97158b327/",
  },

  // ---------------------------------------------------------------
  // PHOTO CAROUSEL (landing page)
  //   src     = image path
  //   caption = text shown underneath
  //   circle  = animated "that's me!" circle drawn over your head.
  //             { x, y, r } are PERCENTAGES of the image box (0–100):
  //               x = left→right   (0 = far left, 100 = far right)
  //               y = top→bottom   (0 = top,      100 = bottom)
  //               r = radius       (~ how big the circle is)
  //             Tune these per photo so the circle lands on your head.
  //             Omit `circle` on a photo to skip the circle for that one.
  // Add/remove/reorder entries freely; the carousel adapts.
  // ---------------------------------------------------------------
  photos: [
    { src: "assets/photos/20250607_203247.jpg", caption: "buncha lazy ce guys", circle: { x: 87, y: 65, r: 18 } },
    { src: "assets/photos/20250815_171112.jpg", caption: "geotab internship", circle: { x: 86.5, y: 32, r: 10} },
    { src: "assets/photos/20251223_132155.jpg", caption: "high school buddies + impostor", circle: { x: 62, y: 57, r: 6 } },
    { src: "assets/photos/IMG_20260402_110802_149.jpg", caption: "manulife intern group", circle: { x: 30, y: 36, r: 7 } },
    { src: "assets/photos/IMG_5841.jpg", caption: "apple fritter", circle: { x: 70, y: 37, r: 12 } },
  ],

  // Projects — shown right below About.
  projects: [
    {
      name: "SchemaSentinel",
      blurb: "data quality & discoverability engine for Google BigQuery",
      stack: "Python · SQL · BigQuery · GCP",
      details: [
        "Rules engine in BigQuery that detects anomalies — duplicate rows, null density, schema drift — across 500+ tables.",
        "Natural-language SQL agent (Gemini API + Streamlit) that finds relevant tables via chat with ~80% accuracy.",
      ],
      link: null,
    },
    {
      name: "DartVision",
      blurb: "auto-aiming computer vision dart blaster",
      stack: "Python · C · OpenCV · YOLOv12",
      details: [
        "Handheld blaster running YOLOv12 + OpenCV for real-time human tracking at 20 FPS with ~90% accuracy on moving targets.",
        "Custom dart chamber & propulsion designed in Fusion360 across 10+ prototypes.",
        "STM32 motor-control firmware in C using PWM and I2C, aligning targets in under 100ms.",
      ],
      link: null,
    },
  ],

  // Current role — shown at the top of the about list.
  current: {
    company: "Tangam Systems",
    title: "swe",
    url: "https://www.tangamgaming.com/",
    logo: "assets/logos/tangam.png",
  },

  // Experience — from the resume, newest first.
  experience: [
    {
      company: "Tangam Systems",
      title: "Software Engineer Intern",
      date: "Sept 2026 – Dec 2026",
      url: "https://www.tangamgaming.com/",
      logo: "assets/logos/tangam.png",
      points: ["Incoming Fall 2026."],
    },
    {
      company: "Manulife",
      title: "Software Engineer Intern",
      short: "swe",
      date: "Jan 2026 – Apr 2026",
      url: "https://www.manulife.com/",
      logo: "assets/logos/manulife.png",
      points: [
        "Architected an end-to-end observability platform for Manulife's Salesforce ecosystem, with a Python ETL pipeline syncing real-time event logs into Azure SQL Server.",
        "Built Power BI and New Relic dashboards tracking 20+ compliance & performance metrics, cutting mean time to error detection by 90%.",
        "Provisioned secure Azure SQL infra with Terraform, gated by a Jenkins CI/CD pipeline for secrets security and compliance.",
        "Built a Salesforce Lightning app to automate temporary production access via a tiered approval workflow using Flows.",
      ],
    },
    {
      company: "Geotab",
      title: "Software Developer Intern",
      short: "swe",
      date: "May 2025 – Aug 2025",
      url: "https://www.geotab.com/",
      logo: "assets/logos/geotab.jpg",
      points: [
        "Built scalable back-end solutions for the data intake team in C# on Google Cloud Platform.",
        "Automated REST API documentation via a CI/CD job, boosting internal endpoint discoverability by 36%, plus automated retries and deploy notifications.",
        "Created Grafana dashboards and Apache Superset SQL analytics tracking live firmware distributions across up to 1.6M vehicles.",
        "Redesigned a device-certification health check system, cutting unnecessary GKE pod restarts by 90% and surfacing dependency failures with OpenTelemetry.",
      ],
    },
    {
      company: "Xplore",
      title: "Data Engineer Intern",
      short: "data eng",
      date: "Jul 2023 – Aug 2023",
      url: "https://www.xplore.ca/",
      logo: "assets/logos/xplore.jpg",
      points: [
        "Built scalable data parsers for network log & packet data in Python, standardizing formats for downstream analytics.",
        "Engineered a custom packet-sorting algorithm with Pandas, improving throughput efficiency by 11%.",
      ],
    },
  ],

  skills: {
    Languages: "Python, C++, C#, C, SQL, Lua, Processing, VHDL",
    "Frameworks / Libraries": ".NET, Pandas, OpenCV, MediaPipe, NumPy",
    Tools: "Git, GCP, Azure, Docker, Kubernetes, Terraform, Salesforce, Power BI, New Relic, xUnit/Moq, CI/CD, REST, Agile, Jira",
  },

  education: {
    school: "University of Waterloo",
    short: "CE @ uwaterloo",
    degree: "BASc, Computer Engineering (Co-op)",
    date: "Sept 2024 – Apr 2029",
    where: "Waterloo, ON",
    url: "https://uwaterloo.ca/",
    logo: "assets/logos/uwaterloo.jpg",
  },
};
