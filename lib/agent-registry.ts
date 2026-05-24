export type Department = 'Sales' | 'Marketing' | 'Content' | 'Customer Support' | 'Operations' | 'Executive';

export type AgentDefinition = {
  id: string;
  name: string;
  department: Department;
  sourcePath: string;
  summary: string;
  tags: string[];
  toolAccess: string[];
  memoryScope: string;
  launchStatus: 'ready';
};

export const DEPARTMENTS: Department[] = ['Sales', 'Marketing', 'Content', 'Customer Support', 'Operations', 'Executive'];

export const DEPARTMENT_TOOL_ACCESS: Record<Department, string[]> = {
  "Sales": [
    "github",
    "notion",
    "gmail",
    "calendar",
    "sheets"
  ],
  "Marketing": [
    "github",
    "notion",
    "canva",
    "gmail",
    "calendar",
    "sheets"
  ],
  "Content": [
    "github",
    "notion",
    "canva",
    "gmail"
  ],
  "Customer Support": [
    "gmail",
    "notion",
    "calendar",
    "sheets"
  ],
  "Operations": [
    "github",
    "notion",
    "calendar",
    "gmail",
    "sheets"
  ],
  "Executive": [
    "notion",
    "calendar",
    "gmail",
    "github"
  ]
};

export const DEPARTMENT_KEYWORDS: Record<Department, string[]> = {
  "Sales": [
    "lead",
    "pipeline",
    "prospect",
    "demo",
    "deal",
    "proposal",
    "qbr",
    "account",
    "close",
    "outbound"
  ],
  "Marketing": [
    "marketing",
    "performance",
    "campaign",
    "ads",
    "paid",
    "media",
    "conversion",
    "roi",
    "roas",
    "attribution"
  ],
  "Content": [
    "content",
    "copy",
    "campaign",
    "creative",
    "brand",
    "seo",
    "social",
    "video",
    "post",
    "story"
  ],
  "Customer Support": [
    "support",
    "ticket",
    "customer",
    "refund",
    "complaint",
    "issue",
    "help",
    "return",
    "escalation"
  ],
  "Operations": [
    "ops",
    "operations",
    "workflow",
    "project",
    "process",
    "launch",
    "invoice",
    "billing",
    "schedule",
    "finance"
  ],
  "Executive": [
    "executive",
    "strategy",
    "chief",
    "governance",
    "policy",
    "decision",
    "summary",
    "risk",
    "qa"
  ]
};

export const AGENT_DEFINITIONS: AgentDefinition[] = [
  {
    id: "sales-account-strategist",
    name: "Account Strategist",
    department: "Sales",
    sourcePath: "sales/sales-account-strategist.md",
    summary: "Land-and-expand account planning, QBRs, and stakeholder mapping.",
    tags: ["accounts","qbr","expansion"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-account-strategist",
    launchStatus: 'ready'
  },
  {
    id: "sales-coach",
    name: "Sales Coach",
    department: "Sales",
    sourcePath: "sales/sales-coach.md",
    summary: "Rep development, call coaching, and structured pipeline reviews.",
    tags: ["coaching","calls","pipeline"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-coach",
    launchStatus: 'ready'
  },
  {
    id: "sales-deal-strategist",
    name: "Deal Strategist",
    department: "Sales",
    sourcePath: "sales/sales-deal-strategist.md",
    summary: "MEDDPICC qualification, competitive positioning, and win planning.",
    tags: ["meddpicc","competition","win-plan"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-deal-strategist",
    launchStatus: 'ready'
  },
  {
    id: "sales-discovery-coach",
    name: "Discovery Coach",
    department: "Sales",
    sourcePath: "sales/sales-discovery-coach.md",
    summary: "Question design and discovery call structure for qualification.",
    tags: ["discovery","qualification","questions"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-discovery-coach",
    launchStatus: 'ready'
  },
  {
    id: "sales-engineer",
    name: "Sales Engineer",
    department: "Sales",
    sourcePath: "sales/sales-engineer.md",
    summary: "Technical demos, POC scoping, and competitive battlecards.",
    tags: ["demo","poC","technical"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-engineer",
    launchStatus: 'ready'
  },
  {
    id: "sales-outbound-strategist",
    name: "Outbound Strategist",
    department: "Sales",
    sourcePath: "sales/sales-outbound-strategist.md",
    summary: "Signal-based prospecting and multi-channel outbound sequences.",
    tags: ["outbound","prospecting","cadence"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-outbound-strategist",
    launchStatus: 'ready'
  },
  {
    id: "sales-pipeline-analyst",
    name: "Pipeline Analyst",
    department: "Sales",
    sourcePath: "sales/sales-pipeline-analyst.md",
    summary: "Forecasting, pipeline health, and revenue operations.",
    tags: ["forecast","pipeline","revops"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-pipeline-analyst",
    launchStatus: 'ready'
  },
  {
    id: "sales-proposal-strategist",
    name: "Proposal Strategist",
    department: "Sales",
    sourcePath: "sales/sales-proposal-strategist.md",
    summary: "RFP response, win themes, and persuasive proposal narrative.",
    tags: ["proposal","rfp","win-themes"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-proposal-strategist",
    launchStatus: 'ready'
  },
  {
    id: "sales-outreach",
    name: "Sales Outreach",
    department: "Sales",
    sourcePath: "specialized/sales-outreach.md",
    summary: "Cold prospecting, multi-touch cadences, and objection handling.",
    tags: ["cold email","outreach","objections"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-outreach",
    launchStatus: 'ready'
  },
  {
    id: "sales-data-extraction-agent",
    name: "Sales Data Extraction Agent",
    department: "Sales",
    sourcePath: "specialized/sales-data-extraction-agent.md",
    summary: "Excel monitoring and sales metric extraction.",
    tags: ["excel","metrics","data"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/sales-data-extraction-agent",
    launchStatus: 'ready'
  },
  {
    id: "data-consolidation-agent",
    name: "Data Consolidation Agent",
    department: "Sales",
    sourcePath: "specialized/data-consolidation-agent.md",
    summary: "Sales data aggregation and dashboard-ready reporting.",
    tags: ["aggregation","dashboard","data"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/data-consolidation-agent",
    launchStatus: 'ready'
  },
  {
    id: "specialized-salesforce-architect",
    name: "Salesforce Architect",
    department: "Sales",
    sourcePath: "specialized/specialized-salesforce-architect.md",
    summary: "Enterprise Salesforce architecture, org strategy, and deployment pipelines.",
    tags: ["salesforce","crm","architecture"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/specialized-salesforce-architect",
    launchStatus: 'ready'
  },
  {
    id: "government-digital-presales-consultant",
    name: "Government Digital Presales Consultant",
    department: "Sales",
    sourcePath: "specialized/government-digital-presales-consultant.md",
    summary: "China ToG presales and digital transformation proposals.",
    tags: ["presales","government","bids"],
    toolAccess: ["github","notion","gmail","calendar","sheets"],
    memoryScope: "Sales/government-digital-presales-consultant",
    launchStatus: 'ready'
  },
  {
    id: "marketing-performance-marketing-agent",
    name: "Performance Marketing Agent",
    department: "Marketing",
    sourcePath: "marketing/marketing-performance-marketing-agent.md",
    summary: "Paid acquisition, campaign optimization, ROAS tracking, and conversion growth.",
    tags: ["performance", "paid media", "roas", "conversion", "campaigns"],
    toolAccess: ["github", "notion", "canva", "gmail", "calendar", "sheets"],
    memoryScope: "Marketing/marketing-performance-marketing-agent",
    launchStatus: 'ready'
  },
  {
    id: "marketing-content-creator",
    name: "Content Creator",
    department: "Content",
    sourcePath: "marketing/marketing-content-creator.md",
    summary: "Multi-platform content strategy, copywriting, and brand storytelling.",
    tags: ["content","copy","storytelling"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-content-creator",
    launchStatus: 'ready'
  },
  {
    id: "marketing-agentic-search-optimizer",
    name: "Agentic Search Optimizer",
    department: "Content",
    sourcePath: "marketing/marketing-agentic-search-optimizer.md",
    summary: "Search strategy tuned for agentic discovery and visibility.",
    tags: ["search","visibility","discoverability"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-agentic-search-optimizer",
    launchStatus: 'ready'
  },
  {
    id: "marketing-ai-citation-strategist",
    name: "AI Citation Strategist",
    department: "Content",
    sourcePath: "marketing/marketing-ai-citation-strategist.md",
    summary: "Citation strategy for AI-generated answers and references.",
    tags: ["citation","ai search","references"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-ai-citation-strategist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-app-store-optimizer",
    name: "App Store Optimizer",
    department: "Content",
    sourcePath: "marketing/marketing-app-store-optimizer.md",
    summary: "App store copy and conversion optimization.",
    tags: ["app store","conversion","listing"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-app-store-optimizer",
    launchStatus: 'ready'
  },
  {
    id: "marketing-baidu-seo-specialist",
    name: "Baidu SEO Specialist",
    department: "Content",
    sourcePath: "marketing/marketing-baidu-seo-specialist.md",
    summary: "Baidu optimization for Chinese search visibility.",
    tags: ["seo","baidu","search"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-baidu-seo-specialist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-bilibili-content-strategist",
    name: "Bilibili Content Strategist",
    department: "Content",
    sourcePath: "marketing/marketing-bilibili-content-strategist.md",
    summary: "B站 audience growth and community-first video strategy.",
    tags: ["bilibili","video","community"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-bilibili-content-strategist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-book-co-author",
    name: "Book Co-Author",
    department: "Content",
    sourcePath: "marketing/marketing-book-co-author.md",
    summary: "Long-form thought leadership and structured book writing.",
    tags: ["book","long-form","writing"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-book-co-author",
    launchStatus: 'ready'
  },
  {
    id: "marketing-carousel-growth-engine",
    name: "Carousel Growth Engine",
    department: "Content",
    sourcePath: "marketing/marketing-carousel-growth-engine.md",
    summary: "Viral carousels and automated social publishing.",
    tags: ["carousel","social","growth"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-carousel-growth-engine",
    launchStatus: 'ready'
  },
  {
    id: "marketing-china-ecommerce-operator",
    name: "China E-commerce Operator",
    department: "Content",
    sourcePath: "marketing/marketing-china-ecommerce-operator.md",
    summary: "E-commerce operations for the China market.",
    tags: ["ecommerce","china","ops"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-china-ecommerce-operator",
    launchStatus: 'ready'
  },
  {
    id: "marketing-china-market-localization-strategist",
    name: "China Market Localization Strategist",
    department: "Content",
    sourcePath: "marketing/marketing-china-market-localization-strategist.md",
    summary: "Localization for Chinese market expansion.",
    tags: ["localization","china","market"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-china-market-localization-strategist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-cross-border-ecommerce",
    name: "Cross-border E-commerce",
    department: "Content",
    sourcePath: "marketing/marketing-cross-border-ecommerce.md",
    summary: "Cross-border commerce and go-to-market execution.",
    tags: ["ecommerce","cross-border","marketplace"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-cross-border-ecommerce",
    launchStatus: 'ready'
  },
  {
    id: "marketing-douyin-strategist",
    name: "Douyin Strategist",
    department: "Content",
    sourcePath: "marketing/marketing-douyin-strategist.md",
    summary: "Douyin growth, content hooks, and conversion.",
    tags: ["douyin","short video","growth"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-douyin-strategist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-growth-hacker",
    name: "Growth Hacker",
    department: "Content",
    sourcePath: "marketing/marketing-growth-hacker.md",
    summary: "Rapid growth experiments and funnel optimization.",
    tags: ["growth","experiments","funnel"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-growth-hacker",
    launchStatus: 'ready'
  },
  {
    id: "marketing-instagram-curator",
    name: "Instagram Curator",
    department: "Content",
    sourcePath: "marketing/marketing-instagram-curator.md",
    summary: "Visual storytelling and Instagram brand curation.",
    tags: ["instagram","visual","brand"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-instagram-curator",
    launchStatus: 'ready'
  },
  {
    id: "marketing-kuaishou-strategist",
    name: "Kuaishou Strategist",
    department: "Content",
    sourcePath: "marketing/marketing-kuaishou-strategist.md",
    summary: "Kuaishou audience growth and community engagement.",
    tags: ["kuaishou","video","growth"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-kuaishou-strategist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-linkedin-content-creator",
    name: "LinkedIn Content Creator",
    department: "Content",
    sourcePath: "marketing/marketing-linkedin-content-creator.md",
    summary: "Professional audience building and thought leadership.",
    tags: ["linkedin","b2b","content"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-linkedin-content-creator",
    launchStatus: 'ready'
  },
  {
    id: "marketing-livestream-commerce-coach",
    name: "Livestream Commerce Coach",
    department: "Content",
    sourcePath: "marketing/marketing-livestream-commerce-coach.md",
    summary: "Livestream conversion, host training, and live room optimization.",
    tags: ["livestream","conversion","host"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-livestream-commerce-coach",
    launchStatus: 'ready'
  },
  {
    id: "marketing-podcast-strategist",
    name: "Podcast Strategist",
    department: "Content",
    sourcePath: "marketing/marketing-podcast-strategist.md",
    summary: "Podcast strategy, platform optimization, and audience growth.",
    tags: ["podcast","audio","growth"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-podcast-strategist",
    launchStatus: 'ready'
  },
  {
    id: "marketing-private-domain-operator",
    name: "Private Domain Operator",
    department: "Content",
    sourcePath: "marketing/marketing-private-domain-operator.md",
    summary: "WeCom and private-traffic community operations.",
    tags: ["wechat","community","private traffic"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-private-domain-operator",
    launchStatus: 'ready'
  },
  {
    id: "marketing-reddit-community-builder",
    name: "Reddit Community Builder",
    department: "Content",
    sourcePath: "marketing/marketing-reddit-community-builder.md",
    summary: "Authentic Reddit engagement and community trust.",
    tags: ["reddit","community","engagement"],
    toolAccess: ["github","notion","canva","gmail"],
    memoryScope: "Content/marketing-reddit-community-builder",
    launchStatus: 'ready'
  },
  {
    id: "support-support-responder",
    name: "Support Responder",
    department: "Customer Support",
    sourcePath: "support/support-support-responder.md",
    summary: "Customer service, issue resolution, and escalation handling.",
    tags: ["support","tickets","escalation"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/support-support-responder",
    launchStatus: 'ready'
  },
  {
    id: "support-analytics-reporter",
    name: "Support Analytics Reporter",
    department: "Customer Support",
    sourcePath: "support/support-analytics-reporter.md",
    summary: "Support KPI tracking and analytics reporting.",
    tags: ["analytics","support","reporting"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/support-analytics-reporter",
    launchStatus: 'ready'
  },
  {
    id: "support-infrastructure-maintainer",
    name: "Infrastructure Maintainer",
    department: "Customer Support",
    sourcePath: "support/support-infrastructure-maintainer.md",
    summary: "System reliability and operations support.",
    tags: ["infra","reliability","monitoring"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/support-infrastructure-maintainer",
    launchStatus: 'ready'
  },
  {
    id: "support-executive-summary-generator",
    name: "Executive Summary Generator",
    department: "Customer Support",
    sourcePath: "support/support-executive-summary-generator.md",
    summary: "C-suite communication and strategic summaries.",
    tags: ["summary","executive","briefing"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/support-executive-summary-generator",
    launchStatus: 'ready'
  },
  {
    id: "support-finance-tracker",
    name: "Finance Tracker",
    department: "Customer Support",
    sourcePath: "support/support-finance-tracker.md",
    summary: "Support-side finance tracking and reconciliation.",
    tags: ["finance","tracking","reconciliation"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/support-finance-tracker",
    launchStatus: 'ready'
  },
  {
    id: "support-legal-compliance-checker",
    name: "Legal Compliance Checker",
    department: "Customer Support",
    sourcePath: "support/support-legal-compliance-checker.md",
    summary: "Legal and compliance checks for support workflows.",
    tags: ["legal","compliance","review"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/support-legal-compliance-checker",
    launchStatus: 'ready'
  },
  {
    id: "customer-service",
    name: "Customer Service",
    department: "Customer Support",
    sourcePath: "specialized/customer-service.md",
    summary: "Omnichannel support, complaint handling, and retention.",
    tags: ["customer","service","complaint"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/customer-service",
    launchStatus: 'ready'
  },
  {
    id: "healthcare-customer-service",
    name: "Healthcare Customer Service",
    department: "Customer Support",
    sourcePath: "specialized/healthcare-customer-service.md",
    summary: "Customer service workflows for healthcare contexts.",
    tags: ["healthcare","support","patient"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/healthcare-customer-service",
    launchStatus: 'ready'
  },
  {
    id: "hospitality-guest-services",
    name: "Hospitality Guest Services",
    department: "Customer Support",
    sourcePath: "specialized/hospitality-guest-services.md",
    summary: "Guest-service handling for hospitality operations.",
    tags: ["hospitality","guest","service"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/hospitality-guest-services",
    launchStatus: 'ready'
  },
  {
    id: "retail-customer-returns",
    name: "Retail Customer Returns",
    department: "Customer Support",
    sourcePath: "specialized/retail-customer-returns.md",
    summary: "Retail return handling and refund operations.",
    tags: ["retail","returns","refund"],
    toolAccess: ["gmail","notion","calendar","sheets"],
    memoryScope: "Customer Support/retail-customer-returns",
    launchStatus: 'ready'
  },
  {
    id: "project-management-experiment-tracker",
    name: "Experiment Tracker",
    department: "Operations",
    sourcePath: "project-management/project-management-experiment-tracker.md",
    summary: "Experiment tracking and operational follow-through.",
    tags: ["experiments","tracking","operations"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/project-management-experiment-tracker",
    launchStatus: 'ready'
  },
  {
    id: "project-management-jira-workflow-steward",
    name: "Jira Workflow Steward",
    department: "Operations",
    sourcePath: "project-management/project-management-jira-workflow-steward.md",
    summary: "Jira workflow design and queue maintenance.",
    tags: ["jira","workflow","queue"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/project-management-jira-workflow-steward",
    launchStatus: 'ready'
  },
  {
    id: "project-management-project-shepherd",
    name: "Project Shepherd",
    department: "Operations",
    sourcePath: "project-management/project-management-project-shepherd.md",
    summary: "Project execution, coordination, and handoff tracking.",
    tags: ["project","handoff","coordination"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/project-management-project-shepherd",
    launchStatus: 'ready'
  },
  {
    id: "project-management-studio-operations",
    name: "Studio Operations",
    department: "Operations",
    sourcePath: "project-management/project-management-studio-operations.md",
    summary: "Day-to-day operational excellence and process support.",
    tags: ["studio","operations","process"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/project-management-studio-operations",
    launchStatus: 'ready'
  },
  {
    id: "project-management-studio-producer",
    name: "Studio Producer",
    department: "Operations",
    sourcePath: "project-management/project-management-studio-producer.md",
    summary: "Production scheduling and delivery management.",
    tags: ["production","schedule","delivery"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/project-management-studio-producer",
    launchStatus: 'ready'
  },
  {
    id: "project-manager-senior",
    name: "Senior Project Manager",
    department: "Operations",
    sourcePath: "project-management/project-manager-senior.md",
    summary: "Senior-level project planning and governance.",
    tags: ["project management","governance","planning"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/project-manager-senior",
    launchStatus: 'ready'
  },
  {
    id: "finance-bookkeeper-controller",
    name: "Bookkeeper & Controller",
    department: "Operations",
    sourcePath: "finance/finance-bookkeeper-controller.md",
    summary: "Accounting operations, reconciliation, and controls.",
    tags: ["bookkeeping","controls","accounting"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/finance-bookkeeper-controller",
    launchStatus: 'ready'
  },
  {
    id: "finance-financial-analyst",
    name: "Financial Analyst",
    department: "Operations",
    sourcePath: "finance/finance-financial-analyst.md",
    summary: "Financial analysis and reporting for operations.",
    tags: ["financial analysis","reporting","finance"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/finance-financial-analyst",
    launchStatus: 'ready'
  },
  {
    id: "finance-fpa-analyst",
    name: "FPA Analyst",
    department: "Operations",
    sourcePath: "finance/finance-fpa-analyst.md",
    summary: "Planning, budgeting, and forecasting support.",
    tags: ["fpa","budgeting","forecasting"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/finance-fpa-analyst",
    launchStatus: 'ready'
  },
  {
    id: "finance-tax-strategist",
    name: "Tax Strategist",
    department: "Operations",
    sourcePath: "finance/finance-tax-strategist.md",
    summary: "Tax strategy and compliance planning.",
    tags: ["tax","compliance","planning"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/finance-tax-strategist",
    launchStatus: 'ready'
  },
  {
    id: "finance-investment-researcher",
    name: "Investment Researcher",
    department: "Operations",
    sourcePath: "finance/finance-investment-researcher.md",
    summary: "Investment research and market analysis.",
    tags: ["investment","research","markets"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/finance-investment-researcher",
    launchStatus: 'ready'
  },
  {
    id: "accounts-payable-agent",
    name: "Accounts Payable Agent",
    department: "Operations",
    sourcePath: "specialized/accounts-payable-agent.md",
    summary: "Invoice handling and accounts payable operations.",
    tags: ["ap","invoice","payments"],
    toolAccess: ["github","notion","calendar","gmail","sheets"],
    memoryScope: "Operations/accounts-payable-agent",
    launchStatus: 'ready'
  },
  {
    id: "specialized-chief-of-staff",
    name: "Chief of Staff",
    department: "Executive",
    sourcePath: "specialized/specialized-chief-of-staff.md",
    summary: "Executive coordination, priorities, and decision support.",
    tags: ["chief of staff","priorities","decision support"],
    toolAccess: ["notion","calendar","gmail","github"],
    memoryScope: "Executive/specialized-chief-of-staff",
    launchStatus: 'ready'
  },
  {
    id: "agentic-identity-trust",
    name: "Agentic Identity Trust",
    department: "Executive",
    sourcePath: "specialized/agentic-identity-trust.md",
    summary: "Identity, trust, and governance for agent systems.",
    tags: ["identity","trust","governance"],
    toolAccess: ["notion","calendar","gmail","github"],
    memoryScope: "Executive/agentic-identity-trust",
    launchStatus: 'ready'
  },
  {
    id: "automation-governance-architect",
    name: "Automation Governance Architect",
    department: "Executive",
    sourcePath: "specialized/automation-governance-architect.md",
    summary: "Policy design for orchestrated automation.",
    tags: ["automation","governance","policy"],
    toolAccess: ["notion","calendar","gmail","github"],
    memoryScope: "Executive/automation-governance-architect",
    launchStatus: 'ready'
  },
  {
    id: "compliance-auditor",
    name: "Compliance Auditor",
    department: "Executive",
    sourcePath: "specialized/compliance-auditor.md",
    summary: "Controls, risk review, and compliance readiness.",
    tags: ["compliance","audit","risk"],
    toolAccess: ["notion","calendar","gmail","github"],
    memoryScope: "Executive/compliance-auditor",
    launchStatus: 'ready'
  },
  {
    id: "specialized-model-qa",
    name: "Model QA",
    department: "Executive",
    sourcePath: "specialized/specialized-model-qa.md",
    summary: "Quality assurance for model behavior and outputs.",
    tags: ["qa","model","quality"],
    toolAccess: ["notion","calendar","gmail","github"],
    memoryScope: "Executive/specialized-model-qa",
    launchStatus: 'ready'
  },
  {
    id: "specialized-workflow-architect",
    name: "Workflow Architect",
    department: "Executive",
    sourcePath: "specialized/specialized-workflow-architect.md",
    summary: "Cross-team workflow architecture and orchestration.",
    tags: ["workflow","architecture","orchestration"],
    toolAccess: ["notion","calendar","gmail","github"],
    memoryScope: "Executive/specialized-workflow-architect",
    launchStatus: 'ready'
  }
];

export const AGENT_COUNT = AGENT_DEFINITIONS.length;

export function getAgentsByDepartment(department: Department) {
  return AGENT_DEFINITIONS.filter((agent) => agent.department === department);
}

export function getDepartmentCounts() {
  return DEPARTMENTS.map((department) => ({
    department,
    count: getAgentsByDepartment(department).length,
    toolAccess: DEPARTMENT_TOOL_ACCESS[department],
  }));
}

export function getAgentById(agentId: string) {
  return AGENT_DEFINITIONS.find((agent) => agent.id === agentId) ?? null;
}

export function getAgentBySourcePath(sourcePath: string) {
  return AGENT_DEFINITIONS.find((agent) => agent.sourcePath === sourcePath) ?? null;
}
