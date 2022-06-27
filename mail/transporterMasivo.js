import { createTransport } from "nodemailer";

export const transporter = createTransport({
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
