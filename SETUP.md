# YenMozhi Website - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
yenmozhi-website/
├── app/
│   ├── demo/              # Live demo page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Homepage
├── components/
│   ├── demo/
│   │   └── LiveDemo.tsx   # Demo interface component
│   ├── sections/          # All section components
│   ├── Footer.tsx
│   └── Header.tsx
├── types/
│   └── global.d.ts        # TypeScript declarations for Web APIs
├── public/                # Static assets
└── ...config files
```

## Customization Checklist

Before deployment, update:

- [ ] **Contact Email** in `components/sections/Contact.tsx`
- [ ] **Team Members** in `components/sections/Team.tsx`
- [ ] **College Affiliation** in `components/sections/Team.tsx`
- [ ] **Bluetooth Service UUIDs** in `components/demo/LiveDemo.tsx` (for hardware integration)
- [ ] **Serial Port Configuration** in `components/demo/LiveDemo.tsx` (for hardware integration)

## Vercel Deployment

1. Push code to GitHub/GitLab/Bitbucket
2. Import project in Vercel
3. Vercel will auto-detect Next.js and configure build settings
4. Deploy!

**Note**: For Web Bluetooth/Serial APIs to work in production, you need HTTPS (Vercel provides this automatically).

## Browser Support

- **Chrome/Edge/Opera**: Full support (Bluetooth & Serial APIs)
- **Firefox/Safari**: Demo mode only (no Bluetooth/Serial APIs)
- **Mobile**: Limited support (check browser compatibility)

## Testing Checklist

- [ ] All sections render correctly
- [ ] Navigation works smoothly
- [ ] Demo interface functions in simulation mode
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Performance (Lighthouse score)

## Next Steps

1. Add actual hardware integration code when device firmware is ready
2. Connect analytics (optional)
3. Set up contact form backend (optional)
4. Add team photos and bios
5. Add case studies/testimonials (when available)

