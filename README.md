# MONEI Frontend Dashboard

This project is a **React + TypeScript dashboard application** built as a solution for the MONEI Frontend Candidate Test.  
It demonstrates the ability to create a maintainable, responsive, and visually appealing UI with mock payment data, modern components, and interactive features.

---

## 🛠️ Features

- **Analytics Dashboard**
  - Displays Key Performance Indicators (KPIs) such as total payments, total amount, and status breakdown.
  - Modern cards with gradients, hover effects, and responsive design.
  - Ready to integrate with real GraphQL API when available.

- **Payments List**
  - Paginated table showing individual payments.
  - Filters by status and date range.
  - Hover effects and tooltips for better UX.

- **Single Payment View**
  - Detailed view of a payment including metadata and references.
  - Accessible by clicking a payment from the list.

- **Sidebar Navigation**
  - Collapsible sidebar with icons.
  - Tooltips when collapsed.
  - Custom logo integrated.

- **Top Bar**
  - Profile button with gradient hover effects.
  - Fully responsive layout.

- **Mock Data Implementation**
  - Since the provided GraphQL endpoint was not accessible (network errors / staging restrictions), the app uses mock data for all views.
  - The code is structured so that switching to the real API is straightforward.

---

## 🎨 Design Choices

- Gradients for cards and buttons to create a modern SaaS look.
- Shadow and hover effects on tables and KPI cards for better visual hierarchy.
- Sidebar toggle to save space on smaller screens.
- Responsive layout using **Tailwind CSS**.

---

## ⚡ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AzharAlbakri/monei-dashboard.git
cd monei-dashboard
2. Install dependencies
npm install
3. Create a .env file (Optional for API integration)
REACT_APP_API_KEY=your_api_key_here

Note: For this submission, the app uses mock data and does not require the real API key.

4. Run the development server
npm start

Open http://localhost:3000
 to view it in the browser.

5. Build for production
npm run build
🧩 Folder Structure
src/
├─ components/       # React components (Dashboard, PaymentsList, Sidebar, TopBar, etc.)
├─ mockData/         # Mock payment data for testing
├─ services/         # Functions to fetch data (currently returning mock data)
├─ App.tsx           # Main app with routing
└─ index.tsx         # React entry point
🌐 Deployment

The project is deployed on Vercel and can be accessed online:

View https://monei-dashboard.vercel.app/
Replace the above URL with your actual Vercel deployment link.

💡 Notes on API Access

The GraphQL endpoint provided in the test was not accessible from my environment (network error "Failed to fetch").
As a result, the app uses mock data to simulate API responses:

Dashboard KPIs

Payments List

Single Payment view

The code is ready to switch to the real API when access is granted.

🔗 Learn More

React Documentation

Tailwind CSS

React Router

Framer Motion

Recharts

👨‍💻 Author

Azhar Albakri – Candidate for MONEI Frontend Test
```
