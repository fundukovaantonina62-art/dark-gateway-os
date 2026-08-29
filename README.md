# Dark Gateway OS — Official Showcase Website

Autonomous Security Gateway showcase and specification site designed for deployment on the **Tor Onion Network** as a **Hidden Service (v3)**.

---

## 🔒 Security & Anonymity Specifications
* **Zero External CDNs:** 100% self-contained static HTML5/CSS3/JS.
* **Tor Browser Safest Ready:** Operates seamlessly under high security levels in Tor Browser.
* **Strict CSP & Anti-Fingerprinting:** No client tracking, no cookies, no third-party telemetry.
* **Server Hardening:** Localhost-only binding (`127.0.0.1:8080`), `server_tokens off`, access logging disabled.

---

## 📁 File Structure
* `index.html` — Semantic HTML5 markup with glassmorphism layout, live terminal preview, and comparison table.
* `style.css` — Modern dark theme stylesheet (`Dark Pastels` palette, responsive layout).
* `app.js` — Lightweight vanilla JavaScript for interactive components and clipboard actions.
* `dev_server.py` — Local preview server for offline development (`http://127.0.0.1:8080`).

---

## 🚀 Local Development
To launch the site locally on your machine:
```bash
python3 dev_server.py
```
Open `http://127.0.0.1:8080` in your browser.
