var fs = require('fs') ,
    path = require("path");
    
var isWindows = process.platform === 'win32';

function listenToChange (file ){
    file = path.resolve(file)
   function onChg(prev,now) {
       if (prev.mtime == now.mtime  ) return;
       delete require.cache[file] ;

       } 

   if (isWindows)
        fs.watch(file ,{ persistent: true, interval: 10 } , onChg);
    else
        fs.watchFile(file ,{ persistent: true, interval: 10 } , onChg);
    }
function mapDir (dir ,ext) {

   fs.readdir (dir , function(err , files){
       if (err) return;
       if (ext && !files.indexOf(ext) ) return;
       files.forEach(function(file){
           file = dir + '/' + file;
           fs.lstat ( file , function (err, stats) {
                if (err) return;
                if (stats.isDirectory() ) {
                    mapDir(file , ext);
                  }else if (stats.isFile() ){
                    listenToChange(file);

                        }
           
           } );
       });

       }); 
    }   

 /*
 'somedir' | ['somedir' , 'another dir']
 */  
exports.takeCare = function( dir , ext){
    if ('string' == typeof dir) dir = [dir];

    dir.forEach(function(dirItem){
       mapDir (dirItem , ext);
        })
    }

