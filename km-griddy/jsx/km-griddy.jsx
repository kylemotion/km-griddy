/**
 * @description An After Effects script that will sort selected layers into a grid pattern based on user input
 * @name km-griddy
 * @author Kyle Harter <kylenmotion@gmail.com>
 * @version 1.0.0
 * 
 * @license This script is provided "as is," without warranty of any kind, expressed or implied. In
 * no event shall the author be held liable for any damages arising in any way from the use of this
 * script.
 * 
 * 
 * 
 * 
*/


(function(thisObj){
    

    var scriptName = "km-griddy";

    createUI(thisObj)

    function createUI(thisObj){
        var win = thisObj instanceof Panel
        ? thisObj
        : new Window("window", scriptName, undefined, {
            resizeable: true
        })

    win.orientation = 'column';
    win.alignChildren = ["left", "top"];

    var margins = [15,15,15,15];


    // Setup Panel

    var setupPanel = win.add("panel", undefined, "Setup");
    setupPanel.orientation = 'column';
    setupPanel.alignChildren = ["fill", "fill"];
    setupPanel.margins = margins;
    var columnsGroup = setupPanel.add("group", undefined, "Columns Group");
    columnsGroup.orientation = "row";
    columnsGroup.alignChildren = ["fill", "fill"];
    
    var columnInputGroup = columnsGroup.add("group", undefined, "Column Input");
    columnInputGroup.orientation = "row";
    columnInputGroup.alignChildren = ["fill", "fill"];
    var inputColsStatic = columnInputGroup.add("statictext", undefined, "Columns:");
    var inputColsEdit = columnInputGroup.add("edittext",undefined, "3");
    inputColsEdit.characters = 5;
    
    var columnSpacingGroup = columnsGroup.add("group", undefined, "Cols Spacing Group");
    columnSpacingGroup.orientation = "row";
    columnSpacingGroup.alignChildren = ["fill", "fill"];
    var columnSpacingStatic = columnSpacingGroup.add("statictext", undefined, "Spacing:");
    var columnSpacingEdit = columnSpacingGroup.add("edittext", undefined, "3");
    columnSpacingEdit.characters = 5;
    columnSpacingEdit.text = 50;
    
    var rowsGroup = setupPanel.add("group", undefined, "Rows Group");
    rowsGroup.orientation = "row";
    rowsGroup.alignChildren = ["fill", "fill"];
    
    var rowInputGroup = rowsGroup.add("group", undefined, "Row Input");
    rowInputGroup.orientation = "row";
    rowInputGroup.alignChildren = ["fill", "fill"];
    var inputRowStatic = rowInputGroup.add("statictext", undefined, "Rows:");
    var inputRowEdit = rowInputGroup.add("edittext",undefined, "3");
    inputRowEdit.characters = 5;
    
    var rowSpacingGroup = rowsGroup.add("group", undefined, "Rows Spacing Group");
    rowSpacingGroup.orientation = "row";
    rowSpacingGroup.alignChildren = ["fill", "fill"];
    var rowSpacingStatic = rowSpacingGroup.add("statictext", undefined, "Spacing:");
    var rowSpacingEdit = rowSpacingGroup.add("edittext", undefined, "3");
    rowSpacingEdit.characters = 5;
    rowSpacingEdit.text = 50;

    // Rig Panel
    var rigPanel = win.add("panel", undefined, "Rig");
    rigPanel.orientation = 'column';
    rigPanel.alignment = ["fill", "fill"];
    rigPanel.alignChildren = ["center", "fill"];
    rigPanel.margins = margins;
    var rigGroup = rigPanel.add("group", undefined, "Create Rig Group");
    rigGroup.orientation = "row";
    rigGroup.alignChildren = ["fill", "fill"];
    var rigCheckbox = rigGroup.add("checkbox", undefined, "Create Expression Rig");
    rigCheckbox.value = false;

    // Execute Panel
    var executePanel = win.add("panel", undefined);
    executePanel.orientation = 'column';
    executePanel.alignment = ["fill", "fill"];
    executePanel.alignChildren = ["fill", "fill"];
    executePanel.margins = margins;
    var runButton = executePanel.add("button", undefined, "Run Griddy!");
    var helpButton = executePanel.add("button", undefined, "Help");
    
    //@include "./library/helpWindow.jsx"
    //@include "./library/pseudoEffectApplier.jsx"

    helpButton.addEventListener("mousedown",optionInfo_Click);

    runButton.onClick = function(){
        try {
            app.beginUndoGroup("What script does");

            var columnAmt = parseInt(inputColsEdit.text);
            var rowAmt = parseInt(inputRowEdit.text);
            var columnSpacing = Math.floor(parseInt(columnSpacingEdit.text));
            var rowSpacing = Math.floor(parseInt(rowSpacingEdit.text));

            if(isNaN(columnAmt) || columnAmt === "" ||
             isNaN(rowAmt) ||  rowAmt === "" ||
             isNaN(columnSpacing) || columnSpacing === "" ||
             isNaN(rowSpacing)|| rowSpacing === ""){
                alert("Whoops!\rYou need to input a number for the columns, rows, and spacing fields. Try again.");
                return
            }

            var createRig = rigCheckbox;

            sortGrid(columnAmt, rowAmt, columnSpacing, rowSpacing, createRig.value);

        } catch(error) {
            alert("An error occured on line: " + error.line + "\nError message: " + error.message);
        } finally {
            // this always runs no matter what
            app.endUndoGroup();
        }
    }

    function getProj(){
        var proj = app.project;
        if(!proj){
            alert("Whoops!\rYou don't have a project open currently. Open up an After Effects project or create a new one and try again.")
            return null
        }

        return proj;
    }


    function getActiveComp(){
        var proj = getProj();
        if(!proj) return null
        var activeComp = proj.activeItem;

        if(!(activeComp && activeComp instanceof CompItem)){
            alert("Whoops!\r You don't have a composition open. Create a new comp or open one and try again.");
            return null
        }

        return activeComp

    }

    function getSelLayers(){
        var comp = getActiveComp();
        if(!comp) return null;

        var selLayers = comp.selectedLayers;
        if(selLayers < 1){
            alert("Whoops!\rYou don't have any layers selected in your comp. Select atleast 1 layer and try again.")
            return null
        }

        return selLayers;

    }


    function createCtrlLayer(expressionRig){
        var comp = getActiveComp();
        if(!comp) return null;
        var selLayers = getSelLayers();
        if(!selLayers) return null;

        var firstLayer = selLayers[0];

        var startX = firstLayer.property("ADBE Transform Group").property("ADBE Position").value[0];
        var startY = firstLayer.property("ADBE Transform Group").property("ADBE Position").value[1];
        var ctrlLayer;
        var ctrlLayerName = "Grid Controls";

        for(var b = 1; b<=comp.numLayers; b++){
            var layer = comp.layer(b);
            if(layer.parent == comp.layer(ctrlLayerName)){
                layer.parent = null;
            }

            if(layer.name === ctrlLayerName && layer instanceof ShapeLayer){
                ctrlLayer = layer;
                break;
            } else {
                ctrlLayer = comp.layers.addShape();
                ctrlLayer.name = ctrlLayerName;
                break;
            }
        }

// Ctrl Layer Setup
        var ctrlLayerTrans = ctrlLayer.property("ADBE Transform Group");
        var ctrlPos = ctrlLayerTrans.property("ADBE Position");
        ctrlLayer.guideLayer = true;
        ctrlLayer.label = 2;

        var ctrlEffects = ctrlLayer.property("ADBE Effect Parade");
        var ctrlPointCtrl = ctrlEffects.addProperty("ADBE Point Control");
        ctrlPointCtrl.property("ADBE Point Control-0001").expression = 
        'const src = thisComp.layer("'+firstLayer.name+'");\r'+
        'src.toComp(src.transform.anchorPoint)'
        var ctrlPosRef =  ctrlPointCtrl.property("ADBE Point Control-0001").value;

        if(ctrlPos.dimensionsSeparated){
            ctrlLayerTrans.property("ADBE Position_0").setValue(ctrlPosRef[0]);
            ctrlLayerTrans.property("ADBE Position_1").setValue(ctrlPosRef[1]);
        } else{
            ctrlPos.setValue([ctrlPosRef[0],ctrlPosRef[1]])
        }


        while(ctrlEffects.numProperties > 0){
            ctrlEffects.property(1).remove()
        }


        var presetName = "km-griddy-rig";

        if(expressionRig){
            pseudoEffect(comp,ctrlLayer, presetName);
        }


        return ctrlLayer

    }

    function sortGrid(cols,rows,spacingX,spacingY,expressionRig){
        var comp = getActiveComp();
        if(!comp) return null;
        var selLayers = getSelLayers();
        if(!selLayers) return null;


        var controlLayer = createCtrlLayer(expressionRig);
        if(!controlLayer) return null;

        if(expressionRig) {
            var controlGriddy = controlLayer.property("ADBE Effect Parade").property(1);
            var controlColumns = controlGriddy.property("Columns");
            controlColumns.setValue(cols);
            var controlRows = controlGriddy.property("Rows");
            controlRows.setValue(rows);
            var controlSpacingX = controlGriddy.property("Spacing - X (px)");
            controlSpacingX.setValue(spacingX);
            var controlSpacingY = controlGriddy.property("Spacing - Y (px)");
            controlSpacingY.setValue(spacingY);
    
            var presetName = "km-griddy-rig";
        }

        var found = false;
        for(var i = 0; i<selLayers.length; i++){
            var layer = selLayers[i];
            var startName = selLayers[0].name.split("-")[0];
       
            var columns = i%cols;
            var row = Math.floor(i/rows);
            if(!(layer.name === controlLayer.name)){
                found = true;
                layer.parent = controlLayer;
                var layerTrans = layer.property("ADBE Transform Group");
                var layerPos = layerTrans.property("ADBE Position");
                var layerScale = layerTrans.property("ADBE Scale");
                var layerBounds = layer.sourceRectAtTime(0,false);
                var layerWidth = layerBounds.width * layerScale.value[0]/100;
                var layerHeight = layerBounds.height * layerScale.value[1]/100;
                
                var xVal = (columns * (layerWidth + spacingX));
                var yVal = (row * (layerHeight + spacingY));
                var xPosSep = layerTrans.property("ADBE Position_0");
                var yPosSep = layerTrans.property("ADBE Position_1");
                if(expressionRig){
                    layer.name =  startName + "-" + (i+1);
                    if(layerPos.dimensionsSeparated){
                        xPosSep.expression = 
                        'const id = parseInt(name.split("-")[1]-1);\r'+
                        'const ctrlLayer = thisComp.layer("Grid Controls");\r'+
                        'const colControls = thisComp.layer("Grid Controls").effect("'+presetName+'")("Columns");\r'+
                        'const rowControls = thisComp.layer("Grid Controls").effect("'+presetName+'")("Rows");\r'+
                        'const {width} = sourceRectAtTime();\r'+
                        'const widthTotal = width * thisLayer.transform.scale[0]/100;\r'+
                        'const spacingX = thisComp.layer("Grid Controls").effect("'+presetName+'")("Spacing - X (px)");\r'+
                        'const sortingPriority = thisComp.layer("Grid Controls").effect("'+presetName+'")("Sorting Priority").value;\r'+
                        'let cols;\r'+
                        '\r'+
                        'if(sortingPriority == 1){\r'+
                        '    cols = Math.floor(id%colControls);\r'+
                        '} else{\r'+
                        '    cols = Math.floor(id / rowControls);\r'+
                        '}\r'+
                        '\r'+
                        '\r'+
                        'const x = cols * (widthTotal + spacingX);\r'+
                        'x';
                        
                        yPosSep.expression = 
                        'const id = parseInt(name.split("-")[1]-1);\r'+
                        'const ctrlLayer = thisComp.layer("Grid Controls");\r'+
                        'const colControls = thisComp.layer("Grid Controls").effect("'+presetName+'")("Columns");\r'+
                        'const rowControls = thisComp.layer("Grid Controls").effect("'+presetName+'")("Rows");\r'+
                        'const {height} = sourceRectAtTime();\r'+
                        'const heightTotal = height * thisLayer.transform.scale[1]/100;\r'+
                        'const spacingY = thisComp.layer("Grid Controls").effect("'+presetName+'")("Spacing - Y (px)");\r'+
                        'const sortingPriority = thisComp.layer("Grid Controls").effect("'+presetName+'")("Sorting Priority").value;\r'+
                        'let rows;\r'+
                        '\r'+
                        'if(sortingPriority == 1){\r'+
                        '    rows = Math.floor(id/colControls);\r'+
                        '} else{\r'+
                        '    rows = id % rowControls;\r'+
                       ' }\r'+
                        '\r'+
                        'const y = rows * (heightTotal + spacingY);\r'+
                        'y';
                    } else{
                        layerPos.expression =
                        'const id = parseInt(name.split("-")[1]-1);\r'+
                        'const ctrlLayer = thisComp.layer("Grid Controls");\r'+
                        'const colControls = thisComp.layer("Grid Controls").effect("'+presetName+'")("Columns");\r'+
                        'const rowControls = thisComp.layer("Grid Controls").effect("'+presetName+'")("Rows");\r'+
                        'const {width,height} = sourceRectAtTime();\r'+
                        'const widthTotal = width * thisLayer.transform.scale[0]/100;\r'+
                        'const heightTotal = height * thisLayer.transform.scale[1]/100;\r'+
                        'const spacingX = thisComp.layer("Grid Controls").effect("'+presetName+'")("Spacing - X (px)");\r'+
                        'const spacingY = thisComp.layer("Grid Controls").effect("'+presetName+'")("Spacing - Y (px)");\r'+
                        'const sortingPriority = thisComp.layer("Grid Controls").effect("'+presetName+'")("Sorting Priority").value;\r'+
                        'let cols;\r'+
                        'let rows;\r'+
                        '\r'+
                        'if(sortingPriority == 1){\r'+
                        '    cols = Math.floor(id%colControls);\r'+
                        '   rows = Math.floor(id/colControls);\r'+
                        '} else{\r'+
                        '    cols = Math.floor(id / rowControls);\r'+
                          '  rows = id % rowControls;\r'+
                        '}\r'+
                       '\r'+     
                     'const x = cols * (widthTotal + spacingX);\r'+
                     'const y = rows * (heightTotal + spacingY);\r'+
                        '[x, y]';

                    }
                } else {
                    if(layerPos.dimensionsSeparated){
                        xPosSep.setValue(xVal);
                        yPosSep.setValue(yVal);
                    } else{
                        layerPos.setValue([xVal,yVal]);
                    }
                }
            }
        }

        if(!found){
            alert("Whoops!\rYou only selected your control layer. Don't do that.")
        }

        return 

    }
    

    win.onResizing = win.onResize = function (){
        this.layout.resize();
    };

    if(win instanceof Window){
        win.center();
        win.show();
    } else {
        win.layout.layout(true);
        win.layout.resize();
    }


    }

}(this))
