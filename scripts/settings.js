
// EI Page Settings
$(function(){
    var FRONT_SETTINGS_KEY  = "0AkOIIIT7wBStdEREeTdaSVhiOE93ekZ1RHViUjJvQmc";
    var MENU_SETTINGS_KEY   = "0AkOIIIT7wBStdFlNUEZRU3ZYc1JDV1dlbEZ3cGhENUE"; 
    var INVENTORY_KEY       = "0AkOIIIT7wBStdFZJM1F1NTZ6U01jdG1DRFRCT0NtQVE";
    
    var GSS_FRONTPAGE = "https://spreadsheets.google.com/feeds/list/"+
                FRONT_SETTINGS_KEY + "/od6/public/values?alt=json";
    var GSS_ABOUTUS = "https://spreadsheets.google.com/feeds/list/"+
                FRONT_SETTINGS_KEY + "/od7/public/values?alt=json";
    
    var GSS_MAINMENU = "https://spreadsheets.google.com/feeds/list/"+
                MENU_SETTINGS_KEY + "/od6/public/values?alt=json";
    var GSS_SETTINGS = "https://spreadsheets.google.com/feeds/list/"+
                MENU_SETTINGS_KEY + "/od7/public/values?alt=json";
    
    var GSS_INVENTORY = "https://spreadsheets.google.com/feeds/list/"+
                INVENTORY_KEY + "/od6/public/values?alt=json";
    var GSS_REVIEWS = "https://spreadsheets.google.com/feeds/list/"+
                INVENTORY_KEY + "/od7/public/values?alt=json";
    
    getGSS(GSS_FRONTPAGE,frontPageHandler);
    getGSS(GSS_ABOUTUS,aboutUsHandler);
    
    getGSS(GSS_MAINMENU,menuHandler);
    getGSS(GSS_SETTINGS,settingsHandler);
    
    getGSS(GSS_INVENTORY,inventoryHandler);
    getGSS(GSS_REVIEWS,reviewsHandler);
    
    function frontPageHandler(data){
        for(var i=0; i < data.length; i++){
            $(document).trigger('ei_frontPageReady', data[i]);    
        }
        console.log('Front Page GSS Retrieved!');
    }
    function aboutUsHandler(data){
        for(var i=0; i < data.length; i++){
            $(document).trigger('ei_aboutUsReady', data[i]);    
        }
        console.log('About Us GSS Retrieved!');
    }
    
    function menuHandler(data){
        for(var i=0; i < data.length; i++){
            $(document).trigger('ei_menuReady', data[i]);    
        }
        console.log('Menu GSS Retrieved!');
    }
    function settingsHandler(data){
        for(var i=0; i < data.length; i++){
            $(document).trigger('ei_settingsReady', data[i]);    
        }
        console.log('Settings GSS Retrieved!');
    }
    
    function inventoryHandler(data){
        for(var i=0; i < data.length; i++){
            $(document).trigger('ei_inventoryReady', data[i]);    
        }
        console.log('Inventory GSS Retrieved!');
    }
    function reviewsHandler(data){
        for(var i=0; i < data.length; i++){
            $(document).trigger('ei_reviewsReady', data[i]);    
        }
        console.log('Reviews GSS Retrieved!');
    }
});