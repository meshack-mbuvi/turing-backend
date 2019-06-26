const flatCache = require('flat-cache');

export function cache(req, res, next) {
 let cache = flatCache.load(
  'productsCache',
  path.resolve(`${__dirname}/../../../cache`)
 );

 let key = '__express__' + req.originalUrl || req.url;
 let cacheContent = cache.getKey(key);
 if (cacheContent) {
  res.send(cacheContent);
 } else {
  res.sendResponse = res.send;
  res.send = body => {
   cache.setKey(key, body);
   cache.save();
   res.sendResponse(body);
  };
  next();
 }
}
