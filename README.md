# Payment Flow UI - Astro + SolidJS

A modern, secure 2-screen payment flow application built with Astro, SolidJS, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

**Deployed on Vercel:** [Your Vercel URL will go here after deployment]

**GitHub Repository:** [Your GitHub URL will go here]

## 🛠️ Tech Stack

- **Astro** (v4.16.18) - Static site generator
- **SolidJS** (v1.9.3) - Reactive UI components
- **TypeScript** (v5.7.3) - Type safety
- **Tailwind CSS** (v3.4.17) - Utility-first styling
- **Vercel** - Deployment platform

## 🎨 Features

### Screen 1: Payment Form
- Collects payment information:
  - Cardholder name
  - Credit card number (with auto-formatting)
  - Expiry date (MM/YY format)
  - CVV (3 digits)
  - Payment amount
- Client-side validation:
  - All fields required
  - Card number must be 16 digits
  - Expiry date validation (format and expiration check)
  - CVV must be 3 digits
  - Amount must be positive
- Real-time input formatting
- Elegant error handling
- Loading state during payment processing

### Screen 2: Transaction Receipt
- Displays transaction details:
  - Transaction ID (auto-generated)
  - Payment amount
  - Cardholder name
  - Masked card number (**** **** **** 1234)
  - Expiry date
  - Transaction timestamp
  - Status indicator
- Print functionality
- Option to make a new payment

## 🧠 AI Tool Used

**Primary AI Assistant:** Claude (Anthropic)

Claude was used extensively throughout the development process for:
- Project architecture and structure planning
- Component design and implementation
- TypeScript type definitions
- Form validation logic
- UI/UX design decisions
- Code optimization and best practices
- Documentation writing

## 🏗️ Architecture

### Project Structure
```
payment-flow/
├── src/
│   ├── components/
│   │   ├── PaymentForm.tsx    # SolidJS payment form component
│   │   └── Receipt.tsx        # SolidJS receipt component
│   ├── layouts/
│   │   └── Layout.astro       # Base layout with fonts and styles
│   ├── pages/
│   │   ├── index.astro        # Payment form page
│   │   └── receipt.astro      # Receipt page
│   ├── types/
│   │   └── payment.ts         # TypeScript interfaces
├── astro.config.mjs           # Astro configuration
├── tailwind.config.mjs        # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json
```

### Key Design Decisions

1. **State Management**: Used `sessionStorage` to pass payment data between pages, avoiding the need for a complex state management solution while maintaining data across navigation.

2. **Component Architecture**: Leveraged SolidJS for reactive components inside Astro pages, providing fine-grained reactivity for form interactions.

3. **Validation Strategy**: Implemented client-side validation with real-time feedback to enhance user experience and prevent invalid submissions.

4. **Type Safety**: Comprehensive TypeScript interfaces ensure type safety across the application, preventing runtime errors.

5. **Design System**: Custom Tailwind configuration with distinctive color palette (dark blue gradients with gold accents) and typography (Playfair Display + DM Sans) for a premium feel.

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd payment-flow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:4321`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Set up and deploy: Yes
   - Project name: payment-flow (or your preferred name)
   - Framework preset: Astro
   - Build command: `npm run build`
   - Output directory: `dist`

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Astro and configure build settings
6. Click "Deploy"

## 🎯 Component Overview

### PaymentForm.tsx
- Manages form state with SolidJS signals
- Implements validation logic
- Formats card number and expiry date in real-time
- Simulates payment processing with async delay
- Generates mock transaction data
- Stores receipt in sessionStorage
- Navigates to receipt page on success

### Receipt.tsx
- Retrieves transaction data from sessionStorage
- Displays formatted receipt information
- Provides print functionality
- Handles missing data gracefully
- Allows navigation back to payment form

## 🔒 Security Notes

This is a demonstration application with the following limitations:
- No real payment processing
- No backend validation
- No actual API calls
- Transaction data stored in browser sessionStorage

For production use, implement:
- Server-side validation
- Secure payment gateway integration
- HTTPS encryption
- PCI DSS compliance
- Input sanitization
- Rate limiting
- CSRF protection

## 🧪 Testing

### Manual Testing Checklist

**Payment Form:**
- [ ] All fields show validation errors when empty
- [ ] Card number formats correctly (spaces every 4 digits)
- [ ] Expiry date formats as MM/YY
- [ ] CVV accepts only 3 digits
- [ ] Amount accepts only numbers and decimal point
- [ ] Form submits only when all validations pass
- [ ] Loading state appears during processing
- [ ] Navigation to receipt page occurs after success

**Receipt:**
- [ ] All transaction details display correctly
- [ ] Card number is properly masked
- [ ] Timestamp shows current date/time
- [ ] Print button triggers print dialog
- [ ] New Payment button returns to form
- [ ] Direct URL access without transaction shows error state

## 📝 License

This project was created as an assessment assignment.

## 🤝 Contributing

This is an assessment project and is not open for contributions.

## 📧 Contact

For questions about this project, please refer to the assessment guidelines.

---

**Built with ❤️ using Claude AI**
