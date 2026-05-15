import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Email API Endpoint
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Email options
      const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`,
        to: process.env.RECEIVER_EMAIL,
        replyTo: email,
        subject: `New Portfolio Message: ${subject || "No Subject"}`,
        text: `
          New message from your portfolio contact form:
          
          Name: ${name}
          Email: ${email}
          Phone: ${phone || "N/A"}
          Subject: ${subject || "N/A"}
          
          Message:
          ${message}
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #00a2ff;">New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "N/A"}</p>
            <p><strong>Subject:</strong> ${subject || "N/A"}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      };

      // Send email
      await transporter.sendMail(mailOptions);
      
      res.status(200).json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Email Error:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
