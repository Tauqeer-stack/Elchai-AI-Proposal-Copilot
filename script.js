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
// --- Interactive 3D Agent Swarm Canvas System ---
const canvas = document.getElementById('swarmCanvas');
const ctx = canvas.getContext('2d');
const wrapper = document.getElementById('canvas-3d-wrapper');

// Adjust canvas resolution dynamically
function resizeCanvas() {
    canvas.width = wrapper.clientWidth;
    canvas.height = wrapper.clientHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const particleCount = 75;
const mouse = { x: null, y: null, radius: 120 };

// Track mouse position on the canvas
wrapper.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

wrapper.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Particle Node Structure
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2;
        this.radius = Math.random() * 2 + 1.5;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Boundary bounce check
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction pull effect
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                this.x += dx * 0.03; 
                this.y += dy * 0.03;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#0070f3';
        ctx.fill();
    }
}

// Generate the initial agent network nodes
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Connect lines between close nodes
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 90) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 223, 216, ${1 - dist / 90})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }
}

// System loop animation
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    
    drawLines();
    requestAnimationFrame(animate);
}
animate();