export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, state, city, address, inquiryType, itemType, details } = req.body;

    // Log the contact submission (in production, you could send email or use a service)
    console.log('Contact form submission:', { name, phone, email, state, city, address, inquiryType, itemType, details });

    // Return success (without database, we just acknowledge receipt)
    return res.status(201).json({
      success: true,
      id: `contact-${Date.now()}`,
      message: 'Thank you for reaching out! We will contact you shortly.'
    });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    return res.status(500).json({ error: 'Failed to save contact' });
  }
}
