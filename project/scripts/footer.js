let yr = new Date().getFullYear();
let lastModified = document.lastModified;
let author = "Cindy Jane Vick";
let course = "WDD 231 - Web Development";

// \u00A9 is the unicode for the copywrite symbol
// backticks allow us to insert variables into the output.
document.getElementById("course").innerHTML=`${course}`;
document.getElementById("copywrite").innerHTML = `\u00A9 ${yr} ${author} `;
document.getElementById("lastModified").innerHTML = `Last Modified: ${lastModified}`;