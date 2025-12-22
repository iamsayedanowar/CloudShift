# CloudShift

**CloudShift** is a modern cloud storage solution built with **React**, **Vite**, and **Shadcn UI**, **Appwrite** for backend authentication and **ImageKit** for optimized media storage and delivery.

---

## Features

- **Secure Authentication**: Google OAuth integration via Appwrite.  
- **File Management**: Upload, view, and manage files securely.  
- **Media Optimization**: Real-time image optimization and delivery using ImageKit.  
- **Modern UI**: Clean and responsive interface built with Shadcn UI and Tailwind CSS.

---

## Tech Stack

**Frontend**
- React  
- Vite  
- TypeScript  
- Tailwind CSS  
- Shadcn UI  

**Backend**
- Appwrite (Auth, Database, Functions)

**Storage**
- ImageKit API

---

## Getting Started

### Prerequisites

Make sure you have:

- Node.js (v18+ recommended)
- An Appwrite account
- An ImageKit account
- A Google Cloud account (for OAuth)  

---

## Installation

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and add the following keys (See the Configuration Guide below for how to get these values):

```bash
VITE_APPWRITE_PROJECT_ID = "YOUR_APPWRITE_PROJECT_ID"
VITE_APPWRITE_PROJECT_NAME = "Your Project Name"
VITE_APPWRITE_ENDPOINT = "https://appwrite.io/docs/products/network/regions"
VITE_APPWRITE_FN_ID = "YOUR_APPWRITE_FUNCTION_ID"
VITE_IMAGEKIT_API_KEY = "YOUR_IMAGEKIT_API_KEY"
VITE_IMAGEKIT_API_ENDPOINT = "https://api.imagekit.io/v1/files"
VITE_IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/YOUR_IMAGEKITID"
```

### Run the Development Server

```bash
npm run dev
```

---

## Configuration Guide

**1. Appwrite Setup (Auth & Project)**
- **Create Project**
    - Go to the Appwrite Console
    - Click **Create Project**
    - Name it `Your_Choice`
    - **Create Project ID**
    - Select Region
    - **Create**
- **Add Platform**
  - In your project dashboard, click **Get started → Connect your platform → Web**
  - Select **React**
  - Hostname: `localhost` (for development)
  - **Create platform**
- **Get Project ID & Endpoint**
    - Copy the **Project ID**, **Project Name**, and **Endpoint** from Web platform
    - Paste it into `VITE_APPWRITE_PROJECT_ID`, `VITE_APPWRITE_PROJECT_NAME`, `VITE_APPWRITE_ENDPOINT` in your `.env` file

**2. Google OAuth Setup (Appwrite + Google Cloud)**
- **Step A: Configure Appwrite**
    - Go to **Appwrite Project → Auth → Settings**
    - Find **Google** in the OAuth2 Providers list and click it
    - Keep this tab open
    - Copy the **Authorized Redirect URI** Looks like `https://cloud.appwrite.io/v1/account/sessions/oauth2/callback/google/YOUR_APPWRITE_PROJECT_ID`
- **Step B: Configure Google Cloud Console**
  - Go to the **Google Cloud Console**
  - Click the project dropdown top left → **Create New Project**
  - Name it `Your_Choice`
  - Navigate to **APIs & Services → OAuth consent screen → Credentials → Create credentials → OAuth client ID**
    - Fill in:
      - App Name: `Your_Choice`
      - User Support Email
      - Select **External**
      - Developer Contact Info
      - Click **Create**
  - Click **OAuth client**
  - Application type: **Web Application**
  - Name: `Your_Choice`
  - Authorized JavaScript origins: `http://localhost:5173`
  - Authorized redirect URIs: `Paste the URI copied from Appwrite (Step A)`
  - Click **Create**
  - Copy the **Client ID** and **Client Secret**
- **Step C: Finalize Appwrite**
  - Go back to the **Appwrite Google OAuth tab**
  - Paste:
    - **App ID → Google Client ID**
    - **App Secret → Google Client Secret**
  - **Enabled** Google OAuth2 Provider
  - Click **Update**

**3. ImageKit Setup**
- Create an account at **ImageKit.io**
- Go to the **Developer options**
- Locate your **URL Endpoint**
  - Format: `https://ik.imagekit.io/YOUR_IMAGEKITID`
  - Paste it into `VITE_IMAGEKIT_URL_ENDPOINT`
- Copy the **Private Key**
  - Paste it into `VITE_IMAGEKIT_API_KEY`
- Ensure: `VITE_IMAGEKIT_API_ENDPOINT = "https://api.imagekit.io/v1/files"`

**4. Appwrite Functions**
- **Fork** the repository [imagekit-auth](https://github.com/iamsayedanowar/imagekit-auth)
- Go to **Appwrite Console → Your Project → Functions → Create function**
- Connect **Git repository**
- Select **imagekit-auth → Connect**
- Entrypoint: `src/main.js`
- Build settings: `npm install`
- Execute access: **Add a role → All users**
- Click **Deploy**
- Go to **imagekit-auth Functions Settings → Environment variables → Create a variable to get started**
  - Add these variables:
    - `IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/YOUR_IMAGEKITID"`
    - `IMAGEKIT_PUBLIC_KEY = "YOUR_IMAGEKIT_PUBLIC_KEY"`
    - `IMAGEKIT_PRIVATE_KEY = "YOUR_IMAGEKIT_PRIVATE_KEY"`
- Redeploy the function **Create deployment → Git → Create**
- Copy the **Function ID** and paste it into `VITE_APPWRITE_FN_ID`