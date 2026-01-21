# YenMozhi - Official Website

A professional, research-grade website for YenMozhi, a stand-alone assistive communication device designed for autistic and speech-impaired individuals.

## Project Overview

YenMozhi is an assistive technology project that converts natural sounds into meaningful voice output, enabling touchless, affordable communication for individuals with communication challenges.

## Website Structure

### Main Sections

1. **Hero Section** - Clear emotional headline and call-to-action buttons
2. **Problem Statement** - Real-world communication challenges
3. **Solution** - YenMozhi overview with Tamil quote
4. **Technology Overview** - High-level system architecture
5. **Key Features** - Touchless interaction, emergency usability, affordability
6. **Target Users & Impact** - User groups and social impact
7. **Development Journey** - Timeline from concept to scaling
8. **Vision & Future Scope** - AI personalization, CSR deployment
9. **Team** - Team Symphonix information
10. **Contact & Collaboration** - Contact information and partnership CTAs

### Live Demo Interface

Located at `/demo`, the Live Demonstration interface provides:

- **Hardware Connection**: Web Bluetooth and Web Serial API support for device connection
- **Demo Mode**: Simulation mode for testing without hardware
- **Sound Samples**: Pre-configured sound inputs with voice output
- **Status Indicators**: Real-time connection and activity status

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **TypeScript**: Full type safety
- **Hosting**: Vercel-ready

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Demo vs Real Hardware

### Demo Mode

The demo interface (`/demo`) includes a simulation mode that demonstrates YenMozhi's functionality without requiring physical hardware. This mode:

- Uses browser Speech Synthesis API for voice output
- Simulates device connection status
- Provides all UI interactions for testing and demonstration

### Hardware Integration

For actual hardware integration, the following needs to be implemented:

1. **Bluetooth Connection**:
   - Replace placeholder in `components/demo/LiveDemo.tsx` with actual Bluetooth device service UUIDs
   - Implement characteristic reading/writing for command transmission
   - Add error handling for device disconnections

2. **Serial Connection**:
   - Configure baud rate and port settings
   - Implement serial data transmission protocols
   - Add parsing for device responses

3. **Device Communication Protocol**:
   - Define command structure for triggering sounds
   - Implement response handling from device
   - Add status monitoring and feedback

### Browser Compatibility

- **Web Bluetooth**: Supported in Chrome, Edge, Opera (HTTPS required)
- **Web Serial**: Supported in Chrome, Edge, Opera (HTTPS required)
- **Demo Mode**: Works in all modern browsers

## Accessibility

The website is designed with WCAG accessibility guidelines in mind:

- Semantic HTML structure
- Keyboard navigation support
- Focus indicators
- ARIA labels where appropriate
- Readable color contrasts
- Responsive design for all screen sizes

## Customization

### Update Team Information

Edit `components/sections/Team.tsx` to add actual team member details.

### Update Contact Information

Edit `components/sections/Contact.tsx` to add contact email and other details.

### Modify Color Scheme

Update `tailwind.config.ts` to customize the color palette.

## Deployment

The website is optimized for Vercel deployment. Simply connect your repository to Vercel for automatic deployments.

## Important Notes

- **Not a Marketing Site**: This is a professional, research-grade platform for showcasing assistive technology
- **Confidential Information**: Do not expose proprietary algorithms, firmware logic, or IP details
- **Demo Interface Warning**: The demo interface clearly indicates it's not final product firmware
- **Accessibility First**: All design decisions prioritize accessibility and usability

## License

[Add appropriate license information]

## Contact

Team Symphonix
[Update with contact information]

---

**YenMozhi** - Empowering Communication, One Sound at a Time

