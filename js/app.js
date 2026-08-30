// Dark Gateway OS — Shared Client Scripts (Terminal simulator, Lightbox modal, Copy helpers)

const COPY_TOASTS = {
    "en": { "copied": "COPIED!", "btn": "✓ Copied" },
    "ru": { "copied": "СКОПИРОВАНО!", "btn": "✓ Скопировано" },
    "es": { "copied": "¡COPIADO!", "btn": "✓ Copiado" },
    "zh": { "copied": "已复制！", "btn": "✓ 已复制" },
    "de": { "copied": "KOPIERT!", "btn": "✓ Kopiert" },
    "fr": { "copied": "COPIÉ !", "btn": "✓ Copié" },
    "pt": { "copied": "COPIADO!", "btn": "✓ Copiado" },
    "ja": { "copied": "コピーしました!", "btn": "✓ コピー完了" },
    "tr": { "copied": "KOPYALANDI!", "btn": "✓ Kopyalandı" },
    "ar": { "copied": "تم النسخ بنجاح!", "btn": "✓ تم النسخ" }
};

function getToastMessages() {
    const lang = document.documentElement.lang || "en";
    return COPY_TOASTS[lang] || COPY_TOASTS["en"];
}

function copyOnion() {
    const text = 'tkefu5bcmnhvrofyhqg735opw7ydkyxueoazvjtfifd3znhvwylmayid.onion';
    const toast = getToastMessages();
    navigator.clipboard.writeText(text).then(() => {
        const badge = document.getElementById('onion-badge');
        if (badge) {
            const original = badge.textContent;
            badge.textContent = toast.copied;
            badge.classList.remove('text-accent-purple');
            badge.classList.add('text-accent-green');
            setTimeout(() => {
                badge.textContent = original;
                badge.classList.remove('text-accent-green');
                badge.classList.add('text-accent-purple');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy Onion address:', err);
    });
}

function copyHash() {
    const hashText = document.getElementById('sha256-hash')?.textContent.trim() || '6c4401a359592d5bd65cbf520b6462c48b51ce91ddc274282a02fd63af95106b';
    const btn = document.getElementById('copy-hash-btn');
    const toast = getToastMessages();
    navigator.clipboard.writeText(hashText).then(() => {
        if (btn) {
            const original = btn.textContent;
            btn.textContent = toast.btn;
            btn.classList.add('text-accent-green');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('text-accent-green');
            }, 2000);
        }
    }).catch(err => {
        console.error('Failed to copy hash:', err);
    });
}

function switchLanguage(targetLang, pageName) {
    if (!targetLang) return;
    try {
        localStorage.setItem('dg_lang', targetLang);
        document.cookie = `dg_lang=${targetLang};path=/;max-age=31536000;SameSite=Lax`;
    } catch(e) {}
    window.location.href = `../${targetLang}/${pageName}`;
}

// Lightbox Modal for Image Previews
function initImageZoom() {
    let backdrop = document.querySelector('.image-modal-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'image-modal-backdrop';
        backdrop.innerHTML = '<div class="image-modal-content"><img src="" alt="Zoomed Screenshot"></div>';
        if (document.body) {
            document.body.appendChild(backdrop);
            backdrop.addEventListener('click', () => {
                backdrop.classList.remove('active');
            });
        }
    }

    const modalImg = backdrop ? backdrop.querySelector('img') : null;
    document.querySelectorAll('img').forEach(img => {
        if (!img.closest('.image-modal-content') && !img.classList.contains('no-zoom')) {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                if (modalImg) {
                    modalImg.src = img.src;
                    modalImg.alt = img.alt || 'Screenshot Zoom';
                }
                if (backdrop) backdrop.classList.add('active');
            });
        }
    });
}

// Typewriter Live Terminal Simulator
class TerminalAnimator {
    constructor(container) {
        this.container = typeof container === 'string' ? (document.getElementById(container) || document.getElementById('term-screen') || document.getElementById('terminal-output')) : container;
        if (!this.container) return;

        this.lines = [
            { text: "[BOOT] Linux dark-gateway 6.12.105-amd64 x86_64 Hardened Linux", color: "text-gray-400" },
            { text: "[INIT] Isolating eth1 (LAN: 10.152.152.10/18) ➔ Zero-Leak Airgap enforced [OK]", color: "text-accent-green" },
            { text: "[FIREWALL] Loading kernel nftables socket table... [8/8 MODULES ACTIVE]", color: "text-accent-blue" },
            { text: "[TOR] Bootstrapping circuit over WebTunnel HTTPS bridge transport...", color: "text-accent-purple" },
            { text: "[TOR] Circuit established: 100% encrypted 3-hop overlay [READY]", color: "text-accent-green font-bold" },
            { text: "[PROXY] Sing-Box Client: Inbound 127.0.0.1:1080 ➔ Outbound VLESS Reality [ONLINE]", color: "text-accent-amber" },
            { text: "[CLEAN] wipe-traces.service registered on shutdown.target. Zero disk retention.", color: "text-gray-400" },
            { text: "health-check", isCommand: true },
            { text: "➔ Running Dark Gateway OS Security & Stream Audit v1.0 Alpha...", color: "text-accent-blue font-bold" },
            { text: "  ✓ WAN Interface (eth0): Active (Isolated from workstation)", color: "text-accent-green" },
            { text: "  ✓ LAN Gateway (eth1): 10.152.152.10:9040 (Stream-Isolated)", color: "text-accent-green" },
            { text: "  ✓ DNS Leak Defense: 10.152.152.10:5300 (0 Plaintext Queries)", color: "text-accent-green" },
            { text: "  ✓ WebRTC & IPv6: Kernel-level drop rules active", color: "text-accent-green" },
            { text: "  ✓ Proxy Dispatcher: 127.0.0.1:1080 (VLESS XTLS-Vision Active)", color: "text-accent-green" },
            { text: "  ✓ Anti-Forensics: wipe-traces.service armed for shutdown", color: "text-accent-green" },
            { text: "➔ AUDIT RESULT: 100% HEALTHY - ALL 6 SECURITY CHECKS PASSED", color: "text-accent-green font-bold bg-[#142319] px-1 py-0.5 rounded inline-block" },
            { text: "ss -tulpn | grep 1080", isCommand: true },
            { text: "tcp  LISTEN  0  128  127.0.0.1:1080  0.0.0.0:*  users:((\"sing-box\",pid=842,fd=7))", color: "text-gray-300 font-mono text-[11px]" },
            { text: "➔ VLESS Reality Dispatcher listening with zero WAN exposure.", color: "text-accent-green" }
        ];
        this.index = 0;
        this.start();
    }

    start() {
        this.container.innerHTML = '';
        this.typeNextLine();
    }

    typeNextLine() {
        if (this.index >= this.lines.length) {
            setTimeout(() => {
                this.index = 0;
                this.start();
            }, 8000);
            return;
        }

        const lineObj = this.lines[this.index++];
        const lineElem = document.createElement('div');
        lineElem.className = `${lineObj.color || 'text-gray-300'} leading-relaxed`;

        if (lineObj.isCommand) {
            lineElem.innerHTML = `<span class="text-accent-green font-bold">user@dark-gateway:~$</span> <span class="cmd-txt text-gray-100 font-bold"></span><span class="animate-pulse text-accent-green">_</span>`;
            this.container.appendChild(lineElem);
            const cmdTxt = lineElem.querySelector('.cmd-txt');
            const cursor = lineElem.querySelector('.animate-pulse');
            const cmd = lineObj.text;
            let charIndex = 0;
            const timer = setInterval(() => {
                if (charIndex < cmd.length) {
                    if (cmdTxt) cmdTxt.textContent += cmd[charIndex++];
                } else {
                    clearInterval(timer);
                    if (cursor) {
                        if (typeof cursor.remove === 'function') cursor.remove();
                        else if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
                    }
                    setTimeout(() => this.typeNextLine(), 350);
                }
            }, 35);
        } else {
            lineElem.innerHTML = lineObj.text;
            this.container.appendChild(lineElem);
            this.container.scrollTop = this.container.scrollHeight;
            setTimeout(() => this.typeNextLine(), 240);
        }
    }
}

function initTerminal() {
    const term = document.getElementById('term-screen') || document.getElementById('terminal-output');
    if (term) {
        new TerminalAnimator(term);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initImageZoom();
        initTerminal();
    });
} else {
    initImageZoom();
    initTerminal();
}
