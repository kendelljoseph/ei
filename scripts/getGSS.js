
/*  
*   Get Google Spreadsheet (GSS) Script
*
*   This will retrieve a google spreadsheet by a key you give it,
*   and return an brand spankin' new object containing the data!
*/

function getGSS(GSS_URL, callback) {
    /*
    *   Accepts 2(1) arguments
    *   Argument 1: URL of the GSS
    *   Argument 2(Optional): Callback function to run once the data is recieved
    */
    
    var doWhenComplete = function(data, res){
        var table;
        function success(){ // Things I will do if the response is successful.
        }
        function fail(){    // Things I will do if the response is NOT successful.
        }
        if (res === "success") {                    // If I recieve a successful response, I RUN success.
            table= CleanedTable($.parseJSON(data.responseText));    // I clean up the table formatting first
            success();
        }  
        if (res != "success") { table=[]; fail(); } // If I recieve an unsuccessful response, I RUN fail.
        
        if (callback instanceof Function) {     // If the callback is a function, I will proceed.
            callback(table);                    // I RUN passing the table as an argument.
        }
    };
    
    var ajaxOptions = {         // These are my jQuery Ajax Options.
        url: GSS_URL,           // I read the GSS URL.
        complete:doWhenComplete // I RUN when the Ajax request is complete.
    };
    
    $.ajax(ajaxOptions);    // I RUN the ajax request

    // Cleans the table returned from the AJAX request
    function CleanedTable(table) {
        var cleanTable = [];                    // I make a new array to store the new table.
        var tableObjects = table.feed.entry;    // I get the original table that was returned from the Ajax request
        
        if (!tableObjects) {    
            return cleanTable;  // If I can't find the table in the GSS I RETURN an empty table.
        }
        
        for(var i=0; i < tableObjects.length; i++){ // I LOOP through the objects in the table
            var row = findRecords(tableObjects[i]); // I find only valid records in the objects
            cleanTable.push(row); // Populates the clean array with an array for each row
        }
        
        function findRecords(obj) {
            var temporaryList = []; // Temporary array for storing each found name
            // Loops through the object 
            for (var name in obj) {
                // Objects with "gsx$" are valid
                if (name.indexOf("gsx$") === 0) {
                    temporaryList.push(obj[name].$t); // Valid objects are added to the temporary array
                }
            }
            return temporaryList; // Returns the populated array 
        }
        return cleanTable;
    }
}