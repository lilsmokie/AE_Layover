/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

function loadJSX(fileName) {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
    csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
}


//                      loadJSX("testies.jsxbin");



var csInterface = new CSInterface();
var spitBTN = document.getElementById("spit");
var newCHK = document.getElementById("newfile");
var grpCHK = document.getElementById("groups");
var snapBTN = document.getElementById("snap");
var footRDO = document.getElementById("footage");
var compRDO = document.getElementById("comp");
var cropRDO = document.getElementById("crop");
var regBTN = document.getElementById("reg");
var aeVER = document.getElementById("AEversion");

csInterface.evalScript('poker()');

function spitClick() {
    loadJSX("SPIT_PS_v018.jsxbin");
    var aeVersion = aeVER.value;
	if (newCHK.checked == true && grpCHK.checked == true) {
		var spitType = "newFileGroups";
        csInterface.evalScript('psSpit(\''+ spitType +'\',\''+ aeVersion +'\')');
	} else if (newCHK.checked == true){
		var spitType = "newFile";
        csInterface.evalScript('psSpit(\''+ spitType +'\',\''+ aeVersion +'\')');
	} else {
		var spitType = "regular";
        csInterface.evalScript('psSpit(\''+ spitType +'\',\''+ aeVersion +'\')');
	}
}

function snapClick() {
    loadJSX("SPIT_PS_v018.jsxbin");
    var aeVersion = aeVER.value;
    var spitType = "visible";
    csInterface.evalScript('psSpit(\''+ spitType +'\',\''+ aeVersion +'\')');

}

function regClick() {
    loadJSX("SPIT_PS_REG_018.jsxbin");
    var aeVersion = aeVER.value;
	if (footRDO.checked == true){
        var importType = 'myImportOptions.importAs = ImportAsType.FOOTAGE;';
		csInterface.evalScript('regImport(\''+ importType +'\',\''+ aeVersion +'\')');
	} else if (compRDO.checked == true){
		var importType = 'myImportOptions.importAs = ImportAsType.COMP;';
		csInterface.evalScript('regImport(\''+ importType +'\',\''+ aeVersion +'\')');
	} else if (cropRDO.checked == true){
		var importType = 'myImportOptions.importAs = ImportAsType.COMP_CROPPED_LAYERS;';
		csInterface.evalScript('regImport(\''+ importType +'\',\''+ aeVersion +'\')');
	} else {
		alert("None Selected");
	}
}

function newClick() {
if (newCHK.checked == true){
	grpCHK.disabled = false;
} else {
	grpCHK.checked = false;
	grpCHK.disabled = true;
}
}








/// old origional code may still be useful
(function () {
    //'use strict';

    


    
    var csInterface = new CSInterface();
    
    // Opens the chrome developer tools in host app
    function showDevTools() {
        window.__adobe_cep__.showDevTools();
    }
    
    // Reloads extension panel
    function reloadPanel() {
        location.reload();
    
        
    
    }
    
    
    function init() {
                
        themeManager.init();

        $("#btn_debug").click(showDevTools);
        $("#btn_reload").click(reloadPanel);
        
        $("#btn_test").click(function () {
            csInterface.evalScript('sayHello()');
        });
    }
        
    init();

}());