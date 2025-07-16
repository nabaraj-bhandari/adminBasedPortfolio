# 🚀 Admin-Based Portfolio

A modern, full-stack portfolio website with an integrated admin panel for content management. Built with Next.js 14, TypeScript, MongoDB, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### 🎯 Portfolio Features

- **Responsive Design** - Mobile-first, modern UI/UX
- **Dynamic Content** - All content managed through admin panel
- **Blog System** - Full-featured blog with markdown support
- **Project Showcase** - Interactive project gallery with filters
- **Skills Display** - Animated skill bars with categories
- **Contact Form** - Functional contact form with validation
- **SEO Optimized** - Meta tags, sitemap, and performance optimized

### 🛠️ Admin Panel Features

- **Secure Authentication** - Password-protected admin access
- **Content Management** - Full CRUD operations for all content
- **Real-time Preview** - Live preview for blog posts and content
- **File Management** - Easy image and file uploads
- **Dashboard Analytics** - Overview of site content and activity
- **Responsive Admin UI** - Mobile-friendly admin interface

### 🎨 Technical Features

- **Server Components** - Next.js 14 App Router with SSR
- **TypeScript** - Full type safety throughout the application
- **Database Integration** - MongoDB with Mongoose ODM
- **Modern Styling** - Tailwind CSS with custom components
- **Animation System** - Framer Motion for smooth interactions
- **Form Validation** - Zod schema validation with React Hook Form
- **Toast Notifications** - User feedback with Sonner
- **Loading States** - Skeleton loaders and loading indicators

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

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

# Admin Password
ADMIN_PASSWORD=your-secure-password

# Next.js
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
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
   - Personal information
   - Projects
   - Blog posts
   - Skills
   - Site content

### Customization

- **Styling**: Modify `tailwind.config.ts` and component styles
- **Content**: Use the admin panel or directly edit database
- **Features**: Add new components in the `components/` directory
- **API**: Extend API routes in `app/api/`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
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
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-domain.vercel.app
```

### Alternative Deployments

- **Netlify**: Compatible with serverless functions
- **Railway**: Easy deployment with built-in MongoDB
- **Digital Ocean**: VPS deployment with Docker

## 🛡️ Security Features

- **Password Protection**: Admin panel secured with password authentication
- **Input Validation**: All forms validated with Zod schemas
- **Sanitization**: Content sanitized before database storage
- **Rate Limiting**: API routes protected against abuse
- **CORS Configuration**: Proper cross-origin resource sharing setup

## 🔧 Built With

### Frontend

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation

### Backend

- **[MongoDB](https://www.mongodb.com/)** - NoSQL database
- **[Mongoose](https://mongoosejs.com/)** - MongoDB object modeling
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - Serverless functions

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

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
```

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
