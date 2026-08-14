window.SNOWPRO = window.SNOWPRO || {};
window.SNOWPRO.week5 = [
    {
        day: 29,
        title: "Micro-Partitions & Clustering",
        subtitle: "Optimizing Query Performance",
        domain: {
            id: 4,
            name: "Performance & Transformation",
            color: "#ffa726"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand micro-partition architecture",
            "Explain partition pruning",
            "Configure and use Clustering Keys",
            "Identify when to use the Search Optimization Service"
        ],
        sections: [
            {
                title: "Micro-Partitions Revisited",
                content: `
                    <p>In Snowflake, all data in tables is automatically divided into <strong>micro-partitions</strong>. Think of them as small, contiguous blocks of storage that hold your data.</p>
                    <ul>
                        <li><strong>Size:</strong> 50 to 500 MB of uncompressed data per micro-partition.</li>
                        <li><strong>Immutability:</strong> Once written, they cannot be modified. If you UPDATE a row, Snowflake writes a new micro-partition and marks the old one as deleted (useful for Time Travel!).</li>
                        <li><strong>Columnar Storage:</strong> Within a micro-partition, data is grouped by column, allowing for excellent compression and efficient reading.</li>
                        <li><strong>Metadata:</strong> Snowflake stores metadata for each column in a micro-partition, including min/max values, distinct count, and null count.</li>
                    </ul>
                    <div class="callout tip">
                        <div class="callout-title">💡 Key Takeaway</div>
                        <p>Snowflake manages micro-partitions entirely automatically in the background. There is no DBA intervention required to create or maintain them!</p>
                    </div>
                `
            },
            {
                title: "Partition Pruning",
                content: `
                    <p>When you run a query with a filter (e.g., <code>WHERE date = '2023-10-01'</code>), Snowflake uses the min/max metadata to skip micro-partitions that cannot possibly contain matching data. This process is called <strong>partition pruning</strong>.</p>
                    <p>You can check the effectiveness of partition pruning in the Query Profile. Look at the "Partitions scanned" versus "Partitions total" metric. A well-optimized query on a well-organized table will scan only a small fraction of the total partitions.</p>
                    <div class="callout exam-tip">
                        <div class="callout-title">📝 Exam Tip</div>
                        <p>A query scanning 100 partitions out of 100 total is full table scan. If it scans 2 out of 100, partition pruning was highly effective.</p>
                    </div>
                `
            },
            {
                title: "Clustering Keys",
                content: `
                    <p>As tables grow into the multi-terabyte range, data can become poorly clustered, meaning data for a specific filter condition is scattered across many micro-partitions. This degrades partition pruning.</p>
                    <p>You can define a <strong>Clustering Key</strong> using <code>ALTER TABLE ... CLUSTER BY (col1, col2)</code>.</p>
                    <ul>
                        <li><strong>Automatic Clustering:</strong> Once defined, Snowflake's Automatic Clustering service (Enterprise Edition and higher) continuously reorganizes the data in the background to maintain good clustering.</li>
                        <li><strong>SYSTEM$CLUSTERING_INFORMATION:</strong> A system function to evaluate the clustering quality of a table.</li>
                    </ul>
                    <h4>When to Use Clustering Keys</h4>
                    <ul>
                        <li>Multi-terabyte tables.</li>
                        <li>Frequent queries using range or equality filters on specific columns.</li>
                    </ul>
                    <h4>When NOT to Use Clustering Keys</h4>
                    <ul>
                        <li>Small tables (less than 1 TB).</li>
                        <li>Tables with completely random access patterns.</li>
                    </ul>
                    
                    <div class="diagram-container">
                        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="800" height="400" fill="#111827" />
                            <text x="400" y="40" fill="#e8eaf6" font-size="24" text-anchor="middle" font-weight="bold">Partition Pruning: Poor vs Good Clustering</text>
                            
                            <!-- Poor Clustering -->
                            <text x="200" y="80" fill="#ffa726" font-size="18" text-anchor="middle">Poor Clustering (Filter: Date = Jan)</text>
                            <g stroke="#ffa726" fill="none" stroke-width="2">
                                <rect x="50" y="100" width="80" height="60" rx="4" fill="#3a2a0a" />
                                <text x="90" y="135" fill="#e8eaf6" font-size="14" text-anchor="middle" stroke="none">Jan, Feb</text>
                                
                                <rect x="150" y="100" width="80" height="60" rx="4" fill="#3a2a0a" />
                                <text x="190" y="135" fill="#e8eaf6" font-size="14" text-anchor="middle" stroke="none">Jan, Mar</text>
                                
                                <rect x="250" y="100" width="80" height="60" rx="4" fill="#3a2a0a" />
                                <text x="290" y="135" fill="#e8eaf6" font-size="14" text-anchor="middle" stroke="none">Jan, Apr</text>
                            </g>
                            <text x="200" y="200" fill="#b0bec5" font-size="14" text-anchor="middle">Result: Scans all 3 partitions</text>
                            
                            <!-- Good Clustering -->
                            <text x="600" y="80" fill="#66bb6a" font-size="18" text-anchor="middle">Good Clustering (Filter: Date = Jan)</text>
                            <g stroke="#66bb6a" fill="none" stroke-width="2">
                                <rect x="450" y="100" width="80" height="60" rx="4" fill="#0a3a1a" />
                                <text x="490" y="135" fill="#e8eaf6" font-size="14" text-anchor="middle" stroke="none">Jan</text>
                                
                                <rect x="550" y="100" width="80" height="60" rx="4" />
                                <text x="590" y="135" fill="#b0bec5" font-size="14" text-anchor="middle" stroke="none">Feb</text>
                                
                                <rect x="650" y="100" width="80" height="60" rx="4" />
                                <text x="690" y="135" fill="#b0bec5" font-size="14" text-anchor="middle" stroke="none">Mar, Apr</text>
                            </g>
                            <text x="600" y="200" fill="#b0bec5" font-size="14" text-anchor="middle">Result: Scans only 1 partition</text>
                            
                        </svg>
                        <p class="diagram-caption">Figure 1: Clustering dramatically improves partition pruning by grouping similar values into the same micro-partitions.</p>
                    </div>
                `
            },
            {
                title: "Search Optimization Service",
                content: `
                    <p>The <strong>Search Optimization Service</strong> (Enterprise Edition and higher) is designed specifically to accelerate point lookup queries (e.g., finding a needle in a haystack) and substring searches.</p>
                    <p>While clustering is good for range queries and large aggregations, Search Optimization shines when you need to find a small number of rows based on highly selective equality predicates.</p>
                    <div class="callout warning">
                        <div class="callout-title">⚠️ Common Misconception</div>
                        <p>Clustering and Search Optimization serve different purposes. Use clustering for range filters on large tables. Use Search Optimization for fast point lookups on specific IDs or substring matches.</p>
                    </div>
                `
            }
        ],
        quiz: [
            {
                id: "d29q1",
                type: "single",
                question: "Which of the following is true regarding Snowflake micro-partitions?",
                options: [
                    "They can be modified directly using an UPDATE statement.",
                    "They are managed completely automatically by Snowflake.",
                    "Users must create them manually before inserting data.",
                    "They can store up to 5 GB of uncompressed data."
                ],
                correct: 1,
                explanation: "Snowflake micro-partitions are managed entirely automatically by the platform. They are immutable (cannot be modified), and hold 50 to 500 MB of uncompressed data."
            },
            {
                id: "d29q2",
                type: "single",
                question: "What metadata does Snowflake use to perform partition pruning?",
                options: [
                    "B-tree index structures",
                    "Min/Max values and distinct counts stored for each micro-partition",
                    "Search Optimization data maps",
                    "User-defined tags on the table"
                ],
                correct: 1,
                explanation: "Snowflake stores metadata about all rows stored in a micro-partition, including the minimum and maximum values for each column. This is used for partition pruning."
            },
            {
                id: "d29q3",
                type: "multi",
                question: "In which scenarios is defining a Clustering Key recommended? (Select two)",
                options: [
                    "A 50 MB dimension table.",
                    "A multi-terabyte fact table.",
                    "A table with entirely random ad-hoc query patterns.",
                    "A table frequently queried with range filters on specific date columns."
                ],
                correct: [1, 3],
                explanation: "Clustering Keys are generally only recommended for very large tables (multi-terabyte) that have predictable query patterns using range or equality filters on specific columns."
            },
            {
                id: "d29q4",
                type: "single",
                question: "Which system function is used to check the clustering quality of a table?",
                options: [
                    "SYSTEM$GET_CLUSTERING_DEPTH",
                    "SYSTEM$CLUSTERING_INFORMATION",
                    "SHOW CLUSTERING KEYS",
                    "DESCRIBE CLUSTERING"
                ],
                correct: 1,
                explanation: "SYSTEM$CLUSTERING_INFORMATION is the built-in system function used to retrieve clustering depth and other clustering metrics for a table."
            },
            {
                id: "d29q5",
                type: "single",
                question: "Which Snowflake feature is best suited for accelerating queries that search for a small number of rows using highly selective equality filters?",
                options: [
                    "Automatic Clustering",
                    "Materialized Views",
                    "Search Optimization Service",
                    "Result Cache"
                ],
                correct: 2,
                explanation: "The Search Optimization Service is designed specifically to accelerate point lookup queries and substring searches."
            },
            {
                id: "d29q6",
                type: "single",
                question: "What happens to the existing micro-partition when a row inside it is updated?",
                options: [
                    "The specific row is overwritten within the micro-partition.",
                    "The micro-partition is defragmented.",
                    "A new micro-partition is written, and the old one is marked as deleted.",
                    "The micro-partition is split into two smaller micro-partitions."
                ],
                correct: 2,
                explanation: "Micro-partitions are immutable. When data is modified via DML (like an UPDATE), a new micro-partition is created with the new data, and the old one is marked as deleted (used for Time Travel)."
            },
            {
                id: "d29q7",
                type: "single",
                question: "Which Snowflake edition is required to use Automatic Clustering and the Search Optimization Service?",
                options: [
                    "Standard Edition",
                    "Enterprise Edition or higher",
                    "Business Critical Edition only",
                    "Virtual Private Snowflake (VPS) only"
                ],
                correct: 1,
                explanation: "Both Automatic Clustering and the Search Optimization Service require the Enterprise Edition or higher."
            }
        ]
    },
    {
        day: 30,
        title: "Semi-Structured Data",
        subtitle: "Querying JSON, XML, and More natively",
        domain: {
            id: 4,
            name: "Performance & Transformation",
            color: "#ffa726"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the VARIANT data type",
            "Query semi-structured data using dot notation",
            "Use the FLATTEN function",
            "Construct and convert semi-structured data",
            "Use Window Functions to perform calculations across related rows"
        ],
        sections: [
            {
                title: "The VARIANT Data Type",
                content: `
                    <p>Snowflake offers native support for semi-structured data via the <strong>VARIANT</strong> data type. You can load JSON, Avro, ORC, Parquet, and XML directly into a VARIANT column without defining a rigid schema first.</p>
                    <p>When loading into a VARIANT column, Snowflake automatically detects the structure, extracts attributes, and stores them in a columnar format (similar to relational data), enabling high-performance queries.</p>
                `
            },
            {
                title: "Querying Semi-Structured Data",
                content: `
                    <p>You can query data inside a VARIANT column using special notation:</p>
                    <ul>
                        <li><strong>Dot notation:</strong> <code>data:customer_name</code> (Accessing an object key)</li>
                        <li><strong>Bracket notation:</strong> <code>data['customer_name']</code></li>
                        <li><strong>Nested access:</strong> <code>data:address:city</code></li>
                        <li><strong>Array access:</strong> <code>data:phone_numbers[0]</code> (Arrays are 0-indexed)</li>
                        <li><strong>Casting:</strong> Values extracted from a VARIANT are still of type VARIANT. Cast them to proper types for comparison: <code>data:age::NUMBER</code></li>
                    </ul>
                    <div class="code-block">
                        <div class="code-header">SQL</div>
                        <pre><code>SELECT 
  src:customer.name::STRING as customer_name,
  src:orders[0].total::NUMBER as first_order_total
FROM raw_json_data;</code></pre>
                    </div>
                `
            },
            {
                title: "The FLATTEN Function",
                content: `
                    <p>To convert nested arrays or objects into relational rows, use the <strong>FLATTEN</strong> table function. It explodes an array or object into multiple rows.</p>
                    <p>It is commonly used with a <code>LATERAL</code> join to correlate the flattened rows with the original row.</p>
                    <div class="code-block">
                        <div class="code-header">SQL</div>
                        <pre><code>SELECT 
  t.id,
  f.value::STRING as item_name
FROM my_table t,
LATERAL FLATTEN(input => t.src:items) f;</code></pre>
                    </div>
                    <div class="callout exam-tip">
                        <div class="callout-title">📝 Exam Tip</div>
                        <p>The FLATTEN function returns several columns, including <code>SEQ</code>, <code>KEY</code>, <code>PATH</code>, <code>INDEX</code>, <code>VALUE</code>, and <code>THIS</code>. The <code>VALUE</code> column contains the actual array element or object value.</p>
                    </div>
                `
            },
            {
                title: "Building and Converting",
                content: `
                    <p>Snowflake also provides functions to construct semi-structured data from relational data:</p>
                    <ul>
                        <li><strong>OBJECT_CONSTRUCT:</strong> Creates a JSON object from key-value pairs.</li>
                        <li><strong>ARRAY_CONSTRUCT:</strong> Creates an array from values.</li>
                        <li><strong>ARRAY_AGG:</strong> Aggregates values from multiple rows into a single array.</li>
                    </ul>
                    <p>Conversion functions:</p>
                    <ul>
                        <li><strong>PARSE_JSON:</strong> Parses a JSON string into a VARIANT value.</li>
                        <li><strong>TO_JSON:</strong> Converts a VARIANT value to a JSON string.</li>
                    </ul>
                `
            },
            {
                title: "Window Functions",
                content: `
                    <p><strong>Window functions</strong> perform calculations across a set of rows related to the current row WITHOUT collapsing them (unlike <code>GROUP BY</code>).</p>
                    <p><strong>Syntax:</strong> <code>function() OVER (PARTITION BY col ORDER BY col ROWS/RANGE ...)</code></p>
                    <h4>Key Functions on the Exam</h4>
                    <ul>
                        <li><code>ROW_NUMBER()</code>: Assigns a unique sequential number, no ties.</li>
                        <li><code>RANK()</code>: Assigns rank with gaps for ties (1, 2, 2, 4).</li>
                        <li><code>DENSE_RANK()</code>: Assigns rank without gaps (1, 2, 2, 3).</li>
                        <li><code>LEAD(col, offset)</code>: Access value from the NEXT row.</li>
                        <li><code>LAG(col, offset)</code>: Access value from the PREVIOUS row.</li>
                        <li><code>NTILE(n)</code>: Distributes rows into <em>n</em> roughly equal buckets.</li>
                        <li><code>SUM() OVER()</code>, <code>AVG() OVER()</code>: Running or cumulative aggregates.</li>
                    </ul>
                    <div class="comparison-table">
                        <table>
                            <tr><th>Function</th><th>Behavior on Ties</th><th>Result for 100, 100, 90</th></tr>
                            <tr><td><code>ROW_NUMBER()</code></td><td>Always unique</td><td>1, 2, 3</td></tr>
                            <tr><td><code>RANK()</code></td><td>Ties get same rank, next gets gap</td><td>1, 1, 3</td></tr>
                            <tr><td><code>DENSE_RANK()</code></td><td>Ties get same rank, no gap</td><td>1, 1, 2</td></tr>
                        </table>
                    </div>
                    <h4>Frame Clauses and Use Cases</h4>
                    <p>A frame clause like <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> is used to calculate running totals.</p>
                    <ul>
                        <li><strong>Finding top-N per group:</strong> Use <code>ROW_NUMBER()</code> with <code>PARTITION BY</code>.</li>
                        <li><strong>Calculating running totals:</strong> Use <code>SUM() OVER()</code> with <code>ORDER BY</code>.</li>
                        <li><strong>Comparing current vs previous values:</strong> Use <code>LAG()</code>.</li>
                    </ul>
                    <div class="callout exam-tip">
                        <div class="callout-title">📝 Exam Tip</div>
                        <p>Know the difference between ROW_NUMBER (always unique), RANK (gaps after ties), and DENSE_RANK (no gaps). This is a favorite exam question.</p>
                    </div>
                `
            }
        ],
        quiz: [
            {
                id: "d30q1",
                type: "multi",
                question: "Which file formats are natively supported for loading into a VARIANT column in Snowflake? (Select three)",
                options: [
                    "JSON",
                    "CSV",
                    "Parquet",
                    "XML"
                ],
                correct: [0, 2, 3],
                explanation: "Snowflake natively supports loading JSON, Parquet, XML, Avro, and ORC into a VARIANT column. CSV is structured data, not semi-structured."
            },
            {
                id: "d30q2",
                type: "single",
                question: "Which operator is used to cast a value extracted from a VARIANT column into a specific data type?",
                options: [
                    "->",
                    "::",
                    "==",
                    "AS"
                ],
                correct: 1,
                explanation: "The double colon (::) is the cast operator in Snowflake (e.g., data:age::NUMBER)."
            },
            {
                id: "d30q3",
                type: "single",
                question: "You have an array of elements inside a VARIANT column and want to convert each element into a separate row. Which function should you use?",
                options: [
                    "UNNEST",
                    "EXPLODE",
                    "FLATTEN",
                    "ARRAY_TO_ROWS"
                ],
                correct: 2,
                explanation: "The FLATTEN table function takes a VARIANT, OBJECT, or ARRAY and produces a lateral view (rows) of the data."
            },
            {
                id: "d30q4",
                type: "single",
                question: "What is the correct syntax to extract the first element of an array named 'tags' located inside a JSON object stored in a VARIANT column named 'raw_data'?",
                options: [
                    "raw_data:tags[1]",
                    "raw_data.tags[0]",
                    "raw_data:tags[0]",
                    "raw_data['tags'].first()"
                ],
                correct: 2,
                explanation: "Snowflake uses dot/colon notation, and arrays are 0-indexed. Therefore, raw_data:tags[0] is correct."
            },
            {
                id: "d30q5",
                type: "single",
                question: "Which column output by the FLATTEN function contains the contents of the array element or object value being processed?",
                options: [
                    "KEY",
                    "PATH",
                    "INDEX",
                    "VALUE"
                ],
                correct: 3,
                explanation: "The VALUE column from the FLATTEN function output contains the actual value of the array element or object key-value pair."
            },
            {
                id: "d30q6",
                type: "single",
                question: "Which function allows you to aggregate values from multiple relational rows into a single JSON array?",
                options: [
                    "ARRAY_CONSTRUCT",
                    "ARRAY_AGG",
                    "OBJECT_CONSTRUCT",
                    "TO_ARRAY"
                ],
                correct: 1,
                explanation: "ARRAY_AGG is an aggregate function that rolls up multiple rows into a single array."
            },
            {
                id: "d30q7",
                type: "single",
                question: "What happens when Snowflake loads JSON data into a VARIANT column?",
                options: [
                    "It stores it as a raw, uncompressed string block.",
                    "It automatically extracts attributes and stores them in a compressed, columnar format.",
                    "It requires the user to define a schema map before loading.",
                    "It flattens all nested structures into a single level."
                ],
                correct: 1,
                explanation: "When loading into a VARIANT column, Snowflake automatically discovers the structure and stores the data in a columnar, compressed format for efficient querying."
            },
            {
                id: "d30q8",
                type: "single",
                question: "How do you convert a valid JSON string literal into a VARIANT value in a SQL query?",
                options: [
                    "PARSE_JSON('{\"key\": \"value\"}')",
                    "TO_JSON('{\"key\": \"value\"}')",
                    "CAST_VARIANT('{\"key\": \"value\"}')",
                    "STRING_TO_VARIANT('{\"key\": \"value\"}')"
                ],
                correct: 0,
                explanation: "PARSE_JSON takes a string containing valid JSON and converts it to a VARIANT value."
            },
            {
                id: "d30q9",
                type: "single",
                question: "Which window function assigns a unique sequential integer to each row within a partition, without allowing ties?",
                options: [
                    "RANK()",
                    "DENSE_RANK()",
                    "ROW_NUMBER()",
                    "NTILE()"
                ],
                correct: 2,
                explanation: "ROW_NUMBER() always assigns a unique number to each row within a partition. Even if there is a tie in the ORDER BY values, the numbers will be sequential and unique."
            },
            {
                id: "d30q10",
                type: "single",
                question: "In a window function, which function allows you to access a value from the previous row?",
                options: [
                    "LEAD()",
                    "LAG()",
                    "PREVIOUS()",
                    "FIRST_VALUE()"
                ],
                correct: 1,
                explanation: "LAG() accesses data from a previous row in the same result set without the use of a self-join."
            },
            {
                id: "d30q11",
                type: "single",
                question: "If two rows have a tied value, which ranking function gives them the same rank and does NOT leave a gap in the next rank?",
                options: [
                    "ROW_NUMBER()",
                    "RANK()",
                    "DENSE_RANK()",
                    "NTILE()"
                ],
                correct: 2,
                explanation: "DENSE_RANK() assigns the same rank to ties but does not skip any ranks for the next row (e.g., 1, 2, 2, 3)."
            },
            {
                id: "d30q12",
                type: "single",
                question: "What is the purpose of the 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW' frame clause?",
                options: [
                    "To calculate a moving average of the last 3 rows.",
                    "To calculate a running total or cumulative aggregate.",
                    "To partition the data into equal buckets.",
                    "To find the maximum value in the entire partition."
                ],
                correct: 1,
                explanation: "This frame clause defines a window that starts at the beginning of the partition and ends at the current row, which is standard for calculating running totals."
            }
        ]
    },
    {
        day: 31,
        title: "Streams & Change Tracking",
        subtitle: "Change Data Capture (CDC) in Snowflake",
        domain: {
            id: 4,
            name: "Performance & Transformation",
            color: "#ffa726"
        },
        estimatedTime: "90 min",
        objectives: [
            "Explain what Streams are and their use cases",
            "Differentiate between Stream types",
            "Understand the Stream lifecycle and staleness",
            "Combine Streams with Tasks for ELT pipelines"
        ],
        sections: [
            {
                title: "Understanding Streams",
                content: `
                    <p>A <strong>Stream</strong> is Snowflake's native Change Data Capture (CDC) mechanism. It tracks Data Manipulation Language (DML) changes (INSERTs, UPDATEs, DELETEs) made to a source table.</p>
                    <p>Instead of copying the data, a stream takes an initial snapshot offset. When you query the stream, it returns the current rows in the table plus three metadata columns that describe how the data changed since the offset.</p>
                    <ul>
                        <li><code>METADATA$ACTION</code>: Indicates if the row was INSERTED or DELETED (an UPDATE is represented as a DELETE of the old row and an INSERT of the new row).</li>
                        <li><code>METADATA$ISUPDATE</code>: TRUE if the action was part of an UPDATE statement.</li>
                        <li><code>METADATA$ROW_ID</code>: A unique identifier for the row.</li>
                    </ul>
                `
            },
            {
                title: "Stream Types",
                content: `
                    <p>There are three types of streams:</p>
                    <ul>
                        <li><strong>Standard:</strong> Tracks all DML changes (INSERT, UPDATE, DELETE). This is the default.</li>
                        <li><strong>Append-only:</strong> Tracks only INSERTs. It is more efficient for append-only tables (like logs) because it ignores UPDATEs and DELETEs.</li>
                        <li><strong>Insert-only:</strong> Used specifically for external tables. It tracks new files added to the external stage.</li>
                    </ul>
                `
            },
            {
                title: "Stream Lifecycle and Staleness",
                content: `
                    <p>When you consume a stream using a DML statement within a transaction (e.g., <code>INSERT INTO target SELECT * FROM stream</code>), the stream's offset automatically advances to the current point in time.</p>
                    <div class="callout warning">
                        <div class="callout-title">⚠️ Common Misconception</div>
                        <p>Simply querying a stream with a SELECT statement does NOT advance the offset. The offset only advances when the stream is consumed in a DML operation.</p>
                    </div>
                    <p><strong>Staleness:</strong> Streams rely on Time Travel. If a stream is not consumed within the Time Travel retention period of the source table, it becomes <em>stale</em> and cannot be read. You must recreate the stream.</p>
                `
            },
            {
                title: "Stream + Task Pattern",
                content: `
                    <p>Streams are rarely used alone. The most common pattern is pairing them with Tasks to build automated, continuous ELT pipelines.</p>
                    <p>A scheduled task can check if a stream has data using <code>SYSTEM$STREAM_HAS_DATA</code>. If true, the task executes a DML statement to process the changes from the stream into a target table.</p>
                    
                    <div class="diagram-container">
                        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="800" height="400" fill="#111827" />
                            <text x="400" y="40" fill="#e8eaf6" font-size="24" text-anchor="middle" font-weight="bold">Stream and Task CDC Pipeline</text>
                            
                            <!-- Source Table -->
                            <rect x="50" y="150" width="150" height="100" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                            <text x="125" y="200" fill="#e8eaf6" font-size="16" text-anchor="middle">Source Table</text>
                            <text x="125" y="225" fill="#b0bec5" font-size="12" text-anchor="middle">(Raw Data)</text>
                            
                            <!-- DML Changes Arrow -->
                            <path d="M 200 200 L 300 200" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrowhead)" />
                            
                            <!-- Stream -->
                            <rect x="300" y="100" width="200" height="60" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2" />
                            <text x="400" y="135" fill="#e8eaf6" font-size="16" text-anchor="middle">Stream</text>
                            
                            <!-- Task -->
                            <rect x="300" y="240" width="200" height="60" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="400" y="275" fill="#e8eaf6" font-size="16" text-anchor="middle">Scheduled Task</text>
                            
                            <!-- Task reads Stream -->
                            <path d="M 400 240 L 400 160" stroke="#7c4dff" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrowhead)" />
                            <text x="460" y="205" fill="#b0bec5" font-size="12" text-anchor="middle">consumes</text>
                            
                            <!-- Target Arrow -->
                            <path d="M 500 270 L 600 270" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrowhead)" />
                            
                            <!-- Target Table -->
                            <rect x="600" y="220" width="150" height="100" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                            <text x="675" y="270" fill="#e8eaf6" font-size="16" text-anchor="middle">Target Table</text>
                            <text x="675" y="295" fill="#b0bec5" font-size="12" text-anchor="middle">(Transformed)</text>
                            
                            <!-- Arrow Def -->
                            <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7b8d" />
                                </marker>
                            </defs>
                        </svg>
                        <p class="diagram-caption">Figure 2: A Stream tracks changes on a Source Table. A Task consumes the Stream on a schedule and loads the Target Table.</p>
                    </div>
                `
            }
        ],
        quiz: [
            {
                id: "d31q1",
                type: "single",
                question: "What does a Snowflake Stream primarily do?",
                options: [
                    "Replicates data to a different region.",
                    "Provides Change Data Capture (CDC) by tracking DML changes on a table.",
                    "Streams data directly from external cloud storage without loading it.",
                    "Executes SQL queries on a schedule."
                ],
                correct: 1,
                explanation: "A stream is an object that provides Change Data Capture (CDC) functionality, tracking INSERTs, UPDATEs, and DELETEs made to a source table."
            },
            {
                id: "d31q2",
                type: "multi",
                question: "Which of the following are metadata columns provided by a Stream? (Select three)",
                options: [
                    "METADATA$ACTION",
                    "METADATA$TIMESTAMP",
                    "METADATA$ISUPDATE",
                    "METADATA$ROW_ID"
                ],
                correct: [0, 2, 3],
                explanation: "Streams provide METADATA$ACTION (INSERT/DELETE), METADATA$ISUPDATE (TRUE/FALSE), and METADATA$ROW_ID. There is no METADATA$TIMESTAMP column."
            },
            {
                id: "d31q3",
                type: "single",
                question: "How is an UPDATE statement represented in a standard Stream?",
                options: [
                    "As a single row with METADATA$ACTION = 'UPDATE'",
                    "As two rows: one DELETE (the old state) and one INSERT (the new state), both with METADATA$ISUPDATE = TRUE",
                    "As a single row showing only the new values",
                    "Streams do not track UPDATE statements"
                ],
                correct: 1,
                explanation: "An UPDATE is represented as two records in a standard stream: a DELETE of the previous row state, and an INSERT of the new row state. Both records have METADATA$ISUPDATE set to TRUE."
            },
            {
                id: "d31q4",
                type: "single",
                question: "What action causes a stream's offset to advance, effectively emptying the stream of processed records?",
                options: [
                    "Executing a SELECT * FROM stream query.",
                    "Consuming the stream in a DML statement (like INSERT INTO ... SELECT FROM stream).",
                    "Calling SYSTEM$ADVANCE_STREAM().",
                    "Waiting 24 hours."
                ],
                correct: 1,
                explanation: "A stream's offset advances only when the stream is consumed within a DML transaction (INSERT, UPDATE, DELETE, or MERGE)."
            },
            {
                id: "d31q5",
                type: "single",
                question: "Why might a stream become 'stale'?",
                options: [
                    "It has not been consumed within the source table's Time Travel retention period.",
                    "The warehouse used to create it was suspended.",
                    "The task associated with it was suspended.",
                    "Too many rows were inserted into the source table."
                ],
                correct: 0,
                explanation: "Streams depend on Time Travel. If a stream is not consumed before the underlying table's data retention period expires, the historical data needed by the stream is lost, and it becomes stale."
            },
            {
                id: "d31q6",
                type: "single",
                question: "Which stream type is most efficient for tracking logs where records are only ever added, never modified or deleted?",
                options: [
                    "Standard Stream",
                    "Insert-only Stream",
                    "Append-only Stream",
                    "Continuous Stream"
                ],
                correct: 2,
                explanation: "An append-only stream tracks only INSERT operations, making it more efficient for append-only workloads like logging."
            },
            {
                id: "d31q7",
                type: "single",
                question: "Which function is commonly used in a task's WHEN clause to check if a stream has data before running a warehouse?",
                options: [
                    "SYSTEM$STREAM_HAS_DATA",
                    "STREAM_ROW_COUNT",
                    "SYSTEM$CHECK_STREAM",
                    "HAS_CDC_DATA"
                ],
                correct: 0,
                explanation: "SYSTEM$STREAM_HAS_DATA is evaluated before starting the task. If it returns false, the task is skipped, saving warehouse compute credits."
            }
        ]
    },
    {
        day: 32,
        title: "Tasks, Stored Procedures & UDFs",
        subtitle: "Automation and Extensibility",
        domain: {
            id: 4,
            name: "Performance & Transformation",
            color: "#ffa726"
        },
        estimatedTime: "90 min",
        objectives: [
            "Configure and manage Tasks and Task Trees",
            "Understand Serverless Tasks",
            "Differentiate between Stored Procedures and UDFs",
            "Identify supported languages for programmability"
        ],
        sections: [
            {
                title: "Tasks and Task Trees",
                content: `
                    <p><strong>Tasks</strong> allow you to schedule the execution of a single SQL statement, including calls to stored procedures, on a recurring basis. You define a task with a <code>SCHEDULE</code> (using an interval like '60 MINUTE' or a cron expression).</p>
                    <p>Tasks can be linked together into a Directed Acyclic Graph (DAG) or <strong>Task Tree</strong>. You define dependencies using the <code>AFTER</code> clause. A child task runs only after its parent task completes successfully.</p>
                    <div class="callout exam-tip">
                        <div class="callout-title">📝 Exam Tip</div>
                        <p>When you create a task, it is suspended by default. You must execute <code>ALTER TASK ... RESUME</code> to start it. For a task tree, you can use <code>SELECT SYSTEM$TASK_DEPENDENTS_ENABLE('root_task_name')</code> to resume the root and all child tasks.</p>
                    </div>
                `
            },
            {
                title: "Serverless Tasks",
                content: `
                    <p>Normally, a task requires a user-managed virtual warehouse to run (specified via the <code>WAREHOUSE</code> parameter). With <strong>Serverless Tasks</strong>, you omit the warehouse parameter. Snowflake automatically provisions, scales, and manages the compute resources.</p>
                    <p>Serverless tasks are billed based on the actual compute time used, which can be more cost-effective for short-running tasks.</p>
                    
                    <div class="diagram-container">
                        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="800" height="400" fill="#111827" />
                            <text x="400" y="40" fill="#e8eaf6" font-size="24" text-anchor="middle" font-weight="bold">Task DAG (Directed Acyclic Graph)</text>
                            
                            <!-- Root Task -->
                            <rect x="300" y="80" width="200" height="60" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="400" y="115" fill="#e8eaf6" font-size="16" text-anchor="middle">Root Task</text>
                            <text x="400" y="130" fill="#b0bec5" font-size="10" text-anchor="middle">SCHEDULE = 'USING CRON 0 0 * * *'</text>
                            
                            <!-- Arrows from Root -->
                            <path d="M 350 140 L 200 200" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrowhead2)" />
                            <path d="M 450 140 L 600 200" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrowhead2)" />
                            
                            <!-- Child Task 1 -->
                            <rect x="100" y="200" width="200" height="60" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="200" y="235" fill="#e8eaf6" font-size="16" text-anchor="middle">Child Task 1</text>
                            <text x="200" y="250" fill="#b0bec5" font-size="10" text-anchor="middle">AFTER Root Task</text>
                            
                            <!-- Child Task 2 -->
                            <rect x="500" y="200" width="200" height="60" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="600" y="235" fill="#e8eaf6" font-size="16" text-anchor="middle">Child Task 2</text>
                            <text x="600" y="250" fill="#b0bec5" font-size="10" text-anchor="middle">AFTER Root Task</text>
                            
                            <!-- Arrow to Grandchild -->
                            <path d="M 200 260 L 400 320" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrowhead2)" />
                            <path d="M 600 260 L 400 320" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrowhead2)" />
                            
                            <!-- Grandchild Task -->
                            <rect x="300" y="320" width="200" height="60" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="400" y="355" fill="#e8eaf6" font-size="16" text-anchor="middle">Final Task</text>
                            <text x="400" y="370" fill="#b0bec5" font-size="10" text-anchor="middle">AFTER Child 1, Child 2</text>
                            
                            <!-- Arrow Def -->
                            <defs>
                                <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#6b7b8d" />
                                </marker>
                            </defs>
                        </svg>
                        <p class="diagram-caption">Figure 3: A Task DAG where child tasks execute only after their parent tasks complete successfully.</p>
                    </div>
                `
            },
            {
                title: "Stored Procedures",
                content: `
                    <p><strong>Stored Procedures</strong> encapsulate complex business logic. Unlike basic SQL statements, they allow you to use procedural logic (if/else, loops, error handling).</p>
                    <ul>
                        <li><strong>Languages:</strong> Snowflake Scripting (SQL), JavaScript, Python (via Snowpark), Java, Scala.</li>
                        <li><strong>Purpose:</strong> Designed to perform actions, especially administrative tasks or complex DML operations (INSERT/UPDATE/DELETE/DDL).</li>
                        <li><strong>Execution:</strong> Called using the <code>CALL</code> statement.</li>
                        <li><strong>Rights:</strong> Can run as the <code>OWNER</code> (default) or the <code>CALLER</code>.</li>
                    </ul>
                `
            },
            {
                title: "User-Defined Functions (UDFs)",
                content: `
                    <p><strong>User-Defined Functions (UDFs)</strong> are designed to calculate and return a value. You use them inline within SQL statements (e.g., in a SELECT clause).</p>
                    <ul>
                        <li><strong>Languages:</strong> SQL, JavaScript, Python, Java.</li>
                        <li><strong>Types:</strong> 
                            <ul>
                                <li><em>Scalar UDFs</em> return a single value per row.</li>
                                <li><em>Tabular UDFs (UDTFs)</em> return a set of rows (a table).</li>
                            </ul>
                        </li>
                        <li><strong>Limitations:</strong> UDFs cannot execute DDL or DML statements. They are meant for reading data and computation only.</li>
                    </ul>
                    <div class="callout warning">
                        <div class="callout-title">⚠️ Common Misconception</div>
                        <p>Do not confuse Stored Procedures and UDFs. UDFs return a value and are used <em>inside</em> SQL statements. Stored Procedures perform actions, can alter data/objects, and are invoked using CALL.</p>
                    </div>
                `
            }
        ],
        quiz: [
            {
                id: "d32q1",
                type: "single",
                question: "What clause is used to define a dependency between tasks in a Task Tree?",
                options: [
                    "DEPENDS ON",
                    "AFTER",
                    "FOLLOWS",
                    "TRIGGERED BY"
                ],
                correct: 1,
                explanation: "The AFTER clause is used in the CREATE TASK statement to specify one or more predecessor tasks."
            },
            {
                id: "d32q2",
                type: "single",
                question: "What is a primary benefit of using a Serverless Task?",
                options: [
                    "It runs instantly without any schedule.",
                    "It allows tasks to run outside of the Snowflake environment.",
                    "Snowflake automatically manages and scales the compute resources, charging only for time used.",
                    "It allows tasks to bypass role-based access control."
                ],
                correct: 2,
                explanation: "Serverless tasks eliminate the need for users to provision and manage a virtual warehouse. Snowflake manages the compute and bills based on actual usage."
            },
            {
                id: "d32q3",
                type: "multi",
                question: "Which of the following programming languages are supported for writing Stored Procedures in Snowflake? (Select three)",
                options: [
                    "JavaScript",
                    "Python",
                    "C++",
                    "Snowflake Scripting (SQL)"
                ],
                correct: [0, 1, 3],
                explanation: "Stored procedures can be written in Snowflake Scripting, JavaScript, Python, Java, and Scala. C++ is not supported natively."
            },
            {
                id: "d32q4",
                type: "single",
                question: "Which of the following is true regarding User-Defined Functions (UDFs)?",
                options: [
                    "UDFs can execute DDL statements like CREATE TABLE.",
                    "UDFs are invoked using the CALL statement.",
                    "UDFs return a value and can be used inside a SELECT statement.",
                    "UDFs must be executed on a schedule."
                ],
                correct: 2,
                explanation: "UDFs calculate and return values and are designed to be called inline within a SQL statement (like SELECT or WHERE). They cannot perform DML/DDL."
            },
            {
                id: "d32q5",
                type: "single",
                question: "By default, when a user executes a stored procedure, under which permissions does it run?",
                options: [
                    "Caller's Rights",
                    "Owner's Rights",
                    "ACCOUNTADMIN Rights",
                    "System Rights"
                ],
                correct: 1,
                explanation: "By default, stored procedures execute with Owner's rights. This means they run using the privileges of the role that owns the procedure, not the role of the user calling it."
            },
            {
                id: "d32q6",
                type: "single",
                question: "What happens when you create a new task using the CREATE TASK statement?",
                options: [
                    "It immediately executes once.",
                    "It begins running automatically according to its schedule.",
                    "It is created in a suspended state and must be resumed.",
                    "It requires approval from an ACCOUNTADMIN before it can run."
                ],
                correct: 2,
                explanation: "New tasks are created in a suspended state. You must explicitly run ALTER TASK ... RESUME to start them."
            },
            {
                id: "d32q7",
                type: "single",
                question: "What is a UDTF?",
                options: [
                    "User-Defined Task Format",
                    "User-Defined Table Function",
                    "Unified Data Transfer Function",
                    "User-Defined Time Format"
                ],
                correct: 1,
                explanation: "A UDTF is a User-Defined Table Function, which is a UDF that returns a set of rows (a table) instead of a single scalar value."
            }
        ]
    },
    {
        day: 33,
        title: "Continuous Data Protection",
        subtitle: "Time Travel, Fail-safe, and Cloning",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Use Time Travel to query historical data and restore objects",
            "Understand the purpose and limitations of Fail-safe",
            "Create Zero-Copy Clones for dev/test environments",
            "Explain the storage costs associated with these features"
        ],
        sections: [
            {
                title: "Time Travel",
                content: `
                    <p><strong>Time Travel</strong> allows you to access historical data (data that has been changed or deleted) at any point within a defined retention period.</p>
                    <ul>
                        <li><strong>Retention Period:</strong> Standard Edition allows 0 or 1 day. Enterprise Edition and higher allow up to 90 days. Configured via the <code>DATA_RETENTION_TIME_IN_DAYS</code> parameter.</li>
                        <li><strong>Querying:</strong> Use the <code>AT</code> or <code>BEFORE</code> clauses in your SELECT statement.
                            <br><code>SELECT * FROM table AT(TIMESTAMP => '2023-10-01 12:00:00'::timestamp)</code>
                            <br><code>SELECT * FROM table BEFORE(STATEMENT => 'query_id')</code>
                        </li>
                        <li><strong>Restoring Objects:</strong> You can restore dropped databases, schemas, and tables using the <code>UNDROP</code> command instantly.</li>
                    </ul>
                `
            },
            {
                title: "Fail-safe",
                content: `
                    <p><strong>Fail-safe</strong> provides a 7-day period to recover data <em>after</em> the Time Travel retention period ends. It acts as a final safety net for disaster recovery.</p>
                    <div class="callout warning">
                        <div class="callout-title">⚠️ Common Misconception</div>
                        <p>Fail-safe is NOT user-accessible. You cannot query data in Fail-safe or UNDROP objects from it. Data recovery from Fail-safe can only be performed by Snowflake Support, and it may take days.</p>
                    </div>
                    <ul>
                        <li>It is a non-configurable 7-day period.</li>
                        <li>It applies only to Permanent tables. Transient and Temporary tables do NOT have Fail-safe (which saves on storage costs).</li>
                    </ul>
                `
            },
            {
                title: "Zero-Copy Cloning",
                content: `
                    <p><strong>Zero-Copy Cloning</strong> allows you to instantly create a copy of a database, schema, or table without copying the underlying physical data.</p>
                    <p>Syntax: <code>CREATE TABLE my_clone CLONE original_table;</code></p>
                    <ul>
                        <li><strong>Instant and Free (Initially):</strong> Creating a clone takes seconds and incurs zero additional storage cost because it simply creates new metadata pointers to the original micro-partitions.</li>
                        <li><strong>Divergence:</strong> The clone and the original are entirely independent after creation. If you INSERT/UPDATE data in the clone, new micro-partitions are written, and <em>only then</em> do you pay for the additional storage.</li>
                        <li><strong>Use Cases:</strong> Perfect for spinning up instant development and testing environments using production data.</li>
                    </ul>
                    
                    <div class="diagram-container">
                        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="800" height="400" fill="#111827" />
                            <text x="400" y="40" fill="#e8eaf6" font-size="24" text-anchor="middle" font-weight="bold">Data Protection Lifecycle (Permanent Table)</text>
                            
                            <!-- Timeline Axis -->
                            <line x1="50" y1="200" x2="750" y2="200" stroke="#b0bec5" stroke-width="4" />
                            
                            <!-- Current Data -->
                            <rect x="50" y="150" width="150" height="100" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                            <text x="125" y="190" fill="#e8eaf6" font-size="16" text-anchor="middle">Current Data</text>
                            <text x="125" y="215" fill="#b0bec5" font-size="12" text-anchor="middle">Active storage</text>
                            <text x="125" y="270" fill="#b0bec5" font-size="14" text-anchor="middle">Present</text>
                            <line x1="200" y1="190" x2="200" y2="210" stroke="#b0bec5" stroke-width="2" />
                            
                            <!-- Time Travel -->
                            <rect x="200" y="150" width="250" height="100" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="325" y="190" fill="#e8eaf6" font-size="16" text-anchor="middle">Time Travel</text>
                            <text x="325" y="215" fill="#b0bec5" font-size="12" text-anchor="middle">User Accessible via SQL</text>
                            <text x="325" y="235" fill="#b0bec5" font-size="12" text-anchor="middle">(0 to 90 Days)</text>
                            <text x="450" y="270" fill="#b0bec5" font-size="14" text-anchor="middle">TT Expires</text>
                            <line x1="450" y1="190" x2="450" y2="210" stroke="#b0bec5" stroke-width="2" />
                            
                            <!-- Fail-safe -->
                            <rect x="450" y="150" width="200" height="100" fill="#3a2a0a" stroke="#ffa726" stroke-width="2" />
                            <text x="550" y="190" fill="#e8eaf6" font-size="16" text-anchor="middle">Fail-safe</text>
                            <text x="550" y="215" fill="#b0bec5" font-size="12" text-anchor="middle">Snowflake Support Only</text>
                            <text x="550" y="235" fill="#b0bec5" font-size="12" text-anchor="middle">(7 Days, fixed)</text>
                            
                            <text x="650" y="270" fill="#b0bec5" font-size="14" text-anchor="middle">Deleted</text>
                            <line x1="650" y1="190" x2="650" y2="210" stroke="#b0bec5" stroke-width="2" />
                            
                            <!-- Deleted -->
                            <text x="700" y="205" fill="#e8eaf6" font-size="16" text-anchor="middle">Purged</text>
                            
                        </svg>
                        <p class="diagram-caption">Figure 4: The lifecycle of historical data. Transient and Temporary tables skip the Fail-safe period.</p>
                    </div>
                `
            }
        ],
        quiz: [
            {
                id: "d33q1",
                type: "single",
                question: "What is the maximum Time Travel retention period available in the Enterprise Edition?",
                options: [
                    "1 day",
                    "7 days",
                    "90 days",
                    "Unlimited"
                ],
                correct: 2,
                explanation: "Enterprise Edition and higher support Time Travel retention periods of up to 90 days. Standard Edition is limited to 1 day."
            },
            {
                id: "d33q2",
                type: "single",
                question: "Which SQL command instantly restores a table that was accidentally deleted, provided it is within the Time Travel period?",
                options: [
                    "RESTORE TABLE",
                    "RECOVER TABLE",
                    "UNDROP TABLE",
                    "UN-DELETE TABLE"
                ],
                correct: 2,
                explanation: "The UNDROP command restores dropped databases, schemas, and tables."
            },
            {
                id: "d33q3",
                type: "multi",
                question: "Which of the following are true regarding Fail-safe? (Select two)",
                options: [
                    "It can be disabled by setting the retention period to 0.",
                    "It is a fixed 7-day period.",
                    "Users can query data in Fail-safe using the AT clause.",
                    "It requires intervention from Snowflake Support to recover data."
                ],
                correct: [1, 3],
                explanation: "Fail-safe is a non-configurable 7-day period. It is not accessible by users via SQL; data recovery requires contacting Snowflake Support."
            },
            {
                id: "d33q4",
                type: "single",
                question: "Which table types do NOT incur Fail-safe storage costs?",
                options: [
                    "Permanent and Transient",
                    "Transient and Temporary",
                    "Permanent and Temporary",
                    "External and Permanent"
                ],
                correct: 1,
                explanation: "Fail-safe applies ONLY to Permanent tables. Transient and Temporary tables do not have Fail-safe, which reduces their storage costs."
            },
            {
                id: "d33q5",
                type: "single",
                question: "When creating a Zero-Copy Clone of a table, when do you start paying for additional storage for the clone?",
                options: [
                    "Immediately upon creation.",
                    "Only when data in the clone or the original table is modified (diverges).",
                    "After 24 hours.",
                    "You never pay storage costs for a clone."
                ],
                correct: 1,
                explanation: "Zero-copy cloning initially only creates metadata pointers. You only pay for additional storage when new data is added or existing data is modified in either the original or the clone."
            },
            {
                id: "d33q6",
                type: "single",
                question: "If a user updates a row in a clone, what happens to the original table?",
                options: [
                    "The original table is also updated.",
                    "The original table remains unchanged.",
                    "The clone relationship is broken, and a full copy is made.",
                    "The original table is locked until the clone is deleted."
                ],
                correct: 1,
                explanation: "Once a clone is created, it is completely independent of the original object. Changes made to the clone do not affect the original, and vice versa."
            },
            {
                id: "d33q7",
                type: "single",
                question: "Which parameter controls the Time Travel retention period?",
                options: [
                    "TIME_TRAVEL_DAYS",
                    "DATA_RETENTION_TIME_IN_DAYS",
                    "RETENTION_PERIOD",
                    "MAX_DATA_RETENTION"
                ],
                correct: 1,
                explanation: "The DATA_RETENTION_TIME_IN_DAYS parameter configures the Time Travel retention period. It can be set at the account, database, schema, or table level."
            },
            {
                id: "d33q8",
                type: "single",
                question: "How can you query data as it existed right before a specific query was executed?",
                options: [
                    "SELECT * FROM table PREVIOUS_TO(STATEMENT => 'query_id')",
                    "SELECT * FROM table BEFORE(STATEMENT => 'query_id')",
                    "SELECT * FROM table AT(QUERY_ID => 'query_id')",
                    "SELECT * FROM table TIME_TRAVEL('query_id')"
                ],
                correct: 1,
                explanation: "The BEFORE(STATEMENT => 'query_id') clause allows you to query the state of a table immediately prior to the execution of a specific statement ID."
            }
        ]
    },
    {
        day: 34,
        title: "Data Collaboration",
        subtitle: "Sharing, Marketplace, and Clean Rooms",
        domain: {
            id: 5,
            name: "Data Collaboration",
            color: "#66bb6a"
        },
        estimatedTime: "90 min",
        objectives: [
            "Explain how Secure Data Sharing works without copying data",
            "Understand Reader Accounts",
            "Differentiate between Snowflake Marketplace and Data Exchange",
            "Identify the use cases for Data Clean Rooms",
            "Understand Native Apps Framework and Data Replication"
        ],
        sections: [
            {
                title: "Secure Data Sharing",
                content: `
                    <p><strong>Secure Data Sharing</strong> is a core Snowflake capability that allows a Provider account to share data with Consumer accounts in real-time, <strong>without copying or moving the data</strong>.</p>
                    <ul>
                        <li><strong>Provider:</strong> Creates a <code>SHARE</code> object and grants privileges on databases, schemas, tables, and secure views to the share. The provider then adds consumer accounts to the share.</li>
                        <li><strong>Consumer:</strong> Creates a database from the share. They can query the data using their own compute resources (virtual warehouses).</li>
                        <li><strong>Costs:</strong> The Provider pays for storage. The Consumer pays ONLY for the compute used to query the shared data.</li>
                        <li><strong>Limitations:</strong> Shares are strictly read-only. Also, sharing is natively supported only within the same cloud region (to share across regions/clouds, the provider must use Database Replication first).</li>
                    </ul>
                `
            },
            {
                title: "Reader Accounts",
                content: `
                    <p>What if you want to share data with a client who doesn't use Snowflake? You can create a <strong>Reader Account</strong>.</p>
                    <p>A Reader Account is a Snowflake account created, managed, and paid for by the Provider. The non-Snowflake user gets a login to this account, where they can query the shared data. The Provider pays for all compute credits consumed by the Reader Account.</p>
                `
            },
            {
                title: "Marketplace and Data Exchange",
                content: `
                    <p>Snowflake offers platforms built on top of Secure Data Sharing:</p>
                    <ul>
                        <li><strong>Snowflake Marketplace:</strong> A public store where providers can list data products (free or monetized), and consumers can discover and access third-party data instantly.</li>
                        <li><strong>Data Exchange:</strong> A private, invitation-only hub. Large organizations use this to create a private data marketplace for internal business units or a specific group of external partners.</li>
                    </ul>
                `
            },
            {
                title: "Data Clean Rooms",
                content: `
                    <p><strong>Snowflake Data Clean Rooms</strong> allow multiple parties (e.g., two companies) to join and analyze their respective datasets together in a secure environment, without either party seeing the other's raw, underlying PII (Personally Identifiable Information).</p>
                    <p><strong>Use Case:</strong> An airline and a credit card company want to find overlapping customers for a marketing campaign. They use a Clean Room to count the matches securely without sharing their actual customer lists with each other.</p>
                    
                    <div class="diagram-container">
                        <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                            <rect width="800" height="400" fill="#111827" />
                            <text x="400" y="40" fill="#e8eaf6" font-size="24" text-anchor="middle" font-weight="bold">Secure Data Sharing Architecture</text>
                            
                            <!-- Provider Account -->
                            <rect x="50" y="100" width="200" height="200" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" />
                            <text x="150" y="130" fill="#e8eaf6" font-size="18" text-anchor="middle" font-weight="bold">Provider Account</text>
                            
                            <!-- Provider Database -->
                            <rect x="75" y="150" width="150" height="50" rx="4" fill="#0a3a3a" stroke="#00e5ff" />
                            <text x="150" y="180" fill="#e8eaf6" font-size="14" text-anchor="middle">Database (Storage)</text>
                            
                            <!-- Share Object -->
                            <rect x="100" y="230" width="100" height="40" rx="20" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2" />
                            <text x="150" y="255" fill="#e8eaf6" font-size="14" text-anchor="middle">SHARE</text>
                            
                            <!-- Sharing connections -->
                            <path d="M 200 250 L 350 150" stroke="#66bb6a" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrowhead3)" />
                            <path d="M 200 250 L 350 300" stroke="#66bb6a" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrowhead3)" />
                            
                            <!-- Consumer Account 1 -->
                            <rect x="350" y="80" width="400" height="120" rx="8" fill="#0a3a1a" stroke="#66bb6a" stroke-width="2" />
                            <text x="550" y="110" fill="#e8eaf6" font-size="18" text-anchor="middle" font-weight="bold">Consumer Account</text>
                            
                            <rect x="375" y="130" width="150" height="40" rx="4" fill="#3a2a0a" stroke="#ffa726" />
                            <text x="450" y="155" fill="#e8eaf6" font-size="12" text-anchor="middle">Database from Share</text>
                            <text x="450" y="185" fill="#b0bec5" font-size="10" text-anchor="middle">(Metadata pointers only)</text>
                            
                            <rect x="575" y="130" width="150" height="40" rx="4" fill="#2a1a4e" stroke="#7c4dff" />
                            <text x="650" y="155" fill="#e8eaf6" font-size="12" text-anchor="middle">Virtual Warehouse</text>
                            <text x="650" y="185" fill="#b0bec5" font-size="10" text-anchor="middle">(Consumer pays compute)</text>
                            
                            <!-- Reader Account -->
                            <rect x="350" y="240" width="400" height="120" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-dasharray="8,4" stroke-width="2" />
                            <text x="550" y="270" fill="#e8eaf6" font-size="18" text-anchor="middle" font-weight="bold">Reader Account (Non-Snowflake User)</text>
                            
                            <rect x="375" y="290" width="150" height="40" rx="4" fill="#3a2a0a" stroke="#ffa726" />
                            <text x="450" y="315" fill="#e8eaf6" font-size="12" text-anchor="middle">Database from Share</text>
                            
                            <rect x="575" y="290" width="150" height="40" rx="4" fill="#2a1a4e" stroke="#7c4dff" />
                            <text x="650" y="315" fill="#e8eaf6" font-size="12" text-anchor="middle">Virtual Warehouse</text>
                            <text x="650" y="345" fill="#ffa726" font-size="10" text-anchor="middle">Provider pays compute!</text>
                            
                            <!-- Arrow Def -->
                            <defs>
                                <marker id="arrowhead3" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#66bb6a" />
                                </marker>
                            </defs>
                        </svg>
                        <p class="diagram-caption">Figure 5: Providers share data via a SHARE object. Normal consumers use their own compute. For Reader Accounts, the provider pays for the compute.</p>
                    </div>
                `
            },
            {
                title: "Native Apps & Data Replication",
                content: `
                    <h4>Native Apps Framework</h4>
                    <p>What it is: allows providers to build, package, and distribute full applications (not just data) through Snowflake.</p>
                    <ul>
                        <li><strong>Components:</strong> application package (code + data), application object (installed instance).</li>
                        <li><strong>Inclusions:</strong> Providers can include stored procedures, UDFs, Streamlit UI, and shared data.</li>
                        <li><strong>Execution:</strong> Consumers install the app in their own account &mdash; runs on the consumer's compute.</li>
                        <li><strong>Distribution:</strong> via Snowflake Marketplace (public) or private listings.</li>
                    </ul>
                    <p><em>Analogy:</em> Data Sharing is like giving someone a spreadsheet. Native Apps is like giving them a full software application built on top of that spreadsheet.</p>
                    
                    <h4>Data Replication</h4>
                    <p>Data Replication allows replicating databases across regions and cloud providers.</p>
                    <ul>
                        <li><strong>Database vs Account Replication:</strong> Database replication copies data; Account replication copies account-level objects (users, roles, warehouses).</li>
                        <li><strong>Use Cases:</strong> Disaster recovery, business continuity, data locality.</li>
                        <li><strong>Architecture:</strong> Primary vs secondary (replica) databases. Failover groups group objects for coordinated failover.</li>
                        <li><strong>Requirement:</strong> Available in Business Critical+ edition for cross-region/cross-cloud.</li>
                    </ul>
                    <div class="callout exam-tip">
                        <div class="callout-title">📝 Exam Tip</div>
                        <p>Native Apps are a key COF-C03 topic. Understand that they can include both data AND code (procedures, UDFs, Streamlit), and they run on the consumer's compute.</p>
                    </div>
                `
            }
        ],
        quiz: [
            {
                id: "d34q1",
                type: "single",
                question: "In Secure Data Sharing, what does the Consumer pay for?",
                options: [
                    "Storage of the shared data.",
                    "Compute resources used to query the shared data.",
                    "Both storage and compute.",
                    "Neither storage nor compute."
                ],
                correct: 1,
                explanation: "The Provider pays for storage. The Consumer pays only for the virtual warehouse compute credits they use to query the shared data."
            },
            {
                id: "d34q2",
                type: "single",
                question: "Which of the following is true about a shared database in a Consumer account?",
                options: [
                    "The consumer can INSERT new records into the shared tables.",
                    "The shared database is read-only for the consumer.",
                    "The consumer must copy the data to a new table before querying it.",
                    "The consumer can grant WRITE permissions to other users."
                ],
                correct: 1,
                explanation: "Data shares are strictly read-only. Consumers cannot perform DML (INSERT/UPDATE/DELETE) on shared objects."
            },
            {
                id: "d34q3",
                type: "single",
                question: "What is the primary purpose of a Reader Account?",
                options: [
                    "To allow a Snowflake customer to query data from multiple regions.",
                    "To allow non-Snowflake customers to consume shared data.",
                    "To provide a backup environment for disaster recovery.",
                    "To act as a staging area for data loading."
                ],
                correct: 1,
                explanation: "Reader accounts are created by Providers to share data with consumers who do not have their own Snowflake accounts."
            },
            {
                id: "d34q4",
                type: "single",
                question: "Who pays for the compute costs incurred by queries run in a Reader Account?",
                options: [
                    "The Consumer (the user of the reader account)",
                    "The Provider",
                    "Snowflake",
                    "Costs are split 50/50"
                ],
                correct: 1,
                explanation: "Because the Provider creates and manages the Reader Account, all compute credits consumed by the Reader Account are billed to the Provider."
            },
            {
                id: "d34q5",
                type: "single",
                question: "You want to share data with a Snowflake account located in a different cloud provider (e.g., from AWS to Azure). What must you do first?",
                options: [
                    "Use a Reader Account.",
                    "Replicate the database to an account in the consumer's region/cloud, then share it.",
                    "Create a Data Exchange.",
                    "Use the FLATTEN function."
                ],
                correct: 1,
                explanation: "Direct sharing is only supported between accounts in the same region on the same cloud. To share cross-region or cross-cloud, you must first use Database Replication to copy the data to the target region."
            },
            {
                id: "d34q6",
                type: "single",
                question: "Which Snowflake feature enables two companies to run analytical queries combining their datasets without exposing the raw PII data to each other?",
                options: [
                    "Snowflake Marketplace",
                    "Reader Accounts",
                    "Data Clean Rooms",
                    "Dynamic Tables"
                ],
                correct: 2,
                explanation: "Data Clean Rooms provide a privacy-preserving environment where multiple parties can collaborate on data analysis without exposing raw, sensitive data."
            },
            {
                id: "d34q7",
                type: "single",
                question: "What is the primary difference between Snowflake Marketplace and a Data Exchange?",
                options: [
                    "Marketplace is for sharing data; Data Exchange is for sharing applications.",
                    "Marketplace is a public hub; Data Exchange is a private, invitation-only hub.",
                    "Marketplace requires Enterprise Edition; Data Exchange is available on Standard.",
                    "Marketplace data is copied; Data Exchange data is shared via pointers."
                ],
                correct: 1,
                explanation: "Snowflake Marketplace is public and available to all customers. A Data Exchange is a private marketplace created by an organization to share data securely with a specific, invited group of partners."
            },
            {
                id: "d34q8",
                type: "single",
                question: "What is a key difference between Secure Data Sharing and the Snowflake Native Apps Framework?",
                options: [
                    "Data Sharing uses provider compute, while Native Apps use consumer compute.",
                    "Data Sharing is only for Marketplace, while Native Apps are private.",
                    "Native Apps can include logic, code, and a UI, whereas Data Sharing only shares raw data.",
                    "Native Apps cannot be monetized."
                ],
                correct: 2,
                explanation: "While Data Sharing gives access to data, the Native Apps Framework allows providers to package data along with code (UDFs, Stored Procedures, Streamlit UI) into a full application."
            },
            {
                id: "d34q9",
                type: "single",
                question: "Where do Snowflake Native Apps execute?",
                options: [
                    "On the provider's compute resources.",
                    "On the consumer's compute resources.",
                    "On Snowflake's internal serverless compute.",
                    "On external cloud provider VMs."
                ],
                correct: 1,
                explanation: "Consumers install the Native App in their own account, and the application runs using the consumer's virtual warehouses (compute)."
            },
            {
                id: "d34q10",
                type: "single",
                question: "To replicate a database and enable failover across different cloud providers, which Snowflake edition is required?",
                options: [
                    "Standard Edition",
                    "Enterprise Edition",
                    "Business Critical Edition",
                    "Virtual Private Snowflake (VPS) only"
                ],
                correct: 2,
                explanation: "Cross-region and cross-cloud database replication and failover require the Business Critical Edition (or higher)."
            }
        ]
    },
    {
        day: 35,
        title: "Week 5 Review",
        subtitle: "Transformations & Collaboration Checkpoint",
        domain: {
            id: 5,
            name: "Data Collaboration",
            color: "#66bb6a"
        },
        estimatedTime: "60 min",
        objectives: [
            "Review optimization techniques (Clustering, Search Optimization)",
            "Review semi-structured data handling",
            "Review Stream & Task CDC pipelines",
            "Review Continuous Data Protection (Time Travel, Fail-safe, Cloning)",
            "Review Secure Data Sharing concepts"
        ],
        sections: [
            {
                title: "Week 5 Summary",
                content: `
                    <p>Congratulations on completing Week 5! You have now covered essential performance features and the entire Data Collaboration domain. Let's summarize the key exam topics:</p>
                    
                    <h4>1. Optimization</h4>
                    <ul>
                        <li><strong>Partition Pruning:</strong> Happens automatically using min/max metadata.</li>
                        <li><strong>Clustering Keys:</strong> Reorganizes data to improve pruning on multi-TB tables with range/equality filters.</li>
                        <li><strong>Search Optimization:</strong> Builds access paths to speed up point lookups (needle-in-a-haystack) on specific values.</li>
                    </ul>

                    <h4>2. Semi-Structured Data</h4>
                    <ul>
                        <li>The <code>VARIANT</code> type natively supports JSON, Parquet, Avro, etc.</li>
                        <li>Use dot and bracket notation (e.g., <code>src:customer.name</code>).</li>
                        <li><code>FLATTEN</code> converts arrays/objects into relational rows.</li>
                    </ul>

                    <h4>3. Programmability & CDC</h4>
                    <ul>
                        <li><strong>Streams:</strong> Track DML changes (CDC) by providing an offset and metadata columns.</li>
                        <li><strong>Tasks:</strong> Schedule SQL execution. Can be linked in DAGs. Serverless tasks remove warehouse management.</li>
                        <li><strong>Stored Procs vs UDFs:</strong> Procedures perform actions (called via CALL); UDFs return values (used in SELECT).</li>
                    </ul>

                    <h4>4. Data Protection</h4>
                    <ul>
                        <li><strong>Time Travel:</strong> User-accessible SQL queries on historical data (0-90 days).</li>
                        <li><strong>Fail-safe:</strong> 7-day, Snowflake-only recovery period for Permanent tables.</li>
                        <li><strong>Cloning (Zero-Copy):</strong> Instant metadata copies; storage billed only for divergent data.</li>
                    </ul>

                    <h4>5. Data Sharing</h4>
                    <ul>
                        <li>Provider pays storage, Consumer pays compute.</li>
                        <li><strong>Reader Accounts:</strong> For non-Snowflake users (Provider pays compute).</li>
                        <li><strong>Clean Rooms:</strong> Secure multi-party collaboration without exposing PII.</li>
                    </ul>
                `
            }
        ],
        quiz: [
            {
                id: "d35q1",
                type: "single",
                question: "A multi-terabyte table is frequently queried using a range filter on a timestamp column. Which optimization technique is most appropriate?",
                options: [
                    "Search Optimization Service",
                    "Clustering Key on the timestamp column",
                    "Materialized View",
                    "Increasing the warehouse size"
                ],
                correct: 1,
                explanation: "Clustering is ideal for multi-terabyte tables queried frequently with range filters, as it groups similar timestamps together for efficient partition pruning."
            },
            {
                id: "d35q2",
                type: "single",
                question: "Which of the following describes partition pruning?",
                options: [
                    "Snowflake deletes old micro-partitions to save space.",
                    "Snowflake uses metadata to skip micro-partitions that don't match query filters.",
                    "Snowflake automatically compresses micro-partitions.",
                    "Snowflake moves cold data to cheaper storage tiers."
                ],
                correct: 1,
                explanation: "Partition pruning is the process where the query optimizer uses min/max metadata to avoid scanning micro-partitions that cannot possibly contain relevant data."
            },
            {
                id: "d35q3",
                type: "single",
                question: "What function is used to unnest a JSON array stored in a VARIANT column?",
                options: [
                    "PARSE_JSON",
                    "FLATTEN",
                    "UNNEST",
                    "ARRAY_TO_STRING"
                ],
                correct: 1,
                explanation: "The FLATTEN table function explodes an array or object inside a VARIANT column into multiple rows."
            },
            {
                id: "d35q4",
                type: "single",
                question: "A stream captures an UPDATE to a row. How is this represented in a standard stream?",
                options: [
                    "One row with METADATA$ACTION = 'UPDATE'",
                    "Two rows: one DELETE and one INSERT, both with METADATA$ISUPDATE = TRUE",
                    "Two rows: one DELETE and one INSERT, both with METADATA$ISUPDATE = FALSE",
                    "Streams only capture INSERTs"
                ],
                correct: 1,
                explanation: "An update is represented as the deletion of the old record and the insertion of the new record, with the METADATA$ISUPDATE flag set to TRUE for both."
            },
            {
                id: "d35q5",
                type: "single",
                question: "How do you resume a suspended task tree (a root task and all its children)?",
                options: [
                    "ALTER TASK root_task RESUME ALL",
                    "SELECT SYSTEM$TASK_DEPENDENTS_ENABLE('root_task')",
                    "ALTER TASK tree RESUME",
                    "Tasks automatically resume when created."
                ],
                correct: 1,
                explanation: "The SYSTEM$TASK_DEPENDENTS_ENABLE function recursively resumes a root task and all of its dependent child tasks."
            },
            {
                id: "d35q6",
                type: "multi",
                question: "Which languages can be used to write a Snowflake Stored Procedure? (Select three)",
                options: [
                    "Python",
                    "C#",
                    "JavaScript",
                    "Snowflake Scripting"
                ],
                correct: [0, 2, 3],
                explanation: "Stored procedures can be written in Snowflake Scripting (SQL), JavaScript, Python, Java, and Scala."
            },
            {
                id: "d35q7",
                type: "single",
                question: "If the Time Travel retention period for a table is 14 days, how long does the Fail-safe period last?",
                options: [
                    "7 days",
                    "14 days",
                    "90 days",
                    "0 days"
                ],
                correct: 0,
                explanation: "The Fail-safe period is ALWAYS a fixed 7 days for Permanent tables, regardless of the Time Travel retention setting."
            },
            {
                id: "d35q8",
                type: "single",
                question: "Which of the following table types does NOT have a Fail-safe period?",
                options: [
                    "Permanent",
                    "Transient",
                    "Cloned Permanent",
                    "External"
                ],
                correct: 1,
                explanation: "Transient (and Temporary) tables do not have a Fail-safe period, which is why they are often used for intermediate data to save on storage costs."
            },
            {
                id: "d35q9",
                type: "single",
                question: "You created a Zero-Copy Clone of a 1 TB table. You immediately insert 50 GB of new data into the clone. How much storage are you billed for?",
                options: [
                    "1 TB",
                    "1.05 TB",
                    "50 GB",
                    "0 GB (clones are free)"
                ],
                correct: 2,
                explanation: "You are billed for the original 1 TB table. For the clone, you are ONLY billed for the 50 GB of new/divergent data."
            },
            {
                id: "d35q10",
                type: "single",
                question: "A company wants to share a database with a partner who does NOT use Snowflake. The company wants to pay for all compute costs incurred by the partner. What should they use?",
                options: [
                    "Snowflake Marketplace",
                    "A Reader Account",
                    "Secure Data Sharing",
                    "Data Clean Room"
                ],
                correct: 1,
                explanation: "A Reader Account allows a provider to share data with non-Snowflake consumers, and the provider assumes all compute costs for queries run in that account."
            },
            {
                id: "d35q11",
                type: "single",
                question: "In Secure Data Sharing, how is data physically transferred from the Provider to the Consumer?",
                options: [
                    "Data is replicated over secure TLS connections.",
                    "Data is copied to an external S3 bucket.",
                    "Data is NOT copied or transferred; the Consumer queries the Provider's storage.",
                    "Data is compressed and sent via a daily batch job."
                ],
                correct: 2,
                explanation: "The core benefit of Secure Data Sharing is that no data is copied or moved. The consumer simply queries the live data resting in the provider's account."
            },
            {
                id: "d35q12",
                type: "single",
                question: "What is the primary purpose of a Data Clean Room?",
                options: [
                    "To delete obsolete data automatically based on retention policies.",
                    "To scrub PII data from files before loading into Snowflake.",
                    "To allow multiple parties to run analytics on combined datasets without exposing raw PII.",
                    "To consolidate unused virtual warehouses."
                ],
                correct: 2,
                explanation: "Data Clean Rooms are environments that allow multi-party collaboration and analytics while strictly preserving data privacy and preventing access to raw data."
            },
            {
                id: "d35q13",
                type: "single",
                question: "Which of the following is an aggregate function used to combine multiple rows into a single JSON array?",
                options: [
                    "ARRAY_CONSTRUCT",
                    "ARRAY_AGG",
                    "FLATTEN",
                    "TO_ARRAY"
                ],
                correct: 1,
                explanation: "ARRAY_AGG takes values from multiple rows and aggregates them into a single array."
            },
            {
                id: "d35q14",
                type: "single",
                question: "When querying a stream, what happens to the data in the stream if the SELECT statement is NOT part of a DML transaction?",
                options: [
                    "The stream offset advances, and data is removed.",
                    "The stream throws an error.",
                    "The stream offset does NOT advance; the data remains in the stream for future queries.",
                    "The data is moved to the Fail-safe layer."
                ],
                correct: 2,
                explanation: "Merely querying a stream (SELECT) does not advance the offset. The offset only advances when the stream is consumed within a DML operation (INSERT, UPDATE, DELETE, MERGE)."
            },
            {
                id: "d35q15",
                type: "multi",
                question: "Which editions of Snowflake support Time Travel up to 90 days? (Select two)",
                options: [
                    "Standard Edition",
                    "Enterprise Edition",
                    "Business Critical Edition",
                    "Reader Edition"
                ],
                correct: [1, 2],
                explanation: "Enterprise Edition and higher (including Business Critical and VPS) support up to 90 days of Time Travel. Standard Edition only supports 1 day."
            }
        ]
    }
];
