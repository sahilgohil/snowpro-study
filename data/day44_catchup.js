window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.day44_catchup = [
    {
        day: 44,
        title: "COF-C03 Final Catch-Up",
        subtitle: "Mastering the Latest Advanced Features",
        domain: { id: 0, name: "Bonus Module", color: "#10b981" },
        estimatedTime: "60 min",
        objectives: [
            "Understand Snowpark Container Services (SPCS) and its use cases",
            "Differentiate Dynamic Tables from Materialized Views and Streams/Tasks",
            "Explain Iceberg Tables and their catalog options",
            "Describe the purpose of Event Tables in Snowflake",
            "Understand how to use Secrets Management for external access",
            "Identify the use cases for Aggregation and Projection Policies",
            "Configure and use Budgets for credit monitoring"
        ],
        sections: [
            {
                title: "1. Snowpark Container Services (SPCS)",
                content: `<p><strong>Snowpark Container Services (SPCS)</strong> is a fully managed container offering that allows you to easily deploy, manage, and scale containerized applications (like Docker containers) directly within Snowflake.</p>
<div class="callout key-takeaway">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>SPCS allows you to run non-SQL code, complex ML models, LLMs, and even full-stack applications securely inside Snowflake's perimeter, without moving data out.</p>
</div>
<p><strong>Key Concepts:</strong></p>
<ul>
    <li><strong>Compute Pools:</strong> SPCS workloads run on <em>Compute Pools</em>, which are collections of compute nodes (including GPUs for AI/ML) that are distinct from standard Virtual Warehouses.</li>
    <li><strong>Image Repository:</strong> Snowflake provides an integrated image registry where you push your container images.</li>
    <li><strong>Services and Jobs:</strong> You can run long-running services (like a web app or API) or short-lived jobs (like a batch ML training task).</li>
</ul>`
            },
            {
                title: "2. Dynamic Tables",
                content: `<p><strong>Dynamic Tables</strong> are the building blocks of declarative continuous data pipelines. You specify the query, and Snowflake automatically manages the incremental updates (refreshes) to keep the table up-to-date based on a target "lag".</p>
<div class="comparison-table">
    <table>
        <thead>
            <tr>
                <th>Feature</th>
                <th>Dynamic Tables</th>
                <th>Materialized Views</th>
                <th>Tasks & Streams</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Approach</strong></td>
                <td>Declarative (define the result)</td>
                <td>Declarative (transparent rewrite)</td>
                <td>Imperative (define the exact steps)</td>
            </tr>
            <tr>
                <td><strong>Refresh Mechanism</strong></td>
                <td>Automated, based on Target Lag</td>
                <td>Automated, continuous (background)</td>
                <td>Scheduled by user (CRON or specific intervals)</td>
            </tr>
            <tr>
                <td><strong>Query Support</strong></td>
                <td>Complex joins, aggregations, window functions</td>
                <td>Limited (no complex joins, no window functions)</td>
                <td>Full SQL support</td>
            </tr>
            <tr>
                <td><strong>Use Case</strong></td>
                <td>Building reliable, multi-step data transformation pipelines</td>
                <td>Improving performance of frequent, simple queries</td>
                <td>Complex orchestration, calling stored procedures, multi-step workflows</td>
            </tr>
        </tbody>
    </table>
</div>
<div class="callout exam-tip">
    <div class="callout-title">📝 Exam Tip</div>
    <p>If the scenario asks for a declarative data pipeline with complex joins and a specific target lag (e.g., "data must be at most 5 minutes old"), choose Dynamic Tables. If it's about query acceleration for simple queries, choose Materialized Views.</p>
</div>`
            },
            {
                title: "3. Iceberg Tables",
                content: `<p><strong>Iceberg Tables</strong> bring open table formats to Snowflake. Apache Iceberg is an open-source table format for huge analytic datasets. Snowflake Iceberg tables combine the performance of Snowflake with open-format data stored in external cloud storage.</p>
<p>There are two main catalog configurations:</p>
<ul>
    <li><strong>Snowflake as the Catalog:</strong> Snowflake manages the Iceberg metadata. These tables are <strong>read-write</strong>. You can insert, update, delete, and merge data using Snowflake SQL, just like standard tables. The data files (Parquet) and metadata are written to your external cloud storage.</li>
    <li><strong>External Catalog Integration:</strong> You use an external catalog (like AWS Glue). These tables are currently <strong>read-only</strong> in Snowflake. Snowflake acts as a compute engine to query data managed by another system.</li>
</ul>`
            },
            {
                title: "4. Event Tables",
                content: `<p><strong>Event Tables</strong> are a special type of table designed specifically to capture log messages, trace events, and metrics from your user-defined functions (UDFs), stored procedures, and external functions.</p>
<div class="callout key-takeaway">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>Instead of creating custom logging tables and writing manual INSERT statements inside your code, you use standard logging libraries (e.g., Python's <code>logging</code> module in Snowpark). Snowflake automatically routes those log entries into the active Event Table for your account.</p>
</div>
<p>To use them, you must create an event table and set it as the active event table for the account (or session) using the <code>EVENT_TABLE</code> parameter.</p>`
            },
            {
                title: "5. Secrets Management",
                content: `<p>When connecting to external systems (e.g., calling an external API via External Network Access), you need to authenticate. Hardcoding credentials is a security risk.</p>
<p>Snowflake's <strong>Secrets Management</strong> uses the <code>CREATE SECRET</code> object to securely store credentials.</p>
<ul>
    <li><strong>Supported types:</strong> Passwords, OAuth tokens, and generic strings.</li>
    <li><strong>Usage:</strong> Secrets are referenced by Network Rules and External Access Integrations to securely pass credentials to external APIs without exposing them to developers or in code.</li>
</ul>`
            },
            {
                title: "6. Governance Policies (Aggregation & Projection)",
                content: `<p>Snowflake has expanded its Data Governance features beyond Row Access Policies and Masking Policies with two new table-level policies:</p>
<ul>
    <li><strong>Aggregation Policies:</strong> Ensure privacy by requiring queries to aggregate data rather than returning individual rows. For example, you can enforce that a query must use <code>SUM()</code> or <code>AVG()</code> and process at least 5 rows to return a result. This prevents users from pinpointing individual records.</li>
    <li><strong>Projection Policies:</strong> Restrict whether specific columns can be included in the <code>SELECT</code> clause (projected) of a query. If a column is restricted, a user can still use it in a <code>WHERE</code> clause or <code>JOIN</code> condition, but they cannot see the raw values in the result set.</li>
</ul>`
            },
            {
                title: "7. Budgets",
                content: `<p><strong>Budgets</strong> provide a proactive way to monitor and control compute spending (credit usage) in Snowflake.</p>
<ul>
    <li><strong>Account Budgets:</strong> Monitor spending for all compute resources across the entire account.</li>
    <li><strong>Custom Budgets:</strong> Monitor spending for a specific group of compute resources (e.g., a specific set of warehouses used by the Marketing department).</li>
</ul>
<div class="callout key-takeaway">
    <div class="callout-title">💡 Key Takeaway</div>
    <p>Budgets send alert notifications when the projected credit usage for the month exceeds the defined spending limit. Unlike Resource Monitors, which can actively suspend warehouses, Budgets are strictly for monitoring and alerting (they do not suspend compute).</p>
</div>`
            }
        ],
        quiz: [
            {
                id: "d44q1",
                type: "single",
                question: "Which Snowflake feature allows you to run containerized applications, such as a custom machine learning model requiring GPU acceleration, directly within Snowflake?",
                options: [
                    "External Functions",
                    "Snowpark Container Services (SPCS)",
                    "Virtual Warehouses",
                    "External Network Access"
                ],
                correct: 1,
                explanation: "Snowpark Container Services (SPCS) allows you to deploy and manage containerized applications, including those requiring GPUs, securely within Snowflake's perimeter using Compute Pools."
            },
            {
                id: "d44q2",
                type: "single",
                question: "What is the specific compute resource used to run Snowpark Container Services workloads?",
                options: [
                    "Virtual Warehouses",
                    "Compute Pools",
                    "Serverless Tasks",
                    "External Functions"
                ],
                correct: 1,
                explanation: "SPCS workloads run on Compute Pools, which are dedicated collections of compute nodes distinct from standard Virtual Warehouses."
            },
            {
                id: "d44q3",
                type: "single",
                question: "You need to build a data pipeline that continuously transforms data using complex joins. You want to define the final table structure and have Snowflake automatically manage the incremental refreshes to ensure data is never older than 10 minutes. Which feature should you use?",
                options: [
                    "Materialized Views",
                    "Tasks and Streams",
                    "Dynamic Tables",
                    "External Tables"
                ],
                correct: 2,
                explanation: "Dynamic Tables are designed for declarative continuous data pipelines. You specify the query and the target lag (e.g., 10 minutes), and Snowflake automatically manages the refreshes. Materialized Views do not support complex joins."
            },
            {
                id: "d44q4",
                type: "single",
                question: "How does the refresh mechanism of Dynamic Tables differ from Tasks?",
                options: [
                    "Dynamic Tables are scheduled using a CRON expression, while Tasks use a target lag.",
                    "Dynamic Tables use a declarative target lag to determine when to refresh, while Tasks are imperatively scheduled based on time or conditions.",
                    "Dynamic Tables only refresh manually, while Tasks are automatic.",
                    "There is no difference; both use standard CRON scheduling."
                ],
                correct: 1,
                explanation: "Dynamic Tables use a declarative 'Target Lag' to maintain freshness, whereas Tasks require you to imperatively schedule when they should run (e.g., every hour or via CRON)."
            },
            {
                id: "d44q5",
                type: "single",
                question: "You want to create an Iceberg table in Snowflake where Snowflake manages the catalog and you can perform INSERT, UPDATE, and DELETE operations. How is this achieved?",
                options: [
                    "By creating an Iceberg table with an External Catalog Integration (e.g., AWS Glue).",
                    "By creating an Iceberg table using Snowflake as the catalog.",
                    "Iceberg tables in Snowflake are always read-only, regardless of the catalog.",
                    "By using standard External Tables."
                ],
                correct: 1,
                explanation: "When you configure an Iceberg table to use Snowflake as the catalog, it is fully read-write. You can use standard DML operations (INSERT, UPDATE, DELETE) on it."
            },
            {
                id: "d44q6",
                type: "single",
                question: "If you connect an Iceberg table in Snowflake to an external catalog like AWS Glue, what operations are supported?",
                options: [
                    "Full read-write capabilities.",
                    "Read-only queries.",
                    "Only DDL operations.",
                    "Only COPY INTO operations."
                ],
                correct: 1,
                explanation: "When an Iceberg table is linked to an external catalog, Snowflake acts purely as a compute engine to query the data, so the table is read-only within Snowflake."
            },
            {
                id: "d44q7",
                type: "single",
                question: "What is the primary purpose of an Event Table in Snowflake?",
                options: [
                    "To store system-level audit logs for user logins.",
                    "To track query history for performance tuning.",
                    "To capture log messages and trace events from stored procedures and UDFs.",
                    "To schedule automated tasks."
                ],
                correct: 2,
                explanation: "Event Tables are specifically designed to capture log messages, traces, and metrics generated by your custom code in UDFs, stored procedures, and external functions."
            },
            {
                id: "d44q8",
                type: "single",
                question: "How do you ensure that log messages generated by a Python stored procedure are written to an Event Table?",
                options: [
                    "Write standard INSERT statements inside the stored procedure targeting the Event Table.",
                    "Use Python's built-in `logging` module, and ensure the Event Table is set as the active event table for the account or session.",
                    "Configure a Task to extract logs from the query history.",
                    "Event tables automatically capture all logs without any configuration."
                ],
                correct: 1,
                explanation: "You use standard logging libraries (like Python's `logging` module). As long as an Event Table is set as the active `EVENT_TABLE` for the account/session, Snowflake automatically routes those logs to it."
            },
            {
                id: "d44q9",
                type: "single",
                question: "Which Snowflake object is specifically used to securely store an OAuth token for authenticating with an external API?",
                options: [
                    "External Access Integration",
                    "Network Rule",
                    "Secret",
                    "Security Integration"
                ],
                correct: 2,
                explanation: "The `CREATE SECRET` object securely stores credentials (like OAuth tokens or passwords) which can then be referenced by External Access Integrations."
            },
            {
                id: "d44q10",
                type: "single",
                question: "When configuring External Network Access, how do Secrets interact with External Access Integrations?",
                options: [
                    "Secrets are directly embedded into the stored procedure code.",
                    "The External Access Integration references the Secret, making the credentials available to the UDF or procedure without exposing the raw values.",
                    "Secrets define the network endpoints allowed to be accessed.",
                    "Secrets are used to encrypt the data sent over the network."
                ],
                correct: 1,
                explanation: "An External Access Integration acts as a bridge. It references the Secret (holding the credentials) and a Network Rule (defining the destination), allowing secure API calls from your code."
            },
            {
                id: "d44q11",
                type: "single",
                question: "You want to ensure that analysts can only view average salary data across departments and cannot query the specific salary of an individual employee. Which governance feature should you use?",
                options: [
                    "Row Access Policy",
                    "Masking Policy",
                    "Aggregation Policy",
                    "Projection Policy"
                ],
                correct: 2,
                explanation: "An Aggregation Policy requires that queries against a table aggregate the data (e.g., using AVG or SUM) and often mandates processing a minimum number of rows, preventing access to individual records."
            },
            {
                id: "d44q12",
                type: "single",
                question: "A data engineer applies a Projection Policy to the 'Social_Security_Number' column. What does this achieve?",
                options: [
                    "It encrypts the column data at rest.",
                    "It replaces the actual SSN with asterisks in the query result.",
                    "It prevents the column from being included in the SELECT clause of a query, while still allowing it to be used in joins or WHERE clauses.",
                    "It completely hides the row if the SSN is null."
                ],
                correct: 2,
                explanation: "A Projection Policy restricts a column from being projected (selected) in the result set, but users can still use it for filtering (WHERE) or joining."
            },
            {
                id: "d44q13",
                type: "single",
                question: "What action does a Snowflake Budget take when the projected credit usage exceeds the defined spending limit?",
                options: [
                    "It automatically suspends all Virtual Warehouses in the account.",
                    "It sends an alert notification.",
                    "It blocks any new queries from executing.",
                    "It downgrades the size of the Virtual Warehouses to save costs."
                ],
                correct: 1,
                explanation: "Unlike Resource Monitors which can actively suspend compute, Budgets are strictly for monitoring and sending alert notifications when projected spending exceeds limits."
            },
            {
                id: "d44q14",
                type: "single",
                question: "You want to monitor the combined credit usage of three specific Virtual Warehouses used by the Data Science team. Which feature should you configure?",
                options: [
                    "Account Budget",
                    "Custom Budget",
                    "Resource Monitor",
                    "Compute Pool"
                ],
                correct: 1,
                explanation: "A Custom Budget allows you to group specific compute resources (like a set of warehouses) and monitor their combined credit spending against a defined limit."
            }
        ]
    }
];
