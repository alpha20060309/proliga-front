# 🏆 Proliga - Fantasy Football Platform

## 📋 Overview

![Desktop Home Page](./public/Screenshot.png)

Proliga is a cutting-edge fantasy football platform that empowers users to create and manage virtual teams using real-life players and leagues. Built with Next.js 14, it delivers a premium experience for football enthusiasts.

## ⭐ Key Features

| Category           | Features                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------- |
| 🎮 Team Management | • Create and customize dream teams<br>• Real-time player tracking<br>• Dynamic team analytics |
| 🌟 User Experience | • Intuitive, responsive interface<br>• Multi-language support<br>• Secure authentication      |
| 💳 Payments        | • Click Payment System<br>• Payme Payment Integration                                         |

## 🛠️ Technology Stack

| Category    | Technologies                                                |
| ----------- | ----------------------------------------------------------- |
| 🔧 Core     | • Next.js 14.2 & React 18<br>• Supabase<br>• Redux Toolkit  |
| 🎨 UI/UX    | • Radix UI & Material-UI<br>• Tailwind CSS<br>• Uppy        |
| 🌐 Features | • Supabase Auth<br>• i18next<br>• Click & Payme Integration |

## 🚀 Getting Started

### Prerequisites

- 📦 Node.js (LTS version)
- 📥 npm or yarn

### 📥 Installation

1. Clone the repository:

```bash
git clone https://github.com/smarts-uz/proliga-next.git
cd proliga-next
```

2. Install dependencies:

```bash
npm install
```

3. Install dev dependencies:

```bash
npm install -D eslint@^8.57.1 eslint-config-next@^15.1.3 postcss@^8.4.41 prettier@^3.3.3 prettier-plugin-tailwindcss@^0.6.6 tailwindcss@^3.4.17
```

4. Configure environment variables:
   Create a `.env` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
NEXT_PUBLIC_CLICK_SERVICE_ID=your_click_id
NEXT_PUBLIC_PAYME_ID=your_payme_id
```

### 💻 Development

Start the development server:

```bash
npm run dev
```

For static assets:

```bash
node server.js
```

Access at:

- 🌐 Main app: `http://localhost:3030`
- 📁 Static server: `http://proliga.uz/static`

### 🏗️ Production

Build and launch:

```bash
npm run build
npm run start
```

## 🖼️ Image Dimensions

### Banner

| Name         | Width | Height | Aspect Ratio | Format |
| ------------ | ----- | ------ | ------------ | ------ |
| Side Banner  | 160   | 560    | 1:4.5        | \*     |
| Mini Banner  | 360   | 120    | 3:1          | \*     |
| Big Banner   | 360   | 480    | 1:1.5        | \*     |
| Modal Banner | ~1280 | ~720   | 16:9         | \*     |

### Player

| Name  | Width | Height | Aspect Ratio | Format |
| ----- | ----- | ------ | ------------ | ------ |
| Photo | ~100  | ~100   | 1:1          | png    |

### Prizes

| Name    | Width | Height | Aspect Ratio | Format |
| ------- | ----- | ------ | ------------ | ------ |
| Preview | ~600  | ~600   | 1:1          | \*     |

### Club

| Name      | Width | Height | Aspect Ratio | Format |
| --------- | ----- | ------ | ------------ | ------ |
| Club Logo | 40    | 40     | 1:1          | jpeg   |
| T-shirt   | 24    | 24     | 1:1          | svg    |

### News

| Name    | Width | Height | Aspect Ratio | Format |
| ------- | ----- | ------ | ------------ | ------ |
| Preview | ~160  | ~90    | 16:9         | \*     |

### Competition

| Name | Width | Height | Aspect Ratio | Format |
| ---- | ----- | ------ | ------------ | ------ |
| Logo | ~128  | ~128   | 1:1          | \*     |

- Apply minimal/no padding. White background color is added programmatically as fallback.

  Note:

- All sizes are in px.
- \* ~ = fluid height / width
- \* = png / jpeg / jpg / webp
- These guidelines serve as recommendations and are not strictly enforced in most situations.

## 🤝 Support

Need help? We're here for you!

- 📝 Open an issue in the repository
- 📧 Contact our development team at <asror.zk@gmail.com>

## 📄 License

Proprietary software. All rights reserved.
