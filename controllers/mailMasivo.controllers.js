import { request, response } from "express";
import nodemailer from "nodemailer";

export const enviarMailMasivo = async (req = request, res = response) => {
  try {

    const { asunto, mensaje } = req.body;

    const transporter = nodemailer.createTransport({
      pool: true,
      host: "providsaludips.com.co",
      port: 465,
      secure: true,
      auth: {
        user: "pruebas@providsaludips.com.co",
        pass: "Zte2256789",
        type: "login",
      },
      tls: {
        rejectUnauthorized: false,
      },
      
    });

    let mailOptions = {
      from: "pruebas@providsaludips.com.co",
      to: "julioasjd@gmail.com",
      subject: asunto,
      html: mensaje,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        console.log("Email Enviado: " + info.response);
        res.json({
            ok: true,
            message: "Email Enviado",
            info: info.response,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
