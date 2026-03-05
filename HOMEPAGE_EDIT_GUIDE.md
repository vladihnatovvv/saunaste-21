# Homepage Editing Guide

## Overview

The **index.html** (Homepage) is now fully editable through Sveltia CMS. Content managers can update hero text, about sections, location info, business details, and activities without touching code.

## Editable Homepage Sections

### 1. Hero Section
**What You Can Edit:**
- Hero Title: "Пар, возвращающий силы"
- Hero Description: Main tagline and benefits (supports markdown/formatting)

**Location on Page:** Top banner with background image
**How It Appears:** Large heading + descriptive text

---

### 2. About Section
**What You Can Edit:**
- Section Title: "О банях и других пространствах"
- About Items (3 items):
  - Item Number (01, 02, 03)
  - Item Title (e.g., "Наши бани", "Территория хаммама")
  - Item Image (bath photos)
  - Item Description (rich markdown text)

**Location on Page:** Main content area
**How It Appears:** Cards with images, numbers, titles, and descriptions

---

### 3. Dortmund Section
**What You Can Edit:**
- Badge Text: "Наша локация"
- Section Title: "Мы в Дортмунде"
- Section Description: Overview text
- Gallery Images (4 images with alt text):
  - Upload new images
  - Update alt text for accessibility

**Location on Page:** Below about section
**How It Appears:** Header + image gallery grid

---

### 4. Business Information
**What You Can Edit:**
- Business Name: "VIP-RU Sauna"
- Business Description: Multi-line description with markdown support
- Address: Street, postal code, district
- Phone Number: Contact number
- Email Address: Contact email
- Business Hours: Operating hours (supports markdown for formatting)

**Location on Page:** "Мы в Дортмунде" section with contact card
**How It Appears:** Info card with all details

---

### 5. Activities Section
**What You Can Edit:**
- Section Title: "ЧТО ДЕЛАТЬ ЕЩЕ?" (What Else To Do?)
- Section Note: Subtitle/description
- Activities List: Add/remove/edit activities (6 items)
  - Each activity is a description text

**Location on Page:** Near bottom, before footer
**How It Appears:** Two-column list of activities

---

## Editing Workflow

### Step 1: Access Admin Panel
1. Go to `https://your-domain.com/admin`
2. Log in with email and password
3. Click "Homepage" in the Pages section

### Step 2: Edit Content
1. Click on the section you want to edit:
   - Hero Section
   - About Section
   - Dortmund Section
   - Business Info
   - Activities Section

2. Update the fields:
   - **Text fields**: Simple text input (no formatting)
   - **Markdown fields**: Text with formatting support
   - **Image fields**: Upload or select images
   - **Lists**: Add/remove/reorder items

### Step 3: Preview Changes
1. Use the preview panel (right side) to see changes
2. Check how content appears in real-time

### Step 4: Publish
1. Click "Publish" button to save and deploy
2. Changes go live within 5-30 seconds
3. Clear browser cache to see updates immediately

---

## Field Types Explained

### Text vs. Markdown

**Text Field** (Simple):
- Single-line input
- No formatting
- Used for: Names, titles, phone numbers

**Markdown Field** (Rich):
- Multi-line input
- Supports formatting:
  - `**bold text**` → **bold**
  - `*italic text*` → *italic*
  - `- item 1` → bullet list
  - `[Link Text](https://url)` → clickable link
  - Line breaks: Press Enter to create new lines

**Example:**
```
This is a description.

It has **bold text** and *italic*.

- Activity 1
- Activity 2
- Activity 3
```

---

## Specific Section Examples

### Editing Hero Section
1. Click "Homepage" → "Hero Section"
2. Update title: "Пар, возвращающий силы"
3. Update description in markdown:
   ```
   Авторские банные ритуалы для глубокого восстановления.
   Тепло, пары, контраст и забота — все для вашего обновления.
   ```
4. Publish

### Adding/Editing About Items
1. Click "Homepage" → "About Section"
2. Click "+ Add" to add new item
3. Fill in:
   - Number: "01"
   - Title: "Item Title"
   - Image: Click to upload
   - Description: Rich text with markdown
4. Publish

### Updating Business Hours
1. Click "Homepage" → "Business Info"
2. Edit "Hours" field:
   ```
   Пн–Пт: 10:00–23:00
   Сб–Вс: 09:00–23:00
   ```
3. Publish

### Managing Activities List
1. Click "Homepage" → "Activities Section"
2. Activities are in a list:
   - Click "+" to add
   - Click "-" to remove
   - Drag to reorder
   - Click to edit text
3. Publish

---

## What Is Protected (NOT Editable)

❌ **Cannot Be Changed:**
- Header and navigation menus
- Footer structure and layout
- Footer contact links (except info text)
- Map section
- CSS/styling
- JavaScript functionality
- Calculator (on other pages)
- Google Tag Manager

✅ **Can Be Changed:**
- All text content
- All images (except logo, header images)
- Contact information
- Business details
- Activity descriptions

---

## Tips & Best Practices

### For Images
1. **Size**: Compress to under 2MB when possible
2. **Format**: Use JPEG or WebP for photos
3. **Alt Text**: Always add descriptive alt text (for accessibility & SEO)
4. **Dimensions**: Maintain consistent aspect ratios

### For Text
1. **Brevity**: Keep descriptions concise
2. **Markdown**: Use for emphasized text
3. **Line Breaks**: Press Enter to create paragraph breaks
4. **Special Characters**: Use correct quotes and punctuation

### For Activities
1. **Consistency**: Keep similar format for all items
2. **Action Words**: Start with verbs (e.g., "Насладиться...", "Сделать...")
3. **Clarity**: Make descriptions clear and enticing

---

## Troubleshooting

### Text Won't Update
- Ensure you clicked "Publish"
- Wait 10 seconds for deployment
- Clear browser cache (Ctrl+Shift+Del)
- Try different browser

### Image Won't Upload
- Check file size (under 5MB)
- Use JPEG, PNG, or WebP format
- Check internet connection
- Try uploading smaller version

### Section Missing
- Scroll down in the admin panel
- Check for collapsed sections (click to expand)
- Refresh page

### Changes Keep Reverting
- Someone else may have published changes
- Check the deployment status
- Review git history on GitHub

---

## Quick Reference

| Section | Fields | Can Add/Remove? |
|---------|--------|-----------------|
| Hero | Title, Description | No - fixed fields |
| About | Items (3) | Yes - can add/remove items |
| Dortmund | Title, Description, Images | Yes - add/remove images |
| Business | Name, Description, Contact | No - fixed fields |
| Activities | Activity list (6+) | Yes - add/remove activities |

---

## Future Improvements

Consider requesting these features:
- Drag-to-reorder activities
- Hero background image editing
- Testimonials section
- News/blog posts
- Event scheduling

Contact development team with enhancement requests.
