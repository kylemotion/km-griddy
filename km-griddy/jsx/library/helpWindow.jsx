// bring in OS library for cross OS compatibility
//@include "../library/OS.jsx"

var scriptName = "KM-GRIDDY";

var settingsWindow = new Window("palette", scriptName + " HELP", undefined, {closeButton: true, resizeable: true});
settingsWindow.orientation = 'column';
settingsWindow.alignChildren = ["fill", "fill"];

var editTextGroup = settingsWindow.add("group", undefined, "Middle Info Group");
editTextGroup.orientation = 'column';
editTextGroup.alignChildren = ["left", "top"];
var helpMessage = 
'ABOUT '+scriptName+'\r\r\
This script will sort your selected layers into a grid pattern based on the user input. Included are additional options for creating an expression rig as well.\r\r\
This script can speed up the process and flexibility of placing similarly sized elements into a grid.\
------------------------\
HOW TO USE '+scriptName+':\r\r\
FEATURE #1: GRID SORT\r\
The base functionality for this script provides text fields for the user to customize their grid pattern. Input your column, row, and spacing information and the resulting grid will mirror that input.\r\r\
-----------\r\
FEATURE #2: EXPRESSION GRID RIG\r\
This feature will create an expression rig based on the user input information as well as the amount of selected layers. A custom pseudo effect is placed on the Grid Controls layer that will control the sorting priorities, grid pattern, and spacing.\r\r\
Note: This feature will rename all of your layers based on the first layer in your selection order. The naming schema will be displayed like this: "Layer Name-1" and iterate from there.\r\
If you duplicate layers in your timeline after you create the rig then they will follow the grid pattern that is establised on the Grid Control layer\'s pseudo effect.\r\
-----------\r\
FEATURE #3:\r\
Click "Run Griddy": Your selected layers in your composition will be sorted into a grid pattern based on user input or an expression rig will be created if the "Create Expression Rig" checkbox is checked.\r\r\
'
var textBox = editTextGroup.add("edittext", undefined, helpMessage, {multiline: true, readonly: true ,scrollable: true});
textBox.justify = "left";
textBox.alignment = ["fill","fill"];
textBox.preferredSize = [600,200];

var creatorInfo = 
''+scriptName+' v1.0\r\
Script created by Kyle Harter\r\
www.kylemotion.com'


var bottomGroup = settingsWindow.add("group", undefined, "bottomGroup");
bottomGroup.orientation = "row";
bottomGroup.alignChildren = ["fill", "center"];
var creatorGroup = bottomGroup.add("group", undefined, "Creator Info Group")
var creatorStatic = creatorGroup.add("statictext", undefined, creatorInfo, {multiline: true});
var closeGroup = bottomGroup.add("group", undefined, "Close Group");
closeGroup.alignChildren = ["right", "center"];
var closeButton = closeGroup.add("button", undefined, "Close");
closeButton.preferredSize = [-1, 30];


creatorStatic.addEventListener("mousedown", creatorClick);

closeButton.addEventListener("mousedown", function(){settingsWindow.close()}) 


function creatorClick(){
    var userOS = OS
    var launchCode = userOS.openUrl("https://www.kylemotion.com/")

    return userOS
}


function optionInfo_Click() {
    settingsWindow.hide();
    settingsWindow.show();
};


