import { ServiceItem, PortfolioProject, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'custom-web-dev',
    title: 'Custom Web Dev',
    tech: 'Next.js / React / Node',
    category: 'web',
    icon: 'web',
    description: 'Ultra-fast, modular web applications built with modern component architectures and micro-frontends.',
    features: ['Server-side Rendering & Static Generation', 'Edge Middleware & Caching', 'Custom REST & GraphQL Endpoints', 'Component Design System & Storybook'],
    deliverables: ['Production-ready codebase', 'Full TypeScript coverage', 'Lighthouse 95+ audit report', 'Dockerized deployment setup'],
    metrics: '<100ms TTFB'
  },
  {
    id: 'wordpress-dev',
    title: 'WordPress Development',
    tech: 'Custom Themes / WooCommerce / Elementor',
    category: 'web',
    icon: 'wordpress',
    description: 'Custom bespoke WordPress themes, lightning-fast WooCommerce stores, ACF Gutenberg blocks, and speed hardening.',
    features: ['Custom PHP & React Gutenberg blocks', 'WooCommerce payment & shipping integrations', 'Sub-second speed optimization (Redis/WP Rocket)', 'Malware protection & security hardening'],
    deliverables: ['Custom lightweight theme codebase', 'Staging-to-production migration', 'Client handover & editing documentation'],
    metrics: '0.8s Page Load'
  },
  {
    id: 'saas-platforms',
    title: 'SaaS Platforms',
    tech: 'MERN Stack / Next.js',
    category: 'web',
    icon: 'layers',
    description: 'End-to-end multi-tenant software platforms with Stripe billing, role-based access control, and usage metering.',
    features: ['Multi-tenant database tenancy', 'Subscription billing & invoicing', 'Organization & team member invites', 'Audit logs & activity streams'],
    deliverables: ['Turnkey SaaS application', 'Admin management console', 'Stripe customer portal integration'],
    metrics: 'Enterprise-ready'
  },
  {
    id: 'mobile-apps',
    title: 'Mobile Apps',
    tech: 'React Native / Expo',
    category: 'web',
    icon: 'smartphone',
    description: 'High-performance cross-platform iOS and Android apps with 60fps animations and offline-first state.',
    features: ['Single codebase iOS & Android', 'Native modules bridging', 'Offline SQLite caching', 'Push notification pipelines (FCM/APNs)'],
    deliverables: ['App Store & Play Store ready builds', 'OTA update pipeline via EAS', 'Full Figma UI implementation'],
    metrics: '60 FPS Native'
  },
  {
    id: 'scalable-ecommerce',
    title: 'Scalable E-commerce',
    tech: 'Next.js / Medusa / Shopify',
    category: 'web',
    icon: 'shopping_cart',
    description: 'Headless Shopify, MedusaJS, and custom checkout engines built for flash sales and heavy concurrency.',
    features: ['Headless cart & inventory locking', 'Stripe, Apple Pay, PayPal checkout', 'Real-time stock reservation', 'Dynamic currency & tax calculations'],
    deliverables: ['Custom headless storefront', 'Order management webhook system', 'Cart recovery automation'],
    metrics: 'Flash-sale ready'
  },
  {
    id: 'headless-cms',
    title: 'Headless CMS',
    tech: 'Sanity / Strapi / Payload',
    category: 'web',
    icon: 'database',
    description: 'Empowering marketing teams with live previewing, visual page builders, and instant edge cache invalidation.',
    features: ['Structured content schema modeling', 'Live preview with visual editing', 'Webhook cache purge hooks', 'Asset optimization on Cloudflare'],
    deliverables: ['Tailored Sanity/Strapi studio', 'Frontend query hooks', 'Role-based editor training docs'],
    metrics: 'Instant Publish'
  },
  {
    id: 'full-stack-dashboards',
    title: 'Full-Stack Dashboards',
    tech: 'React / D3 / Tailwind',
    category: 'web',
    icon: 'dashboard',
    description: 'High-density enterprise analytics portals with real-time charting, CSV/PDF exports, and granular access.',
    features: ['Live WebSocket metrics streams', 'D3 & Recharts visual models', 'Advanced filter & facet query engines', 'Role-based data masking'],
    deliverables: ['Responsive control room interface', 'Export engine for tabular data', 'Granular RBAC user roles'],
    metrics: 'Sub-second queries'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    tech: 'Meta Ads / Google PPC / Performance',
    category: 'marketing',
    icon: 'megaphone',
    description: 'Data-driven performance marketing, high-ROI paid ad campaigns across Google & Meta, and conversion tracking.',
    features: ['Meta Pixel & Conversion API setup', 'Google Search & Performance Max campaigns', 'Hyper-targeted audience segmentation', 'A/B ad creative & copy testing'],
    deliverables: ['Live ROAS tracking dashboards', 'Weekly performance audit reports', 'Full creative ad copy & banners'],
    metrics: '4.5x Average ROAS'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Growth',
    tech: 'LinkedIn / Instagram / X / TikTok',
    category: 'marketing',
    icon: 'share_2',
    description: 'Strategic organic growth, viral content calendars, brand community building, and cross-platform multi-channel execution.',
    features: ['Monthly content calendar & strategy', 'Visual carousel & short-form video hooks', 'Community engagement & hashtag research', 'Influencer outreach & collaboration'],
    deliverables: ['30-day scheduled content grid', 'Graphic templates in Figma/Canva', 'Monthly analytics & growth reports'],
    metrics: '+250% Engagement'
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    tech: 'SEO Articles / Blogs / Web Copy',
    category: 'content',
    icon: 'pen_tool',
    description: 'High-ranking SEO articles, authority blog posts, engaging website copy, and thought-leadership content that converts.',
    features: ['In-depth keyword & competitor research', 'Search-intent optimized structure', '100% human-crafted & plagiarism-free', 'Engaging hooks & storytelling tone'],
    deliverables: ['Fully formatted Markdown/HTML articles', 'Meta tags & schema suggestions', 'Royalty-free curated visual assets'],
    metrics: 'Rank #1 Targeted'
  },
  {
    id: 'news-writing',
    title: 'News & Press Writing',
    tech: 'Journalism / Press Releases / Media',
    category: 'content',
    icon: 'newspaper',
    description: 'AP-style breaking news coverage, corporate press releases, editorial columns, and journalistic investigative reports with rapid turnaround.',
    features: ['AP Stylebook editorial standards', 'Fact-checking & primary source verification', 'Distribution-ready Press Releases', 'Urgent breaking news fast turnaround'],
    deliverables: ['Syndication-ready press releases', 'Editorial column drafts', 'Media pitch summaries'],
    metrics: 'Rapid Media Delivery'
  },
  {
    id: 'copywriting-brand',
    title: 'Brand Copywriting',
    tech: 'Landing Pages / Sales / Email Pitch',
    category: 'content',
    icon: 'feather',
    description: 'Compelling value propositions, high-converting landing page headlines, email newsletter sequences, and brand storytelling.',
    features: ['Psychological conversion triggers', 'Email nurture & launch sequences', 'Hero headline & CTA split-testing', 'Brand tone-of-voice style guide'],
    deliverables: ['High-converting copy decks', 'Email sequence templates', 'Tone-of-voice playbook'],
    metrics: '+65% Click-through'
  },
  {
    id: 'seo-architecture',
    title: 'SEO Architecture',
    tech: 'Next.js SSR/SSG',
    category: 'growth',
    icon: 'search',
    description: 'Programmatic SEO infrastructure and dynamic rendering engines for millions of indexable pages.',
    features: ['Automated dynamic OpenGraph images', 'Structured Schema.org microdata', 'Automated XML sitemaps & feeds', 'Canonical URL management'],
    deliverables: ['Programmatic page generators', 'Search Console audit pass', 'SEO metadata CMS sync'],
    metrics: '100% Crawl Rate'
  },
  {
    id: 'conversion-funnels',
    title: 'Conversion Funnels',
    tech: 'A/B Testing & CRO',
    category: 'growth',
    icon: 'filter_alt',
    description: 'High-converting interactive checkouts, lead qualification paths, and multi-variant landing flows.',
    features: ['Client-side interactive state calculators', 'Zero-friction form UX', 'A/B testing instrumentation', 'Segment & Mixpanel event tracking'],
    deliverables: ['High-converting checkout & lead forms', 'Cohort tracking dashboards', 'A/B test analysis matrix'],
    metrics: '+45% Conv Rate'
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO',
    tech: 'Core Web Vitals',
    category: 'growth',
    icon: 'insights',
    description: 'Sub-second Largest Contentful Paint (LCP), 0 Cumulative Layout Shift (CLS), and lightning Interaction to Next Paint (INP).',
    features: ['Critical CSS inlining', 'Font subsetting & self-hosting', 'Next-gen WebP/AVIF image delivery', 'Zero render-blocking scripts'],
    deliverables: ['Green Core Web Vitals across all routes', 'Lighthouse CI deployment gates', 'Asset compression pipelines'],
    metrics: '0.00 CLS'
  },
  {
    id: 'lead-funnels',
    title: 'Lead Funnels',
    tech: 'CRM & Growth Automation',
    category: 'growth',
    icon: 'group_add',
    description: 'Automated CRM syncing, smart lead scoring, calendar booking, and transactional email triggers.',
    features: ['HubSpot / Salesforce 2-way sync', 'Dynamic lead enrichment (Clearbit)', 'Automated WhatsApp & SMS notifications', 'Custom booking availability algorithms'],
    deliverables: ['End-to-end inbound pipeline', 'CRM custom field integration', 'Automated email dispatch sequences'],
    metrics: '24/7 Autopilot'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'marketlink',
    title: 'MarketLink | Farm-to-Table Grocery & Producer Network',
    description: 'A Pakistan-first online grocery marketplace and producer network connecting households directly with independent farmers, artisan bakers, and local food makers.',
    tags: ['GROCERY E-COMMERCE', 'NEXT.JS', 'PRODUCER NETWORK'],
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://marketlink-tuk9.vercel.app/',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    stats: [
      { label: 'Producer Network', value: '120+ Farms' },
      { label: 'Delivery Hubs', value: 'Pan-Pakistan' },
      { label: 'Checkout Latency', value: '<1.2s' }
    ],
    stack: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'Vercel Edge'],
    architectureOverview: 'Architected with high-density inventory caching, interactive neighborhood delivery routing, and grower catalog synchronization. Features smooth scroll-driven discovery, local produce tiering, and sub-second checkout conversion funnels.'
  },
  {
    id: 'elegant-events',
    title: 'Elegant Events Pakistan',
    description: 'A high-end event management platform for grand weddings and corporate galas. Built with a focus on visual elegance and seamless planning workflows.',
    tags: ['EVENT MANAGEMENT', 'REACT', 'TAILWIND CSS'],
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://elegant-pakistan-events.lovable.app/',
    colSpanDesktop: 'md:col-span-1 lg:col-span-1',
    stats: [
      { label: 'Booking Speed', value: '<2s' },
      { label: 'Uptime', value: '99.99%' },
      { label: 'Inquiries', value: '+320%' }
    ],
    stack: ['React 18', 'Tailwind CSS', 'Framer Motion', 'Cloudflare Edge'],
    architectureOverview: 'Crafted with micro-animations and zero-layout-shift responsive masonry galleries. Features instant booking inquiry flows, bespoke luxury color palette, and optimized image compression for lightning-fast mobile interactions.'
  },
  {
    id: 'blogvora',
    title: 'Blog Vora | Digital Trends & Editorial Publishing Platform',
    description: 'High-velocity editorial publication and digital media platform delivering expert articles, how-to guides, and trend analysis across AI, emerging technology, business, and digital innovation.',
    tags: ['DIGITAL MEDIA', 'EDITORIAL CMS', 'TECH & AI'],
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://blogvora.com/',
    colSpanDesktop: 'md:col-span-1 lg:col-span-1',
    stats: [
      { label: 'Monthly Readers', value: '85k+' },
      { label: 'Core Web Vitals', value: '98/100' },
      { label: 'Article Indexing', value: '<5min' }
    ],
    stack: ['Next.js / SSR', 'Tailwind CSS', 'Schema.org JSON-LD', 'Edge CDN', 'Headless CMS'],
    architectureOverview: 'Built for high-volume content distribution with programmatic SEO architecture, instant edge caching, dynamic OpenGraph card generation, and sub-second full-text search. Includes structured multi-category taxonomy, newsletter subscriber funnels, and zero-cumulative-layout-shift typography.'
  },
  {
    id: 'pyramid-pakistan',
    title: 'Pyramid Pakistan | Multimodal Freight & Global Logistics',
    description: 'Modern multimodal freight forwarding and logistics platform connecting air, sea, road, and warehousing with sub-minute automated rate quotes and real-time cargo container tracking.',
    tags: ['LOGISTICS & FREIGHT', 'NEXT.JS', 'GLOBAL CARGO'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://pyramidpakistan.vercel.app/',
    colSpanDesktop: 'md:col-span-2 lg:col-span-2',
    stats: [
      { label: 'Global Ports', value: '140+ Hubs' },
      { label: 'Quote Speed', value: '<60s' },
      { label: 'Tracking SLA', value: '99.8%' }
    ],
    stack: ['Next.js 14', 'Tailwind CSS', 'Framer Motion', 'Vercel Edge', 'Realtime Tracking API'],
    architectureOverview: 'Engineered with multimodal freight routing, instant rate calculation pipelines across sea and air corridors, and container milestone telemetry. Features customs clearance documentation workflows, warehousing inventory sync, and a responsive carrier quote generator.'
  },
  {
    id: 'galaxy-pharma',
    title: 'Galaxy Pharma',
    description: 'A professional pharmaceutical platform focused on world-class manufacturing, research, and global healthcare innovation.',
    tags: ['HEALTHCARE', 'PHARMA', 'MANUFACTURING'],
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://pharma-management-theta.vercel.app/#home',
    colSpanDesktop: 'md:col-span-1 lg:col-span-1',
    stats: [
      { label: 'Compliance Audit', value: 'FDA/GMP' },
      { label: 'Catalog Items', value: '4,500+' },
      { label: 'Global Regions', value: '38 Countries' }
    ],
    stack: ['Next.js 14', 'PostgreSQL', 'Algolia Search', 'Vercel Enterprise'],
    architectureOverview: 'Secure catalog with verified batch-tracking, formulation registries, and interactive molecule research exploration. Features strict regulatory compliance pipelines and encrypted dealer inquiry dispatch.'
  },
  {
    id: 'agri-bot',
    title: 'Agri-Bot | AI Agronomist',
    description: 'An advanced AI-powered crop monitoring and agronomist platform. Built for precision agriculture with real-time monitoring and intelligent data analysis.',
    tags: ['AI', 'AGRONOMY', 'PRECISION AG'],
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&auto=format&fit=crop',
    colSpanDesktop: 'md:col-span-1 lg:col-span-1',
    stats: [
      { label: 'Crop Analysis Latency', value: '450ms' },
      { label: 'Yield Accuracy', value: '96.4%' },
      { label: 'Sensor Data Stream', value: '1.2M/day' }
    ],
    stack: ['Python FastAPI', 'Next.js App Router', 'Computer Vision Models', 'PostGIS'],
    architectureOverview: 'Ingests multispectral drone imagery, satellite soil indices, and IoT moisture sensors. Runs lightweight edge inference to detect early blight, nitrogen deficiencies, and dynamic irrigation schedules.'
  },
  {
    id: 'eclat-cafe',
    title: 'Éclat Café',
    description: 'A luxury hospitality platform featuring real-time reservation systems and curated artisan experiences. Built for performance and visual elegance.',
    tags: ['HOSPITALITY', 'NEXT.JS', 'RESERVATIONS'],
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    colSpanDesktop: 'md:col-span-2 lg:col-span-1',
    stats: [
      { label: 'Table Confirmation', value: 'Instant' },
      { label: 'Peak Concurrency', value: '15k visits/hr' },
      { label: 'Average Rating', value: '4.9/5' }
    ],
    stack: ['Next.js', 'Tailwind CSS', 'Stripe Terminal', 'Supabase Realtime'],
    architectureOverview: 'Integrated table seating engine with live reservation slot syncing, dynamic tasting menu customization, and VIP sommelier booking.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'elegant-events-review',
    name: 'Zubair Malik',
    role: 'Founder & Managing Director',
    company: 'Elegant Events Pakistan',
    projectName: 'Elegant Events Pakistan',
    projectId: 'elegant-events',
    quote: 'PYRASOFT completely transformed our digital presence. The bespoke luxury aesthetic and lightning-fast booking flows resulted in a 320% surge in high-tier wedding inquiries within 90 days. Their engineering quality is truly exceptional.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCU7DU9ICC0l8dq5V00BA3hzyxSGS2i5ApvEVNQfk3PwpHvgPaz_mPnB_WbqApn-APMN3wVwPoYlfq66OAQl0Nu0QWAOadLowFm-FWe1MNDJlo3riYVKRHJqAPryHoXoCj-Gx-lHcW18OcIJwhvGM_inR6FuY6wyW71WQTdA-awwRaTe9W4TKsePhhRjTD45C06mk7VY4UAqAC-nHwTMAq2AU3ksLxjANZ-wvSxAqKsv4v6v06UlWMuw',
    rating: 5,
    tags: ['+320% Inquiries', 'React 18 & Edge', 'Sub-2s Booking']
  },
  {
    id: 'agribot-review',
    name: 'Dr. Haris Farooq',
    role: 'Chief AgTech Scientist',
    company: 'Agri-Bot Systems',
    projectName: 'Agri-Bot | AI Agronomist',
    projectId: 'agri-bot',
    quote: "Deploying our computer vision models onto PYRASOFT's edge architecture cut crop disease diagnostic latency down to 450ms. The sensor data streaming handles 1.2M daily IoT data points across remote farmlands without a single hiccup.",
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTUQiOVdzaY8EQVgrIXTGhuY5IWGf1loYAzfLVUWazHSZL9BK7Yj0287iXU0kYHoRcKQ_g2ReonpSMDr4BEAhH9u5gbM1j-ho3IFAV1zHC2UUrsamZUTgD7YRb6PD7aEv1o69eWrvQsfAGcNCmtntjXF_4Yli6e94W0C_KqPkh-LKISHcJ-BOAQ4tpBVBTQbeCtmbOBPhoohmlle90x1UMSpKJ2lDlHjJ6mHPT6tPNrbvPfRN07--1PQ',
    rating: 5,
    tags: ['450ms Edge AI', 'FastAPI & PyTorch', '1.2M Data Points/day']
  },
  {
    id: 'galaxy-pharma-review',
    name: 'Dr. Kamran Siddiqui',
    role: 'Head of Digital Systems & QA',
    company: 'Galaxy Pharma International',
    projectName: 'Galaxy Pharma',
    projectId: 'galaxy-pharma',
    quote: 'Operating across 38 global markets demands strict FDA and GMP regulatory compliance. PYRASOFT engineered a rock-solid Next.js 14 catalog and encrypted batch-tracking architecture that passed all international security audits flawlessly.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCU7DU9ICC0l8dq5V00BA3hzyxSGS2i5ApvEVNQfk3PwpHvgPaz_mPnB_WbqApn-APMN3wVwPoYlfq66OAQl0Nu0QWAOadLowFm-FWe1MNDJlo3riYVKRHJqAPryHoXoCj-Gx-lHcW18OcIJwhvGM_inR6FuY6wyW71WQTdA-awwRaTe9W4TKsePhhRjTD45C06mk7VY4UAqAC-nHwTMAq2AU3ksLxjANZ-wvSxAqKsv4v6v06UlWMuw',
    rating: 5,
    tags: ['FDA / GMP Compliance', '38 Global Markets', 'Next.js 14 Enterprise']
  },
  {
    id: 'eclat-cafe-review',
    name: 'Sophie Laurent',
    role: 'Director of Hospitality & Brand',
    company: 'Éclat Café Group',
    projectName: 'Éclat Café',
    projectId: 'eclat-cafe',
    quote: 'Our artisan dining brand required an ultra-responsive table booking engine. PYRASOFT delivered an instant real-time reservation system that easily handled 15,000+ visitors per hour during peak holiday season with 0ms perceptible lag.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTUQiOVdzaY8EQVgrIXTGhuY5IWGf1loYAzfLVUWazHSZL9BK7Yj0287iXU0kYHoRcKQ_g2ReonpSMDr4BEAhH9u5gbM1j-ho3IFAV1zHC2UUrsamZUTgD7YRb6PD7aEv1o69eWrvQsfAGcNCmtntjXF_4Yli6e94W0C_KqPkh-LKISHcJ-BOAQ4tpBVBTQbeCtmbOBPhoohmlle90x1UMSpKJ2lDlHjJ6mHPT6tPNrbvPfRN07--1PQ',
    rating: 5,
    tags: ['Instant Table Sync', '15k Concurrency', 'Supabase Realtime']
  },
  {
    id: 'pyramid-pakistan-review',
    name: 'Tariq Mansoor',
    role: 'Operations & Global Logistics Director',
    company: 'Pyramid Pakistan',
    projectName: 'Pyramid Pakistan',
    projectId: 'pyramid-pakistan',
    quote: 'PYRASOFT revolutionized our freight forwarding workflow. From instant sea and air freight quotes to seamless cargo tracking across 140+ international ports, our corporate clients experience unmatched clarity and real-time logistics oversight.',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCU7DU9ICC0l8dq5V00BA3hzyxSGS2i5ApvEVNQfk3PwpHvgPaz_mPnB_WbqApn-APMN3wVwPoYlfq66OAQl0Nu0QWAOadLowFm-FWe1MNDJlo3riYVKRHJqAPryHoXoCj-Gx-lHcW18OcIJwhvGM_inR6FuY6wyW71WQTdA-awwRaTe9W4TKsePhhRjTD45C06mk7VY4UAqAC-nHwTMAq2AU3ksLxjANZ-wvSxAqKsv4v6v06UlWMuw',
    rating: 5,
    tags: ['140+ Global Ports', 'Sub-60s Quotes', 'Real-time Telemetry']
  }
];

export const TECH_STACK_ITEMS = [
  { name: 'ReactJS', role: 'Frontend UI Library' },
  { name: 'Next.js', role: 'Full-Stack SSR & App Router' },
  { name: 'Node.js', role: 'High-Performance Backend Runtime' },
  { name: 'Laravel', role: 'Modern PHP Framework' },
  { name: 'SaaS Platforms', role: 'Cloud Software Architecture' },
  { name: 'n8n', role: 'Autonomous Workflow Automation' },
  { name: '.NET', role: 'Enterprise Backend & APIs' },
  { name: 'MySQL', role: 'Relational Database Management' },
  { name: 'Tailwind CSS', role: 'Modern Utility-First Styling' },
  { name: 'CMS Solutions', role: 'Custom & Headless Content Systems' },
  { name: 'React Native', role: 'Cross-Platform iOS & Android' },
  { name: 'Flutter', role: 'Google Multi-Platform Framework' },
  { name: 'Figma', role: 'UI/UX Interface & Prototyping' },
  { name: 'MongoDB', role: 'Scalable NoSQL Database' },
  { name: 'MERN Applications', role: 'Full-Stack Web Architectures' },
  { name: 'DevOps', role: 'CI/CD Pipelines & Cloud Infra' }
];
