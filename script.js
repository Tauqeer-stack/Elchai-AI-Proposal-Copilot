document.getElementById('generate-btn').addEventListener('click', async () => {
    const inputData = document.getElementById('client-needs').value.trim();
    if (!inputData) {
        alert("Please paste some baseline requirements first!");
        return;
    }

    const startBtn = document.getElementById('generate-btn');
    const statusDiv = document.getElementById('swarm-status');
    const outputDiv = document.getElementById('output-proposal');
    const stepMsg = document.getElementById('step-msg');
    const stepCounter = document.getElementById('step-counter');
    const proposalText = document.getElementById('proposal-text');

    // Reset layout states
    startBtn.disabled = true;
    outputDiv.classList.add('hidden');
    statusDiv.classList.remove('hidden');

    // Simulated Swarm Pipeline Steps
    const stages = [
        { msg: "🤖 OpenClaw Spawning Controller Framework...", steps: "120 / 4,000 steps" },
        { msg: "📋 Planner Agent: Deconstructing project scope criteria...", steps: "950 / 4,000 steps" },
        { msg: "💰 Budget Agent: Running cost estimates via Kimi 2.6 architecture...", steps: "2,100 / 4,000 steps" },
        { msg: "🔒 Risk Agent: Checking localized compliance guardrails...", steps: "3,450 / 4,000 steps" },
        { msg: "✍️ Proposal Writer Agent: Formatting final technical deliverable...", steps: "4,000 / 4,000 steps" }
    ];

    for (let i = 0; i < stages.length; i++) {
        stepMsg.innerText = stages[i].msg;
        stepCounter.innerText = stages[i].steps;
        await new Promise(resolve => setTimeout(resolve, 1200)); 
    }

    // Generate output template context dynamically
    proposalText.innerHTML = `### EXECUTIVE PROPOSAL
**Prepared For:** Enterprise Client Ecosystem
**Engine Integration:** OpenClaw OS powered by Kimi 2.6 Swarm

1. STRUCTURE OVERVIEW
The project criteria focusing on ["${inputData.substring(0, 60)}..."] has been broken down by 300 active sub-agents running across a 12-hour horizon simulation.

2. OPERATIONAL ARCHITECTURE
- Deployment Strategy: Gated sovereign infrastructure within a private local enterprise VPC.
- Model Layering: Multi-threaded execution pipelines minimizing token memory footprints.

3. FINANCIAL & DEVELOPMENT TIMELINE
- Automated Estimate: Complete implementation mapping within 14 standard working units.
- Cost Efficiency: Optimized via Mixture-of-Experts (MoE) to save up to 85% compared to proprietary external solutions.`;

    statusDiv.classList.add('hidden');
    outputDiv.classList.remove('hidden');
    startBtn.disabled = false;
});