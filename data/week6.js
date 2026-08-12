window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.week6 = [
  {
    day: 36,
    title: "Mock Exam #1 — Full Practice Test",
    subtitle: "Comprehensive Assessment across All 5 Domains",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "55 min",
    objectives: [
        "Simulate exam conditions with 50 exam-level questions",
        "Test knowledge across all domains",
        "Practice time management"
    ],
    sections: [
        {
            title: "Mock Exam Instructions",
            content: `<p>This mock exam contains 50 questions designed to simulate the real SnowPro Core Certification exam. On the actual exam, you will have 115 minutes to answer 100 questions. Try to finish this practice exam in approximately 55 minutes.</p>
            <div class="callout warning">
                <div class="callout-title">⚠️ Exam Rule Reminder</div>
                <p>On the real COF-C03 exam, there is NO going back. Once you answer a question and move to the next one, you cannot return to change your answer. However, in this practice platform, you may review your answers before submitting.</p>
            </div>
            <p><strong>Topic Distribution (approximate):</strong></p>
            <ul>
                <li>Domain 1: Snowflake AI Data Cloud Features & Architecture (15 questions)</li>
                <li>Domain 2: Account Management & Data Governance (10 questions)</li>
                <li>Domain 3: Data Loading, Unloading & Connectivity (9 questions)</li>
                <li>Domain 4: Performance Optimization, Querying & Transformation (11 questions)</li>
                <li>Domain 5: Data Collaboration (5 questions)</li>
            </ul>`
        }
    ],
    quiz: [
        {
            id: "d36q1",
            type: "single",
            question: "Which of the following layers in the Snowflake architecture is responsible for query compilation and optimization?",
            options: ["Database Storage", "Cloud Services", "Compute", "Data Catalog"],
            correct: 1,
            explanation: "The Cloud Services layer handles query parsing, compilation, optimization, access control, and metadata management."
        },
        {
            id: "d36q2",
            type: "multi",
            question: "Which editions of Snowflake provide HIPAA support? (Select TWO)",
            options: ["Standard", "Enterprise", "Business Critical", "Virtual Private Snowflake (VPS)"],
            correct: [2, 3],
            explanation: "Business Critical and VPS editions provide HIPAA support (along with PCI DSS). Enterprise and Standard do not."
        },
        {
            id: "d36q3",
            type: "single",
            question: "A company wants to load data continuously into Snowflake as soon as files land in an external S3 bucket, with minimal latency. Which feature is most appropriate?",
            options: ["COPY INTO", "Snowpipe", "External Tables", "Snowpipe Streaming"],
            correct: 1,
            explanation: "Snowpipe is designed for continuous, automated loading of files as they land in a stage."
        },
        {
            id: "d36q4",
            type: "single",
            question: "How long is the Fail-safe retention period for a permanent table in the Enterprise edition?",
            options: ["0 days", "1 day", "7 days", "Up to 90 days"],
            correct: 2,
            explanation: "Fail-safe is always exactly 7 days for permanent tables, regardless of edition. Time Travel can be up to 90 days in Enterprise."
        },
        {
            id: "d36q5",
            type: "single",
            question: "Which Snowflake object can be used to securely share data across different Snowflake accounts without copying the data?",
            options: ["Data Clean Room", "Secure Data Share", "External Table", "Materialized View"],
            correct: 1,
            explanation: "Secure Data Shares allow accounts to share data seamlessly without copying or moving it."
        },
        {
            id: "d36q6",
            type: "multi",
            question: "Which of the following are valid Snowflake table types? (Select THREE)",
            options: ["Permanent", "Temporary", "Transient", "Persistent", "Volatile"],
            correct: [0, 1, 2],
            explanation: "Snowflake supports Permanent, Temporary, and Transient tables."
        },
        {
            id: "d36q7",
            type: "single",
            question: "What is the primary purpose of the Result Cache in Snowflake?",
            options: ["To cache raw data blocks for faster compute", "To store metadata about micro-partitions", "To cache the results of previously executed queries for 24 hours", "To store session variables"],
            correct: 2,
            explanation: "The Result Cache holds the result set of queries for 24 hours. If the exact same query is run again and the underlying data hasn't changed, the result is returned from the cache."
        },
        {
            id: "d36q8",
            type: "single",
            question: "Which feature would you use to build a declarative data pipeline that automatically updates a table based on a query?",
            options: ["Tasks", "Streams", "Dynamic Tables", "Materialized Views"],
            correct: 2,
            explanation: "Dynamic Tables provide a declarative way to build data pipelines by specifying the desired result as a SQL query, and Snowflake automatically updates the table."
        },
        {
            id: "d36q9",
            type: "single",
            question: "When creating a Task in Snowflake, what is required to make the task run on a schedule?",
            options: ["A virtual warehouse", "A stream", "A cron expression or interval", "An external function"],
            correct: 2,
            explanation: "Tasks require a schedule defined by a cron expression or an interval (e.g., '5 MINUTE') to run automatically."
        },
        {
            id: "d36q10",
            type: "multi",
            question: "Which roles are considered system-defined in Snowflake? (Select TWO)",
            options: ["SYSADMIN", "DATAADMIN", "USERADMIN", "DEVELOPER"],
            correct: [0, 2],
            explanation: "SYSADMIN, USERADMIN, SECURITYADMIN, ACCOUNTADMIN, and PUBLIC are system-defined roles."
        }
    ]
  },
  {
    day: 37,
    title: "Mock Exam #1 — Detailed Review",
    subtitle: "Identify and fill knowledge gaps",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "60 min",
    objectives: [
        "Review key concepts tested in Mock Exam 1",
        "Analyze commonly missed questions",
        "Reinforce understanding of core Snowflake features"
    ],
    sections: [
        {
            title: "Domain 1 & 2 Review",
            content: `<p>Review the architecture layers. Remember that <strong>Cloud Services</strong> acts as the "brain", handling metadata and access control, while <strong>Compute</strong> is the "muscle" executing queries.</p>
            <div class="callout tip">
                <div class="callout-title">💡 Edition Differences</div>
                <p>Enterprise adds up to 90 days Time Travel, Multi-cluster warehouses, and Materialized Views. Business Critical adds HIPAA/PCI compliance and Tri-Secret Secure.</p>
            </div>`
        },
        {
            title: "Domain 3, 4 & 5 Review",
            content: `<p>Data loading nuances: COPY INTO uses virtual warehouses, while Snowpipe uses serverless compute. For transformations, understand the difference between Streams (change data capture) and Tasks (scheduled execution).</p>`
        }
    ],
    quiz: [
        {
            id: "d37q1",
            type: "single",
            question: "If a query needs to scan a massive table but only filters on a single date column, what concept helps Snowflake skip irrelevant data?",
            options: ["Result Cache", "Micro-partition pruning", "Search Optimization Service", "Secondary Indexes"],
            correct: 1,
            explanation: "Snowflake uses metadata about micro-partitions to prune (skip) partitions that do not match the filter criteria."
        }
    ]
  },
  {
    day: 38,
    title: "Rapid-Fire Review — Key Facts Across All Domains",
    subtitle: "Memorization check before the final mock exam",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "45 min",
    objectives: [
        "Recall critical exam facts quickly",
        "Differentiate between similar Snowflake concepts"
    ],
    sections: [
        {
            title: "Commonly Confused Pairs",
            content: `<table>
                <thead><tr><th>Concept A</th><th>Concept B</th><th>Difference</th></tr></thead>
                <tbody>
                    <tr><td>Time Travel</td><td>Fail-safe</td><td>Time travel is for user recovery (up to 90 days). Fail-safe is for Snowflake support recovery (7 days).</td></tr>
                    <tr><td>Scale Up</td><td>Scale Out</td><td>Scale Up = larger warehouse size (faster complex queries). Scale Out = more clusters (higher concurrency).</td></tr>
                    <tr><td>Snowpipe</td><td>Snowpipe Streaming</td><td>Snowpipe loads files from stages. Snowpipe Streaming writes rows directly via API without staging files.</td></tr>
                </tbody>
            </table>`
        }
    ],
    quiz: [
        {
            id: "d38q1",
            type: "single",
            question: "Which of the following is true regarding Fail-safe for Transient tables?",
            options: ["It is 1 day.", "It is 7 days.", "Transient tables do not have Fail-safe.", "It is configurable up to 90 days."],
            correct: 2,
            explanation: "Transient tables do not have a Fail-safe period, which is why they incur lower storage costs."
        }
    ]
  },
  {
    day: 39,
    title: "Mock Exam #2 — Full Practice Test",
    subtitle: "Final Comprehensive Assessment",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "55 min",
    objectives: [
        "Simulate exam conditions with new questions",
        "Test advanced knowledge across all domains"
    ],
    sections: [
        {
            title: "Mock Exam Instructions",
            content: `<p>This second mock exam tests edge cases, nuances, and advanced scenario-based questions that frequently appear on the actual exam.</p>`
        }
    ],
    quiz: [
        {
            id: "d39q1",
            type: "multi",
            question: "Which of the following privileges are required to create a task? (Select TWO)",
            options: ["CREATE TASK on the schema", "USAGE on the schema", "EXECUTE TASK on the account", "OWNERSHIP on the warehouse"],
            correct: [0, 2],
            explanation: "To create and run a task, you need CREATE TASK on the schema and the global EXECUTE TASK privilege."
        },
        {
            id: "d39q2",
            type: "single",
            question: "What is the billing increment for Virtual Warehouses after the first minute?",
            options: ["Per minute", "Per second", "Per hour", "Per query"],
            correct: 1,
            explanation: "Warehouses are billed per second, with a one-minute minimum each time they are resumed."
        }
    ]
  },
  {
    day: 40,
    title: "Mock Exam #2 Review",
    subtitle: "Gap Analysis and Edge Cases",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "60 min",
    objectives: [
        "Review edge cases tested in Mock Exam 2",
        "Identify specific domains needing final review"
    ],
    sections: [
        {
            title: "Gap Analysis",
            content: `<p>If you struggled with security roles, review the RBAC hierarchy. Remember that <strong>SECURITYADMIN</strong> manages grants globally, while <strong>USERADMIN</strong> is restricted to managing users and roles.</p>`
        }
    ],
    quiz: [
        {
            id: "d40q1",
            type: "single",
            question: "If a user is granted a role, but cannot see a table, what is the most likely reason?",
            options: ["They don't have USAGE on the database/schema", "The table is Transient", "The warehouse is suspended", "They need ACCOUNTADMIN"],
            correct: 0,
            explanation: "In Snowflake, you need USAGE privilege on both the parent Database and Schema to access objects within them."
        }
    ]
  },
  {
    day: 41,
    title: "Exam Day Preparation & Strategy",
    subtitle: "Logistics, Time Management, and Mindset",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "30 min",
    objectives: [
        "Understand exam logistics and format",
        "Learn test-taking strategies"
    ],
    sections: [
        {
            title: "Exam Logistics",
            content: `<p>The SnowPro Core Exam (COF-C03) consists of 100 questions. You have 115 minutes. This gives you roughly 69 seconds per question.</p>
            <div class="callout warning">
                <div class="callout-title">⚠️ No Going Back</div>
                <p>Once you answer a question, you cannot return to it. You must answer carefully before clicking Next.</p>
            </div>`
        }
    ],
    quiz: [
        {
            id: "d41q1",
            type: "single",
            question: "Are you allowed to skip questions and return to them later on the COF-C03 exam?",
            options: ["Yes, you can flag them", "No, there is no back button", "Only in testing centers, not online", "Yes, up to 10 questions"],
            correct: 1,
            explanation: "Snowflake exams do not allow you to go back to previous questions."
        }
    ]
  },
  {
    day: 42,
    title: "Final Readiness Checklist — You're Ready!",
    subtitle: "Self-Assessment and Motivation",
    domain: {
        id: 0,
        name: "Review & Mock Exams",
        color: "#66bb6a"
    },
    estimatedTime: "30 min",
    objectives: [
        "Confirm readiness with a final self-assessment",
        "Review the top 50 must-know facts"
    ],
    sections: [
        {
            title: "Final Readiness Check",
            content: `<p>Ask yourself if you can explain these concepts confidently:</p>
            <ul>
                <li>The difference between COPY INTO and Snowpipe</li>
                <li>How clustering depth impacts query performance</li>
                <li>The specific privileges needed to share data</li>
            </ul>
            <div class="callout tip">
                <div class="callout-title">🎉 Good Luck!</div>
                <p>You have put in the hard work over the past 6 weeks. Trust your preparation!</p>
            </div>`
        }
    ],
    quiz: [
        {
            id: "d42q1",
            type: "single",
            question: "Which feature is used to query data stored in an external data lake (like Amazon S3) without loading it into Snowflake?",
            options: ["External Tables", "Snowpipe", "Internal Stages", "Data Sharing"],
            correct: 0,
            explanation: "External Tables allow you to query data sitting in external cloud storage directly."
        }
    ]
  }
];
