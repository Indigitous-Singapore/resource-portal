export default {
  'app': {
    'host': process.env.APP_HOST || 'https://portal.msmusic.edu.sg',
    'name': 'WorshipAvenue',
    'organisation': 'Methodist School of Music',
    'organisationUrl': 'https://msmusic.edu.sg/',
    'logoUrl': '../assets/logo-icon.png',
    'logoAlt': 'MSM WorshipAvenue',
  },
  'apiUrl': String(process.env.apiUrl)
}