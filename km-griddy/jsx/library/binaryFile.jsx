/* function getBinaryFile(filePath,rawData){
  var file = new File(filePath);
  if(!file.exists){
    createFile(file,rawData);
  }
  return file;


  function createFile(file, rawData){
    makeSureFolderExists(file.parent);
    file.encoding = "BINARY";
    file.open( "w" );
    file.write( rawData );
    file.close();
    if(file.error != "") throw new Error("could not write file: "+file.error)
  };


  function makeSureFolderExists(folder){
    if(!folder.exists) {
      folder.create();
    }
  };
};

*/
var path = "~/Desktop/km-griddy-rig.ffx";
// var data = "~/Desktop/km-griddy-rig.txt"; 


var f = File(path);
f.encoding = 'BINARY';
f.open('e');
 
var binary;
binary = f.read().toSource();
 
var myFile = new File("~/Desktop/binaryOutput.txt");
        myFile.open("w");
        myFile.encoding = "BINARY";
        myFile.write(binary);
        myFile.close();
f.close();