import { createSignal, Show,  } from 'solid-js';
import type { PaymentFormData, ValidationErrors } from '../types/payment';

export default function PaymentForm() {
  const [formData, setFormData] = createSignal<PaymentFormData>({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: '',
  });

  const [errors, setErrors] = createSignal<ValidationErrors>({});
  const [isProcessing, setIsProcessing] = createSignal(false);

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\s/g, '');
    const match = cleaned.match(/.{1,4}/g);
    return match ? match.join(' ') : cleaned;
  };

  const formatExpiryDate = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value.replace(/\D/g, '').slice(0, 16));
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value.slice(0, 5));
    } else if (field === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    } else if (field === 'amount') {
      formattedValue = value.replace(/[^\d.]/g, '');
    }

    setFormData({ ...formData(), [field]: formattedValue });
    
    // Clear error for this field when user starts typing
    if (errors()[field]) {
      setErrors({ ...errors(), [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const data = formData();

    if (!data.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    } else if (data.cardholderName.trim().length < 3) {
      newErrors.cardholderName = 'Name must be at least 3 characters';
    }

    const cleanCardNumber = data.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cleanCardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    } else if (!/^\d+$/.test(cleanCardNumber)) {
      newErrors.cardNumber = 'Card number must contain only digits';
    }

    const cleanExpiry = data.expiryDate.replace(/\D/g, '');
    if (!data.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (cleanExpiry.length !== 4) {
      newErrors.expiryDate = 'Expiry date must be MM/YY format';
    } else {
      const month = parseInt(cleanExpiry.slice(0, 2));
      const year = parseInt(cleanExpiry.slice(2, 4));
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        newErrors.expiryDate = 'Invalid month';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiryDate = 'Card has expired';
      }
    }

    if (!data.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (data.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    const amount = parseFloat(data.amount);
    if (!data.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (amount > 999999) {
      newErrors.amount = 'Amount is too large';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const data = formData();
    const cleanCardNumber = data.cardNumber.replace(/\s/g, '');
    const maskedCardNumber = '**** **** **** ' + cleanCardNumber.slice(-4);
    //const transactionId = 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
    const transactionId =  "TXN-" + Date.now() + "-" + Math.random().toString(36).slice(2, 11).toUpperCase();

    const receipt = {
      cardholderName: data.cardholderName,
      maskedCardNumber,
      expiryDate: data.expiryDate,
      amount: data.amount,
      transactionId,
      status: 'Success' as const,
      timestamp: new Date().toISOString(),
    };

    // Store receipt data and navigate
    sessionStorage.setItem('paymentReceipt', JSON.stringify(receipt));
    window.location.href = '/receipt';
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4 animate-fade-in">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMS4xMDQuODk2LTIgMi0yczIgLjg5NiAyIDItLjg5NiAyLTIgMi0yLS44OTYtMi0yem0tOCAwYzAtMS4xMDQuODk2LTIgMi0yczIgLjg5NiAyIDItLjg5NiAyLTIgMi0yLS44OTYtMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      <div class="relative w-full max-w-md animate-slide-up">
        <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div class="bg-gradient-to-r from-gold to-accent p-8 text-center">
            <div class="inline-block p-4 bg-white/20 rounded-full mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h1 class="text-3xl font-display font-bold text-white mb-2">Secure Payment</h1>
            <p class="text-white/80 font-body">Enter your payment details below</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} class="p-8 space-y-5">
            {/* Cardholder Name */}
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-white/90 font-body">
                Cardholder Name
              </label>
              <input
                type="text"
                value={formData().cardholderName}
                onInput={(e) => handleInputChange('cardholderName', e.currentTarget.value)}
                placeholder="John Doe"
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
              />
              <Show when={errors().cardholderName}>
                <p class="text-gold text-xs font-body mt-1">{errors().cardholderName}</p>
              </Show>
            </div>

            {/* Card Number */}
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-white/90 font-body">
                Card Number
              </label>
              <input
                type="text"
                value={formData().cardNumber}
                onInput={(e) => handleInputChange('cardNumber', e.currentTarget.value)}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-mono tracking-wider"
              />
              <Show when={errors().cardNumber}>
                <p class="text-gold text-xs font-body mt-1">{errors().cardNumber}</p>
              </Show>
            </div>

            {/* Expiry Date and CVV */}
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="block text-sm font-semibold text-white/90 font-body">
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={formData().expiryDate}
                  onInput={(e) => handleInputChange('expiryDate', e.currentTarget.value)}
                  placeholder="MM/YY"
                  maxLength={5}
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                />
                <Show when={errors().expiryDate}>
                  <p class="text-gold text-xs font-body mt-1">{errors().expiryDate}</p>
                </Show>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-semibold text-white/90 font-body">
                  CVV
                </label>
                <input
                  type="text"
                  value={formData().cvv}
                  onInput={(e) => handleInputChange('cvv', e.currentTarget.value)}
                  placeholder="123"
                  maxLength={3}
                  class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                />
                <Show when={errors().cvv}>
                  <p class="text-gold text-xs font-body mt-1">{errors().cvv}</p>
                </Show>
              </div>
            </div>

            {/* Payment Amount */}
            <div class="space-y-2">
              <label class="block text-sm font-semibold text-white/90 font-body">
                Payment Amount
              </label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-lg font-body">$</span>
                <input
                  type="text"
                  value={formData().amount}
                  onInput={(e) => handleInputChange('amount', e.currentTarget.value)}
                  placeholder="0.00"
                  class="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-body"
                />
              </div>
              <Show when={errors().amount}>
                <p class="text-gold text-xs font-body mt-1">{errors().amount}</p>
              </Show>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing()}
              class="w-full bg-gradient-to-r from-gold to-accent text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-body mt-6"
            >
              <Show
                when={!isProcessing()}
                fallback={
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                }
              >
                <span class="flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Pay Now
                </span>
              </Show>
            </button>

            {/* Security Note */}
            <div class="flex items-center justify-center gap-2 text-white/60 text-xs font-body pt-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured with 256-bit encryption</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
