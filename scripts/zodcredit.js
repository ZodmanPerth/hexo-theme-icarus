// Adds a credit with a link
// Usage:
// {% zodcredit colour type [url] %}
//    content of credit
// {% endzodcredit %}
// Where:
//    colour  = black
//    type    = photo
//    url     = optional link to the credited work
//    content = markdown content of the credit
hexo.extend.tag.register('zodcredit', function (args, content) {

  var backgroundColourClass = args[0] || 'black';

  var typeClass = "fas fa-camera";
  // switch (args[1] || 'photo') {
  //   // case 'photo':
  //   //   typeClass = 'fas fa-camera'
  //   //   break;
  // }

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
  <${container} style="background-color:${backgroundColourClass};color:white;text-decoration:none;margin-top: 10px;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" ${urlText}>
    <i class="${typeClass} mr-2"></i>${bodyText}
  </${container}>
  `

  return output;

}, {
  async: true,
  ends: true
});