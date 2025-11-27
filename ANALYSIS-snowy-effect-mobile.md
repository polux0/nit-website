# Analysis: Why the Snowy Effect is Missing on Mobile

**Date:** 2025-11-23

## Summary

The "snowy effect" (grain texture overlay) appears on desktop but is missing on mobile in the Projects section. This analysis explains why and how to fix it.

---

## Desktop Implementation

On desktop, the "snowy effect" (grain texture) comes from the **background images themselves**. The background images at `/images/background-deploy/3.png` (2560x1440) likely have the grain effect **baked directly into the image files**.

**Projects Section on Desktop:**
- Uses `backgroundImage: 'url(/images/background-deploy/3.png)'`
- Background size: `'100% 100%'` (stretches to fit)
- The grain/snowy effect is part of the PNG file itself
- Located in: `components/projects-section.tsx` (lines 134-140)

---

## Mobile Implementation

On mobile, the Projects section displays **different content**:
- **Mobile** (`md:hidden`): Shows `project.coverImageMobile` - portfolio card images like `/portfolio/portfolio.mobile/branding.with.text.png`
- **Desktop** (`hidden md:block`): Shows `project.coverImage` (black) and `project.coverImageHover` (white)

The mobile view uses the card images directly, which are displayed over the background but don't have the grain effect themselves.

---

## The Problem

The mobile portfolio card images (the ones in `/public/portfolio/portfolio.mobile/`) **don't have the grain overlay applied to them**. They're clean images without the snowy effect.

Meanwhile, only the **About Section** has an explicit grain overlay layer in the code (`components/about-section.tsx`, lines 98-106):

```jsx
<div
  className="absolute inset-0 opacity-30 pointer-events-none z-0"
  style={{
    backgroundImage: 'url(/images/background.grain/pozadine_0006_Layer-5-copy.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
/>
```

---

## Comparison Table

| Section | Desktop Snowy Effect | Mobile Snowy Effect | Why |
|---------|---------------------|---------------------|-----|
| **About** | ✅ Yes (grain overlay) | ✅ Yes (grain overlay explicitly added) | Has `<div>` with grain background overlay at opacity 30% |
| **Services** | ✅ Yes (baked in bg image) | ✅ Yes (same bg image) | Background image `2.png` has grain baked in |
| **Projects** | ✅ Yes (baked in bg image) | ❌ No | Mobile shows portfolio cards (no grain), desktop shows background `3.png` (has grain) |
| **Contact** | ✅ Yes (baked in bg image) | ✅ Yes (same bg image) | Background image `4.png` has grain baked in |

---

## Root Cause

**The mobile portfolio images don't have the grain effect, and there's no grain overlay layer in the Projects section code like there is in the About section.**

Specifically:
1. Desktop uses the section background (`background-deploy/3.png`) which has grain baked in
2. Mobile uses portfolio card images which overlay the background and block the grain effect
3. No explicit grain overlay `<div>` exists in the Projects section (unlike the About section)

---

## File Locations

### Background Images
- **Background images:** `/public/images/background-deploy/` (2560x1440)
  - `1.png` - About section
  - `2.png` - Services section
  - `3.png` - Projects section
  - `4.png` - Contact section

- **Grain overlays:** `/public/images/background.grain/` (1920x1080)
  - `pozadine_0006_Layer-5-copy.png` - Used in About section

### Portfolio Card Images
- **Mobile portfolio cards:** `/public/portfolio/portfolio.mobile/`
  - `branding.with.text.png`
  - `photo.video.with.text.png`
  - `social.media.with.text.png`
  - `web.with.text.png`

### Code Locations
- **Projects Section:** `components/projects-section.tsx`
  - Background: lines 134-140
  - Mobile cards: lines 168-173
  - Desktop cards: lines 176-189

- **About Section:** `components/about-section.tsx`
  - Grain overlay: lines 98-106 (mobile section)
  - Background: line 128

- **Services Section:** `components/services-section.tsx`
  - Background: lines 155-159

---

## Solution Options

### Option 1: Add Grain Overlay Layer to Projects Section (Recommended)
Add a grain overlay `<div>` similar to the About section in `components/projects-section.tsx`:

```jsx
{/* Grain overlay */}
<div
  className="absolute inset-0 opacity-30 pointer-events-none z-[5]"
  style={{
    backgroundImage: 'url(/images/background.grain/pozadine_0006_Layer-5-copy.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
/>
```

Place this after line 140 (after the section opening tag) to overlay the entire section.

### Option 2: Bake Grain Into Mobile Portfolio Images
Apply grain texture directly to the portfolio card images using image editing tools or programmatically with Python/PIL.

### Option 3: Use CSS Filters
Apply a CSS grain effect using filters, though this may not match the exact look of the existing grain overlay.

---

## Recommended Next Steps

1. Add grain overlay layer to Projects section (Option 1)
2. Test on both mobile and desktop to ensure consistency
3. Adjust opacity if needed (currently 30% in About section)
4. Consider adding the same overlay to other sections if needed for consistency

---

## Historical Context

According to git history:
- Commit `f3f98df`: "fix: background images should have the same level of snowy effect!"
- Previous work focused on making desktop backgrounds consistent using `backgroundSize: '100% 100%'`
- The mobile portfolio cards were created separately and didn't include the grain effect
