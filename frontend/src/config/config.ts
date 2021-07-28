export default {
  'app': {
    'host': process.env.APP_HOST || 'https://portal.msmusic.edu.sg',
    'name': 'WorshipAvenue',
    'organisation': 'Methodist School of Music',
    'organisationUrl': 'https://msmusic.edu.sg/',
    'logoUrl': '../assets/logo.svg',
    'logoAlt': 'MSM Worship Avenue',
  },
  'apiUrl': String(process.env.apiUrl)
}