# Neritic Wellness - eCommerce Admin Panel

Welcome to the **Neritic Wellness Admin Panel**. This powerful dashboard provides administrators with complete control over the eCommerce platform, allowing for efficient product management, order tracking, customer oversight, and insightful analytics to drive business decisions.

---

## 🚀 Features

### 🛍️ Product Management

- Add, edit, and delete products with ease.
- Manage product categories, attributes, and variations.
- Upload high-quality product images and detailed descriptions.
- Configure product pricing, discounts, and stock availability.
- Support for bulk product uploads and edits.

### 📦 Order Management

- View and process customer orders efficiently.
- Update order statuses (pending, shipped, delivered, canceled, etc.).
- Generate invoices and detailed transaction reports.
- Filter and search orders based on date, status, or customer.
- Send automated email notifications for order updates.

### 👥 Customer Management

- View and manage registered customers.
- Assign roles and permissions (admin, manager, support, etc.).
- Monitor customer activity and order history.
- Export customer data for analysis and marketing campaigns.

### 📊 Dashboard & Analytics

- Real-time sales performance insights.
- Graphical representation of revenue trends and customer behavior.
- View top-selling products and categories.
- Analyze customer demographics and order frequency.
- Download analytics reports for strategic planning.

### 🔐 User Authentication & Roles

- Secure login with OAuth authentication.
- Role-based access control to manage admin privileges.
- Multi-factor authentication (MFA) support.
- Activity logs to track administrative actions.

### 🔧 Settings & Customization

- Update store information, including branding and contact details.
- Manage payment gateway and shipping configurations.
- Configure tax rates, discount codes, and promotional offers.
- Enable push notifications and email alerts for important updates.

---

## 💻 Tech Stack

### Frontend

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **UI Components:** @mui/material, @mui/x-charts
- **Icons:** Lucide Icons

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Authentication:** OAuth

### Deployment & Hosting

- **Hosting Platforms:** AWS / Vercel
- **CI/CD Integration:** GitHub Actions
- **Performance Monitoring:** LogRocket, Sentry

---

## 📦 Installation Guide

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas or local MongoDB instance
- Cloudinary account (for image uploads)
- AWS / Vercel account for hosting

### Setup

```
# Clone the repository
git clone https://github.com/your-repo/neritic-wellness-admin.git
cd neritic-wellness-admin

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start the development server
npm run dev
```

### Environment Variables

Ensure you configure the `.env` file with the required API keys and database credentials:

```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url
NEXT_PUBLIC_API_BASE_URL=your_backend_api_url
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
```

---

## Screenshots

### Dashboard

![Dashboard](/public//ReadmeImages/Dashboard.png)

### Add Products

![Add Products](/public/ReadmeImages/AddProducts.png)

### Products Lits

![Product Lits](/public/ReadmeImages/ProductLists.png)

---

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute:

1.  Fork the repository.
2.  Create a new branch (`feature-branch-name`).
3.  Commit your changes with clear messages.
4.  Submit a pull request for review.
5.  Report bugs and suggest features via GitHub Issues.

---

## 📜 License

This project is licensed under the **MIT License**.

---

Developed with ❤️ by the **Neritic Wellness** team.
