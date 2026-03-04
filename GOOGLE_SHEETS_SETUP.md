# Google Sheets Menu Integration Setup

This guide will help you set up a Google Sheet to manage the food menu dynamically.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "VIP-RU Food Menu"
3. Share the sheet with **anyone with the link** (set to "Viewer")

## Step 2: Structure Your Google Sheet

Create the following columns in your sheet:

| category | item_name | description | price | image_url |
|----------|-----------|-------------|-------|-----------|
| Закуски и аперитивы | Schwarzbrotcroutons | Черные сухарики с сыром, крабом, икрой лосося или черной икрой | €8 | https://yourdomain.com/images/banua1.jpg |
| Закуски и аперитивы | Erdnüsse | Жареный соленый арахис | €4 | https://yourdomain.com/images/banua2.jpg |
| Салаты | Sauerkrautsalat | Капустный салат с луком и маслом | €6 | https://yourdomain.com/images/hamam2.jpg |

**Column Details:**
- **category**: The section name (e.g., "Закуски и аперитивы", "Салаты", "Основные блюда")
- **item_name**: The dish name
- **description**: Description of the dish
- **price**: Price in format €X (e.g., €8)
- **image_url**: Full URL to the image (or leave blank for no image)

## Step 3: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Copy and paste the code below into the editor:

```javascript
function doGet(e) {
  try {
    // Get the active spreadsheet - change "VIP-RU Food Menu" to your sheet name
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row
    const headers = data[0];
    const rows = data.slice(1);
    
    // Find column indices
    const categoryIdx = headers.indexOf('category');
    const itemNameIdx = headers.indexOf('item_name');
    const descriptionIdx = headers.indexOf('description');
    const priceIdx = headers.indexOf('price');
    const imageUrlIdx = headers.indexOf('image_url');
    
    // Group items by category
    const categories = {};
    
    rows.forEach(row => {
      if (row[categoryIdx]) { // Skip empty rows
        const category = row[categoryIdx];
        
        if (!categories[category]) {
          categories[category] = {
            name: category,
            items: []
          };
        }
        
        categories[category].items.push({
          name: row[itemNameIdx] || '',
          description: row[descriptionIdx] || '',
          price: row[priceIdx] || '',
          image: row[imageUrlIdx] || ''
        });
      }
    });
    
    // Convert to array maintaining order
    const categoryArray = Object.values(categories);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      categories: categoryArray
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy** → **New Deployment**
5. Select type: **Web app**
6. Execute as: Choose your Google account
7. Who has access: Select "Anyone"
8. Click **Deploy**
9. Copy the deployment URL (it will look like: `https://script.google.com/macros/s/SCRIPT_ID/usercopy`)

## Step 4: Update food.html

Replace the placeholder in food.html:

Find this line in the JavaScript section:
```javascript
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/usercopy';
```

Replace `YOUR_SCRIPT_ID` with your actual Script ID from Step 3.

## Step 5: Test

1. Refresh your food.html page
2. The menu should now load from Google Sheets
3. If you see errors in the browser console, check:
   - The Script URL is correct
   - Column names match exactly (case-sensitive)
   - The sheet is shared publicly

## Updating the Menu

To update the menu:
1. Open your Google Sheet
2. Edit any cells (name, description, price, image URL)
3. Save the changes
4. Refresh the website - it will automatically load the updated data

## Troubleshooting

### Menu not loading?
- Check browser console (F12) for errors
- Verify the Google Apps Script URL is correct
- Make sure the sheet columns are named exactly: `category`, `item_name`, `description`, `price`, `image_url`
- Ensure the sheet has no empty column headers

### Images not showing?
- Verify image URLs are complete (start with http:// or https://)
- Test the image URL in your browser directly

### Google Apps Script issues?
- Go to Apps Script project settings
- Check execution logs for errors
- Make sure the sheet name exists

## Security Notes

- The deployment is set to "Anyone" so the data is publicly readable
- Do NOT include sensitive information in the menu
- Keep image URLs secure and on a reliable hosting service

## More Help

If you need to edit the Google Apps Script:
1. Go to [Google Apps Script console](https://script.google.com)
2. Select your project
3. Make changes to the code
4. Click **Deploy** and select "Update" on your existing deployment
