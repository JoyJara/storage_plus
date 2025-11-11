import { Request, Response } from "express";
import { transporter } from "../utils/mailer";

export const sendEmail = (req: Request, res: Response): void => {
  const { nombre, correo, asunto, mensaje } = req.body;

  const htmlContent = `
    <h1>Nuevo mensaje de contacto</h1>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Asunto:</strong> ${asunto}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${mensaje}</p>
  `;

  const mailOptions = {
    from: "soportestorageplus5@gmail.com",
    to: "soportestorageplus5@gmail.com",
    subject: "Nuevo mensaje de contacto",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (err: Error | null, info: any) => {
    if (err) {
      console.error("Error al enviar correo:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Correo enviado correctamente", info });
  });
};
