# Port2Port - Vehicle & RORO Shipping Platform

A modern, responsive Next.js application for vehicle and RORO shipping logistics. This platform provides a comprehensive solution for shipping cars, trucks, heavy equipment, and more with full tracking, transparent pricing, and expert handling.

## Overview

Port2Port is a professional shipping logistics platform designed to simplify the process of booking and tracking vehicle shipments. Built with modern web technologies, it offers an intuitive user interface for customers and administrators to manage shipping requests and monitor deliveries.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Language**: TypeScript
- **Font**: Geist (from Google Fonts)
- **Icons**: Lucide React

## Project Structure

```
/vercel/share/port2port-frontend/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── layout.tsx               # Root layout with metadata
│   ├── globals.css              # Global styles and design tokens
│   ├── services/
│   │   └── page.tsx             # Services page
│   ├── how-it-works/
│   │   └── page.tsx             # How it works page
│   ├── routes/
│   │   └── page.tsx             # Shipping routes page
│   ├── track/
│   │   └── page.tsx             # Track shipment page
│   ├── contact/
│   │   └── page.tsx             # Contact form page
│   └── auth/
│       └── page.tsx             # Sign in/Sign up page
├── components/
│   ├── header.tsx               # Navigation header with mobile menu
│   ├── footer.tsx               # Footer with links and social
│   └── ui/                      # shadcn/ui components
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## Pages & Routes

### Homepage (`/`)
- Hero section with value proposition
- Partner logos
- Service highlights
- Why choose us section
- Services grid overview
- Customer testimonials
- Call-to-action section

### Services (`/services`)
- Detailed service offerings
- Service cards with descriptions
- Shipping solution categories
- Ready to ship CTA section

### How It Works (`/how-it-works`)
- Process overview
- Step-by-step guide
- Required shipping documents
- Port operations explanation
- FAQ accordion
- Ready to ship CTA section

### Routes (`/routes`)
- UK departure ports (Southampton, London Gateway, Liverpool)
- Destination markets (East Africa, Southern Africa, West Africa, Asia Pacific)
- Popular shipping routes with timelines
- Important notes about shipping

### Track Shipment (`/track`)
- Tracking number input
- Shipment details display
- Real-time status timeline
- Shipment status tracking
- Newsletter signup

### Contact (`/contact`)
- Contact form (Full name, Email, Subject, Message)
- Photo gallery of vehicles
- Newsletter subscription
- Footer with company info

### Auth (`/auth`)
- Sign In tab
- Sign Up tab
- Form validation
- Authentication UI

## Design System

### Colors
- **Primary**: `#2563EB` (Light Blue)
- **Primary Dark**: `#1C4AB0` (Dark Blue)
- **Accent**: `#FCD34D` (Yellow)
- **Background**: White / `#FFFFFF`
- **Text**: Dark gray / `#0F172A`
- **Borders**: Light gray / `#E5E7EB`

### Typography
- **Font Family**: Geist (Google Fonts)
- **Headings**: Bold, various sizes (sm, lg, xl, 2xl, 3xl)
- **Body**: Regular, 14-16px
- **Line Height**: 1.4-1.6 (leading-relaxed)

### Components
- Buttons (Primary, Secondary, Outline)
- Cards
- Forms (Input fields, Textareas)
- Badges/Chips
- Navigation
- Accordion
- Timeline

## Features

- **Responsive Design**: Mobile-first approach, optimized for all screen sizes
- **Full Navigation**: Header with mobile menu and footer with links
- **Form Handling**: Contact forms, tracking inputs, sign-up interfaces
- **Image Galleries**: Photo grids for services and shipments
- **Timeline Display**: Visual shipment status tracking
- **FAQ Section**: Collapsible accordion for common questions
- **Newsletter Signup**: Email subscription across multiple pages
- **SEO Optimized**: Metadata, descriptions, and semantic HTML

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Clone or Download the Project**
   ```bash
   cd /vercel/share/port2port-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Design Patterns

### Layout
- **Flexbox**: Primary layout method for most components
- **Grid**: Used for multi-column layouts (services, testimonials)
- **Responsive Prefixes**: `md:`, `lg:` for breakpoint-specific styling

### Components
- **shadcn/ui**: Used for consistent, accessible UI components
- **Tailwind CSS**: Utility-first CSS for styling
- **Custom Components**: Header, Footer, and page-specific sections

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

### Deploy to Vercel

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Vercel auto-detects Next.js configuration
4. Click "Deploy"

### Environment Variables
Currently, the application does not require environment variables. Future additions may include:
- API endpoints
- Analytics keys
- Email service credentials

## Future Enhancements

- Backend API integration for real shipment tracking
- User authentication system
- Payment processing
- Admin dashboard for shipment management
- Real-time notifications
- Mobile app

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

This project is proprietary and maintained by Port2Port.

## Contact & Support

For support or inquiries:
- Email: support@port2port.com
- Phone: +234 9062 291 086
- Address: 113400 Mombasa, Kenya

## Changelog

### Version 1.0.0
- Initial release
- All main pages and routes implemented
- Responsive design complete
- Design system established

---

Built with Next.js, Tailwind CSS, and shadcn/ui. Designed for modern shipping logistics solutions.
