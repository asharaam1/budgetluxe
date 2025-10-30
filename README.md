# Budget Luxe

## Project Summary

Budget Luxe is a Next.js application built for a luxury marketplace where users can buy and sell high-end products. The app includes user authentication via Firebase, product management with Firestore, image uploads to Cloudinary, admin approval workflows, and WhatsApp-based ordering for a seamless shopping experience.

## Prerequisites

- Node.js (version 18 or higher)
- A Firebase project with Firestore enabled
- A Cloudinary account for image storage and uploads

## Quick Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd budgetluxe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local.template` to `.env.local`
   - Fill in your actual Firebase and Cloudinary credentials

4. Deploy Firestore security rules:
   - Open Firebase Console > Firestore > Rules
   - Replace the default rules with the content from `firestore.rules`

5. Seed sample data:
   - Use the Firebase Console or Admin SDK to add the sample products JSON to the 'products' collection
   - Optionally, create an admin user and set their role in the 'users' collection

## Commands

- Start development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm start`

## Deployment on Vercel

1. Connect your GitHub repository to Vercel.
2. In the Vercel dashboard, add the following environment variables:
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
3. Deploy the application.

## Features

- User authentication (sign up, login, logout)
- Product creation and listing
- Image upload and management
- Admin product approval
- Product browsing and details
- WhatsApp ordering integration
- Responsive design with Tailwind CSS
- Favorites management via localStorage
