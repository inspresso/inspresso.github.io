# Inspresso - Blog & Design Platform

Inspresso is a modern, responsive blog platform for a logo designing brand. Built with pure HTML, CSS, and JavaScript - no backend required! Perfect for hosting on GitHub Pages.

## 🌐 Live Demo

[Visit Inspresso](https://inspresso.github.io) (GitHub Pages)

## ✨ Features

- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **☕ Coffee-Themed UI**: Beautiful color palette inspired by coffee culture
- **📚 Blog Management**: Browse blogs by multiple categories and subcategories
- **💬 Comments System**: Add comments to blog posts (stored in localStorage)
- **👤 User Authentication**: Register and login with localStorage-based persistence
- **🔍 Search & Filter**: Filter blogs by category, sort by date/popularity
- **📰 Blog Features**: Sharing, printing, copying links, detailed metadata
- **📧 Newsletter**: Subscribe to updates
- **⚡ Fast & Lightweight**: No backend server, no database, pure frontend

## 📁 Project Structure

```
inspresso.github.io/
├── public/
│   ├── index.html              # Homepage
│   ├── css/
│   │   ├── style.css           # Global styles
│   │   ├── navbar.css          # Navigation styling
│   │   ├── footer.css          # Footer styling
│   │   └── blog-grid.css       # Blog grid layout
│   ├── js/
│   │   ├── mockdata.js         # Sample data & storage manager
│   │   ├── main.js             # Core functionality
│   │   ├── navbar.js           # Navigation logic
│   │   ├── blog-listing.js     # Blog listing & pagination
│   │   ├── full-blog.js        # Full blog display & comments
│   │   ├── login.js            # Authentication
│   │   ├── about-us.js         # About page logic
│   │   └── policy.js           # Privacy policy page logic
│   ├── images/                 # Static images
│   └── pages/
│       ├── blog-listing.html   # Category blog listings
│       ├── full-blog.html      # Single blog view
│       ├── login.html          # Login/signup page
│       ├── about-us.html       # About Us page
│       └── privacy-policy.html # Privacy Policy page
├── data/                       # Static data files
├── README.md                   # This file
└── .gitignore                  # Git ignore rules
```

## 🎨 Color Palette

```
Primary Colors:
- Dark Coffee: #2c1810
- Rich Brown: #5c4033
- Medium Coffee: #8b6f47
- Coffee Accent: #c17a5c
- Light Cream: #f5ede3
```

## 📊 Data Structure

### Blog Object
```javascript
{
  id: 1,
  title: "Blog Title",
  category: "education",
  subcategory: "primary",
  description: "Short description",
  content: "Full blog content",
  author: "Author Name",
  date: "2025-01-15",
  readTime: "5 min",
  image: "📚",
  views: 234,
  likes: 45
}
```

### Categories & Subcategories
- **Educational**: Primary, Secondary
- **Entertaining**: Musical, Theatre, Dancing, Art
- **Lifestyle**: Beauty, Mental Health, Health, Brain Improvements
- **Scientific**: Chemistry, Physics, Biology, Mathematics

## 🔐 Authentication

### Demo User
- **Email**: `demo@inspresso.com`
- **Password**: `demo123`

Users can register new accounts, which are stored in browser's localStorage.

## 💾 Data Storage

All data is stored in browser's localStorage:
- `inspresso_blogs` - Blog posts
- `inspresso_users` - User accounts
- `inspresso_comments_[blogId]` - Comments for each blog
- `inspresso_currentUser` - Currently logged-in user
- `inspresso_liked_blogs` - User's liked blogs

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/inspresso/inspresso.github.io.git
   cd inspresso.github.io
   ```

2. **Start a local server** (optional, for development)
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server
   ```

3. **Open in browser**
   - Local: `http://localhost:8000`
   - Or simply open `public/index.html` directly

### Deployment to GitHub Pages

1. **Enable GitHub Pages** in your repository settings
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy Inspresso blog"
   git push origin main
   ```

3. **Access your site**
   - Your site will be available at: `https://yourusername.github.io`

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Icons**: Font Awesome 6.4.0 (CDN)
- **Storage**: Browser localStorage API
- **Hosting**: GitHub Pages

## 📱 Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Android Chrome)

## 🔧 Customization

### Adding New Blogs

1. Open `/public/js/mockdata.js`
2. Add a new blog object to the `blogs` array:
   ```javascript
   {
     id: 15,
     title: "Your Blog Title",
     category: "education",
     subcategory: "primary",
     description: "Your description",
     content: "Your full content",
     author: "Your Name",
     date: "2025-01-20",
     readTime: "5 min",
     image: "📚",
     views: 0,
     likes: 0
   }
   ```

### Changing Colors

1. Open `/public/css/style.css`
2. Modify the CSS variables at the top:
   ```css
   :root {
     --coffee-dark: #2c1810;
     --coffee-brown: #5c4033;
     --coffee-medium: #8b6f47;
     --coffee-accent: #c17a5c;
     --coffee-bg: #f5ede3;
   }
   ```

### Adding New Categories

1. Update `/public/js/mockdata.js` with new category/subcategory combinations
2. Update navigation in HTML files to include new categories

## 📧 Contact & Support

For issues, suggestions, or contributions:
- GitHub Issues: [Report an issue](https://github.com/inspresso/inspresso.github.io/issues)
- Email: support@inspresso.com
- Social Links in footer

## 📄 License

This project is open source and available under the MIT License. See LICENSE file for details.

## 🎯 Roadmap

- [ ] Full-text search functionality
- [ ] Comment moderation system
- [ ] Social media integration
- [ ] Dark mode theme
- [ ] Multiple language support
- [ ] Advanced analytics
- [ ] SEO optimization

## 🙏 Credits

Built with ❤️ for the Inspresso brand - Where Design Meets Coffee Culture.

---

**Last Updated**: January 2025
