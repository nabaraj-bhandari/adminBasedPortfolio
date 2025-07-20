# 🚀 Admin-Based Portfolio

A modern, full-stack portfolio website with a comprehensive admin panel for content management. Built with Next.js 13, TypeScript, MongoDB, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎯 Portfolio Features

- **Responsive Design** - Mobile-first, modern UI/UX with grayish dark theme
- **Dynamic Content** - All content managed through admin panel with real-time updates
- **Featured Projects** - Dynamic project showcase that updates immediately when marked as featured
- **Skills Display** - Top 4 skills with animated progress bars and clean layout
- **Contact Form** - Functional contact form with email notifications and database storage
- **Blog System** - Full-featured blog with markdown support and publish/unpublish functionality
- **SEO Optimized** - Meta tags, image optimization, and performance optimized

### 📞 Contact Management System

- **Contact Message Storage** - All messages saved to MongoDB with tracking
- **Admin Message Management** - View, filter, and manage contact messages
- **Email Notifications** - Automatic admin notifications via SendGrid
- **Auto-replies** - Professional confirmation emails to users
- **Priority System** - Mark messages as low, medium, or high priority
- **Status Tracking** - Track read/unread and replied/unreplied status

### 🛠️ Admin Panel Features

- **Secure Authentication** - Password-protected admin access
- **Dashboard Analytics** - Overview of content, stats, and recent activity
- **Contact Message Manager** - Complete contact form management system
- **Content Management** - Full CRUD operations for:
  - Personal information
  - Projects (with featured toggle)
  - Blog posts (with publish/draft functionality)
  - Skills with categories and levels
- **Email Testing** - Test email configuration directly from admin panel
- **Real-time Updates** - Changes reflect immediately on the website
- **Responsive Admin UI** - Mobile-friendly admin interface

### 🎨 Technical Features

- **Server Components** - Next.js 13 App Router with optimized performance
- **TypeScript** - Full type safety throughout the application
- **Database Integration** - MongoDB with Mongoose ODM and comprehensive schemas
- **Email Integration** - SendGrid for transactional emails
- **Modern Styling** - Tailwind CSS with custom grayish dark theme
- **Animation System** - Framer Motion for smooth interactions
- **Image Optimization** - Next.js Image with Cloudinary and Pexels support
- **Bundle Optimization** - Webpack optimizations and bundle analysis
- **Loading States** - Skeleton loaders and optimized loading indicators

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- SendGrid account (for email functionality)
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/adminBasedPortfolio.git
cd admin-based-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# Admin Panel Security
ADMIN_PASSWORD=your-secure-password

# Email Configuration (SendGrid)
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=your-admin-email@yourdomain.com
```

4. **Seed the database** (Optional)

```bash
npm run seed
```

5. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!
Visit `http://localhost:3000/admin` to access the admin panel.

## 📧 Email Setup (SendGrid)

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Create API key with "Mail Send" permissions
3. Verify your sender email/domain
4. Add credentials to `.env.local`
5. Test configuration in Admin Panel → Settings

## 📁 Project Structure

```
├── app/                    # Next.js 13 App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form and message management
│   │   ├── projects/      # Project CRUD and featured projects
│   │   ├── skills/        # Skills management
│   │   ├── blog/          # Blog post management
│   │   └── test-email/    # Email configuration testing
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   └── skills/            # Skills display
├── components/            # Reusable React components
│   ├── admin/             # Admin-specific components
│   │   ├── contact-message-manager.tsx
│   │   ├── email-test-panel.tsx
│   │   └── ...other admin components
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utility functions and configs
│   ├── mongodb.ts         # Database connection and models
│   ├── email-service.ts   # SendGrid email service
│   ├── api-service.ts     # API service functions
│   └── utils.ts           # Helper utilities
├── scripts/               # Database and utility scripts
│   ├── seed.ts            # Database seeding script
│   └── test-connection.ts # Database connection test
└── types/                 # TypeScript type definitions
    └── index.ts           # All type definitions including ContactMessage
```

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/admin-based-portfolio.git
cd admin-based-portfolio
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Admin Panel Security
ADMIN_PASSWORD=your-secure-password
```

4. **Seed the database** (Optional)

```bash
npm run seed
```

5. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## 📁 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── projects/          # Projects showcase
│   └── skills/            # Skills display
├── components/            # Reusable React components
│   ├── admin/             # Admin-specific components
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utility functions and configs
│   ├── mongodb.ts         # Database connection and models
│   ├── api-service.ts     # API service functions
│   └── utils.ts           # Helper utilities
├── scripts/               # Database and utility scripts
│   ├── seed.ts            # Database seeding script
│   └── test-connection.ts # Database connection test
└── types/                 # TypeScript type definitions
```

## 🛠️ Usage

### Admin Panel Access

1. Navigate to `/admin`
2. Enter your admin password
3. Access the dashboard to manage:
   - **Dashboard** - Overview of all content and statistics
   - **Personal Info** - Update your profile information and links
   - **Projects** - Add, edit, delete, and feature projects
   - **Skills** - Manage skills with categories and proficiency levels
   - **Blog** - Create, edit, publish/unpublish blog posts
   - **Contact Messages** - View and manage contact form submissions
   - **Settings** - Test email configuration and system settings

### Contact Message Management

- **View All Messages** - See all contact form submissions with timestamps
- **Filter Messages** - Filter by read/unread, replied/unreplied status
- **Priority Management** - Assign priority levels (low, medium, high)
- **Status Tracking** - Mark messages as read and replied
- **Email Integration** - Automatic notifications and auto-replies

### Featured Projects

- Mark any project as "featured" in the admin panel
- Featured projects automatically appear on the home page
- Changes are reflected immediately (no caching)
- Maximum of 6 featured projects displayed

### Skills Display

- Home page shows top 4 skills for clean design
- Skills page shows all skills with categories
- Admin can manage skill levels and categories
- Animated progress bars show proficiency levels

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Deploy portfolio"
git push origin main
```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables for Production**

```env
MONGODB_URI=your-production-mongodb-uri
ADMIN_PASSWORD=your-secure-admin-password
SENDGRID_API_KEY=your-sendgrid-api-key
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=your-admin-email@yourdomain.com
```

### Email Configuration in Production

- Verify your sender domain in SendGrid
- Use a professional email address for FROM_EMAIL
- Set up SPF/DKIM records for better deliverability
- Test email functionality using Admin Panel → Settings

## 🛡️ Security Features

- **Password Protection** - Admin panel secured with environment-based password
- **Input Validation** - All forms validated with proper schemas
- **Data Sanitization** - Content sanitized before database storage
- **Email Security** - Secure SendGrid integration with API keys
- **Environment Variables** - Sensitive data stored in environment variables
- **Type Safety** - TypeScript prevents runtime errors

## 🔧 Built With

### Frontend

- **[Next.js 13](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[SendGrid](https://sendgrid.com/)** - Email delivery service
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking
- **[Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)** - Bundle size analysis

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run seed         # Seed database with sample data
npm run test-db      # Test database connection

# Analysis
npm run analyze      # Analyze bundle size
```

## 🎯 Key Features Implemented

### Performance Optimizations

- ✅ Bundle optimization with webpack configurations
- ✅ Image optimization with Next.js Image component
- ✅ Dynamic imports and code splitting
- ✅ Removed unnecessary caching for real-time updates

### Contact System

- ✅ Functional contact form with validation
- ✅ Database storage for all messages
- ✅ Admin panel for message management
- ✅ Email notifications via SendGrid
- ✅ Auto-reply functionality
- ✅ Priority and status tracking

### Admin Experience

- ✅ Comprehensive admin dashboard
- ✅ Real-time content updates
- ✅ Email testing functionality
- ✅ Message filtering and management
- ✅ Project featuring system
- ✅ Skills management

### User Experience

- ✅ Grayish dark theme for better aesthetics
- ✅ Responsive design on all devices
- ✅ Smooth animations and transitions
- ✅ Fast loading with optimized assets
- ✅ Clean, focused content layout

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

If you find this project helpful, please give it a ⭐ on GitHub!

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn]
- **GitHub**: [Your GitHub]

---

**Made with ❤️ using Next.js and TypeScript**
