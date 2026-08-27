import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JUSTMEBEN LTD | Financial & Real Estate Advisory</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; background: #FAF9F6; color: #121316; }
    .navbar { background: white; border-bottom: 1px solid #E8E8E8; padding: 16px 40px; display: flex; justify-content: space-between; align-items: center; }
    .logo { font-size: 20px; font-weight: 700; color: #2596BE; }
    .nav { display: flex; gap: 40px; }
    .nav a { text-decoration: none; color: #121316; font-size: 14px; font-weight: 500; }
    .nav a:hover { color: #2596BE; }
    .container { max-width: 1200px; margin: 0 auto; padding: 60px 40px; }
    .hero { text-align: center; margin-bottom: 60px; }
    .hero h1 { font-size: 56px; font-weight: 700; margin-bottom: 20px; }
    .hero p { font-size: 18px; color: #666; margin-bottom: 30px; }
    .button { background: #2596BE; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .button:hover { background: #1a7ba4; }
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin: 60px 0; }
    .stat { text-align: center; }
    .stat-value { font-size: 32px; font-weight: 700; color: #2596BE; }
    .stat-label { font-size: 14px; color: #666; }
    .services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
    .service { background: white; padding: 30px; border-radius: 12px; border: 1px solid #E8E8E8; }
    .service h3 { margin-bottom: 15px; }
    .service p { font-size: 14px; color: #666; line-height: 1.6; }
    .footer { background: #121316; color: #999; padding: 40px; text-align: center; margin-top: 60px; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">JUSTMEBEN LTD</div>
    <div class="nav">
      <a href="#home">Home</a>
      <a href="#about">About Us</a>
      <a href="#criteria">Investment Criteria</a>
      <a href="#portfolio">Portfolio</a>
      <a href="#blog">Blog</a>
      <span style="margin-left: 20px;">🇬🇧 English</span>
      <a href="#signin" style="color: #2596BE;">Sign In</a>
    </div>
  </nav>

  <div class="container">
    <div class="hero">
      <h1>Consultancy & Capital Structuring</h1>
      <p>Empowering Ideas to Fruition</p>
      <p style="font-size: 16px; color: #666; margin-bottom: 20px;">Expert crowdfunding, private equity, and venture capital guidance. Strategic planning, financial analysis, and operational excellence.</p>
      <a href="#" class="button">Request Advisory</a>
    </div>

    <div class="stats">
      <div class="stat">
        <div class="stat-value">£120M+</div>
        <div class="stat-label">Transactions & Advisory Structured</div>
      </div>
      <div class="stat">
        <div class="stat-value">45+</div>
        <div class="stat-label">Completed Projects & Mandates</div>
      </div>
      <div class="stat">
        <div class="stat-value">15+</div>
        <div class="stat-label">Years of Combined Expertise</div>
      </div>
    </div>

    <section style="margin: 60px 0;">
      <h2 style="text-align: center; margin-bottom: 40px;">Services</h2>
      <div class="services">
        <div class="service">
          <h3>Strategic Planning</h3>
          <p>Expert discovery, analysis, planning, and implementation support with full performance monitoring.</p>
        </div>
        <div class="service">
          <h3>Crowdfunding Solutions</h3>
          <p>Navigate all crowdfunding models with regulatory expertise and investor syndication support.</p>
        </div>
        <div class="service">
          <h3>Private Equity & Venture</h3>
          <p>Venture capital guidance, growth strategies, and specialized investment structuring expertise.</p>
        </div>
      </div>
    </section>
  </div>

  <div class="footer">
    <p>&copy; 2025 JUSTMEBEN LTD. All Rights Reserved. Registered in England & Wales (Company No. 15780010).</p>
  </div>
</body>
</html>`);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
