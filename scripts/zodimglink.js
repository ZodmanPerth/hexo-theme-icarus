// Adds a titled image, wrapped in a hyperlink.
// Usage:
// {% zodimglink imageUrl linkUrl height %}
//    title text
// {% endzodimglink %}
// Where:
//    linkUrl     = the hexo url of the image
//    imageUrl    = the link url
//    title text  = the text in the title.  Can include spaces.
hexo.extend.tag.register('zodimglink', function(args, content) {

  var imgUrl = args[0];
  var linkUrl = args[1];
  var height = args[2];

  var titleText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5);  // slice removes leading <p> and trailing </p>

  // <a href="https://gist.github.com/ZodmanPerth/fa5dd4b800f1237f3de8dfe58a4a5951" class="zodimglink" target="_blank" rel="external">
  //   <img src="github-gist.png" height="2em" alt="See all the code on my Github Gist" title="See all the code on my Github Gist">
	// 	<p class="has-text-centered is-size-6 caption" style="color: #7a7a7a;padding-top: 0px">See all the code on my Github Gist</p>   
  // </a>   
  var output =    
    `<a href="${linkUrl}" class="zodimglink" target="_blank" rel="external">
    <img src="${imgUrl}" style="display:block;margin:0 auto 0 auto;height:${height}" alt="${titleText}" title="${titleText}">
    <p class="has-text-centered is-size-6 caption" style="color: #7a7a7a;padding-top: 0px; padding-bottom: 1em">${titleText}</p>
    </a>`

  return output;

}, {
  async: true,
  ends: true
});