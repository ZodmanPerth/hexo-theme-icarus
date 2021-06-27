// Adds a credit with a link
// Usage:
// {% zodcredit colour [type] url %}
//    content of credit
// {% endzodcredit %}
// Where:
//    colour  = black
//    type    = photo
//    url     = link to the credited work
//    content = markdown content of the credit
hexo.extend.tag.register('zodcredit', function(args, content) {

  var backgroundColourClass = args[0] || 'black';

  var typeClass = "fas fa-camera";
  // switch (args[1] || 'photo') {
  //   // case 'photo':
  //   //   typeClass = 'fas fa-camera'
  //   //   break;
  // }

  var urlText = args[2] || 'https://redperegrine.net';

  var bodyText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5);  // slice removes leading <p> and trailing </p>

  var output =
  `
  <a style="background-color:${backgroundColourClass};color:white;text-decoration:none;margin-top: 10px;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px" href="${urlText}">
    <i class="${typeClass} mr-2"></i>${bodyText}
  </a>
  `

  return output;

}, {
  async: true,
  ends: true
});