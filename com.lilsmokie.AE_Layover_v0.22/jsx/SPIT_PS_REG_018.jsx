//var importType = 'ImportAsType.FOOTAGE';    
//var importType = 'ImportAsType.COMP_CROPPED_LAYERS';
//var importType = 'myImportOptions.importAs = ImportAsType.COMP';
//regImport (importType );



function regImport(importType, aeVersion) {
//alert("hi");
//alert(importType);

#target photoshop
app.bringToFront();
var activeAE = aeVersion;    
        // catch unopened AE
var aeStatus = BridgeTalk.getStatus(activeAE);
    if (aeStatus == 'ISNOTRUNNING') {    
            alert("Please open After Effects and select a Comp before running.");
    return;
        }
    // catch photoshop SAVED
try {
var curPATH = app.activeDocument.path+'/';
} catch (err){
    alert("Please save document as PSD");
    return;
    //throw "Unsaved Doc";
    }



var curPATH = app.activeDocument.path+'/';
var fullNAME = app.activeDocument.fullName;
var  ABSOfull = fullNAME.absoluteURI;
var curPATHstr = String(curPATH);
var fullNAMEstr = String(fullNAME);

app.activeDocument.save();



//////////////////////////////////////////
//    FUNCTIONS          //
//////////////////////////////////////////
/////////////////// start bridgetalk /////////////////////////
function btMessaging(targetApp, script) {
    BridgeTalk.bringToFront(activeAE);
    var bt = new BridgeTalk();
    //set target application
    bt.target = targetApp;
    //set jsx script to run in target app
    bt.body = script;
    //alert if there are any errors
    bt.onError = function(e) { alert(e.body); };
    //send message with timeout of 20
    bt.send(20);
}



var mstrFLDR = "_PS_Spitter";

var aeScript = 'app.beginUndoGroup("SPAT");';
aeScript += 'var activeItem = app.project.activeItem;';

aeScript += 'var curPATHstr = \''+curPATHstr+'\';';
aeScript += 'var fullNAMEstr = \''+fullNAMEstr+'\';';
aeScript += 'var mstrFLDR = \''+mstrFLDR+'\';';

var PAL = "'palette'";
var PROG = "'Progress'";
var COL = "'column'";
var FIL = "'fill'";
var STtxt = "'statictext'";
var TITL = "'Importing File ...........'";
var PROG = "'progressbar'";


aeScript += 'var project = app.project;';
aeScript += 'var myFile = File(fullNAMEstr);';
aeScript += 'var fileNAME = fullNAMEstr.slice(curPATHstr.length);';
aeScript += 'var fileNAMEdec = decodeURI(fileNAME);';
aeScript += 'var fileNOext = fileNAMEdec.slice(0,(fileNAMEdec.length-3));';
aeScript += 'var fileEXT = fileNAMEdec.slice((fileNAMEdec.length-3));';
aeScript += 'var myImportOptions = new ImportOptions(myFile);';

aeScript += importType;


aeScript += 'var myFootage = app.project.importFile(myImportOptions);';
aeScript += 'var items = app.project.items;';
// find folder

aeScript += 'app.endUndoGroup();';


btMessaging(activeAE, aeScript);


//app.activeDocument.save();
}

