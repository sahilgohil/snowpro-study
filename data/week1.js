window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.week1 = [
    {
        day: 1,
        title: "What is Snowflake?",
        subtitle: "Introduction to the AI Data Cloud Platform",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand what Snowflake is and its cloud-native architecture",
            "Explain the history and evolution of Snowflake",
            "Compare Snowflake with traditional and other cloud data warehouses",
            "Identify the core advantages of the AI Data Cloud Platform"
        ],
        sections: [
            {
                title: "What is Snowflake?",
                content: `<p>Welcome to your first day of SnowPro Core preparation! Let's start with the basics. <strong>Snowflake</strong> is a cloud-native, fully managed, Software-as-a-Service (SaaS) data platform. But what does that actually mean?</p>
                <p>Unlike traditional databases where you have to buy servers, install software, and configure networking, Snowflake is provided as a service. You simply create an account, log in through a web browser (or connect via tools like Python, JDBC/ODBC), and start working with your data. There is no hardware to purchase, no software to install, and no maintenance to perform. Snowflake handles all the updates, patches, and backups automatically.</p>
                <div class="callout tip">
                    <div class="callout-title">💡 Key Takeaway</div>
                    <p>Think of traditional data warehouses like buying and maintaining your own car: you have to pay for it upfront, handle oil changes, buy new tires, and find a place to park it. Snowflake is like an unlimited ride-hailing service (like Uber or Lyft). You just ask for a ride when you need one, pay only for the distance you travel, and never worry about the maintenance.</p>
                </div>
                <p>Founded in 2012 by former Oracle architects and launched generally in 2014, Snowflake disrupted the data warehousing industry with a revolutionary architecture designed specifically for the cloud. It wasn't just a traditional database migrated to AWS—it was built from scratch to leverage the unlimited scalability of cloud computing. This rapid growth led to its massive IPO in 2020.</p>
                `
            },
            {
                title: "The Evolution of Data Warehouses",
                content: `<p>To truly appreciate Snowflake, you need to understand what came before it.</p>
                <h4>1. Traditional On-Premises Data Warehouses (e.g., Teradata, Oracle)</h4>
                <p>These systems require massive upfront capital expenditures to buy hardware. They tightly couple storage and compute resources, meaning if you run out of storage, you have to buy an entirely new appliance that includes compute you might not even need. Upgrades take weekends of downtime, and performance tuning requires teams of specialized Database Administrators (DBAs).</p>
                <h4>2. First-Generation Cloud Data Warehouses (e.g., early Amazon Redshift)</h4>
                <p>These moved the traditional architecture to the cloud. While you didn't have to buy the hardware, storage and compute were still tightly coupled on the same virtual machines (nodes). If you needed more compute for heavy queries, you also paid for more storage.</p>
                <h4>3. The Snowflake Revolution</h4>
                <p>Snowflake completely decoupled storage and compute. Storage sits in cheap, infinitely scalable cloud blob storage, while compute is handled by independent clusters of virtual machines (Virtual Warehouses) that can be turned on and off instantly. This means you can have 10 different departments running heavy queries against the exact same data simultaneously, without affecting each other's performance.</p>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>The COF-C03 exam frequently tests your understanding of <strong>Separation of Storage and Compute</strong>. Remember that this allows independent scaling and pricing for storage and processing.</p>
                </div>`
            },
            {
                title: "The AI Data Cloud",
                content: `<p>Snowflake has evolved beyond just a data warehouse into the <strong>AI Data Cloud</strong>. What does this mean?</p>
                <p>It means Snowflake isn't just for querying structured data (like CSVs or SQL tables) anymore. It natively supports semi-structured data (like JSON, Parquet, and XML) and unstructured data (like PDFs and images). More importantly, it provides a unified platform for:</p>
                <ul>
                    <li><strong>Data Engineering:</strong> Building pipelines to transform data (using tools like Snowpark and Dynamic Tables).</li>
                    <li><strong>Data Lakehouse:</strong> Combining the benefits of data lakes (cheap storage, flexible formats like Apache Iceberg) with data warehouse governance.</li>
                    <li><strong>Data Sharing & Collaboration:</strong> Securely sharing live data across organizations without moving or copying it.</li>
                    <li><strong>AI & Machine Learning:</strong> Leveraging Snowflake Cortex AI to run large language models (LLMs) and ML functions directly where the data lives.</li>
                </ul>
                <p>This "one platform, no silos" approach is a defining characteristic of Snowflake.</p>`
            }
        ],
        quiz: [
            {
                id: "d1q1",
                type: "single",
                question: "Which of the following best describes Snowflake's delivery model?",
                options: ["Platform as a Service (PaaS)", "Software as a Service (SaaS)", "Infrastructure as a Service (IaaS)", "On-premises software"],
                correct: 1,
                explanation: "Snowflake is delivered as Software as a Service (SaaS). Users do not manage any underlying infrastructure, virtual machines, or software patching."
            },
            {
                id: "d1q2",
                type: "single",
                question: "What was the fundamental architectural breakthrough that separated Snowflake from traditional data warehouses?",
                options: ["The use of SQL", "Separation of storage and compute", "Integration with BI tools", "Support for relational data"],
                correct: 1,
                explanation: "The core innovation of Snowflake was completely decoupling storage from compute, allowing each to scale independently and eliminating resource contention."
            },
            {
                id: "d1q3",
                type: "multi",
                question: "Which of the following data types are supported natively by Snowflake? (Select TWO)",
                options: ["Structured Data", "NoSQL Document Databases", "Semi-structured Data (JSON, XML)", "Mainframe hierarchical data"],
                correct: [0, 2],
                explanation: "Snowflake natively supports structured data (like standard relational tables) and semi-structured data (like JSON, XML, Parquet, Avro, and ORC)."
            },
            {
                id: "d1q4",
                type: "single",
                question: "A company wants to move away from buying hardware and managing database software updates. Why is Snowflake a good fit?",
                options: ["It requires minimal hardware purchases.", "It is a fully managed SaaS platform with near-zero maintenance.", "It provides on-premises deployment options for better security.", "It only requires software updates once a year."],
                correct: 1,
                explanation: "Snowflake is a SaaS product meaning there is no hardware to buy, no software to install, and Snowflake handles all updates and maintenance automatically behind the scenes."
            },
            {
                id: "d1q5",
                type: "single",
                question: "How does Snowflake's architecture prevent resource contention when multiple departments query the same data?",
                options: ["By copying data to different servers for each department", "By using independent compute clusters (Virtual Warehouses) that access the same centralized storage", "By scheduling queries to run at different times", "By using traditional row-level locking mechanisms"],
                correct: 1,
                explanation: "Because storage and compute are decoupled, different departments can use their own dedicated Virtual Warehouses to query the exact same data simultaneously without impacting each other's performance."
            },
            {
                id: "d1q6",
                type: "single",
                question: "Which term best describes Snowflake's modern positioning encompassing data warehousing, data lakes, data sharing, and AI?",
                options: ["The Relational Cloud", "The AI Data Cloud", "The Big Data Appliance", "The NoSQL Network"],
                correct: 1,
                explanation: "Snowflake positions itself as the 'AI Data Cloud', reflecting its expansion beyond basic data warehousing into data lakes, collaboration, data engineering, and artificial intelligence/machine learning."
            }
        ]
    },
    {
        day: 2,
        title: "Three-Layer Architecture",
        subtitle: "The Foundation of Snowflake",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Identify the three distinct layers of Snowflake's architecture",
            "Understand the responsibilities of the Storage layer",
            "Understand the responsibilities of the Compute layer",
            "Understand the responsibilities of the Cloud Services layer"
        ],
        sections: [
            {
                title: "The Core of the Exam",
                content: `<div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>If you only remember one thing for the COF-C03 exam, make it this: Snowflake has a <strong>three-layer architecture</strong> consisting of Storage, Compute, and Cloud Services. You will almost certainly see multiple questions testing your knowledge of what each layer does.</p>
                </div>
                <p>Snowflake's unique architecture is often described as a hybrid of traditional shared-disk and shared-nothing architectures. It uses a central repository for data (shared-disk) but processes queries using massively parallel processing (MPP) compute clusters where each node stores a portion of the entire data set locally (shared-nothing). This provides the simplicity of shared-disk with the performance of shared-nothing.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="450" fill="#111827" />
                        
                        <!-- Cloud Services Layer -->
                        <rect x="100" y="50" width="600" height="100" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                        <text x="400" y="80" fill="#e8eaf6" font-size="20" font-weight="bold" text-anchor="middle">Cloud Services Layer (The Brain)</text>
                        <text x="400" y="110" fill="#b0bec5" font-size="14" text-anchor="middle">Auth, Metadata, Optimization, Access Control</text>
                        
                        <!-- Arrows -->
                        <path d="M 400 150 L 400 190" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)" />
                        
                        <!-- Compute Layer -->
                        <rect x="100" y="200" width="600" height="120" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                        <text x="400" y="230" fill="#e8eaf6" font-size="20" font-weight="bold" text-anchor="middle">Compute Layer (The Muscle)</text>
                        
                        <!-- Virtual Warehouses -->
                        <rect x="150" y="250" width="120" height="50" rx="4" fill="#29b5f6" opacity="0.8" />
                        <text x="210" y="280" fill="#111827" font-size="14" font-weight="bold" text-anchor="middle">Warehouse 1</text>
                        
                        <rect x="340" y="250" width="120" height="50" rx="4" fill="#29b5f6" opacity="0.8" />
                        <text x="400" y="280" fill="#111827" font-size="14" font-weight="bold" text-anchor="middle">Warehouse 2</text>
                        
                        <rect x="530" y="250" width="120" height="50" rx="4" fill="#29b5f6" opacity="0.8" />
                        <text x="590" y="280" fill="#111827" font-size="14" font-weight="bold" text-anchor="middle">Warehouse 3</text>
                        
                        <!-- Arrows -->
                        <path d="M 400 320 L 400 360" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)" />
                        <path d="M 210 320 L 210 360" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)" />
                        <path d="M 590 320 L 590 360" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)" />
                        
                        <!-- Storage Layer -->
                        <rect x="100" y="370" width="600" height="60" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2" />
                        <text x="400" y="405" fill="#e8eaf6" font-size="20" font-weight="bold" text-anchor="middle">Database Storage Layer (The Vault)</text>
                        
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#6b7b8d" />
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 1: Snowflake's Three-Layer Architecture</p>
                </div>`
            },
            {
                title: "Layer 1: Database Storage (The Vault)",
                content: `<p>When you load data into Snowflake, it completely reorganizes that data into its internal, optimized, compressed, columnar format known as <strong>micro-partitions</strong>.</p>
                <ul>
                    <li><strong>Centralized:</strong> It serves as a single source of truth.</li>
                    <li><strong>Managed:</strong> Snowflake manages all aspects of how this data is stored (organization, file size, structure, compression, metadata, and encryption).</li>
                    <li><strong>Inaccessible directly:</strong> Customers cannot directly view or access these files; they can only query the data via SQL.</li>
                    <li><strong>Provider:</strong> Stored on cloud blob storage (AWS S3, Azure Blob Storage, or Google Cloud Storage).</li>
                </ul>`
            },
            {
                title: "Layer 2: Query Processing / Compute (The Muscle)",
                content: `<p>This is where query execution is performed. It consists of <strong>Virtual Warehouses</strong> (often just called "warehouses").</p>
                <ul>
                    <li><strong>Independent:</strong> Virtual warehouses are independent compute clusters. They do not share compute resources with each other.</li>
                    <li><strong>Non-blocking:</strong> Because they are independent, Warehouse A processing a huge data load will NOT slow down Warehouse B running BI reports, even if they are hitting the exact same table.</li>
                    <li><strong>Elastic:</strong> You can spin them up, spin them down, or resize them instantly on the fly.</li>
                    <li><strong>Caching:</strong> They cache data locally as queries run, which speeds up subsequent queries on the same data.</li>
                </ul>`
            },
            {
                title: "Layer 3: Cloud Services (The Brain)",
                content: `<p>The Cloud Services layer coordinates activities across Snowflake. It ties all the different components together. Without this layer, the compute layer wouldn't know where the data is in the storage layer.</p>
                <p>Key services include:</p>
                <ul>
                    <li><strong>Authentication & Access Control:</strong> Checking your username/password and making sure you have permission to run that SELECT statement.</li>
                    <li><strong>Infrastructure Management:</strong> Managing the spinning up and down of virtual warehouses.</li>
                    <li><strong>Metadata Management:</strong> Tracking where micro-partitions live, how many rows are in them, and statistics (min/max values) used for query optimization.</li>
                    <li><strong>Query Parsing & Optimization:</strong> Taking your SQL query, checking syntax, and figuring out the most efficient way to execute it.</li>
                </ul>
                <div class="callout warning">
                    <div class="callout-title">⚠️ Common Misconception</div>
                    <p>Many beginners think Virtual Warehouses parse and optimize queries. They do NOT. The Cloud Services layer parses and optimizes the query, and then passes an execution plan down to the Virtual Warehouse (Compute layer) to do the heavy lifting.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d2q1",
                type: "single",
                question: "Which layer of the Snowflake architecture is responsible for query parsing and optimization?",
                options: ["Database Storage Layer", "Query Processing (Compute) Layer", "Cloud Services Layer", "Network Layer"],
                correct: 2,
                explanation: "The Cloud Services layer acts as the 'brain' of Snowflake. It parses incoming SQL queries, verifies syntax and permissions, and generates the optimized query execution plan."
            },
            {
                id: "d2q2",
                type: "single",
                question: "Which layer manages the caching of data retrieved from centralized storage for faster subsequent access by the same compute cluster?",
                options: ["Cloud Services Layer", "Database Storage Layer", "Query Processing (Compute) Layer", "Metadata Layer"],
                correct: 2,
                explanation: "Virtual Warehouses in the Query Processing (Compute) layer cache data (often called the Local Disk Cache or Data Cache) as queries run. Subsequent queries using the same warehouse can read from this cache instead of fetching from remote storage."
            },
            {
                id: "d2q3",
                type: "multi",
                question: "Which of the following tasks are performed by the Cloud Services layer? (Select TWO)",
                options: ["Authentication and access control", "Executing the data filtering and aggregation steps of a query", "Storing the physical micro-partition files", "Metadata management"],
                correct: [0, 3],
                explanation: "The Cloud Services layer handles Authentication, Access Control, Metadata Management, Query Optimization, and Infrastructure Management. Query execution happens in the Compute layer, and physical files are in the Storage layer."
            },
            {
                id: "d2q4",
                type: "single",
                question: "A company has a Marketing department and a Finance department. Marketing is running heavy analytics that takes 100% of their Virtual Warehouse CPU. Finance runs a query against the SAME table using their own Virtual Warehouse. What is the impact on Finance's query?",
                options: ["Finance's query will wait in a queue until Marketing finishes.", "Finance's query will fail due to a table lock.", "Finance's query will run with no performance degradation.", "Finance's query will run slower due to shared disk I/O."],
                correct: 2,
                explanation: "Because Virtual Warehouses are completely independent compute clusters, they do not share CPU, memory, or local disk space. Finance can query the exact same data as Marketing simultaneously with absolutely no performance impact."
            },
            {
                id: "d2q5",
                type: "single",
                question: "Where does Snowflake physically store the data loaded into tables?",
                options: ["On the local SSDs of the Virtual Warehouses", "In an on-premises Hadoop cluster", "In cloud provider blob storage (e.g., Amazon S3, Azure Blob, GCS)", "Inside the Cloud Services layer memory"],
                correct: 2,
                explanation: "The Database Storage layer utilizes the scalable, secure blob storage provided by the underlying cloud platform (AWS S3, Azure Blob Storage, or Google Cloud Storage) to store all micro-partitions."
            },
            {
                id: "d2q6",
                type: "single",
                question: "Which of the following architectures best describes Snowflake?",
                options: ["Pure Shared-Disk", "Pure Shared-Nothing", "Hybrid of Shared-Disk and Shared-Nothing", "On-Premises Data Lake"],
                correct: 2,
                explanation: "Snowflake uses a hybrid architecture. It has a centralized repository for data accessible by all nodes (shared-disk characteristic) but processes queries using independent MPP compute clusters where nodes store portions of data locally during execution (shared-nothing characteristic)."
            },
            {
                id: "d2q7",
                type: "single",
                question: "Can customers directly access and manage the files in Snowflake's Database Storage layer using standard cloud tools (like AWS Console)?",
                options: ["Yes, customers have full root access to the files.", "Yes, but only for reading data, not writing.", "No, Snowflake manages all aspects of how data is stored and it is only accessible via SQL.", "No, but they can use an FTP client to download the files."],
                correct: 2,
                explanation: "Snowflake's storage is fully managed. The internal micro-partition files are hidden from the user. You can only interact with this data by running SQL queries or using Snowflake's designated drivers/APIs."
            },
            {
                id: "d2q8",
                type: "single",
                question: "If a user attempts to log into Snowflake with an incorrect password, which layer handles the rejection?",
                options: ["Compute Layer", "Cloud Services Layer", "Storage Layer", "Security Layer"],
                correct: 1,
                explanation: "Authentication is a core responsibility of the Cloud Services layer."
            }
        ]
    },
    {
        day: 3,
        title: "Storage Layer Deep Dive",
        subtitle: "Micro-partitions and Data Organization",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the concept and structure of micro-partitions",
            "Explain the benefits of columnar storage",
            "Understand how Snowflake handles indexing (or lack thereof)",
            "Identify security and compression features of the storage layer"
        ],
        sections: [
            {
                title: "What is a Micro-Partition?",
                content: `<p>In traditional databases, data is often stored in rows (row-oriented) and organized into large blocks or pages. Snowflake does something completely different: all data in Snowflake tables is automatically divided into <strong>micro-partitions</strong>.</p>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>Memorize these properties of micro-partitions for the exam:<br>
                    1. They are contiguous units of storage.<br>
                    2. Their size is between <strong>50 MB and 500 MB</strong> of uncompressed data (note: the exam may ask about uncompressed size).<br>
                    3. They are organized in a <strong>columnar</strong> format.<br>
                    4. They are <strong>immutable</strong> (they cannot be changed once written; updates create new micro-partitions).</p>
                </div>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="400" fill="#111827" />
                        
                        <!-- Table Representation -->
                        <text x="150" y="40" fill="#e8eaf6" font-size="18" font-weight="bold" text-anchor="middle">Logical Table</text>
                        <rect x="50" y="60" width="200" height="150" fill="none" stroke="#29b5f6" stroke-width="2" />
                        <line x1="50" y1="90" x2="250" y2="90" stroke="#29b5f6" stroke-width="1" />
                        <line x1="50" y1="120" x2="250" y2="120" stroke="#29b5f6" stroke-width="1" />
                        <line x1="50" y1="150" x2="250" y2="150" stroke="#29b5f6" stroke-width="1" />
                        <line x1="50" y1="180" x2="250" y2="180" stroke="#29b5f6" stroke-width="1" />
                        
                        <line x1="116" y1="60" x2="116" y2="210" stroke="#29b5f6" stroke-width="1" />
                        <line x1="182" y1="60" x2="182" y2="210" stroke="#29b5f6" stroke-width="1" />
                        
                        <text x="83" y="80" fill="#29b5f6" font-size="12" text-anchor="middle">ID</text>
                        <text x="149" y="80" fill="#29b5f6" font-size="12" text-anchor="middle">Name</text>
                        <text x="215" y="80" fill="#29b5f6" font-size="12" text-anchor="middle">Age</text>
                        
                        <text x="150" y="240" fill="#b0bec5" font-size="14" text-anchor="middle">Row-based view</text>
                        
                        <!-- Arrow -->
                        <path d="M 280 135 L 350 135" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrow)" />
                        <text x="315" y="125" fill="#b0bec5" font-size="12" text-anchor="middle">Auto-partitioned</text>
                        
                        <!-- Micro-partition -->
                        <text x="550" y="40" fill="#e8eaf6" font-size="18" font-weight="bold" text-anchor="middle">Micro-Partition (Columnar)</text>
                        <rect x="400" y="60" width="300" height="200" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2" />
                        
                        <rect x="420" y="90" width="260" height="30" fill="#1a3a5c" />
                        <text x="430" y="110" fill="#e8eaf6" font-size="12">ID Column Data (Compressed)</text>
                        
                        <rect x="420" y="140" width="260" height="30" fill="#1a3a5c" />
                        <text x="430" y="160" fill="#e8eaf6" font-size="12">Name Column Data (Compressed)</text>
                        
                        <rect x="420" y="190" width="260" height="30" fill="#1a3a5c" />
                        <text x="430" y="210" fill="#e8eaf6" font-size="12">Age Column Data (Compressed)</text>
                        
                        <text x="550" y="280" fill="#b0bec5" font-size="14" text-anchor="middle">50MB - 500MB Uncompressed Data</text>
                        
                    </svg>
                    <p class="diagram-caption">Figure 2: Data stored in Columnar Micro-partitions</p>
                </div>`
            },
            {
                title: "Columnar Storage vs Row Storage",
                content: `<p>Why does Snowflake use columnar storage? Imagine a table with 100 columns. You run a query: <code>SELECT Name, Age FROM Employees WHERE Age > 30;</code></p>
                <p>In a <strong>row-based database</strong>, the system has to read the entire row (all 100 columns) from disk just to get those two columns. This causes massive, unnecessary disk I/O.</p>
                <p>In a <strong>columnar database</strong> like Snowflake, data is grouped by column within the micro-partition. Snowflake only reads the 'Name' and 'Age' blocks from disk. The other 98 columns are completely ignored. This results in vastly superior performance for analytics queries.</p>
                <p>Furthermore, columnar data compresses much better. A column storing "Country" will have many repeating values ("USA", "USA", "Canada", "USA"), which compression algorithms handle extremely well.</p>`
            },
            {
                title: "Data Pruning (The \"No Index\" Rule)",
                content: `<p>In traditional databases, you spend hours creating, tuning, and rebuilding Indexes to make queries fast. Snowflake does <strong>not</strong> use traditional indexes.</p>
                <p>Instead, Snowflake relies on <strong>metadata and data pruning</strong>.</p>
                <p>When data is written to a micro-partition, the Cloud Services layer calculates metadata for every column in that micro-partition. It stores the MIN value and the MAX value. If a micro-partition contains order dates from January 1 to January 15, and your query asks for orders from February, Snowflake looks at the metadata, realizes this micro-partition doesn't contain February data, and entirely skips (prunes) it. It doesn't even read the file from storage.</p>`
            },
            {
                title: "Compression, Encryption, and Billing",
                content: `<ul>
                    <li><strong>Compression:</strong> All data is automatically compressed. You cannot turn this off, and you don't need to choose the compression algorithm—Snowflake handles it automatically.</li>
                    <li><strong>Encryption:</strong> All data is automatically encrypted at rest using AES-256 strong encryption. It is encrypted before it is written to the cloud storage bucket.</li>
                    <li><strong>Billing:</strong> You are billed for storage based on the <strong>compressed</strong> size of your data, calculated as a daily average over the month. Because Snowflake's compression is highly efficient, your storage costs are generally very low.</li>
                </ul>`
            }
        ],
        quiz: [
            {
                id: "d3q1",
                type: "single",
                question: "What is the typical size of a Snowflake micro-partition?",
                options: ["1 MB to 10 MB compressed", "50 MB to 500 MB uncompressed", "1 GB to 5 GB uncompressed", "Unlimited size"],
                correct: 1,
                explanation: "Snowflake micro-partitions are contiguous units of storage containing between 50 MB and 500 MB of uncompressed data."
            },
            {
                id: "d3q2",
                type: "single",
                question: "How does Snowflake handle indexing to improve query performance?",
                options: ["Users must create B-Tree indexes on frequently queried columns.", "Snowflake uses clustered indexes automatically on the primary key.", "Snowflake does not use traditional indexes; it relies on micro-partition metadata to prune data.", "Users must define partition keys when creating tables."],
                correct: 2,
                explanation: "Snowflake does not require or support traditional user-defined indexes. Instead, it uses metadata (min/max values stored in the Cloud Services layer) to prune (skip) unnecessary micro-partitions during query execution."
            },
            {
                id: "d3q3",
                type: "single",
                question: "Which of the following statements about micro-partitions is TRUE?",
                options: ["Micro-partitions store data in a row-based format.", "Micro-partitions are mutable and updated directly when an UPDATE statement is executed.", "Micro-partitions store data in a columnar format.", "Users can configure the size of micro-partitions."],
                correct: 2,
                explanation: "Micro-partitions store data in a columnar format. They are immutable (cannot be changed directly; updates create new micro-partitions), and users cannot configure their size."
            },
            {
                id: "d3q4",
                type: "multi",
                question: "Which of the following processes are handled automatically by Snowflake when writing data to the storage layer? (Select TWO)",
                options: ["Data encryption (AES-256)", "Creating manual backups", "Data compression", "User index generation"],
                correct: [0, 2],
                explanation: "Snowflake automatically compresses and encrypts (using AES-256) all data stored in the storage layer. No manual intervention is required."
            },
            {
                id: "d3q5",
                type: "single",
                question: "How is storage billed in Snowflake?",
                options: ["Based on the uncompressed size of data stored", "Based on the compressed size of data calculated as a daily average", "A flat fee per virtual warehouse", "Based on the number of micro-partitions created"],
                correct: 1,
                explanation: "Snowflake bills for storage based on the actual compressed size of the data stored, calculated as an average across the days of the month."
            },
            {
                id: "d3q6",
                type: "single",
                question: "Why is columnar storage beneficial for analytics queries?",
                options: ["It makes writing single rows faster than row-based storage.", "It allows queries to only read the specific columns requested, reducing disk I/O.", "It disables data compression to speed up CPU processing.", "It allows for easy implementation of foreign key constraints."],
                correct: 1,
                explanation: "Columnar storage allows the query engine to read only the specific columns needed for a query, drastically reducing disk I/O and speeding up analytical queries that typical only touch a few columns out of a wide table."
            }
        ]
    },
    {
        day: 4,
        title: "Compute Layer Deep Dive",
        subtitle: "Virtual Warehouses and Scaling",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand how Virtual Warehouses are sized",
            "Differentiate between Scaling Up and Scaling Out",
            "Understand auto-suspend and auto-resume behaviors",
            "Explain how Snowflake bills for compute resources"
        ],
        sections: [
            {
                title: "Virtual Warehouse Sizing (T-Shirts)",
                content: `<p>A Virtual Warehouse is a cluster of compute resources (CPU, memory, temporary storage) in Snowflake. They come in "T-shirt sizes" ranging from X-Small to 6X-Large.</p>
                <p>The most important rule to remember: <strong>Each step up in size doubles the compute power and doubles the credit consumption per hour.</strong></p>
                <table>
                    <thead>
                        <tr><th>Size</th><th>Credits per Hour</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>X-Small (XS)</td><td>1</td></tr>
                        <tr><td>Small (S)</td><td>2</td></tr>
                        <tr><td>Medium (M)</td><td>4</td></tr>
                        <tr><td>Large (L)</td><td>8</td></tr>
                        <tr><td>X-Large (XL)</td><td>16</td></tr>
                        <tr><td>2X-Large (2XL)</td><td>32</td></tr>
                    </tbody>
                </table>
                <div class="callout tip">
                    <div class="callout-title">💡 Key Takeaway</div>
                    <p>Bigger is not always more expensive for a specific task! If a Medium warehouse (4 credits/hr) takes 1 hour to run a query, it costs 4 credits. If a Large warehouse (8 credits/hr) is twice as fast and takes 30 minutes, it costs exactly the same: 4 credits. The Large warehouse just gives you the answer twice as fast.</p>
                </div>`
            },
            {
                title: "Scaling UP vs. Scaling OUT",
                content: `<p>This is a critical concept for the exam.</p>
                <h4>Scaling Up (Resizing)</h4>
                <p>Scaling up means changing the size of a single warehouse (e.g., changing from Medium to Large). You do this to improve performance for <strong>complex, heavy queries</strong>. If a query is processing billions of rows and is too slow, you scale UP to give it more CPU and memory.</p>
                <h4>Scaling Out (Multi-Cluster Warehouses)</h4>
                <p>Scaling out means adding more clusters of the same size. Snowflake's Multi-Cluster Warehouses allow you to define a minimum and maximum number of clusters. As user concurrency increases (e.g., hundreds of users logging in at 9 AM to run reports), Snowflake automatically spins up additional clusters to handle the load. When users log off, it spins them down.</p>
                <p>You scale OUT to handle <strong>concurrency</strong> (many users running queries at the same time).</p>
                
                <div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="400" fill="#111827" />
                        
                        <!-- Scale UP -->
                        <text x="200" y="50" fill="#e8eaf6" font-size="18" font-weight="bold" text-anchor="middle">Scaling UP (Resizing)</text>
                        <text x="200" y="70" fill="#b0bec5" font-size="14" text-anchor="middle">For complex queries</text>
                        
                        <rect x="150" y="100" width="100" height="60" rx="4" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                        <text x="200" y="135" fill="#e8eaf6" font-size="14" font-weight="bold" text-anchor="middle">Small</text>
                        
                        <path d="M 200 170 L 200 210" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrow)" />
                        
                        <rect x="120" y="220" width="160" height="100" rx="4" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                        <text x="200" y="275" fill="#e8eaf6" font-size="16" font-weight="bold" text-anchor="middle">Large</text>
                        
                        <!-- Scale OUT -->
                        <text x="600" y="50" fill="#e8eaf6" font-size="18" font-weight="bold" text-anchor="middle">Scaling OUT (Multi-Cluster)</text>
                        <text x="600" y="70" fill="#b0bec5" font-size="14" text-anchor="middle">For high concurrency (many users)</text>
                        
                        <rect x="550" y="100" width="100" height="60" rx="4" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                        <text x="600" y="135" fill="#e8eaf6" font-size="14" font-weight="bold" text-anchor="middle">Small (1 cluster)</text>
                        
                        <path d="M 600 170 L 600 210" stroke="#6b7b8d" stroke-width="3" marker-end="url(#arrow)" />
                        
                        <rect x="420" y="220" width="100" height="60" rx="4" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                        <text x="470" y="255" fill="#e8eaf6" font-size="14" font-weight="bold" text-anchor="middle">Small</text>
                        
                        <rect x="550" y="220" width="100" height="60" rx="4" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                        <text x="600" y="255" fill="#e8eaf6" font-size="14" font-weight="bold" text-anchor="middle">Small</text>
                        
                        <rect x="680" y="220" width="100" height="60" rx="4" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                        <text x="730" y="255" fill="#e8eaf6" font-size="14" font-weight="bold" text-anchor="middle">Small</text>
                        
                        <text x="600" y="310" fill="#b0bec5" font-size="14" text-anchor="middle">Automatically adds clusters as users queue up</text>
                    </svg>
                    <p class="diagram-caption">Figure 3: Scaling Up vs Scaling Out</p>
                </div>`
            },
            {
                title: "Auto-Suspend and Auto-Resume",
                content: `<p>To save money, Snowflake warehouses don't need to run 24/7.</p>
                <ul>
                    <li><strong>Auto-Suspend:</strong> Automatically shuts down the warehouse after a specified period of inactivity (e.g., 5 minutes). You stop paying for compute immediately.</li>
                    <li><strong>Auto-Resume:</strong> Automatically wakes the warehouse up the instant a new query is submitted. It typically takes less than a second to resume.</li>
                </ul>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>When a warehouse starts or resumes, you are billed for a minimum of <strong>1 minute</strong>. After that first minute, billing is per-second. This prevents customers from spinning a warehouse up and down every 5 seconds to cheat the billing system.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d4q1",
                type: "single",
                question: "How many credits per hour does a Large (L) virtual warehouse consume?",
                options: ["2", "4", "8", "16"],
                correct: 2,
                explanation: "XS=1, S=2, M=4, L=8. Each size increase doubles the credit consumption."
            },
            {
                id: "d4q2",
                type: "single",
                question: "A company is experiencing query queuing during Monday morning rush hour when 500 analysts log in simultaneously. What is the best way to resolve this?",
                options: ["Scale UP the warehouse to a larger size (e.g., from Small to Large)", "Scale OUT using a Multi-Cluster Warehouse to handle concurrency", "Turn off auto-suspend", "Increase the timeout parameter for the queries"],
                correct: 1,
                explanation: "When dealing with concurrency issues (too many users/queries at once causing queuing), you should scale OUT by using a Multi-Cluster warehouse. Scaling UP is for complex, slow queries, not concurrency."
            },
            {
                id: "d4q3",
                type: "single",
                question: "What is the minimum billing charge when a Virtual Warehouse is started or resumed?",
                options: ["1 second", "1 minute", "1 hour", "There is no minimum, it is strictly per-second"],
                correct: 1,
                explanation: "When a warehouse starts or resumes, there is a minimum charge of 1 minute. After the first minute, billing is calculated on a per-second basis."
            },
            {
                id: "d4q4",
                type: "single",
                question: "What happens when a warehouse is Auto-Suspended?",
                options: ["All tables in the storage layer are compressed.", "The warehouse stops consuming compute credits.", "The cache is permanently saved to disk.", "All running queries are immediately aborted without warning."],
                correct: 1,
                explanation: "Auto-suspend stops the warehouse after a period of inactivity, which immediately halts the consumption of compute credits. It does not abort running queries (it waits for them to finish before starting the inactivity timer)."
            },
            {
                id: "d4q5",
                type: "single",
                question: "A user submits a query to a suspended warehouse that has Auto-Resume enabled. What happens?",
                options: ["The query fails and the user must manually start the warehouse.", "The query waits in a queue until an administrator starts the warehouse.", "The warehouse automatically provisions and starts executing the query, usually within seconds.", "The warehouse resumes, but billing is calculated at double the rate for the first hour."],
                correct: 2,
                explanation: "Auto-Resume automatically and seamlessly starts the warehouse as soon as a query is submitted, meaning users don't have to manually manage infrastructure."
            },
            {
                id: "d4q6",
                type: "multi",
                question: "Which of the following scenarios would justify scaling UP a virtual warehouse? (Select TWO)",
                options: ["Hundreds of BI dashboards are querying small datasets simultaneously.", "A complex machine learning data preparation query takes 4 hours to run on a Small warehouse.", "A massive bulk data load from an external stage is running too slowly.", "You want to reduce your overall monthly Snowflake compute costs."],
                correct: [1, 2],
                explanation: "Scaling UP provides more raw compute power (CPU/Memory). It is best used for complex, heavy analytical queries or massive data loads that need more horsepower to finish faster. High concurrency (dashboards) requires scaling OUT."
            },
            {
                id: "d4q7",
                type: "single",
                question: "True or False: Resizing a warehouse from Small to Large requires shutting down the warehouse and aborting running queries.",
                options: ["True", "False"],
                correct: 1,
                explanation: "False. You can resize a warehouse on the fly while it is running. Running queries will complete on the original compute resources, and new queries will be routed to the newly provisioned larger resources."
            }
        ]
    },
    {
        day: 5,
        title: "Cloud Services Layer",
        subtitle: "The Brain of Snowflake",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Detail the specific responsibilities of the Cloud Services layer",
            "Understand how Metadata is used to optimize performance",
            "Explain the 10% credit rule for Cloud Services",
            "Identify how security is handled in this layer"
        ],
        sections: [
            {
                title: "Responsibilities of Cloud Services",
                content: `<p>The Cloud Services layer is a collection of services that coordinate activities across Snowflake. It is heavily tested on the exam. Think of it as the control plane.</p>
                
                <div class="diagram-container">
                    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
                        <rect width="800" height="500" fill="#111827" />
                        
                        <!-- Center Node -->
                        <circle cx="400" cy="250" r="80" fill="#2a1a4e" stroke="#7c4dff" stroke-width="3" />
                        <text x="400" y="245" fill="#e8eaf6" font-size="16" font-weight="bold" text-anchor="middle">Cloud</text>
                        <text x="400" y="265" fill="#e8eaf6" font-size="16" font-weight="bold" text-anchor="middle">Services</text>
                        
                        <!-- Connecting Lines -->
                        <line x1="400" y1="170" x2="400" y2="90" stroke="#7c4dff" stroke-width="2" />
                        <line x1="460" y1="190" x2="560" y2="130" stroke="#7c4dff" stroke-width="2" />
                        <line x1="480" y1="250" x2="620" y2="250" stroke="#7c4dff" stroke-width="2" />
                        <line x1="460" y1="310" x2="560" y2="370" stroke="#7c4dff" stroke-width="2" />
                        <line x1="400" y1="330" x2="400" y2="410" stroke="#7c4dff" stroke-width="2" />
                        <line x1="340" y1="310" x2="240" y2="370" stroke="#7c4dff" stroke-width="2" />
                        <line x1="320" y1="250" x2="180" y2="250" stroke="#7c4dff" stroke-width="2" />
                        <line x1="340" y1="190" x2="240" y2="130" stroke="#7c4dff" stroke-width="2" />
                        
                        <!-- Responsibility Nodes -->
                        <rect x="300" y="40" width="200" height="50" rx="8" fill="#1a3a5c" />
                        <text x="400" y="70" fill="#e8eaf6" font-size="14" text-anchor="middle">Authentication & Login</text>
                        
                        <rect x="560" y="100" width="180" height="50" rx="8" fill="#1a3a5c" />
                        <text x="650" y="130" fill="#e8eaf6" font-size="14" text-anchor="middle">Access Control (RBAC)</text>
                        
                        <rect x="620" y="225" width="160" height="50" rx="8" fill="#1a3a5c" />
                        <text x="700" y="255" fill="#e8eaf6" font-size="14" text-anchor="middle">Query Optimization</text>
                        
                        <rect x="560" y="350" width="180" height="50" rx="8" fill="#1a3a5c" />
                        <text x="650" y="380" fill="#e8eaf6" font-size="14" text-anchor="middle">Infrastructure Mgmt</text>
                        
                        <rect x="300" y="410" width="200" height="50" rx="8" fill="#1a3a5c" />
                        <text x="400" y="440" fill="#e8eaf6" font-size="14" text-anchor="middle">Metadata Management</text>
                        
                        <rect x="60" y="350" width="180" height="50" rx="8" fill="#1a3a5c" />
                        <text x="150" y="380" fill="#e8eaf6" font-size="14" text-anchor="middle">Transaction Mgmt</text>
                        
                        <rect x="20" y="225" width="160" height="50" rx="8" fill="#1a3a5c" />
                        <text x="100" y="255" fill="#e8eaf6" font-size="14" text-anchor="middle">Result Set Cache</text>
                        
                        <rect x="60" y="100" width="180" height="50" rx="8" fill="#1a3a5c" />
                        <text x="150" y="130" fill="#e8eaf6" font-size="14" text-anchor="middle">Security & Encryption</text>
                    </svg>
                    <p class="diagram-caption">Figure 4: Core Responsibilities of the Cloud Services Layer</p>
                </div>`
            },
            {
                title: "Deep Dive into Metadata",
                content: `<p>We touched on this during the Storage layer section, but it is <em>managed</em> by the Cloud Services layer. As data is loaded into Snowflake, Cloud Services extracts metadata before the data is written to the micro-partitions.</p>
                <p>This metadata includes:</p>
                <ul>
                    <li>Number of rows</li>
                    <li>File sizes</li>
                    <li>Min/Max values for every column (crucial for data pruning)</li>
                    <li>Number of distinct values (NULLs, etc.)</li>
                </ul>
                <p>Because Cloud Services holds this metadata, it can answer some queries instantly without turning on a Virtual Warehouse! For example, <code>SELECT COUNT(*) FROM table;</code> or <code>SELECT MAX(date) FROM table;</code> can be answered purely from metadata.</p>`
            },
            {
                title: "Billing for Cloud Services (The 10% Rule)",
                content: `<p>Does the Cloud Services layer cost money? Yes and no.</p>
                <p>Unlike Virtual Warehouses where you explicitly pay for uptime, Cloud Services usage is mostly included in your compute costs. However, Snowflake has a rule to prevent abuse (like running millions of tiny metadata queries without ever spinning up a warehouse).</p>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p><strong>The 10% Rule:</strong> You are only billed for Cloud Services compute if your daily Cloud Services usage exceeds <strong>10%</strong> of your daily Virtual Warehouse compute usage. Even then, you are only billed for the overage.</p>
                </div>
                <p>Example: If your Virtual Warehouses use 100 credits in a day, you get 10 credits of Cloud Services for free. If you use 12 Cloud Services credits, you will be billed for 2 credits (12 - 10). For the vast majority of customers, Cloud Services costs nothing extra.</p>`
            }
        ],
        quiz: [
            {
                id: "d5q1",
                type: "multi",
                question: "Which of the following are responsibilities of the Cloud Services layer? (Select THREE)",
                options: ["Executing query aggregations (GROUP BY)", "Metadata management", "Authentication", "Storing micro-partitions physically", "Query optimization"],
                correct: [1, 2, 4],
                explanation: "Cloud Services handles metadata, authentication, and query optimization. Executing aggregations happens in the Compute layer. Storing micro-partitions happens in the Storage layer."
            },
            {
                id: "d5q2",
                type: "single",
                question: "A user runs the query: SELECT COUNT(*) FROM huge_table; The warehouse is currently suspended, yet the query returns instantly without starting the warehouse. How is this possible?",
                options: ["The query used the Result Set Cache.", "The Cloud Services layer answered the query using stored metadata.", "The Compute layer can process simple queries while suspended.", "Snowflake automatically creates secondary indexes for COUNT queries."],
                correct: 1,
                explanation: "The Cloud Services layer maintains metadata about all micro-partitions, including row counts. It can answer a simple COUNT(*) query using only metadata, without needing to provision a compute warehouse."
            },
            {
                id: "d5q3",
                type: "single",
                question: "How does Snowflake charge for usage of the Cloud Services layer?",
                options: ["It is billed at a flat rate of 10 credits per day.", "It is always free, regardless of usage.", "It is only billed if daily Cloud Services credit usage exceeds 10% of daily Virtual Warehouse compute usage.", "It is billed based on the amount of metadata stored in gigabytes."],
                correct: 2,
                explanation: "Snowflake provides Cloud Services credits for free up to 10% of your daily compute usage. You are only billed for usage that exceeds that 10% threshold on a given day."
            },
            {
                id: "d5q4",
                type: "single",
                question: "Which layer is responsible for enforcing Role-Based Access Control (RBAC)?",
                options: ["Storage Layer", "Compute Layer", "Cloud Services Layer", "Network Layer"],
                correct: 2,
                explanation: "Security, authentication, and access control (verifying if a role has privileges to perform an action) are managed by the Cloud Services layer."
            },
            {
                id: "d5q5",
                type: "single",
                question: "When a user submits a SQL statement, which layer parses the SQL, checks syntax, and generates the execution plan?",
                options: ["Cloud Services Layer", "Compute Layer", "Storage Layer", "Client Driver Layer"],
                correct: 0,
                explanation: "The Cloud Services layer acts as the brain. It parses the SQL query, validates syntax, checks semantics (like if the table exists), and generates the optimized execution plan before sending it to the compute layer."
            },
            {
                id: "d5q6",
                type: "single",
                question: "If your daily virtual warehouse compute usage is 500 credits, and your daily cloud services usage is 40 credits, how many cloud services credits will you be billed for?",
                options: ["0", "40", "50", "440"],
                correct: 0,
                explanation: "Your free allowance is 10% of 500 = 50 credits. Since your usage (40) is less than the allowance (50), you are billed 0 extra credits for Cloud Services."
            }
        ]
    },
    {
        day: 6,
        title: "Snowflake Editions & Cloud Platforms",
        subtitle: "Choosing the Right Snowflake",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#29b5f6"
        },
        estimatedTime: "90 min",
        objectives: [
            "Differentiate between the four Snowflake editions",
            "Identify which features belong to which edition",
            "Understand Snowflake's cloud agnostic nature",
            "Explain how regions work in Snowflake"
        ],
        sections: [
            {
                title: "The Four Snowflake Editions",
                content: `<p>Snowflake is offered in four main editions. Each higher edition includes all the features of the lower editions, plus additional enterprise features.</p>
                
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>Questions mapping features to editions are guaranteed on the exam. You MUST know exactly which edition introduces Multi-cluster warehouses (Enterprise), extended Time Travel (Enterprise), and Tri-Secret Secure (Business Critical).</p>
                </div>

                <h4>1. Standard Edition</h4>
                <p>The introductory level. Best for single applications or small teams.</p>
                <ul>
                    <li>Always-on encryption at rest and in transit</li>
                    <li>Time Travel (up to <strong>1 day</strong> only)</li>
                    <li>Secure Data Sharing</li>
                </ul>

                <h4>2. Enterprise Edition</h4>
                <p>The standard for most large organizations.</p>
                <ul>
                    <li><em>All Standard features, plus:</em></li>
                    <li><strong>Multi-Cluster Warehouses</strong> (for auto-scaling concurrency)</li>
                    <li>Time Travel (up to <strong>90 days</strong>)</li>
                    <li>Materialized Views</li>
                    <li>Column-level Security / Dynamic Data Masking</li>
                    <li>Search Optimization Service</li>
                </ul>

                <h4>3. Business Critical Edition</h4>
                <p>For organizations with extreme security and compliance requirements (Healthcare, Finance).</p>
                <ul>
                    <li><em>All Enterprise features, plus:</em></li>
                    <li>HIPAA and PCI compliance</li>
                    <li><strong>Tri-Secret Secure</strong> (Customer Managed Keys)</li>
                    <li>AWS PrivateLink / Azure Private Link (private connectivity)</li>
                    <li>Database Failover and Failback (Cross-region disaster recovery)</li>
                </ul>

                <h4>4. Virtual Private Snowflake (VPS)</h4>
                <p>For the strictest security needs.</p>
                <ul>
                    <li><em>All Business Critical features, plus:</em></li>
                    <li>A completely dedicated, isolated environment (metadata layer and compute are not shared with any other accounts)</li>
                    <li>Customer metadata is kept entirely separate</li>
                </ul>`
            },
            {
                title: "Cloud Agnostic: AWS, Azure, GCP",
                content: `<p>Snowflake does not own its own data centers. It runs entirely on the three major public clouds: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP).</p>
                <p>When you create a Snowflake account, you choose:</p>
                <ol>
                    <li>The Cloud Provider (e.g., AWS)</li>
                    <li>The Region (e.g., US-East-1)</li>
                </ol>
                <p>To end users, the experience is identical regardless of the underlying cloud provider. A query written in Snowflake on AWS works exactly the same as in Snowflake on GCP.</p>
                <p>Snowflake allows for cross-cloud and cross-region features, such as sharing data from an account in AWS US-East to an account in Azure West-Europe (via replication).</p>`
            }
        ],
        quiz: [
            {
                id: "d6q1",
                type: "single",
                question: "Which Snowflake edition is the MINIMUM required to use Multi-Cluster Warehouses?",
                options: ["Standard", "Enterprise", "Business Critical", "Virtual Private Snowflake (VPS)"],
                correct: 1,
                explanation: "Multi-cluster warehouses (which automatically scale out for concurrency) are introduced in the Enterprise Edition."
            },
            {
                id: "d6q2",
                type: "single",
                question: "A healthcare company needs to ensure HIPAA compliance and wants to manage their own encryption keys (Tri-Secret Secure). Which edition is the minimum required?",
                options: ["Standard", "Enterprise", "Business Critical", "Virtual Private Snowflake (VPS)"],
                correct: 2,
                explanation: "Business Critical is the minimum edition required for HIPAA compliance, PCI compliance, and Tri-Secret Secure (customer-managed keys)."
            },
            {
                id: "d6q3",
                type: "single",
                question: "What is the maximum Time Travel retention period available in the Standard Edition?",
                options: ["0 days", "1 day", "30 days", "90 days"],
                correct: 1,
                explanation: "Standard Edition is limited to a maximum of 1 day of Time Travel. Enterprise and above support up to 90 days."
            },
            {
                id: "d6q4",
                type: "single",
                question: "Which feature completely isolates a Snowflake account's environment, ensuring it does not share metadata or compute resources with any other Snowflake customers?",
                options: ["Multi-cluster warehouses", "Tri-Secret Secure", "Virtual Private Snowflake (VPS)", "AWS PrivateLink"],
                correct: 2,
                explanation: "Virtual Private Snowflake (VPS) provides a completely dedicated environment. All other editions operate in a multi-tenant environment (though logically isolated securely)."
            },
            {
                id: "d6q5",
                type: "single",
                question: "Which of the following is a TRUE statement regarding Snowflake's underlying cloud infrastructure?",
                options: ["Snowflake runs on its own proprietary hardware data centers.", "Snowflake can only run on Amazon Web Services (AWS).", "Snowflake can run on AWS, Microsoft Azure, or Google Cloud Platform (GCP).", "Customers must install Snowflake onto their own private cloud servers."],
                correct: 2,
                explanation: "Snowflake is cloud-agnostic and fully managed. It runs on the infrastructure of AWS, Azure, and GCP, and customers choose their provider and region when creating an account."
            },
            {
                id: "d6q6",
                type: "single",
                question: "A company wants to use Materialized Views and Column-level Security. Which edition is the MINIMUM required?",
                options: ["Standard", "Enterprise", "Business Critical", "VPS"],
                correct: 1,
                explanation: "Materialized Views, Column-level Security, and Row-level Security are features introduced in the Enterprise Edition."
            },
            {
                id: "d6q7",
                type: "single",
                question: "What must be selected when provisioning a new Snowflake account? (Choose the best answer)",
                options: ["Only the Snowflake Edition", "The Snowflake Edition and the Cloud Provider", "The Snowflake Edition, Cloud Provider, and specific Geographic Region", "The number of compute nodes required"],
                correct: 2,
                explanation: "When creating an account, you must specify the Edition (e.g., Enterprise), the Cloud Provider (e.g., AWS), and the specific Region (e.g., us-east-1) where the account will reside."
            }
        ]
    },
    {
        day: 7,
        title: "Week 1 Review",
        subtitle: "Architecture & Core Concepts Mastery",
        domain: {
            id: 1,
            name: "Architecture & Features",
            color: "#66bb6a"
        },
        estimatedTime: "60 min",
        objectives: [
            "Review the three-layer architecture",
            "Consolidate knowledge on Storage, Compute, and Cloud Services",
            "Review Edition differences",
            "Prepare for domain 1 exam questions"
        ],
        sections: [
            {
                title: "Week 1 Core Concepts Summary",
                content: `<p>Congratulations on completing Week 1! You've covered the foundation of Snowflake. About 30% of the exam questions will stem from the concepts you learned this week.</p>
                
                <h4>1. The Platform</h4>
                <ul>
                    <li>Snowflake is SaaS (Software as a Service) on AWS, Azure, or GCP.</li>
                    <li>No hardware to buy, no software to patch.</li>
                </ul>

                <h4>2. The Three-Layer Architecture</h4>
                <ul>
                    <li><strong>Storage:</strong> Centralized, Columnar, Micro-partitions (50-500MB uncompressed). Immutable. Encrypted (AES-256). Compressed.</li>
                    <li><strong>Compute (Query Processing):</strong> Virtual Warehouses. Independent (no resource contention). T-shirt sizes (XS to 6XL). Double in size = double in cost. Scale UP for complex queries, Scale OUT (multi-cluster) for concurrency.</li>
                    <li><strong>Cloud Services:</strong> The Brain. Parses SQL, optimizes queries, handles Auth/RBAC, manages metadata. Billed only if usage exceeds 10% of compute credits.</li>
                </ul>

                <h4>3. Editions (Crucial to memorize)</h4>
                <ul>
                    <li><strong>Standard:</strong> 1-day Time Travel.</li>
                    <li><strong>Enterprise:</strong> Multi-cluster, 90-day Time Travel, Materialized Views.</li>
                    <li><strong>Business Critical:</strong> HIPAA/PCI, Tri-Secret Secure, PrivateLink, Failover.</li>
                    <li><strong>VPS:</strong> Dedicated environment.</li>
                </ul>
                
                <div class="callout warning">
                    <div class="callout-title">⚠️ Common Trap</div>
                    <p>A very common trap on the exam is describing a scenario where queries are queuing because too many users are logging in, and asking how to fix it. The wrong answer is "Resize to a larger warehouse (Scale Up)". The CORRECT answer is "Use a multi-cluster warehouse (Scale Out)".</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d7q1",
                type: "single",
                question: "Which feature of Snowflake allows different business units to query the same data at the same time without impacting each other's performance?",
                options: ["Columnar Storage", "Multi-cluster Warehouses", "Separation of Storage and Compute", "Data Pruning"],
                correct: 2,
                explanation: "The complete separation of storage and compute means multiple independent compute clusters (Virtual Warehouses) can access the same centralized storage simultaneously without any resource contention."
            },
            {
                id: "d7q2",
                type: "multi",
                question: "Which of the following are true regarding Snowflake micro-partitions? (Select TWO)",
                options: ["They are between 50MB and 500MB of compressed data.", "They store data in a columnar format.", "They are immutable.", "Users can define the partition keys."],
                correct: [1, 2],
                explanation: "Micro-partitions are stored in a columnar format and are immutable (cannot be changed once written). The size is 50MB-500MB of UNCOMPRESSED data, not compressed."
            },
            {
                id: "d7q3",
                type: "single",
                question: "A query requires a large amount of temporary memory to perform a massive JOIN operation. The current Small warehouse is spilling data to disk, causing the query to run for 2 hours. What is the best solution?",
                options: ["Scale OUT by adding more clusters to the warehouse.", "Scale UP by resizing the warehouse to a Large or X-Large.", "Decrease the size of the micro-partitions.", "Create a B-Tree index on the join columns."],
                correct: 1,
                explanation: "When a single query needs more horsepower (CPU/Memory) to process heavy loads or avoid spilling to disk, you should Scale UP (resize to a larger warehouse)."
            },
            {
                id: "d7q4",
                type: "single",
                question: "How does Snowflake handle query optimization?",
                options: ["Database administrators must run the OPTIMIZE command weekly.", "Users must specify optimizer hints in their SQL.", "The Cloud Services layer automatically optimizes queries using metadata.", "The Compute layer optimizes queries based on warehouse size."],
                correct: 2,
                explanation: "The Cloud Services layer acts as the brain. It uses the metadata it manages to automatically optimize queries without requiring DBA intervention or hints."
            },
            {
                id: "d7q5",
                type: "single",
                question: "Which edition of Snowflake is required to use Tri-Secret Secure (Customer Managed Keys)?",
                options: ["Standard", "Enterprise", "Business Critical", "VPS"],
                correct: 2,
                explanation: "Tri-Secret Secure is introduced in the Business Critical edition."
            },
            {
                id: "d7q6",
                type: "single",
                question: "What is the minimum billing increment when a warehouse resumes from a suspended state?",
                options: ["1 second", "1 minute", "10 minutes", "1 hour"],
                correct: 1,
                explanation: "Warehouses are billed for a minimum of 1 minute when they start or resume. After that minute, billing is per-second."
            },
            {
                id: "d7q7",
                type: "single",
                question: "Which of the following statements about the Cloud Services layer billing is true?",
                options: ["It is always free.", "It costs a flat 10 credits per day.", "It is only billed if usage exceeds 10% of daily compute credits.", "It is billed per metadata query executed."],
                correct: 2,
                explanation: "You are only billed for Cloud Services if your daily usage of Cloud Services exceeds 10% of your daily compute usage (the 10% rule)."
            },
            {
                id: "d7q8",
                type: "multi",
                question: "Which of the following cloud providers can host a Snowflake account? (Select THREE)",
                options: ["Amazon Web Services (AWS)", "IBM Cloud", "Microsoft Azure", "Google Cloud Platform (GCP)", "Oracle Cloud Infrastructure (OCI)"],
                correct: [0, 2, 3],
                explanation: "Snowflake is supported on AWS, Azure, and GCP."
            },
            {
                id: "d7q9",
                type: "single",
                question: "If you have a Medium (M) warehouse that consumes 4 credits per hour, how many credits will a 2X-Large (2XL) warehouse consume per hour?",
                options: ["8", "16", "32", "64"],
                correct: 2,
                explanation: "M = 4, L = 8, XL = 16, 2XL = 32. Each size doubles the credits."
            },
            {
                id: "d7q10",
                type: "single",
                question: "Which layer holds the Result Set Cache (saving the results of recent queries)?",
                options: ["Client Layer", "Cloud Services Layer", "Compute Layer", "Storage Layer"],
                correct: 1,
                explanation: "The Result Set Cache is maintained in the Cloud Services layer. (Note: The Compute layer holds the local data/disk cache)."
            },
            {
                id: "d7q11",
                type: "single",
                question: "What is the primary benefit of columnar storage in Snowflake?",
                options: ["It makes row-level inserts faster.", "It allows queries to only read the necessary columns, minimizing disk I/O.", "It prevents the need for data encryption.", "It allows the storage layer to parse queries."],
                correct: 1,
                explanation: "Columnar storage vastly improves analytical query performance because the engine only needs to read the specific columns requested in the SELECT statement, skipping unnecessary data and reducing disk I/O."
            },
            {
                id: "d7q12",
                type: "single",
                question: "A company wants to store data for 90 days using Time Travel. Which edition do they need at a minimum?",
                options: ["Standard", "Enterprise", "Business Critical", "VPS"],
                correct: 1,
                explanation: "Standard edition only supports 1 day of Time Travel. Enterprise is required for up to 90 days."
            },
            {
                id: "d7q13",
                type: "single",
                question: "Which layer is responsible for authenticating a user's login credentials?",
                options: ["Compute Layer", "Storage Layer", "Cloud Services Layer", "External OAuth Server"],
                correct: 2,
                explanation: "Authentication and Access Control are responsibilities of the Cloud Services layer."
            },
            {
                id: "d7q14",
                type: "single",
                question: "Can customers directly manage the files stored in the Snowflake Storage Layer (e.g., using AWS S3 console)?",
                options: ["Yes, full access is granted.", "Yes, but read-only access.", "No, the storage is fully managed by Snowflake and accessed only via SQL.", "No, unless they use the Business Critical edition."],
                correct: 2,
                explanation: "Customers do not have direct access to the underlying storage buckets or micro-partition files. Snowflake fully manages this layer."
            },
            {
                id: "d7q15",
                type: "single",
                question: "What determines if a micro-partition is read or skipped during query execution?",
                options: ["B-Tree Indexes", "The Virtual Warehouse size", "Metadata min/max values stored in Cloud Services", "The amount of available cache"],
                correct: 2,
                explanation: "Snowflake uses metadata (specifically min and max values for columns) to perform 'data pruning'—skipping micro-partitions that do not contain data relevant to the query."
            }
        ]
    }
];
