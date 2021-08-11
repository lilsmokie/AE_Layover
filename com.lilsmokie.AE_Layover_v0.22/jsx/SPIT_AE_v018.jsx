
/*
var curPATHstr = '~/Desktop/jpeger/';
var fullNAMEstr = '~/Desktop/jpeger/banner.psd';
var mstrFLDR = "_PS_Spitter";
var spitType = "newFile"
*/
aeSpit (curPATHstr, fullNAMEstr, mstrFLDR, spitType, theLayers);


/*/////////////////////////// MAIN FUNCTION ////////////////////////////*/
function aeSpit (currentPath, fullName, masterFolder, spitType, psLayers) {
app.beginUndoGroup("SPAT");
var activeItem = app.project.activeItem;

var curPATHstr = currentPath;
var fullNAMEstr = fullName;
var mstrFLDR = masterFolder;

// progress bar
progress_window = new Window('palette');
   progress_window.text = 'Progress';
   progress_window.orientation = 'column';
   progress_window.alignChildren = 'fill';
   progress_window.margins = 30;

      progress_window_text = progress_window.add('statictext',undefined,'Importing File ...........');

      progress_bar = progress_window.add('progressbar');
      progress_bar.minvalue = 0;
      progress_bar.maxvalue = 100;
      progress_bar.value = 0;
      progress_bar.preferredSize = [300, 20];
   
progress_window.center();
progress_window.show();   


// for testing only
//layer1={name:"Group 3SPIT_qwert"};
//layer2={name:"juicySPIT_qwert"};
//layer3={name:"Group 3SPIT_qwert"};
//var theLayers=new Array(); 
//theLayers[0]=layer1;       
//theLayers[1]=layer2;
//theLayers[2]=layer3;

//alert(theLayers.length);


var project = app.project;
var myFile = File(fullNAMEstr);
var fileNAME = fullNAMEstr.slice(curPATHstr.length);
var fileNAMEdec = decodeURI(fileNAME);
var fileNOext = fileNAMEdec.slice(0,(fileNAMEdec.length-3));
var fileEXT = fileNAMEdec.slice((fileNAMEdec.length-3));


var myImportOptions = new ImportOptions(myFile);
myImportOptions.forceAlphabetical = false;
/* determine type of import command */
if (spitType == "visible") {myImportOptions.importAs = ImportAsType.FOOTAGE;} else {myImportOptions.importAs = ImportAsType.COMP_CROPPED_LAYERS;}
var myFootage = app.project.importFile(myImportOptions);
var items = app.project.items;
// find folder
var footageCollection = myFootage.layers;
if (spitType == "visible") {
    var impFLDR = myFootage;
    } else {
var fldrFinder = footageCollection[1].source;
var impFLDR = fldrFinder.parentFolder;
if (spitType == "regular"){var theLayers= psLayers;} else {var theLayers= myFootage.layers;}
}

// check for and move to spit folder
var chick = 0;
for (i = 1; i <= app.project.numItems; i++) {
    curITEM = items[i];
    // check for folder
    if (curITEM instanceof FolderItem){
        if (curITEM.name == mstrFLDR) {
                // place imported item in folder
                myFootage.parentFolder = curITEM;
                impFLDR.parentFolder = curITEM;
                var psFLDR = curITEM;
            }  else {chick++;}
        } else {chick++;}
    }
if (chick == app.project.numItems) {
// create folder because no pspit folder exists
    var psFLDR = items.addFolder(mstrFLDR);
    myFootage.parentFolder = psFLDR;
    impFLDR.parentFolder = psFLDR;
}
// create new folders sort selected and extra footage
var currentdate = new Date();
var hours = currentdate.getHours() < 10 ? "0" + currentdate.getHours() : currentdate.getHours();
var minutes = currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes();
var seconds = currentdate.getSeconds() < 10 ? "0" + currentdate.getSeconds() : currentdate.getSeconds();
var selFLDR = items.addFolder(impFLDR.name + "_" + hours +":"+ minutes);
selFLDR.parentFolder = psFLDR;


// actually places the layers in the new comp
if ((activeItem == null) || !(activeItem instanceof CompItem)) {
    // look for active comp if not found try the viewer
    app.activeViewer.setActive();
    var activeItem = app.project.activeItem;
    if ((activeItem == null) || !(activeItem instanceof CompItem)) {
        alert("Need to have the comp window selected before leaving After Effects.");
        }else{layerPlace();}
    } else {layerPlace();}
        
        
        

function layerPlace() {
        if ((spitType == "newFile") || (spitType == "newFileGroups")){
            // set up array to be used in Groups
            var protectLayers=new Array(); 
            for (j = theLayers.length; j> 0; j--) {
                protectLayers.push(theLayers[j].source);
                theLayers[j].source.parentFolder = selFLDR;
                theLayers[j].copyToComp(activeItem);
                }
            if (impFLDR.numItems>0) {
                impFLDR.parentFolder = selFLDR;
                impFLDR.name = "_extras";
                } else {impFLDR.remove();}
            myFootage.remove();
            
                if (spitType == "newFileGroups") {
                
                //alert(protectLayers[0]);
                for (j = 0; j<= protectLayers.length; j++) {
                    aryNUMB = j;   
                    curLAY = protectLayers[aryNUMB];
                    //alert(curLAY.name);
                    if (curLAY instanceof CompItem) {
                        compLayers = curLAY.layers;
                        for (k = 1; k<= compLayers.length; k++) {
                            protectLayers.push(compLayers[k].source);
                    }
                    }
                    }
// all used layers collected, looking for SPITMASK layers
        for (j = 0; j< protectLayers.length; j++) {
            aryNUMB = j;   
            curLAY = protectLayers[aryNUMB];
            if (curLAY.name.search("_LayOMASK_") >= 0) {
                var srcCOMP = curLAY.usedIn;
                for (k = 1; k<= srcCOMP[0].layers.length; k++) {
                    var compLAY = srcCOMP[0].layers[k];
                    if (curLAY == compLAY.source) {
                        srcCOMP[0].layers[k+1].trackMatteType.collapseTransformation = false;
                        srcCOMP[0].layers[k+1].trackMatteType = TrackMatteType.ALPHA;
                        }
                    }
            }
        }
        }
        
        } else  if (spitType == "regular") {
            // parse the json object to javascript
            //panger = myFootage.layers;
            //alert(panger.length);
            //alert(seeArray(panger));
            //alert(theLayers);
            theLayers = json_parse(theLayers);
            // create an array for the layers once found
            aeLayers = [];
            // look for layers. walk backwards from the layer list
            for (j = theLayers.length-1; j>= 0; j--) { 
                //alert("SELECTED: "+theLayers[j].name);
                // walk backward through parents // what if we rethought this whole dang thing and went foreward that way things get pasted backwards which would be good
                currentCompItem = myFootage.layers;
                // check for root parent
                // do we need to check if duplicate named layers on the root level work??
                if ((theLayers[j].parent.length==1)&&(theLayers[j].parent[0].name=="root")) {MoveThis = getSPITLayer (currentCompItem, theLayers[j]); MoveThis.copyToComp(activeItem); MoveThis.source.parentFolder = selFLDR;}                
                for (q = theLayers[j].parent.length-1; q>= 0; q--) {
                    // search through items for a matching name and instance
                    instance = 0;            
                    for (w = 1; w < currentCompItem.length ; w++) {                        
                        //alert("PARENT: "+theLayers[j].parent[q].name+"  FOOTAGEITEM: "+ currentCompItem[w].name + "    Comp Instance: " + instance);
                        // dig into each comp
                        currentParentMap = theLayers[j].parent[q];
                        if (currentCompItem[w].name.search(currentParentMap.name) >= 0) {
                            //alert("Got a name");
                            // catch the instance
                            if  (instance==currentParentMap.instance) {
                                // select dig into this layer
                                currentCompItem = currentCompItem[w].source.layers;
                                //alert(currentCompItem.length);
                                // if you reach the end of the json parent list pull out SELECTED else advance q through json object
                                if (q==0) {
                                    //alert("Got an instance");
                                    //alert("found the root folder");
                                    //need to find selected item then maybe create a function that moves a layer to a comp
                                    MoveThis = getSPITLayer (currentCompItem, theLayers[j]);
                                    MoveThis.copyToComp(activeItem);
                                    MoveThis.source.parentFolder = selFLDR;
                                    //set both for loops to end
                                    w = currentCompItem.length;
                                    q = -1;
                                    } else {
                                        q = q-1;
                                        // start count over in these layers
                                        w = 0;
                                        }
                                
                                } else {instance = instance +1;}                            
                            }                                                
                        }
                    }
                }
        cleanUp (selFLDR);
        // delete excess
        impFLDR.remove();
        myFootage.remove();
        } else  if (spitType == "visible") { MoveThis = activeItem.layers.add(myFootage); MoveThis.source.parentFolder = selFLDR;}
    
    }


progress_window.close(); 
app.endUndoGroup();
}

function cleanUp (cleanFolder) {
    newSpot = cleanFolder.items.addFolder("_extras");
    usedCollection = [];
    // add items to used collection
    for (r=1;  r<=cleanFolder.items.length; r++) {
    usedCollection.push(cleanFolder.items[r]);   
    } 
    for (s = 0; s < usedCollection.length; s++) {
        //alert("here is an item"+usedCollection[s].name);
        //alert("next here is its type "+usedCollection[s].typeName);
        if (usedCollection[s].typeName == "Composition") {
            //alert("here is a comp and the layers it has" + usedCollection[s].layers.length);
            for (r=1;  r<=usedCollection[s].layers.length; r++) {
                //alert("we found a comp and here is a layer we are pushing    "+usedCollection[s].layers[r].source.name);
                if (usedCollection.push(usedCollection[s].layers[r].source) != null) {usedCollection.push(usedCollection[s].layers[r].source);}
                }
            }
        if (usedCollection[s].parentFolder != cleanFolder) {usedCollection[s].parentFolder = newSpot;}
        }   
    }

function getSPITLayer (baseCompItemLayers, selectedMap){
    // this function gets the selected layer from the base comp item
    baseInstance = 0;
    for (t = 0; t < baseCompItemLayers.length ; t++) {
        item = baseCompItemLayers[t+1];
        //alert("FUNCTION item name: "+item.name+"    selected name:  "+selectedMap.name+"  Result of name: "+ item.name.search(selectedMap.name));
        if (item.name.search(selectedMap.name) >= 0){
            //alert("got a name again");
            //alert("here is the baseInstance:  "+baseInstance+"  Here is the selectedMap.instance"+ selectedMap.instance);
            if(baseInstance == selectedMap.instance){
                // alert("we have something");
                // we are here grab the layer and move it to active comp // or maybe just put it in an array so we can control how the layers are pasted // or maybe we just RETURN it
                return item;
                }else{
                    baseInstance = baseInstance+1;
                    }
            }        
        }
    }

// delete this for debug only
function seeArray (theArray) {
    arrayNames = "ITEM NAMES:   ";
     for (zx = 1 ; zx <= theArray.length; zx++) {
         arrayNames = arrayNames + theArray[zx].name +"    ";
        }
    //alert(arrayNames);
    return arrayNames;
    }
