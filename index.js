module.exports =
  process.env.NODE_ENV === 'production'
  ? require('./dist/production')
  : require('./dist');
