window.SNOWPRO = window.SNOWPRO || {};

window.SNOWPRO.week3 = [
    {
        day: 15,
        title: "Access Control Frameworks",
        subtitle: "Understanding DAC and RBAC in Snowflake",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the difference between DAC and RBAC",
            "Learn the concept of securable objects in Snowflake",
            "Master privileges and the GRANT/REVOKE syntax"
        ],
        sections: [
            {
                title: "Introduction to Snowflake Access Control",
                content: `<p>Security is a fundamental aspect of the Snowflake Data Cloud. When you store your organization's most critical data in Snowflake, you need robust mechanisms to control who can see what and who can do what. Snowflake's access control framework is built on two primary models working together seamlessly: <strong>Discretionary Access Control (DAC)</strong> and <strong>Role-Based Access Control (RBAC)</strong>.</p>
                <div class="callout tip">
                    <div class="callout-title">💡 Key Takeaway</div>
                    <p>Unlike some traditional databases where you might grant privileges directly to users, Snowflake strictly enforces Role-Based Access Control. You grant privileges to roles, and then you grant roles to users. This indirection makes managing security at scale much easier.</p>
                </div>
                <p>Let's break down the two models:</p>
                <ul>
                    <li><strong>Discretionary Access Control (DAC):</strong> In this model, every object (like a table or a schema) has an owner. The owner has discretionary power to grant access privileges on that object to other roles. Think of it like owning a house: as the owner, you get to decide who gets a key.</li>
                    <li><strong>Role-Based Access Control (RBAC):</strong> Access privileges are assigned to <em>roles</em>, which are in turn assigned to users. A user's ability to perform an action depends on the role they are currently using. Think of a role as a hat. When you put on the 'Data Analyst' hat, you can run queries. When you wear the 'Admin' hat, you can create databases.</li>
                </ul>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>The COF-C03 exam will often test your understanding of how DAC and RBAC interact. Remember that while the <em>owner</em> of an object (DAC) has the right to grant access, those grants are always made to <em>roles</em>, not directly to users (RBAC).</p>
                </div>`
            },
            {
                title: "Securable Objects and Privileges",
                content: `<p>In Snowflake, almost everything is a <strong>securable object</strong>. This includes databases, schemas, tables, views, virtual warehouses, and even roles themselves. Every securable object exists in a logical hierarchy, starting from the root account down to specific columns or rows.</p>
                <p>To interact with a securable object, a role must be granted a specific <strong>privilege</strong>. Privileges define exactly what actions can be taken.</p>
                <table>
                    <thead>
                        <tr>
                            <th>Privilege</th>
                            <th>Description</th>
                            <th>Typical Objects</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>USAGE</code></td>
                            <td>Required to use a database, schema, or warehouse. It's often the prerequisite for other actions.</td>
                            <td>Databases, Schemas, Warehouses, Roles</td>
                        </tr>
                        <tr>
                            <td><code>SELECT</code></td>
                            <td>Allows querying data from a table or view.</td>
                            <td>Tables, Views</td>
                        </tr>
                        <tr>
                            <td><code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td>
                            <td>Allows modifying data within a table.</td>
                            <td>Tables</td>
                        </tr>
                        <tr>
                            <td><code>CREATE &lt;object&gt;</code></td>
                            <td>Allows creating new objects within a container (like creating a table in a schema).</td>
                            <td>Databases, Schemas</td>
                        </tr>
                        <tr>
                            <td><code>OWNERSHIP</code></td>
                            <td>The ultimate privilege. The role with OWNERSHIP can grant any other privilege on that object, drop it, or transfer ownership.</td>
                            <td>All Securable Objects</td>
                        </tr>
                    </tbody>
                </table>
                <div class="callout warning">
                    <div class="callout-title">⚠️ Common Misconception</div>
                    <p>Many beginners think that if they grant <code>SELECT</code> on a table to a role, that role can immediately query the table. This is false! The role must <em>also</em> have the <code>USAGE</code> privilege on both the parent database and the parent schema containing that table, plus <code>USAGE</code> on a virtual warehouse to compute the query.</p>
                </div>`
            },
            {
                title: "How DAC and RBAC Work Together (Diagram)",
                content: `<p>The following diagram illustrates how securable objects, privileges, roles, and users connect to form Snowflake's access control framework.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#111827"/>
                        <!-- Objects Layer -->
                        <rect x="50" y="50" width="150" height="260" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="125" y="80" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Securable Objects</text>
                        <rect x="70" y="110" width="110" height="40" rx="4" fill="#111827" stroke="#00e5ff"/>
                        <text x="125" y="135" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Databases</text>
                        <rect x="70" y="170" width="110" height="40" rx="4" fill="#111827" stroke="#00e5ff"/>
                        <text x="125" y="195" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Tables/Views</text>
                        <rect x="70" y="230" width="110" height="40" rx="4" fill="#111827" stroke="#00e5ff"/>
                        <text x="125" y="255" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Warehouses</text>
                        
                        <!-- Privileges Layer -->
                        <path d="M 200 180 L 280 180" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="240" y="170" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">are granted as</text>
                        
                        <rect x="290" y="50" width="150" height="260" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="365" y="80" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Privileges</text>
                        <rect x="310" y="110" width="110" height="40" rx="4" fill="#111827" stroke="#ffa726"/>
                        <text x="365" y="135" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">USAGE</text>
                        <rect x="310" y="170" width="110" height="40" rx="4" fill="#111827" stroke="#ffa726"/>
                        <text x="365" y="195" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">SELECT / DML</text>
                        <rect x="310" y="230" width="110" height="40" rx="4" fill="#111827" stroke="#ffa726"/>
                        <text x="365" y="255" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">OWNERSHIP</text>
                        
                        <!-- Roles Layer -->
                        <path d="M 440 180 L 520 180" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="480" y="170" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">are granted to</text>
                        
                        <rect x="530" y="50" width="100" height="260" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="580" y="80" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Roles</text>
                        <circle cx="580" cy="180" r="30" fill="#111827" stroke="#7c4dff" stroke-width="2"/>
                        <text x="580" y="185" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Role</text>
                        
                        <!-- Users Layer -->
                        <path d="M 630 180 L 680 180" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <text x="655" y="170" font-family="Arial" font-size="12" fill="#b0bec5" text-anchor="middle">to</text>
                        
                        <circle cx="730" cy="180" r="40" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="730" y="185" font-family="Arial" font-size="14" font-weight="bold" fill="#e8eaf6" text-anchor="middle">Users</text>
                        
                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7b8d"/>
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 1: Snowflake Access Control Flow (DAC + RBAC)</p>
                </div>`
            },
            {
                title: "GRANT and REVOKE Syntax",
                content: `<p>To manage privileges, Snowflake uses standard SQL <code>GRANT</code> and <code>REVOKE</code> commands. The syntax always involves a privilege, an object, and a role.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>-- Granting USAGE on a database to a custom role
GRANT USAGE ON DATABASE sales_db TO ROLE data_analyst;

-- Granting SELECT on a specific table
GRANT SELECT ON TABLE sales_db.public.daily_sales TO ROLE data_analyst;

-- Revoking a privilege
REVOKE SELECT ON TABLE sales_db.public.daily_sales FROM ROLE data_analyst;</code></pre>
                </div>
                <p><strong>Privilege Inheritance:</strong> In Snowflake, roles can be granted to other roles to create a role hierarchy. When Role A is granted to Role B, Role B inherits all the privileges granted to Role A. This is the cornerstone of scalable access control in Snowflake.</p>`
            }
        ],
        quiz: [
            {
                id: "d15q1",
                type: "single",
                question: "In Snowflake's access control framework, to whom are privileges directly granted?",
                options: [
                    "Individual Users",
                    "Security Groups",
                    "Roles",
                    "Virtual Warehouses"
                ],
                correct: 2,
                explanation: "In Snowflake's Role-Based Access Control (RBAC) model, privileges are strictly granted to roles, never directly to individual users. Users are then granted roles to inherit those privileges."
            },
            {
                id: "d15q2",
                type: "single",
                question: "Which of the following describes Discretionary Access Control (DAC) in Snowflake?",
                options: [
                    "All access is controlled by a central security administrator.",
                    "The owner of a securable object can grant privileges on that object to other roles.",
                    "Privileges are inherited based on the network policy of the user.",
                    "Users can discretely bypass RBAC if they are granted ACCOUNTADMIN."
                ],
                correct: 1,
                explanation: "Discretionary Access Control (DAC) means that the owner of an object (the role with the OWNERSHIP privilege) has the discretion to grant access privileges on that object to other roles."
            },
            {
                id: "d15q3",
                type: "multi",
                question: "A user is assigned the 'ANALYST' role. The 'ANALYST' role has been granted SELECT on the table `DB_PROD.SCHEMA_SALES.INVOICES`. However, the user gets an error when trying to query the table. What other privileges might the 'ANALYST' role be missing? (Select TWO)",
                options: [
                    "USAGE on the database DB_PROD",
                    "OPERATE on the table INVOICES",
                    "USAGE on the schema SCHEMA_SALES",
                    "OWNERSHIP on the database DB_PROD"
                ],
                correct: [0, 2],
                explanation: "To query a table, a role must have the SELECT privilege on the table itself, AND it must have the USAGE privilege on both the parent schema and the parent database that contain the table."
            },
            {
                id: "d15q4",
                type: "single",
                question: "Which privilege is required to drop a database in Snowflake?",
                options: [
                    "DROP",
                    "DELETE",
                    "OWNERSHIP",
                    "SYSADMIN"
                ],
                correct: 2,
                explanation: "The OWNERSHIP privilege on an object is required to drop it, alter it, or grant privileges on it to other roles."
            },
            {
                id: "d15q5",
                type: "single",
                question: "If Role A is granted to Role B, and Role B is granted to Role C, what is the relationship of privileges between the roles?",
                options: [
                    "Role A inherits privileges from Role B and Role C.",
                    "Role C inherits privileges from Role B and Role A.",
                    "Role B inherits privileges from Role C only.",
                    "There is no inheritance; privileges must be granted to each role explicitly."
                ],
                correct: 1,
                explanation: "Role hierarchies in Snowflake propagate privileges upward. If Role A is granted to B, B gets A's privileges. If B is granted to C, C gets B's privileges, which includes A's privileges. Therefore, C inherits from both."
            },
            {
                id: "d15q6",
                type: "single",
                question: "What is a 'securable object' in Snowflake?",
                options: [
                    "Only tables and views that contain PII data.",
                    "An entity to which access can be granted, such as a database, schema, table, or warehouse.",
                    "A specific network IP address allowed by a network policy.",
                    "A multi-factor authentication token."
                ],
                correct: 1,
                explanation: "A securable object is any entity in Snowflake (like databases, schemas, tables, warehouses, and roles) that can be secured using privileges granted to roles."
            }
        ]
    },
    {
        day: 16,
        title: "System Roles & Hierarchy",
        subtitle: "Snowflake's Built-in Security Foundation",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Identify the five predefined system roles in Snowflake",
            "Understand the responsibilities and privileges of each system role",
            "Learn best practices for structuring role hierarchies"
        ],
        sections: [
            {
                title: "The Five System-Defined Roles",
                content: `<p>Every Snowflake account comes with five built-in, system-defined roles. These roles form the foundation of Snowflake's security architecture and cannot be dropped. Understanding their specific purposes is crucial for both passing the SnowPro Core exam and properly administering a Snowflake account.</p>
                
                <h4>1. ACCOUNTADMIN (Account Administrator)</h4>
                <p>This is the top-level role in Snowflake. It encapsulates all the privileges of the SYSADMIN and SECURITYADMIN roles. It is the only role that can view and manage account-level billing, credit usage, and resource monitors. <strong>Best Practice:</strong> Use ACCOUNTADMIN sparingly. It should not be used for daily data operations or creating tables. Assign this role to a minimum of two highly trusted users.</p>
                
                <h4>2. SECURITYADMIN (Security Administrator)</h4>
                <p>This role is designed to manage security and access control. It has the global <code>MANAGE GRANTS</code> privilege, which allows it to modify any grant in the system, including revoking privileges granted by others. It also encapsulates the USERADMIN role.</p>
                
                <h4>3. SYSADMIN (System Administrator)</h4>
                <p>The SYSADMIN has the power to create and manage account-level objects like Virtual Warehouses, Databases, and Shares. <strong>Best Practice:</strong> All custom roles created for data access (e.g., Data Engineer, Analyst) should eventually roll up (be granted to) the SYSADMIN role. This ensures that the SYSADMIN can always manage the objects created by those custom roles.</p>
                
                <h4>4. USERADMIN (User and Role Administrator)</h4>
                <p>Dedicated solely to user and role management. A user with the USERADMIN role can execute <code>CREATE USER</code> and <code>CREATE ROLE</code> commands. They can also manage the users and roles they create. (Note: USERADMIN is inherited by SECURITYADMIN).</p>
                
                <h4>5. PUBLIC</h4>
                <p>The PUBLIC role is unique. It is an implicit role automatically granted to <em>every</em> user and role in your Snowflake account. By default, PUBLIC has no privileges on newly created databases, but it can be used to grant baseline access that every single user in the company should have.</p>`
            },
            {
                title: "System Role Hierarchy Diagram",
                content: `<p>Snowflake's system roles are arranged in a specific hierarchy out-of-the-box. Higher-level roles inherit the privileges of the roles granted to them.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#111827"/>
                        
                        <!-- Level 1 -->
                        <rect x="300" y="30" width="200" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="400" y="60" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">ACCOUNTADMIN</text>
                        
                        <!-- Arrows from L1 to L2 -->
                        <path d="M 400 80 L 300 130" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 400 80 L 500 130" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Level 2 -->
                        <rect x="200" y="140" width="180" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="290" y="170" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">SECURITYADMIN</text>
                        
                        <rect x="420" y="140" width="180" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="510" y="170" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">SYSADMIN</text>
                        
                        <!-- Arrows from L2 to L3 -->
                        <path d="M 290 190 L 290 240" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 510 190 L 510 330" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Level 3 -->
                        <rect x="200" y="250" width="180" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="290" y="280" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">USERADMIN</text>
                        
                        <!-- Arrows from L3 to Custom / Public -->
                        <path d="M 290 300 L 400 340" stroke="#6b7b8d" stroke-width="2" stroke-dasharray="5,5" marker-end="url(#arrow)"/>
                        
                        <!-- Level 4 -->
                        <rect x="420" y="340" width="180" height="50" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2" stroke-dasharray="4"/>
                        <text x="510" y="370" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">[Custom Roles]</text>
                        
                        <rect x="300" y="340" width="100" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="350" y="370" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">PUBLIC</text>
                        
                        <text x="100" y="100" font-family="Arial" font-size="12" fill="#b0bec5">Arrows indicate: "Role is granted to..."</text>
                        <text x="100" y="120" font-family="Arial" font-size="12" fill="#b0bec5">(Upward privilege inheritance)</text>

                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7b8d"/>
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 2: System Role Inheritance Hierarchy. Notice how ACCOUNTADMIN inherits everything.</p>
                </div>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>Remember this specific relationship: <strong>SECURITYADMIN inherits USERADMIN</strong>, and <strong>ACCOUNTADMIN inherits SECURITYADMIN and SYSADMIN</strong>. The exam frequently asks which role should be used to create custom roles (USERADMIN) versus creating warehouses (SYSADMIN).</p>
                </div>`
            },
            {
                title: "Best Practices for System Roles",
                content: `<ul>
                    <li><strong>Least Privilege:</strong> Users should be granted the lowest level role that allows them to perform their daily tasks.</li>
                    <li><strong>Avoid using ACCOUNTADMIN for everyday work:</strong> Because ACCOUNTADMIN has unlimited power (including dropping entire databases and viewing billing), logging in as ACCOUNTADMIN for basic querying is a massive security risk.</li>
                    <li><strong>Align Custom Roles to SYSADMIN:</strong> When you create custom roles (e.g., <code>MARKETING_ANALYST</code>), you should grant that custom role to SYSADMIN. Why? Because if a custom role creates a table and owns it, you want your central IT/DBA team (acting as SYSADMIN) to have inherited privileges to manage or drop that table if the original user leaves the company.</li>
                </ul>`
            }
        ],
        quiz: [
            {
                id: "d16q1",
                type: "single",
                question: "Which system-defined role has the global MANAGE GRANTS privilege by default?",
                options: [
                    "ACCOUNTADMIN",
                    "SYSADMIN",
                    "SECURITYADMIN",
                    "USERADMIN"
                ],
                correct: 2,
                explanation: "The SECURITYADMIN role includes the MANAGE GRANTS privilege, which allows it to modify any grant in the system. (ACCOUNTADMIN also has it by inheritance, but SECURITYADMIN is the primary role designed for this)."
            },
            {
                id: "d16q2",
                type: "single",
                question: "Which role is highly recommended to be the owner of all custom roles and databases in a Snowflake account?",
                options: [
                    "ACCOUNTADMIN",
                    "SECURITYADMIN",
                    "SYSADMIN",
                    "PUBLIC"
                ],
                correct: 2,
                explanation: "Best practice dictates that custom roles and top-level database objects should roll up to the SYSADMIN role, ensuring central administrators can manage all objects without needing the super-user ACCOUNTADMIN role."
            },
            {
                id: "d16q3",
                type: "single",
                question: "A junior DBA needs the ability to create new users and assign them basic custom roles, but should NOT be able to view billing or create warehouses. Which system role is most appropriate?",
                options: [
                    "SECURITYADMIN",
                    "USERADMIN",
                    "SYSADMIN",
                    "ACCOUNTADMIN"
                ],
                correct: 1,
                explanation: "USERADMIN is dedicated to creating and managing users and roles. It does not have the broader security powers of SECURITYADMIN or the system creation powers of SYSADMIN."
            },
            {
                id: "d16q4",
                type: "single",
                question: "Which role is automatically granted to every user in a Snowflake account?",
                options: [
                    "USERADMIN",
                    "DEFAULT",
                    "PUBLIC",
                    "SYSADMIN"
                ],
                correct: 2,
                explanation: "The PUBLIC role is a pseudo-role that is implicitly granted to every user and every role in the account."
            },
            {
                id: "d16q5",
                type: "multi",
                question: "The ACCOUNTADMIN role directly inherits the privileges of which two system roles? (Select TWO)",
                options: [
                    "SYSADMIN",
                    "USERADMIN",
                    "SECURITYADMIN",
                    "PUBLIC"
                ],
                correct: [0, 2],
                explanation: "ACCOUNTADMIN directly inherits the privileges of both SYSADMIN and SECURITYADMIN. It inherits USERADMIN indirectly through SECURITYADMIN."
            },
            {
                id: "d16q6",
                type: "single",
                question: "Which system role can view the account's credit consumption, billing information, and resource monitors?",
                options: [
                    "SYSADMIN",
                    "ACCOUNTADMIN",
                    "SECURITYADMIN",
                    "FINANCEADMIN"
                ],
                correct: 1,
                explanation: "Only the ACCOUNTADMIN role can view and manage account-level billing, credit usage, and resource monitors."
            },
            {
                id: "d16q7",
                type: "single",
                question: "You want to ensure that a custom role named `DATA_ENGINEER` can be managed by the system administrators. What command should you run?",
                options: [
                    "GRANT ROLE SYSADMIN TO ROLE DATA_ENGINEER;",
                    "GRANT ROLE DATA_ENGINEER TO ROLE SYSADMIN;",
                    "ALTER ROLE DATA_ENGINEER SET PARENT = SYSADMIN;",
                    "GRANT OWNERSHIP ON ROLE DATA_ENGINEER TO ROLE SYSADMIN;"
                ],
                correct: 1,
                explanation: "To allow SYSADMIN to manage the custom role and inherit its privileges, you grant the custom role TO the SYSADMIN role: `GRANT ROLE DATA_ENGINEER TO ROLE SYSADMIN;`"
            },
            {
                id: "d16q8",
                type: "single",
                question: "Can the PUBLIC role be dropped?",
                options: [
                    "Yes, by the ACCOUNTADMIN.",
                    "Yes, by the SECURITYADMIN.",
                    "No, system-defined roles cannot be dropped.",
                    "No, unless all users are deleted first."
                ],
                correct: 2,
                explanation: "None of the five system-defined roles (ACCOUNTADMIN, SECURITYADMIN, SYSADMIN, USERADMIN, PUBLIC) can be dropped."
            }
        ]
    },
    {
        day: 17,
        title: "Custom Roles & Privileges",
        subtitle: "Designing Scalable Access Architectures",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Learn how to create and manage custom roles",
            "Understand the concepts of functional vs. access roles",
            "Master the concept of Future Grants and the OWNERSHIP privilege"
        ],
        sections: [
            {
                title: "Creating Custom Roles",
                content: `<p>While system roles govern the administration of the Snowflake account itself, you must create <strong>custom roles</strong> to govern access to your actual data. You rarely grant object privileges (like SELECT on a table) directly to system roles. Instead, you create custom roles aligned with your organizational structure.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>-- Typical flow for creating a custom role
USE ROLE USERADMIN;
CREATE ROLE hr_analyst;

-- Granting privileges (requires SYSADMIN or object owner)
USE ROLE SYSADMIN;
GRANT USAGE ON DATABASE hr_db TO ROLE hr_analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA hr_db.public TO ROLE hr_analyst;

-- Assigning role to a user
USE ROLE USERADMIN;
GRANT ROLE hr_analyst TO USER jane_doe;

-- Establishing hierarchy (Best Practice!)
GRANT ROLE hr_analyst TO ROLE SYSADMIN;</code></pre>
                </div>`
            },
            {
                title: "Access Roles vs. Functional Roles",
                content: `<p>To build a scalable and maintainable security model in Snowflake, it is a highly recommended best practice to separate your custom roles into two categories:</p>
                <ul>
                    <li><strong>Access Roles:</strong> These roles are tied directly to securable objects. Their only job is to bundle privileges. For example, a role named <code>HR_DB_READ_ONLY</code> would be granted USAGE on the HR database and SELECT on its tables. You <em>do not</em> assign Access Roles directly to users.</li>
                    <li><strong>Functional Roles:</strong> These roles are tied to the people in your organization (job functions). For example, <code>HR_ANALYST</code>. You <em>do not</em> grant object privileges directly to Functional Roles. Instead, you grant Access Roles TO Functional Roles.</li>
                </ul>
                <div class="callout tip">
                    <div class="callout-title">💡 Key Takeaway</div>
                    <p>By separating Access and Functional roles, if a new HR Analyst joins, you just grant them the <code>HR_ANALYST</code> functional role. If the HR department suddenly needs access to a new 'Benefits' database, you just grant the <code>BENEFITS_DB_READ</code> access role to the <code>HR_ANALYST</code> functional role. It keeps security modular.</p>
                </div>`
            },
            {
                title: "Custom Role Hierarchy (Diagram)",
                content: `<p>Here is how a best-practice role hierarchy looks, integrating system roles, functional roles, and access roles.</p>
                <div class="diagram-container">
                    <svg viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#111827"/>
                        
                        <!-- System Role -->
                        <rect x="300" y="20" width="200" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="400" y="50" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">SYSADMIN</text>
                        
                        <!-- Functional Roles -->
                        <rect x="150" y="120" width="180" height="50" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="240" y="150" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Functional: DATA_ENG</text>
                        
                        <rect x="470" y="120" width="180" height="50" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="560" y="150" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Functional: ANALYST</text>
                        
                        <!-- Arrows from Functional to Sysadmin -->
                        <path d="M 240 120 L 350 70" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 560 120 L 450 70" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Access Roles -->
                        <rect x="50" y="220" width="200" height="50" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="150" y="250" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Access: ETL_PROD_RW</text>
                        
                        <rect x="300" y="220" width="200" height="50" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="400" y="250" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Access: SALES_DB_READ</text>
                        
                        <rect x="550" y="220" width="200" height="50" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="650" y="250" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Access: WH_LARGE_USE</text>
                        
                        <!-- Arrows from Access to Functional -->
                        <path d="M 150 220 L 200 170" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 400 220 L 260 170" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 400 220 L 540 170" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 650 220 L 580 170" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        
                        <!-- Data Objects -->
                        <path d="M 150 290 L 150 330" stroke="#ffa726" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>
                        <text x="150" y="360" font-family="Arial" font-size="12" fill="#ffa726" text-anchor="middle">Grants to Tables</text>
                        
                        <path d="M 400 290 L 400 330" stroke="#ffa726" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>
                        <text x="400" y="360" font-family="Arial" font-size="12" fill="#ffa726" text-anchor="middle">Grants to Tables</text>
                        
                        <path d="M 650 290 L 650 330" stroke="#ffa726" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>
                        <text x="650" y="360" font-family="Arial" font-size="12" fill="#ffa726" text-anchor="middle">Grants to Warehouse</text>

                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7b8d"/>
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 3: Custom Role Hierarchy mapping Access roles to Functional roles.</p>
                </div>`
            },
            {
                title: "Future Grants",
                content: `<p>A common administrative headache in traditional databases is that when a new table is created, you have to remember to grant permissions on it to your analysts. Snowflake solves this with <strong>Future Grants</strong>.</p>
                <p>Future grants allow you to define privileges for objects that <em>do not exist yet</em>. When a new object of that type is created in the specified schema or database, the privilege is automatically granted to the specified role.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>-- Any new table created in the future in this schema will automatically
-- have SELECT granted to the data_analyst role
GRANT SELECT ON FUTURE TABLES IN SCHEMA sales_db.public TO ROLE data_analyst;</code></pre>
                </div>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>Future grants only apply to objects created <em>after</em> the future grant statement was run. They do not retroactively apply to existing objects. You must run a standard <code>GRANT ... ON ALL TABLES</code> for existing objects, and a <code>GRANT ... ON FUTURE TABLES</code> for new ones.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d17q1",
                type: "single",
                question: "What is the primary benefit of separating Access Roles from Functional Roles in Snowflake?",
                options: [
                    "It is a hard requirement to use the ACCOUNTADMIN role.",
                    "It increases query performance by caching permissions.",
                    "It allows for easier management and scaling of permissions by decoupling database object access from human job functions.",
                    "It automatically encrypts the data accessed by functional roles."
                ],
                correct: 2,
                explanation: "Separating roles allows administrators to manage access granularly (Access Roles) and easily assign bundled privileges to users based on their job titles (Functional Roles), making the security model highly scalable and maintainable."
            },
            {
                id: "d17q2",
                type: "single",
                question: "You want a role named `ANALYST` to automatically be able to query any new table that gets created in the `RAW_DATA` schema tomorrow. What command should you use?",
                options: [
                    "GRANT SELECT ON ALL TABLES IN SCHEMA RAW_DATA TO ROLE ANALYST;",
                    "GRANT SELECT ON FUTURE TABLES IN SCHEMA RAW_DATA TO ROLE ANALYST;",
                    "ALTER SCHEMA RAW_DATA SET AUTO_GRANT_SELECT = ANALYST;",
                    "GRANT USAGE ON SCHEMA RAW_DATA TO ROLE ANALYST;"
                ],
                correct: 1,
                explanation: "The `ON FUTURE TABLES` syntax ensures that privileges are automatically granted on objects that are created after the command is executed."
            },
            {
                id: "d17q3",
                type: "multi",
                question: "Which of the following statements about Future Grants are TRUE? (Select TWO)",
                options: [
                    "Future grants retroactively apply to existing objects in the schema.",
                    "Future grants can be defined at the database level or the schema level.",
                    "If a future grant conflicts with an explicit grant, the future grant takes precedence.",
                    "Future grants only apply to objects created after the grant is defined."
                ],
                correct: [1, 3],
                explanation: "Future grants only apply to newly created objects (not retroactive), and they can be scoped to either a specific schema or an entire database."
            },
            {
                id: "d17q4",
                type: "single",
                question: "Role A is granted OWNERSHIP on Table X. Role A is granted to Role B. Can a user operating under Role B drop Table X?",
                options: [
                    "Yes, because Role B inherits the OWNERSHIP privilege from Role A.",
                    "No, OWNERSHIP cannot be inherited.",
                    "Only if Role B is also granted the DROP privilege.",
                    "Only if Role B is SYSADMIN."
                ],
                correct: 0,
                explanation: "Privileges, including OWNERSHIP, are inherited through role hierarchies. Because B inherits A, B can act as the owner of Table X."
            },
            {
                id: "d17q5",
                type: "single",
                question: "In a best-practice role hierarchy, which type of role should be granted directly to users?",
                options: [
                    "System roles (like SYSADMIN)",
                    "Access roles (like DB_READ_ONLY)",
                    "Functional roles (like HR_ANALYST)",
                    "Account roles (like ACCOUNTADMIN)"
                ],
                correct: 2,
                explanation: "Functional roles map to business functions (e.g., HR_ANALYST) and are the roles that should be granted directly to human users."
            },
            {
                id: "d17q6",
                type: "single",
                question: "Which role is typically responsible for executing the `CREATE ROLE` command to create new custom functional roles?",
                options: [
                    "SYSADMIN",
                    "USERADMIN",
                    "PUBLIC",
                    "The object owner"
                ],
                correct: 1,
                explanation: "USERADMIN is the system-defined role specifically designated for creating and managing users and roles."
            },
            {
                id: "d17q7",
                type: "single",
                question: "You run `GRANT SELECT ON ALL TABLES IN SCHEMA X TO ROLE Y`. What happens to a table created in Schema X the next day?",
                options: [
                    "Role Y can query it automatically.",
                    "Role Y cannot query it unless a new GRANT command is issued.",
                    "Role Y can query it, but only if they also have FUTURE GRANTS.",
                    "The table will throw an error upon creation."
                ],
                correct: 1,
                explanation: "The `ON ALL TABLES` command only applies to tables that currently exist at the exact moment the command is run. For future tables, you must explicitly use `ON FUTURE TABLES`."
            }
        ]
    },
    {
        day: 18,
        title: "Authentication Methods",
        subtitle: "Securing Access to Your Snowflake Account",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand the various authentication methods available in Snowflake",
            "Identify the use cases for MFA, SSO, and Key-Pair Authentication",
            "Learn about Authentication Policies introduced in COF-C03"
        ],
        sections: [
            {
                title: "User Authentication Options",
                content: `<p>Before a user can assume a role and access data, they must prove their identity to Snowflake. Snowflake supports a wide array of authentication methods, catering to both human users and automated applications.</p>
                
                <h4>1. Password-Based Authentication</h4>
                <p>This is the default method. Users authenticate using a username and a complex password stored securely in Snowflake. Snowflake supports strict password policies (length, complexity, expiration) which can be enforced at the account or user level.</p>
                
                <h4>2. Multi-Factor Authentication (MFA)</h4>
                <p>Snowflake provides built-in MFA powered by Duo Security. It requires users to approve a push notification or enter a passcode from their mobile device in addition to their password. <strong>Crucially:</strong> MFA is not enabled by default for users. Users must self-enroll, or administrators can enforce MFA via Authentication Policies.</p>
                
                <h4>3. Federated Authentication / SSO (SAML 2.0)</h4>
                <p>Single Sign-On (SSO) allows users to log into Snowflake using their existing corporate credentials via an external Identity Provider (IdP) like Okta, Azure Active Directory, or Ping Identity. Snowflake acts as the Service Provider via the SAML 2.0 protocol. This is highly recommended for enterprise human access.</p>`
            },
            {
                title: "Programmatic Authentication",
                content: `<p>Applications, scripts, and BI tools need to authenticate without human intervention. Passwords and MFA are generally unsuitable for this.</p>
                
                <h4>1. Key-Pair Authentication</h4>
                <p>For programmatic clients (like Python scripts, Snowpipe, or JDBC/ODBC drivers), Key-Pair Authentication is the most secure method. It uses RSA 2048-bit (minimum) public/private key pairs. The public key is assigned to the Snowflake user, and the private key stays on the client machine. This eliminates the need to hardcode passwords in scripts.</p>
                
                <h4>2. OAuth</h4>
                <p>OAuth allows external applications to request authorized access to Snowflake on behalf of a user, without the user having to share their password with the application. Snowflake supports both External OAuth (where authorization is handled by an external authorization server like Okta) and Snowflake OAuth (where Snowflake is the authorization server).</p>
                
                <h4>3. SCIM (System for Cross-domain Identity Management)</h4>
                <p>While not strictly an <em>authentication</em> method, SCIM is vital for identity management. It allows your IdP (like Azure AD) to automatically create, update, and disable users and roles in Snowflake. When an employee is fired and removed from Azure AD, SCIM automatically disables their Snowflake account.</p>`
            },
            {
                title: "Authentication Policies",
                content: `<p>Newer to the Snowflake security model (and highly relevant for COF-C03) are <strong>Authentication Policies</strong>. An authentication policy is a first-class object that allows administrators to strictly control <em>how</em> a user can authenticate.</p>
                <p>For example, you can create a policy that says: "Users assigned this policy can ONLY authenticate via SAML SSO, and passwords are disabled." You can attach authentication policies at the Account level (applies to everyone) or to specific Users.</p>
                <div class="callout warning">
                    <div class="callout-title">⚠️ Common Misconception</div>
                    <p>Simply configuring SSO in Snowflake does not automatically disable passwords. A user could technically still log in via the Snowflake UI using a local password unless an Authentication Policy is applied to restrict them to SSO only.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d18q1",
                type: "single",
                question: "Which authentication method is recommended as the most secure approach for an automated Python script connecting to Snowflake via the Python Connector?",
                options: [
                    "Multi-Factor Authentication (MFA)",
                    "Key-Pair Authentication",
                    "Single Sign-On (SAML)",
                    "Password Authentication with an Authentication Policy"
                ],
                correct: 1,
                explanation: "Key-Pair Authentication (using RSA key pairs) is the most secure and recommended method for programmatic, automated access as it removes the need to store passwords in code."
            },
            {
                id: "d18q2",
                type: "single",
                question: "Snowflake's built-in Multi-Factor Authentication (MFA) relies on which third-party service?",
                options: [
                    "Google Authenticator",
                    "Microsoft Authenticator",
                    "Duo Security",
                    "Okta Verify"
                ],
                correct: 2,
                explanation: "Snowflake's integrated MFA feature is powered by Duo Security."
            },
            {
                id: "d18q3",
                type: "multi",
                question: "What are the primary benefits of implementing SCIM integration with Snowflake? (Select TWO)",
                options: [
                    "It automatically provisions users from an Identity Provider into Snowflake.",
                    "It automatically encrypts network traffic between the IdP and Snowflake.",
                    "It allows external applications to query Snowflake without a password using OAuth tokens.",
                    "It automatically deprovisions (disables) users in Snowflake when they are removed from the Identity Provider."
                ],
                correct: [0, 3],
                explanation: "SCIM (System for Cross-domain Identity Management) is used for automated user lifecycle management—specifically provisioning (creating) and deprovisioning (disabling) users and roles automatically based on changes in a central Identity Provider."
            },
            {
                id: "d18q4",
                type: "single",
                question: "You want to ensure that all human users can ONLY log in using your company's Okta SSO, and completely prevent them from using a username/password. What Snowflake feature should you use?",
                options: [
                    "Network Policy",
                    "Authentication Policy",
                    "Row Access Policy",
                    "SCIM integration"
                ],
                correct: 1,
                explanation: "Authentication Policies allow administrators to dictate exactly which authentication methods are permitted for a user or the entire account, effectively allowing you to disable password-based logins in favor of SSO."
            },
            {
                id: "d18q5",
                type: "single",
                question: "Which protocol does Snowflake use to facilitate Federated Authentication (SSO)?",
                options: [
                    "LDAP",
                    "SAML 2.0",
                    "RADIUS",
                    "Kerberos"
                ],
                correct: 1,
                explanation: "Snowflake uses the SAML 2.0 (Security Assertion Markup Language) protocol to act as a Service Provider and integrate with Identity Providers for SSO."
            },
            {
                id: "d18q6",
                type: "single",
                question: "Is Multi-Factor Authentication (MFA) enabled automatically for all new users created in Snowflake?",
                options: [
                    "Yes, it is strictly enforced by default.",
                    "Yes, but only for users granted the ACCOUNTADMIN role.",
                    "No, users must self-enroll in MFA, or an administrator must enforce it via policy.",
                    "No, MFA is only available in the Business Critical edition."
                ],
                correct: 2,
                explanation: "By default, MFA is not enforced. Users must choose to enroll themselves via the Snowflake UI, unless an administrator uses an Authentication Policy to mandate MFA usage."
            }
        ]
    },
    {
        day: 19,
        title: "Network Security & Encryption",
        subtitle: "Securing the Perimeter and Data at Rest",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand how Network Policies restrict access by IP address",
            "Learn about private connectivity options (PrivateLink)",
            "Understand Snowflake's encryption layers (Tri-Secret Secure)"
        ],
        sections: [
            {
                title: "Network Policies (IP Allow/Block Lists)",
                content: `<p>Network Policies provide the first line of defense in Snowflake's security architecture. They allow administrators to restrict access to the Snowflake account based on the user's origin IP address.</p>
                <p>A network policy consists of two lists:</p>
                <ul>
                    <li><strong>Allowed IP List:</strong> The specific IP addresses or CIDR blocks permitted to access Snowflake. If this list is populated, <em>all other IPs are implicitly blocked</em>.</li>
                    <li><strong>Blocked IP List:</strong> Specific IPs explicitly denied access. This is useful for blocking specific malicious IPs, or carving out a specific subset of IPs from a broader Allowed CIDR block. Block lists always take precedence over Allow lists.</li>
                </ul>
                <p>Network policies can be applied at two levels:</p>
                <ol>
                    <li><strong>Account-level:</strong> Applies to all users in the account.</li>
                    <li><strong>User-level:</strong> Applied to a specific user. <strong>Important:</strong> A user-level policy completely overrides an account-level policy for that user. It does not merge with it.</li>
                </ol>
                <div class="callout exam-tip">
                    <div class="callout-title">📝 Exam Tip</div>
                    <p>If an IP address is on BOTH the Allowed list and the Blocked list of the same policy, the Blocked list wins. The connection is denied.</p>
                </div>`
            },
            {
                title: "Private Connectivity",
                content: `<p>By default, connections to Snowflake travel over the public internet (though encrypted via TLS). For highly regulated industries, this might not be acceptable. Snowflake supports private connectivity bypassing the public internet entirely.</p>
                <p>Depending on your cloud provider, this is achieved using:</p>
                <ul>
                    <li><strong>AWS PrivateLink</strong> (Amazon Web Services)</li>
                    <li><strong>Azure Private Link</strong> (Microsoft Azure)</li>
                    <li><strong>Google Cloud Private Service Connect</strong> (GCP)</li>
                </ul>
                <p>With private connectivity, your corporate VPC (Virtual Private Cloud) connects directly to Snowflake's VPC on the cloud provider's internal backbone. <em>Note: This feature requires the Business Critical edition or higher.</em></p>`
            },
            {
                title: "Data Encryption",
                content: `<p>Snowflake is highly secure by default regarding encryption. You cannot turn encryption off.</p>
                <ul>
                    <li><strong>In Transit:</strong> All communication between the client and Snowflake, and between Snowflake nodes, is encrypted using TLS 1.2 (or higher).</li>
                    <li><strong>At Rest:</strong> All data stored in Snowflake micro-partitions, as well as data stored in internal stages, is encrypted using AES-256 bit encryption. Keys are managed by Snowflake and rotated automatically every 30 days (Key Rotation).</li>
                </ul>
                <h4>Tri-Secret Secure</h4>
                <p>For ultimate control, Business Critical edition offers <strong>Tri-Secret Secure</strong>. By default, Snowflake manages the encryption keys. With Tri-Secret Secure, the data is encrypted using a composite master key. This composite key is made by combining a Snowflake-managed key AND a Customer-Managed Key (CMK) hosted in your own cloud account (e.g., AWS KMS). If you revoke access to your CMK, Snowflake immediately loses the ability to decrypt your data.</p>`
            },
            {
                title: "Network Security Layers (Diagram)",
                content: `<div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#111827"/>
                        
                        <!-- Client -->
                        <rect x="50" y="160" width="100" height="60" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="100" y="195" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Client App</text>
                        
                        <!-- TLS In Transit -->
                        <path d="M 150 190 L 250 190" stroke="#66bb6a" stroke-width="3" stroke-dasharray="5,5" marker-end="url(#arrow-green)"/>
                        <text x="200" y="180" font-family="Arial" font-size="12" fill="#66bb6a" text-anchor="middle">TLS 1.2 Encrypted</text>
                        
                        <!-- Snowflake Perimeter -->
                        <rect x="250" y="50" width="450" height="300" rx="15" fill="#111827" stroke="#7c4dff" stroke-width="3" stroke-dasharray="10"/>
                        <text x="475" y="80" font-family="Arial" font-size="16" font-weight="bold" fill="#7c4dff" text-anchor="middle">Snowflake Cloud VPC</text>
                        
                        <!-- Network Policy Shield -->
                        <rect x="280" y="140" width="120" height="100" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="340" y="180" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Network</text>
                        <text x="340" y="200" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Policy</text>
                        <text x="340" y="225" font-family="Arial" font-size="10" fill="#b0bec5" text-anchor="middle">IP Allow/Block</text>
                        
                        <!-- Authentication Shield -->
                        <rect x="430" y="140" width="120" height="100" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="490" y="180" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Auth</text>
                        <text x="490" y="200" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Policy</text>
                        <text x="490" y="225" font-family="Arial" font-size="10" fill="#b0bec5" text-anchor="middle">SSO / MFA / Keys</text>
                        
                        <!-- Data At Rest -->
                        <rect x="580" y="140" width="100" height="100" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="630" y="180" font-family="Arial" font-size="14" fill="#e8eaf6" text-anchor="middle">Storage</text>
                        <text x="630" y="210" font-family="Arial" font-size="12" fill="#ffa726" text-anchor="middle">AES-256</text>
                        
                        <!-- Arrows inside -->
                        <path d="M 400 190 L 430 190" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>
                        <path d="M 550 190 L 580 190" stroke="#6b7b8d" stroke-width="2" marker-end="url(#arrow)"/>

                        <defs>
                            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7b8d"/>
                            </marker>
                            <marker id="arrow-green" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#66bb6a"/>
                            </marker>
                        </defs>
                    </svg>
                    <p class="diagram-caption">Figure 4: The layers of network and encryption security in Snowflake.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d19q1",
                type: "single",
                question: "An IP address (192.168.1.50) is listed in the Allowed list of a Network Policy. The exact same IP address is also added to the Blocked list of the same Network Policy. Can a user connect from 192.168.1.50?",
                options: [
                    "Yes, Allow lists take precedence.",
                    "No, Blocked lists always take precedence over Allowed lists.",
                    "It depends on whether it is an Account-level or User-level policy.",
                    "Yes, but they will be forced to use MFA."
                ],
                correct: 1,
                explanation: "In Snowflake Network Policies, if an IP exists in both lists, the Blocked list always takes precedence, and the connection will be denied."
            },
            {
                id: "d19q2",
                type: "single",
                question: "An Account-level network policy restricts access to IPs in range A. A User-level network policy is created for User X that allows access from IP range B. From which IP ranges can User X log in?",
                options: [
                    "Only Range A",
                    "Only Range B",
                    "Both Range A and Range B",
                    "Neither, the conflicting policies will lock the account"
                ],
                correct: 1,
                explanation: "User-level network policies completely override Account-level policies for that specific user. They do not merge. User X will only be able to log in from Range B."
            },
            {
                id: "d19q3",
                type: "single",
                question: "Which feature allows you to combine a Snowflake-managed encryption key with a Customer-Managed Key (CMK) in AWS/Azure/GCP to create a composite master encryption key?",
                options: [
                    "Key-Pair Authentication",
                    "Tri-Secret Secure",
                    "End-to-End Encryption (E2EE)",
                    "PrivateLink"
                ],
                correct: 1,
                explanation: "Tri-Secret Secure is the feature (available in Business Critical edition) that combines a customer-managed key with a Snowflake-managed key to encrypt data at rest."
            },
            {
                id: "d19q4",
                type: "single",
                question: "Can an administrator disable data-at-rest encryption for a specific database in Snowflake to improve query performance?",
                options: [
                    "Yes, using the ALTER DATABASE command.",
                    "Yes, but only if they contact Snowflake Support.",
                    "No, all data at rest is encrypted automatically using AES-256 and cannot be turned off.",
                    "No, but they can lower the encryption level to AES-128."
                ],
                correct: 2,
                explanation: "Encryption at rest (using AES-256) is built into the core architecture of Snowflake. It is automatic, transparent, and cannot be disabled under any circumstances."
            },
            {
                id: "d19q5",
                type: "single",
                question: "Which Snowflake edition is the minimum required to utilize AWS PrivateLink for private connectivity?",
                options: [
                    "Standard",
                    "Enterprise",
                    "Business Critical",
                    "Virtual Private Snowflake (VPS)"
                ],
                correct: 2,
                explanation: "Private connectivity features like AWS PrivateLink, Azure Private Link, and Google Cloud Private Service Connect require the Business Critical edition or higher."
            },
            {
                id: "d19q6",
                type: "single",
                question: "What encryption protocol is used for data in transit between the client application and Snowflake?",
                options: [
                    "TLS 1.2 or higher",
                    "SSL 3.0",
                    "AES-256",
                    "RSA 2048"
                ],
                correct: 0,
                explanation: "Data in transit is protected using Transport Layer Security (TLS) version 1.2 or higher."
            }
        ]
    },
    {
        day: 20,
        title: "Data Governance",
        subtitle: "Masking, Tagging, and Row-Level Security",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#7c4dff"
        },
        estimatedTime: "90 min",
        objectives: [
            "Understand Dynamic Data Masking and Row Access Policies",
            "Learn how Object Tagging and Data Classification aid in governance",
            "Understand Data Lineage and Access History features"
        ],
        sections: [
            {
                title: "Dynamic Data Masking",
                content: `<p>Dynamic Data Masking allows you to obscure sensitive data (like SSNs, credit card numbers, or PII) at query time. The underlying data stored on disk is NOT changed. Instead, Snowflake intercepts the query and masks the result based on the role of the user executing the query.</p>
                <div class="code-block">
                    <div class="code-header">SQL</div>
                    <pre><code>-- Create a masking policy
CREATE OR REPLACE MASKING POLICY ssn_mask AS (val string) RETURNS string ->
  CASE
    WHEN current_role() IN ('HR_ADMIN') THEN val
    ELSE '***-**-****'
  END;

-- Apply it to a column
ALTER TABLE employees MODIFY COLUMN ssn SET MASKING POLICY ssn_mask;</code></pre>
                </div>
                <p>In this example, only the <code>HR_ADMIN</code> role sees the real SSN. Every other role sees <code>***-**-****</code>.</p>`
            },
            {
                title: "Row Access Policies",
                content: `<p>While Data Masking hides specific <em>columns</em>, <strong>Row Access Policies</strong> filter which <em>rows</em> a user is allowed to see. It is effectively an automated <code>WHERE</code> clause added to every query against the table.</p>
                <p>Use cases include:</p>
                <ul>
                    <li><strong>Multi-tenant applications:</strong> Ensuring Tenant A can only query rows where <code>tenant_id = 'A'</code>.</li>
                    <li><strong>Regional filtering:</strong> Ensuring the 'EU_MANAGER' role can only see rows where <code>region = 'EU'</code>.</li>
                </ul>`
            },
            {
                title: "Tags and Classification",
                content: `<p><strong>Object Tagging</strong> allows you to apply key-value pairs to objects (databases, tables, columns, warehouses) for tracking and compliance. For example, tagging a column with <code>sensitivity='PII'</code> or a warehouse with <code>cost_center='Marketing'</code>.</p>
                <p><strong>Tag-Based Masking:</strong> A powerful feature where you assign a masking policy to a <em>tag</em>, rather than a column. Then, any column in the account that receives that tag is automatically masked!</p>
                <p><strong>Data Classification:</strong> Snowflake provides built-in machine learning functions that can scan your tables, identify potentially sensitive data (like names, emails, addresses), and automatically apply appropriate system tags to those columns.</p>`
            },
            {
                title: "Lineage and Access History",
                content: `<p>To comply with auditing regulations, you must know who accessed data and where data originated.</p>
                <ul>
                    <li><strong>Access History:</strong> The <code>SNOWFLAKE.ACCOUNT_USAGE.ACCESS_HISTORY</code> view tracks exactly which user queried which columns on which tables, providing an immutable audit trail.</li>
                    <li><strong>Data Lineage:</strong> Tracks how data flows through your system. If Table A feeds into View B, which is inserted into Table C, Snowflake tracks this graph. This is viewable in Snowsight to help understand upstream and downstream impacts of changes.</li>
                </ul>`
            },
            {
                title: "Governance Framework (Diagram)",
                content: `<div class="diagram-container">
                    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
                        <rect width="100%" height="100%" fill="#111827"/>
                        
                        <!-- Layers from Bottom Up -->
                        
                        <!-- 1. Discover -->
                        <rect x="150" y="300" width="500" height="50" rx="8" fill="#1a3a5c" stroke="#29b5f6" stroke-width="2"/>
                        <text x="400" y="330" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">1. Know Your Data (Classification)</text>
                        
                        <!-- 2. Classify -->
                        <rect x="175" y="230" width="450" height="50" rx="8" fill="#2a1a4e" stroke="#7c4dff" stroke-width="2"/>
                        <text x="400" y="260" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">2. Label Your Data (Object Tagging)</text>
                        
                        <!-- 3. Protect -->
                        <rect x="200" y="160" width="400" height="50" rx="8" fill="#3a2a0a" stroke="#ffa726" stroke-width="2"/>
                        <text x="400" y="190" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">3. Protect Data (Masking / Row Policies)</text>
                        
                        <!-- 4. Monitor -->
                        <rect x="225" y="90" width="350" height="50" rx="8" fill="#0a3a3a" stroke="#00e5ff" stroke-width="2"/>
                        <text x="400" y="120" font-family="Arial" font-size="16" font-weight="bold" fill="#e8eaf6" text-anchor="middle">4. Audit & Monitor (Access History)</text>
                        
                        <!-- Arrows indicating flow -->
                        <path d="M 400 290 L 400 285" stroke="#6b7b8d" stroke-width="2"/>
                        <path d="M 400 220 L 400 215" stroke="#6b7b8d" stroke-width="2"/>
                        <path d="M 400 150 L 400 145" stroke="#6b7b8d" stroke-width="2"/>
                    </svg>
                    <p class="diagram-caption">Figure 5: The Snowflake Data Governance Lifecycle.</p>
                </div>`
            }
        ],
        quiz: [
            {
                id: "d20q1",
                type: "single",
                question: "Which feature dynamically alters the results of a query to hide sensitive column data from unauthorized roles, without modifying the underlying stored data?",
                options: [
                    "Row Access Policies",
                    "Dynamic Data Masking",
                    "Data Encryption at Rest",
                    "Secure Views"
                ],
                correct: 1,
                explanation: "Dynamic Data Masking intercepts queries at runtime and replaces sensitive column data with masked values (like '***') based on the executing user's role."
            },
            {
                id: "d20q2",
                type: "single",
                question: "You want to ensure that managers in the 'EMEA' region can only query rows in the `SALES` table where the `REGION_CODE` is 'EMEA'. Which feature should you use?",
                options: [
                    "Dynamic Data Masking",
                    "Object Tagging",
                    "Row Access Policies",
                    "Network Policies"
                ],
                correct: 2,
                explanation: "Row Access Policies evaluate the context of the user (e.g., their role) and filter the rows returned by the query, effectively appending a hidden WHERE clause."
            },
            {
                id: "d20q3",
                type: "single",
                question: "What is Tag-Based Masking in Snowflake?",
                options: [
                    "A feature that generates random tags for unstructured data.",
                    "Applying a masking policy to a Tag object, so any column assigned that Tag is automatically masked.",
                    "Masking the names of Tags so unauthorized users cannot see the metadata.",
                    "Using HTML tags to format masked data in Snowsight."
                ],
                correct: 1,
                explanation: "Tag-Based Masking allows you to map a masking policy to a tag (e.g., `PII`). When you apply the `PII` tag to a column, the masking policy is automatically enforced on that column, making governance highly scalable."
            },
            {
                id: "d20q4",
                type: "single",
                question: "Where can an administrator view a historical audit log of exactly which columns a user queried, including whether those columns were masked?",
                options: [
                    "The QUERY_HISTORY view in Information Schema",
                    "The ACCESS_HISTORY view in the SNOWFLAKE.ACCOUNT_USAGE schema",
                    "The WAREHOUSE_METERING_HISTORY view",
                    "The Network Policy Log"
                ],
                correct: 1,
                explanation: "The `ACCESS_HISTORY` view in the shared `SNOWFLAKE` database (`ACCOUNT_USAGE` schema) provides an immutable audit trail of read and write access, down to the specific columns accessed by a user."
            },
            {
                id: "d20q5",
                type: "multi",
                question: "Which of the following are valid use cases for Object Tagging? (Select TWO)",
                options: [
                    "Tracking compute costs by assigning a 'Cost_Center' tag to virtual warehouses.",
                    "Encrypting data at rest based on the tag value.",
                    "Identifying and tracking sensitive columns containing PII across hundreds of tables.",
                    "Assigning IP addresses to a network policy."
                ],
                correct: [0, 2],
                explanation: "Object tags are highly flexible key-value pairs used for metadata tracking. Common use cases include cost attribution (tagging warehouses) and data governance (tagging sensitive columns)."
            },
            {
                id: "d20q6",
                type: "single",
                question: "Snowflake's Data Classification feature uses machine learning to do what?",
                options: [
                    "Automatically tune virtual warehouse sizes based on query history.",
                    "Identify potentially sensitive data in tables and recommend system tags to apply to them.",
                    "Classify incoming network traffic as legitimate or malicious.",
                    "Automatically cluster tables based on frequent query patterns."
                ],
                correct: 1,
                explanation: "Data Classification analyzes the content and metadata of columns to detect sensitive data (like emails or credit cards) and suggests or applies appropriate privacy tags."
            },
            {
                id: "d20q7",
                type: "single",
                question: "Can a column have both a Dynamic Data Masking policy and a Row Access Policy applied to its table at the same time?",
                options: [
                    "Yes",
                    "No, they are mutually exclusive."
                ],
                correct: 0,
                explanation: "Yes. You can apply a Row Access Policy to a table to filter rows, and simultaneously apply Masking Policies to specific columns within that table to hide data in the remaining rows."
            }
        ]
    },
    {
        day: 21,
        title: "Domain 2 Mega Review",
        subtitle: "Account Management & Governance Review",
        domain: {
            id: 2,
            name: "Account Management & Governance",
            color: "#66bb6a"
        },
        estimatedTime: "120 min",
        objectives: [
            "Review and consolidate all concepts from Domain 2",
            "Identify knowledge gaps before moving to Domain 3",
            "Complete a rigorous 15-question review quiz"
        ],
        sections: [
            {
                title: "Domain 2 Summary & Exam Strategies",
                content: `<p>Domain 2 makes up 20% of the SnowPro Core exam. The questions in this domain are often scenario-based. You must understand how the different security layers interact.</p>
                
                <h4>The Security Onion</h4>
                <p>Think of Snowflake security as an onion with multiple layers of defense. If a user tries to query a table, they must pass through <em>all</em> these layers:</p>
                <ol>
                    <li><strong>Network Layer:</strong> Is the user's IP address allowed by an Account or User Network Policy?</li>
                    <li><strong>Authentication Layer:</strong> Does the user have the right credentials? Are they using SSO, MFA, or Key-Pair based on Authentication Policies?</li>
                    <li><strong>Access Control Layer (RBAC):</strong> Does the user's active role have <code>USAGE</code> on the database, <code>USAGE</code> on the schema, <code>USAGE</code> on the warehouse, and <code>SELECT</code> on the table?</li>
                    <li><strong>Governance Layer:</strong> Is there a Row Access Policy filtering the rows they can see? Is there a Masking Policy hiding the column values?</li>
                </ol>
                
                <h4>Key Exam Traps to Avoid</h4>
                <ul>
                    <li><strong>Trap:</strong> Assuming ACCOUNTADMIN is needed for everything. <strong>Reality:</strong> Best practice is to use SYSADMIN for creating objects and USERADMIN for creating users/roles.</li>
                    <li><strong>Trap:</strong> Confusing USERADMIN and SECURITYADMIN. <strong>Reality:</strong> USERADMIN creates users/roles. SECURITYADMIN manages global grants (has the MANAGE GRANTS privilege). SECURITYADMIN <em>inherits</em> USERADMIN.</li>
                    <li><strong>Trap:</strong> Thinking Network Policies merge. <strong>Reality:</strong> User-level policies completely override Account-level policies.</li>
                    <li><strong>Trap:</strong> Assuming Future Grants are retroactive. <strong>Reality:</strong> Future Grants only apply to objects created <em>after</em> the grant is executed.</li>
                </ul>`
            }
        ],
        quiz: [
            {
                id: "d21q1",
                type: "single",
                question: "Which built-in role should be used to monitor and manage account-level credit consumption and billing?",
                options: [
                    "SYSADMIN",
                    "SECURITYADMIN",
                    "ACCOUNTADMIN",
                    "FINANCEADMIN"
                ],
                correct: 2,
                explanation: "Only the ACCOUNTADMIN role has access to the billing, credit usage, and resource monitor configuration at the account level."
            },
            {
                id: "d21q2",
                type: "multi",
                question: "Which of the following privileges are required to successfully execute a SELECT query against a table named `SALES_DATA` in the `PUBLIC` schema of the `PROD` database? (Select THREE)",
                options: [
                    "OWNERSHIP on the SALES_DATA table",
                    "SELECT on the SALES_DATA table",
                    "USAGE on the PROD database",
                    "USAGE on a Virtual Warehouse",
                    "SYSADMIN role"
                ],
                correct: [1, 2, 3],
                explanation: "To query a table, a role must have SELECT on the table, USAGE on the schema (not listed in options but implied), USAGE on the database, and USAGE on an active virtual warehouse to process the compute."
            },
            {
                id: "d21q3",
                type: "single",
                question: "An IP address is explicitly added to the Allowed list of an Account-level network policy. Later, a User-level network policy is created for User Alice, but that IP address is NOT in the Allowed list for Alice's policy. Can Alice log in from that IP address?",
                options: [
                    "Yes, because the Account-level policy allows it.",
                    "No, because the User-level policy overrides the Account-level policy.",
                    "Yes, but she will be prompted for MFA.",
                    "No, unless the SYSADMIN grants her access."
                ],
                correct: 1,
                explanation: "User-level network policies completely override Account-level policies. Because the IP is not in Alice's user-level allow list, she cannot log in from it."
            },
            {
                id: "d21q4",
                type: "single",
                question: "Which of the following best describes Tri-Secret Secure?",
                options: [
                    "Requiring a Password, MFA, and SSO to log in.",
                    "Combining a Snowflake-managed key with a Customer-Managed Key to encrypt data at rest.",
                    "Using three different Virtual Warehouses to process secure data.",
                    "Encrypting data in transit using three distinct TLS certificates."
                ],
                correct: 1,
                explanation: "Tri-Secret Secure uses a composite key (Snowflake's key + your Customer-Managed Key in AWS/Azure/GCP) to encrypt data at rest, giving you ultimate control over data access."
            },
            {
                id: "d21q5",
                type: "single",
                question: "Which object allows you to restrict the hours during which a user can authenticate to Snowflake?",
                options: [
                    "Network Policy",
                    "Resource Monitor",
                    "Authentication Policy",
                    "Row Access Policy"
                ],
                correct: 2,
                explanation: "Authentication Policies (introduced in COF-C03) allow administrators to control authentication methods and behaviors, which can include enforcing specific authentication methods and restrictions."
            },
            {
                id: "d21q6",
                type: "single",
                question: "A company wants to ensure that their Data Analysts only see the last 4 digits of customer credit card numbers, while the Billing department sees the full number. The underlying data should not be changed. What feature accomplishes this?",
                options: [
                    "Row Access Policies",
                    "Dynamic Data Masking",
                    "Data Encryption at Rest",
                    "Secure Views"
                ],
                correct: 1,
                explanation: "Dynamic Data Masking applies a policy at the column level that intercepts the query and masks the returned values based on the executing user's role, without altering the stored data."
            },
            {
                id: "d21q7",
                type: "single",
                question: "In a best-practice role hierarchy, to which built-in role should all custom top-level roles (like functional department roles) ultimately roll up (be granted to)?",
                options: [
                    "ACCOUNTADMIN",
                    "SECURITYADMIN",
                    "SYSADMIN",
                    "PUBLIC"
                ],
                correct: 2,
                explanation: "Custom roles should be granted to SYSADMIN. This ensures that the system administrators can manage all objects created by those custom roles without needing to use the dangerous ACCOUNTADMIN role."
            },
            {
                id: "d21q8",
                type: "single",
                question: "Which built-in role possesses the global MANAGE GRANTS privilege?",
                options: [
                    "USERADMIN",
                    "SECURITYADMIN",
                    "SYSADMIN",
                    "ACCOUNTADMIN"
                ],
                correct: 1,
                explanation: "SECURITYADMIN holds the MANAGE GRANTS privilege, allowing it to view and modify any grant in the system. (ACCOUNTADMIN inherits this, but SECURITYADMIN is the primary role for this function)."
            },
            {
                id: "d21q9",
                type: "multi",
                question: "Which of the following statements about Future Grants are FALSE? (Select TWO)",
                options: [
                    "Future grants can be applied at the database level.",
                    "Future grants automatically apply to all existing objects in the schema that do not already have privileges assigned.",
                    "Future grants eliminate the need to run GRANT statements every time a new table is created.",
                    "Future grants override explicit grants made on a specific object."
                ],
                correct: [1, 3],
                explanation: "Future grants are NOT retroactive (they do not apply to existing objects), and explicit grants on a specific object take precedence over future grants."
            },
            {
                id: "d21q10",
                type: "single",
                question: "What protocol is used by Snowflake to support Single Sign-On (SSO) with external Identity Providers?",
                options: [
                    "LDAP",
                    "SAML 2.0",
                    "OAuth 2.0",
                    "Kerberos"
                ],
                correct: 1,
                explanation: "Snowflake acts as a Service Provider using the SAML 2.0 protocol for federated authentication (SSO)."
            },
            {
                id: "d21q11",
                type: "single",
                question: "Which feature allows Snowflake to automatically provision and deprovision users based on changes made in Azure Active Directory or Okta?",
                options: [
                    "SCIM",
                    "SAML",
                    "OAuth",
                    "Key-Pair Auth"
                ],
                correct: 0,
                explanation: "SCIM (System for Cross-domain Identity Management) is an open standard used for automating user provisioning and identity lifecycle management between Identity Providers and service providers like Snowflake."
            },
            {
                id: "d21q12",
                type: "single",
                question: "You need to assign a 'Cost Center' label to several Virtual Warehouses so you can group them in your billing reports. Which governance feature should you use?",
                options: [
                    "Row Access Policies",
                    "Data Classification",
                    "Object Tagging",
                    "Resource Monitors"
                ],
                correct: 2,
                explanation: "Object Tagging allows you to assign key-value pairs (like `cost_center=marketing`) to Snowflake objects, which can then be used to track usage and costs in the ACCOUNT_USAGE views."
            },
            {
                id: "d21q13",
                type: "single",
                question: "If an automated ETL tool uses the Python Connector to ingest data into Snowflake, which authentication method is highly recommended by Snowflake for this programmatic access?",
                options: [
                    "Password with MFA enforced",
                    "SAML 2.0 SSO",
                    "Key-Pair Authentication (RSA)",
                    "Username and Password"
                ],
                correct: 2,
                explanation: "Key-Pair Authentication utilizes RSA public/private keys, providing highly secure programmatic access without requiring passwords to be stored in scripts or configuration files."
            },
            {
                id: "d21q14",
                type: "single",
                question: "Where would a security administrator go to see a detailed audit trail of exactly which tables and columns a specific user queried yesterday?",
                options: [
                    "Information Schema -> QUERY_HISTORY",
                    "Account Usage -> ACCESS_HISTORY",
                    "Account Usage -> LOGIN_HISTORY",
                    "Information Schema -> OBJECT_PRIVILEGES"
                ],
                correct: 1,
                explanation: "The `ACCESS_HISTORY` view in the `SNOWFLAKE.ACCOUNT_USAGE` schema provides a comprehensive audit log of data access, including specific columns read and written by users."
            },
            {
                id: "d21q15",
                type: "single",
                question: "Can you drop the PUBLIC role in Snowflake?",
                options: [
                    "Yes, but only if you are ACCOUNTADMIN.",
                    "Yes, but you must transfer its ownership first.",
                    "No, system-defined roles cannot be dropped.",
                    "No, unless you disable all external access first."
                ],
                correct: 2,
                explanation: "The five built-in, system-defined roles (ACCOUNTADMIN, SECURITYADMIN, SYSADMIN, USERADMIN, and PUBLIC) are permanent components of a Snowflake account and cannot be dropped."
            }
        ]
    }
];
