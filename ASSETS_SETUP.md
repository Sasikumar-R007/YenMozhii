# Assets Setup Instructions

## Required Assets

The following assets are expected in the `public/assets/` folder:

### Logo
- `YenMozhi logo.png` - Used in Header component

### Product Images
- `YenMozhi Device 1.png` - Used in Solution section
- `YenMozhi Device 2.png` - Used in Solution section

### Field Visit Images
- `fv1.jpg` - Field visit image 1
- `fv2.jpg` - Field visit image 2
- `fv3.jpg` - Field visit image 3
- `fv4.jpg` - Field visit image 4
- `fv5.jpg` - Field visit image 5

## Setup Steps

1. **Create the assets folder**:
   ```bash
   mkdir -p public/assets
   ```

2. **Copy your assets** from the `assests` folder (note: double 's') to `public/assets/`:
   ```bash
   # Windows PowerShell
   Copy-Item -Path "assests\*" -Destination "public\assets\" -Recurse
   
   # Or manually copy the files
   ```

3. **Verify files are in place**:
   ```
   public/
   └── assets/
       ├── YenMozhi logo.png
       ├── YenMozhi Device 1.png
       ├── YenMozhi Device 2.png
       ├── fv1.jpg
       ├── fv2.jpg
       ├── fv3.jpg
       ├── fv4.jpg
       └── fv5.jpg
   ```

## Usage in Components

All images are referenced as:
- `/assets/YenMozhi logo.png`
- `/assets/YenMozhi Device 1.png`
- `/assets/YenMozhi Device 2.png`
- `/assets/fv1.jpg` through `/assets/fv5.jpg`

Next.js automatically serves files from the `public` folder at the root URL path.

## Image Optimization

Next.js Image component is used for automatic optimization:
- Automatic image optimization
- Responsive images
- Lazy loading
- WebP format when supported

## Troubleshooting

If images don't appear:
1. Verify files are in `public/assets/` (not `assests`)
2. Check file names match exactly (case-sensitive)
3. Restart the development server after adding files
4. Check browser console for 404 errors

