# Inspresso - Blog & Design Platform

A modern, fully-functional blog website for a logo designing brand with a coffee-themed color palette, complete with user authentication, comments system, and responsive design.

## 📋 Features

### Frontend Features
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Sticky Hamburger Navigation**: Icon-based minimalistic navbar with smooth animations
- **Category Menu**: 4 main categories with submenus (Educational, Entertaining, Lifestyle, Scientific)
- **Blog Listing**: 3x3 grid layout with pagination and sorting options
- **Full Blog View**: Complete blog reading experience with sharing and comment features
- **Login System**: Client-side authentication with form validation
- **Coffee Color Theme**: Professional color palette (dark coffee to light cream)
- **Smooth Animations**: Transitions and animations throughout the site
- **Comment Section**: User comments with real-time updates
- **Social Links**: WhatsApp, Instagram, Telegram integration
- **Static Pages**: About Us and Privacy Policy pages

### Backend Features
- **Express.js Server**: RESTful API with proper routing and middleware
- **SQLite Database**: Lightweight database for blogs, users, comments
- **User Authentication**: JWT-based authentication system
- **Blog Management**: CRUD operations for blogs
- **Comments System**: Post, read, update, delete comments
- **Like System**: Track blog likes
- **View Tracking**: Track blog views
- **Rate Limiting**: Protect API from abuse
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling

## 🎨 Color Palette

```
Dark Espresso: #2c1810
Rich Brown: #5c4033
Medium Coffee: #8b6f47
Light Coffee: #a89968
Cream Coffee: #d4a574
Very Light Cream: #f5ede3
Coffee Accent Red: #c17a5c
```

## 📁 Project Structure

```
inspresso.github.io/
├── public/
│   ├── index.html              # Homepage
│   ├── css/
│   │   ├── style.css           # Global styles
│   │   ├── navbar.css          # Navigation styles
│   │   ├── footer.css          # Footer styles
│   │   └── blog-grid.css       # Blog grid styles
│   ├── js/
│   │   ├── main.js             # Global functionality
│   │   ├── navbar.js           # Navigation logic
│   │   ├── blog-listing.js     # Blog listing logic
│   │   ├── full-blog.js        # Full blog logic
│   │   ├── login.js            # Authentication logic
│   │   ├── about-us.js         # About page logic
│   │   └── policy.js           # Policy page logic
│   └── pages/
│       ├── blog-listing.html   # Category blogs page
│       ├── full-blog.html      # Single blog page
│       ├── login.html          # Login/Signup page
│       ├── about-us.html       # About Us page
│       └── privacy-policy.html # Privacy Policy page
├── server/
│   ├── server.js               # Main server file
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment variables
│   ├── models/
│   │   └── database.js         # Database setup
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── blogs.js            # Blog routes
│   │   ├── comments.js         # Comments routes
│   │   └── users.js            # User routes
│   └── middleware/
│       └── (authentication middleware)
└── data/
    └── inspresso.db            # SQLite database
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/inspresso/inspresso.github.io.git
cd inspresso.github.io
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Configure environment**
Edit `.env` file in the server directory with your configuration.

### Running the Project

1. **Start the backend server**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

The server will start on `http://localhost:5000`

2. **Open the frontend**
- Open `public/index.html` in your browser
- Or serve it with a local server

## 📚 Categories & Subcategories

### 1. Educational
- Primary
- Secondary

### 2. Entertaining
- Musical
- Theatre
- Dancing
- Art

### 3. Lifestyle
- Beauty
- Mental Health
- Health
- Brain Improvements

### 4. Scientific
- Chemistry
- Physics
- Biology
- Mathematics

## 🔐 Authentication

The platform includes a complete authentication system:

- **Registration**: Create new user accounts with email and password
- **Login**: Secure login with JWT tokens
- **Session Management**: Remember me functionality
- **Password Management**: Change password option
- **Social Login**: Ready for Google and GitHub OAuth integration

### Test Credentials (Demo)
```
Email: demo@inspresso.com
Password: demo123
```

## 📱 Blog Features

### Blog Listing
- Filter by category and subcategory
- Sort by (Newest, Oldest, Popular, Reading Time)
- Pagination (9 blogs per page)
- Standardized blog cards

### Full Blog View
- Complete article content
- Author information
- Publication date and reading time
- Share button (Copy, Share, Print, Report)
- Floating scroll-to-top button
- Comments section
- Comment form with validation

## 💬 Comments System

- Post comments with name, email, and text
- Comments stored in database
- Real-time comment display
- Comment validation
- Interactive UI

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout user

### Blogs
- `GET /api/blogs` - Get all blogs with filters
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create blog (requires auth)
- `PUT /api/blogs/:id` - Update blog (requires auth)
- `DELETE /api/blogs/:id` - Delete blog (requires auth)
- `POST /api/blogs/:id/like` - Like a blog

### Comments
- `GET /api/comments/blog/:blogId` - Get blog comments
- `POST /api/comments` - Post comment
- `PUT /api/comments/:id` - Update comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update profile (requires auth)
- `POST /api/users/change-password` - Change password (requires auth)
- `GET /api/users/:id` - Get public user info

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📱 Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px

## 🌟 Key Features Implemented

✅ Sticky hamburger navigation with smooth animations
✅ Category-based blog organization with submenus
✅ 3x3 blog grid with pagination
✅ Full blog viewing experience
✅ Blog sharing (copy link, share, print, report)
✅ Comment system with database storage
✅ Login/Signup with client and server-side validation
✅ User profile management
✅ Responsive design for all devices
✅ Coffee color theme throughout
✅ Smooth animations and transitions
✅ Social media integration
✅ Privacy Policy and About Us pages
✅ Newsletter subscription
✅ Blog search and filtering
✅ Like system for blogs

## 🔧 Technologies Used

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome Icons
- LocalStorage API

### Backend
- Node.js
- Express.js
- SQLite3
- JWT Authentication
- Bcryptjs
- Express Validator
- Helmet (Security)
- CORS

## 📝 Environment Variables

```
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
DATABASE_PATH=./data/inspresso.db
```

## 🐛 Known Limitations

- Social OAuth integration not fully implemented (placeholders in place)
- Email verification not implemented
- Password reset via email not implemented
- Admin panel not included
- Analytics dashboard not included

## 🚀 Future Enhancements

- Email verification system
- Social media OAuth integration
- Admin dashboard for blog management
- Advanced search functionality
- Tags and categories hierarchy
- User comments moderation
- Email notifications
- Analytics and statistics
- Dark mode toggle
- Multi-language support

## 📞 Contact

- **WhatsApp**: +91 9876543210
- **Instagram**: @inspresso
- **Telegram**: @inspresso_support
- **Email**: hello@inspresso.com

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

Inspresso Team - Creative Design & Development Studio

---

**Note**: This is a demonstration platform. For production use, ensure proper security measures including HTTPS, rate limiting, input sanitization, and proper database backups.
