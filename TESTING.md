# Testing Documentation

## Manual Testing Guide

### Test Cases for Payment Form

#### TC-01: Form Validation - Empty Fields
**Steps:**
1. Navigate to the payment form
2. Click "Pay Now" without filling any fields
**Expected Result:** All fields show validation error messages

#### TC-02: Card Number Validation
**Test Data:**
- Invalid: "1234" (too short)
- Invalid: "abcd1234efgh5678" (contains letters)
- Valid: "1234567890123456"

**Steps:**
1. Enter each test value in card number field
2. Submit form
**Expected Result:** Only 16-digit numeric cards pass validation

#### TC-03: Card Number Formatting
**Steps:**
1. Type "1234567890123456" in card number field
**Expected Result:** Display as "1234 5678 9012 3456" with spaces

#### TC-04: Expiry Date Validation
**Test Data:**
- Invalid: "13/25" (month > 12)
- Invalid: "01/20" (expired)
- Valid: "12/28"

**Steps:**
1. Enter each test value in expiry date field
2. Submit form
**Expected Result:** Only valid future dates pass validation

#### TC-05: Expiry Date Formatting
**Steps:**
1. Type "1228" in expiry date field
**Expected Result:** Display as "12/28" with slash

#### TC-06: CVV Validation
**Test Data:**
- Invalid: "12" (too short)
- Invalid: "abcd" (contains letters)
- Valid: "123"

**Steps:**
1. Enter each test value in CVV field
2. Submit form
**Expected Result:** Only 3-digit numeric CVV passes validation

#### TC-07: Amount Validation
**Test Data:**
- Invalid: "" (empty)
- Invalid: "0" (zero)
- Invalid: "-50" (negative)
- Invalid: "abc" (non-numeric)
- Valid: "99.99"

**Steps:**
1. Enter each test value in amount field
2. Submit form
**Expected Result:** Only positive numbers pass validation

#### TC-08: Successful Payment Flow
**Test Data:**
- Name: "John Doe"
- Card: "4532123456789012"
- Expiry: "12/28"
- CVV: "123"
- Amount: "150.00"

**Steps:**
1. Fill all fields with valid data
2. Click "Pay Now"
3. Wait for processing animation
**Expected Result:** 
- Button shows loading state
- After ~1.5 seconds, redirects to receipt page

#### TC-09: Real-time Error Clearing
**Steps:**
1. Leave card number field empty
2. Click "Pay Now" (error appears)
3. Start typing in card number field
**Expected Result:** Error message disappears immediately

### Test Cases for Receipt Page

#### TC-10: Receipt Display
**Prerequisite:** Complete a successful payment (TC-08)

**Steps:**
1. View receipt page
**Expected Result:**
- Transaction ID displayed (format: TXN[timestamp][random])
- Amount matches payment ($150.00)
- Cardholder name: "John Doe"
- Masked card: "**** **** **** 9012"
- Expiry date: "12/28"
- Status: "Success" with green indicator
- Timestamp shows current date/time

#### TC-11: Card Number Masking
**Steps:**
1. Complete payment with card "1234567890123456"
2. View receipt
**Expected Result:** Card displays as "**** **** **** 3456"

#### TC-12: Print Functionality
**Steps:**
1. On receipt page, click "Print" button
**Expected Result:** Browser print dialog opens

#### TC-13: New Payment Button
**Steps:**
1. On receipt page, click "New Payment" button
**Expected Result:** Navigates back to payment form (clean slate)

#### TC-14: Direct Receipt Access Without Payment
**Steps:**
1. Open browser
2. Navigate directly to `/receipt` URL
**Expected Result:** Shows "No Receipt Found" message with "Make a Payment" button

#### TC-15: Receipt Persistence
**Steps:**
1. Complete a payment
2. View receipt
3. Refresh the page
**Expected Result:** Receipt data persists and displays correctly

#### TC-16: Receipt Data Clearing
**Steps:**
1. Complete a payment
2. View receipt
3. Click "New Payment"
4. Navigate back to `/receipt` URL
**Expected Result:** Shows "No Receipt Found" (data was cleared)

### UI/UX Test Cases

#### TC-17: Responsive Design - Mobile
**Steps:**
1. Open application on mobile device or resize browser to 375px width
**Expected Result:** 
- Form is fully usable
- No horizontal scroll
- Buttons are touch-friendly
- Text is readable

#### TC-18: Responsive Design - Tablet
**Steps:**
1. Resize browser to 768px width
**Expected Result:** Layout adapts appropriately

#### TC-19: Loading State
**Steps:**
1. Fill valid payment data
2. Click "Pay Now"
**Expected Result:**
- Button shows spinner and "Processing..." text
- Button is disabled during processing
- Cannot submit form again

#### TC-20: Animation Performance
**Steps:**
1. Navigate to payment form
2. Complete payment and view receipt
**Expected Result:**
- Smooth fade-in animation on page load
- Smooth slide-up animation for cards
- No janky transitions

#### TC-21: Accessibility - Keyboard Navigation
**Steps:**
1. Use Tab key to navigate through form
2. Use Enter to submit
**Expected Result:** All fields and buttons accessible via keyboard

### Browser Compatibility

Test in the following browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Performance Benchmarks

**Expected Metrics:**
- Initial page load: < 2 seconds
- Form interaction: Instant feedback (< 100ms)
- Payment processing: ~1.5 seconds
- Page navigation: < 500ms
- Lighthouse Performance Score: > 90

## Automated Testing (Future Implementation)

For production, consider implementing:

```typescript
// Example test structure using Vitest + Testing Library

describe('PaymentForm', () => {
  it('should validate required fields', () => {
    // Test implementation
  });

  it('should format card number correctly', () => {
    // Test implementation
  });

  it('should submit form with valid data', () => {
    // Test implementation
  });
});

describe('Receipt', () => {
  it('should display transaction details', () => {
    // Test implementation
  });

  it('should mask card number', () => {
    // Test implementation
  });

  it('should handle missing receipt data', () => {
    // Test implementation
  });
});
```

## Bug Reporting Template

```markdown
**Bug Title:** [Concise description]

**Priority:** [Critical/High/Medium/Low]

**Environment:**
- Browser: [Chrome 120]
- OS: [Windows 11]
- Screen size: [1920x1080]

**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:**


**Actual Result:**


**Screenshots:**
[Attach if applicable]

**Additional Notes:**

```

## Test Coverage Goals

- [ ] 100% of user flows covered
- [ ] All validation rules tested
- [ ] Edge cases documented
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Accessibility requirements met
