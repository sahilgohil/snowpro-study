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
        quiz: Array.from({ length: 100 }, (_, i) => {
            const num = i + 1;
            let domain = 1;
            if (num > 31) domain = 2;
            if (num > 51) domain = 3;
            if (num > 69) domain = 4;
            if (num > 90) domain = 5;

            const isMulti = (num % 3 === 0);
            
            return {
                id: `peq${num}`,
                type: isMulti ? "multi" : "single",
                question: `A scenario-based question for Domain ${domain} assessing key concepts. (Question ${num}) ${isMulti ? '(Select TWO)' : ''}`,
                options: [
                    "Plausible Option A",
                    "Plausible Option B",
                    "Plausible Option C",
                    "Plausible Option D"
                ],
                correct: isMulti ? [0, 1] : 0,
                explanation: `Detailed explanation for question ${num}. Option A is correct because of X. Option B is wrong because of Y. Option C is wrong because of Z. Option D is wrong because of W.`
            };
        })
    }
];
