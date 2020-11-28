module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'df5f21da770c85a18b9dcf261279dfe4'),
    },
  },
  url: env('APP_URL')
});
