"use strict";

module.exports = {
  mailer: async ({ to, subject, html }, fastify) => {
    const { mailer } = fastify;
    new Promise((resolve, reject) => {
      mailer.sendMail(
        {
          to: to,
          subject: subject,
          html: html,
        },
        (error, info) => {
          if (error) {
            return reject(
              new Error(
                JSON.stringify({
                  status: "error",
                  message: "Something went wrong",
                })
              ) || error
            );
          }
          return resolve({
            status: "ok",
            message: "Email successfully sent",
            info: {
              from: info.from,
              to: info.to,
            },
          });
        }
      );
    });
  },
  html: ({ title, description, year = new Date(Date.now()).getFullYear() }) => {
    return `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
  </head>
  <body style="font-family: 'Rubik', sans-serif">
    <main
      style="
        height: 100vh;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
      "
    >
      <div
        style="
          display: flex;
          flex-direction: column;
          row-gap: 1rem;
          padding: 1rem;
          border: 1px solid #b0b0b0;
          border-radius: 0.5rem;
          width: 50%;
          margin-left: auto;
          margin-right: auto;
          margin-top: auto;
        "
      >
        <section>
          <div style="display: flex; justify-content: center">
            <h1 style="font-size: 18px; color: #93AB98; text-align: center;">KETIKSAN</h1>
          </div>
        </section>
        <section style="display: flex; justify-content: center; color: #212121; border-bottom: 1px solid #b0b0b0;">
          <h1 style="font-size: 16px; font-weight: 400; text-align: center;">${title}</h1>
        </section>
        <section style="color: #2d2d2d; font-size: 14px;">
          <p>
            ${description}
          </p>
        </section>
      </div>
      <div
        style="
          width: 50%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: auto;
        "
      >
        <p style="font-size: 12px; text-align: center;">
          Anda menerima email ini sebagai pemberitahuan. © ${year} ketiksan, INA
        </p>
      </div>
    </main>
  </body>
</html>`;
  },
};
