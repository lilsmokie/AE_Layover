//spitType = "visible"; 
//spitType = "newFile";
//spitType = "newFileGroups"; 
//spitType = "regular"; 
//aeVersion = 'aftereffects-13';

//libraries
// minified json2.js
if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx,escapable,gap,indent,meta,rep;if(typeof JSON.stringify!=="function"){escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()


//psSpit (spitType, aeVersion);


function psSpit (spitType, aeVersion) {
    //alert(aeVersion);
// catch unopened AE ****maybe we need to add a thing that looks to see if a comp is open and selected ******
var activeAE = aeVersion;
var aeStatus = BridgeTalk.getStatus(activeAE);
    if (aeStatus == 'ISNOTRUNNING') {    
        var activeAE = 'aftereffects';
        var aeStatus = BridgeTalk.getStatus(activeAE);
        if (aeStatus == 'ISNOTRUNNING') {
            alert("Please open After Effects and select a Comp before running.");
            return;
        }}

// catch photoshop SAVED  
try {
var curPATH = app.activeDocument.path+'/';
} catch (err){
    alert("Please save document as PSD.");
    return;
    //throw "Unsaved Doc";
    }

var FSTdoc = app.activeDocument;
var curPATH = app.activeDocument.path+'/';
var fullNAME = app.activeDocument.fullName;
var  ABSOfull = fullNAME.absoluteURI;
var curPATHstr = String(curPATH);
var fullNAMEstr = String(fullNAME);
var fileName = app.activeDocument.name;
var spitFLDR = fileName.slice(0,fileName.length-4)+ "_Layover";
var folderCheck = Folder (curPATH +spitFLDR);
var mstrFLDR = "_PS_Layover";
// define new photoshop file for snapshot
var psdOptions = new PhotoshopSaveOptions();
psdOptions.layers = true;
psdOptions.alphaChannels = true;


// sort through specific options //
if (spitType == "visible") {
    //alert ("its visible");
    psdOptions.layers = false;
    destinationCheck (FSTdoc);
    // we create this variable only so the function has something to pass
        theLayers = "";
    } else if (spitType == "newFile" || spitType == "newFileGroups") {
        //alert("newFile");
        HLDRdoc = app.documents.add(FSTdoc.width, FSTdoc.height, FSTdoc.resolution, FSTdoc.name, NewDocumentMode.RGB, DocumentFill.TRANSPARENT,FSTdoc.pixelAspectRatio, FSTdoc.bitsPerChannel);
        app.activeDocument = FSTdoc;
        FSTdoc.activeLayer.duplicate(HLDRdoc, ElementPlacement. PLACEATBEGINNING);
        app.activeDocument = HLDRdoc;
        HLDRdoc.layers[HLDRdoc.layers.length-1].remove();
        if (spitType == "newFileGroups") {
            //alert("Groups");
            	var groupBatch, result;
                // Batch select groups
                groupBatch = groupsBatchSelect("All Groups", false, true);
                while (groupBatch.index < groupBatch.items.length) {
                    try {
                    layersSetSelected("id", "new", groupBatch.items[groupBatch.index].id);			
                    // If layer mask
                    if (layerIfLayerMask("True")) {				
                    // Duplicate layers
                    result = layersReplicate("Same Document", "", "", false, false);				
                    // Layers to smart objects
                    layersMakeSmartObject("");				
                    // Set layer visibility
                    layersSetVisibility(false);				
                    // Set layer name
                    layersSetName("_LayOMASK_", false, "2", "1", "1", false);				
				}			
			}
            catch(e) { log("Error batch selecting groups: " + e.message); }
            groupBatch.index++;
            }
            if (groupBatch.originalItems) { layersSelectIDArray(groupBatch.originalItems); }
            }
        destinationCheck (HLDRdoc);
        // we create this variable only so the function has something to pass
        theLayers = "";
        } else if (spitType == "regular") {
            // **********************************************need to check if saved*****************************************************************************
            //alert("regular");
            // begin to restructure layers into a javascript object
            var flatArray = buildLayerArray ();
            //alert(buildLayerList ());
            //alert(buildLayerArray ());
            var selIndex = getSelectedLayerIndicies ();
            var aeOrganize = [];
            var parent = [{name: "root"}];
            var activeParent = parent[0];
            var instance = 0;

            for (k=0; k < flatArray.length; k++) {
                thisEntry = flatArray[k];
                // add selected true property
                if (matchSelected (thisEntry.orgIndex) == true) {
                    thisEntry.selected = true;
                    // LETS FIND THE INSTANCE  
                    // when we find a selected layer, we need to walk down the layers from here until the level changes,when that happens we need to walk back up looking for instances of the entrys name add 1 to instance variable until you find the layer,set the instance to that
                                thisLevel = thisEntry.level;
                                thisName = thisEntry.name;
                                stepper = k;
                                status = true;
                                while (status == true) {
                                    //alert (flatArray[stepper].level +"      "+ thisLevel);
                                    //alert(thisLevel);
                                    // something about layers on the root level is causing a problem. going to try adding a catch
                                    try {flatArray[stepper].level} catch (err) {alert("error caught"); status = false;}
                                    if (status == false && flatArray[stepper].level == thisLevel) {
                                        stepper = stepper + 1;
                                        } else {
                                            stepper = stepper - 1;
                                            status = false;
                                            }
                                   }
                               // walking back
                               thisInstance = 0;
                               while (stepper > k) {
                                   if (thisName.search(flatArray[stepper].name)>=0){
                                       thisInstance = thisInstance + 1;
                                       }
                                   stepper = stepper -1;
                                   }                               
                    // INSTANCE FOUND
                    thisEntry.instance = thisInstance;
                    if (thisEntry.level == 1) {thisEntry.parent = [{name: "root"}];} else {thisEntry.parent = [];}
                    aeOrganize.push(thisEntry);
                    levelKeeper = aeOrganize[aeOrganize.length-1]
                    // iterate back up chain
                    for (a=k-1; a>=0; a--) {
                        upTravel = flatArray[a];
                        
                        if (upTravel.level < levelKeeper.level) {
                            upTravel.instance = 0;
                            levelKeeper = upTravel;
                            instance = 0;
                            aeOrganize[aeOrganize.length-1].parent.push(upTravel);
                            //alert(upTravel.name);
                            //alert(levelKeeper.name.match(upTravel.name).length);
                            } else if ((upTravel.level == levelKeeper.level) && (upTravel.name.match(levelKeeper.name))) {
                                instance = instance + 1;
                                levelKeeper.instance = instance;
                                //alert(upTravel.name+" is equal with the same name.  This has happend "+instance+" times.");
                            }
                        }
                    }    
                }
            theLayers = JSON.stringify(aeOrganize);
            //alert(theLayers);
            } else { alert ("Variable is wrong.  App is not communicating with script."); return; }


//////////////////////////////////////////
//    FUNCTIONS          //
//////////////////////////////////////////
function destinationCheck (theDoc) {
// check if folder with name psdname_PSspit
if (folderCheck.exists == true) {
    //alert ("its here");

    var check = true;
    var i = 1;
    
while (check == true) {
        fileDEST = new File (curPATH+spitFLDR+"/"+theDoc.name.slice(0,fileName.length-4)+ "_EX"+ lpad(i, 3) +".psd");
        //alert(fileDEST.exists);
        check = fileDEST.exists;
        i++;
        if (check == false) {
            //alert("but the file isn't here");
            theDoc.saveAs(fileDEST, psdOptions, true);
            curPATH = fileDEST.path+'/';
            fullNAME = fileDEST.fullName;
            ABSOfull = fullNAME.absoluteURI;
            curPATHstr = String(curPATH);
            fullNAMEstr = String(fullNAME);
            if (spitType == "newFile" || spitType == "newFileGroups") {theDoc.close(SaveOptions.DONOTSAVECHANGES);}
            }
        }
    
    } else {
            //alert ("its not here");
            // else create foler psdname_PSspit. save file as psdname_EX001
            newFLDR = new Folder(curPATH+spitFLDR);
            newFLDR.create();
            theDoc.name = theDoc.name + "_EX001";
            //alert(theDoc.name);
            fileDEST = new File (curPATH+spitFLDR+"/"+theDoc.name.slice(0,fileName.length-4)+ "_EX001.psd");
            theDoc.saveAs(fileDEST, psdOptions, true);
            curPATH = fileDEST.path+'/';
            fullNAME = fileDEST.fullName;
            ABSOfull = fullNAME.absoluteURI;
            curPATHstr = String(curPATH);
            fullNAMEstr = String(fullNAME);
            if (spitType == "newFile" || spitType == "newFileGroups") {theDoc.close(SaveOptions.DONOTSAVECHANGES);}           
        }   
    }

function lpad(value, padding) {
    var zeroes = new Array(padding+1).join("0");
    return (zeroes + value).slice(-padding);
}
// function to get selected layers by paul mr;
function GetSelectedLayers() {
var A=[];
    var desc11 = new ActionDescriptor();
        var ref9 = new ActionReference();
        ref9.putClass( stringIDToTypeID('layerSection') );
    desc11.putReference( charIDToTypeID('null'), ref9 );
        var ref10 = new ActionReference();
        ref10.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc11.putReference( charIDToTypeID('From'), ref10 );
    // try catch to stop script
    try {
    executeAction( charIDToTypeID('Mk  '), desc11, DialogModes.NO );
    } catch (err) {
            alert("Script will not work on locked layers.");
            throw new Error("Locked Layer");
        }
var gL = activeDocument.activeLayer.layers;
for(var i=0;i<gL.length;i++){
A.push(gL[i]);
}
executeAction( charIDToTypeID('undo'), undefined, DialogModes.NO );
return A;
};


function renameLayers(ref) {
	// declare local variables
	var len = ref.layers.length;
	// rename layers top to bottom
		for (var i = 0; i < len; i++) {
			rename();
		}
	function rename() {
		var layer = ref.layers[i];
		var vis = layer.visible;
		// check for groups
		if (layer.typename == 'LayerSet') {
            gatheredLAYS.push(layer);
			renameLayers(layer);
		}
		// rename layer
		else {
            gatheredLAYS.push(layer);
			//layer.name = "poop";
			if (!vis) {
				layer.visible = false;
			}
		}
	}
}

function randomString(len) {
  // Just an array of the characters we want in our random string
  var chrs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
              '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
 
  // Check that a length has been supplied and if not default to 32
  len = (isNaN(len)) ? 32 : len;
 
  // The following section shuffles the array just to further randomise the output
  var tmp, current, top = chrs.length; 
  if(top)
  {
    while(--top) 
    { 
      current = Math.floor(Math.random() * (top + 1)); 
      tmp = chrs[current]; 
      chrs[current] = chrs[top]; 
      chrs[top] = tmp; 
    }
  }
 
  // Just a holder for our random string
  var randomStr = '';
 
  // Loop through the required number of characters grabbing one at random from the array each time
  for(tickletonk=0;tickletonk<len;tickletonk++) 
  {
    randomStr = randomStr + chrs[Math.floor(Math.random()*chrs.length)];
  }
 
  // Return our random string
  return randomStr;

}

function appDuplicate(srcDocument, srcObjects, docs, newName) {
	var n, m, doc, result=[];
	
	for (n=0, m=docs.length; n<m; n++) {
		doc = docs[n];
		activeDocument = doc;
		origChnls = doc.activeChannels;
		doc.suspendHistory("Duplicate", "duplicate();");
		activeDocument = doc;
		doc.activeChannels = origChnls;
		}
	
	function duplicate() {
		var n, m, newObject;
		for (n=0, m=srcObjects.length; n<m; n++) {
			activeDocument = srcDocument;
			switch (srcObjects[n].typename) {
				case "PathItem": newObject = copyPathItem(); break;
				default: newObject = srcObjects[n].duplicate(doc);
				}
			activeDocument = doc;
			if (newName.length > 0) { newObject.name = newName; }
			else { newObject.name = srcObjects[n].name; }
			result.push(newObject);
			}
		};
	
	function copyPathItem() {
		};
	
	return result;
	}


function appGetDocuments(filters) {
	var n, m, doc, prop, docs = [];
	
	for (n=0, m=documents.length; n<m; n++) {
		doc = documents[n];
		if (filters) {
			match = true;
			for (prop in filters) {
				if (prop == "ignore") {
					if (filters.ignore == doc) {
						match = false;
						break;
						}
					}
				else if (prop == "name") {
					if (filters[prop].toLowerCase() != doc.name.toLowerCase()) {
						match = false;
						break;
						}
					}
				else {
					if (doc[prop] != filters[prop]) {
						match = false;
						break;
						}
					}
				}
			if (match) { docs.push(doc); }
			}
		else { docs.push(doc); }
		}
	return docs;
	}


function arrayContains(a,v){for(var n=0;n<a.length;n++){if(a[n]==v){return true;}}return false;}
function cTID(s) {return app.charIDToTypeID(s);}
function docWrapEdits(src, name, fn) {
	var result;
	
	if (!documents.length) { logErr(src, "noOpenDocs"); return; }
	try {
		activeDocument.suspendHistory(name, "edit();");
		return result;
		}
	catch(e) { log(src.callee, e); }
	
	function edit() { result = fn(); };
	}


function fileAppend(path, data, encoding) {
	var file;
	file = new File(path);
	file.open("a");
	if (typeof(encoding) == "string") {file.encoding = encoding;}
	file.write(data);
	file.close();
	}


function fileWrite(path, data, encoding) {
	var file;
	file = new File(path);
	if (file.exists) {file.remove();}
	file.open("e");
	if (typeof(encoding) == "string") {file.encoding = encoding;}
	file.write(data);
	file.close();
	}


function getADValue(ob, strID, index) {
	var D = DescValueType, type, key;
	
	if (!ob) {return;}
	if (arguments.length == 2) {
		type = ob.getType(sTID(strID));
		key = sTID(strID);
		}
	else if (arguments.length == 3) {
		type = ob.getType(index);
		key = index;
		}
	else { return getAll(); }
	
	switch (type) {
		case D.BOOLEANTYPE: return ob.getBoolean(key); break;
		case D.DOUBLETYPE: return ob.getDouble(key); break;
		case D.ENUMERATEDTYPE: return tSID(ob.getEnumerationValue(key)); break;
		case D.INTEGERTYPE: return ob.getInteger(key); break;
		case D.LISTTYPE: return getList(); break;
		case D.OBJECTTYPE: return getObject(); break;
		case D.REFERENCETYPE: return getReference(); break;
		case D.STRINGTYPE: return ob.getString(key); break;
		case D.UNITDOUBLE: return ob.getUnitDoubleValue(key); break;
		default:
			// log( "Unsupported Type: "+ob.getType(key) );
			return null;
		}
	
	function getAll() {
		var v, n, m, k;
		v = {};
		for (n=0, m=ob.count; n<m; n++) {
			k = tSID(ob.getKey(n));
			v[k] = getADValue(ob, k);
			}
		return v;
		};
	
	function getList() {
		var o, v, n, m;
		o = ob.getList(key);
		v = [];
		for (n=0, m=o.count; n<m; n++) {
			v.push(getADValue(o, null, n));
			}
		return v;
		};
	
	function getObject() {
		var o, v, n, m, k;
		o = ob.getObjectValue(key);
		v = {};
		for (n=0, m=o.count; n<m; n++) {
			k = tSID(o.getKey(n));
			v[k] = getADValue(o, k);
			}
		return v;
		};
	
	function getReference() {
		var R = ReferenceFormType, ref;
		ref = ob.getReference(key);
		switch (ref.getForm()) {
			case R.CLASSTYPE: return ref.getDesiredClass(); break;
			case R.ENUMERATED: return ref.getEnumeratedValue(); break;
			case R.IDENTIFIER: return ref.getIdentifier(); break;
			case R.INDEX: return ref.getIndex(); break;
			case R.NAME: return ref.getName(); break;
			case R.OFFSET: return ref.getOffset(); break;
			case R.PROPERTY: return ref.getProperty(); break;
			}
		};
	}


function getBlendID(name) {
	return {
		"Normal": "normal",
		"Dissolve": "dissolve",
		"Darken": "darken",
		"Multiply": "multiply",
		"Color Burn": "colorBurn",
		"Linear Burn": "linearBurn",
		"Darker Color": "darkerColor",
		"Lighten": "lighten",
		"Screen": "screen",
		"Color Dodge": "colorDodge",
		"Linear Dodge": "linearDodge",
		"Lighter Color": "lighterColor",
		"Overlay": "overlay",
		"Soft Light": "softLight",
		"Hard Light": "hardLight",
		"Vivid Light": "vividLight",
		"Linear Light": "linearLight",
		"Pin Light": "pinLight",
		"Hard Mix": "hardMix",
		"Difference": "difference",
		"Exclusion": "exclusion",
		"Subtract": "blendSubtraction",
		"Divide": "blendDivide",
		"Hue": "hue",
		"Saturation": "saturation",
		"Color": "color",
		"Luminosity": "luminosity"
		}[name] || "normal";
	}


function getColorID(name) {
	return {
		"None": "none",
		"Red": "red",
		"Orange": "orange",
		"Yellow": "yellowColor",
		"Green": "green",
		"Blue": "blue",
		"Violet": "violet",
		"Gray": "gray"
		}[name] || "none";
	}


function groupsBatchSelect(method, reverse, restore) {
	var batch, selIndexes, selIDs;
	
	if (!documents.length) { logErr(arguments, "noOpenDocs"); return; }
	
	batch = {index:0, items:[], originalItems:undefined};
	batch.items = layersGetData("groups");
	selIndexes = layersGetSelected();
	selIDs = layerIndexToID(selIndexes);
	switch (method) {
		case "Root Groups": rootGroups(); break;
		case "Selected Groups": selectedGroups(); break;
		}
	if (reverse) { batch.items.reverse(); }
	if (restore) { batch.originalItems = layerIndexToID(layersGetSelected()); }
	return batch;
	
	function selectedGroups() {
		var items=[], n;
		for (n=0; n<batch.items.length; n++) {
			if (arrayContains(selIndexes, batch.items[n].index)) {
				items.push(batch.items[n]);
				}
			}
		batch.items = items;
		};
	
	function rootGroups() {
		var doc = layersGetData("nested");
		batch.items = doc.groups;
		};
	}


function layerGetData(refType, layerRef, props) {
	var ar, ad, type, valueMap, layer, p, prop;
	
	if (!props) { props = {index:true, id:true, name:true}; }
	ar = new ActionReference();
	if (refType == "id") { ar.putIdentifier(cTID("Lyr "), layerRef); }
	else { ar.putIndex(cTID("Lyr "), layerRef); }
	try { ad = executeActionGet(ar); }
	catch(e) { return null; }
	
	type = tSID(ad.getEnumerationValue(sTID("layerSection")));
	type = {"layerSectionStart":"group", "layerSectionEnd":"groupEnd",
		"layerSectionContent":"layer"}[type];
	
	valueMap = { angle:"globalAngle", blend:"mode", fxvisible:"layerFXVisible",
		grouped:"group", id:"layerID", index:"itemIndex", locks:"layerLocking",
		section:"layerSection", preserve:"preserveTransparency" };
	
	layer = {type:type};
	for (p in props) {
		prop = p;
		if (!ad.hasKey(sTID(prop))) { prop = valueMap[prop.toLowerCase()]; }
		if (!ad.hasKey(sTID(prop))) { continue; }
		layer[p] = getADValue(ad, prop);
		p = p.toLowerCase();
		if (p=="index"||p=="itemindex" && refType=="index") { layer[p] = layerRef; }
		}
	
	return layer;
	}


function layerHasMask() {
	var ar, ad;
	try {
		ar = new ActionReference();
		ar.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
		ad = executeActionGet(ar);
		return ad.getBoolean(sTID("hasUserMask"));
		}
	catch(e) { log(arguments.callee, e); }
	}


function layerIfLayerMask(type) {
	var result;
	result = (type=="False");
	if (documents.length == 0) { logErr(arguments, "noOpenDocs"); return; }
	if (layersGetSelected().length != 1) { logErr(arguments, "singleLayerOnly"); return; }
	return layerHasMask()? !result:result;
	}


function layerIndexToID(value) {
	var result, n, m;
	
	if (value.constructor == Array) {
		result = [];
		for (n=0, m=value.length; n<m; n++) { result.push(indexToID(value[n])); }
		return result;
		}
	else { return indexToID(value); }
	
	function indexToID(index) {
		var layer;
		layer = layerGetData("index", index);
		if (layer) { return layer.id; }
		else { return -1; }
		};
	}


function layersDuplicate(index) {
	var ad, ar;
	try {
		ad = new ActionDescriptor();
		ar = new ActionReference();
		if (arguments.length == 1) { ar.putIndex(cTID("Lyr "), index); }
		else { ar.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt")); }
		ad.putReference(cTID("null"), ar);
		ad.putInteger(cTID("Vrsn"), 5);
		executeAction(cTID("Dplc"), ad, DialogModes.NO);
		return true;
		}
	catch(e) { log(arguments.callee, e); }
	}


function layersGetData(format, props) {
	var layers, count, index, layer, group;
	
	if (format == "nested") { group = {parent:0, groups:[], layers:[]}; }
	else { layers = []; }
	
	count = getLayerCount();
	index = 0;
	try { activeDocument.backgroundLayer; }
	catch(e) { index=1; count++; }
	
	for (index; index<count; index++) {
		layer = layerGetData("index", index, props);
		if (!layer) { continue; }
		
		if (format == "nested" && layer.type == "groupEnd") {
				group = {parent:group, groups:[], layers:[]};
			}
		
		if (format=="raw" || layer.type!="groupEnd") {
			if (format=="groups" && layer.type=="layer") { continue; }
			if (format=="layers" && layer.type=="group") { continue; }
			if (format=="nested") {
				if (layer.type == "group") {
					for (p in layer) { group[p]=layer[p]; }
					group.parent.groups.push(group);
					group = group.parent;
					}
				else { group.layers.push(layer); }
				}
			else { layers.push(layer); }
			}
		}
	
	function getLayerCount() {
		var ar, count;
		ar = new ActionReference(); 
		ar.putEnumerated(cTID("Dcmn"), cTID("Ordn"), cTID("Trgt")); 
		count = executeActionGet(ar).getInteger(cTID("NmbL"));
		try { activeDocument.backgroundLayer; count++; }
		catch(e) {}
		return count;
		};
	
	if (format == "nested") { return group; }
	else { return layers; }
	}


function layersGetObjects(indexes) {
	var layers=[], n, m;
	for (n=0, m=indexes.length; n<m; n++) {
		layersSetSelected("index", "new", indexes[n]);
		layers.push(activeDocument.activeLayer);
		}
	return layers;
	}


function layersGetSelected() {
	var hasBkgd, layers=[], offset, ar, ad, n;
	
	try { activeDocument.backgroundLayer; hasBkgd = true; }
	catch(e) { hasBkgd = false; }
	
	ar = new ActionReference();
	ar.putEnumerated(cTID("Dcmn"), cTID("Ordn"), cTID("Trgt"));
	ad = executeActionGet(ar);
	
	if (ad.hasKey(sTID("targetLayers"))) {
		offset = hasBkgd ? 0:1;
		ad = ad.getList(sTID("targetLayers"));
		for (n=0; n<ad.count; n++) {layers.push(ad.getReference(n).getIndex()+offset);}
		}
	else {
		offset = hasBkgd ? -1:0;
		ar = new ActionReference(); 
		ar.putProperty(cTID("Prpr"), cTID("ItmI")); 
		ar.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
		layers.push(executeActionGet(ar).getInteger(cTID("ItmI"))+offset);
		}
	
	return layers;
	}


function layersMakeSmartObject(name) {
	return docWrapEdits(arguments, "Layers to Smart Object", makeSmartOb);
	function makeSmartOb() {
		if (layersToSmartObject()) {
			if (name.length) { activeDocument.activeLayer.name = name; }
			return true;
			}
		};
	}


function layersReplicate(method, docName, newName, ignore, restore) {
	var doc, indexes, n, m, layers, docs=[], result, lastDoc;
	
	if (!documents.length) { logErr(arguments, "noOpenDocs"); return; }
	
	doc = activeDocument;
	indexes = layersGetSelected();
	
	if (method == "Same Document") {
		docWrapEdits(arguments, "Duplicate Layers", dupeLayers);
		}
	else {
		layers = layersGetObjects(indexes);
		if (method == "All Documents") {
			if (ignore) { docs = appGetDocuments({ignore:doc}); }
			else { docs = appGetDocuments(); }
			}
		else { docs = appGetDocuments({name:docName}); }
		}
	
	if (docs.length) {
		result = appDuplicate(doc, layers, docs, newName);
		lastDoc = activeDocument;
		activeDocument = doc;
		layersSelectArray(indexes);
		if (!restore) { activeDocument = lastDoc; }
		}
	
	return result;
	
	function dupeLayers() {
		if (layersDuplicate() && newName.length) {
			indexes = layersGetSelected();
			for (n=0, m=indexes.length; n<m; n++) {
				layersSetSelected("index", "new", indexes[n]);
				activeDocument.activeLayer.name = newName;
				}
			layersSelectArray(indexes);
			}
		};
	}


function layersSelectArray(layerRefs) {
	var n;
	layersSetSelected("index", "new", layerRefs[0]);
	for (n=1; n<layerRefs.length; n++) {
		layersSetSelected("index", "add", layerRefs[n]);
		}
	}


function layersSelectIDArray(layerRefs) {
	var n;
	layersSetSelected("id", "new", layerRefs[0]);
	for (n=1; n<layerRefs.length; n++) {
		layersSetSelected("id", "add", layerRefs[n]);
		}
	}


function layersSetName(name, append, digits, start, increment, reverse) {
	if (name.length) { return docWrapEdits(arguments, "Set Layer Name", setLayerName); }
	
	function setLayerName() {
		var maxNum, indexes, n, m, newName, num;
		
		if (append) {
			digits = parseNum(digits, "int", {min:1, max:20, resetValue:1});
			maxNum = Math.pow(10, digits);
			start = parseNum(start, "int", {min:0, resetValue:0});
			increment = parseNum(increment, "int", {min:1, resetValue:1});
			}
		indexes = layersGetSelected();
		for (n=0, m=indexes.length; n<m; n++) {
			newName = name;
			if (append) {
				if (reverse) { num = m-n-1; }
				else { num = n; }
				num = (start+num)*increment;
				num %= maxNum;
				newName += strPadBefore(""+num, "0", digits);
				}
			layersSetSelected("index", "new", indexes[n]);
			layersSetProps({name:newName});
			}
		layersSelectArray(indexes);
		return true;
		};
	}


function layersSetProps(options) {
	var ad, ar, ad2, p, value;
	
	ad = new ActionDescriptor();
	ar = new ActionReference();
	ar.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
	ad.putReference(cTID("null"), ar);
	ad2 = new ActionDescriptor();
	
	for (p in options) {
		value = options[p];
		switch (p.toLowerCase()) {
			case "color":				ad2.putEnumerated(sTID("color"), sTID("color"), sTID(getColorID(value)) ); break;
			case "blend":				ad2.putEnumerated(sTID("mode"), sTID("blendMode"), sTID(getBlendID(value)) ); break;
			case "fillopacity":	ad2.putUnitDouble(sTID("fillOpacity"), sTID("percentUnit"), value); break;
			case "name":				ad2.putString(sTID("name"), value); break;
			case "opacity":			ad2.putUnitDouble(sTID("opacity"), sTID("percentUnit"), value); break;
			}
		}
	
	ad.putObject(cTID("T   "), cTID("Lyr "), ad2);
	try {
		executeAction(sTID("set"), ad, DialogModes.NO);
		return true;
		}
	catch(e) { log(arguments.callee, e); }
	}


function layersSetSelected(method, modify, layerRef) {
	var methods, methodType, ar, ad;
	
	methods = { all:"selectAllLayers", id:"slct", index:"slct", linked:"selectLinkedLayers",
		name:"slct", none:"selectNoLayers", similar:"selectSimilarLayers" };
	method = method.toLowerCase();
	modify = modify.toLowerCase();
	methodType = methods[method];
	if (!methodType) { return; }
	
	ad = new ActionDescriptor();
	ar = new ActionReference();
	
	if (methodType.length == 4) {
		switch (method) {
			case "id": ar.putIdentifier(cTID("Lyr "), layerRef); break;
			case "index": ar.putIndex(cTID("Lyr "), layerRef); break;
			case "name": ar.putName(cTID("Lyr "), layerRef); break;
			}
		methodType = cTID(methodType);
		ad.putBoolean(cTID("MkVs"), false);
		}
	else {
		ar.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt"));
		methodType = sTID(methodType);
		}
	
	ad.putReference(cTID("null"), ar);
	if (modify == "add") {
		ad.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("addToSelection")); }
	else if (modify == "remove") {
		ad.putEnumerated(sTID("selectionModifier"), sTID("selectionModifierType"), sTID("removeFromSelection")); }
	
	try {
		executeAction(methodType, ad, DialogModes.NO);
		return true;
		}
	catch(e) { log(arguments.callee, e); }
	}


function layersSetVisibility(vis) {
	return docWrapEdits(arguments, "Set Layer Visible", setLayerVisible);
	function setLayerVisible() { return layersSetVisible(vis); };
	}


function layersSetVisible(visible, index) {
	var visID, ad, ar, al;
	visID = visible ? "Shw ":"Hd  ";
	try {
		ad = new ActionDescriptor();
		ar = new ActionReference();
		al = new ActionList();
		if (arguments.length == 2) { ar.putIndex(cTID("Lyr "), index); }
		else { ar.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt")); }
		al.putReference(ar);
		ad.putList(cTID("null"), al);
		executeAction(cTID(visID), ad, DialogModes.NO);
		return true;
		}
	catch(e) { log(arguments.callee, e); }
	}


function layersToSmartObject() {
	try {
		executeAction(sTID("newPlacedLayer"), undefined, DialogModes.NO);
		return true;
		}
	catch(e) { log(arguments.callee, e); }
	}


function log(v, err, msg) {
	// Initialization
	if (!Settings.debug) {
		var pathArray, date, str;
		Settings.debug = {
			delim:String.fromCharCode(13, 10),
			path: Folder.userData+ "/Script Builder Files/" +Settings.scriptName+ " - Log.txt",
			text:""
			};
		date = new Date();
		str = "Begin debug log: " + date.toLocaleString() +Settings.debug.delim;
		str += "------------------------------------------------------------" +Settings.debug.delim;
		fileWrite(Settings.debug.path, str);
		}
	
	// Error logging
	if (typeof v == "function") {
		v = "Error in " +v.name+ "(): ";
		if (err && msg) { v += msg + " " + err.message; }
		else if (err) { v += err.message; }
		else if (msg) { v += msg; }
		else { v = v.substring(0, v.length-2) + "."; }
		}
	
	// Normal message logging
	else {
		if (typeof v != "string") {
			if (v == undefined) {v = "undefined";}
			else {v = v.toString();}
			}
		}
	
	if (Settings.debug.path) { fileAppend(Settings.debug.path, v + Settings.debug.delim); }
	}


function logErr(src, id) {
	var err = {
		badChannelValue:	"Invalid channel number entered.",
		badColorValue:		"Invalid color value entered.",
		badDocDimsValue:	"Invalid document dimensions entered.",
		badExportValues:	"Invalid file path or file name value supplied for export.",
		badNameValue:			"Invalid name value supplied.",
		badNumberValue:		"Invalid number value supplied.",
		badPathName:			"Path name supplied is not unique.",
		badRefEdgeOuput:	"Output method cannot be used when decontaminating colors.",
		badSubdivValue:		"Subdivisions value must be an integer between 1 and 100.",
		badTestValue:			"Invalid comparison value supplied.",
		fileError:				"Could not read file.",
		fileExists:				"A file of the same name already exists in the chosen location.",
		flatImagesOnly:		"This function only works on flattened images.",
		layerDataError:		"An error occurred while reading the layer settings.",
		logNotEnabled:		"Log must be enabled in order to assign file path.",
		multiLayerOnly:		"More than one layer must be selected.",
		noClipImageData:	"No image data on clipboard.",
		noDocFile:				"Document has never been saved.",
		noActionName:			"No action name specified.",
		noActionSetName:	"No action set name specified.",
		noBkgdLayer:			"There is no background layer.",
		noDestFolder:			"Destination folder not defined.",
		noFile:						"File does not exist at the specified location.",
		noFileSystemPath:	"No file or folder path was chosen.",
		noFilterImg:			"Image file does not exist, or none was selected.",
		noFilterMask:			"Layer has no filter mask.",
		noFolder:					"Folder does not exist at the specified location.",
		noFormatOptions:	"The \"formatOptions\" parameter is not defined.",
		noHTMLExporter:		"The \"htmlExporter\" object does not exist or is not valid.",
		noLayerArtwork:		"Layer has no image data.",
		noLayerComps:			"Document has no layer comps.",
		noLayerFX:				"Layer has no effects.",
		noLayerMask:			"Layer has no layer mask.",
		noLogTextFile:		"Log file path should point to a text file.",
		noLogFile:				"Log file path does not point to a file.",
		noNameValue:			"No new name entered.",
		noOpenDocs:				"There are no documents open.",
		noQuicktime:			"File format requires QuickTime.",
		noSelectedPath:		"There is no path selected.",
		noSelection:			"There is no selection.",
		noSelectionMod:		"There is no selection to modify.",
		noTextExporter:		"The \"textExporter\" object does not exist or is not valid.",
		noVectorMask:			"Layer has no vector mask.",
		noWorkPath:				"Document has no work path.",
		singleLayerOnly:	"Only one layer should be selected.",
		wrongLayerKind:		"Selected layer is the wrong kind for the requested action."
		}[id];
	if (err) { log(src.callee, null, err); }
	}


function parseNum(value, type, limits) {
	if (!type) {return undefined;}
	switch (type) {
		case "float": value = parseFloat(value); break;
		case "int": value = parseInt(value); break;
		}
	if (isNaN(value)) {
		if (limits && "resetValue" in limits) { value = limits.resetValue; }
		else {return undefined;}
		}
	if (limits) {
		if ("min" in limits && value < limits.min) { value = limits.min; }
		if ("max" in limits && value > limits.max) { value = limits.max; }
		}
	return value;
	}


function sTID(s) {return app.stringIDToTypeID(s);}
function strPadBefore(s, padValue, maxLength) {
	for (var n=s.length; n<maxLength; n++) {s=padValue+s;}
	return s;
	}


function tSID(s) {return typeIDToStringID(s);}
function buildLayerArray(){   
     var nestedSets = 0;  
     var layList = [];  
     var layerCount = getNumberOfLayer();  
     for( var j = 1; j <= layerCount; j++ ){  
          layerSection = getLayerSectionByAMIndex( j );
          layerName = getLayerNameByIndex (j);
          layerID = getLayerIDByIndex(j);
          if( layerSection == 'layerSectionEnd' ) {nestedSets++;} 
          if( layerSection == 'layerSectionStart'  && nestedSets > 0) { layList[layList.length] = {name: layerName, orgIndex: j, id: layerID, selected: false, group: true, level: nestedSets}; nestedSets--;}
          if( layerSection == 'layerSectionStart'  && nestedSets == 0) {}
          if( layerSection != 'layerSectionStart'  && layerSection != 'layerSectionEnd') {layList[layList.length] = {name: layerName, orgIndex: j, id: layerID, selected: false, group: false, level: (nestedSets+1)};}               
     }  
 return layList.reverse();
};  

function buildLayerList(){   
     var nestedSets = 0;  
     var str = " ";  
     var layerCount = getNumberOfLayer();  
     for( var j = 1; j <= layerCount; j++ ){  
          layerSection = getLayerSectionByAMIndex( j );
          layerName = getLayerNameByIndex (j);
          layerID = getLayerIDByIndex(j);
          itemID = getItemIDByIndex (j);
          count = getCountByIndex (j);
          if( layerSection == 'layerSectionEnd' ) {nestedSets++;} 
          if( layerSection == 'layerSectionStart'  && nestedSets > 0) { str += j+" "+itemID+" "+layerID+" "+layerName +", level: "+ nestedSets+" "+/*matchSelected (j)+*/",\n" ; nestedSets--;}
          if( layerSection == 'layerSectionStart'  && nestedSets == 0) {}
          if( layerSection != 'layerSectionStart'  && layerSection != 'layerSectionEnd') {str += j+" "+itemID+" "+layerID+" "+layerName +", level: "+ (nestedSets+1)+" "+/*matchSelected (j)+*/"," +"\n";}                
     }  
 return str;
};  
 
function putInFile(str){
	var path = File.saveDialog();
	var file = new File(path);
	file.encoding = "UTF-8";
	try{
		file.open("w");
		file.write(str);
	} catch(e) {
		alert("Unable to write to file.\n" + e);
	}
	file.close();
} 
 
 function getLayerParentAMIndexByAMIndex( idx ){  
     var nestedSets = 0;  
     var layerCount = getNumberOfLayer();  
     for( var l = idx; l <= layerCount; l++ ){  
          var layerSection = getLayerSectionByAMIndex( l );  
          if( layerSection == 'layerSectionEnd' ) nestedSets++;  
          if( layerSection == 'layerSectionStart'  && nestedSets > 0) nestedSets--;  
          if( layerSection == 'layerSectionStart'  && nestedSets == 0) return l;  
     }  
 }; 
 
function getLayerNameByIndex( idx ) {   
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "Nm  " ));   
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );  
    return executeActionGet(ref).getString(charIDToTypeID( "Nm  " ));;   
};  

function getLayerIDByIndex( idx ) {   
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "LyrI" ));   
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );  
    return executeActionGet(ref).getString(charIDToTypeID( "LyrI" ));;   
};  

function getItemIDByIndex( idx ) {   
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" ));   
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );  
    return executeActionGet(ref).getString(charIDToTypeID( "ItmI" ));;   
};  

function getCountByIndex( idx ) {   
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "Cnt " ));   
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );  
    return executeActionGet(ref).getString(charIDToTypeID( "Cnt " ));;   
};  

function getLayerSectionByAMIndex( idx ) {   
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID('layerSection'));   
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );  
    return typeIDToStringID(executeActionGet(ref).getEnumerationValue(stringIDToTypeID('layerSection')));   
};  

function getNumberOfLayer(){   
     var ref = new ActionReference();   
     ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );   
     var desc = executeActionGet(ref);   
     var numberOfLayer = desc.getInteger(charIDToTypeID("NmbL"));   
     return numberOfLayer;   
};


 function getSelectedLayerIndicies (){
  // varibles pulled from Terminology.jsx
  // ktargetLayers is missing from Terminology.jsx
  const keyLayerID = app.charIDToTypeID('LyrI');
  const classProperty				= app.charIDToTypeID('Prpr');
  const classDocument				= app.charIDToTypeID('Dcmn');
  const enumTarget			= app.charIDToTypeID('Trgt');
  const typeOrdinal			= app.charIDToTypeID('Ordn');
  const eventGet				= app.charIDToTypeID('getd');
  const keyTarget				= app.charIDToTypeID('null');
  const classLayer				= app.charIDToTypeID('Lyr ');
  const ktargetLayers = app.stringIDToTypeID("targetLayers");
  
  var backgroundIndexOffset = 0;
  try {
    // This throws an error if there's no background
    if (app.activeDocument.backgroundLayer)
      backgroundIndexOffset = 1;
  }
  catch (err)
  {}
  var resultLayerIndices = [];
  var ref = new ActionReference();
  var args = new ActionDescriptor();
  ref.putProperty( classProperty, ktargetLayers );
  ref.putEnumerated( classDocument, typeOrdinal, enumTarget );
  args.putReference( keyTarget, ref );
  var resultDesc = executeAction( eventGet, args, DialogModes.NO );
  if (! resultDesc.hasKey( ktargetLayers ))
  {
    resultLayerIndices.push( app.activeDocument.activeLayer.itemIndex - backgroundIndexOffset );
    return resultLayerIndices;
  }
  var selIndexList = resultDesc.getList( ktargetLayers );
  for (i = 0; i < selIndexList.count; ++i)
    resultLayerIndices.push(selIndexList.getReference(i).getIndex( classLayer ) + (1-backgroundIndexOffset) );
  return resultLayerIndices;  // Reverse again to match layer palette
}

function matchSelected (Indx) {
var selected = false;
for (z=0; z<selIndex.length; z++) {
    if (Indx == selIndex[z]) {
        selected = true;
        }
    }
return selected;
}

var findObjectByLabel = function(obj, label) {
    if(obj === label) { return obj; }
    for(var i in obj) {
        if(obj.hasOwnProperty(i)){
            var foundLabel = findObjectByLabel(obj[i], label);
            if(foundLabel) { return foundLabel; }
        }
    }
    return null;
};
/* sets up bridgetalk */
function btMessaging(targetApp, script) {
    BridgeTalk.bringToFront (targetApp); 
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
//////////////////////////// End Functions ////////////////////////////


/* gets the path of the running script */
var thisFile = new File($.fileName);
var basePath = thisFile.path
/* loads the external file */
var task4File = new File(basePath+"/SPIT_AE_v018.jsx");
task4File.open();
var task4 = task4File.read();
task4File.close();
var task5File = new File(basePath+"/json_parse.js");
task5File.open();
var task5 = task5File.read();
task5File.close();
//alert(task5);

/*  defines script to be sent to AE  */
var aeScript = 'var VVVersion= 3;'
aeScript += task5;
aeScript += 'var curPATHstr = \''+curPATHstr+'\';';
aeScript += 'var fullNAMEstr = \''+fullNAMEstr+'\';';
aeScript += 'var mstrFLDR = \''+mstrFLDR+'\';';
aeScript += 'var spitType = \''+spitType+'\';';
aeScript += 'var theLayers = \''+theLayers+'\';';


//add script to variable
aeScript += task4;


/*
if (spitType == "regular") {
// Remove identifier to layers
        for (var j = 0; j< theLayers.length; j++) {
            var curLAY = theLayers[j];
            curLAY.name = curLAY.name.slice(0,curLAY.name.length - 10);
        }
    var aeStatus = BridgeTalk.getStatus(activeAE);
    while (aeStatus != 'IDLE') {
        $.sleep (3000)
      aeStatus = BridgeTalk.getStatus(activeAE);
    }
    app.activeDocument = FSTdoc;
    FSTdoc.save();
}
*/
/*   send to AE   */
btMessaging(activeAE, aeScript);
BridgeTalk.bringToFront (activeAE);
app.refresh();
}
