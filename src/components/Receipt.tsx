import { createSignal, onMount, Show } from 'solid-js';
import type { TransactionReceipt } from '../types/payment';

export default function Receipt() {
  const [receipt, setReceipt] = createSignal<TransactionReceipt | null>(null);
  const [isLoading, setIsLoading] = createSignal(true);

  onMount(() => {
    const storedReceipt = sessionStorage.getItem('paymentReceipt');
    
    if (storedReceipt) {
      try {
        const parsedReceipt = JSON.parse(storedReceipt) as TransactionReceipt;
        setTimeout(() => {
          setReceipt(parsedReceipt);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to parse receipt:', error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  });

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: string): string => {
    return parseFloat(amount).toFixed(2);
  };

  const handleNewPayment = () => {
    sessionStorage.removeItem('paymentReceipt');
    window.location.href = '/';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center p-4 animate-fade-in">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzAtMS4xMDQuODk2LTIgMi0yczIgLjg5NiAyIDItLjg5NiAyLTIgMi0yLS44OTYtMi0yem0tOCAwYzAtMS4xMDQuODk2LTIgMi0yczIgLjg5NiAyIDItLjg5NiAyLTIgMi0yLS44OTYtMi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

      <Show
        when={!isLoading()}
        fallback={
          <div class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p class="text-white font-body">Loading receipt...</p>
          </div>
        }
      >
        <Show
          when={receipt()}
          fallback={
            <div class="text-center animate-slide-up">
              <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12">
                <div class="inline-block p-4 bg-gold/20 rounded-full mb-4">
                  <svg class="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 class="text-2xl font-display font-bold text-white mb-4">No Receipt Found</h2>
                <p class="text-white/70 mb-6 font-body">Please complete a payment first</p>
                <button
                  onClick={handleNewPayment}
                  class="bg-gradient-to-r from-gold to-accent text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 font-body"
                >
                  Make a Payment
                </button>
              </div>
            </div>
          }
        >
          {(receiptData) => (
            <div class="relative w-full max-w-lg animate-slide-up">
              <div class="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Success Header */}
                <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-white/10 animate-pulse-soft"></div>
                  <div class="relative z-10">
                    <div class="inline-block p-4 bg-white/20 rounded-full mb-4">
                      <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h1 class="text-3xl font-display font-bold text-white mb-2">Payment Successful!</h1>
                    <p class="text-white/90 font-body">Your transaction has been processed</p>
                  </div>
                </div>

                {/* Receipt Details */}
                <div class="p-8 space-y-6">
                  {/* Transaction ID */}
                  <div class="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <p class="text-white/60 text-sm mb-2 font-body">Transaction ID</p>
                    <p class="text-white font-mono text-lg font-semibold tracking-wider">{receiptData().transactionId}</p>
                  </div>

                  {/* Amount */}
                  <div class="text-center py-6">
                    <p class="text-white/60 text-sm mb-2 font-body">Amount Paid</p>
                    <p class="text-5xl font-display font-bold text-white">
                      ${formatAmount(receiptData().amount)}
                    </p>
                  </div>

                  {/* Divider */}
                  <div class="border-t border-dashed border-white/20"></div>

                  {/* Payment Details */}
                  <div class="space-y-4">
                    <div class="flex justify-between items-center">
                      <span class="text-white/60 font-body">Cardholder</span>
                      <span class="text-white font-semibold font-body">{receiptData().cardholderName}</span>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-white/60 font-body">Card Number</span>
                      <span class="text-white font-mono font-semibold">{receiptData().maskedCardNumber}</span>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-white/60 font-body">Expiry Date</span>
                      <span class="text-white font-semibold font-body">{receiptData().expiryDate}</span>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-white/60 font-body">Transaction Date</span>
                      <span class="text-white font-semibold font-body">{formatDate(receiptData().timestamp)}</span>
                    </div>

                    <div class="flex justify-between items-center">
                      <span class="text-white/60 font-body">Status</span>
                      <span class="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold font-body">
                        <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        {receiptData().status}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div class="flex gap-3 pt-4">
                    <button
                      onClick={handlePrint}
                      class="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 font-body border border-white/20"
                    >
                      <span class="flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                      </span>
                    </button>
                    <button
                      onClick={handleNewPayment}
                      class="flex-1 bg-gradient-to-r from-gold to-accent text-white font-bold py-3 px-6 rounded-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-body"
                    >
                      New Payment
                    </button>
                  </div>

                  {/* Footer Note */}
                  <div class="text-center pt-4">
                    <p class="text-white/40 text-xs font-body">
                      Thank you for your payment. A confirmation email has been sent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Show>
      </Show>
    </div>
  );
}
