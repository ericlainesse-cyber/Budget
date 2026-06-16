const CACHE =
"budget-v1";

const FILES = [

"/",
"/index.html",
"/css/style.css",
"/js/app.js",
"/js/charts.js",
"/js/alerts.js",
"/js/sheets.js"

];

self.addEventListener(
"install",
event => {

event.waitUntil(

caches.open(CACHE)
.then(cache =>
cache.addAll(FILES)
)

);
});

self.addEventListener(
"fetch",
event => {

event.respondWith(

caches.match(
event.request
).then(response => {

return response ||
fetch(
event.request
);

})

);
});