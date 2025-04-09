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

### 🔐 Authentication

- Secure login with OAuth authentication.
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
- **UI Components:** Self Made Customized UI Components
- **Icons:** Lucide Icons

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Image Storage:** Cloudinary
- **Authentication:** OAuth

### Deployment & Hosting

- **Hosting Platforms:**  Hostinger / Vercel
- **CI/CD Integration:** GitHub Actions
- **Performance Monitoring:**  Vercel, LogRocket, Sentry

---

## 📦 Usage Guide

### Prerequisites

- Latest Browser (Also compatible with older version)
- Good Internet Connection
- Images For Specific Products to upload
- Authority

### Setup

```
# Clone the repository
git clone https://github.com/Gaurav-Neritic/Neritics_Dashboard
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
MONGO_CLOUD_URL=" "
CLOUDINARY_CLOUD_NAME=" "
CLOUDINARY_API_KEY=" "
CLOUDINARY_SECRET_KEY=" "
```

---

## Screenshots

### Dashboard

![Dashboard](/public//ReadmeImages/Dashboard.png)

### Add Products

![Add Products](/public/ReadmeImages/AddProducts.png)

### Products Lists

![Product Lists](/public/ReadmeImages/ProductLists.png)

---
## 📌 API Documentation


### **Create Product**

**Endpoint:**  `/api/products`  **Method:**  `POST`  **Content-Type:**  `multipart/form-data`

#### **Request Parameters**

The API expects a `multipart/form-data` request containing the following fields:

### **Response Format**  

| Field             | Type    | Description                                  |
|------------------|--------|----------------------------------------------|
| ✅ **success**      | Boolean | Indicates whether the request was successful |
| 💬 **message**      | String  | A message describing the request status     |
| 📦 **product**      | Object  | Contains the details of the created product |
| 🆔 **product.id**   | String  | Unique identifier for the product          |
| 🏷️ **product.title**  | String  | Title of the created product             |
| 📖 **product.description** | String  | Detailed description of the product |
| 💰 **product.price**  | Number  | Price of the product                     |
| 📊 **product.quantity** | Number  | Available quantity                     |
| 🔖 **product.discount** | Number  | Discount applied                      |
| 📂 **product.category** | String  | Category of the product               |
| 📌 **product.type** | String  | Subcategory of the product (if applicable) |
| 📦 **product.stock** | Number  | Stock count                              |
| 🏭 **product.brandName** | String  | Brand of the product                |
| 💊 **product.form** | String  | Form of the product (e.g., tablet, liquid) |
| 🏷️ **product.gst** | Number  | GST applicable on the product             |
| 🔢 **product.hsnCode** | String  | HSN code for tax purposes             |
| 🌍 **product.coo** | String  | Country of origin                        |
| ⏳ **product.shelfLife** | String  | Shelf life of the product             |
| 🌿 **product.isAyurvedic** | Boolean | Whether the product is Ayurvedic   |
| 🥦 **product.suitableFor** | String  | Suitable for Vegetarians (Vegetarian/Non-Vegetarian) |
| 📢 **product.publish** | String  | Publish status (Publish/Draft)         |
| 🏺 **product.container** | String  | Container type                       |
| 🖼️ **product.mainImage** | String  | URL of the main product image        |
| 🖼️ **product.primaryImage** | String  | URL of the primary product image  |
| 🖼️ **product.secondImage** | String  | URL of the secondary product image |
| 🖼️ **product.thirdImage** | String  | URL of the third product image     |
| 🖼️ **product.fourthImage** | String  | URL of the fourth product image    |
| ⏰ **createdAt**   | String  | Timestamp when the product was created    |
| 🔄 **updatedAt**   | String  | Timestamp when the product was last updated |



#### **Response**

-   **Success (200 OK):**
    

```json
{
  "data": {
    "_id": "65abc12345d678ef90gh1234",
    "title": "Herbal Tea",
    "description": "Organic herbal tea with Ayurvedic ingredients",
    "price": 499,
    "discount": 10,
    "quantity": 50,
    "category": "Beverages",
    "brand": "Neritic Wellness",
    "image": [
      "https://res.cloudinary.com/demo/image/upload/mainImage.jpg",
      "https://res.cloudinary.com/demo/image/upload/primaryImage.jpg",
      "https://res.cloudinary.com/demo/image/upload/secondImage.jpg",
      "https://res.cloudinary.com/demo/image/upload/thirdImage.jpg",
      "https://res.cloudinary.com/demo/image/upload/fourthImage.jpg"
    ],
    "listingStatus": true,
    "hsnCode": "123456",
    "gstOnProduct": 5,
    "countryOfOrigin": "India",
    "shelfLife": "12 months",
    "suitableForVegeterian": true,
    "ayurvedic": true,
    "containerType": "Box"
  }
}

```

-   **Error Responses:**
    
    -   `402` - Missing required fields
        
    -   `403` - Image upload failure
        
    -   `401` - Database insertion failure
        
    -   `500` - Internal server error
        

----------
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
