# Kalm Kitchen – Full Reverse Engineering Design System

---

# 1. BRAND & VISUAL SYSTEM

## Core Identity

Tone:
- Calm luxury
- Editorial hospitality
- Premium but warm
- Human, not corporate

Key idea:
This is NOT a restaurant site.
This is a **lifestyle / experience brand**.

---

## Color System (Design Tokens)

```css
:root {
  --bg-primary: #F6F1E8;
  --bg-secondary: #FBF8F2;

  --text-primary: #24201C;
  --text-secondary: #5F574F;

  --accent-soft: #A99884;
  --accent-strong: #6F5D4B;

  --border-subtle: rgba(36,32,28,0.08);

  --sage: #A8B39D;
  --olive: #46503F;
}
```

Usage:
- Backgrounds: cream tones
- Text: deep brown (NOT pure black)
- Accents: muted earth tones

---

## Typography System

### Font Stack

```css
--font-serif: "Cormorant Garamond", Georgia, serif;
--font-sans: "Inter", Arial, sans-serif;
```

### Scale

```css
h1 {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

h2 {
  font-size: clamp(2rem, 4vw, 3rem);
}

p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

---

## Spacing System

```css
.section {
  padding: clamp(80px, 12vw, 160px) 6vw;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}
```

Rule:
Vertical rhythm > horizontal density.

---

# 2. LOADER

## Behavior

- Full screen overlay
- Logo centered
- Fade in → slight scale → fade out

## Code

```html
<div id="loader">
  <div class="logo">K</div>
</div>
```

```css
#loader {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  display: grid;
  place-items: center;
  z-index: 9999;
  transition: opacity 1s ease;
}

.logo {
  font-size: 80px;
  font-family: var(--font-serif);
  opacity: 0;
  animation: fadeIn 1.5s ease forwards;
}

@keyframes fadeIn {
  to { opacity: 1; transform: scale(1); }
}
```

---

# 3. NAVBAR

## Behavior

- Transparent initially
- Becomes solid on scroll
- Dropdown on hover

## Code

```css
.header {
  position: fixed;
  width: 100%;
  padding: 24px 48px;
  transition: 0.4s ease;
}

.header.scrolled {
  background: rgba(246,241,232,0.9);
  backdrop-filter: blur(10px);
}
```

---

# 4. HERO SECTION

## Structure

- Full viewport height
- Background image
- Dark overlay
- Centered text

## Code

```html
<section class="hero">
  <img src="hero.jpg" />
  <div class="content">
    <h1>Extraordinary food</h1>
  </div>
</section>
```

```css
.hero {
  height: 100vh;
  position: relative;
}

.hero img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
}
```

---

# 5. SCROLL ANIMATIONS

## Pattern

- Fade up
- Slow timing
- No bounce

## Code

```css
.fade-up {
  opacity: 0;
  transform: translateY(40px);
  transition: 0.8s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const els = document.querySelectorAll(".fade-up");

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add("visible");
  });
});

els.forEach(el => obs.observe(el));
```

---

# 6. GRID SYSTEM

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}
```

---

# 7. BUTTONS

```css
.button {
  border-bottom: 1px solid var(--text-primary);
  padding-bottom: 4px;
  transition: 0.3s;
}

.button:hover {
  opacity: 0.6;
}
```

---

# 8. TECH STACK REBUILD

Recommended:

- Next.js
- GSAP
- Lenis (smooth scroll)
- Tailwind or CSS modules

---

# 9. BUILD ORDER

1. Tokens
2. Typography
3. Layout
4. Navbar
5. Hero
6. Sections
7. Animations
8. CMS

---

# 10. CORE DESIGN RULES

1. Space = luxury
2. Serif = emotion
3. Motion = subtle
4. Images = storytelling
5. Less = premium

---

# END
