// Adds a titled image, wrapped in a hyperlink.
// Usage:
// {% zodimglink imageUrl linkUrl height %}
//    title text
// {% endzodimglink %}
// Where:
//    linkUrl     = the hexo url of the image
//    imageUrl    = the link url
//    height      = the height of the image
hexo.extend.tag.register('zodimglink', function(args, content) {

  var imgUrl = args[0];
  var linkUrl = args[1];
  var height = args[2];

  var titleText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5);  // slice removes leading <p> and trailing </p>

   var output =    
    `<a href="${linkUrl}" class="zodimglink" target="_blank" rel="external">
    <img src="${imgUrl}" style="display:block;margin:0 auto 0 auto;height:${height};object-fit:contain" alt="${titleText}" title="${titleText}">
    <p class="has-text-centered is-size-6 caption" style="color: #7a7a7a;padding-top: 0px; padding-bottom: 1em">${titleText}</p>
    </a>`

  return output;

}, {
  async: true,
  ends: true
});