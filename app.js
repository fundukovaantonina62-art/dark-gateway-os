// Dark Gateway OS — Interactive Site Script

const OFFICIAL_ONION = "http://tkefu5bcmnhvrofyhqg735opw7ydkyxueoazvjtfifd3znhvwylmayid.onion";

function copyOnion() {
    const text = OFFICIAL_ONION;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById("onion-text");
        if (btn) {
            const orig = btn.innerText;
            btn.innerText = "Скопировано!";
            setTimeout(() => {
                btn.innerText = orig;
            }, 2500);
        }
    }).catch(err => {
        console.error("Clipboard copy failed", err);
    });
}

function copyHash() {
    const hashEl = document.getElementById("file-hash");
    if (!hashEl) return;
    const hash = hashEl.innerText;
    navigator.clipboard.writeText(hash).then(() => {
        const btn = event.target;
        if (btn) {
            const orig = btn.innerText;
            btn.innerText = "Скопировано!";
            setTimeout(() => {
                btn.innerText = orig;
            }, 2000);
        }
    }).catch(err => {
        console.error("Clipboard copy failed", err);
    });
}

// Smooth scrolling for navigation anchors within same page
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
