// Kudos: https://github.com/haishanh/hexo-tag-admonition/blob/master/index.js
// Adds a tagged note in a variety of colours.
// Usage:
// {% zodnote colour [header text] %}
//    content of note
// {% endzodnote %}
// Where:
//    colour      = [blue,aqua,green,yellow,red]
//    header text = the text in the tag.  Can include spaces.
//    content     = markdown content of the note
hexo.extend.tag.register('zodnote', function(args, content) {

  var colourClass = "is-primary";
  switch (args[0] || 'blue') {
    case 'aqua':
      colourClass = 'is-info'
      break;
    case 'green':
      colourClass = 'is-success'
      break;
    case 'yellow':
      colourClass = 'is-warning'
      break;
    case 'red':
      colourClass = 'is-danger'
      break;
  }

  var titleText = args.slice(1).join(' ').toUpperCase() || 'NOTE';

  var quoteText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5);  // slice removes leading <p> and trailing </p>

  var output =
    `<article class="message message-immersive ${colourClass} zodnote">
      <div class="message-body">
        <span class="tag ${colourClass} mr-2">${titleText}</span>
        ${quoteText}
      </div>
    </article>
    `
    
    return output;

}, {
  async: true,
  ends: true
});