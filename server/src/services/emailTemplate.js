export const orderPlacedTemplate = (data) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #eee; padding: 20px;">
      <h2>Hi ${data.customerName},</h2>
      <p>Your order <b>#${data.orderId}</b> has been placed successfully!</p>
      <hr />
      <p><b>Total Amount:</b> ₹${data.totalAmount}</p>
      <p>We'll notify you when it ships.</p>
    </div>
  `;
};
