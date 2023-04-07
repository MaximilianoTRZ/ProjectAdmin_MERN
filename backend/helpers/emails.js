import nodemailer from "nodemailer";

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c4a24058959f13",
      pass: "0b181091ad3b9b"
    }
  });

  // Email information
  const info = await transport.sendMail({
    from: '"Project Admin MERN" <projectadmin@mrzdev.com>',
    to: email,
    subject: 'Project Admin - Confirm your account',
    text: 'Confirm yourn account in the Project Admin',
    html: `<p> Hello ${nombre}, please confirm your account following the link bellow: </p> <br/>

    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirm Your Account Here</a>

    <p>If you haven't created an account, please ignore this message.</p>

    `


  })
}