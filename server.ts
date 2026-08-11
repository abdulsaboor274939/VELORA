import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Health API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'VELORA Haute Couture', timestamp: new Date().toISOString() });
});

// 2. AI Fashion Stylist & Atelier Consultant API
app.post('/api/ai-stylist', async (req, res) => {
  try {
    const { prompt, occasion, bodyType, preferredColors, budget } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(500).json({
        error: 'Gemini API key is not configured.',
        suggestion: 'Please configure GEMINI_API_KEY in Secrets panel.',
      });
    }

    const systemInstruction = `
You are VELORA's Master Fashion Atelier Consultant and Senior Stylist.
VELORA is a luxury boutique specializing in custom female dresses, bespoke bridal lehengas, formal evening gowns, velvet couture, and organza festive wear.
Your tone is classy, warm, knowledgeable, elegant, and reassuring.

Provide expert fashion guidance in clean Markdown format:
1. **Outfit Concept & Silhouette Recommendation**: Recommend dress type (Maxi Gown, Royal Lehenga, Anarkali, Raw Silk Suit, Draped Saree, Fusion Set).
2. **Fabric & Color Palette**: Suggest ideal fabrics (Raw Silk, Organza, Velvet, Pure Chiffon) and rich color combinations for their event/skin tone.
3. **Embroidery & Detailing**: Suggest sleeve style, neckline, Zardozi / Cut-dana / Gota work density.
4. **Jewelry & Accessory Pairing**: Suggest clutch, heel tone, and jewelry metal (gold/silver/pearl).
5. **VELORA Bespoke Studio Preset**: Provide a short 1-sentence configuration advice.

Keep your response helpful, elegant, and concise. Avoid generic SaaS buzzwords.
`;

    const userPrompt = `
User Query: ${prompt || 'Help me select a custom outfit.'}
Occasion / Event: ${occasion || 'Not specified'}
Body Type / Preferences: ${bodyType || 'Not specified'}
Color Preferences: ${preferredColors || 'Open to suggestions'}
Budget Range: ${budget || 'Flexible'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'I would love to help you style your custom outfit!';

    res.json({
      success: true,
      stylistReply: replyText,
    });
  } catch (err: any) {
    console.error('AI Stylist Error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Failed to generate styling response.',
    });
  }
});

// 3. Custom Outfit Quote Calculator & Submission Endpoint
app.post('/api/custom-quote', (req, res) => {
  try {
    const config = req.body;
    const designCode = 'VEL-BSPK-' + Math.floor(100000 + Math.random() * 900000);

    // Calculate base price in PKR & USD
    let basePKR = 75000;
    if (config.silhouette === 'bridal_lehenga') basePKR = 240000;
    else if (config.silhouette === 'maxi_gown') basePKR = 120000;
    else if (config.silhouette === 'anarkali') basePKR = 95000;
    else if (config.silhouette === 'draped_saree') basePKR = 110000;

    // Fabric multiplier
    let fabricMultiplier = 1.0;
    if (config.fabric === 'royal_velvet') fabricMultiplier = 1.35;
    else if (config.fabric === 'brocade_jacquard') fabricMultiplier = 1.3;
    else if (config.fabric === 'raw_silk') fabricMultiplier = 1.25;
    else if (config.fabric === 'crepe_de_chine') fabricMultiplier = 1.2;

    // Embroidery multiplier
    let embMultiplier = 1.0;
    if (config.embroideryStyle === 'heavy_zardozi') embMultiplier = 1.45;
    else if (config.embroideryStyle === 'crystal_sequins') embMultiplier = 1.25;
    else if (config.embroideryStyle === 'subtle_gotapatti') embMultiplier = 1.15;

    const finalPKR = Math.round(basePKR * fabricMultiplier * embMultiplier);
    const finalUSD = Math.round(finalPKR / 280);

    res.json({
      success: true,
      designCode,
      estimatedPricePKR: finalPKR,
      estimatedPriceUSD: finalUSD,
      estimatedDays: config.silhouette === 'bridal_lehenga' ? '21-28 Days' : '12-16 Days',
      message: 'Your custom dress specification has been prepared!',
    });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// 4. Consultation Booking Endpoint
const consultationBookings: any[] = [];

app.post('/api/book-consultation', (req, res) => {
  const { clientName, phone, email, date, timeSlot, consultationType, dressInterest, estimatedBudget, notes } = req.body;
  const bookingId = 'VEL-CNS-' + Math.floor(1000 + Math.random() * 9000);

  const booking = {
    id: bookingId,
    clientName,
    phone,
    email,
    date,
    timeSlot,
    consultationType: consultationType || 'virtual_video',
    dressInterest: dressInterest || 'Custom Outfit Design',
    estimatedBudget,
    notes,
    createdAt: new Date().toISOString(),
  };

  consultationBookings.push(booking);

  res.json({
    success: true,
    bookingId,
    message: `Consultation booked successfully for ${clientName} on ${date} at ${timeSlot}.`,
    booking,
  });
});

// 5. Order Tracking API
const sampleOrders: Record<string, any> = {
  'VEL-8921': {
    orderId: 'VEL-8921',
    customerName: 'Ayesha Khan',
    dressTitle: 'Custom Champagne Zardozi Bridal Lehenga',
    totalPricePKR: 285000,
    totalPriceUSD: 1020,
    orderDate: '2026-07-28',
    estimatedDeliveryDate: '2026-08-25',
    status: 'Hand Embroidery',
    progressPercentage: 65,
    milestones: [
      { step: 'Order Confirmed & Measurements Verified', date: 'Jul 28, 2026', completed: true },
      { step: 'Silk Fabric Dyeing & Pattern Cutting', date: 'Aug 02, 2026', completed: true },
      { step: 'Hand Zardozi & Dabka Embroidery', date: 'Aug 08, 2026', completed: true },
      { step: 'Stitching, Lining & Trial Fitting', date: 'Est. Aug 18, 2026', completed: false },
      { step: 'Final Quality Inspection & Gift Packaging', date: 'Est. Aug 22, 2026', completed: false },
      { step: 'Dispatched via DHL Express', date: 'Est. Aug 25, 2026', completed: false },
    ],
  },
  'VEL-9104': {
    orderId: 'VEL-9104',
    customerName: 'Saman Fatima',
    dressTitle: 'Emerald Green Silk Draped Formal Gown',
    totalPricePKR: 145000,
    totalPriceUSD: 520,
    orderDate: '2026-08-02',
    estimatedDeliveryDate: '2026-08-18',
    status: 'Stitching & Trial',
    progressPercentage: 80,
    milestones: [
      { step: 'Order Confirmed & Measurements Verified', date: 'Aug 02, 2026', completed: true },
      { step: 'Silk Fabric Dyeing & Pattern Cutting', date: 'Aug 05, 2026', completed: true },
      { step: 'Hand Zardozi & Dabka Embroidery', date: 'Aug 08, 2026', completed: true },
      { step: 'Stitching, Lining & Trial Fitting', date: 'Aug 11, 2026', completed: true },
      { step: 'Final Quality Inspection & Gift Packaging', date: 'Est. Aug 15, 2026', completed: false },
      { step: 'Dispatched via DHL Express', date: 'Est. Aug 18, 2026', completed: false },
    ],
  },
};

app.get('/api/track-order/:orderId', (req, res) => {
  const { orderId } = req.params;
  const normalizedId = orderId.toUpperCase().trim();

  const found = sampleOrders[normalizedId];
  if (found) {
    return res.json({ success: true, order: found });
  }

  // Generate dynamic live response for any newly created custom order code
  res.json({
    success: true,
    order: {
      orderId: normalizedId,
      customerName: 'Valued Client',
      dressTitle: 'Custom VELORA Bespoke Outfit',
      totalPricePKR: 125000,
      totalPriceUSD: 450,
      orderDate: new Date().toLocaleDateString('en-US'),
      estimatedDeliveryDate: '2-3 Weeks from order date',
      status: 'Fabric Sourcing',
      progressPercentage: 25,
      milestones: [
        { step: 'Order Confirmed & Measurements Verified', date: 'Today', completed: true },
        { step: 'Silk Fabric Dyeing & Pattern Cutting', date: 'In Progress', completed: false },
        { step: 'Hand Zardozi & Dabka Embroidery', date: 'Upcoming', completed: false },
        { step: 'Stitching & Final Fitting', date: 'Upcoming', completed: false },
        { step: 'Quality Inspection & Dispatch', date: 'Upcoming', completed: false },
      ],
    },
  });
});

// Vite or Static Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ VELORA Haute Couture server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
