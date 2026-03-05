# Decap CMS Setup Guide

## Overview

Your website has been prepared for Decap CMS (formerly Netlify CMS). This allows clients to edit page content, images, titles, and text without touching the code. Headers, footers, and calculators remain protected.

## What's Been Done

1. **Created Decap CMS Configuration** (`/admin/config.yml`)
   - Configured 7 editable pages: hammam, banua1, bathhousevip, luxbanua, fishbanua, food, sauna1
   - Each page has fields for titles, descriptions, gallery images, and videos

2. **Created Admin Interface** (`/admin/index.html`)
   - Access point for content managers to edit content

3. **Editable Elements per Page**
   - ✅ Hero section title and lead text
   - ✅ Feature section title and description
   - ✅ Gallery images and alt text
   - ✅ Gallery subtitle
   - ✅ Video embeds
   - ✅ Calculator titles (on applicable pages)
   - ✅ Food menu items and prices (on food.html)
   - ❌ Header (protected)
   - ❌ Footer (protected)
   - ❌ Calculator functionality (protected)

## How to Deploy

### Step 1: Set Up GitHub Repository
1. Push this code to a GitHub repository
2. Ensure your repository is public or accessible

### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Choose your GitHub repository
4. Set build command to: (leave empty, static site)
5. Set publish directory to: `/` (root)
6. Deploy

### Step 3: Enable Netlify Identity
1. In Netlify dashboard, go to Site Settings
2. Navigate to "Identity" section
3. Click "Enable Identity"
4. Under "Registrations", set to "Invite only" or "Open"
5. Under "Services", enable "Git Gateway"

### Step 4: Invite Team Members
1. In Netlify Identity, click "Invite users"
2. Send invites to content managers
3. They'll receive email with access link

### Step 5: Access Admin Panel
- Admin URL: `https://your-domain.netlify.app/admin`
- Users log in with their email and password set via Netlify Identity

## Editing Workflow

### For Content Managers:
1. Navigate to `/admin` on your deployed site
2. Log in with your Netlify Identity credentials
3. Click on a page to edit (e.g., "Хамам", "VIP Баня")
4. Edit text, upload images, update videos
5. Save and publish changes
6. Changes go live immediately

### Fields Available per Page:

#### All Bath Pages (hammam, banua1, bathhousevip, luxbanua, fishbanua):
- **Hero Title**: Main page heading
- **Hero Lead Text**: Subheading text
- **Feature Label**: "Про баню" label
- **Feature Title**: Bath name/title
- **Feature Description**: Description of the bath
- **Gallery Title**: "Галерея и видео"
- **Gallery Subtitle**: Gallery subtitle text
- **Gallery Images**: Upload/manage gallery images
- **Video**: Video file path or URL
- **Calculator Title**: Title for pricing calculator

#### Food Page (food.html):
- **Page Title**: Main heading
- **Page Subtitle**: Subtitle
- **Food Categories**: 
  - Category Name (e.g., "Закуски", "Основные блюда")
  - Food Items (name, description, price, image)

## File Structure

```
/
├── admin/
│   ├── config.yml          # Decap CMS configuration
│   └── index.html          # Admin interface
├── hammam.html             # Editable page
├── banua1.html             # Editable page
├── bathhousevip.html       # Editable page
├── luxbanua.html           # Editable page
├── fishbanua.html          # Editable page
├── food.html               # Editable page (menu)
├── sauna1.html             # Editable page
├── index.html              # Homepage (not in CMS)
├── css/                    # Styles (protected)
├── js/                     # Scripts (protected)
├── images/                 # Images folder (managed by CMS)
└── fonts/                  # Fonts (protected)
```

## Important Notes

### What Is Protected:
- ✅ Header navigation and layout
- ✅ Footer structure and maps
- ✅ Calculator functionality and logic
- ✅ CSS and JavaScript files
- ✅ Google Tag Manager integration
- ✅ Side menu structure

### What Is Editable:
- ✅ All text content (titles, descriptions, paragraphs)
- ✅ All images (gallery, hero backgrounds, etc.)
- ✅ Video files
- ✅ Menu items and prices
- ✅ Feature descriptions
- ✅ Page subtitles

### Limitations:
- Images must be uploaded through the CMS (no external URLs except videos)
- Maximum recommended image size: 5MB
- Video support: MP4 files or video URLs
- HTML/code editing is NOT available (safe for non-technical users)

## Customization Options

### To Add More Fields:
Edit `/admin/config.yml` and add fields under the relevant page section:

```yaml
- label: "New Field Name"
  name: "field_variable_name"
  widget: "string" # or "text", "image", "list", etc.
  default: "Default value"
```

### To Add More Pages:
Add a new file section in `config.yml`:

```yaml
- name: "new-page"
  label: "New Page Label"
  file: "new-page.html"
  fields:
    # ... add fields
```

### To Change Widgets:
Available widget types:
- `string` - Single line text
- `text` - Multi-line text
- `image` - Image upload
- `list` - Repeating items
- `select` - Dropdown menu
- `boolean` - Checkbox

## Troubleshooting

### CMS Won't Load
- Check that `/admin/index.html` exists
- Ensure `/admin/config.yml` is valid YAML
- Check browser console for errors

### Authentication Issues
- Verify Git Gateway is enabled in Netlify
- Check that user is invited via Netlify Identity
- Clear browser cache and cookies

### Images Not Uploading
- Check that `/images` folder exists
- Verify file size is under 5MB
- Try different image format (JPEG instead of PNG)

### Changes Not Appearing
- Clear browser cache
- Wait a few seconds for deployment
- Check site deployment status in Netlify dashboard

## Support & Documentation

- Decap CMS Docs: https://decapcms.org/docs/
- Netlify CMS Docs: https://www.netlifycms.org/docs/
- GitHub Issues: Create issues in your repository

## Local Development

To test the CMS locally:

1. Install dependencies (if using any build tools)
2. Run a local server: `python -m http.server 8000` (Python 3)
3. Access CMS at: `http://localhost:8000/admin`
4. Note: Git Gateway auth won't work locally, use test data

## Next Steps

1. Deploy site to Netlify (see Step 1-5 above)
2. Enable Netlify Identity and Git Gateway
3. Invite content managers
4. Test editing workflow with a sample page
5. Train team on using the CMS
6. Monitor deployments in Netlify dashboard
