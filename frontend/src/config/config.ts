export default {
  'app': {
    'host': process.env.APP_HOST || 'https://portal.msmusic.edu.sg',
    'name': 'MSM Resource Portal',
    'organisation': 'Methodist School of Music',
    'organisationUrl': 'https://msmusic.edu.sg/',
    'logoUrl': '../assets/logo.png',
    'logoAlt': 'MSM Resource Portal',
  },
  'apiUrl': String(process.env.apiUrl)
}