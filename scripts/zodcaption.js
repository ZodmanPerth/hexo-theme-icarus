// Kudos: https://github.com/haishanh/hexo-tag-admonition/blob/master/index.js
hexo.extend.tag.register('zodcaption', function(args, content) {

  var quoteText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5);  // slice removes leading <p> and trailing </p>

  // <p class="has-text-centered is-size-6 .gallery-item caption" style="color: #7a7a7a">An early test - UWP gestures with Win2D rendering</p>
  var output =`<p class="has-text-centered is-size-6 caption" style="color: #7a7a7a;padding-top: 6px">${content}</p>`
  return output;

}, {
  async: true,
  ends: true
});