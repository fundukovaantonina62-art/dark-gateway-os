// Dark Gateway OS — Interactive Site Script

const OFFICIAL_ONION = "http://tkefu5bcmnhvrofyhqg735opw7ydkyxueoazvjtfifd3znhvwylmayid.onion";

function copyOnion() {
    const text = OFFICIAL_ONION;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById("onion-text");
        const orig = btn.innerText;
        btn.innerText = "Copied .onion!";
        setTimeout(() => {
            btn.innerText = orig;
        }, 2500);
    });
}

function copyHash() {
    const hash = document.getElementById("file-hash").innerText;
    navigator.clipboard.writeText(hash).then(() => {
        const btn = document.querySelector(".btn-copy");
        btn.innerText = "Copied!";
        setTimeout(() => {
            btn.innerText = "Copy";
        }, 2000);
    });
}

// Smooth scrolling for navigation anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
