module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'db-postgresql-resource-portal-do-user-8074699-0.a.db.ondigitalocean.com'),
        port: env.int('DATABASE_PORT', 25060),
        database: env('DATABASE_NAME', 'resource-portal'),
        username: env('DATABASE_USERNAME', 'local-lSyctwdPfGw17vUv'),
        password: env('DATABASE_PASSWORD', 'styu8tplrswq2bqz'),
        ssl: env.bool('DATABASE_SSL', true),
      },
      options: {}
    },
  },
});
