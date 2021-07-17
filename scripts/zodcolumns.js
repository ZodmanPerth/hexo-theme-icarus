// Kudos: https://github.com/haishanh/hexo-tag-admonition/blob/master/index.js
// Adds content in columns.  Can be optionally coloured with a Bulma message block.
// Usage:
// {% zodcolumns [colour]%}
//    /title
//    Put an optional title block in here.  It will be capitalised.
//    /
//    this is the first row of column 1.
//    this is the second row of column 1.
//    add as many rows as you want.
//    There are 4 rows in column 1.
//    /
//    you can add as many columns as you want as well.
//    there doesn't have to be an equal amount of rows in each column.
//    There are 3 rows in column 2.
//    /title
//    You can add multiple titles
//    /
//    This is a new set of columns!
//    There are 2 rows in column 1.
//    /
//    There is 1 row in column 2.
//    /
//    There is a 3rd column in this column block.
// {% endzodcolumns %}
// Where:
//    colour      = optional values are [link]
hexo.extend.tag.register('zodcolumns', function(args, content) {

  var messageClass = "";
  var textColour = "inherit";
  switch (args[0]) {
    case 'link':
      messageClass = 'is-link'
      textColour = '#3273dc'
      break;
  }

  var output = "";

  if (messageClass!="") {
    output = `<article class=\"message ${messageClass}\" style=\"margin-top: 1.3em\">`;
    output += `<div class="message-body" style="color:${textColour}">`;
  }

  var columns = content.split('\n')
  var isFirstColumnDirective = true;
  var isTitle = false;
  for(var row of columns) {
    if (row.startsWith("/")) {  // directive

      if (row.startsWith("/title")) {
        isTitle = true;
        if (isFirstColumnDirective == false) {
          output += "\t</div>\n</div>\n";
          isFirstColumnDirective = true;
        }
      }
      else {
        if (isFirstColumnDirective) {
          output += `<div class="columns" style="overflow:auto">\n`;
        }
        else {
          output += "\t</div>\n";
        }
        output += "\t<div class=\"column is-narrow\">\n";
        isFirstColumnDirective = false;
      }
    }
    else {  // not a directive
      if (isTitle) {
        row = row.toUpperCase();
        rowText = `<p style="font-size: 0.8em;margin-bottom: 0.5em;">${row}</p>`;
      }
      else {
        var rowText = hexo.render.renderSync({
          text: row,
          engine: 'markdown'
        }).slice(3, -5);  // slice removes leading <p> and trailing </p>
        rowText+=`<br>`;
      }
      output += `\t\t${rowText}\n`;
      isTitle = false;
    }
  }

  output += `\t</div>\n\</div>`;
  if (messageClass!="") {
    output += `\n\</div>\n</article>`;
  }


    return output;

}, {
  async: true,
  ends: true
});