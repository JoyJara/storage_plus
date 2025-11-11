import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'soportestorageplus5@gmail.com',     // Define en .env
    pass: 'mrfjagadbmflapdu',
  },
});