
# 🛍️ ECOM — Modern E-commerce Website

A modern, responsive, and user-friendly e-commerce website built with **React.js and Tailwind CSS**. ECOM provides a smooth shopping experience with product browsing, search functionality, product details, cart management, and wishlist features.

## 🌐 Live Demo

🔗 **Live Website:** Add your deployed website URL here

📂 **GitHub Repository:** Add your GitHub repository URL here

---

## ✨ Features

- 🏠 Modern and responsive homepage
- 🛒 Product listing and product details
- 🔍 Dynamic product search
- 🗂️ Category-based product filtering
- ↕️ Product sorting by:
  - Price: Low to High
  - Price: High to Low
  - Rating
  - Newest Products
- ❤️ Wishlist functionality
- 🛍️ Add products to cart
- ➕ Increase and decrease product quantity
- 🗑️ Remove products from cart
- 💾 Cart data stored in LocalStorage
- 📱 Fully responsive design
- 🎨 Modern UI using Tailwind CSS
- 🧭 Navigation using React Router
- ⭐ Product ratings and discount information
- 📦 Dynamic product data from JSON

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React.js | Frontend development |
| JavaScript (ES6+) | Application logic |
| Tailwind CSS | Styling and responsive design |
| React Router DOM | Page navigation |
| Lucide React | Icons |
| LocalStorage | Cart and wishlist data |
| JSON | Product data management |
| Vite | Development and build tool |

---

## 📁 Project Structure

```text
ECOM/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── card.jsx
│   │   ├── Footer/
│   │   └── Home component/
│   │       └── Nav.jsx
│   │
│   ├── data/
│   │   └── Product.json
│   │
│   ├── Pages/
│   │   ├── Home/
│   │   ├── Products/
│   │   │   ├── Product.jsx
│   │   │   └── ProductDetails.jsx
│   │   ├── About/
│   │   ├── Search.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Cart.jsx
│   │   └── page404.jsx
│   │
│   ├── Routes/
│   │   └── Router.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd ECOM
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The project will run on your local development server.

---

## 📦 Main Pages

### 🏠 Home Page

- Attractive hero section
- Featured products
- New arrivals
- Category sections
- Responsive navigation

### 🛍️ Products Page

- Display products by category
- Product cards
- Product pricing
- Discount badges
- Product ratings
- Add to cart functionality

### 🔎 Search Page

- Search products by name, brand, category, and tags
- Category filtering
- Product sorting
- Dynamic search results
- Empty search result state

### 📄 Product Details Page

- Product images
- Product name and brand
- Price and discount
- Product description
- Rating information
- Product purchase options

### ❤️ Wishlist Page

- Display saved products
- Remove products from wishlist
- Move products to cart

### 🛒 Cart Page

- View selected products
- Update product quantity
- Remove products
- Calculate cart total
- Store cart data using LocalStorage

---

## 🧩 Product Data Structure

Products are managed through a JSON data file.

```javascript
{
  id: 1,
  name: "Product Name",
  slug: "product-name",
  category: "Garments",
  brand: "Brand Name",
  images: [],
  details: {
    brief: "Short product description",
    detailed: "Detailed product description"
  },
  price: {
    currency: "INR",
    current: 999,
    original: 1299,
    discountPercentage: 23
  },
  rating: {
    average: 4.5,
    count: 120
  },
  tags: ["featured", "new-arrival"]
}
```

---

## 💾 LocalStorage

The project uses browser LocalStorage to maintain cart and wishlist information.

### Cart Storage Key

```javascript
"ecom-cart"
```

### Wishlist Storage Key

```javascript
"ecom-wishlist"
```

This allows product data to remain available after refreshing the page in the same browser.

---

## 🎨 Design

The project follows a modern e-commerce design approach with:

- Warm beige backgrounds
- Terracotta accent colors
- Chocolate-brown typography
- Clean product cards
- Responsive layouts
- Smooth hover effects
- Mobile-friendly navigation

---

## 🧠 React Concepts Used

This project helps demonstrate practical React concepts, including:

- Functional Components
- Props
- State Management
- `useState`
- `useEffect`
- `useMemo`
- React Router
- Dynamic Routes
- Search and Filtering
- Array Methods
- Conditional Rendering
- Component Reusability
- LocalStorage Integration
- Event Handling

---

## 🔮 Future Improvements

- [ ] User authentication
- [ ] Backend API integration
- [ ] Database integration
- [ ] Online payment integration
- [ ] Order history
- [ ] Admin dashboard
- [ ] Product reviews
- [ ] Stock management
- [ ] User profile
- [ ] Advanced filter system
- [ ] Product pagination
- [ ] Backend-based wishlist and cart
- [ ] Order tracking

---

## 📸 Screenshots

Add screenshots of your project here.

```text
screenshots/
├── home.png
├── products.png
├── product-details.png
├── search.png
├── wishlist.png
└── cart.png
```

Example:

```markdown
![Home Page](./screenshots/home.png)
```

---

## 👨‍💻 Developer

### Vishal Mall

Frontend Developer | React.js Developer

I am a frontend developer passionate about building modern, responsive, and user-friendly web applications using React.js and modern frontend technologies.

### Tech Skills

- HTML5
- CSS3
- JavaScript
- React.js
- Tailwind CSS
- React Router
- Git & GitHub
- Responsive Web Design

---

## 🔗 Connect With Me

- **Portfolio:** https://vishalmall.vercel.app/
- **GitHub:** https://github.com/vishalmall8419
- **Email:** vishalmall02@outlook.com

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is created for learning and portfolio purposes.
