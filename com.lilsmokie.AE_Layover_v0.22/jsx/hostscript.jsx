/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, Folder*/

// fileName is a String (with the .jsx extension included)
function loadJSX(fileName) {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}



function snapHello() {
    alert("hello from ExendScript SNAPs");
}

function spitHello() {
    alert("hello from ExendScript SPIT");
}

function regHello() {
    alert("hello from ExendScript REG");
}