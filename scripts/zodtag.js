// Adds a tag with an optional link
// Usage:
// {% zodtag colour type [url] [mt:n] [mb:n] %}
//    content of tag
// {% endzodtag %}
// Where:
//    colour  = [black,green]
//    type    = [photo,skip]
//    url     = optional link
//    mt:x    = optional top margin (x either being the size or "mt-[1,2,3,4,5,6]")
//    mb:x    = optional bottom margin (x either being the size or "mb-[1,2,3,4,5,6]")
//    content = markdown content of the tag
hexo.extend.tag.register('zodtag', function (args, content) {

  var backgroundColourStyle = 'black'
  switch (args[0] || 'black') {
    case 'green':
      backgroundColourStyle = '#28a028'
      break
  }

  var typeClass = "fas fa-camera"
  switch (args[1] || 'photo') {
    case 'skip':
      typeClass = "fas fa-share fa-rotate-180"
      break
  }


  var optionals = args.slice(2)   // take remaining
  var url = null
  var mt = "mt-3"
  var mb = "mb-2"
  var isClassMarginTop = true
  var isClassMarginBottom = true
	if (optionals) {
  	for(let arg of optionals) {
    	if (arg.startsWith('mt:')) {
      	mt = arg.substr(3)
        isClassMarginTop = mt.startsWith("mt-")
      }
    	else if (arg.startsWith('mb:')) {
      	mb = arg.substr(3)
        isClassMarginBottom = mb.startsWith("mb-")
      }
      else {
      	url = `href="${arg}"`
      }
    }
  }
  
  var classText = null
  var styleContent = ""
  var classContent = ""
  if (isClassMarginTop) {
    if (isClassMarginBottom) {
      classContent = `${mt} ${mb}`
    }
    else {
      classContent = mt
      styleContent = `;margin-bottom:${mb}`
    }
  }
  else
  {
    styleContent = `;margin-top:${mt}`
    if (isClassMarginBottom) {
      classContent = mb
    }
    else {
      styleContent += `;margin-bottom:${mb}`
    }
  }
  classText = ` class="${classContent}" `
  var styleText = `background-color:${backgroundColourStyle};color:white;text-decoration:none;padding:4px 6px;font-size:12px;line-height:1.2;display:inline-block;border-radius:3px${styleContent}`


  var bodyText = hexo.render.renderSync({
    text: content,
    engine: 'markdown'
  }).slice(3, -5)  // slice removes leading <p> and trailing </p>

  var container = "a"
  if (!url) container = "div"

  var output =
    `
      <${container} style="${styleText}"${classText} ${url}>
        <i class="${typeClass} mr-2"></i>${bodyText}
      </${container}>
    `

  return output

}, {
  async: true,
  ends: true
})