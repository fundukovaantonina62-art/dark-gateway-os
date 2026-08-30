// Dark Gateway OS — Interactive Helper Scripts & Live Animated Terminal

function copyOnion() {
    const onionAddress = "tkefu5bcmnhvrofyhqg735opw7ydkyxueoazvjtfifd3znhvwylmayid.onion";
    navigator.clipboard.writeText(onionAddress).then(() => {
        const btnText = document.getElementById("onion-text");
        if (btnText) {
            const original = btnText.textContent;
            btnText.textContent = "COPIED!";
            btnText.style.color = "#8ab88c";
            setTimeout(() => {
                btnText.textContent = original;
                btnText.style.color = "";
            }, 2000);
        }
    }).catch(err => {
        console.error("Failed to copy onion:", err);
    });
}

function copyHash() {
    const hashEl = document.getElementById("file-hash");
    if (!hashEl) return;
    const hashText = hashEl.textContent.trim();
    navigator.clipboard.writeText(hashText).then(() => {
        const btn = event.target;
        if (btn) {
            const orig = btn.textContent;
            btn.textContent = "✓ Скопировано";
            btn.style.color = "#8ab88c";
            setTimeout(() => {
                btn.textContent = orig;
                btn.style.color = "";
            }, 2000);
        }
    }).catch(err => {
        console.error("Failed to copy hash:", err);
    });
}

// ==========================================================================
// REALISTIC LIVE TERMINAL CONSOLE ANIMATOR
// ==========================================================================

const TERMINAL_LINES = [
    { type: "log", text: '<span class="text-accent-blue">[BOOT]</span> Linux dark-gateway 6.12.105-amd64 x86_64 Hardened Linux', delay: 250 },
    { type: "log", text: '<span class="text-accent-blue">[INIT]</span> Isolating eth1 (LAN: 10.152.152.10/18) ➔ Zero-Leak Airgap enforced <span class="text-accent-green font-bold">[OK]</span>', delay: 350 },
    { type: "log", text: '<span class="text-accent-blue">[FIREWALL]</span> Loading kernel nftables socket table... <span class="text-accent-green font-bold">[8/8 MODULES ACTIVE]</span>', delay: 300 },
    { type: "log", text: '<span class="text-accent-blue">[TOR]</span> Bootstrapping circuit over WebTunnel HTTPS bridge transport...', delay: 400 },
    { type: "log", text: '<span class="text-accent-blue">[TOR]</span> Circuit established: 100% encrypted 3-hop overlay <span class="text-accent-green font-bold">[READY]</span>', delay: 450 },
    { type: "log", text: '<span class="text-accent-blue">[PROXY]</span> Sing-Box Client: Inbound 127.0.0.1:1080 ➔ Outbound VLESS Reality <span class="text-accent-amber font-bold">[ONLINE]</span>', delay: 350 },
    { type: "log", text: '<span class="text-accent-blue">[CLEAN]</span> wipe-traces.service registered on shutdown.target. Zero disk retention.', delay: 300 },
    
    // Command 1: health-check
    { type: "prompt", text: "health-check", delay: 800 },
    { type: "log", text: '<span class="text-gray-400">➔ Running Dark Gateway OS Security &amp; Stream Audit v1.0 Alpha...</span>', delay: 250 },
    { type: "log", text: '  <span class="text-accent-green">✓</span> WAN Interface (eth0): Active (Isolated from workstation)', delay: 180 },
    { type: "log", text: '  <span class="text-accent-green">✓</span> LAN Gateway (eth1): 10.152.152.10:9040 (Stream-Isolated)', delay: 180 },
    { type: "log", text: '  <span class="text-accent-green">✓</span> DNS Leak Defense: 10.152.152.10:5300 (0 Plaintext Queries)', delay: 180 },
    { type: "log", text: '  <span class="text-accent-green">✓</span> WebRTC &amp; IPv6: Kernel-level drop rules active', delay: 180 },
    { type: "log", text: '  <span class="text-accent-green">✓</span> Proxy Dispatcher: 127.0.0.1:1080 (VLESS XTLS-Vision Active)', delay: 180 },
    { type: "log", text: '  <span class="text-accent-green">✓</span> Anti-Forensics: wipe-traces.service armed for shutdown', delay: 180 },
    { type: "log", text: '➔ <span class="text-accent-green font-bold">AUDIT RESULT: 100% HEALTHY - ALL 6 SECURITY CHECKS PASSED</span>', delay: 700 },

    // Command 2: ss -tulpn | grep 1080
    { type: "prompt", text: "ss -tulpn | grep 1080", delay: 900 },
    { type: "log", text: '<span class="text-gray-300">tcp LISTEN 0 128 127.0.0.1:1080 0.0.0.0:* users:(("sing-box",pid=642,fd=7))</span>', delay: 400 },
    { type: "log", text: '<span class="text-accent-green">➔ VLESS Reality Dispatcher listening with zero WAN exposure.</span>', delay: 600 }
];

class TerminalAnimator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentStep = 0;
        this.isRunning = false;
    }

    start() {
        if (!this.container) return;
        this.container.innerHTML = "";
        this.currentStep = 0;
        this.isRunning = true;
        this.executeNext();
    }

    executeNext() {
        if (!this.isRunning) return;

        if (this.currentStep >= TERMINAL_LINES.length) {
            // Add trailing prompt with blinking cursor and pause before restarting
            const promptLine = document.createElement("div");
            promptLine.className = "text-gray-300 pt-1";
            promptLine.innerHTML = `<span class="text-gray-400">user@dark-gateway:~$</span> <span class="inline-block w-2 h-3.5 bg-accent-green align-middle animate-pulse"></span>`;
            this.container.appendChild(promptLine);
            this.container.scrollTop = this.container.scrollHeight;

            setTimeout(() => {
                if (this.isRunning) {
                    this.start();
                }
            }, 6000);
            return;
        }

        const item = TERMINAL_LINES[this.currentStep];
        this.currentStep++;

        if (item.type === "log") {
            const line = document.createElement("div");
            line.className = "text-gray-300";
            line.innerHTML = item.text;
            this.container.appendChild(line);
            this.container.scrollTop = this.container.scrollHeight;
            setTimeout(() => this.executeNext(), item.delay);
        } else if (item.type === "prompt") {
            const line = document.createElement("div");
            line.className = "text-accent-green pt-1";
            line.innerHTML = `<span class="text-gray-400">user@dark-gateway:~$</span> <span class="typed-text font-bold"></span><span class="inline-block w-2 h-3.5 bg-accent-green align-middle animate-pulse cursor-caret"></span>`;
            this.container.appendChild(line);
            this.container.scrollTop = this.container.scrollHeight;

            const textSpan = line.querySelector(".typed-text");
            const cursorSpan = line.querySelector(".cursor-caret");
            let charIndex = 0;

            const typeChar = () => {
                if (charIndex < item.text.length) {
                    textSpan.textContent += item.text.charAt(charIndex);
                    charIndex++;
                    this.container.scrollTop = this.container.scrollHeight;
                    setTimeout(typeChar, Math.random() * 30 + 35);
                } else {
                    if (cursorSpan) cursorSpan.remove();
                    setTimeout(() => this.executeNext(), item.delay);
                }
            };

            setTimeout(typeChar, 250);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const terminal = new TerminalAnimator("term-screen");
    terminal.start();
});
