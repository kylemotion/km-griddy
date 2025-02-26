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
    var helpButton = executePanel.add("button", undefined, "Help");
    var runButton = executePanel.add("button", undefined, "Run Griddy!");
    
    //@include "./library/helpWindow.jsx"

    helpButton.addEventListener("mousedown",optionInfo_Click);

    runButton.onClick = function(){
    try {
        app.beginUndoGroup("What script does");



      } catch(error) {
        alert("An error occured on line: " + error.line + "\nError message: " + error.message);
      } finally {
        // this always runs no matter what
        app.endUndoGroup()
      }
      
    }

    

/* 
        var proj = app.project;
        var activeComp = proj.activeItem;

        var selectedLayers = activeComp.selectedLayers;
        var startVal = Math.floor(selectedLayers.length/2);

        var columnAmt = parseInt(prompt("Insert amount of columns",startVal.toString()));
        var startX =  0; 
        var startY =  0; 
        var spacing = 50;

        function sortItemsIntoGrid(columns){

            for(var i = 0; i < selectedLayers.length; i++){
                var cols = i % columns;
                var row = Math.floor(i/columns);
                var layer = selectedLayers[i];
                var layerTrans = layer.property("ADBE Transform Group");
                var layerPos = layerTrans.property("ADBE Position");
                var layerScale = layerTrans.property("ADBE Scale");
                var layerBounds = layer.sourceRectAtTime(activeComp.time,false);
                var layerWidth = layerBounds.width * layerScale.value[0]/100;
                var layerHeight = layerBounds.height * layerScale.value[1]/100;
                var xVal = startX + layerWidth/2 + (cols * (layerWidth + spacing));
                var yVal = startY + layerHeight/2 + (row *(layerHeight + spacing));
                if(layerPos.dimensionsSeparated){
                    layerTrans.property("ADBE Position_0").setValue(xVal);
                    layerTrans.property("ADBE Position_1").setValue(yVal);
                } else{
                    layerPos.setValue([xVal,yVal]);
                }
            }

            return
        } */
    
    

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
