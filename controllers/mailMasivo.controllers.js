import { request, response } from "express";
import { transporter } from "../mail/transporterMasivo.js";
import { Email } from "../models/Email.js";

export const enviarMailMasivo = async (req = request, res = response) => {
  try {
    const { asunto, mensaje } = req.body;

    const obtenerMails = await Email.find({});
    let emails = "";
    obtenerMails.forEach((email) => {
      emails += email.email + ", ";
    });

    let mailOptions = {
      from: "pruebas@providsaludips.com.co",
      to: emails,
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

export const guardarEmail = async (req = request, res = response) => {
  try {
    const { email } = req.body;
    const emailModel = new Email({ email });
    await emailModel.save();
    res.json({
      ok: true,
      message: "Email Guardado",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ ok: false, message: "El email ya existe" }).status(400);
    }

    console.log(error);
    res.json({ error }).status(500);
  }
};
