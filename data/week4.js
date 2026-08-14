window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.week4 = [
    {
        day: 22,
        title: "Stages & File Formats",
        subtitle: "Preparing Data for Snowflake",
        domain: {
            id: 3,
            name: "Data Loading & Connectivity",
            color: "#00e5ff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the different types of Snowflake stages",
            "Differentiate between internal and external stages",
            "Learn how to use PUT and GET commands",
            "Define and use File Formats",
            "Understand Git Integrations and API Integrations"
        ],
        sections: [
            {
                title: "Understanding Stages",
                content: `<p>Before you can load data into a Snowflake table, the data files must first be available in a location that Snowflake can access. This location is called a <strong>stage</strong>.</p>
                <p>Think of a stage like a loading dock at a warehouse. Trucks (data files) pull up to the loading dock (stage), and from there, forklifts (Snowflake compute) move the boxes (rows of data) into the aisles and shelves (tables).</p>
                <div class="callout tip">
                    <div class="callout-title">💡 Key Takeaway</div>
                    <p>A stage is just a reference to a storage location (like S3, Azure Blob, or a Snowflake-managed internal location) where data files reside before they are loaded into a table.</p>
                </div>`
            },
            {
                title: "Internal vs. External Stages",
                content: `<h4>Internal Stages</h4>
                <p>Internal stages store data files internally within Snowflake. You don't need to configure cloud storage (like AWS S3) yourself; Snowflake manages it automatically under the hood.</p>
                <ul>
                    <li><strong>User Stage (<code>@~</code>):</strong> Every user gets one automatically. Useful for ad-hoc, personal data loading. Cannot be altered or dropped.</li>
                    <li><strong>Table Stage (<code>@%tablename</code>):</strong> Every table has one automatically. Good for data that only ever goes to this specific table. Cannot be altered or dropped.</li>
                    <li><strong>Named Internal Stage (<code>CREATE STAGE</code>):</strong> The most flexible. You create it as a distinct database object. Multiple tables can load data from it, and you can assign a default file format.</li>
                </ul>
                <h4>External Stages</h4>
                <p>External stages reference data stored in an external cloud storage provider, such as Amazon S3, Google Cloud Storage (GCS), or Microsoft Azure Blob Storage. Snowflake doesn't store the files; it just points to them.</p>
                <p>To securely connect Snowflake to external cloud storage without hardcoding credentials into SQL statements, you use a <strong>Storage Integration</strong>.</p>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>Remember the prefixes: <code>@~</code> is User Stage, <code>@%</code> is Table Stage, and <code>@</code> followed by a name is a Named Stage.</p>
                </div>`
            },
            {
                title: "PUT and GET Commands",
                content: `<p>How do files get into an internal stage in the first place? You use the <code>PUT</code> command. The <code>PUT</code> command uploads files from your local machine to an internal Snowflake stage.</p>
                <p>Conversely, the <code>GET</code> command downloads files from an internal stage to your local machine.</p>
                <div class="callout warning">
                    <div class="callout-title">⚠️ Common Misconception</div>
                    <p><code>PUT</code> and <code>GET</code> commands <strong>cannot</strong> be executed from the standard Snowflake Web UI (Snowsight). You must use SnowSQL (the CLI tool), the Snowflake extension for VS Code, or a supported driver (like Python or JDBC).</p>
                </div>
                <p>Also, <code>PUT</code> and <code>GET</code> only work with <strong>Internal Stages</strong>. For external stages, you upload/download files using the cloud provider's tools (like the AWS console or AWS CLI).</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>-- Uploading a file from local C: drive to a named internal stage
PUT file://C:/data/mydata.csv @my_named_stage AUTO_COMPRESS=TRUE;</code></pre>
                </div>`
            },
            {
                title: "File Formats",
                content: `<p>A <strong>File Format</strong> object tells Snowflake how to interpret the data files in a stage. Instead of typing out all the parsing rules every time you load data, you define them once as an object and reuse them.</p>
                <p>Snowflake supports several file formats natively:</p>
                <ul>
                    <li>Structured: CSV, TSV</li>
                    <li>Semi-structured: JSON, Avro, Parquet, ORC, XML</li>
                </ul>
                <p>Key options you can configure in a file format include:</p>
                <ul>
                    <li><code>COMPRESSION</code> (e.g., GZIP, BZ2)</li>
                    <li><code>FIELD_DELIMITER</code> (e.g., comma, pipe, tab)</li>
                    <li><code>SKIP_HEADER</code> (useful for CSVs with a header row)</li>
                    <li><code>STRIP_OUTER_ARRAY</code> (important for JSON loading)</li>
                </ul>`
            },
            {
                title: "Data Loading Architecture",
                content: `<p>The diagram below shows the typical paths for loading data via internal and external stages.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="400" fill="#111827" />
                        
                        <!-- Local Machine -->
                        <rect x="50" y="80" width="120" height="80" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="110" y="125" fill="#e8eaf6" text-anchor="middle" font-weight="bold">Local Machine</text>
                        
                        <!-- PUT Arrow -->
                        <line x1="170" y1="120" x2="270" y2="120" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="220" y="110" fill="#b0bec5" text-anchor="middle">PUT</text>
                        
                        <!-- Internal Stage -->
                        <rect x="270" y="80" width="160" height="80" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="350" y="115" fill="#e8eaf6" text-anchor="middle" font-weight="bold">Internal Stage</text>
                        <text x="350" y="135" fill="#b0bec5" text-anchor="middle" font-size="12">(@~, @%table, @name)</text>
                        
                        <!-- Cloud Storage -->
                        <rect x="50" y="240" width="120" height="80" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2"/>
                        <text x="110" y="275" fill="#e8eaf6" text-anchor="middle" font-weight="bold">Cloud Storage</text>
                        <text x="110" y="295" fill="#b0bec5" text-anchor="middle" font-size="12">(S3, GCS, Azure)</text>
                        
                        <!-- Direct Access Arrow -->
                        <line x1="170" y1="280" x2="270" y2="280" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="220" y="270" fill="#b0bec5" text-anchor="middle">points to</text>
                        
                        <!-- External Stage -->
                        <rect x="270" y="240" width="160" height="80" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="350" y="275" fill="#e8eaf6" text-anchor="middle" font-weight="bold">External Stage</text>
                        <text x="350" y="295" fill="#b0bec5" text-anchor="middle" font-size="12">via Storage Int.</text>
                        
                        <!-- COPY INTO arrows -->
                        <line x1="430" y1="120" x2="570" y2="180" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="500" y="140" fill="#b0bec5" text-anchor="middle" transform="rotate(25, 500, 140)">COPY INTO</text>
                        
                        <line x1="430" y1="280" x2="570" y2="220" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="500" y="260" fill="#b0bec5" text-anchor="middle" transform="rotate(-25, 500, 260)">COPY INTO</text>
                        
                        <!-- Snowflake Table -->
                        <rect x="570" y="160" width="150" height="80" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="645" y="205" fill="#e8eaf6" text-anchor="middle" font-weight="bold">Snowflake Table</text>
                        
                        <!-- Defs for arrow marker -->
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b7b8d" />
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 1: Loading flow using Internal and External Stages.</p>
                </div>`
            },
            {
                title: "Git Integration & API Integrations",
                content: `<h4>Git Integration</h4>
                <p>Snowflake can connect to Git repositories (GitHub, GitLab, Bitbucket, Azure DevOps). The primary purpose is to version-control Snowflake code (stored procedures, UDFs, Streamlit apps) and sync them with Git.</p>
                <p>Key concepts:</p>
                <ul>
                    <li><code>CREATE API INTEGRATION</code> for Git: sets up the connection credentials.</li>
                    <li><code>CREATE GIT REPOSITORY</code>: creates a Git repository stage in Snowflake. Files from Git appear as a special read-only stage that you can reference.</li>
                    <li><code>ALTER GIT REPOSITORY ... FETCH</code>: pulls the latest changes from remote.</li>
                </ul>
                <p>Use cases include CI/CD pipelines, managing code across environments, and team collaboration on Snowflake code.</p>
                <p><em>Analogy:</em> Git Integration turns your Snowflake account into a deployment target — you write code in your IDE, push to Git, and Snowflake can pull it in automatically.</p>
                <h4>API Integrations</h4>
                <p>API integrations are objects that allow Snowflake to securely call external APIs. A <code>CREATE API INTEGRATION</code> defines allowed endpoints and authentication methods.</p>
                <p>They are used for external functions, external access integrations, and Snowpark external calls. For security, API integrations restrict which URLs Snowflake can call using an allowlist approach.</p>
                <p>External Functions are UDFs that call external REST APIs (e.g., for geocoding, ML inference outside Snowflake).</p>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>Git Integration is tested on COF-C03 — know that it uses an API INTEGRATION for credentials and creates a special read-only stage-like object. You don't need to memorize exact SQL syntax.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d22q1",
                type: "single",
                question: "Which of the following commands must be run from a client tool like SnowSQL, rather than the Snowflake web UI?",
                options: ["COPY INTO", "CREATE STAGE", "PUT", "LIST"],
                correct: 2,
                explanation: "The PUT and GET commands require access to your local file system to upload/download files, which the browser-based web UI cannot do. You must use a tool like SnowSQL."
            },
            {
                id: "d22q2",
                type: "single",
                question: "Which stage type is automatically created for every table in Snowflake and cannot be modified or dropped?",
                options: ["User Stage", "Named Stage", "Table Stage", "External Stage"],
                correct: 2,
                explanation: "Every table has a default Table Stage (accessed via @%tablename). User stages belong to users, and named stages are manually created."
            },
            {
                id: "d22q3",
                type: "multi",
                question: "Which of the following are supported file formats for loading data into Snowflake? (Select TWO)",
                options: ["PDF", "Parquet", "DOCX", "JSON", "ZIP"],
                correct: [1, 3],
                explanation: "Snowflake supports structured and semi-structured formats like CSV, JSON, Parquet, Avro, ORC, and XML. It does not support unstructured documents like PDF or DOCX directly for standard table loading."
            },
            {
                id: "d22q4",
                type: "single",
                question: "What is the primary purpose of a Storage Integration in Snowflake?",
                options: ["To compress files before loading", "To provide secure access to external cloud storage without passing explicit credentials", "To automatically load data when a new file arrives", "To cache query results for external tables"],
                correct: 1,
                explanation: "A Storage Integration allows Snowflake to authenticate with external cloud storage (like S3) using IAM roles/permissions securely, avoiding the need to hardcode API keys or credentials in SQL."
            },
            {
                id: "d22q5",
                type: "single",
                question: "If you want multiple tables to load data from the same internal location, which type of stage should you use?",
                options: ["User Stage", "Table Stage", "Named Internal Stage", "External Stage"],
                correct: 2,
                explanation: "A Named Internal Stage is a distinct database object that can be referenced by any table (provided the user has usage privileges), making it ideal for sharing data across multiple load operations."
            },
            {
                id: "d22q6",
                type: "single",
                question: "What is the prefix used to denote a User Stage in Snowflake SQL?",
                options: ["@~", "@%", "@", "#"],
                correct: 0,
                explanation: "The `@~` prefix represents a User Stage. `@%` is for a Table Stage, and a simple `@` is for a Named Stage."
            },
            {
                id: "d22q7",
                type: "single",
                question: "Can you use the PUT command to upload a file directly to an External Stage (like an Amazon S3 bucket) from SnowSQL?",
                options: ["Yes", "No, PUT only works with internal stages", "Yes, but only if the file is compressed", "No, PUT is only used for downloading data"],
                correct: 1,
                explanation: "The PUT command is strictly for uploading files from a local machine to a Snowflake Internal Stage. To upload to an external stage, you must use the cloud provider's native tools (e.g., AWS CLI)."
            },
            {
                id: "d22q8",
                type: "single",
                question: "What is required to set up the connection credentials for a Git repository in Snowflake?",
                options: ["A Storage Integration", "An API Integration", "A Notification Integration", "A Security Integration"],
                correct: 1,
                explanation: "An API INTEGRATION is used to securely store the connection credentials and authentication details for external Git providers like GitHub or GitLab."
            },
            {
                id: "d22q9",
                type: "single",
                question: "How do files from a connected Git repository appear within Snowflake?",
                options: ["As a specialized table", "As an External Function", "As a read-only stage-like object", "As a set of stored procedures"],
                correct: 2,
                explanation: "When you create a GIT REPOSITORY object in Snowflake, it acts as a special read-only stage, allowing you to reference the version-controlled files directly."
            },
            {
                id: "d22q10",
                type: "single",
                question: "Which of the following is a primary use case for Snowflake API Integrations?",
                options: ["Loading data from an internal stage", "Securely calling external REST APIs for External Functions", "Replicating databases across regions", "Authenticating users via SAML SSO"],
                correct: 1,
                explanation: "API Integrations provide a secure way to call external APIs (such as those used by External Functions), utilizing an allowlist approach to restrict which URLs can be accessed."
            }
        ]
    },
    {
        day: 23,
        title: "COPY INTO — Bulk Loading",
        subtitle: "The Workhorse of Snowflake Data Loading",
        domain: {
            id: 3,
            name: "Data Loading & Connectivity",
            color: "#00e5ff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the syntax and options of COPY INTO",
            "Learn how to handle loading errors with ON_ERROR",
            "Perform basic transformations during the load process",
            "Monitor load history and metadata"
        ],
        sections: [
            {
                title: "The COPY INTO Command",
                content: `<p>The <code>COPY INTO &lt;table&gt;</code> command is Snowflake's primary mechanism for bulk loading data from a stage (internal or external) into a table. It requires an active virtual warehouse because it uses compute power to parse the files and insert the rows.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>COPY INTO my_table
FROM @my_stage
FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1)
PATTERN = '.*sales.*\\.csv'
ON_ERROR = 'SKIP_FILE';</code></pre>
                </div>
                <p>The command points to a target table, specifies the source stage, applies a file format, and uses options like <code>PATTERN</code> (a regex to filter file names) to control exactly what gets loaded.</p>`
            },
            {
                title: "Error Handling: ON_ERROR",
                content: `<p>Data files are rarely perfect. The <code>ON_ERROR</code> option determines what Snowflake does when it encounters a formatting error or data type mismatch in a file.</p>
                <ul>
                    <li><code>ABORT_STATEMENT</code>: (Default) The entire COPY command fails if even a single error is found in any file. No data is loaded.</li>
                    <li><code>CONTINUE</code>: Skip rows with errors and load the good rows.</li>
                    <li><code>SKIP_FILE</code>: If a file has an error, skip the entire file, but continue processing other files.</li>
                    <li><code>SKIP_FILE_&lt;num&gt;</code> or <code>SKIP_FILE_&lt;num&gt;%</code>: Skip the file only if the number or percentage of errors exceeds a threshold.</li>
                </ul>
                <div class="callout tip">
                    <div class="callout-title">💡 VALIDATION_MODE</div>
                    <p>If you want to test a load without actually inserting data, use <code>VALIDATION_MODE = RETURN_ERRORS</code>. It performs a dry run, parses the files, and returns a list of errors it found.</p>
                </div>`
            },
            {
                title: "Transformations During Load",
                content: `<p>Snowflake allows you to perform basic data transformations "on the fly" during a COPY INTO operation, saving you from having to load raw data into a staging table first.</p>
                <p>By using a <code>SELECT</code> statement inside the COPY command, you can:</p>
                <ul>
                    <li>Reorder columns</li>
                    <li>Omit columns</li>
                    <li>Cast data types (e.g., string to date)</li>
                    <li>Truncate strings</li>
                </ul>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>COPY INTO target_table (col1, col2)
FROM (
  SELECT $2, CAST($1 AS DATE)
  FROM @my_stage
);</code></pre>
                </div>
                <p>Here, <code>$1</code> refers to the first column in the source file, <code>$2</code> refers to the second column, etc.</p>`
            },
            {
                title: "Load History and Metadata",
                content: `<p>Snowflake tracks exactly which files have been loaded for 64 days. This prevents duplicate loading; if you run the exact same COPY INTO command twice, Snowflake won't load the same files a second time.</p>
                <p>You can view load history using:</p>
                <ul>
                    <li>The <code>COPY_HISTORY</code> table function (Information Schema)</li>
                    <li>The <code>LOAD_HISTORY</code> view (Information Schema)</li>
                </ul>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>During a load, you can capture metadata about the file itself using <code>METADATA$FILENAME</code> and <code>METADATA$FILE_ROW_NUMBER</code> and insert them into your table for auditing purposes.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d23q1",
                type: "single",
                question: "What is the default behavior of the COPY INTO command if it encounters an error in a data file?",
                options: ["CONTINUE", "SKIP_FILE", "ABORT_STATEMENT", "It prompts the user for action"],
                correct: 2,
                explanation: "The default ON_ERROR behavior is ABORT_STATEMENT. If even one error is found, the entire load operation fails and is rolled back."
            },
            {
                id: "d23q2",
                type: "single",
                question: "Which COPY INTO option performs a dry run to check for errors without actually inserting any data into the table?",
                options: ["DRY_RUN = TRUE", "VALIDATION_MODE", "ERROR_CHECK = ONLY", "ON_ERROR = REPORT"],
                correct: 1,
                explanation: "VALIDATION_MODE (e.g., VALIDATION_MODE = RETURN_ERRORS) instructs Snowflake to parse the files and return errors without loading the data."
            },
            {
                id: "d23q3",
                type: "single",
                question: "How does Snowflake refer to columns in a source data file when performing transformations during a COPY INTO statement?",
                options: ["col1, col2, col3...", "$1, $2, $3...", "A, B, C...", "file.1, file.2..."],
                correct: 1,
                explanation: "In a COPY INTO transformation SELECT statement, columns from the source file are referenced positionally using the dollar sign syntax: $1, $2, etc."
            },
            {
                id: "d23q4",
                type: "single",
                question: "If you accidentally run the exact same COPY INTO command twice on the same stage and table, what happens by default?",
                options: ["The data is loaded twice, creating duplicates.", "The command fails with a 'Files already loaded' error.", "The command succeeds, but no new data is loaded.", "The original data is overwritten."],
                correct: 2,
                explanation: "Snowflake maintains load history for 64 days based on file names and checksums. If you run the command again, Snowflake ignores files that have already been loaded successfully, so it succeeds but loads zero new rows."
            },
            {
                id: "d23q5",
                type: "multi",
                question: "Which of the following are valid transformations you can perform directly within a COPY INTO command? (Select TWO)",
                options: ["Joining data with another table", "Reordering columns", "Aggregating data (SUM, AVG)", "Casting data types"],
                correct: [1, 3],
                explanation: "COPY INTO transformations are limited to basic row-level operations like omitting/reordering columns, casting types, and string truncation. Complex operations like JOINs or Aggregations are not supported."
            },
            {
                id: "d23q6",
                type: "single",
                question: "Which metadata column can you select during a COPY INTO load to capture the name of the file the row came from?",
                options: ["METADATA$SOURCE", "SYSTEM$FILE_NAME", "METADATA$FILENAME", "$FILE_PATH"],
                correct: 2,
                explanation: "METADATA$FILENAME captures the name (and path) of the stage file, and METADATA$FILE_ROW_NUMBER captures the row's position in that file."
            },
            {
                id: "d23q7",
                type: "single",
                question: "Which option allows you to use a regular expression to filter which files in a stage should be loaded?",
                options: ["FILTER", "REGEX", "FILES", "PATTERN"],
                correct: 3,
                explanation: "The PATTERN option in the COPY INTO command takes a regular expression string to match specific file names in the stage."
            },
            {
                id: "d23q8",
                type: "single",
                question: "What is the recommended file size range for optimal data loading performance in Snowflake?",
                options: ["1-10 MB", "100-250 MB compressed", "1-2 GB uncompressed", "Over 5 GB"],
                correct: 1,
                explanation: "Snowflake recommends sizing data files between 100 MB and 250 MB compressed for optimal parallel loading performance across the virtual warehouse."
            }
        ]
    },
    {
        day: 24,
        title: "Snowpipe & Streaming",
        subtitle: "Continuous Data Ingestion",
        domain: {
            id: 3,
            name: "Data Loading & Connectivity",
            color: "#00e5ff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the concept and use case of Snowpipe",
            "Differentiate between bulk loading and continuous loading",
            "Learn how Snowpipe billing and compute works",
            "Introduce Snowpipe Streaming and its differences from standard Snowpipe"
        ],
        sections: [
            {
                title: "What is Snowpipe?",
                content: `<p>While <code>COPY INTO</code> is great for scheduled, batch bulk loads, modern applications often require data to be available for analysis within minutes of it arriving. This is where <strong>Snowpipe</strong> comes in.</p>
                <p>Snowpipe is Snowflake's continuous, automated data ingestion service. It allows you to load data in micro-batches as soon as files are staged, rather than waiting for a large scheduled batch job.</p>
                <div class="callout tip">
                    <div class="callout-title">💡 Serverless Compute</div>
                    <p>Unlike COPY INTO, which requires an active Virtual Warehouse that you manage, Snowpipe is <strong>serverless</strong>. Snowflake manages the compute resources used by Snowpipe automatically, scaling them up and down based on the incoming file volume.</p>
                </div>`
            },
            {
                title: "How Snowpipe Auto-Ingest Works",
                content: `<p>The most common way to use Snowpipe is via Auto-Ingest from cloud storage.</p>
                <ol>
                    <li>A source system writes a data file to a cloud bucket (e.g., S3).</li>
                    <li>The cloud provider generates an Event Notification (e.g., SQS or EventGrid) saying "a new file arrived."</li>
                    <li>Snowpipe receives this notification, grabs the file, and loads it into the target table using background compute.</li>
                </ol>
                <p>Because Snowpipe uses serverless compute, billing is different. You are billed based on the actual compute time used to load the files, plus a small per-file overhead charge.</p>`
            },
            {
                title: "Snowpipe Streaming (New in COF-C03)",
                content: `<p><strong>Snowpipe Streaming</strong> is a newer feature that bypasses staging files entirely. Using the Snowflake Ingest SDK, custom applications (like Kafka connectors or custom Java apps) can stream rows of data <em>directly</em> into Snowflake tables.</p>
                <ul>
                    <li><strong>Standard Snowpipe:</strong> App writes a file to S3 -> S3 triggers Snowpipe -> Snowpipe loads file to table.</li>
                    <li><strong>Snowpipe Streaming:</strong> App writes rows directly to the table memory buffer over an API.</li>
                </ul>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>If a scenario mentions lower latency (sub-second or low seconds) and direct streaming without creating stage files, the answer is Snowpipe Streaming.</p>
                </div>`
            },
            {
                title: "Loading Architecture Comparison",
                content: `<p>Compare the flow of Standard Snowpipe and Snowpipe Streaming:</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="450" fill="#111827" />
                        
                        <!-- Title Standard -->
                        <text x="400" y="40" fill="#e8eaf6" text-anchor="middle" font-size="18" font-weight="bold">Standard Snowpipe (Auto-Ingest)</text>
                        
                        <!-- Source App -->
                        <rect x="50" y="70" width="100" height="60" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="100" y="105" fill="#e8eaf6" text-anchor="middle">Source App</text>
                        
                        <!-- S3 Bucket -->
                        <rect x="220" y="70" width="100" height="60" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2"/>
                        <text x="270" y="95" fill="#e8eaf6" text-anchor="middle">Cloud Bucket</text>
                        <text x="270" y="115" fill="#b0bec5" text-anchor="middle" font-size="12">(Files)</text>
                        
                        <!-- Event Notification -->
                        <rect x="390" y="70" width="100" height="60" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="440" y="95" fill="#e8eaf6" text-anchor="middle">Event Queue</text>
                        <text x="440" y="115" fill="#b0bec5" text-anchor="middle" font-size="12">(e.g. SQS)</text>
                        
                        <!-- Snowpipe Compute -->
                        <rect x="540" y="70" width="100" height="60" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="590" y="95" fill="#e8eaf6" text-anchor="middle">Snowpipe</text>
                        <text x="590" y="115" fill="#b0bec5" text-anchor="middle" font-size="12">(Serverless)</text>
                        
                        <!-- Table -->
                        <rect x="680" y="70" width="90" height="60" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="725" y="105" fill="#e8eaf6" text-anchor="middle">Table</text>
                        
                        <!-- Arrows Standard -->
                        <line x1="150" y1="100" x2="220" y2="100" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <line x1="320" y1="100" x2="390" y2="100" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)" stroke-dasharray="4"/>
                        <line x1="490" y1="100" x2="540" y2="100" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <line x1="640" y1="100" x2="680" y2="100" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Divider -->
                        <line x1="50" y1="200" x2="750" y2="200" stroke="#333" stroke-width="2" stroke-dasharray="10"/>
                        
                        <!-- Title Streaming -->
                        <text x="400" y="250" fill="#e8eaf6" text-anchor="middle" font-size="18" font-weight="bold">Snowpipe Streaming</text>
                        
                        <!-- Source App with SDK -->
                        <rect x="50" y="290" width="160" height="80" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="130" y="325" fill="#e8eaf6" text-anchor="middle">Source App</text>
                        <text x="130" y="345" fill="#00e5ff" text-anchor="middle" font-size="12">+ Snowflake Ingest SDK</text>
                        
                        <!-- Streaming API -->
                        <rect x="350" y="290" width="140" height="80" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="420" y="325" fill="#e8eaf6" text-anchor="middle">Streaming API</text>
                        <text x="420" y="345" fill="#b0bec5" text-anchor="middle" font-size="12">(Direct Channel)</text>
                        
                        <!-- Table -->
                        <rect x="650" y="290" width="120" height="80" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="710" y="335" fill="#e8eaf6" text-anchor="middle">Table</text>
                        
                        <!-- Arrows Streaming -->
                        <line x1="210" y1="330" x2="350" y2="330" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrow)"/>
                        <text x="280" y="320" fill="#b0bec5" text-anchor="middle" font-size="12">Row batches</text>
                        
                        <line x1="490" y1="330" x2="650" y2="330" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrow)"/>
                        
                        <!-- Defs for arrow marker -->
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b7b8d" />
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 2: Comparing Snowpipe Auto-ingest (file-based) vs Snowpipe Streaming (row-based).</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d24q1",
                type: "single",
                question: "Which compute resources are used by default when data is loaded via standard Snowpipe?",
                options: ["The active Virtual Warehouse of the user", "Serverless compute provided by Snowflake", "The Cloud Service layer only", "A dedicated compute cluster that you must create beforehand"],
                correct: 1,
                explanation: "Snowpipe is a serverless feature. Snowflake manages and provisions the compute resources required to run the load operations automatically in the background."
            },
            {
                id: "d24q2",
                type: "single",
                question: "How is standard Snowpipe billed?",
                options: ["Based on the uptime of the pipe", "A flat monthly fee", "Based on the serverless compute time used plus a per-file overhead charge", "Only based on the gigabytes of data loaded"],
                correct: 2,
                explanation: "Snowpipe billing is based primarily on the actual compute time used by the serverless resources to load the data, along with a small per-file overhead charge."
            },
            {
                id: "d24q3",
                type: "single",
                question: "What is the key mechanism that triggers standard Snowpipe auto-ingest when a new file arrives in an external stage?",
                options: ["A scheduled cron job in Snowflake", "Cloud provider Event Notifications (e.g., SQS, EventGrid)", "The GET command", "Snowflake polling the bucket every 1 minute"],
                correct: 1,
                explanation: "Auto-ingest relies on the cloud provider (AWS, Azure, GCP) sending an event notification queue message to Snowflake the moment a file is written to the bucket."
            },
            {
                id: "d24q4",
                type: "single",
                question: "Which of the following is a key difference between standard Snowpipe and Snowpipe Streaming?",
                options: ["Streaming requires a Virtual Warehouse, standard Snowpipe does not", "Streaming inserts rows directly into tables without needing staging files", "Standard Snowpipe has lower latency than Streaming", "Streaming can only be used with internal stages"],
                correct: 1,
                explanation: "Snowpipe Streaming bypasses the need for staging files in cloud storage. The application uses the SDK to send rows of data directly to Snowflake."
            },
            {
                id: "d24q5",
                type: "single",
                question: "Which command would you use to check if a specific pipe is currently running or paused?",
                options: ["SHOW PIPES", "SYSTEM$PIPE_STATUS", "DESCRIBE PIPE", "SELECT * FROM PIPE_HISTORY"],
                correct: 1,
                explanation: "The SYSTEM$PIPE_STATUS('pipe_name') function returns a JSON object containing the current execution status of the specified pipe."
            },
            {
                id: "d24q6",
                type: "single",
                question: "When should you prefer bulk loading (COPY INTO) over Snowpipe?",
                options: ["When loading continuous IoT sensor data", "When you want to load data using serverless compute", "When you have a scheduled nightly batch load of 10GB of data", "When latency needs to be in seconds"],
                correct: 2,
                explanation: "Bulk loading with COPY INTO using a dedicated warehouse is generally more cost-effective for large, scheduled batch loads. Snowpipe is intended for continuous, micro-batch loading."
            },
            {
                id: "d24q7",
                type: "multi",
                question: "Which of the following cloud storage platforms support standard Snowpipe auto-ingest? (Select THREE)",
                options: ["Amazon S3", "On-Premises Hadoop", "Google Cloud Storage", "Microsoft Azure Blob", "FTP Server"],
                correct: [0, 2, 3],
                explanation: "Snowflake supports external stages and auto-ingest notifications from the three major cloud providers: AWS (S3), GCP (GCS), and Azure (Blob/ADLS)."
            }
        ]
    },
    {
        day: 25,
        title: "Data Unloading",
        subtitle: "Exporting Data Out of Snowflake",
        domain: {
            id: 3,
            name: "Data Loading & Connectivity",
            color: "#00e5ff"
        },
        estimatedTime: "60 min",
        objectives: [
            "Use COPY INTO to unload data",
            "Understand unloading options like SINGLE and MAX_FILE_SIZE",
            "Learn how to partition unloaded data"
        ],
        sections: [
            {
                title: "Unloading Data",
                content: `<p>Just as you use <code>COPY INTO &lt;table&gt;</code> to load data, you use the exact same command in reverse, <code>COPY INTO &lt;location&gt;</code>, to extract (unload) data from a Snowflake table to a stage.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>COPY INTO @my_export_stage/sales_data/
FROM sales_table
FILE_FORMAT = (TYPE = 'CSV' HEADER = TRUE);</code></pre>
                </div>
                <p>Instead of a table name, the source can also be a <code>SELECT</code> statement, allowing you to filter or transform the data before it leaves Snowflake.</p>`
            },
            {
                title: "Key Unloading Options",
                content: `<p>When unloading data, Snowflake utilizes the Virtual Warehouse to process the request and write the files in parallel. Because of this parallel architecture, Snowflake naturally writes multiple files.</p>
                <ul>
                    <li><code>SINGLE = TRUE | FALSE</code>: By default, Snowflake writes multiple files. If you set <code>SINGLE = TRUE</code>, it forces Snowflake to write all data into one single file. (Warning: This limits performance).</li>
                    <li><code>MAX_FILE_SIZE</code>: If writing multiple files, this sets an upper limit on the size of each file.</li>
                    <li><code>HEADER = TRUE</code>: Commonly used with CSV exports to include the column names as the first row.</li>
                    <li><code>OVERWRITE = TRUE</code>: Overwrites existing files in the stage with the same name.</li>
                </ul>`
            },
            {
                title: "Partitioning Unloaded Data",
                content: `<p>A powerful feature of data unloading is partitioning. You can automatically organize the exported files into a folder structure based on column values.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>COPY INTO @my_export_stage/sales/
FROM sales_table
PARTITION BY ('year=' || EXTRACT(year FROM sale_date) || '/month=' || EXTRACT(month FROM sale_date));</code></pre>
                </div>
                <p>This would create dynamic folders in your stage like: <code>sales/year=2023/month=10/data_0_0_0.csv.gz</code>.</p>
                <div class="callout warning">
                    <div class="callout-title">⚠️ Compression Default</div>
                    <p>By default, Snowflake compresses unloaded files using GZIP (except for Parquet, which uses Snappy). You must explicitly set <code>COMPRESSION = NONE</code> in your file format if you want uncompressed text files.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d25q1",
                type: "single",
                question: "What is the command used to export data from a Snowflake table to an external stage?",
                options: ["EXPORT TO", "COPY INTO <location>", "UNLOAD FROM", "INSERT OVERWRITE"],
                correct: 1,
                explanation: "The COPY INTO command is used for both loading (COPY INTO <table>) and unloading (COPY INTO <location>)."
            },
            {
                id: "d25q2",
                type: "single",
                question: "By default, when unloading data to a stage, what does Snowflake do?",
                options: ["Writes a single, uncompressed CSV file", "Writes multiple compressed files in parallel", "Prompts for a filename", "Writes to the user's local hard drive"],
                correct: 1,
                explanation: "Because Snowflake uses parallel processing via Virtual Warehouses, its default behavior is to write out multiple files (chunked) and compress them (usually GZIP)."
            },
            {
                id: "d25q3",
                type: "single",
                question: "Which option should you use if you absolutely require the unloaded data to be contained in one specific file?",
                options: ["MERGE = TRUE", "ONE_FILE = YES", "SINGLE = TRUE", "PARALLEL = FALSE"],
                correct: 2,
                explanation: "The SINGLE = TRUE option forces Snowflake to funnel all output into a single file. This is generally discouraged for large datasets as it breaks parallel processing."
            },
            {
                id: "d25q4",
                type: "single",
                question: "Which feature allows you to dynamically create a directory structure in your stage based on the values of the data being unloaded?",
                options: ["DIRECTORY BY", "FOLDER GROUP", "PARTITION BY", "CLUSTER BY"],
                correct: 2,
                explanation: "The PARTITION BY copy option allows you to construct dynamic paths (like year=2023/region=EU/) based on expressions evaluated on the rows being unloaded."
            },
            {
                id: "d25q5",
                type: "single",
                question: "Can you run a SELECT query and unload only the results, rather than an entire table?",
                options: ["Yes, by using COPY INTO <location> FROM (SELECT ...)", "No, you must create a view first", "No, COPY INTO only works with full tables", "Yes, but only for internal stages"],
                correct: 0,
                explanation: "Yes, the source of a COPY INTO <location> command can be a valid SELECT statement, allowing you to filter, join, and transform data before exporting."
            }
        ]
    },
    {
        day: 26,
        title: "Virtual Warehouses",
        subtitle: "Compute & Performance Deep Dive",
        domain: {
            id: 4,
            name: "Performance & Transformation",
            color: "#ffa726"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand warehouse sizing (Scale Up)",
            "Understand multi-cluster warehouses (Scale Out)",
            "Configure Auto-suspend and Auto-resume",
            "Monitor warehouse performance"
        ],
        sections: [
            {
                title: "Warehouse Sizing: Scaling Up",
                content: `<p>A Virtual Warehouse is a cluster of compute resources (CPU, memory, temporary storage) in Snowflake. They come in T-Shirt sizes: X-Small, Small, Medium, Large, X-Large, etc.</p>
                <p>Every time you go up a size, the compute power <strong>doubles</strong>, and the credit consumption per hour also <strong>doubles</strong>.</p>
                <p><strong>Scaling Up</strong> means changing a warehouse from a smaller size to a larger size. You do this when queries are running too slowly or when processing massive amounts of data. A larger warehouse processes a complex query faster because it divides the work across more servers.</p>
                <div class="callout tip">
                    <div class="callout-title">💡 Fast Resizing</div>
                    <p>You can resize a warehouse instantly using <code>ALTER WAREHOUSE</code>, even while it's running queries. New queries will use the new size; running queries will finish on the old compute nodes.</p>
                </div>`
            },
            {
                title: "Multi-Cluster Warehouses: Scaling Out",
                content: `<p>What happens if you have a fast query, but suddenly 500 users log in and try to run it at the same time? A single warehouse, no matter how large, might queue the queries. You don't need a <em>larger</em> warehouse; you need <em>more</em> warehouses of the same size.</p>
                <p><strong>Scaling Out</strong> uses Multi-cluster Warehouses (available in Enterprise edition and higher). You set a Minimum and Maximum number of clusters.</p>
                <ul>
                    <li><strong>Maximized Mode:</strong> Min = Max. If set to 3, Snowflake starts all 3 clusters immediately.</li>
                    <li><strong>Auto-scale Mode:</strong> Min < Max (e.g., Min=1, Max=3). Snowflake starts with 1 cluster and automatically spins up additional clusters (up to the max) <em>only</em> when queries start queuing. It shuts them down when demand drops.</li>
                </ul>
                <p>Scaling policies govern Auto-scale:</p>
                <ul>
                    <li><strong>Standard:</strong> Spins up a new cluster immediately when queuing occurs. (Favors Performance)</li>
                    <li><strong>Economy:</strong> Waits to see if the system estimates there is enough queued load to keep a new cluster busy for at least 6 minutes before starting it. (Favors Cost)</li>
                </ul>`
            },
            {
                title: "Auto-Suspend and Auto-Resume",
                content: `<p>To save money, warehouses shouldn't run when no one is using them. You pay per second of compute time (with a 60-second minimum each time it starts).</p>
                <ul>
                    <li><strong>Auto-suspend:</strong> Automatically shuts down the warehouse after it has been idle for a specified number of minutes.</li>
                    <li><strong>Auto-resume:</strong> Automatically wakes the warehouse up the moment a new query is submitted.</li>
                </ul>`
            },
            {
                title: "Scale Up vs Scale Out Architecture",
                content: `<p>The diagram below visualizes the difference between scaling up for complexity vs scaling out for concurrency.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="400" fill="#111827" />
                        
                        <!-- Left side: Scale Up -->
                        <text x="200" y="40" fill="#e8eaf6" text-anchor="middle" font-size="18" font-weight="bold">Scale Up (Larger Size)</text>
                        <text x="200" y="60" fill="#b0bec5" text-anchor="middle" font-size="14">Fixes slow complex queries</text>
                        
                        <rect x="150" y="90" width="100" height="60" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="200" y="125" fill="#e8eaf6" text-anchor="middle">X-Small</text>
                        
                        <line x1="200" y1="160" x2="200" y2="190" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <rect x="100" y="200" width="200" height="120" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="200" y="250" fill="#e8eaf6" text-anchor="middle" font-weight="bold" font-size="18">Large</text>
                        <text x="200" y="275" fill="#b0bec5" text-anchor="middle" font-size="12">(More CPU/Memory per query)</text>
                        
                        <!-- Divider -->
                        <line x1="400" y1="20" x2="400" y2="380" stroke="#333" stroke-width="2" stroke-dasharray="10"/>
                        
                        <!-- Right side: Scale Out -->
                        <text x="600" y="40" fill="#e8eaf6" text-anchor="middle" font-size="18" font-weight="bold">Scale Out (Multi-Cluster)</text>
                        <text x="600" y="60" fill="#b0bec5" text-anchor="middle" font-size="14">Fixes query queuing (Concurrency)</text>
                        
                        <rect x="550" y="90" width="100" height="60" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="600" y="125" fill="#e8eaf6" text-anchor="middle">X-Small</text>
                        
                        <line x1="600" y1="160" x2="600" y2="190" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <rect x="440" y="200" width="100" height="60" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="490" y="235" fill="#e8eaf6" text-anchor="middle">X-Small 1</text>
                        
                        <rect x="550" y="200" width="100" height="60" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="600" y="235" fill="#e8eaf6" text-anchor="middle">X-Small 2</text>
                        
                        <rect x="660" y="200" width="100" height="60" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="710" y="235" fill="#e8eaf6" text-anchor="middle">X-Small 3</text>
                        
                        <text x="600" y="290" fill="#b0bec5" text-anchor="middle" font-size="12">(Handles more queries simultaneously)</text>
                        
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b7b8d" />
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 3: Scale Up (size) vs Scale Out (clusters).</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d26q1",
                type: "single",
                question: "If a Medium warehouse consumes 4 credits per hour, how many credits per hour does a Large warehouse consume?",
                options: ["6", "8", "16", "32"],
                correct: 1,
                explanation: "Warehouse sizes double in compute and credit consumption at each step. Small (2) -> Medium (4) -> Large (8)."
            },
            {
                id: "d26q2",
                type: "single",
                question: "You have a large ETL job that is taking 2 hours to complete. Which action should you take to improve its performance?",
                options: ["Scale Out (Enable Multi-cluster)", "Scale Up (Increase Warehouse Size)", "Change to Economy scaling policy", "Increase Auto-suspend time"],
                correct: 1,
                explanation: "For a complex query taking a long time, you need more compute horsepower per query, which means Scaling Up (increasing the size)."
            },
            {
                id: "d26q3",
                type: "single",
                question: "Users are complaining that during peak morning hours, their queries sit in a 'Queued' state for a long time before running. What is the best solution?",
                options: ["Scale Up (Increase Warehouse Size)", "Scale Out (Enable Multi-cluster Auto-scale)", "Disable Result Caching", "Use Snowpipe"],
                correct: 1,
                explanation: "Queuing indicates concurrency issues (too many simultaneous queries). Scaling out by setting up a Multi-cluster warehouse allows Snowflake to spin up parallel clusters to handle the concurrency."
            },
            {
                id: "d26q4",
                type: "single",
                question: "What is the minimum billing charge when a Virtual Warehouse resumes from a suspended state?",
                options: ["1 second", "60 seconds", "5 minutes", "1 hour"],
                correct: 1,
                explanation: "When a warehouse starts, there is a minimum charge of 60 seconds. After that first minute, billing is per-second."
            },
            {
                id: "d26q5",
                type: "single",
                question: "Which multi-cluster scaling policy favors cost over performance by waiting to ensure there is enough sustained load before starting a new cluster?",
                options: ["Standard", "Maximized", "Economy", "Conservative"],
                correct: 2,
                explanation: "The Economy policy calculates whether there is enough queued load to keep a new cluster busy for at least 6 minutes before spinning it up."
            },
            {
                id: "d26q6",
                type: "single",
                question: "What happens to currently running queries if you ALTER a warehouse and resize it from Small to Large?",
                options: ["The queries fail and must be restarted", "The queries immediately speed up", "The queries finish executing on the old Small compute nodes", "The warehouse suspends itself"],
                correct: 2,
                explanation: "Resizing a warehouse provisions new compute nodes. Running queries continue on the original nodes until they finish. New queries submitted after the resize will use the new Large nodes."
            },
            {
                id: "d26q7",
                type: "single",
                question: "Which of the following requires an Enterprise edition (or higher) account?",
                options: ["Auto-suspend", "Scaling up to a 2X-Large warehouse", "Multi-cluster warehouses", "Creating multiple databases"],
                correct: 2,
                explanation: "Multi-cluster warehouses are an advanced feature only available in Enterprise edition, Business Critical, or VPS. Standard edition only allows single-cluster warehouses."
            },
            {
                id: "d26q8",
                type: "single",
                question: "If a multi-cluster warehouse has Minimum clusters set to 3 and Maximum clusters set to 3, what mode is it operating in?",
                options: ["Auto-scale", "Maximized", "Economy", "Static"],
                correct: 1,
                explanation: "When Min equals Max, it is called Maximized mode. All 3 clusters will start immediately upon resume and run continuously until suspended."
            }
        ]
    },
    {
        day: 27,
        title: "Caching & Query Profile",
        subtitle: "How Snowflake Stays Fast",
        domain: {
            id: 4,
            name: "Performance & Transformation",
            color: "#ffa726"
        },
        estimatedTime: "90 min",
        objectives: [
            "Identify the three layers of caching in Snowflake",
            "Understand when each cache is utilized",
            "Learn how to read the Query Profile to diagnose issues",
            "Configure Resource Monitors to prevent runaway costs"
        ],
        sections: [
            {
                title: "The Three Layers of Caching",
                content: `<p>Snowflake's performance heavily relies on its three-tiered caching architecture. This is a critical topic for the COF-C03 exam.</p>
                <ol>
                    <li><strong>Metadata Cache (Cloud Services Layer):</strong> Snowflake automatically maintains micro-partition metadata (min, max, row count, null count). Queries like <code>SELECT COUNT(*) FROM table</code> or <code>SELECT MIN(date) FROM table</code> can be answered instantly by the Cloud Services layer <em>without even turning on a Virtual Warehouse</em>.</li>
                    <li><strong>Result Cache (Cloud Services Layer):</strong> Snowflake caches the final result set of every executed query for 24 hours. If any user runs the <em>exact same query</em>, and the underlying data hasn't changed, Snowflake returns the cached results instantly, requiring no warehouse compute.</li>
                    <li><strong>Local Disk Cache / Data Cache (Virtual Warehouse Layer):</strong> When a warehouse reads micro-partitions from cloud storage, it caches them on its local SSDs. If subsequent queries (even different ones) need the same micro-partitions, it reads from the fast local SSD rather than remote cloud storage. <strong>This cache is lost when the warehouse suspends.</strong></li>
                </ol>`
            },
            {
                title: "Query Profile",
                content: `<p>The <strong>Query Profile</strong> (accessed via Snowsight -> Query History) is a graphical representation of an execution plan. It helps you find performance bottlenecks.</p>
                <p>Things to look for in the Query Profile:</p>
                <ul>
                    <li><strong>Exploding Joins:</strong> The output rows of a join are vastly larger than the input rows (often caused by missing join conditions or duplicates).</li>
                    <li><strong>Spillage to Local/Remote Storage:</strong> If a warehouse doesn't have enough memory to perform a massive sort or join, it "spills" data to local SSDs, and if that fills up, to remote cloud storage. This is very slow. The fix is usually to scale up the warehouse.</li>
                    <li><strong>Pruning Efficiency:</strong> Compare "Partitions scanned" vs "Partitions total". Good clustering means Snowflake skips (prunes) most partitions.</li>
                </ul>`
            },
            {
                title: "Resource Monitors",
                content: `<p>To prevent a massive, unexpected bill, you create <strong>Resource Monitors</strong>. They track credit usage at the Account or Warehouse level.</p>
                <p>You define a quota (e.g., 1000 credits/month) and set actions at certain percentages:</p>
                <ul>
                    <li><strong>NOTIFY:</strong> Send an alert to administrators (e.g., at 80%).</li>
                    <li><strong>SUSPEND:</strong> Stops the warehouse from accepting <em>new</em> queries, but lets currently running queries finish (e.g., at 90%).</li>
                    <li><strong>SUSPEND_IMMEDIATE:</strong> Kills all running queries and suspends the warehouse immediately (e.g., at 100%).</li>
                </ul>`
            },
            {
                title: "Caching Architecture",
                content: `<p>This diagram illustrates the query flow and where caches are accessed.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="500" fill="#111827" />
                        
                        <!-- User Query -->
                        <rect x="350" y="30" width="100" height="40" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="400" y="55" fill="#e8eaf6" text-anchor="middle">SQL Query</text>
                        <line x1="400" y1="70" x2="400" y2="110" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Cloud Services Layer -->
                        <rect x="150" y="110" width="500" height="120" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" stroke-dasharray="5"/>
                        <text x="160" y="130" fill="#e8eaf6" font-weight="bold">Cloud Services Layer</text>
                        
                        <!-- Result Cache -->
                        <rect x="250" y="150" width="120" height="60" rx="4" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="310" y="175" fill="#e8eaf6" text-anchor="middle">1. Result Cache</text>
                        <text x="310" y="195" fill="#b0bec5" text-anchor="middle" font-size="10">(Exact match, 24h)</text>
                        
                        <!-- Metadata Cache -->
                        <rect x="430" y="150" width="120" height="60" rx="4" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="490" y="175" fill="#e8eaf6" text-anchor="middle">2. Metadata Cache</text>
                        <text x="490" y="195" fill="#b0bec5" text-anchor="middle" font-size="10">(COUNT, MIN, MAX)</text>
                        
                        <line x1="400" y1="230" x2="400" y2="280" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="410" y="260" fill="#b0bec5" font-size="12">If not cached...</text>
                        
                        <!-- Virtual Warehouse Layer -->
                        <rect x="150" y="280" width="500" height="100" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2" stroke-dasharray="5"/>
                        <text x="160" y="300" fill="#e8eaf6" font-weight="bold">Compute Layer (Virtual Warehouse)</text>
                        
                        <!-- Local Disk Cache -->
                        <rect x="340" y="310" width="120" height="50" rx="4" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="400" y="330" fill="#e8eaf6" text-anchor="middle">3. Data Cache</text>
                        <text x="400" y="345" fill="#b0bec5" text-anchor="middle" font-size="10">(Local SSD)</text>
                        
                        <line x1="400" y1="380" x2="400" y2="420" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="410" y="405" fill="#b0bec5" font-size="12">If not on SSD...</text>
                        
                        <!-- Storage Layer -->
                        <rect x="150" y="420" width="500" height="60" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2"/>
                        <text x="400" y="455" fill="#e8eaf6" text-anchor="middle" font-weight="bold">Storage Layer (Micro-partitions)</text>
                        
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b7b8d" />
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 4: Snowflake's three caching layers.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d27q1",
                type: "single",
                question: "Which caching layer is utilized when you execute a SELECT COUNT(*) query on a very large table?",
                options: ["Result Cache", "Metadata Cache", "Local Disk Cache", "Query Profiler"],
                correct: 1,
                explanation: "Basic aggregations like COUNT, MIN, and MAX can be answered directly by the Metadata Cache in the Cloud Services layer, requiring no warehouse compute."
            },
            {
                id: "d27q2",
                type: "single",
                question: "How long are query results stored in the Result Cache by default?",
                options: ["1 hour", "12 hours", "24 hours", "Until the warehouse is suspended"],
                correct: 2,
                explanation: "The Result Cache stores the results of queries for 24 hours. The timer resets up to 31 days if the query is run again, provided the underlying data hasn't changed."
            },
            {
                id: "d27q3",
                type: "single",
                question: "What happens to the Local Disk Cache (Data Cache) when a Virtual Warehouse is suspended?",
                options: ["It is backed up to Cloud Storage", "It persists for 24 hours", "It is dropped and cleared immediately", "It is transferred to the Cloud Services layer"],
                correct: 2,
                explanation: "The Local Disk Cache relies on the SSDs of the specific compute nodes in the warehouse. When the warehouse suspends, those servers are turned off, and the cache is lost."
            },
            {
                id: "d27q4",
                type: "single",
                question: "In the Query Profile, what does 'Spilling to remote storage' indicate?",
                options: ["The query was successful and results were saved", "The warehouse ran out of memory and local SSD space, drastically slowing down the query", "Snowflake is backing up the data for disaster recovery", "Snowpipe is actively loading data"],
                correct: 1,
                explanation: "Spilling occurs when operations (like sorts/joins) exceed warehouse memory. It spills to local SSD first. If that fills, it spills to remote storage (S3/GCS), which is very slow. A larger warehouse size fixes this."
            },
            {
                id: "d27q5",
                type: "single",
                question: "A Resource Monitor is configured to SUSPEND_IMMEDIATE at 100%. What happens when that quota is reached?",
                options: ["It prevents new queries from starting, but allows running ones to finish", "It kills all currently running queries and immediately suspends the warehouse", "It locks the user accounts using the warehouse", "It automatically scales down the warehouse size"],
                correct: 1,
                explanation: "SUSPEND_IMMEDIATE forcefully aborts all currently executing queries and suspends the warehouse. SUSPEND (without immediate) lets running queries finish gracefully."
            },
            {
                id: "d27q6",
                type: "multi",
                question: "Which of the following conditions must be met for a query to use the Result Cache? (Select TWO)",
                options: ["The exact same syntax must be used (character for character)", "The query must run on an X-Large warehouse or larger", "The underlying data in the tables must not have changed", "The query must include a WHERE clause"],
                correct: [0, 2],
                explanation: "For the Result Cache to hit, the query string must match exactly, the context (role/database) must be the same, and the underlying data cannot have been modified since the result was cached."
            },
            {
                id: "d27q7",
                type: "single",
                question: "At what level(s) can a Resource Monitor be assigned?",
                options: ["Only at the Database level", "Only at the Account level", "At the Account level or assigned to specific Virtual Warehouses", "At the User level"],
                correct: 2,
                explanation: "Resource Monitors can be applied at the Account level to monitor all usage, or assigned to specific Virtual Warehouses to monitor specific workloads."
            },
            {
                id: "d27q8",
                type: "single",
                question: "What is Query Acceleration Service (QAS)?",
                options: ["A tool that speeds up Snowsight UI loading", "A feature that automatically writes better SQL", "A service that offloads parts of heavy scanning queries to shared serverless compute", "A new caching layer"],
                correct: 2,
                explanation: "QAS (Enterprise edition) acts like a shock absorber. If a warehouse encounters a massive scan operation, QAS offloads that specific part of the query to a pool of shared Snowflake compute resources to speed it up."
            }
        ]
    },
    {
        day: 28,
        title: "Week 4 Review",
        subtitle: "Data Loading & Performance",
        domain: {
            id: 0,
            name: "Weekly Review",
            color: "#66bb6a"
        },
        estimatedTime: "120 min",
        objectives: [
            "Review Stages and File Formats",
            "Review Bulk Loading vs Snowpipe",
            "Review Virtual Warehouse Scaling Strategies",
            "Review Caching Layers and Optimization"
        ],
        sections: [
            {
                title: "Loading Architecture Summary",
                content: `<p>In Week 4, we covered Domain 3 (Data Loading) and half of Domain 4 (Performance). Here are the critical loading concepts to remember for the exam:</p>
                <ul>
                    <li><strong>Stages:</strong> You need a stage (Internal or External) to hold files before <code>COPY INTO</code>. Internal stages require the <code>PUT</code> command. External stages require a <strong>Storage Integration</strong>.</li>
                    <li><strong>COPY INTO:</strong> The bulk loading command. Needs a Virtual Warehouse. Understand <code>ON_ERROR</code> behaviors, especially the default (<code>ABORT_STATEMENT</code>) vs <code>CONTINUE</code>.</li>
                    <li><strong>Snowpipe:</strong> Continuous, micro-batch loading. It uses Snowflake's <strong>serverless compute</strong> (not your warehouse). Triggered automatically by cloud event notifications.</li>
                    <li><strong>Snowpipe Streaming:</strong> Row-set direct loading via an SDK, bypassing cloud storage stage files entirely for low latency.</li>
                </ul>`
            },
            {
                title: "Performance Summary",
                content: `<p>Performance in Snowflake revolves around Virtual Warehouses and Caching:</p>
                <ul>
                    <li><strong>Scale Up (Size):</strong> X-Small to Large. Fixes slow, complex queries by adding more horsepower. Sizes double in power and credit cost.</li>
                    <li><strong>Scale Out (Multi-cluster):</strong> Min/Max clusters. Fixes queuing and concurrency by adding more lanes to the highway. Requires Enterprise edition.</li>
                    <li><strong>Caching:</strong> 
                        <br>1. Metadata (Instant answers, no compute). 
                        <br>2. Result (24h exact match, no compute). 
                        <br>3. Data Cache (Local SSD, fast compute, lost on suspend).
                    </li>
                </ul>`
            }
        ],
        quiz: [
            {
                id: "d28q1",
                type: "single",
                question: "Which caching layer is lost when a virtual warehouse is suspended?",
                options: ["Result Cache", "Metadata Cache", "Data Cache (Local Disk)", "All of the above"],
                correct: 2,
                explanation: "The Data Cache stores micro-partitions on the local SSDs of the warehouse compute nodes. When suspended, the nodes are destroyed, wiping the cache."
            },
            {
                id: "d28q2",
                type: "single",
                question: "What is the purpose of the VALIDATION_MODE option in a COPY INTO statement?",
                options: ["To permanently delete corrupted files", "To check files for errors without actually loading any data", "To bypass format checking for faster loads", "To automatically fix corrupted data types"],
                correct: 1,
                explanation: "VALIDATION_MODE parses the data and returns errors (e.g., RETURN_ERRORS) as a dry run, without inserting rows into the target table."
            },
            {
                id: "d28q3",
                type: "single",
                question: "Your data science team runs highly complex, memory-intensive queries that are spilling to remote storage. What is the most effective solution?",
                options: ["Increase the maximum number of clusters (Scale Out)", "Increase the warehouse size (Scale Up)", "Set the scaling policy to Standard", "Use Snowpipe"],
                correct: 1,
                explanation: "Spilling indicates a lack of memory/compute power for a specific query. Scaling up increases the size of the warehouse, providing more memory to prevent spilling."
            },
            {
                id: "d28q4",
                type: "single",
                question: "Which of the following describes standard Snowpipe?",
                options: ["It relies on a dedicated user-managed warehouse", "It is best used for massive, scheduled weekly batch loads", "It uses serverless compute managed by Snowflake to load data continuously", "It streams rows directly into memory without using stage files"],
                correct: 2,
                explanation: "Snowpipe is an automated, continuous ingestion service that uses Snowflake's serverless compute model, not user-managed warehouses."
            },
            {
                id: "d28q5",
                type: "multi",
                question: "Which statements are TRUE about internal stages? (Select TWO)",
                options: ["Every user has an automatically created user stage (@~)", "You upload files to them using the PUT command via the web UI", "Named internal stages can be accessed by multiple tables", "Internal stages require a Storage Integration to configure"],
                correct: [0, 2],
                explanation: "Every user has a user stage, and named internal stages provide flexibility for multiple tables. The PUT command cannot be run from the web UI, and Storage Integrations are for external stages."
            },
            {
                id: "d28q6",
                type: "single",
                question: "You want to export data from a Snowflake table to an S3 bucket and ensure the data is written into a single, uncompressed file. Which COPY INTO options do you need?",
                options: ["SINGLE = TRUE, COMPRESSION = NONE", "MAX_FILE_SIZE = 1000, COMPRESSION = FALSE", "ONE_FILE = YES, ZIP = FALSE", "PARALLEL = FALSE, FORMAT = RAW"],
                correct: 0,
                explanation: "To force a single file output, use SINGLE = TRUE. Because Snowflake compresses exported files by default, you must explicitly set COMPRESSION = NONE."
            },
            {
                id: "d28q7",
                type: "single",
                question: "If a multi-cluster warehouse is configured with Min Clusters = 1 and Max Clusters = 5, what scaling mode is it using?",
                options: ["Maximized Mode", "Auto-scale Mode", "Economy Mode", "Burst Mode"],
                correct: 1,
                explanation: "When Min < Max, the warehouse is in Auto-scale mode. It starts with the minimum and dynamically adds clusters as queries queue up."
            },
            {
                id: "d28q8",
                type: "single",
                question: "How long is query load history retained by Snowflake to prevent duplicate files from being loaded via COPY INTO?",
                options: ["24 hours", "14 days", "64 days", "90 days"],
                correct: 2,
                explanation: "Snowflake maintains the metadata history of files successfully loaded via COPY INTO for 64 days."
            },
            {
                id: "d28q9",
                type: "single",
                question: "A user executes a query. Five minutes later, another user in the same account executes the exact same query. Assuming the underlying data has not changed, what happens?",
                options: ["The query executes on the warehouse, reading from the local disk cache.", "The query results are returned instantly from the Cloud Services Result Cache, using no warehouse compute.", "The query executes on the warehouse, but is faster because of the Metadata cache.", "The query fails because of a lock."],
                correct: 1,
                explanation: "If the exact same query is run within 24 hours and the data hasn't changed, the Cloud Services layer intercepts it and returns the answer from the Result Cache immediately."
            },
            {
                id: "d28q10",
                type: "single",
                question: "Which of the following is required to securely connect Snowflake to an external AWS S3 bucket without embedding IAM keys in your SQL?",
                options: ["API Gateway", "Storage Integration", "External Function", "Snowflake Partner Connect"],
                correct: 1,
                explanation: "A Storage Integration is an object that stores a generated IAM entity for external cloud storage, allowing secure authentication without explicit keys."
            },
            {
                id: "d28q11",
                type: "single",
                question: "What is the primary benefit of Snowpipe Streaming compared to standard Snowpipe?",
                options: ["It is free to use.", "It does not require cloud storage staging files.", "It can load PDF documents.", "It automatically transforms JSON into relational tables."],
                correct: 1,
                explanation: "Snowpipe Streaming bypasses the need to write files to an external stage (like S3) first. Data rows are streamed directly via an SDK for lower latency."
            },
            {
                id: "d28q12",
                type: "single",
                question: "You want your warehouse to automatically suspend after 5 minutes of inactivity to save credits. Which property do you set?",
                options: ["TIMEOUT_MINUTES = 5", "AUTO_SUSPEND = 300", "IDLE_TIMEOUT = 5", "AUTO_SHUTDOWN = 300"],
                correct: 1,
                explanation: "The property is AUTO_SUSPEND, and its value is specified in seconds (5 minutes = 300 seconds)."
            },
            {
                id: "d28q13",
                type: "multi",
                question: "Which actions can a Resource Monitor perform when a credit quota is reached? (Select TWO)",
                options: ["NOTIFY", "SCALE_DOWN", "SUSPEND_IMMEDIATE", "REVOKE_PRIVILEGES"],
                correct: [0, 2],
                explanation: "Resource monitors support three actions: NOTIFY, SUSPEND, and SUSPEND_IMMEDIATE. They cannot automatically scale down warehouses or change privileges."
            },
            {
                id: "d28q14",
                type: "single",
                question: "Can the PUT command be used to upload data to an external stage in AWS S3?",
                options: ["Yes, if the storage integration is configured.", "No, PUT only works for internal stages.", "Yes, but only for CSV files.", "No, GET must be used instead."],
                correct: 1,
                explanation: "The PUT command is explicitly designed to move files from a local machine to a Snowflake internal stage. It cannot upload to external stages."
            },
            {
                id: "d28q15",
                type: "single",
                question: "During a COPY INTO operation, you want to skip any files that have more than 10% error rows, but load files that are perfectly clean. Which option should you use?",
                options: ["ON_ERROR = SKIP_FILE_10", "ON_ERROR = SKIP_FILE_10%", "ON_ERROR = CONTINUE", "ON_ERROR = ABORT_STATEMENT"],
                correct: 1,
                explanation: "The ON_ERROR option can accept a percentage threshold for skipping files, formatted as SKIP_FILE_<num>%."
            }
        ]
    }
];
