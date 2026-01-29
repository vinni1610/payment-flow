import type { TransactionReceipt } from '../types/payment';

interface TransactionReceiptProps {
  receipt: TransactionReceipt;
}

export default function TransactionReceiptComponent(props: TransactionReceiptProps) {
  const formatAmount = (amount: string): string => {
    return parseFloat(amount).toFixed(2);
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Success Icon */}
        <div class="text-center mb-6">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
          <p class="text-gray-600">Your transaction has been completed</p>
        </div>

        {/* Transaction Details */}
        <div class="bg-gray-50 rounded-xl p-6 mb-6 space-y-4">
          <div class="flex justify-between items-center pb-4 border-b border-gray-200">
            <span class="text-gray-600 font-medium">Amount Paid</span>
            <span class="text-3xl font-bold text-green-600">${formatAmount(props.receipt.amount)}</span>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Cardholder</span>
              <span class="font-semibold text-gray-800">{props.receipt.cardholderName}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Card Number</span>
              <span class="font-mono font-semibold text-gray-800">{props.receipt.maskedCardNumber}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Expiry Date</span>
              <span class="font-semibold text-gray-800">{props.receipt.expiryDate}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Transaction ID</span>
              <span class="font-mono text-sm font-semibold text-gray-800">{props.receipt.transactionId}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Date & Time</span>
              <span class="text-sm font-semibold text-gray-800">{formatDate(props.receipt.timestamp)}</span>
            </div>

            <div class="flex justify-between pt-3 border-t border-gray-200">
              <span class="text-gray-600">Status</span>
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                <span class="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                {props.receipt.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div class="space-y-3">
          <button
            onClick={() => window.print()}
            class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
          >
            Download Receipt
          </button>

          <a
            href="/"
            class="block w-full text-center bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all"
          >
            Make Another Payment
          </a>
        </div>

        <div class="mt-6 text-center text-sm text-gray-500">
          <p>Thank you for your payment! 🎉</p>
        </div>
      </div>
    </div>
  );
}
