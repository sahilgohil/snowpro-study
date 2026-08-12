window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.week2 = [
    {
        day: 8,
        title: "Object Hierarchy",
        subtitle: "Understanding Snowflake's Organizational Structure",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the top-to-bottom hierarchy: Organization → Account → Database → Schema → Object",
            "Learn the roles of Organizations, Accounts, Databases, and Schemas",
            "Recognize common Snowflake object types and naming conventions"
        ],
        sections: [
            {
                title: "The Snowflake Hierarchy",
                content: `<p>Snowflake's logical structure is highly organized, much like a well-planned corporate office. At the very top, you have the company itself (Organization). The company might have several office buildings around the world (Accounts). Each building has different floors or departments (Databases). Within each department, there are specific filing cabinets (Schemas), and inside those cabinets are the actual folders and documents (Objects like Tables, Views, etc.).</p>

<div class="diagram-container">
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="800" height="400" fill="#111827" />
        
        <!-- Organization -->
        <rect x="250" y="20" width="300" height="50" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
        <text x="400" y="50" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Organization</text>
        
        <!-- Accounts -->
        <path d="M400 70 L400 90 L200 90 L200 110" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <path d="M400 70 L400 90 L600 90 L600 110" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        
        <rect x="100" y="110" width="200" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
        <text x="200" y="140" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Account A (e.g., Prod)</text>
        
        <rect x="500" y="110" width="200" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
        <text x="600" y="140" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Account B (e.g., Dev)</text>

        <!-- Databases -->
        <path d="M200 160 L200 180 L100 180 L100 200" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <path d="M200 160 L200 180 L300 180 L300 200" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        
        <rect x="25" y="200" width="150" height="40" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
        <text x="100" y="225" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Database 1</text>
        
        <rect x="225" y="200" width="150" height="40" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
        <text x="300" y="225" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Database 2</text>
        
        <!-- Schemas -->
        <path d="M100 240 L100 270" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <rect x="25" y="270" width="150" height="40" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
        <text x="100" y="295" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Schema 1</text>

        <!-- Objects -->
        <path d="M100 310 L100 340" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <rect x="10" y="340" width="180" height="40" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2"/>
        <text x="100" y="365" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Tables, Views, etc.</text>
    </svg>
    <p class="diagram-caption">Figure 1: The Snowflake Object Hierarchy</p>
</div>

<h4>1. Organization</h4>
<p>The <strong>Organization</strong> is a first-class Snowflake object that links all of your accounts together. From the Organization level, administrators can view usage across all accounts, create new accounts, and configure features that span multiple accounts (like database replication). If your company has a Snowflake deployment, you typically have one Organization.</p>

<h4>2. Account</h4>
<p>An <strong>Account</strong> is an independent environment with its own users, compute resources (virtual warehouses), and databases. Accounts are completely isolated from each other. They each have their own unique URL. Many companies use separate accounts for different environments (e.g., Development, Staging, Production) or different regions.</p>

<div class="callout exam-tip">
    <div class="callout-title">📝 Exam Tip</div>
    <p>Virtual Warehouses (compute resources) exist at the <strong>Account</strong> level. They do NOT belong to databases or schemas.</p>
</div>`
            },
            {
                title: "Databases, Schemas, and Objects",
                content: `<h4>3. Database</h4>
<p>A <strong>Database</strong> is a logical grouping of schemas. Every account can have multiple databases. When you create a database, you are essentially creating a top-level container for your data objects.</p>

<h4>4. Schema</h4>
<p>A <strong>Schema</strong> is a logical grouping of database objects. Every database must have at least one schema to hold objects. When you create a database, Snowflake automatically creates two schemas: <code>PUBLIC</code> (the default schema) and <code>INFORMATION_SCHEMA</code> (which contains views and functions providing metadata about the objects in the database).</p>

<h4>5. Objects</h4>
<p>Inside schemas, you store the actual data objects. Common objects include:</p>
<ul>
    <li><strong>Tables:</strong> Where structured and semi-structured data is stored.</li>
    <li><strong>Views & Materialized Views:</strong> Saved queries that act like tables.</li>
    <li><strong>Stages:</strong> Locations where data files are staged for loading or unloading.</li>
    <li><strong>Pipes:</strong> Automated data ingestion pipelines (Snowpipe).</li>
    <li><strong>Streams:</strong> Change data capture (CDC) mechanisms.</li>
    <li><strong>Tasks:</strong> Scheduled SQL statements.</li>
    <li><strong>Sequences, Functions, and Procedures:</strong> Programmability objects.</li>
</ul>

<div class="callout warning">
    <div class="callout-title">⚠️ Common Misconception</div>
    <p>People often think Users and Roles belong to a Database. They do not. <strong>Users, Roles, and Virtual Warehouses are Account-level objects.</strong> They are not contained within a Database or Schema.</p>
</div>

<h4>Fully Qualified Names</h4>
<p>Because of this hierarchy, every object in Snowflake has a "Fully Qualified Name" (FQN) that uniquely identifies it. The format is:</p>
<div class="code-block">
    <div class="code-header">Format</div>
    <pre><code>database_name.schema_name.object_name</code></pre>
</div>
<p>For example, if you want to query the <code>EMPLOYEES</code> table in the <code>HR</code> schema of the <code>CORP_DB</code> database, you can write:</p>
<div class="code-block">
    <div class="code-header">SQL</div>
    <pre><code>SELECT * FROM corp_db.hr.employees;</code></pre>
</div>
<p>Using the fully qualified name allows you to query tables in databases or schemas that are not currently set as your active context.</p>`
            }
        ],
        quiz: [
            {
                id: "d8q1",
                type: "single",
                question: "Which of the following objects is considered an Account-level object (NOT contained within a database or schema)?",
                options: ["Table", "Virtual Warehouse", "View", "Stage"],
                correct: 1,
                explanation: "Virtual Warehouses, Users, and Roles are Account-level objects. Tables, Views, and Stages are created within Schemas, which are within Databases."
            },
            {
                id: "d8q2",
                type: "single",
                question: "What is the correct fully qualified name for a table in Snowflake?",
                options: [
                    "account.database.schema.table",
                    "database.schema.table",
                    "schema.database.table",
                    "organization.account.database.table"
                ],
                correct: 1,
                explanation: "The fully qualified name for a database object in Snowflake is database_name.schema_name.object_name."
            },
            {
                id: "d8q3",
                type: "multi",
                question: "Which schemas are automatically created when a new database is created in Snowflake? (Select TWO)",
                options: ["SYSTEM", "PUBLIC", "DEFAULT", "INFORMATION_SCHEMA"],
                correct: [1, 3],
                explanation: "When a database is created, Snowflake automatically creates the PUBLIC schema and the INFORMATION_SCHEMA."
            },
            {
                id: "d8q4",
                type: "single",
                question: "At which level in the Snowflake hierarchy can an administrator manage multiple accounts and view aggregated usage across them?",
                options: ["Account", "Cloud Region", "Organization", "Database"],
                correct: 2,
                explanation: "The Organization is the top-level entity that links multiple accounts together, allowing for central billing, usage tracking, and cross-account features."
            },
            {
                id: "d8q5",
                type: "single",
                question: "If you want to create a Snowpipe to automate data loading, in which logical container must the Pipe object be created?",
                options: ["Account", "Database", "Schema", "Warehouse"],
                correct: 2,
                explanation: "A Pipe is a database object, meaning it must be created within a Schema, which in turn resides within a Database."
            },
            {
                id: "d8q6",
                type: "single",
                question: "Which of the following statements about Snowflake Accounts is TRUE?",
                options: [
                    "Accounts within the same Organization share the same Virtual Warehouses.",
                    "Accounts within the same Organization share the same URL.",
                    "Accounts are completely isolated environments with their own users, data, and compute.",
                    "An Account cannot span multiple cloud providers, but a Database can."
                ],
                correct: 2,
                explanation: "Accounts are independent, isolated environments. They do not share users, warehouses, or URLs by default, even if they belong to the same Organization."
            },
            {
                id: "d8q7",
                type: "single",
                question: "To query a table in a database that is NOT your current active database, what must you do?",
                options: [
                    "You cannot query tables outside your active database.",
                    "Use the USE DATABASE command before running the query.",
                    "Use the fully qualified name (database.schema.table) in your query.",
                    "Either B or C."
                ],
                correct: 3,
                explanation: "You can either change your context using USE DATABASE, or you can use the fully qualified name (database.schema.table) directly in your SELECT statement."
            }
        ]
    },
    {
        day: 9,
        title: "Table Types",
        subtitle: "Permanent, Transient, Temporary, External, Iceberg & Dynamic",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "100 min",
        objectives: [
            "Understand the differences between Permanent, Transient, and Temporary tables",
            "Learn how Data Protection (Time Travel & Fail-safe) applies to table types",
            "Understand External Tables for data lake querying",
            "Learn the new COF-C03 features: Iceberg Tables and Dynamic Tables"
        ],
        sections: [
            {
                title: "Standard Table Types",
                content: `<p>Snowflake offers three primary types of tables for storing data internally. The main difference between them revolves around <strong>Data Protection</strong> (Time Travel and Fail-safe) and the associated storage costs.</p>

<h4>1. Permanent Tables</h4>
<p>Permanent tables are the default table type. If you just run <code>CREATE TABLE my_table...</code>, you are creating a Permanent table. They offer the maximum level of data protection.</p>
<ul>
    <li><strong>Time Travel:</strong> 0 to 90 days (Enterprise Edition and above; Standard Edition is 0-1 day).</li>
    <li><strong>Fail-safe:</strong> Always 7 days (cannot be disabled).</li>
    <li><strong>Cost:</strong> You pay for the storage of the active data, plus the storage for Time Travel data, plus the storage for Fail-safe data.</li>
</ul>

<h4>2. Transient Tables</h4>
<p>Transient tables are designed for data that needs to be maintained beyond a single session but does not require the strict data protection (and costs) of Permanent tables. Perfect for ETL staging tables or intermediate transformations.</p>
<ul>
    <li><strong>Time Travel:</strong> 0 to 1 day maximum.</li>
    <li><strong>Fail-safe:</strong> 0 days (No Fail-safe period).</li>
    <li><strong>Cost:</strong> Lower than permanent tables because there is no Fail-safe storage cost.</li>
</ul>

<h4>3. Temporary Tables</h4>
<p>Temporary tables only exist for the duration of the user session that created them. When the session ends (or the user logs out), the table and its data are completely purged.</p>
<ul>
    <li><strong>Visibility:</strong> Only visible to the user/session that created them. Cannot be seen by other users.</li>
    <li><strong>Time Travel:</strong> 0 to 1 day (but only while the session is active!).</li>
    <li><strong>Fail-safe:</strong> 0 days.</li>
    <li><strong>Naming collision:</strong> You can create a temporary table with the exact same name as a permanent table in the same schema. During the session, the temporary table takes precedence.</li>
</ul>

<div class="callout tip">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>If you don't need Fail-safe (e.g., you can easily reload the data from a source file if it gets lost), use <strong>Transient</strong> tables to save on storage costs.</p>
</div>`
            },
            {
                title: "Advanced & New Table Types",
                content: `<h4>4. External Tables</h4>
<p>External tables are read-only tables where the data is stored <strong>outside</strong> of Snowflake in cloud storage (Amazon S3, Azure Blob, GCS). Snowflake stores only the metadata (schema, partitions) internally. You use them when you want to query a "Data Lake" without ingesting the data into Snowflake's storage.</p>

<h4>5. Apache Iceberg Tables (NEW in COF-C03)</h4>
<p>Apache Iceberg is an open-source table format for huge analytic datasets. Iceberg Tables in Snowflake combine the performance and features of Snowflake with external, open-format storage.</p>
<ul>
    <li><strong>Open Format:</strong> Data is stored in Parquet files with Iceberg metadata, usually in your own cloud storage.</li>
    <li><strong>Interoperability:</strong> Other engines (like Apache Spark, Trino, Flink) can read/write the same tables.</li>
    <li><strong>Catalogs:</strong> You can use a <em>Snowflake-managed catalog</em> (Snowflake handles writes and metadata) or an <em>Externally-managed catalog</em> (e.g., AWS Glue, where Snowflake only reads the data).</li>
</ul>

<div class="callout exam-tip">
    <div class="callout-title">📝 Exam Tip</div>
    <p>For the exam, know that <strong>Iceberg Tables</strong> provide multi-engine interoperability without moving data, while <strong>External Tables</strong> are typically read-only views over existing files.</p>
</div>

<h4>6. Dynamic Tables (NEW in COF-C03)</h4>
<p>Dynamic Tables are a declarative way to build data pipelines. Instead of writing complex tasks and streams to transform data, you simply define the <strong>target state</strong> of a table using a standard SQL <code>SELECT</code> statement, and Snowflake automatically manages the refreshes.</p>
<ul>
    <li>You specify a <code>TARGET_LAG</code> (e.g., "keep this data fresh within 5 minutes").</li>
    <li>Snowflake's automated background processes handle the incremental processing.</li>
    <li>Replaces many complex Tasks/Streams setups.</li>
</ul>

<table>
    <thead>
        <tr>
            <th>Table Type</th>
            <th>Time Travel</th>
            <th>Fail-safe</th>
            <th>Primary Use Case</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Permanent</td>
            <td>0-90 days*</td>
            <td>7 days</td>
            <td>Production data, facts, dimensions</td>
        </tr>
        <tr>
            <td>Transient</td>
            <td>0-1 day</td>
            <td>0 days</td>
            <td>ETL intermediate steps, easily recreated data</td>
        </tr>
        <tr>
            <td>Temporary</td>
            <td>0-1 day</td>
            <td>0 days</td>
            <td>Session-specific data, scratchpads</td>
        </tr>
        <tr>
            <td>External</td>
            <td>No</td>
            <td>No</td>
            <td>Querying data lakes without ingestion</td>
        </tr>
        <tr>
            <td>Dynamic</td>
            <td>0-90 days*</td>
            <td>7 days</td>
            <td>Declarative data transformation pipelines</td>
        </tr>
    </tbody>
</table>
<p><small>*90 days requires Enterprise Edition.</small></p>`
            }
        ],
        quiz: [
            {
                id: "d9q1",
                type: "single",
                question: "Which table type has absolutely NO Fail-safe period?",
                options: [
                    "Permanent Tables only",
                    "Transient Tables only",
                    "Temporary Tables only",
                    "Both Transient and Temporary Tables"
                ],
                correct: 3,
                explanation: "Neither Transient nor Temporary tables have a Fail-safe period. Only Permanent tables (and Dynamic tables, which act like permanent tables) have the mandatory 7-day Fail-safe."
            },
            {
                id: "d9q2",
                type: "single",
                question: "You need to store intermediate ETL data that is easily recreated from source files. To minimize storage costs while retaining data across multiple days and sessions, which table type should you choose?",
                options: ["Permanent", "Transient", "Temporary", "External"],
                correct: 1,
                explanation: "Transient tables are best here. They persist across sessions (unlike Temporary), but don't incur Fail-safe storage costs (unlike Permanent)."
            },
            {
                id: "d9q3",
                type: "single",
                question: "What happens if a user creates a Temporary table named `CUSTOMERS` in a schema where a Permanent table named `CUSTOMERS` already exists?",
                options: [
                    "The CREATE command fails with a naming conflict error.",
                    "The Permanent table is permanently overwritten.",
                    "The Temporary table is created, and for that user's session, queries to `CUSTOMERS` will resolve to the Temporary table.",
                    "The Temporary table is created, but queries will continue to resolve to the Permanent table by default."
                ],
                correct: 2,
                explanation: "Snowflake allows naming collisions between Temporary and Permanent tables. The Temporary table effectively 'hides' the Permanent table for that user's session."
            },
            {
                id: "d9q4",
                type: "multi",
                question: "Which of the following are characteristics of Apache Iceberg Tables in Snowflake? (Select TWO)",
                options: [
                    "They require data to be stored internally in Snowflake's proprietary micro-partition format.",
                    "They allow other processing engines (like Spark) to interact with the same datasets.",
                    "They use open formats like Parquet.",
                    "They can only be read, never written to by Snowflake."
                ],
                correct: [1, 2],
                explanation: "Iceberg tables use open formats (Parquet) and allow multi-engine interoperability. Unlike External tables, Snowflake CAN write to Iceberg tables (if using a Snowflake-managed catalog)."
            },
            {
                id: "d9q5",
                type: "single",
                question: "How do Dynamic Tables differ from traditional tables created with tasks and streams?",
                options: [
                    "Dynamic tables are purely memory-based and don't consume storage.",
                    "Dynamic tables use a declarative approach where you define the target state, and Snowflake automates the refreshes.",
                    "Dynamic tables cannot be queried by BI tools.",
                    "Dynamic tables do not support standard SQL syntax."
                ],
                correct: 1,
                explanation: "Dynamic tables allow you to define the target result using a SELECT statement and a TARGET_LAG, and Snowflake handles the incremental processing to keep it up to date."
            },
            {
                id: "d9q6",
                type: "single",
                question: "What is the maximum Time Travel retention period for a Transient table?",
                options: ["0 days", "1 day", "7 days", "90 days"],
                correct: 1,
                explanation: "Transient (and Temporary) tables have a maximum Time Travel retention period of 1 day."
            },
            {
                id: "d9q7",
                type: "single",
                question: "A company wants to query large JSON files sitting in an Amazon S3 bucket without loading the data into Snowflake storage. The data should be read-only. Which table type is most appropriate?",
                options: ["Permanent Table", "Dynamic Table", "External Table", "Transient Table"],
                correct: 2,
                explanation: "External Tables are designed specifically to provide a read-only tabular interface over data stored externally in cloud storage (Data Lakes)."
            },
            {
                id: "d9q8",
                type: "single",
                question: "When a user logs out of their Snowflake session, what happens to their Temporary tables?",
                options: [
                    "They are converted to Transient tables.",
                    "They enter the Fail-safe period.",
                    "They remain until dropped manually.",
                    "They are automatically dropped and the data is purged."
                ],
                correct: 3,
                explanation: "Temporary tables exist only for the duration of the session. Once the session ends, the tables and their data are completely removed."
            }
        ]
    },
    {
        day: 10,
        title: "Snowflake Cortex AI & Snowpark",
        domain: { id: 1, name: "Architecture & Features", color: "#29b5f6" },
        estimatedTime: "90 min",
        objectives: [
            "Understand Snowflake Cortex AI and its capabilities (LLM and ML functions)",
            "Learn about Snowpark and its use cases for non-SQL developers",
            "Understand how both features push compute down to Snowflake data"
        ],
        sections: [
            {
                title: "Snowflake Cortex AI",
                content: `<p><strong>Snowflake Cortex AI</strong> is a major new addition to the COF-C03 exam. It is an intelligent, fully managed service that brings artificial intelligence (AI) and machine learning (ML) directly to the data inside Snowflake.</p>

<p>Historically, to perform ML or use Large Language Models (LLMs), you had to extract data from the database, move it to a separate AI service, process it, and bring results back. Cortex AI eliminates this data movement. You run the AI models <em>where the data lives</em>.</p>

<h4>Cortex LLM Functions</h4>
<p>Cortex provides access to industry-leading LLMs (like Meta Llama, Mistral, and Snowflake's own Arctic models) directly via simple SQL functions. Key functions include:</p>
<ul>
    <li><code>SNOWFLAKE.CORTEX.COMPLETE()</code>: Generates text based on a prompt (like a standard ChatGPT interaction).</li>
    <li><code>SNOWFLAKE.CORTEX.SUMMARIZE()</code>: Condenses long text into a short summary.</li>
    <li><code>SNOWFLAKE.CORTEX.TRANSLATE()</code>: Translates text from one language to another.</li>
    <li><code>SNOWFLAKE.CORTEX.EXTRACT_ANSWER()</code>: Finds specific answers within a provided text document.</li>
    <li><code>SNOWFLAKE.CORTEX.SENTIMENT()</code>: Analyzes text and returns a sentiment score (-1 to 1).</li>
</ul>

<h4>Cortex ML Functions</h4>
<p>Cortex also includes pre-built machine learning models that require no ML expertise to use. They are fully managed automated algorithms:</p>
<ul>
    <li><strong>Forecasting:</strong> Predicts future values based on historical time-series data.</li>
    <li><strong>Anomaly Detection:</strong> Identifies outliers in data (e.g., fraud detection, system spikes).</li>
    <li><strong>Classification:</strong> Categorizes rows into predefined classes based on patterns.</li>
</ul>

<div class="callout tip">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>For the exam, you don't need to know how to train a neural network. You just need to know that <strong>Cortex AI</strong> provides serverless, built-in SQL functions for LLMs and ML, eliminating the need to move data out of Snowflake.</p>
</div>`
            },
            {
                title: "Snowpark",
                content: `<p><strong>Snowpark</strong> is a developer framework that brings native programming languages (Python, Java, Scala) into Snowflake.</p>

<p>Before Snowpark, if you were a Python data scientist or Java engineer, you had to pull data out of Snowflake into a local Pandas dataframe or Spark cluster to do your work. <strong>Snowpark allows you to write Python, Java, or Scala code that executes natively inside Snowflake's virtual warehouses.</strong></p>

<h4>Key Snowpark Concepts</h4>
<ul>
    <li><strong>DataFrame API:</strong> Snowpark provides a DataFrame API (very similar to PySpark or Pandas) that developers use to write code.</li>
    <li><strong>Pushdown Compute:</strong> When the code runs, it is transparently converted into SQL or executed in secure sandboxes (User-Defined Functions/Stored Procedures) directly on the Snowflake compute clusters.</li>
    <li><strong>No Data Movement:</strong> The data stays secure in Snowflake. Processing happens where the data lives.</li>
</ul>

<div class="diagram-container">
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="800" height="400" fill="#111827" />
        
        <!-- Snowflake Core -->
        <rect x="250" y="250" width="300" height="100" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
        <text x="400" y="280" font-family="Arial" font-size="18" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Snowflake Data Cloud</text>
        <text x="400" y="310" font-family="Arial" font-size="14" fill="#b0bec5" text-anchor="middle">Storage & Compute (Virtual Warehouses)</text>
        <text x="400" y="330" font-family="Arial" font-size="14" fill="#b0bec5" text-anchor="middle">Data is securely stored here</text>

        <!-- Snowpark -->
        <rect x="100" y="50" width="250" height="120" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
        <text x="225" y="80" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Snowpark</text>
        <text x="225" y="105" font-family="Arial" font-size="12" fill="#e8eaf6" text-anchor="middle">Developer Framework</text>
        <text x="225" y="125" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Python, Java, Scala</text>
        <text x="225" y="145" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">DataFrame API</text>
        
        <!-- Cortex AI -->
        <rect x="450" y="50" width="250" height="120" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2"/>
        <text x="575" y="80" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Cortex AI</text>
        <text x="575" y="105" font-family="Arial" font-size="12" fill="#e8eaf6" text-anchor="middle">Fully Managed AI/ML</text>
        <text x="575" y="125" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">LLMs (Llama, Mistral)</text>
        <text x="575" y="145" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">ML (Forecast, Anomaly)</text>

        <!-- Arrows -->
        <path d="M225 170 L225 210 L350 210 L350 250" fill="none" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrowhead)"/>
        <path d="M575 170 L575 210 L450 210 L450 250" fill="none" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrowhead)"/>
        
        <text x="180" y="200" font-family="Arial" font-size="12" fill="#ffa726" text-anchor="middle">Pushdown Compute</text>
        <text x="620" y="200" font-family="Arial" font-size="12" fill="#ffa726" text-anchor="middle">Native SQL Functions</text>

        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6b7b8d" />
            </marker>
        </defs>
    </svg>
    <p class="diagram-caption">Figure 2: Cortex AI and Snowpark executing on Snowflake compute</p>
</div>

<div class="callout warning">
    <div class="callout-title">⚠️ Common Misconception</div>
    <p>Snowpark is <strong>not</strong> an external compute cluster (like Databricks). It is a set of libraries that allow your Python/Java code to run <strong>inside</strong> Snowflake's existing Virtual Warehouses.</p>
</div>`
            }
        ],
        quiz: [
            {
                id: "d10q1",
                type: "single",
                question: "Which Snowflake feature allows users to run Generative AI and LLMs directly on their data using SQL functions?",
                options: ["Snowpark", "Snowflake Cortex AI", "Dynamic Tables", "External Functions"],
                correct: 1,
                explanation: "Snowflake Cortex AI provides fully managed LLM and ML functions (like COMPLETE, SUMMARIZE) directly in Snowflake."
            },
            {
                id: "d10q2",
                type: "single",
                question: "What is the primary benefit of using Snowflake Cortex AI compared to external AI services?",
                options: [
                    "It provides free unlimited compute.",
                    "It eliminates the need to move data out of the Snowflake governance perimeter.",
                    "It automatically creates visualization dashboards.",
                    "It converts relational data into document databases."
                ],
                correct: 1,
                explanation: "Because Cortex AI functions run natively in Snowflake, data never leaves the secure, governed Snowflake environment."
            },
            {
                id: "d10q3",
                type: "multi",
                question: "Which of the following are supported languages for the Snowpark DataFrame API? (Select TWO)",
                options: ["C++", "Python", "Ruby", "Scala"],
                correct: [1, 3],
                explanation: "Snowpark supports Python, Java, and Scala for building data pipelines and processing applications."
            },
            {
                id: "d10q4",
                type: "single",
                question: "A company wants to identify fraudulent transactions in their sales data. They don't have a dedicated data science team. Which Snowflake feature offers an automated ML function for this?",
                options: [
                    "Snowflake Cortex ANOMALY_DETECTION",
                    "Snowpark DataFrame API",
                    "Snowpipe Streaming",
                    "Cortex COMPLETE"
                ],
                correct: 0,
                explanation: "Cortex AI includes an automated ML function called ANOMALY_DETECTION specifically designed to find outliers in datasets without requiring ML expertise."
            },
            {
                id: "d10q5",
                type: "single",
                question: "When a Python developer writes a Snowpark DataFrame query, where does the actual data processing happen?",
                options: [
                    "On the developer's local machine.",
                    "In an external Apache Spark cluster.",
                    "In an AWS EC2 instance separate from Snowflake.",
                    "Inside Snowflake's Virtual Warehouses via pushdown execution."
                ],
                correct: 3,
                explanation: "Snowpark translates the DataFrame operations into SQL or secure UDFs and pushes the compute down to execute inside Snowflake's Virtual Warehouses."
            },
            {
                id: "d10q6",
                type: "single",
                question: "Which Snowflake Cortex function would you use to translate a product review from Spanish to English?",
                options: ["SUMMARIZE()", "TRANSLATE()", "COMPLETE()", "EXTRACT_ANSWER()"],
                correct: 1,
                explanation: "The SNOWFLAKE.CORTEX.TRANSLATE() function handles language translation directly inside Snowflake."
            },
            {
                id: "d10q7",
                type: "single",
                question: "What does the term 'Pushdown' mean in the context of Snowpark?",
                options: [
                    "Pushing data from Snowflake to an external app.",
                    "Pushing the processing logic to execute where the data resides (in Snowflake).",
                    "Pushing cold data to long-term storage.",
                    "Pushing configuration updates to multiple accounts."
                ],
                correct: 1,
                explanation: "Pushdown means the computational logic (written in Python/Scala) is pushed down to the Snowflake database engine, rather than pulling the data to the client."
            }
        ]
    },
    {
        day: 11,
        title: "Snowflake Notebooks & Modern Tools",
        domain: { id: 1, name: "Architecture & Features", color: "#29b5f6" },
        estimatedTime: "60 min",
        objectives: [
            "Learn about Snowflake Notebooks (New in COF-C03)",
            "Understand the primary interfaces: Snowsight and SnowSQL",
            "Identify the best interface for different tasks"
        ],
        sections: [
            {
                title: "Snowflake Notebooks",
                content: `<p><strong>Snowflake Notebooks</strong> are a new feature tested on the COF-C03 exam. They provide a fully native, interactive notebook experience directly inside Snowsight (Snowflake's web UI).</p>

<p>If you've used Jupyter Notebooks, the concept is identical. A notebook is a document containing cells of code that can be executed independently. Notebooks are incredibly popular with Data Scientists and Data Engineers.</p>

<h4>Key Features of Snowflake Notebooks</h4>
<ul>
    <li><strong>Multi-language Cells:</strong> You can mix SQL cells, Python cells, and Markdown (text) cells in the <em>same notebook</em>.</li>
    <li><strong>Integrated Variables:</strong> Results from a SQL cell can be passed directly into a Python cell for further manipulation using Snowpark.</li>
    <li><strong>No Infrastructure Setup:</strong> Because it is native to Snowflake, you don't need to spin up a compute instance, manage Python environments, or configure database connections. It runs securely on your Snowflake Virtual Warehouses.</li>
    <li><strong>Use Cases:</strong> Ideal for data exploration, building machine learning models (with Cortex or Snowpark), and creating data engineering tutorials.</li>
</ul>

<div class="callout tip">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>Snowflake Notebooks bridge the gap between SQL analysts and Python data scientists by allowing both to collaborate in a single document managed entirely within Snowflake.</p>
</div>`
            },
            {
                title: "Snowsight & SnowSQL",
                content: `<p>In addition to Notebooks, you interact with Snowflake via several core interfaces.</p>

<h4>Snowsight (The Web Interface)</h4>
<p><strong>Snowsight</strong> is the primary web interface for Snowflake (it replaced the "Classic Console"). It is where most users spend their time. Features include:</p>
<ul>
    <li><strong>Worksheets:</strong> For writing and executing SQL queries. Features auto-complete, query history, and visual results.</li>
    <li><strong>Dashboards:</strong> You can turn worksheet results into simple visualizations and pin them to dashboards to share with others.</li>
    <li><strong>Admin Monitoring:</strong> View warehouse load, query history, storage usage, and manage users/roles.</li>
    <li><strong>Data Sharing:</strong> Discover and share data via the Snowflake Marketplace or Private Data Exchanges.</li>
</ul>

<h4>SnowSQL (The Command Line Interface)</h4>
<p><strong>SnowSQL</strong> is Snowflake's native command-line interface (CLI) client. It must be downloaded and installed on a user's local machine or a server.</p>
<ul>
    <li><strong>Use Cases:</strong> Ideal for automating shell scripts, executing batch SQL files, and loading/unloading data via the <code>PUT</code> and <code>GET</code> commands.</li>
    <li><strong>Configuration:</strong> Users can set connection parameters (account, username, default role) in a local configuration file so they don't have to type them every time.</li>
    <li><strong>Variables:</strong> Supports variable substitution for dynamic scripting.</li>
</ul>

<div class="callout exam-tip">
    <div class="callout-title">📝 Exam Tip</div>
    <p>If an exam question asks about automating scripts from a Linux server, or uploading local files to an internal stage using the <code>PUT</code> command, the answer is almost always <strong>SnowSQL</strong>.</p>
</div>`
            }
        ],
        quiz: [
            {
                id: "d11q1",
                type: "single",
                question: "Which of the following BEST describes Snowflake Notebooks?",
                options: [
                    "An external IDE that connects to Snowflake via ODBC.",
                    "A native interface within Snowsight that allows mixing SQL, Python, and Markdown cells.",
                    "A tool used exclusively for database administration and user creation.",
                    "A cloud storage bucket where data scientists save their scripts."
                ],
                correct: 1,
                explanation: "Snowflake Notebooks are built natively into Snowsight and allow interactive development combining SQL, Python, and Markdown."
            },
            {
                id: "d11q2",
                type: "single",
                question: "A data engineer needs to automate a nightly bash script on a Linux server that executes a series of DDL commands in Snowflake. Which tool is best suited for this?",
                options: ["Snowsight", "Snowflake Notebooks", "SnowSQL", "Snowpark"],
                correct: 2,
                explanation: "SnowSQL is the CLI tool for Snowflake and is perfect for automating batch SQL executions via shell scripts."
            },
            {
                id: "d11q3",
                type: "single",
                question: "Which tool would a user utilize to upload a local CSV file from their laptop to a Snowflake internal stage using the PUT command?",
                options: ["Snowsight", "SnowSQL", "Cortex AI", "Dynamic Tables"],
                correct: 1,
                explanation: "The PUT command, used to upload local files to an internal stage, can only be executed from SnowSQL or a supported Snowflake driver (like the Python connector). It cannot be run from Snowsight."
            },
            {
                id: "d11q4",
                type: "multi",
                question: "Which of the following can you create and view directly within the Snowsight web interface? (Select TWO)",
                options: ["Dashboards and visualizations", "Virtual network appliances", "Query execution history", "Hardware server logs"],
                correct: [0, 2],
                explanation: "Snowsight provides features for Dashboards/Visualizations and monitoring Query execution history. Snowflake handles all hardware and virtual network infrastructure, so users don't view hardware logs."
            },
            {
                id: "d11q5",
                type: "single",
                question: "In a Snowflake Notebook, how do SQL and Python interact?",
                options: [
                    "They cannot interact; a notebook must be exclusively SQL or exclusively Python.",
                    "Python can only be used to write the results of SQL to an external file.",
                    "Results from a SQL cell can be seamlessly referenced in a Python cell.",
                    "SQL cells must be run on a separate Virtual Warehouse from Python cells."
                ],
                correct: 2,
                explanation: "One of the powerful features of Snowflake Notebooks is that the output of a SQL cell can be passed as a variable into a Python cell for further processing."
            },
            {
                id: "d11q6",
                type: "single",
                question: "Which of the following is NOT a feature of Snowsight?",
                options: [
                    "Visualizing query results in charts.",
                    "Managing user roles and permissions visually.",
                    "Managing local environment variables on the user's laptop.",
                    "Exploring the Snowflake Marketplace."
                ],
                correct: 2,
                explanation: "Snowsight is a cloud-based web UI. It does not manage local environment variables on a user's laptop (that would be handled by OS settings or SnowSQL configuration)."
            }
        ]
    },
    {
        day: 12,
        title: "Connectors & Ecosystem",
        domain: { id: 1, name: "Architecture & Features", color: "#29b5f6" },
        estimatedTime: "60 min",
        objectives: [
            "Identify the native drivers provided by Snowflake",
            "Understand how third-party ETL and BI tools connect to Snowflake",
            "Understand the Snowflake Ecosystem"
        ],
        sections: [
            {
                title: "Native Drivers & Ecosystem Tools",
                content: `<p>Snowflake is designed to be the central hub of your data ecosystem. To facilitate this, Snowflake provides a wide array of native drivers and connectors, and partners with major third-party vendors.</p>

<div class="diagram-container">
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="800" height="400" fill="#111827" />
        
        <!-- Central Snowflake -->
        <circle cx="400" cy="200" r="60" fill="#1a3a5c" stroke="#29b5f6" stroke-width="3"/>
        <text x="400" y="195" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Snowflake</text>
        <text x="400" y="215" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Data Cloud</text>

        <!-- Native Drivers (Top Left) -->
        <path d="M400 200 L250 100" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <rect x="130" y="60" width="160" height="70" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
        <text x="210" y="85" font-family="Arial" font-size="14" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Native Drivers</text>
        <text x="210" y="105" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">JDBC, ODBC, Python</text>
        <text x="210" y="120" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Node.js, Go, .NET</text>

        <!-- BI Tools (Top Right) -->
        <path d="M400 200 L550 100" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <rect x="510" y="60" width="160" height="70" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
        <text x="590" y="85" font-family="Arial" font-size="14" font-weight="bold" fill="#e8eaf6" text-anchor="middle">BI & Analytics</text>
        <text x="590" y="105" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Tableau, PowerBI</text>
        <text x="590" y="120" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Looker, ThoughtSpot</text>

        <!-- Data Integration (Bottom Left) -->
        <path d="M400 200 L250 300" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <rect x="130" y="270" width="160" height="70" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
        <text x="210" y="295" font-family="Arial" font-size="14" font-weight="bold" fill="#e8eaf6" text-anchor="middle">ETL / ELT</text>
        <text x="210" y="315" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">dbt, Fivetran, Matillion</text>
        <text x="210" y="330" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Informatica, Talend</text>

        <!-- Streaming (Bottom Right) -->
        <path d="M400 200 L550 300" fill="none" stroke="#6b7b8d" stroke-width="2"/>
        <rect x="510" y="270" width="160" height="70" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2"/>
        <text x="590" y="295" font-family="Arial" font-size="14" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Streaming & Big Data</text>
        <text x="590" y="315" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Kafka Connector</text>
        <text x="590" y="330" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">Spark Connector</text>
    </svg>
    <p class="diagram-caption">Figure 3: Snowflake Ecosystem and Connectors</p>
</div>

<h4>Native Drivers</h4>
<p>If you are building a custom application and need to query Snowflake, you will use one of the native drivers provided and maintained by Snowflake:</p>
<ul>
    <li><strong>Standard Database Drivers:</strong> JDBC (Java) and ODBC (C/C++). These are universal standards supported by almost all tools.</li>
    <li><strong>Language-Specific Drivers:</strong> Python Connector, Node.js Driver, .NET Driver, and Go Driver.</li>
</ul>

<h4>Ecosystem Connectors</h4>
<p>Snowflake provides native connectors for popular Big Data frameworks:</p>
<ul>
    <li><strong>Snowflake Connector for Spark:</strong> Allows Spark environments (like Databricks or AWS EMR) to read/write data rapidly in Snowflake using pushdown execution.</li>
    <li><strong>Snowflake Connector for Kafka:</strong> Seamlessly reads streams of messages from Apache Kafka and loads them continuously into Snowflake tables using Snowpipe Streaming.</li>
</ul>

<h4>Partner Tools</h4>
<p>Because Snowflake uses standard SQL, almost any tool can connect via JDBC/ODBC. However, Snowflake has deep partnerships with:</p>
<ul>
    <li><strong>ETL/ELT Tools:</strong> Fivetran and Stitch (for extracting data from sources and loading into Snowflake), dbt and Matillion (for transforming data once it is inside Snowflake).</li>
    <li><strong>BI (Business Intelligence) Tools:</strong> Tableau, Power BI, Looker, ThoughtSpot. These tools send SQL queries to Snowflake, Snowflake processes the math using Virtual Warehouses, and returns the summarized data for visualization.</li>
</ul>

<div class="callout warning">
    <div class="callout-title">⚠️ Common Misconception</div>
    <p>Snowflake is a data platform, not a visualization tool. While Snowsight has basic charting, complex reporting requires connecting a BI tool like Tableau or Power BI.</p>
</div>`
            }
        ],
        quiz: [
            {
                id: "d12q1",
                type: "multi",
                question: "Which of the following are native drivers officially provided by Snowflake? (Select TWO)",
                options: ["PHP Driver", "Node.js Driver", "Ruby Driver", "Python Connector"],
                correct: [1, 3],
                explanation: "Snowflake provides official drivers for Node.js, Python, Go, .NET, JDBC, and ODBC. There are no official native drivers for PHP or Ruby."
            },
            {
                id: "d12q2",
                type: "single",
                question: "A company uses Apache Kafka to stream web click events. Which tool is specifically designed to load this continuous stream of data directly into Snowflake tables?",
                options: ["Snowflake Connector for Spark", "Snowflake ODBC Driver", "Snowflake Connector for Kafka", "SnowSQL"],
                correct: 2,
                explanation: "The Snowflake Connector for Kafka is purpose-built to read from Kafka topics and load data into Snowflake, often utilizing Snowpipe Streaming."
            },
            {
                id: "d12q3",
                type: "single",
                question: "If you connect Tableau to Snowflake, where does the heavy computational processing (aggregations, joins) take place?",
                options: [
                    "On the Tableau Server.",
                    "On the user's laptop running Tableau Desktop.",
                    "In the Snowflake Virtual Warehouse.",
                    "In the Snowflake Cloud Services layer."
                ],
                correct: 2,
                explanation: "Tableau sends SQL queries to Snowflake. The heavy lifting is done by the Virtual Warehouses in Snowflake, and only the aggregated results are sent back to Tableau."
            },
            {
                id: "d12q4",
                type: "single",
                question: "Which standardized database drivers does Snowflake support for legacy applications and third-party tools that don't have a native connector?",
                options: ["JDBC and ODBC", "SOAP and REST", "GraphQL and gRPC", "FTP and SFTP"],
                correct: 0,
                explanation: "JDBC (Java Database Connectivity) and ODBC (Open Database Connectivity) are the industry standards for database connections, heavily supported by Snowflake."
            },
            {
                id: "d12q5",
                type: "single",
                question: "Which of the following tools is an ELT transformation tool that pushes SQL logic down into Snowflake for execution?",
                options: ["Looker", "dbt", "PowerBI", "Kafka"],
                correct: 1,
                explanation: "dbt (data build tool) is an ELT tool focused entirely on the 'T' (Transformation). It compiles code into standard SQL and executes it natively inside Snowflake."
            }
        ]
    },
    {
        day: 13,
        title: "Cloud Platforms & Regions",
        domain: { id: 1, name: "Architecture & Features", color: "#29b5f6" },
        estimatedTime: "60 min",
        objectives: [
            "Identify the supported Cloud Service Providers (CSPs)",
            "Understand Snowflake's global infrastructure and region strategies",
            "Understand cross-cloud capabilities"
        ],
        sections: [
            {
                title: "Cloud Agnostic Architecture",
                content: `<p>Snowflake is a SaaS product that runs on top of public cloud infrastructure. However, as a user, you never interact with that underlying infrastructure directly. You interact with Snowflake.</p>

<p>Snowflake is deployed across the three major Cloud Service Providers (CSPs):</p>
<ul>
    <li><strong>Amazon Web Services (AWS):</strong> The original cloud provider for Snowflake. Supports the vast majority of regions globally.</li>
    <li><strong>Microsoft Azure:</strong> Supported in many regions.</li>
    <li><strong>Google Cloud Platform (GCP):</strong> Supported in many regions.</li>
</ul>

<h4>Choosing a Platform and Region</h4>
<p>When you create a Snowflake account, you must choose exactly <strong>one</strong> cloud provider and <strong>one</strong> region for that specific account. Your data and compute for that account live entirely within that chosen region.</p>
<p>Companies choose their platform and region based on:</p>
<ul>
    <li><strong>Data Residency / Compliance:</strong> E.g., A European company may require their data to physically reside in an AWS region in Germany (Frankfurt) for GDPR reasons.</li>
    <li><strong>Latency:</strong> You want your Snowflake region to be as close to your source data and your end users as possible. If your company's AWS servers are in <code>us-east-1</code>, your Snowflake account should also be in AWS <code>us-east-1</code> to minimize data transfer time and egress costs.</li>
</ul>

<div class="callout tip">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>The Snowflake experience is identical regardless of the underlying cloud. The SQL is the same, the UI is the same. Snowflake abstracts away the cloud provider differences.</p>
</div>

<h4>Cross-Cloud and Cross-Region Capabilities</h4>
<p>Because Snowflake's software layer is identical everywhere, it enables a truly global data network. Features like <strong>Database Replication</strong> and <strong>Data Sharing</strong> can work across different regions and even different cloud providers.</p>
<p>For example, you could have a primary account on AWS in New York, and continuously replicate your databases to a secondary disaster recovery account on Azure in London. If AWS goes down, you can failover to Azure.</p>

<div class="callout exam-tip">
    <div class="callout-title">📝 Exam Tip</div>
    <p>A single Snowflake <strong>Account</strong> is hosted in exactly one region on one cloud provider. However, a Snowflake <strong>Organization</strong> can contain multiple accounts spread across different clouds and regions.</p>
</div>`
            }
        ],
        quiz: [
            {
                id: "d13q1",
                type: "multi",
                question: "Which of the following cloud providers natively host Snowflake? (Select THREE)",
                options: ["Amazon Web Services (AWS)", "IBM Cloud", "Microsoft Azure", "Oracle Cloud", "Google Cloud Platform (GCP)"],
                correct: [0, 2, 4],
                explanation: "Snowflake is hosted on the 'Big 3' public clouds: AWS, Azure, and GCP."
            },
            {
                id: "d13q2",
                type: "single",
                question: "A single Snowflake account can span across both AWS and Azure for maximum redundancy.",
                options: ["True", "False"],
                correct: 1,
                explanation: "False. A single Account must reside in exactly one cloud provider and one region. To span clouds, you must create multiple accounts within your Organization and use Database Replication."
            },
            {
                id: "d13q3",
                type: "single",
                question: "Why might a company choose to locate their Snowflake account in GCP europe-west3 (Frankfurt)?",
                options: [
                    "Because Snowflake runs faster on GCP than AWS.",
                    "Because Snowflake features are only available in Europe.",
                    "To comply with data residency laws requiring data to physically remain in Germany.",
                    "Because GCP is the only cloud that supports Virtual Warehouses."
                ],
                correct: 2,
                explanation: "Data residency and compliance (like GDPR) are major reasons companies choose specific regions. Snowflake performance and features are generally consistent across all providers."
            },
            {
                id: "d13q4",
                type: "single",
                question: "If a company has their Snowflake account on AWS us-east-1, but wants to securely share data with a partner whose Snowflake account is on Azure uk-south, is this possible?",
                options: [
                    "No, Data Sharing only works within the same cloud provider.",
                    "No, Data Sharing only works within the same region.",
                    "Yes, by replicating the data to an account in the partner's region/cloud, and then sharing it.",
                    "Yes, but only if they use External Tables."
                ],
                correct: 2,
                explanation: "While direct Data Sharing requires the consumer and provider to be in the same region, you can easily replicate the database to a Snowflake account in the target region/cloud, and share it from there."
            },
            {
                id: "d13q5",
                type: "single",
                question: "Which entity groups together multiple Snowflake Accounts across different regions and cloud providers?",
                options: ["The Cloud Services Layer", "The Database", "The Organization", "The Virtual Warehouse"],
                correct: 2,
                explanation: "The Organization is the top-level entity that manages all your accounts, regardless of which cloud or region those accounts are deployed in."
            }
        ]
    },
    {
        day: 14,
        title: "Domain 1 Mega Review",
        subtitle: "Architecture & Features Summary (31% of Exam)",
        domain: { id: 1, name: "Architecture & Features", color: "#66bb6a" },
        estimatedTime: "120 min",
        objectives: [
            "Review Snowflake's 3-Tier Architecture",
            "Review Caching Layers",
            "Review Editions and Data Protection",
            "Review Object Hierarchy and New AI Features",
            "Take the comprehensive Domain 1 quiz"
        ],
        sections: [
            {
                title: "Domain 1 Core Concepts Review",
                content: `<p>Domain 1 (Architecture & Features) makes up roughly 31% of the COF-C03 exam. You must be completely confident in the foundational architecture of Snowflake.</p>

<h4>1. The Three Tiers</h4>
<ul>
    <li><strong>Cloud Services:</strong> The "Brain". Handles authentication, metadata, query parsing, optimization, and security. Requires no manual management.</li>
    <li><strong>Compute (Query Processing):</strong> The "Muscle". Virtual Warehouses (MPP clusters) execute the queries. They can scale up (bigger size) or out (more clusters). They do not store data permanently.</li>
    <li><strong>Storage (Database Storage):</strong> The "Filing Cabinet". Data is stored in immutable micro-partitions (columnar format) in cloud object storage (S3/Blob/GCS). You only pay for what you store.</li>
</ul>

<h4>2. Caching</h4>
<ul>
    <li><strong>Result Cache:</strong> Lives in Cloud Services. Remembers exactly what a query returned for 24 hours. (Free to use, bypasses warehouses).</li>
    <li><strong>Local Disk Cache (Data Cache):</strong> Lives in the Virtual Warehouse. Stores data previously read from storage. Erased when the warehouse is suspended.</li>
    <li><strong>Remote Storage:</strong> The actual data in micro-partitions.</li>
</ul>

<h4>3. Editions & Protection</h4>
<ul>
    <li><strong>Standard Edition:</strong> 1 day Time Travel.</li>
    <li><strong>Enterprise Edition:</strong> 90 days Time Travel, Multi-cluster warehouses, Materialized Views.</li>
    <li><strong>Business Critical:</strong> HIPAA compliance, PrivateLink, Tri-secret Secure.</li>
    <li><strong>Fail-safe:</strong> Always 7 days for Permanent tables. Cannot be queried by users; only Snowflake Support can recover it.</li>
</ul>

<h4>4. Modern Features (COF-C03 Focus)</h4>
<ul>
    <li><strong>Cortex AI:</strong> Native LLM and ML functions. No data movement required.</li>
    <li><strong>Iceberg Tables:</strong> Open standard format (Parquet) allowing multi-engine interoperability without ingestion.</li>
    <li><strong>Dynamic Tables:</strong> Declarative data pipelines using target-state SQL.</li>
    <li><strong>Snowpark:</strong> Python/Java/Scala DataFrame API pushing compute down into Snowflake.</li>
    <li><strong>Notebooks:</strong> Native interactive development environment in Snowsight mixing SQL and Python.</li>
</ul>`
            }
        ],
        quiz: [
            {
                id: "d14q1",
                type: "single",
                question: "Which layer of the Snowflake architecture is responsible for managing metadata and query optimization?",
                options: ["Query Processing (Compute) Layer", "Database Storage Layer", "Cloud Services Layer", "Network Layer"],
                correct: 2,
                explanation: "The Cloud Services layer acts as the 'brain', handling metadata, security, and query optimization."
            },
            {
                id: "d14q2",
                type: "single",
                question: "A Virtual Warehouse in Snowflake is suspended. Which cache is immediately lost?",
                options: ["The Result Cache", "The Local Disk Cache (Data Cache)", "The Metadata Cache", "The Fail-safe Cache"],
                correct: 1,
                explanation: "The Local Disk Cache is tied to the SSDs of the running Virtual Warehouse. When suspended, the compute nodes drop, and the cache is cleared."
            },
            {
                id: "d14q3",
                type: "multi",
                question: "Which of the following features require Enterprise Edition or higher? (Select TWO)",
                options: ["Time Travel up to 1 day", "Multi-cluster Virtual Warehouses", "Materialized Views", "Fail-safe of 7 days"],
                correct: [1, 2],
                explanation: "Standard edition has 1-day Time Travel and 7-day Fail-safe. Multi-cluster warehouses and Materialized Views require Enterprise Edition."
            },
            {
                id: "d14q4",
                type: "single",
                question: "What is the primary architectural difference between a Shared-Disk and a Shared-Nothing architecture, and how does Snowflake fit in?",
                options: [
                    "Snowflake is purely Shared-Disk.",
                    "Snowflake is purely Shared-Nothing.",
                    "Snowflake is a hybrid: Centralized storage (Shared-Disk) with independent compute clusters (Shared-Nothing).",
                    "Snowflake relies on on-premise hardware, making it neither."
                ],
                correct: 2,
                explanation: "Snowflake's multi-cluster shared data architecture provides a central storage repository accessible by independent, isolated compute clusters."
            },
            {
                id: "d14q5",
                type: "single",
                question: "A user drops a Permanent table. What is the maximum number of days the data can be recovered by the user using Time Travel before it enters Fail-safe (assuming Enterprise Edition)?",
                options: ["1 day", "7 days", "14 days", "90 days"],
                correct: 3,
                explanation: "With Enterprise Edition, Time Travel for Permanent tables can be configured up to 90 days."
            },
            {
                id: "d14q6",
                type: "single",
                question: "Which of the following table types is NOT subjected to a 7-day Fail-safe period?",
                options: ["Permanent Tables", "Dynamic Tables", "Transient Tables", "Standard Tables"],
                correct: 2,
                explanation: "Transient (and Temporary) tables do not have a Fail-safe period, which reduces their storage costs."
            },
            {
                id: "d14q7",
                type: "single",
                question: "A user runs a complex aggregation query that takes 2 minutes. Five minutes later, another user in a different Virtual Warehouse runs the EXACT same query on the same data, which hasn't changed. How long will the second query likely take?",
                options: [
                    "2 minutes, because they are in a different warehouse.",
                    "Milliseconds, because it will hit the Result Cache in the Cloud Services layer.",
                    "Milliseconds, because it will hit the Local Disk Cache.",
                    "1 minute, because query optimization takes half the time."
                ],
                correct: 1,
                explanation: "The Result Cache lives in the Cloud Services layer, meaning it is accessible globally across the account regardless of which warehouse is used."
            },
            {
                id: "d14q8",
                type: "single",
                question: "Which new Snowflake feature allows you to define the target state of a data transformation using SQL, while Snowflake automatically manages the incremental refreshes?",
                options: ["Snowpark", "Iceberg Tables", "Dynamic Tables", "Cortex AI"],
                correct: 2,
                explanation: "Dynamic Tables provide a declarative approach to data engineering by defining the target state (via a SELECT query) and letting Snowflake automate the refresh pipeline."
            },
            {
                id: "d14q9",
                type: "multi",
                question: "Which of the following are true regarding micro-partitions in Snowflake? (Select TWO)",
                options: [
                    "They are physically stored in a columnar format.",
                    "Users must manually define their size and boundaries.",
                    "They are immutable (cannot be changed once written).",
                    "They can only store up to 1MB of uncompressed data."
                ],
                correct: [0, 2],
                explanation: "Micro-partitions are columnar and immutable. They store 50-500MB of uncompressed data, and Snowflake manages them automatically (no manual definition required)."
            },
            {
                id: "d14q10",
                type: "single",
                question: "What is the fully qualified name format for an object in Snowflake?",
                options: [
                    "account.database.table",
                    "database.schema.table",
                    "schema.database.object",
                    "organization.account.database.schema"
                ],
                correct: 1,
                explanation: "Objects are identified by database_name.schema_name.object_name."
            },
            {
                id: "d14q11",
                type: "single",
                question: "A data scientist wants to use Python to train a machine learning model on data stored in Snowflake without extracting the data to their laptop. Which Snowflake feature enables this?",
                options: ["Snowpipe", "Snowpark", "External Tables", "Fail-safe"],
                correct: 1,
                explanation: "Snowpark allows developers to write Python, Java, or Scala code that pushes the compute down into Snowflake's native environment."
            },
            {
                id: "d14q12",
                type: "single",
                question: "Your company has highly sensitive data and requires dedicated cloud infrastructure and compliance with HIPAA. Which Snowflake edition is the MINIMUM requirement?",
                options: ["Standard", "Enterprise", "Business Critical", "Virtual Private Snowflake (VPS)"],
                correct: 2,
                explanation: "Business Critical is the minimum edition required for HIPAA/PCI compliance, PrivateLink support, and Tri-Secret Secure."
            },
            {
                id: "d14q13",
                type: "single",
                question: "How do Apache Iceberg Tables differ from Snowflake Permanent Tables?",
                options: [
                    "Iceberg tables do not use Virtual Warehouses for compute.",
                    "Iceberg tables are an open format (Parquet) allowing external engines to read/write the data.",
                    "Iceberg tables must be refreshed manually every 24 hours.",
                    "Iceberg tables do not support standard SQL queries."
                ],
                correct: 1,
                explanation: "Iceberg tables store data externally in open formats like Parquet, allowing multi-engine interoperability while still being queryable by Snowflake."
            },
            {
                id: "d14q14",
                type: "single",
                question: "Which Snowflake tool is best suited for writing a script to automate the upload of a local file to an internal stage?",
                options: ["Snowsight", "Snowflake Notebooks", "SnowSQL", "Snowpark DataFrame API"],
                correct: 2,
                explanation: "SnowSQL is the CLI tool and is the standard way to script and automate PUT commands to upload local files."
            },
            {
                id: "d14q15",
                type: "single",
                question: "What built-in Snowflake feature would allow you to generate summaries of customer reviews using Large Language Models (LLMs) with standard SQL?",
                options: ["Snowflake Cortex AI", "Dynamic Tables", "Materialized Views", "Apache Iceberg"],
                correct: 0,
                explanation: "Snowflake Cortex AI provides LLM functions (like SUMMARIZE, COMPLETE, TRANSLATE) natively within Snowflake using standard SQL."
            }
        ]
    }
];
