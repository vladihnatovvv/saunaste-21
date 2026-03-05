# Sveltia CMS Setup Guide

## Overview

Your website is now prepared for **Sveltia CMS** - a modern, lightweight, and intuitive content management system. This allows clients to edit page content, images, titles, and text without touching the code. Headers, footers, and calculators remain protected.

## What is Sveltia CMS?

Sveltia CMS is an open-source, self-hosted alternative to Decap CMS with:
- ✨ Modern, polished UI
- ⚡ Faster performance
- 🎯 Better user experience
- 🔧 Git-based content management
- 📱 Mobile-friendly admin interface
- 🌍 Multi-language support

## What's Been Set Up

1. **Sveltia CMS Configuration** (`/admin/config.yml`)
   - Configured 7 editable pages with detailed field descriptions
   - Support for markdown content
   - Grouped fields and nested objects
   - File listings with summaries

2. **Admin Interface** (`/admin/index.html`)
   - Loads Sveltia CMS from CDN
   - Responsive design for desktop and mobile

3. **Editable Elements**
   - ✅ Hero section title and lead text
   - ✅ Feature section title and description (with markdown support)
   - ✅ Gallery images and alt text
   - ✅ Gallery titles and subtitles
   - ✅ Video embeds
   - ✅ Food menu items, categories, and prices
   - ❌ Header (protected)
   - ❌ Footer (protected)
   - ❌ Calculator functionality (protected)

## Pages Available for Editing

### Bath Pages (6 pages)
1. **Хамам** (Turkish Bath)
2. **Баня на дровах** (Wood Stove Sauna)
3. **VIP Баня** (VIP Bath)
4. **Lux Баня** (Luxury Bath)
5. **Рыбацкая Баня** (Fisher's Bath)
6. **Массаж** (Massage & Spa)

### Special Page
7. **Меню** (Food Menu) - Manage dishes, categories, and prices

## Deployment Guide

### Option 1: Deploy to Netlify (Recommended)

#### Step 1: Prepare GitHub Repository
```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit with Sveltia CMS"
git remote add origin https://github.com/YOUR_USERNAME/your-repo.git
git push -u origin main
```

#### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Click "New site from Git"
3. Authorize GitHub and select your repository
4. Configure build settings:
   - **Build command**: (leave empty)
   - **Publish directory**: `/` (root)
5. Click "Deploy site"
6. Wait for deployment to complete

#### Step 3: Enable Authentication
1. In Netlify dashboard, go to **Site Settings**
2. Navigate to **Identity** section
3. Click **"Enable Identity"**
4. Under **Registrations**, select:
   - "Invite only" (recommended for security)
   - OR "Open" (allow anyone to sign up)
5. Under **Services**, click **"Enable Git Gateway"**

#### Step 4: Invite Team Members
1. Go to **Identity** > **Users**
2. Click **"Invite users"**
3. Enter email addresses of content managers
4. They'll receive invitation emails
5. Users set their own passwords

#### Step 5: Access Admin Panel
- **URL**: `https://your-site.netlify.app/admin`
- Users log in with email and password

---

### Option 2: Deploy to Vercel

#### Step 1-2: Same as Netlify (GitHub repo)

#### Step 3: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Add New..." > "Project"
3. Import GitHub repository
4. Click "Deploy"

#### Step 4: Enable Authentication
Vercel doesn't have built-in authentication. You need to use one of:
- **Netlify Auth** (recommended - works with Vercel)
- **GitHub OAuth** (requires configuration)
- **Auth0** (third-party service)

For easiest setup, use Netlify's Git Gateway:
1. Create Netlify site for same repo
2. Enable Git Gateway (don't deploy to Netlify)
3. Use Netlify's auth with Vercel-hosted site

---

### Option 3: Deploy to GitHub Pages

#### Step 1: Enable GitHub Pages
1. Go to repository **Settings**
2. Navigate to **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** → **/root**
4. Click "Save"

#### Step 2: Set Up Authentication
GitHub Pages is static only. For authentication, you need:
- **Netlify Edge Functions** for auth middleware
- **Cloudflare Workers** for auth handling
- **Third-party auth service** (Auth0, Supabase)

**Simplest approach**: Use Netlify's Git Gateway (deploy GitHub Pages + use Netlify auth)

---

### Option 4: Self-Hosted (Advanced)

Deploy to your own server/VPS:

1. **Copy files** to your web server
2. **Set up authentication** using:
   - Netlify Edge Functions
   - Cloudflare Workers
   - Custom Node.js/Python backend
3. **Configure Git access** for content updates

---

## User Management & Workflow

### Administrator Tasks:

#### Initial Setup
```
1. Deploy site to hosting (see above)
2. Enable identity/authentication
3. Create user accounts for team members
4. Share admin URL with team
```

#### Managing Users
- **Invite**: Send invitations to new editors
- **Remove**: Disable access for former team members
- **Reset Password**: Help users who forgot passwords
- **Roles**: (Optional) Set permissions per user

### Content Manager Workflow:

#### Daily Tasks
1. Navigate to `/admin` on your site
2. Log in with email and password
3. Click on a page to edit (e.g., "Хамам")
4. Edit content using the form fields
5. **Draft mode**: Save without publishing
6. **Publish**: Click "Publish" when ready
7. Changes appear live in seconds

#### Editing Tips
- **Markdown**: Feature descriptions support markdown formatting:
  - `**bold**` for bold text
  - `*italic*` for italics
  - `- item` for lists
  - `[link](url)` for links
- **Images**: Upload directly to `/images` folder
- **Videos**: Provide path or URL to video file
- **Alt text**: Always add descriptions for images (SEO + accessibility)

---

## Field Types Reference

| Field Type | Usage | Example |
|------------|-------|---------|
| `string` | Single-line text | "Хамам" |
| `text` | Multi-line text | Description paragraph |
| `markdown` | Formatted text | Rich descriptions with bold, links, lists |
| `image` | Image upload | Bath photos, dishes |
| `object` | Grouped fields | Feature section with title + description |
| `list` | Repeating items | Gallery images, menu items |
| `select` | Dropdown menu | Category selection |

---

## File Structure

```
/
├── admin/
│   ├── config.yml          # Sveltia CMS configuration
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
├── fonts/                  # Fonts (protected)
├── SVELTIA_CMS_SETUP.md   # This file
└── DECAP_CMS_SETUP.md     # Previous setup (can delete)
```

---

## Configuration Details

### Backend Configuration
```yaml
backend:
  name: git-gateway          # Uses Netlify's Git Gateway
  branch: main               # Commits go to main branch
```

### Media Folder
```yaml
media_folder: "images"       # Where uploads go
public_folder: "/images"     # How they're referenced in HTML
```

### Collections
Each page is a "collection" with "fields" that editors can modify.

**Example Field:**
```yaml
- label: "Hero Title"        # Label shown in admin UI
  name: "hero_title"         # Variable name in config
  widget: "string"           # Field type
  default: "Баня — это не просто жар"  # Default value
  hint: "Main page heading"  # Help text for editor
```

---

## Customization

### Add a New Editable Page

1. Open `/admin/config.yml`
2. Find `collections` > `files` section
3. Add new entry:

```yaml
- name: "new-page"
  label: "New Page Label"
  file: "new-page.html"
  description: "Description shown in admin"
  fields:
    - label: "Title"
      name: "title"
      widget: "string"
    - label: "Content"
      name: "content"
      widget: "markdown"
```

### Add a New Field to Existing Page

1. Open `/admin/config.yml`
2. Find the page section
3. Add field in `fields` array:

```yaml
- label: "Field Label"
  name: "field_name"
  widget: "string"
  hint: "Help text for editor"
```

### Change Widget Type

Available widgets:
- **string** - Single line text input
- **text** - Multi-line text area
- **markdown** - Rich text with formatting
- **image** - Image upload
- **list** - Repeating items
- **object** - Grouped related fields
- **select** - Dropdown menu
- **number** - Numeric input
- **boolean** - Yes/No checkbox
- **date** - Date picker
- **datetime** - Date and time picker

---

## Troubleshooting

### CMS Won't Load

**Problem**: Blank page or "Not Found" at `/admin`

**Solutions**:
- Check that `/admin/index.html` exists
- Verify `/admin/config.yml` has valid YAML syntax
- Check browser console (F12) for error messages
- Clear browser cache and reload
- Try different browser

### Authentication Not Working

**Problem**: "Identity" or login button missing

**Solutions**:
- Verify Git Gateway is enabled in hosting provider
- Check that user is invited (not just registered)
- Clear cookies and try again
- Use incognito/private window
- Verify hosting provider supports auth (Netlify recommended)

### Images Not Uploading

**Problem**: Upload fails or images don't appear

**Solutions**:
- Check file size (max recommended: 5MB)
- Use supported formats: JPEG, PNG, WebP, GIF
- Verify `/images` folder exists
- Check file permissions on server
- Try uploading to root `/images` instead of subfolder

### Changes Not Appearing

**Problem**: Edited content not showing on live site

**Solutions**:
- Wait 5-10 seconds for deployment
- Check hosting provider dashboard for build status
- Clear browser cache (Ctrl+Shift+Del)
- Check that you clicked "Publish"
- Review Git commit history for changes

### Can't Find a Page to Edit

**Problem**: Expected page missing from CMS

**Solutions**:
- Verify page is listed in `/admin/config.yml`
- Check file name matches exactly (case-sensitive)
- Ensure file exists in project root
- Rebuild configuration if recently added

---

## Security Best Practices

1. **Always use "Invite only" registration** (not "Open")
2. **Use strong passwords** for admin accounts
3. **Enable two-factor authentication** if available
4. **Remove access for inactive users** regularly
5. **Monitor who has edit permissions**
6. **Keep backups** of content (Git history provides this)
7. **Review changes** before they go live (if using draft mode)

---

## Performance Tips

1. **Optimize images** before uploading (compress if >1MB)
2. **Use descriptive alt text** (helps SEO)
3. **Keep descriptions concise** (faster to load)
4. **Avoid very large videos** (host on external service instead)
5. **Use markdown** instead of HTML (cleaner, faster)

---

## Backup & Recovery

### Automatic Backups
Git provides version control. Every publish creates a new commit.

**View history**:
1. Go to GitHub repository
2. Click "commits" tab
3. See all content changes with timestamps
4. Can revert to any previous version

### Manual Backup
```bash
git clone https://github.com/YOUR_USERNAME/your-repo.git
```

---

## Advanced Configuration

### Custom Validation

Add validation to fields:
```yaml
- label: "Price"
  name: "price"
  widget: "string"
  pattern: ['^\d+\.\d{2}€$', "Format: 12.50€"]
```

### Conditional Fields

Show/hide fields based on other fields:
```yaml
- label: "Has Image?"
  name: "has_image"
  widget: "boolean"
- label: "Image"
  name: "image"
  widget: "image"
  condition: "{has_image}"
```

### Default Values

Set automatic defaults:
```yaml
- label: "Date Created"
  name: "date"
  widget: "date"
  default: "{% now 'YYYY-MM-DD' %}"
```

---

## Support & Documentation

- **Sveltia CMS Official Docs**: https://sveltia.github.io/cms/
- **GitHub Repository**: https://github.com/sveltia/cms
- **Configuration Reference**: https://sveltia.github.io/cms/configuration/
- **Netlify Documentation**: https://docs.netlify.com/
- **Git Gateway Docs**: https://docs.netlify.com/visitor-access/git-gateway/

---

## Migration from Decap CMS

If you previously used Decap CMS:

1. **Config files are compatible** - Sveltia CMS uses same YAML format
2. **No data migration needed** - All content stays in Git
3. **Just switch the admin URL** - Old CMS and new CMS can coexist
4. **Update `/admin/index.html`** - Already done for you

---

## Frequently Asked Questions

**Q: Can I edit HTML directly?**
A: No (by design). This prevents breaking the site. Use Markdown for formatting.

**Q: What happens when I publish?**
A: A new commit is made to Git, triggering deployment to live site.

**Q: Can I schedule posts?**
A: Not in standard config, but can be added with custom setup.

**Q: Is it free?**
A: Yes! Sveltia CMS is open-source. Only hosting cost (Netlify free tier available).

**Q: Can multiple people edit at the same time?**
A: Yes, but changes are sequential (Git prevents conflicts).

**Q: Where are images stored?**
A: In the `/images` folder in your Git repository.

**Q: Can I delete pages?**
A: Only via Git. CMS only edits existing pages listed in config.

**Q: How long do changes take to appear?**
A: Usually 5-30 seconds depending on hosting provider.

---

## Next Steps

1. ✅ Sveltia CMS is configured
2. 📤 Deploy site to hosting (Netlify recommended)
3. 🔐 Enable authentication (Git Gateway)
4. 👥 Invite content managers
5. 🧪 Test with a sample edit
6. 📚 Train team on using CMS
7. 🚀 Go live!

---

## Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Visit Sveltia CMS documentation
3. Check your hosting provider's support
4. Post issues on GitHub repositories
