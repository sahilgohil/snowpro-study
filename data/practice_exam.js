window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.practiceExam = [
    {
        day: 43,
        title: "Full Practice Exam — 100 Questions",
        subtitle: "Simulated COF-C03 Exam at Real Difficulty Level",
        domain: {
            id: 0,
            name: "Practice Exam",
            color: "#ff6b6b"
        },
        estimatedTime: "115 min",
        objectives: [
            "Complete a full-length practice exam under timed conditions",
            "Test knowledge across all 5 exam domains at exam difficulty",
            "Identify weak areas for final review"
        ],
        sections: [
            {
                title: "Practice Exam Instructions",
                content: `<p>This is a 100-question practice exam simulating the real COF-C03 certification exam.</p>
<p>You have 115 minutes on the real exam, so you should aim for ~69 seconds per question.</p>
<p>The exam includes questions distributed across the five domains:</p>
<ul>
<li>Domain 1: Architecture & Features (31%)</li>
<li>Domain 2: Security & Governance (20%)</li>
<li>Domain 3: Data Loading & Connectivity (18%)</li>
<li>Domain 4: Performance & Transformation (21%)</li>
<li>Domain 5: Data Collaboration (10%)</li>
</ul>
<div class="callout exam-tip">
<div class="callout-title">💡 Exam Difficulty</div>
<p>This exam is at the SAME difficulty level as the real COF-C03 exam. A score of 75% or higher indicates strong readiness. All questions have detailed explanations.</p>
</div>`
            }
        ],
        quiz: [
    {
        "id": "peq1",
        "type": "single",
        "question": "A financial firm is evaluating Snowflake and wants to understand how the platform secures user access and manages query parsing. Which layer of the Snowflake architecture is primarily responsible for authentication, infrastructure management, and query parsing?",
        "options": [
            "Database Storage",
            "Query Processing",
            "Cloud Services",
            "Data Exchange"
        ],
        "correct": 2,
        "explanation": "The Cloud Services layer is the 'brain' of Snowflake, handling authentication, infrastructure management, metadata management, query parsing, and access control. Option A is wrong because Database Storage only handles the physical persistence of data. Option B is wrong because Query Processing (virtual warehouses) is only responsible for executing the queries. Option D is wrong because the Data Exchange is a feature for sharing data, not an architectural layer."
    },
    {
        "id": "peq2",
        "type": "multi",
        "question": "A user submits a complex SELECT statement. Which of the following tasks are performed by the Cloud Services layer during the lifecycle of this query? (Select TWO)",
        "options": [
            "Fetching micro-partitions from cloud storage",
            "Checking if the user has SELECT privileges on the tables",
            "Caching the final result set of the query",
            "Executing the SQL joins and aggregations"
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "The Cloud Services layer handles authorization (Option B) and manages the result cache (Option C). Option A is wrong because the virtual warehouse (Query Processing layer) fetches data from storage during execution. Option D is wrong because actual SQL execution (joins/aggregations) is performed by the virtual warehouse."
    },
    {
        "id": "peq3",
        "type": "single",
        "question": "A data engineering team is trying to optimize the performance of a multi-terabyte table without manually defining traditional indexes. How does Snowflake natively optimize data storage for efficient filtering?",
        "options": [
            "By using B-Tree indexes on the primary key",
            "By automatically dividing data into micro-partitions and maintaining metadata about the data ranges",
            "By keeping all data in memory within the Cloud Services layer",
            "By requiring the user to define a cluster key upon table creation"
        ],
        "correct": 1,
        "explanation": "Snowflake automatically divides data into micro-partitions and maintains metadata (MIN/MAX values) for each column, which allows it to efficiently prune data during queries without traditional indexes. Option A is wrong because Snowflake does not use traditional B-Tree indexes. Option C is wrong because data is stored in the Database Storage layer, not in memory in the Cloud Services layer. Option D is wrong because clustering keys are optional and only needed for specific optimization scenarios, not native baseline optimization."
    },
    {
        "id": "peq4",
        "type": "multi",
        "question": "You are explaining Snowflake's storage architecture to a new team member. Which of the following statements accurately describe Snowflake's micro-partitions? (Select TWO)",
        "options": [
            "They are typically between 50 MB and 500 MB of uncompressed data",
            "They are mutable and can be partially updated by DML operations",
            "They store data in a hybrid columnar format",
            "They must be manually compacted by an administrator weekly"
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Snowflake micro-partitions generally contain between 50 MB and 500 MB of uncompressed data (Option A) and use a hybrid columnar format (Option C). Option B is wrong because micro-partitions are immutable; DML operations create new micro-partitions. Option D is wrong because Snowflake manages compaction and storage automatically without administrative intervention."
    },
    {
        "id": "peq5",
        "type": "single",
        "question": "Your company's data science team is running an extremely complex analytical model query that currently takes 45 minutes to execute on a Medium virtual warehouse. What is the most effective approach to reduce the execution time of this specific query?",
        "options": [
            "Increase the maximum number of clusters in a multi-cluster warehouse to 3",
            "Resize the virtual warehouse from Medium to X-Large",
            "Increase the query timeout parameter at the account level",
            "Disable the auto-suspend policy on the warehouse"
        ],
        "correct": 1,
        "explanation": "To improve the performance of a single, highly complex query, you should scale UP (resize) the virtual warehouse to provide more compute power (Option B). Option A is wrong because scaling OUT (multi-cluster) helps with high concurrency, not the speed of a single complex query. Option C is wrong because changing the timeout just allows it to run longer before failing; it doesn't make it faster. Option D is wrong because disabling auto-suspend prevents cache loss but won't directly speed up execution of a query that is compute-bound."
    },
    {
        "id": "peq6",
        "type": "single",
        "question": "Every Monday morning, hundreds of analysts simultaneously refresh their Tableau dashboards connected to Snowflake, causing query queuing and delays. What is the best architectural solution to handle this concurrency issue?",
        "options": [
            "Resize the warehouse from Large to 4X-Large",
            "Enable a multi-cluster virtual warehouse to scale out dynamically",
            "Create an individual virtual warehouse for every analyst",
            "Turn off the result cache to force immediate execution"
        ],
        "correct": 1,
        "explanation": "Scaling OUT by enabling a multi-cluster warehouse is the best way to handle high concurrency and query queuing (Option B). Option A (scaling up) provides more power per query but does not effectively address queuing from high user concurrency. Option C is wrong because managing hundreds of individual warehouses is administratively burdensome and inefficient. Option D is wrong because the result cache actually improves concurrency by serving repeated queries instantly without compute."
    },
    {
        "id": "peq7",
        "type": "multi",
        "question": "An organization is currently using Snowflake Standard Edition and is considering upgrading to the Enterprise Edition. Which of the following features will become available to them upon upgrading? (Select THREE)",
        "options": [
            "Multi-cluster virtual warehouses",
            "Time Travel up to 90 days",
            "Materialized Views",
            "Tri-Secret Secure (Customer-managed keys)"
        ],
        "correct": [
            0,
            1,
            2
        ],
        "explanation": "Enterprise Edition adds Multi-cluster warehouses (Option A), Time Travel up to 90 days (Option B), and Materialized Views (Option C). Option D is wrong because Tri-Secret Secure requires the Business Critical Edition or higher."
    },
    {
        "id": "peq8",
        "type": "single",
        "question": "A healthcare provider requires PHI data to be protected using their own AWS KMS keys in combination with Snowflake's keys. What is the minimum Snowflake Edition they must purchase to use this Tri-Secret Secure feature?",
        "options": [
            "Standard Edition",
            "Enterprise Edition",
            "Business Critical Edition",
            "Virtual Private Snowflake (VPS)"
        ],
        "correct": 2,
        "explanation": "The Tri-Secret Secure feature, which allows customer-managed keys for encryption, requires at least the Business Critical Edition (Option C). Standard (Option A) and Enterprise (Option B) do not support this feature. While VPS (Option D) supports it, it is not the minimum edition required."
    },
    {
        "id": "peq9",
        "type": "single",
        "question": "You create a zero-copy clone of a 5 TB production table to run localized tests. Immediately after the cloning operation is successfully executed, how much additional physical storage space is billed to your account for this new table?",
        "options": [
            "5 TB",
            "2.5 TB (due to standard 2x compression)",
            "0 bytes",
            "It depends on the virtual warehouse size used to clone the table"
        ],
        "correct": 2,
        "explanation": "Zero-copy cloning is a metadata-only operation initially. It points to the micro-partitions of the original table, so 0 bytes of additional storage are consumed (Option C). Storage costs are only incurred later if the cloned table is modified (DML). Options A and B are wrong because data is not physically duplicated. Option D is wrong because cloning requires no virtual warehouse compute and warehouse size does not dictate storage size."
    },
    {
        "id": "peq10",
        "type": "single",
        "question": "A virtual warehouse is configured with an auto-suspend policy of 5 minutes. What is a direct consequence when this warehouse suspends due to inactivity?",
        "options": [
            "All active queries running on the warehouse are immediately aborted.",
            "The result cache is purged and must be rebuilt.",
            "The local disk (SSD) data cache is dropped and must be repopulated when the warehouse resumes.",
            "The warehouse size is automatically downgraded to X-Small upon resuming."
        ],
        "correct": 2,
        "explanation": "When a virtual warehouse is suspended, its local disk (SSD) cache is lost (Option C). Subsequent queries upon resume will need to fetch data from remote cloud storage until the cache is warm again. Option A is wrong because auto-suspend only triggers after the warehouse becomes idle (no active queries). Option B is wrong because the result cache is maintained by the Cloud Services layer, not the virtual warehouse. Option D is wrong because suspension does not alter the configured size of the warehouse."
    },
    {
        "id": "peq11",
        "type": "multi",
        "question": "A data analyst notices that rerunning a report immediately returns results in milliseconds without starting a virtual warehouse. Which of the following statements about this Result Cache are true? (Select TWO)",
        "options": [
            "The result cache is retained for exactly 24 hours provided the underlying data has not changed.",
            "The result cache is stored locally on the virtual warehouse's SSDs.",
            "The result cache can be shared across different virtual warehouses for the same query.",
            "The result cache bypasses the Cloud Services layer entirely."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "The Result Cache retains results for 24 hours (reset upon subsequent identical queries up to 31 days) as long as underlying data hasn't changed (Option A), and since it's managed by the Cloud Services layer, it is shared across different virtual warehouses (Option C). Option B is wrong because local SSDs hold the data cache, not the result cache. Option D is wrong because the result cache is directly managed by the Cloud Services layer."
    },
    {
        "id": "peq12",
        "type": "single",
        "question": "A database administrator resizes a virtual warehouse from Medium to Large to accommodate heavier workloads. How does this resize operation affect the credit consumption rate of the warehouse?",
        "options": [
            "Credit consumption increases by 50%.",
            "Credit consumption doubles.",
            "Credit consumption quadruples.",
            "Credit consumption remains the same, but queries run faster."
        ],
        "correct": 1,
        "explanation": "Snowflake virtual warehouse sizes double in capacity and credit consumption with each size increment. A Medium uses 4 credits/hour, while a Large uses 8 credits/hour. Therefore, consumption doubles (Option B). Options A, C, and D are mathematically incorrect based on Snowflake's credit consumption model."
    },
    {
        "id": "peq13",
        "type": "single",
        "question": "When a query is executed, Snowflake uses statistics such as MIN and MAX values within micro-partitions to skip scanning irrelevant data. Which component of the Snowflake architecture maintains these statistics?",
        "options": [
            "The Cloud Storage provider (e.g., AWS S3)",
            "The Query Processing layer",
            "The Cloud Services layer",
            "The metadata database within each virtual warehouse"
        ],
        "correct": 2,
        "explanation": "The Cloud Services layer manages and stores all metadata about tables, including the MIN/MAX statistics used for data pruning during queries (Option C). Option A is wrong because the cloud provider only provides raw storage, not Snowflake's metadata. Option B is wrong because virtual warehouses execute queries but don't persist table metadata. Option D is wrong because virtual warehouses do not contain metadata databases."
    },
    {
        "id": "peq14",
        "type": "multi",
        "question": "A team is configuring a multi-cluster virtual warehouse to support a BI tool. They want to control how aggressively new clusters are spun up when queries begin to queue. Which scaling policies are available for multi-cluster warehouses? (Select TWO)",
        "options": [
            "Standard",
            "Aggressive",
            "Economy",
            "Optimized"
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Snowflake provides two scaling policies for multi-cluster warehouses: Standard and Economy. Standard (Option A) minimizes queuing by starting new clusters immediately. Economy (Option C) conserves credits by waiting up to 6 minutes to see if the system estimates there's enough load to justify a new cluster. Options B and D are fictitious scaling policies in Snowflake."
    },
    {
        "id": "peq15",
        "type": "single",
        "question": "A data engineer wants to ensure that data stored in Snowflake's internal storage is optimally compressed to minimize storage costs. How should the engineer configure the compression algorithm for Snowflake's internal micro-partitions?",
        "options": [
            "By specifying the COMPRESSION = GZIP parameter during table creation.",
            "By enabling the AUTO_COMPRESS parameter at the account level.",
            "No configuration is needed; Snowflake automatically compresses all data in its internal storage.",
            "By executing an ALTER TABLE command to compress historical data weekly."
        ],
        "correct": 2,
        "explanation": "Snowflake automatically manages data compression for all micro-partitions stored in its proprietary format. Users cannot configure or select the compression algorithm for internal storage (Option C). Option A is wrong because compression parameters are used for unloading/loading staging files, not internal table storage. Option B is wrong because there is no such account-level parameter for internal storage compression. Option D is wrong because micro-partitions are immutable and compressed upon creation automatically."
    },
    {
        "id": "peq16",
        "type": "single",
        "question": "A new data engineer is trying to organize Snowflake objects. Which of the following accurately describes the Snowflake object hierarchy from highest to lowest level?",
        "options": [
            "Account -> Database -> Schema -> Table",
            "Organization -> Account -> Schema -> Database -> Table",
            "Account -> Schema -> Database -> Table",
            "Organization -> Database -> Account -> Schema -> Table"
        ],
        "correct": 0,
        "explanation": "The correct hierarchy within a Snowflake account is Account, which contains Databases, which contain Schemas, which contain Tables and other database objects. Options B and D are incorrect because Schema does not contain Database. Option C has Schema and Database in the wrong order."
    },
    {
        "id": "peq17",
        "type": "multi",
        "question": "Your company is setting up a new Snowflake environment and needs to restrict access based on the object hierarchy. Which TWO of the following statements about Snowflake's object hierarchy are correct? (Select TWO)",
        "options": [
            "A schema can contain multiple databases.",
            "A database can be shared across multiple accounts using Snowflake Secure Data Sharing.",
            "A view can reference tables from different schemas within the same database.",
            "A table can belong to multiple schemas simultaneously."
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "A database is the object that is shared via Secure Data Sharing (B), and views can reference tables across schemas (C). Option A is incorrect because databases contain schemas, not the other way around. Option D is incorrect because a table can only belong to exactly one schema."
    },
    {
        "id": "peq18",
        "type": "single",
        "question": "A developer is creating a staging table to load intermediate data for a complex ETL process. The data does not need to be recovered in case of failure, and the table should be dropped automatically when the user's session ends. Which table type is most appropriate?",
        "options": [
            "Transient table",
            "Temporary table",
            "Permanent table",
            "Dynamic table"
        ],
        "correct": 1,
        "explanation": "Temporary tables only exist for the duration of the user session in which they were created and are automatically dropped at the end of the session, making them ideal for intermediate ETL data. Transient tables persist until explicitly dropped, Permanent tables have Fail-safe overhead which is unnecessary here, and Dynamic tables are used for declarative data transformation pipelines."
    },
    {
        "id": "peq19",
        "type": "multi",
        "question": "An organization wants to query large amounts of legacy log data stored in Amazon S3 without loading it into Snowflake's internal storage to save on storage costs. Which TWO of the following are characteristics of External Tables in Snowflake? (Select TWO)",
        "options": [
            "They support DML operations like INSERT, UPDATE, and DELETE.",
            "They store file-level metadata about the data files in external cloud storage.",
            "They can be used to join data stored outside Snowflake with data stored inside Snowflake.",
            "They automatically move data into Snowflake's micro-partitions upon creation."
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "External tables store file-level metadata (B) and allow querying and joining external data with internal Snowflake tables (C). Option A is incorrect because external tables are read-only and do not support DML operations. Option D is incorrect because the actual data remains in external storage and is not moved into Snowflake's micro-partitions."
    },
    {
        "id": "peq20",
        "type": "single",
        "question": "Your company wants to use a single copy of data stored in an open format in Azure Data Lake Storage, query it using Snowflake with near-native performance, and also allow other compute engines like Apache Spark to read and write to it. Which table type should you use?",
        "options": [
            "External Table",
            "Iceberg Table",
            "Dynamic Table",
            "Transient Table"
        ],
        "correct": 1,
        "explanation": "Iceberg Tables allow Snowflake to query data stored externally in the open Apache Iceberg format, providing near-native performance while allowing other engines to interact with the same data. External Tables do not provide the same performance or open-format write capabilities across multiple engines. Dynamic and Transient tables store data internally in Snowflake."
    },
    {
        "id": "peq21",
        "type": "single",
        "question": "A data engineering team needs to build a continuous data pipeline that automatically transforms raw streaming data into a dimensional model. They want to define the end state of the transformation using a simple SQL query and let Snowflake manage the scheduling and orchestration. Which Snowflake feature is best suited for this?",
        "options": [
            "Tasks and Streams",
            "External Functions",
            "Dynamic Tables",
            "Materialized Views"
        ],
        "correct": 2,
        "explanation": "Dynamic Tables allow users to build continuous data pipelines by defining the target state (via a SELECT statement) and letting Snowflake automatically manage the incremental refreshes and orchestration. Tasks and Streams require manual orchestration and procedural logic. External functions are for calling APIs, and Materialized Views have significant limitations for complex transformations and multi-table joins compared to Dynamic Tables."
    },
    {
        "id": "peq22",
        "type": "single",
        "question": "A marketing analyst wants to quickly translate thousands of customer reviews from French to English directly within Snowflake using a SQL query, without exporting the data or managing external API calls. Which Snowflake feature enables this?",
        "options": [
            "External Functions",
            "Snowflake Cortex AI",
            "Snowpipe",
            "Snowpark Stored Procedures"
        ],
        "correct": 1,
        "explanation": "Snowflake Cortex AI provides built-in LLM functions, including translation, sentiment analysis, and summarization, directly accessible via SQL without external API setup. External Functions would require setting up an external API. Snowpipe is for data loading. Snowpark Stored Procedures could do this with external libraries but Cortex is the built-in, native feature specifically for this."
    },
    {
        "id": "peq23",
        "type": "multi",
        "question": "Your organization wants to use Snowflake Cortex AI to build generative AI applications. Which TWO of the following are capabilities provided by Snowflake Cortex AI? (Select TWO)",
        "options": [
            "Fine-tuning foundation models on your proprietary data securely within Snowflake.",
            "Automatically loading data from on-premises databases into Snowflake.",
            "Hosting custom web applications and UIs directly in Snowflake.",
            "Running completely serverless LLM functions like COMPLETE and EXTRACT_ANSWER directly in SQL."
        ],
        "correct": [
            0,
            3
        ],
        "explanation": "Cortex AI allows fine-tuning models securely (A) and provides serverless SQL functions for LLM tasks (D). Option B is incorrect as it describes data integration tools, not Cortex AI. Option C is incorrect; Streamlit in Snowflake is used for hosting web applications, not Cortex AI natively (though Streamlit apps can use Cortex)."
    },
    {
        "id": "peq24",
        "type": "single",
        "question": "A data scientist is comfortable writing data transformations in Python using the pandas API but needs to run these transformations on large datasets stored in Snowflake without extracting the data to their local machine. Which feature should they use?",
        "options": [
            "SnowSQL",
            "Snowpark API for Python",
            "Snowflake Connectors",
            "External Tables"
        ],
        "correct": 1,
        "explanation": "Snowpark API for Python provides a DataFrame API that allows developers to write code in Python (including a pandas-compatible API via Snowpark pandas) that executes natively inside Snowflake's compute engine, avoiding data movement. SnowSQL is a CLI tool. Connectors are for connecting applications. External Tables are for querying external data."
    },
    {
        "id": "peq25",
        "type": "multi",
        "question": "A development team is evaluating Snowpark for building data engineering pipelines. Which TWO of the following are true regarding Snowpark? (Select TWO)",
        "options": [
            "Snowpark code executes on the client machine and fetches data from Snowflake for processing.",
            "Snowpark supports Python, Java, and Scala programming languages.",
            "Snowpark DataFrames are lazily evaluated, meaning operations are translated into SQL and executed only when an action is called.",
            "Snowpark requires users to manually provision separate compute clusters outside of Snowflake virtual warehouses."
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "Snowpark supports Python, Java, and Scala (B) and uses lazy evaluation to convert DataFrame operations into optimized SQL queries executed in Snowflake (C). Option A is incorrect because Snowpark executes code inside Snowflake, not on the client. Option D is incorrect because Snowpark uses Snowflake's standard virtual warehouses for compute."
    },
    {
        "id": "peq26",
        "type": "single",
        "question": "A team of data scientists and data engineers wants to collaborate on code, write markdown documentation, and execute SQL and Python in a single interactive web interface directly within Snowsight. Which feature should they use?",
        "options": [
            "Classic Console Worksheets",
            "Snowflake Notebooks",
            "Streamlit in Snowflake",
            "Snowpark Stored Procedures"
        ],
        "correct": 1,
        "explanation": "Snowflake Notebooks are an interactive cell-based development environment built into Snowsight that supports SQL, Python, and Markdown in a single document. Classic Console Worksheets do not support multi-language cells and markdown in the same way. Streamlit is for building web apps. Stored Procedures are for executing code but are not an interactive development interface."
    },
    {
        "id": "peq27",
        "type": "multi",
        "question": "You are configuring a new Snowflake Notebook for a machine learning project. Which TWO of the following statements about Snowflake Notebooks are correct? (Select TWO)",
        "options": [
            "Notebooks are stored as objects in a Snowflake database and schema.",
            "Notebooks require you to export your data to a third-party service like JupyterHub to run Python code.",
            "You can schedule a Snowflake Notebook to run on a recurring basis using Snowflake Tasks.",
            "Notebooks can only execute SQL cells and do not support Snowpark Python natively."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Snowflake Notebooks are first-class database objects stored in a schema (A) and can be scheduled to run automatically using Tasks (C). Option B is incorrect because they run natively within Snowflake without third-party services. Option D is incorrect because they support both SQL and Python cells natively."
    },
    {
        "id": "peq28",
        "type": "single",
        "question": "A company uses a third-party BI tool that is not natively integrated with Snowflake. The BI tool supports standard database connectivity protocols. Which of the following should the company use to connect the BI tool to Snowflake?",
        "options": [
            "Snowflake REST API",
            "Snowpipe Streaming",
            "Snowflake JDBC or ODBC Driver",
            "Snowflake External Functions"
        ],
        "correct": 2,
        "explanation": "Snowflake provides standard JDBC and ODBC drivers that allow third-party applications and BI tools to connect to Snowflake and execute queries. The REST API is for specific programmable interactions but is not the standard protocol for traditional BI tools. Snowpipe Streaming is for data ingestion. External Functions are for calling APIs from within Snowflake."
    },
    {
        "id": "peq29",
        "type": "multi",
        "question": "A database administrator is designing the storage architecture for a multi-stage data pipeline. They need to understand the Fail-safe properties of different table types to optimize storage costs. Which THREE of the following table types do NOT have a Fail-safe period? (Select THREE)",
        "options": [
            "Permanent tables",
            "Transient tables",
            "Temporary tables",
            "External tables"
        ],
        "correct": [
            1,
            2,
            3
        ],
        "explanation": "Transient (B) and Temporary (C) tables explicitly do not have a Fail-safe period to save on storage costs. External tables (D) store data outside of Snowflake and therefore do not have Snowflake's Fail-safe. Permanent tables do have Fail-safe."
    },
    {
        "id": "peq30",
        "type": "multi",
        "question": "You need to manage privileges across different objects in Snowflake. Which TWO of the following statements correctly describe the relationship between roles and the object hierarchy? (Select TWO)",
        "options": [
            "Roles are granted to users, and privileges on objects are granted to roles.",
            "Privileges on a schema automatically grant the same privileges on all databases.",
            "You can grant privileges on a specific table without granting any privileges on its parent schema or database.",
            "To query a table, a role must have the USAGE privilege on both the parent database and the parent schema."
        ],
        "correct": [
            0,
            3
        ],
        "explanation": "In Snowflake's RBAC, roles are granted to users and privileges are granted to roles (A). To access any object like a table, a role must have USAGE privilege on the database and schema containing the object (D). Option B is incorrect because schemas are contained within databases, not the other way around. Option C is incorrect because without USAGE on the parent schema and database, you cannot access the table even if you have privileges on it."
    },
    {
        "id": "peq31",
        "type": "single",
        "question": "Your organization has an existing data lake on AWS S3 with data stored in Parquet files. You want to query this data in Snowflake using standard SQL. You cannot move the data or change its format, and you need to ensure the metadata syncs automatically when new files are added to the S3 bucket. What is the most cost-effective and appropriate approach?",
        "options": [
            "Create an External Table and configure an S3 event notification to trigger auto-refresh.",
            "Create an Iceberg Table using Snowflake as the catalog.",
            "Use Snowpipe to load the Parquet files into a Permanent Table.",
            "Create a Materialized View directly over the S3 bucket."
        ],
        "correct": 0,
        "explanation": "External Tables are designed for querying data in cloud storage without moving it. Configuring an S3 event notification allows the external table metadata to auto-refresh when new files arrive. Option B is incorrect because Iceberg requires the data to be in Iceberg format, not just raw Parquet. Option C moves the data, which the scenario forbids. Option D is not possible; materialized views must be based on Snowflake tables or external tables, not directly on an S3 bucket."
    },
    {
        "id": "peq32",
        "type": "single",
        "question": "A user recently created a new table containing sensitive marketing data. The user attempts to grant access to this table directly to another user named 'JSMITH' but receives an error. Which security principle explains why this operation fails in Snowflake?",
        "options": [
            "Snowflake uses a Discretionary Access Control (DAC) model where only the ACCOUNTADMIN can grant access to users.",
            "Snowflake uses a Role-Based Access Control (RBAC) model, meaning privileges are granted to roles, and roles are granted to users.",
            "The user must activate the SECURITYADMIN role before granting permissions to other users.",
            "Snowflake tables are private by default and can only be shared using Secure Data Sharing."
        ],
        "correct": 1,
        "explanation": "Snowflake uses Role-Based Access Control (RBAC). In RBAC, privileges are granted to roles, and those roles are then assigned to users. Users cannot be granted direct access to objects like tables, which distinguishes it from Discretionary Access Control (DAC) models where object owners can directly grant access to individual users. The other options are incorrect: ACCOUNTADMIN is not the only role that can grant access, activating SECURITYADMIN is not required if the user's current role has the MANAGE GRANTS privilege or ownership, and tables can be shared via roles, not just Secure Data Sharing."
    },
    {
        "id": "peq33",
        "type": "single",
        "question": "Your organization wants to strictly separate user management from object creation. Which system-defined role should be used to manage all object grants globally without inherently having the ability to create databases or warehouses?",
        "options": [
            "SYSADMIN",
            "USERADMIN",
            "SECURITYADMIN",
            "PUBLIC"
        ],
        "correct": 2,
        "explanation": "The SECURITYADMIN role includes the MANAGE GRANTS privilege, which allows it to grant or revoke privileges on any object in the account. It is designed to manage security and grants globally. SYSADMIN is meant for creating and managing objects (like warehouses and databases). USERADMIN is dedicated to creating and managing users and roles. PUBLIC is the default role granted to all users and has minimal privileges."
    },
    {
        "id": "peq34",
        "type": "multi",
        "question": "A data engineer is designing a custom role hierarchy for a new Snowflake deployment. According to Snowflake best practices, to which system-defined roles should custom roles typically be granted to ensure centralized management and avoid orphaned roles? (Select TWO)",
        "options": [
            "SYSADMIN",
            "SECURITYADMIN",
            "USERADMIN",
            "ACCOUNTADMIN"
        ],
        "correct": [
            0,
            1
        ],
        "explanation": "Snowflake best practices recommend granting custom roles to the SYSADMIN role so that the SYSADMIN can manage all objects created by those custom roles. Additionally, custom roles can be granted to SECURITYADMIN so that it can manage the roles themselves. You should generally avoid granting custom roles directly to ACCOUNTADMIN unless specifically required, as ACCOUNTADMIN should be highly restricted. USERADMIN is typically used to create roles but the broader hierarchy connects up to SYSADMIN and SECURITYADMIN."
    },
    {
        "id": "peq35",
        "type": "single",
        "question": "A data analyst has been granted three custom roles: HR_ANALYST, FINANCE_ANALYST, and SALES_ANALYST. The analyst needs to run a single query that joins a table from the HR schema and a table from the FINANCE schema. How can the analyst achieve this without having a single role that contains privileges for both schemas?",
        "options": [
            "By setting the session parameter USE_MULTIPLE_ROLES to TRUE.",
            "By executing the command USE SECONDARY ROLES ALL to utilize privileges from all granted roles simultaneously.",
            "By creating a temporary view that bypasses role restrictions during the session.",
            "It is not possible; the administrator must create a new consolidated role with privileges on both schemas."
        ],
        "correct": 1,
        "explanation": "Snowflake supports the concept of secondary roles. By executing 'USE SECONDARY ROLES ALL', a user can make use of the aggregate privileges of all roles granted to them (except for roles that require higher privileges like creating objects, which still require the primary role). This allows querying across tables that are otherwise restricted to separate roles without needing a newly created consolidated role. 'USE_MULTIPLE_ROLES' is not a valid parameter."
    },
    {
        "id": "peq36",
        "type": "single",
        "question": "When designing a role hierarchy in Snowflake, what is the recommended best practice for differentiating roles used for granting object privileges versus roles assigned to users?",
        "options": [
            "Create 'Access Roles' for object privileges and 'Functional Roles' for users, then grant Access Roles to Functional Roles.",
            "Create 'System Roles' for databases and 'Business Roles' for schemas, and grant both directly to users.",
            "Assign all object privileges directly to Functional Roles to minimize the number of roles in the account.",
            "Use the SYSADMIN role for all object privileges and create custom roles only for read-only users."
        ],
        "correct": 0,
        "explanation": "The standard best practice in Snowflake for RBAC design is to separate Access Roles and Functional Roles. Access Roles are created to group privileges on database objects (e.g., READ_ONLY_SALES_DB). Functional Roles are mapped to job functions (e.g., DATA_ANALYST). The Access Roles are then granted to the Functional Roles, and the Functional Roles are granted to users. This modular approach simplifies maintenance and auditing compared to the other options."
    },
    {
        "id": "peq37",
        "type": "multi",
        "question": "An organization wants to improve the security of its Snowflake account. Which of the following are supported authentication and access control methods in Snowflake? (Select TWO)",
        "options": [
            "Multi-Factor Authentication (MFA) powered by Duo Security",
            "Federated Authentication using SAML 2.0 Identity Providers",
            "Biometric-only Authentication via Snowflake Web UI",
            "Hardware Security Module (HSM) direct integration for user logins"
        ],
        "correct": [
            0,
            1
        ],
        "explanation": "Snowflake natively supports Multi-Factor Authentication (MFA) provided by integrated Duo Security, as well as Federated Authentication / Single Sign-On (SSO) using SAML 2.0 compliant Identity Providers (like Okta, Azure AD, etc.). Biometric-only authentication natively through the web UI and direct HSM integration for standard user logins are not supported out-of-the-box authentication methods in Snowflake."
    },
    {
        "id": "peq38",
        "type": "single",
        "question": "An automated ETL tool needs to authenticate to Snowflake to perform nightly data loads. The corporate security policy explicitly forbids the use of static passwords for service accounts. Which Snowflake authentication method is best suited for this scenario?",
        "options": [
            "OAuth 2.0 Authorization Code Flow",
            "Key Pair Authentication",
            "Multi-Factor Authentication (MFA)",
            "External OAuth with a web browser pop-up"
        ],
        "correct": 1,
        "explanation": "Key Pair Authentication (using RSA public/private key pairs) is the best practice for service accounts and automated processes connecting to Snowflake, as it provides strong, passwordless authentication. While OAuth can be used for automated flows (Client Credentials flow), Key Pair is natively and widely used for automated ETL tools without requiring external OAuth servers. MFA is designed for interactive human users. External OAuth with a browser pop-up cannot be used for headless/automated ETL tools."
    },
    {
        "id": "peq39",
        "type": "single",
        "question": "A Snowflake administrator wants to ensure that users can only log in to the Snowflake account if they are connected to the corporate VPN. What Snowflake feature should be configured to accomplish this?",
        "options": [
            "Row-Level Security Policies",
            "Network Policies",
            "Resource Monitors",
            "Secure Views"
        ],
        "correct": 1,
        "explanation": "Network Policies in Snowflake are used to restrict access based on IP addresses. By specifying the IP ranges of the corporate VPN in the 'Allowed IP Addresses' list of a Network Policy, the administrator can block logins from outside the VPN. Row-Level Security Policies control access to data rows, Resource Monitors control compute credit usage, and Secure Views hide the DDL of a view."
    },
    {
        "id": "peq40",
        "type": "multi",
        "question": "Which of the following tasks require the ACCOUNTADMIN role or a role that has been granted the equivalent top-level privileges? (Select TWO)",
        "options": [
            "Viewing the account-level billing and credit usage.",
            "Creating and configuring a Snowflake Share.",
            "Creating a new virtual warehouse.",
            "Cloning a database."
        ],
        "correct": [
            0,
            1
        ],
        "explanation": "Viewing account-level billing/credit usage and managing data sharing (creating shares) are tasks typically reserved for the ACCOUNTADMIN role (or roles granted specific privileges like CREATE SHARE). Creating a virtual warehouse requires the SYSADMIN role (or a custom role with CREATE WAREHOUSE). Cloning a database only requires ownership of the database and the CREATE DATABASE privilege, not ACCOUNTADMIN."
    },
    {
        "id": "peq41",
        "type": "single",
        "question": "A data engineer with the custom role 'DATA_ENGINEER_ROLE' creates a new table in the 'PUBLIC' schema of the 'SALES_DB' database. Who is the owner of the newly created table?",
        "options": [
            "The ACCOUNTADMIN role, because it owns all objects globally.",
            "The SYSADMIN role, because it owns all tables by default.",
            "The 'DATA_ENGINEER_ROLE' role.",
            "The individual user who executed the CREATE TABLE statement."
        ],
        "correct": 2,
        "explanation": "In Snowflake, the role that is active in the session when an object is created automatically becomes the owner (has the OWNERSHIP privilege) of that object. Therefore, the 'DATA_ENGINEER_ROLE' owns the table. Roles own objects, not individual users, and ownership is not automatically forced to SYSADMIN or ACCOUNTADMIN unless the object was created using those specific roles."
    },
    {
        "id": "peq42",
        "type": "single",
        "question": "A company wants to restrict access to their Snowflake account so that only users connecting from their corporate VPN can log in. They create a network policy with the VPN's IP address in the ALLOWED_IP_LIST. At what levels can this network policy be applied? (Select the most restrictive correct option)",
        "options": [
            "Account level only",
            "Account and User levels",
            "Account, User, and Database levels",
            "Account, Role, and User levels"
        ],
        "correct": 1,
        "explanation": "Network policies in Snowflake can be applied at the Account level (affecting all users), the Security Integration level (for OAuth/SAML), and the User level (affecting specific users). They cannot be applied at the Database or Role levels. Between the options provided, 'Account and User levels' is the correct choice."
    },
    {
        "id": "peq43",
        "type": "multi",
        "question": "A financial institution is evaluating Snowflake's Tri-Secret Secure feature to meet strict compliance requirements. Which of the following statements about Tri-Secret Secure are TRUE? (Select TWO)",
        "options": [
            "It requires the customer to host their own hardware security module (HSM) on-premises.",
            "It combines a Snowflake-managed key and a customer-managed key in the cloud provider's key management service to create a composite master key.",
            "If the customer revokes access to their customer-managed key, Snowflake cannot decrypt the data.",
            "It is available in all Snowflake editions, including Standard."
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "Tri-Secret Secure uses a combination of a Snowflake-managed key and a customer-managed key (hosted in AWS KMS, Azure Key Vault, or GCP KMS) to create a composite master key. If the customer revokes access to their key, Snowflake can no longer decrypt the data, providing a high level of control. It does not require an on-premises HSM, and it is only available in the Business Critical edition or higher, not Standard."
    },
    {
        "id": "peq44",
        "type": "single",
        "question": "A healthcare company needs to hide patient social security numbers (SSNs) from analysts. They apply a Dynamic Data Masking policy to the SSN column. A user with the ANALYST role queries the table and sees '***-**-****' instead of the actual SSNs. Which of the following is true about how Dynamic Data Masking works in this scenario?",
        "options": [
            "The masked values are stored physically on disk to ensure analysts cannot access the original data.",
            "The masking policy modifies the query at runtime to return masked data based on the user's role.",
            "A background process creates a copy of the table with the masked values specifically for the ANALYST role.",
            "The user must use a special DECRYPT() function in their query if they want to see the original data."
        ],
        "correct": 1,
        "explanation": "Dynamic Data Masking is applied at query runtime. The data remains stored in its original, unmasked format in micro-partitions. When a query is executed, Snowflake evaluates the masking policy conditions (e.g., checking the user's current role) and modifies the result set on the fly. It does not duplicate data or alter the physical storage."
    },
    {
        "id": "peq45",
        "type": "multi",
        "question": "An organization has a `SALES` table and wants to restrict data access so that regional managers can only see rows belonging to their respective regions. They decide to implement a Row Access Policy. Which of the following are required or valid steps when implementing and using Row Access Policies? (Select TWO)",
        "options": [
            "The policy must be applied to the table using an ALTER TABLE statement.",
            "A mapping table can be used within the policy definition to dynamically determine which roles can see which regions.",
            "Row Access Policies must be defined using JavaScript UDFs.",
            "Applying a Row Access Policy to a table automatically encrypts the hidden rows on disk."
        ],
        "correct": [
            0,
            1
        ],
        "explanation": "To apply a Row Access Policy to a table or view, you use the ALTER TABLE or ALTER VIEW command. The policy definition itself often queries a mapping table to look up user-to-region or role-to-region mappings dynamically. Row Access Policies are written using standard SQL (not restricted to JavaScript UDFs) and they evaluate at runtime; they do not change how data is physically encrypted on disk."
    },
    {
        "id": "peq46",
        "type": "single",
        "question": "A data engineer creates a tag named `COST_CENTER` and applies it to a database. They then create a schema and a table within that database, but do not explicitly apply any tags to them. What happens regarding the `COST_CENTER` tag on the table?",
        "options": [
            "The table does not have the tag because tags must be explicitly assigned to each object.",
            "The table inherits the tag from the database because tags propagate downwards in the object hierarchy.",
            "The table will only inherit the tag if the `ENABLE_TAG_INHERITANCE` parameter is set to TRUE.",
            "The table inherits the tag, but it can only be viewed by the ACCOUNTADMIN role."
        ],
        "correct": 1,
        "explanation": "In Snowflake, object tags are inherited based on the object hierarchy. If a tag is applied to a database, it automatically propagates to all schemas within that database, and to all tables/views within those schemas. No special parameter is needed to enable this behavior."
    },
    {
        "id": "peq47",
        "type": "single",
        "question": "A security administrator wants to evaluate their Snowflake account for potential security risks, such as users lacking multi-factor authentication (MFA) or network policies not being strictly defined. Which built-in Snowflake feature should they use to discover these vulnerabilities and get recommendations?",
        "options": [
            "Snowflake Trust Center",
            "Security Dashboard in Snowsight",
            "System$Evaluate_Security() function",
            "Access History view"
        ],
        "correct": 0,
        "explanation": "The Snowflake Trust Center is a feature designed specifically to help customers evaluate their account against security benchmarks (like CIS benchmarks). It scans the account for vulnerabilities (e.g., users without MFA, weak network policies, over-privileged users) and provides actionable recommendations to improve the security posture."
    },
    {
        "id": "peq48",
        "type": "multi",
        "question": "A data team needs to analyze query history to identify the most expensive queries run over the past 6 months. They are comparing the `ACCOUNT_USAGE.QUERY_HISTORY` view and the `INFORMATION_SCHEMA.QUERY_HISTORY` table function. Which statements correctly describe the differences between these two sources? (Select TWO)",
        "options": [
            "ACCOUNT_USAGE retains data for up to 365 days, while INFORMATION_SCHEMA retains data for up to 7 days.",
            "ACCOUNT_USAGE has zero latency, while INFORMATION_SCHEMA views have a latency of up to 45 minutes.",
            "ACCOUNT_USAGE contains data for dropped objects, while INFORMATION_SCHEMA does not.",
            "INFORMATION_SCHEMA requires the ACCOUNTADMIN role to access, while ACCOUNT_USAGE is available to all users by default."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "ACCOUNT_USAGE views (in the SNOWFLAKE database) retain historical data for 1 year (365 days) and include metadata for dropped objects. INFORMATION_SCHEMA views retain data for only 7 days to 6 months (depending on the view, but query history is 7 days) and do not show dropped objects. The latencies are the opposite of option B (INFORMATION_SCHEMA has zero latency, ACCOUNT_USAGE has some latency). ACCOUNT_USAGE requires specific privileges to access, while every user can access INFORMATION_SCHEMA for objects they have privileges on."
    },
    {
        "id": "peq49",
        "type": "single",
        "question": "An administrator creates a Resource Monitor to control compute costs and assigns it to a specific virtual warehouse. The monitor has a quota of 100 credits and an action to `SUSPEND_IMMEDIATE` at 100%. What happens when the warehouse reaches 100 consumed credits?",
        "options": [
            "The warehouse continues running any currently executing queries but refuses new queries.",
            "The warehouse is immediately suspended, and all currently executing queries are aborted.",
            "The account is locked and all warehouses are suspended.",
            "The warehouse scales down to a smaller size to conserve credits."
        ],
        "correct": 1,
        "explanation": "The `SUSPEND_IMMEDIATE` action on a Resource Monitor immediately suspends the warehouse and aborts any statements (queries) that are currently executing on that warehouse. If the action was just `SUSPEND`, it would allow currently running queries to finish before suspending."
    },
    {
        "id": "peq50",
        "type": "single",
        "question": "An organization uses Tag-based Masking to protect sensitive data. They apply a tag `SENSITIVITY='HIGH'` to a column and map a masking policy to this tag. Later, a user applies a different, explicit Dynamic Data Masking policy directly to the exact same column. When a query is run against this column, which policy takes precedence?",
        "options": [
            "The policy mapped to the tag takes precedence.",
            "The policy explicitly applied to the column takes precedence.",
            "An error is thrown because a column cannot have both a tag-based and column-level masking policy.",
            "Both policies are evaluated, and the most restrictive one is applied."
        ],
        "correct": 1,
        "explanation": "In Snowflake, if a column has both a direct (explicit) masking policy and a tag-based masking policy assigned to it, the explicit column-level masking policy always takes precedence over the tag-based masking policy."
    },
    {
        "id": "peq51",
        "type": "single",
        "question": "You are writing a script to monitor login failures in real-time. You need to alert the security team immediately if a user fails to log in 5 times within a minute. Which view or function is best suited for this real-time requirement?",
        "options": [
            "SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY",
            "INFORMATION_SCHEMA.LOGIN_HISTORY",
            "SNOWFLAKE.READER_ACCOUNT_USAGE.LOGIN_HISTORY",
            "SNOWFLAKE.CORE.LOGIN_EVENTS"
        ],
        "correct": 1,
        "explanation": "The `INFORMATION_SCHEMA.LOGIN_HISTORY` table function provides real-time (zero latency) data about login attempts, making it suitable for immediate alerting. The `ACCOUNT_USAGE.LOGIN_HISTORY` view has a data latency (typically around 45 minutes to 2 hours depending on the view), making it unsuitable for real-time monitoring."
    },
    {
        "id": "peq52",
        "type": "single",
        "question": "A data engineer is designing a data loading pipeline. They have sensitive data files generated on-premises and want to upload them directly into Snowflake without using a third-party cloud storage provider. Which type of stage is the most appropriate for this requirement?",
        "options": [
            "An external stage referencing an Amazon S3 bucket.",
            "A named internal stage.",
            "An external stage referencing an Azure Blob Storage container.",
            "A Snowflake managed external table."
        ],
        "correct": 1,
        "explanation": "A named internal stage is correct because it allows storing files directly within Snowflake, avoiding the need for an external cloud storage provider like AWS S3 or Azure Blob. External stages (options A and C) require the use of third-party cloud storage. Option D is incorrect because external tables are for querying data in external stages, not for uploading on-premise files directly into Snowflake storage."
    },
    {
        "id": "peq53",
        "type": "multi",
        "question": "A company is migrating its data warehouse to Snowflake and is deciding between using internal or external stages. Which of the following statements accurately describe the characteristics of Snowflake stages? (Select TWO)",
        "options": [
            "The PUT command is required to upload files to an external stage.",
            "External stages can reference cloud storage accounts in AWS, Azure, or GCP.",
            "Files in internal stages are automatically encrypted by Snowflake.",
            "Data in external stages is automatically purged once loaded into a table."
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "Option B is correct because external stages are pointers to existing cloud storage locations (S3, Azure Blob, GCS). Option C is correct because Snowflake automatically encrypts data files staged in internal stages (user, table, and named stages). Option A is incorrect because the PUT command is used specifically for uploading files to internal stages, not external stages (files in external stages are uploaded using cloud provider tools). Option D is incorrect because purging data from external stages after a load is not automatic; it requires specific COPY INTO options like PURGE = TRUE, or manual deletion."
    },
    {
        "id": "peq54",
        "type": "single",
        "question": "An analyst is using the SnowSQL command-line interface to upload a local CSV file (`sales.csv`) into a Snowflake user stage. Which command should they execute?",
        "options": [
            "COPY INTO @~ FROM file://sales.csv",
            "PUT file://sales.csv @~",
            "UPLOAD sales.csv TO @~",
            "PUT sales.csv INTO STAGE @USER"
        ],
        "correct": 1,
        "explanation": "Option B (`PUT file://sales.csv @~`) is the correct syntax for uploading a local file to a user stage in SnowSQL. Option A is incorrect because the COPY INTO command is used to load data from a stage into a table or unload data from a table to a stage, not to upload local files. Options C and D are invalid Snowflake commands."
    },
    {
        "id": "peq55",
        "type": "single",
        "question": "A data scientist needs to download processed data files from a named internal stage (`@model_data_stage`) to their local machine for offline analysis using SnowSQL. Which command must they use?",
        "options": [
            "GET @model_data_stage file://./local_dir",
            "DOWNLOAD @model_data_stage TO local_dir",
            "COPY INTO file://./local_dir FROM @model_data_stage",
            "FETCH FROM @model_data_stage TO './local_dir'"
        ],
        "correct": 0,
        "explanation": "Option A (`GET @model_data_stage file://./local_dir`) is the correct command to download files from an internal stage to a local directory using SnowSQL. Option B and D are fictitious commands. Option C is incorrect because COPY INTO is used to load/unload data to/from tables and stages, but it cannot download files directly to a local filesystem; that is the specific purpose of the GET command."
    },
    {
        "id": "peq56",
        "type": "single",
        "question": "A team frequently loads JSON and Parquet files with specific parsing requirements (e.g., stripping outer arrays, ignoring UTF-8 errors). Instead of specifying these options in every COPY INTO statement, what is the best practice to simplify their data loading process?",
        "options": [
            "Create an external function to parse the files during load.",
            "Set the parsing options at the user session level using ALTER SESSION.",
            "Create a named File Format object encapsulating these options and reference it in the COPY INTO statements.",
            "Modify the destination table properties to define default parsing behaviors."
        ],
        "correct": 2,
        "explanation": "Option C is correct because File Format objects allow you to encapsulate file parsing options (like type, compression, error handling) in a reusable object, which simplifies COPY INTO statements. Option A is unnecessarily complex and not standard practice for basic parsing. Option B is incorrect because file format options cannot be set as session parameters. Option D is incorrect because parsing behaviors are not defined as table properties."
    },
    {
        "id": "peq57",
        "type": "multi",
        "question": "Which of the following file formats are natively supported by Snowflake for data loading via the COPY INTO command? (Select THREE)",
        "options": [
            "JSON",
            "XML",
            "Parquet",
            "PDF",
            "DOCX"
        ],
        "correct": [
            0,
            1,
            2
        ],
        "explanation": "JSON (Option A), XML (Option B), and Parquet (Option C) are natively supported semi-structured file formats in Snowflake for data loading. PDF (Option D) and DOCX (Option E) are unstructured document formats and are not natively supported for structured/semi-structured data loading via COPY INTO (though Snowflake can store unstructured data in stages, it doesn't parse them into tables this way)."
    },
    {
        "id": "peq58",
        "type": "single",
        "question": "During a bulk data load of millions of rows, a few rows contain improperly formatted dates. The data engineer wants the COPY INTO command to load all valid rows and skip only the specific rows with errors. Which ON_ERROR option should they use?",
        "options": [
            "ABORT_STATEMENT",
            "SKIP_FILE",
            "CONTINUE",
            "SKIP_FILE_<num>"
        ],
        "correct": 2,
        "explanation": "Option C (CONTINUE) is correct because it tells Snowflake to continue loading valid rows from the file while skipping the rows that contain errors. Option A (ABORT_STATEMENT) is the default and would fail the entire load upon the first error. Option B (SKIP_FILE) skips the entire file if any error is found. Option D (SKIP_FILE_<num>) skips the file only if the number of errors exceeds a specified threshold, but still skips the entire file, not just the bad rows."
    },
    {
        "id": "peq59",
        "type": "single",
        "question": "A developer wants to test a COPY INTO command to see if there are any parsing errors in a set of staged CSV files, but they do NOT want any data to actually be loaded into the target table. Which copy option should they include in their statement?",
        "options": [
            "VALIDATION_MODE = RETURN_ERRORS",
            "ON_ERROR = DRY_RUN",
            "LOAD_MODE = TEST",
            "PURGE = FALSE"
        ],
        "correct": 0,
        "explanation": "Option A (VALIDATION_MODE = RETURN_ERRORS) is correct because it validates the data files and returns any parsing errors it encounters without actually loading the data into the table. Option B and C are made-up parameters. Option D (PURGE = FALSE) simply dictates that files should not be deleted from the stage after loading, but data would still be loaded."
    },
    {
        "id": "peq60",
        "type": "multi",
        "question": "A data engineering team is setting up Snowpipe to automate data loading from an external Amazon S3 bucket. Which of the following components are required to configure this automated pipeline? (Select TWO)",
        "options": [
            "A storage integration to securely connect Snowflake to the S3 bucket.",
            "An active virtual warehouse to process the Snowpipe loads.",
            "A pipe object containing the COPY INTO statement.",
            "A scheduled Snowflake Task to trigger the pipe every minute."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Option A is required to securely provide Snowflake access to the external S3 bucket without passing hardcoded credentials. Option C is required because a pipe object encapsulates the COPY INTO statement used by Snowpipe. Option B is incorrect because Snowpipe uses serverless compute resources managed by Snowflake, not user-managed virtual warehouses. Option D is incorrect because Snowpipe is typically triggered automatically via cloud event notifications (like AWS SQS/SNS), not by scheduled tasks."
    },
    {
        "id": "peq61",
        "type": "single",
        "question": "A company needs to load JSON data into Snowflake. The JSON objects contain nested arrays, and the schema of the source data changes frequently. They want to query this data with high performance without defining a strict relational schema upfront. What is the recommended approach?",
        "options": [
            "Flatten the JSON data using an external script before loading it into relational tables.",
            "Load the JSON data into a column of type VARIANT and use Snowflake's path expressions to query it directly.",
            "Create an External Table over the JSON files in cloud storage and query the files directly without loading them.",
            "Load the data into a column of type VARCHAR and use regular expressions to parse the data at query time."
        ],
        "correct": 1,
        "explanation": "Snowflake's VARIANT data type is designed specifically to handle semi-structured data like JSON natively without requiring a predefined schema. Loading raw JSON into a VARIANT column allows users to use Snowflake's path syntax (e.g., col:key) to query nested fields directly with optimal performance. Option A removes the flexibility of handling schema changes. Option C is possible but typically slower for frequent, high-performance querying compared to native VARIANT columns. Option D is highly inefficient and complex compared to the native parsing capabilities of the VARIANT type."
    },
    {
        "id": "peq62",
        "type": "multi",
        "question": "Your team has configured a Snowpipe to automatically load data from an Amazon S3 bucket into a Snowflake table. The pipe relies on S3 event notifications (SQS) to trigger loads. However, recent files dropped into the S3 bucket are not appearing in the target table. Which of the following steps should you take to troubleshoot the issue? (Select TWO)",
        "options": [
            "Check the SYSTEM$PIPE_STATUS function to verify the pipe's execution state.",
            "Query the LOAD_HISTORY view in the ACCOUNT_USAGE schema for real-time load errors.",
            "Use the COPY_HISTORY table function in the Information Schema to look for load errors associated with the pipe.",
            "Manually execute the REFRESH PIPE command to force the load process."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "The SYSTEM$PIPE_STATUS function (Option A) provides the current status of the pipe (e.g., RUNNING, STOPPED) and the timestamp of the last uploaded file, which is critical for verifying if the pipe is receiving events. The COPY_HISTORY function (Option C) in the Information Schema is the correct place to find history and granular error messages for Snowpipe loads within the last 14 days. Option B is incorrect because LOAD_HISTORY only contains bulk load (COPY INTO) history, not Snowpipe loads (which are tracked in COPY_HISTORY or PIPE_USAGE_HISTORY). Option D is incorrect because the command syntax is invalid; the correct command is ALTER PIPE ... REFRESH, but reviewing status and history should precede forcing a refresh."
    },
    {
        "id": "peq63",
        "type": "single",
        "question": "A streaming application generates millions of event records per minute. You need to load these events into Snowflake with the lowest possible latency and minimal cost. The data does not need to be staged in cloud storage before loading. Which Snowflake feature is BEST suited for this requirement?",
        "options": [
            "Snowpipe with auto-ingest enabled",
            "Snowpipe Streaming API",
            "Kafka connector using standard Snowpipe",
            "COPY INTO command scheduled via Snowflake Tasks"
        ],
        "correct": 1,
        "explanation": "The Snowpipe Streaming API allows you to write rows of data directly into Snowflake tables without the need to first stage the files in cloud storage (like Amazon S3 or Azure Blob). This direct ingestion results in lower latency and reduced costs, as it eliminates cloud storage staging costs and reduces compute overhead compared to standard Snowpipe. Options A, C, and D all rely on staging files in cloud storage first before ingesting them into Snowflake, which introduces higher latency and storage costs."
    },
    {
        "id": "peq64",
        "type": "multi",
        "question": "You need to unload a large historical table to an external Amazon S3 stage to share with a third-party application. The application requires the files to be in Parquet format, partitioned into directories by year and month, and each individual file should not exceed 100 MB. Which options in the COPY INTO <location> command are required to achieve this? (Select TWO)",
        "options": [
            "HEADER = TRUE",
            "MAX_FILE_SIZE = 104857600",
            "PARTITION BY (date_part(year, col), date_part(month, col))",
            "FOLDERS = TRUE"
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "To limit the maximum size of the unloaded files, the MAX_FILE_SIZE copy option must be set to 100 MB, which is 104,857,600 bytes (Option B). To partition the unloaded data into logical folders (directories) by year and month, the PARTITION BY copy option is used to define the directory structure based on column expressions (Option C). Option A (HEADER = TRUE) is not supported for Parquet unloads in Snowflake. Option D (FOLDERS = TRUE) is not a valid Snowflake copy option."
    },
    {
        "id": "peq65",
        "type": "single",
        "question": "Your development team wants to manage Snowpark Python scripts, SQL setup scripts, and Streamlit application files in a central GitHub repository. They want to seamlessly execute these files directly within Snowflake without manually uploading them. How can this be achieved?",
        "options": [
            "Create an External Stage pointing to the GitHub API and schedule a task to pull files hourly.",
            "Create a Git repository integration in Snowflake and fetch the repository to an internal stage.",
            "Create an API Integration that triggers a GitHub Action to deploy code to a Snowflake internal stage.",
            "Configure a Snowpipe to ingest the repository files as JSON into a variant column."
        ],
        "correct": 1,
        "explanation": "Snowflake provides native Git integration by allowing users to create a Git repository integration. This object connects Snowflake directly to a remote Git repository (like GitHub, GitLab, etc.). Users can fetch the repository, which clones the files into a special stage in Snowflake, allowing direct execution of SQL scripts or deployment of Snowpark and Streamlit apps from the version-controlled code. Options A, C, and D are workarounds that do not utilize Snowflake's native Git integration capabilities and require complex external orchestration."
    },
    {
        "id": "peq66",
        "type": "single",
        "question": "A company wants to load data from an Azure Blob Storage container into Snowflake. Security policies dictate that Snowflake should not store explicit cloud provider credentials (like account keys or SAS tokens) to access the external storage. Which Snowflake object must be created to securely grant this access?",
        "options": [
            "Secure Data Share",
            "API Integration",
            "Storage Integration",
            "External Access Integration"
        ],
        "correct": 2,
        "explanation": "A Storage Integration is a Snowflake object that stores a generated identity and access management (IAM) entity for external cloud storage (AWS, Azure, GCP). It allows Snowflake to access the external storage using role-based access control without requiring users to supply explicit credentials (like secret keys or SAS tokens) when creating stages or loading data. Option B is used for external functions. Option D is used for outbound network access from stored procedures or UDFs. Option A is for sharing data securely between Snowflake accounts."
    },
    {
        "id": "peq67",
        "type": "single",
        "question": "When loading a large JSON file into Snowflake using the COPY INTO command, you realize the file consists of a single large array containing thousands of individual JSON objects. By default, Snowflake attempts to load the entire array as a single record. Which FILE_FORMAT option is required to load each object inside the array as a separate row in the target table?",
        "options": [
            "ALLOW_DUPLICATE = TRUE",
            "STRIP_OUTER_ARRAY = TRUE",
            "IGNORE_UTF8_ERRORS = TRUE",
            "ENABLE_LOGICAL_TYPES = TRUE"
        ],
        "correct": 1,
        "explanation": "The STRIP_OUTER_ARRAY = TRUE option is specific to parsing JSON data. When enabled, Snowflake removes the outermost array brackets and loads each JSON object within that array as a separate row in the target table. Without this option, Snowflake treats the entire outermost array as a single JSON document (one row). Options A, C, and D do not modify the structural parsing behavior of JSON arrays."
    },
    {
        "id": "peq68",
        "type": "single",
        "question": "You need to regularly export financial summary data from Snowflake to an AWS S3 bucket for archival purposes. The data must be encrypted before being written to S3. You are creating an external stage referencing a storage integration for this process. How can you ensure the unloaded data is encrypted using AWS Key Management Service (KMS)?",
        "options": [
            "Define an encryption policy on the source Snowflake table before unloading.",
            "Configure the external stage with ENCRYPTION = (TYPE = 'AWS_SSE_KMS' KMS_KEY_ID = '<key_id>').",
            "Create a Network Policy to encrypt data over the wire during the unload process.",
            "Use a Snowflake internal stage instead, because external stages do not support custom encryption keys."
        ],
        "correct": 1,
        "explanation": "When unloading data to an external stage (like AWS S3) and requiring AWS KMS encryption, you specify the encryption configuration directly on the stage (or inline in the COPY command). Setting ENCRYPTION = (TYPE = 'AWS_SSE_KMS' KMS_KEY_ID = '<key_id>') instructs Snowflake to use AWS Server-Side Encryption with KMS using the provided key ID. Option A is incorrect as tables are already encrypted at rest by Snowflake and this doesn't govern external export encryption. Option C is unrelated to file encryption at rest in S3. Option D is incorrect as external stages fully support client-side and server-side encryption configurations."
    },
    {
        "id": "peq69",
        "type": "multi",
        "question": "You have a Snowpipe that automatically ingests CSV files from an S3 bucket into a target table. You notice that some files contain a few malformed rows causing data type conversion errors. You want the pipe to load all valid records from these files, skip the rows with errors, and you need a way to review the error messages later. How can you configure and monitor this? (Select TWO)",
        "options": [
            "Set the ON_ERROR copy option in the pipe definition to 'CONTINUE'.",
            "Set the ON_ERROR copy option in the pipe definition to 'SKIP_FILE'.",
            "Query the COPY_HISTORY view in the Information Schema to identify the specific files and error messages.",
            "Use the VALIDATE function with the pipe name to review the rejected records."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "When defining a pipe, setting ON_ERROR = 'CONTINUE' (Option A) instructs the COPY command to load the valid rows and skip the rows that produce errors, allowing the file to be partially loaded. To monitor and review these errors, you query the COPY_HISTORY table function or view (Option C), which tracks file-level load status, row counts, and specific error messages for Snowpipe. Option B is incorrect because 'SKIP_FILE' would reject the entire file if any error occurs, which violates the requirement to load valid records. Option D is incorrect because the VALIDATE function is used for bulk loads (COPY INTO), not for Snowpipe."
    },
    {
        "id": "peq70",
        "type": "single",
        "question": "A retail company regularly queries a multi-terabyte table named `SALES_DATA` filtering by `TRANSACTION_DATE` and `STORE_ID`. Despite the table being large, queries are taking longer than expected. The Cloud Services layer indicates high metadata scanning, and the Query Profile shows poor partition pruning. Which action is the MOST cost-effective way to improve performance for these specific queries?",
        "options": [
            "Scale up the virtual warehouse to a larger size.",
            "Enable the Search Optimization Service on the `SALES_DATA` table.",
            "Define a clustering key on `(TRANSACTION_DATE, STORE_ID)` for the `SALES_DATA` table.",
            "Create a materialized view that pre-aggregates the data by store and date."
        ],
        "correct": 2,
        "explanation": "Defining a clustering key on the columns frequently used in WHERE clauses (like date and store ID) organizes the data into micro-partitions based on those values, dramatically improving partition pruning and reducing scan time. Scaling up the warehouse (Option A) provides more compute but doesn't fix poor pruning and costs more. Search Optimization Service (Option B) is better for point lookups on high-cardinality columns, not typical range/filter queries on dates. Materialized views (Option D) are useful for pre-aggregating data, but for simply filtering on large tables, clustering is more direct and typically more cost-effective for general query patterns."
    },
    {
        "id": "peq71",
        "type": "single",
        "question": "A cybersecurity firm stores network logs in a massive Snowflake table. Analysts frequently perform point lookups to find specific `IP_ADDRESS` or `SESSION_ID` values out of billions of rows. These lookups are highly selective and return only a few rows. Which Snowflake feature should be enabled to optimize these specific point lookup queries?",
        "options": [
            "Query Acceleration Service (QAS)",
            "Search Optimization Service (SOS)",
            "Automatic Clustering",
            "Result Cache"
        ],
        "correct": 1,
        "explanation": "The Search Optimization Service (SOS) is specifically designed to significantly improve the performance of highly selective point lookup queries on large tables. Query Acceleration Service (Option A) is designed to accelerate parts of a query workload by offloading heavy scans/aggregations, not specifically for point lookups. Automatic Clustering (Option C) is good for range queries and sorting data, but SOS is better for high-cardinality point lookups. Result Cache (Option D) only helps if the exact same query is run again within 24 hours."
    },
    {
        "id": "peq72",
        "type": "multi",
        "question": "Snowflake utilizes three distinct layers of caching to improve query performance. Which of the following statements accurately describe these caching layers? (Select TWO)",
        "options": [
            "The Result Cache stores the results of queries executed in the past 24 hours and is maintained in the Cloud Services layer.",
            "The Local Disk Cache (Data Cache) is shared across all virtual warehouses in the account.",
            "The Remote Disk (Storage) Cache holds raw data permanently and is managed by the Compute layer.",
            "The Local Disk Cache (Data Cache) stores frequently accessed data on the SSDs of the virtual warehouse compute nodes."
        ],
        "correct": [
            0,
            3
        ],
        "explanation": "Option A is correct: the Result Cache stores query results for 24 hours and resides in the Cloud Services layer, meaning it can be accessed without a running virtual warehouse. Option D is correct: the Local Disk Cache (or Data Cache) utilizes the SSDs on the active virtual warehouse nodes to cache data retrieved from centralized storage. Option B is wrong because the Local Disk Cache is specific to a single virtual warehouse and drops when the warehouse is suspended. Option C is wrong because Remote Disk is the centralized storage layer (e.g., S3/Blob), not managed by the Compute layer."
    },
    {
        "id": "peq73",
        "type": "single",
        "question": "When examining a Query Profile to troubleshoot a slow-running query, you notice a node labeled 'Spilling to local storage'. What does this indicate about the query's execution?",
        "options": [
            "The virtual warehouse's local SSD cache is full, and data is being evicted to make room.",
            "The query requires more memory than is available on the virtual warehouse nodes, so it temporarily writes data to local SSDs.",
            "The query is writing its final results to the Snowflake permanent storage layer.",
            "The query is offloading its execution to the Query Acceleration Service to improve performance."
        ],
        "correct": 1,
        "explanation": "Spilling to local storage occurs when an operation (like a large sort, join, or aggregation) requires more memory than is available on the compute nodes of the virtual warehouse. The system temporarily writes (spills) the excess data to the local disk (SSD) of the compute nodes, which can slow down performance. Option A describes cache eviction, not query spilling. Option C describes DML/Result writing. Option D describes QAS, which does not cause spilling; QAS offloads work to external compute resources."
    },
    {
        "id": "peq74",
        "type": "multi",
        "question": "A data engineering team wants to utilize the Query Acceleration Service (QAS) for a specific virtual warehouse that handles ad-hoc analytical workloads. What are the key characteristics and requirements of the Query Acceleration Service? (Select TWO)",
        "options": [
            "QAS requires the warehouse size to be at least X-Large.",
            "QAS acts like a temporary scale-out mechanism by providing additional compute resources to offload heavy scanning and aggregation tasks.",
            "A warehouse with QAS enabled cannot be configured with Multi-cluster Warehouse (MCW) auto-scaling.",
            "QAS incurs additional Snowflake credit charges when its compute resources are utilized by queries."
        ],
        "correct": [
            1,
            3
        ],
        "explanation": "Option B is correct: QAS offloads portions of the query processing work (specifically scans and aggregations) to serverless compute resources provided by Snowflake, effectively acting as temporary scale-out. Option D is correct: because QAS uses serverless compute resources, it consumes additional Snowflake credits when active. Option A is wrong: QAS can be enabled on any warehouse size. Option C is wrong: QAS can be used in conjunction with Multi-cluster Warehouses."
    },
    {
        "id": "peq75",
        "type": "single",
        "question": "A table named `EVENTS` has a clustering key defined on the `EVENT_DATE` column. Over time, millions of rows are continuously inserted out of order, and DML operations update existing rows. How does Snowflake maintain the clustering of this table?",
        "options": [
            "The user must manually execute the `ALTER TABLE ... RECLUSTER` command periodically to maintain clustering.",
            "Snowflake's Automatic Clustering service runs continuously in the background, consuming credits to transparently recluster the micro-partitions.",
            "The virtual warehouse used to insert the data automatically reclusters the table during the insertion process.",
            "Clustering is only maintained when a warehouse is resumed after being suspended."
        ],
        "correct": 1,
        "explanation": "Snowflake's Automatic Clustering is a serverless feature that transparently runs in the background. It evaluates the clustering depth of tables with defined clustering keys and continuously reclusters micro-partitions to maintain optimal performance, consuming credits based on the amount of work done. Option A is wrong because manual clustering is deprecated and handled automatically. Option C is wrong because the inserting warehouse does not do background reclustering. Option D is incorrect as it happens continuously in the background using serverless compute, unrelated to warehouse suspension."
    },
    {
        "id": "peq76",
        "type": "multi",
        "question": "Which of the following scenarios are good candidates for implementing a Clustering Key on a table? (Select TWO)",
        "options": [
            "A 500 MB table used for dimension lookups in nightly batch jobs.",
            "A 5 TB table where queries frequently filter on a `TIMESTAMP` column using date ranges.",
            "A table where the column used in the `WHERE` clause has a very low cardinality (e.g., a boolean `IS_ACTIVE` flag).",
            "A multi-terabyte table where the primary query pattern involves filtering by `REGION` and `DEPARTMENT_ID`."
        ],
        "correct": [
            1,
            3
        ],
        "explanation": "Clustering keys are most beneficial on very large tables (typically > 1TB) where queries frequently filter on specific columns. Option B is a perfect candidate because timestamp range filters benefit greatly from clustering. Option D is also an excellent candidate as filtering on region/department on a massive table will prune effectively if clustered. Option A is wrong because the table is too small (500 MB); micro-partition pruning is already efficient without clustering overhead. Option C is wrong because low cardinality columns do not make good standalone clustering keys as they do not provide enough distinct values to effectively group and prune micro-partitions."
    },
    {
        "id": "peq77",
        "type": "single",
        "question": "You are analyzing query performance in Snowflake. You notice that identical queries run by different users at different times of the day sometimes return instantly without requiring an active virtual warehouse, but other times they take several seconds and start a warehouse. Assuming the underlying data has not changed, what is the MOST likely reason for this behavior?",
        "options": [
            "The Local Disk Cache on the virtual warehouse is expiring.",
            "The users are assigned to different resource monitors, which prioritize query execution differently.",
            "The Result Cache in the Cloud Services layer retains query results for exactly 24 hours from the last time the query was executed.",
            "The Search Optimization Service is enabled only during business hours."
        ],
        "correct": 2,
        "explanation": "The Result Cache holds the results of executed queries for 24 hours. If an identical query is executed by any user in the same role within that 24-hour window, and the underlying data hasn't changed, Snowflake serves the result directly from the Result Cache (in the Cloud Services layer) without needing an active virtual warehouse. The timer resets every time the query is re-run, up to a maximum of 31 days. Option A is wrong because Local Disk Cache still requires a warehouse to run the query, it just skips scanning remote storage. Option B is irrelevant to caching. Option D is not how SOS works."
    },
    {
        "id": "peq78",
        "type": "single",
        "question": "A query profile shows a significant amount of 'Bytes Scanned' but a very small 'Partitions Scanned' compared to 'Partitions Total'. What does this indicate about the query?",
        "options": [
            "The query is suffering from a 'cartesian product' or explosion of rows in a join.",
            "The query is highly optimized and successfully utilizing partition pruning.",
            "The table requires a clustering key to prevent data spilling to local storage.",
            "The virtual warehouse is undersized and needs to be scaled up to process the partitions faster."
        ],
        "correct": 1,
        "explanation": "When 'Partitions Scanned' is much smaller than 'Partitions Total', it indicates that Snowflake successfully skipped (pruned) a large number of micro-partitions that did not contain relevant data for the query. This is a sign of a highly optimized query with excellent partition pruning, often due to natural clustering or a defined clustering key. Option A would manifest as a massive number of output rows/bytes from a Join node. Option C is incorrect because pruning means clustering is likely already good. Option D is incorrect as the warehouse size doesn't change the number of partitions scanned."
    },
    {
        "id": "peq79",
        "type": "multi",
        "question": "Which of the following actions can help reduce the occurrence of 'Spilling to remote storage' during a complex query execution? (Select TWO)",
        "options": [
            "Enable the Search Optimization Service on the queried tables.",
            "Scale up the virtual warehouse to a larger size to provide more local SSD space and memory per node.",
            "Rewrite the query to filter data earlier in the execution plan, reducing the volume of data passed to joins and aggregations.",
            "Enable Automatic Clustering on the query's output temporary table."
        ],
        "correct": [
            1,
            2
        ],
        "explanation": "Spilling to remote storage (which happens after spilling to local storage is exhausted) means the query is extremely memory and local-disk intensive. Option B helps because larger warehouse sizes provide nodes with more memory and larger local SSDs, increasing the threshold before spilling occurs. Option C helps because reducing the data volume (via early filtering or better join strategies) reduces the memory footprint of the operations. Option A (SOS) is for point lookups, not heavy aggregations/joins that cause spilling. Option D is nonsensical because you cannot cluster temporary intermediate result sets during query execution."
    },
    {
        "id": "peq80",
        "type": "single",
        "question": "A company receives nested JSON data containing a list of customer orders in an array field called 'orders'. You need to transform this array so that each order becomes a separate row in the output. Which Snowflake table function should you use?",
        "options": [
            "EXPLODE",
            "FLATTEN",
            "UNNEST",
            "PARSE_JSON"
        ],
        "correct": 1,
        "explanation": "FLATTEN is a table function in Snowflake that unrolls semi-structured data, such as arrays or objects, into multiple rows. EXPLODE and UNNEST are used in other systems like Spark or BigQuery, but not in Snowflake. PARSE_JSON is used to convert string representations of JSON into VARIANT data, not to unroll arrays."
    },
    {
        "id": "peq81",
        "type": "single",
        "question": "An analyst needs to calculate a running total of sales by region, ordered by date, without collapsing the individual rows. Which feature provides this functionality?",
        "options": [
            "GROUP BY",
            "PIVOT",
            "Window functions",
            "Aggregate functions"
        ],
        "correct": 2,
        "explanation": "Window functions operate on a set of rows and return a single value for each row from the underlying query, making them ideal for calculations like running totals without collapsing the rows. GROUP BY collapses rows into a single row per group. PIVOT transforms rows into columns. Standard aggregate functions (without an OVER clause) will collapse the result set."
    },
    {
        "id": "peq82",
        "type": "single",
        "question": "Your data engineering team wants to execute a complex ETL script automatically every time new records are inserted into a staging table. What combination of Snowflake features is best suited for this?",
        "options": [
            "Materialized Views and Sequences",
            "Streams and Tasks",
            "Stored Procedures and Time Travel",
            "External Tables and Pipes"
        ],
        "correct": 1,
        "explanation": "Streams track changes (DML operations) made to a table, and Tasks can be scheduled to execute SQL statements (like calling a stored procedure) periodically, optionally checking if a stream has data. This combination is ideal for automated ETL pipelines. Materialized views optimize queries. Time travel queries historical data. External tables query data in external stages."
    },
    {
        "id": "peq83",
        "type": "single",
        "question": "You are designing a database routine that needs to create multiple tables, run a series of INSERT statements, and return a success message. Which object should you choose?",
        "options": [
            "User-Defined Function (UDF)",
            "User-Defined Table Function (UDTF)",
            "Stored Procedure",
            "External Function"
        ],
        "correct": 2,
        "explanation": "Stored Procedures allow you to execute multiple statements, perform DDL and DML operations, and include control flow logic. UDFs and UDTFs are intended for calculations and transformations; they cannot execute DDL or DML statements (other than SELECT). External functions call code executed outside of Snowflake."
    },
    {
        "id": "peq84",
        "type": "single",
        "question": "A developer accidentally executed a DELETE statement without a WHERE clause, removing all records from a critical table 5 minutes ago. Which Snowflake feature allows you to restore the table to its state just before the deletion?",
        "options": [
            "Fail-safe",
            "Time Travel",
            "Zero-copy cloning",
            "Data replication"
        ],
        "correct": 1,
        "explanation": "Time Travel allows you to access historical data up to 90 days (for Enterprise edition and above) and can be used to query or restore data right before an accidental deletion. Fail-safe is only accessible by Snowflake Support for disaster recovery after Time Travel expires. Zero-copy cloning creates replicas but doesn't inherently restore lost data unless a clone was made beforehand. Data replication is for cross-region disaster recovery."
    },
    {
        "id": "peq85",
        "type": "single",
        "question": "The Time Travel retention period for a table expired 3 days ago. The data is now discovered to be corrupted and needs to be recovered. Who can recover the data using Fail-safe?",
        "options": [
            "Only the ACCOUNTADMIN role",
            "Only the SYSADMIN role",
            "Only Snowflake Support",
            "Any user with OWNERSHIP privilege on the table"
        ],
        "correct": 2,
        "explanation": "Fail-safe is a 7-day period immediately following the expiration of the Time Travel retention period. It is designed solely for use by Snowflake in the event of a system failure or other catastrophic event. Only Snowflake Support can recover data from Fail-safe. Roles like ACCOUNTADMIN or SYSADMIN cannot access Fail-safe data directly."
    },
    {
        "id": "peq86",
        "type": "single",
        "question": "Your QA team needs an exact replica of a 5 TB production database for testing. They need it immediately and want to minimize storage costs. Which approach is the most efficient?",
        "options": [
            "Use the COPY INTO command to export and import data.",
            "Create a Zero-copy clone of the database.",
            "Use Time Travel to query the historical data.",
            "Implement Data Sharing to give the QA team access."
        ],
        "correct": 1,
        "explanation": "Zero-copy cloning creates a logical copy of a database, schema, or table without physically duplicating the data, thus incurring no immediate additional storage costs and completing nearly instantaneously. Copying data duplicates it. Time Travel is for accessing historical data, not provisioning environments. Data Sharing allows read access but doesn't provide an isolated environment for testing DML changes."
    },
    {
        "id": "peq87",
        "type": "multi",
        "question": "A team is setting up an automated pipeline using Streams and Tasks. Which of the following statements are TRUE about Snowflake Streams and Tasks? (Select TWO)",
        "options": [
            "A task can be scheduled using a cron expression or a time interval.",
            "A stream physically duplicates the table data to track changes.",
            "A task can be triggered based on a stream having data using the SYSTEM$STREAM_HAS_DATA function.",
            "Streams can only be created on external tables."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Tasks can be scheduled using a CRON expression or a specified interval (e.g., '10 MINUTE'). They can also be configured to run only when a stream contains data using SYSTEM$STREAM_HAS_DATA. Streams do not duplicate physical data; they use offset metadata to track changes. Streams can be created on standard tables, directories, and views, not just external tables."
    },
    {
        "id": "peq88",
        "type": "multi",
        "question": "You are loading semi-structured data into Snowflake. Which of the following data formats are natively supported by Snowflake for parsing and querying as semi-structured data? (Select THREE)",
        "options": [
            "JSON",
            "Parquet",
            "XML",
            "YAML"
        ],
        "correct": [
            0,
            1,
            2
        ],
        "explanation": "Snowflake natively supports querying and storing JSON, Avro, ORC, Parquet, and XML as semi-structured data using the VARIANT data type. YAML is not a natively supported format for semi-structured data querying in Snowflake."
    },
    {
        "id": "peq89",
        "type": "multi",
        "question": "An organization wants to understand the storage implications of Time Travel and Fail-safe. Which of the following are true regarding these features? (Select TWO)",
        "options": [
            "Fail-safe provides a non-configurable 7-day retention period for Permanent tables.",
            "Transient tables have a Time Travel retention period of up to 90 days.",
            "Temporary tables do not have Fail-safe.",
            "Time Travel storage does not incur any additional costs."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Fail-safe is always 7 days for Permanent tables and cannot be changed. Temporary and Transient tables do not have Fail-safe at all. Transient tables have a maximum Time Travel retention of 1 day, not 90 days. Time Travel storage does incur costs as it retains historical data that takes up physical space."
    },
    {
        "id": "peq90",
        "type": "multi",
        "question": "A developer is confused about when to use a UDF versus a Stored Procedure. Which of the following describe key differences between the two? (Select TWO)",
        "options": [
            "Stored procedures can execute DDL and DML operations, while UDFs cannot.",
            "UDFs return a scalar value or a set of rows, while stored procedures can return a single value or no value.",
            "Stored procedures must be written in JavaScript, while UDFs can only be written in SQL.",
            "UDFs can be called in the SELECT clause of a query, while stored procedures are executed using the CALL statement."
        ],
        "correct": [
            0,
            3
        ],
        "explanation": "Stored procedures are used for performing administrative tasks, DDL, and DML, and are invoked using CALL. UDFs are used for computing values, cannot perform DML/DDL, and are invoked within SQL statements (like SELECT). Stored procedures can return values, but typically a single value. Both can be written in multiple languages (SQL, JavaScript, Python, Java, etc.), so they are not restricted to just one language."
    },
    {
        "id": "peq91",
        "type": "single",
        "question": "A data provider wants to securely share a database table with an external consumer who does not have a Snowflake account. Which Snowflake feature should the provider use to accomplish this without requiring the consumer to set up their own Snowflake billing?",
        "options": [
            "Snowflake Data Marketplace",
            "Reader Account",
            "Direct Data Share",
            "Snowflake Native App"
        ],
        "correct": 1,
        "explanation": "A Reader Account allows a data provider to share data with consumers who do not have a Snowflake account. The provider pays for the compute resources used by the consumer in the Reader Account. The Data Marketplace and Direct Data Share require the consumer to have their own Snowflake account. A Native App is used for sharing application logic and data, but still requires the consumer to have an account if they are installing it from the marketplace or a share."
    },
    {
        "id": "peq92",
        "type": "multi",
        "question": "Which of the following statements are TRUE regarding Snowflake Reader Accounts? (Select TWO)",
        "options": [
            "Consumers using a Reader Account can update and insert data into the shared tables.",
            "The data provider is responsible for the compute costs incurred by the Reader Account.",
            "A Reader Account can be created directly by the consumer without the provider's involvement.",
            "A provider can create multiple Reader Accounts for different consumers."
        ],
        "correct": [
            1,
            3
        ],
        "explanation": "The provider covers the compute costs (Option B), and a provider can create multiple reader accounts (Option D). Consumers cannot update or insert data into shared tables in a reader account because data sharing is strictly read-only (Option A is wrong). A reader account must be created by the provider, not the consumer (Option C is wrong)."
    },
    {
        "id": "peq93",
        "type": "single",
        "question": "A company wants to monetize its proprietary dataset by offering it to all Snowflake users globally. Which of the following is the most appropriate method to publish this data?",
        "options": [
            "Direct Data Share",
            "Data Exchange",
            "Snowflake Marketplace",
            "Data Clean Room"
        ],
        "correct": 2,
        "explanation": "The Snowflake Marketplace is the public venue where providers can list and monetize datasets for any Snowflake user globally. A Direct Data Share is for specific, known consumers (1-to-1 or 1-to-few). A Data Exchange is a private hub for a specific group of invited members. A Data Clean Room is used for secure multi-party computation without exposing raw data, not for general publishing."
    },
    {
        "id": "peq94",
        "type": "multi",
        "question": "When designing a Secure Data Share in Snowflake, which of the following objects can be directly included in a share? (Select TWO)",
        "options": [
            "Tables",
            "External functions",
            "Secure Views",
            "Sequences"
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Tables and Secure Views can be shared directly via a Secure Data Share. External functions and Sequences cannot be directly shared in a Snowflake Secure Data Share."
    },
    {
        "id": "peq95",
        "type": "single",
        "question": "Two companies want to analyze their combined customer datasets to find overlapping audiences without exposing the underlying PII (Personally Identifiable Information) to each other. Which Snowflake concept is designed to handle this scenario?",
        "options": [
            "Snowflake Global Data Network",
            "Data Clean Room",
            "Snowflake Marketplace",
            "Reader Account"
        ],
        "correct": 1,
        "explanation": "A Data Clean Room allows multiple parties to securely analyze and compute over combined datasets while restricting access to the underlying raw data or PII. The Global Data Network refers to Snowflake's cross-region replication capabilities. Marketplace is for publishing data, and Reader Accounts are for non-Snowflake consumers, neither of which prevent raw data visibility by themselves."
    },
    {
        "id": "peq96",
        "type": "multi",
        "question": "Which of the following are prerequisites or requirements for replicating databases across different Snowflake regions? (Select TWO)",
        "options": [
            "The primary and secondary accounts must be linked to the same Organization.",
            "Database replication is supported on all Snowflake editions, including Standard.",
            "Replication must be explicitly enabled for the account by an org administrator.",
            "Virtual warehouses are automatically replicated along with the database data."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Accounts must be part of the same Organization to enable replication between them (Option A), and an ORGADMIN must enable replication for the accounts (Option C). Database replication requires Enterprise edition or higher (Option B is wrong). Virtual warehouses are compute resources and are not replicated; only data objects are replicated (Option D is wrong)."
    },
    {
        "id": "peq97",
        "type": "multi",
        "question": "When an organization uses the Snowflake Native App Framework to share an application with consumers, which of the following benefits does it provide? (Select TWO)",
        "options": [
            "The application logic runs in the consumer's Snowflake account, utilizing the consumer's compute.",
            "The provider retains full access to the consumer's raw data for troubleshooting purposes.",
            "The provider's intellectual property (IP), such as proprietary code and logic, is hidden from the consumer.",
            "The consumer does not need a Snowflake account to run the Native App."
        ],
        "correct": [
            0,
            2
        ],
        "explanation": "Native Apps run in the consumer's account using their compute resources (Option A) while protecting the provider's intellectual property by hiding the code (Option C). The provider does NOT get access to the consumer's data (Option B is wrong). The consumer must have a Snowflake account to install and run a Native App (Option D is wrong)."
    },
    {
        "id": "peq98",
        "type": "single",
        "question": "You are a consumer of a Direct Data Share in Snowflake. You want to query the shared data. What is the very first step you must take as an ACCOUNTADMIN after the provider has granted access to your account?",
        "options": [
            "Create a database from the share.",
            "Clone the shared tables into a local database.",
            "Assign a virtual warehouse to the share.",
            "Request a reader account from the provider."
        ],
        "correct": 0,
        "explanation": "The first step for a consumer is to create a local database from the inbound share. Once the database is created, the data can be queried. You cannot clone shared tables because shares are read-only (Option B is wrong). You do not assign a warehouse to the share itself, but you use your own warehouse to query the database created from the share (Option C is wrong). A reader account is for non-customers, but the scenario states you are a consumer with an account (Option D is wrong)."
    },
    {
        "id": "peq99",
        "type": "multi",
        "question": "Which of the following actions can a consumer perform on a database created from a Snowflake inbound share? (Select TWO)",
        "options": [
            "Query the data using their own virtual warehouse.",
            "Create materialized views on top of the shared tables.",
            "Update records in the shared tables.",
            "Time Travel on the shared tables to view historical data."
        ],
        "correct": [
            0,
            1
        ],
        "explanation": "Consumers can query the data using their own compute (Option A) and can create objects like views or materialized views in their own separate databases referencing the shared data (Option B). Consumers cannot perform DML (update/insert/delete) on shared data as it is read-only (Option C is wrong). Consumers cannot use Time Travel on shared databases; only the provider can manage Time Travel for the shared objects (Option D is wrong)."
    },
    {
        "id": "peq100",
        "type": "single",
        "question": "When sharing data across different cloud providers (e.g., AWS to Azure), what must a Snowflake customer do to facilitate the share without requiring the consumer to change their cloud region?",
        "options": [
            "Use an External Stage to copy data to the consumer's cloud.",
            "Replicate the database to a Snowflake account in the consumer's cloud and region, then share from that replicated account.",
            "Share the data directly; Snowflake automatically routes queries across cloud providers seamlessly.",
            "Provide the consumer with an AWS PrivateLink connection to access the data."
        ],
        "correct": 1,
        "explanation": "Snowflake data sharing is bounded by the cloud provider and region. To share data with a consumer in a different region or cloud provider, the provider must first replicate the database to a Snowflake account in the consumer's region/cloud, and then initiate the share from that localized account. Direct sharing across regions/clouds is not supported automatically (Option C is wrong). External stages and PrivateLink do not address cross-region/cloud Snowflake data sharing (Options A and D are wrong)."
    }
]
    }
];