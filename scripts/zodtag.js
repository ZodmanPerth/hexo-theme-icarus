// Adds a tag with an optional link
// Usage:
// {% zodtag colour type [url] %}
//    content of tag
// {% endzodtag %}
// Where:
//    colour  = [black,green]
//    type    = [photo,skip]
//    url     = optional link
//    content = markdown content of the tag
hexo.extend.tag.register('zodtag', function (args, content) {

  var backgroundColourStyle = 'black';
  switch (args[0] || 'black') {
    case 'green':
      backgroundColourStyle = '#28a028'
      break;
  }

  var typeClass = "fas fa-camera";
  switch (args[1] || 'photo') {
    case 'skip':
      typeClass = "fas fa-share fa-rotate-180";
      break;
  }

  var urlText = args[2];
  if (args[2]) urlText =`href="${args[2]}"`

  var container = "a";
  if (!args[2]) container = "div"

  var bodyText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5);  // slice removes leading <p> and trailing </p>

  var output =
    `
  <${container} style="background-color:${backgroundColourStyle};color:white;text-decoration:none;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" class="mt-3 mb-2" ${urlText}>
    <i class="${typeClass} mr-2"></i>${bodyText}
  </${container}>
  `

  return output;

}, {
  async: true,
  ends: true
});