export const jobOpenings = [
    {
        id: "web-scraping-engineer-2026",
        title: "Data Solutions & Automation Engineer",
        alternativeTitle: "Web Scraping Engineer",
        department: "Technology Development",
        level: "Semi-Senior / Senior",
        location: "Bogotá, Colombia",
        locationType: "Hybrid (4 days on-site, 1 day remote)",
        contractType: "Full-time, Indefinite",
        reportsTo: "Technical Lead",
        startDate: "Immediate",
        availability: "Rotating on-call shifts for 24/7 incidents (when applicable)",

        purpose: "Design, develop, and maintain data extraction and processing solutions, and API-based backend services with security, scalability, and observability standards; while stabilizing and improving existing scraping products to ensure operational continuity and accelerate deliveries in an expanding team.",

        responsibilities: [
            "Translate business requirements into maintainable technical solutions",
            "Design resilient and cost-efficient architectures on cloud platforms",
            "Develop robust scrapers (proxy rotation, CAPTCHA handling, authentication, DOM change tolerance)",
            "Design and implement REST APIs with authentication, pagination, and security best practices",
            "Orchestrate and monitor data pipelines (scheduling, retries, alerts, logging, metrics)",
            "Normalize and transform data (ETL/ELT) and design storage schemas",
            "Reduce downtime when target sources change (self-healing capabilities)",
            "Elevate quality and performance standards (profiling, optimization, automation)",
            "Ensure compliance with Terms of Service, copyright, robots.txt, and data protection regulations",
            "Promote best practices (security, versioning, CI/CD, documentation)",
            "Conduct unit and integration testing; validate data quality",
            "Implement observability: structured logging, metrics, and traces",
            "Create technical documentation and participate in code reviews",
            "Collaborate with stakeholders and clients (Spanish/English)"
        ],

        inScope: [
            "Development of robust scrapers (proxy rotation, CAPTCHA handling, authentication, DOM change tolerance)",
            "Design/implementation of REST APIs with authentication, pagination, and security best practices",
            "Pipeline orchestration and monitoring (scheduling, retries, alerts, logging, metrics)",
            "Data normalization and transformation (ETL/ELT) and storage schema design",
            "Unit and integration testing; data quality validation",
            "Observability: structured logging, metrics, and traces",
            "Technical documentation and code reviews; collaboration with stakeholders (ES/EN)"
        ],

        outOfScope: [
            "UI/UX/front-end design beyond API endpoints and contracts",
            "Direct sales/commercial negotiation (technical support when required)",
            "On-premise physical infrastructure operation (cloud-based work)"
        ],

        technicalRequirements: {
            mustHave: [
                "Advanced Python (async, error handling, typing, packaging)",
                "Web scraping tools: Requests/HTTPX, Playwright/Selenium, BeautifulSoup/lxml, CSS/XPath selectors",
                "API development with FastAPI (or equivalent), authentication (tokens, OAuth), pagination",
                "Git (PRs, code review) and CI/CD (GitHub Actions/GitLab CI)",
                "SQL (PostgreSQL/MySQL) and NoSQL (MongoDB/Redis); modeling and performance optimization",
                "Docker; orchestration and deployment concepts (K8s desirable)",
                "Observability (structured logging, metrics, traces, and alerts)",
                "Cloud fundamentals (AWS/Azure/GCP)",
                "Advanced English (B2+/C1, oral and written)"
            ],
            niceToHave: [
                "Messaging/queues (Kafka/RabbitMQ), scheduled tasks (Celery/Arq)",
                "Data lakes/warehouses (S3/BigQuery/Snowflake) and dbt/Airbyte/Prefect",
                "Vector DBs/embeddings (FAISS/Pinecone) and LLM ops",
                "Go/Rust/Node.js for high-performance components",
                "Security (secrets management, rate limiting, OWASP)"
            ]
        },

        softSkills: [
            "Proactivity and sense of urgency; extreme ownership",
            "Analytical thinking and creative problem-solving",
            "Adaptability to frequent changes and effective prioritization",
            "Clear communication with technical and non-technical audiences",
            "Collaborative work and willingness to share knowledge",
            "Customer orientation and quality focus",
            "Continuous learning and curiosity about new tools/technologies"
        ],

        successMetrics: [
            {
                objective: "Stabilize critical scrapers",
                kpi: "Success rate / availability (%)",
                target: "≥ 99% in 60 days"
            },
            {
                objective: "Accelerate deliveries",
                kpi: "Lead time of changes / throughput",
                target: "−30% in 90 days"
            },
            {
                objective: "Data quality",
                kpi: "Validation errors per million records",
                target: "≤ 0.5 ppm"
            },
            {
                objective: "API reliability",
                kpi: "SLA/SLO (e.g., 99.5%)",
                target: "Monthly compliance"
            }
        ],

        onboardingPlan: [
            {
                period: "30 hours (1 week)",
                focus: "Technical onboarding (repos, pipelines, standards). Take ownership of 1 scraper and 1 API. Map failure points and quick wins.",
                metrics: "1 stable release; 5+ PRs; basic documentation"
            },
            {
                period: "60 hours (2 weeks)",
                focus: "Fix active scrapers. Performance improvements (profiling/optimization). Automate key tests and observability.",
                metrics: "Availability ≥95%; −20% incidents; CI tests"
            },
            {
                period: "90 hours (3 weeks)",
                focus: "Deliver architecture/orchestration improvements. Reduce change lead time. Propose quarterly roadmap.",
                metrics: "−30% lead time; SLOs met; roadmap approved"
            }
        ],

        benefits: [
            "Competitive salary",
            "Lunch bonus: $500,000 COP",
            "Uber between office and home (specific hours)",
            "$2,000 USD for training after the first year",
            "Continuous learning opportunities",
            "Google Cloud certifications paid by the company",
            "Corporate travel opportunities",
            "Office snacks",
            "Laptop and tools provided",
            "Flexible schedule with team coordination"
        ],

        selectionProcess: [
            "Resume screening and must-have checklist",
            "Technical interview with team (CEO/Coordinator) - light pair programming and scraper/API design",
            "Technical challenges: Short technical challenge (6h) with objective evaluation",
            "Online technical test",
            "DISC psychometric test",
            "Cultural and values interview (DISC profile validation, motivations, emotional stability, key competencies)",
            "Optional: External psychologist evaluation",
            "Comprehensive profile evaluation in committee",
            "References and offer"
        ],

        complianceNote: "Responsibility to comply with Terms of Service, copyright, robots.txt policies, and applicable data protection regulations (e.g., Law 1581 of 2012 in Colombia, GDPR if applicable). Escalate legal doubts before proceeding with new data sources.",

        postedDate: "2026-01-15",
        isActive: true
    },
    {
        id: "sdr-sales-development-2026",
        title: "Sales Development Representative (SDR)",
        alternativeTitle: "Business Development Representative",
        department: "Sales & Business Development",
        level: "Junior / Mid-Level",
        location: "Bogotá, Colombia / Remote",
        locationType: "Hybrid or Remote",
        contractType: "Full-time, Indefinite",
        reportsTo: "Head of Sales",
        startDate: "Immediate",
        availability: "Standard business hours with flexibility for international client time zones",

        purpose: "Drive revenue growth by identifying, qualifying, and nurturing high-quality leads for our enterprise web scraping and data solutions. Build a robust pipeline of opportunities and establish Iceberg Data as a trusted partner in the data intelligence space.",

        responsibilities: [
            "Research and identify potential clients in target industries (finance, e-commerce, real estate, market research)",
            "Conduct outbound prospecting via email, LinkedIn, and phone to generate qualified leads",
            "Qualify inbound leads from website, content marketing, and referrals",
            "Schedule discovery calls and product demonstrations for the sales team",
            "Maintain accurate records in CRM (HubSpot/Salesforce) and track all prospect interactions",
            "Collaborate with marketing to optimize lead generation campaigns and messaging",
            "Develop deep understanding of web scraping, data integration, and our technical solutions",
            "Articulate value propositions tailored to different industries and use cases",
            "Follow up with prospects through multi-touch sequences and nurture campaigns",
            "Achieve monthly/quarterly quotas for qualified meetings and pipeline generation",
            "Provide feedback to product and marketing teams based on prospect conversations",
            "Stay current on industry trends, competitor offerings, and data compliance regulations"
        ],

        inScope: [
            "Lead generation and prospecting (outbound and inbound)",
            "Lead qualification using BANT or similar frameworks",
            "Scheduling qualified meetings for Account Executives",
            "CRM management and pipeline reporting",
            "Collaboration with marketing on campaigns and messaging",
            "Initial product education and value proposition communication"
        ],

        outOfScope: [
            "Closing deals or contract negotiation (handled by Account Executives)",
            "Technical implementation or solution architecture",
            "Customer success or account management post-sale",
            "Pricing decisions or custom contract terms"
        ],

        technicalRequirements: {
            mustHave: [
                "1-3 years of experience in sales, business development, or customer-facing roles",
                "Proven track record of meeting or exceeding quotas/targets",
                "Excellent written and verbal communication skills in English (C1/C2 level)",
                "Experience with CRM platforms (HubSpot, Salesforce, or similar)",
                "Strong research and prospecting skills using LinkedIn Sales Navigator, ZoomInfo, or similar tools",
                "Ability to quickly learn and explain technical concepts to non-technical audiences",
                "Self-motivated with strong organizational and time management skills",
                "Comfortable with cold calling, email outreach, and social selling"
            ],
            niceToHave: [
                "Experience selling SaaS, data products, or technical services",
                "Familiarity with web scraping, APIs, or data integration concepts",
                "Background in B2B sales to enterprise clients",
                "Spanish language proficiency for LATAM market expansion",
                "Experience with sales engagement platforms (Outreach, SalesLoft, Apollo)",
                "Understanding of GDPR, data privacy, and compliance considerations"
            ]
        },

        softSkills: [
            "Resilience and persistence in the face of rejection",
            "Active listening and empathy to understand prospect pain points",
            "Curiosity and eagerness to learn about data and technology",
            "Collaborative mindset and willingness to share best practices",
            "Adaptability to changing strategies and market conditions",
            "Goal-oriented with a competitive drive to succeed",
            "Professional communication and relationship-building skills"
        ],

        successMetrics: [
            {
                objective: "Pipeline generation",
                kpi: "Qualified meetings booked per month",
                target: "20-30 meetings"
            },
            {
                objective: "Lead qualification",
                kpi: "Lead-to-opportunity conversion rate",
                target: "≥ 25%"
            },
            {
                objective: "Activity metrics",
                kpi: "Outbound touches (calls, emails, LinkedIn) per day",
                target: "50-80 touches"
            },
            {
                objective: "Pipeline value",
                kpi: "Total pipeline value generated quarterly",
                target: "$200K-$500K"
            }
        ],

        onboardingPlan: [
            {
                period: "Week 1-2",
                focus: "Product training, market research, and CRM setup. Shadow sales calls. Learn web scraping fundamentals and key use cases.",
                metrics: "Complete product certification; 10+ shadowed calls; CRM proficiency"
            },
            {
                period: "Week 3-4",
                focus: "Begin outbound prospecting with supervision. Practice pitch and objection handling. Book first 5 qualified meetings.",
                metrics: "5 qualified meetings booked; 200+ outbound touches; feedback sessions"
            },
            {
                period: "Month 2-3",
                focus: "Ramp up to full quota. Refine messaging based on results. Develop industry-specific expertise.",
                metrics: "15-20 meetings/month; 20% conversion rate; positive feedback from AEs"
            }
        ],

        benefits: [
            "Competitive base salary + uncapped commission structure",
            "Performance bonuses for exceeding quota",
            "Lunch allowance: $500,000 COP (for hybrid workers)",
            "Remote work flexibility with home office stipend",
            "Sales training and professional development programs",
            "Clear path to Account Executive or sales leadership roles",
            "Company rides from and to the office covered by the company",
            "Laptop and sales tools provided (LinkedIn Sales Navigator, CRM, etc.)",
            "Collaborative team environment with regular coaching"
        ],

        selectionProcess: [
            "Resume screening and initial phone screen",
            "Sales aptitude assessment and role-play exercise",
            "Behavioral interview with Sales Manager (motivation, resilience, communication)",
            "Mock prospecting call or email exercise",
            "DISC personality assessment",
            "Final interview with Head of Sales and CEO",
            "Reference checks and offer"
        ],

        complianceNote: "SDRs must adhere to data privacy regulations (GDPR, CAN-SPAM) in all outreach activities and maintain ethical sales practices aligned with company values.",

        postedDate: "2026-01-15",
        isActive: true
    }
];
