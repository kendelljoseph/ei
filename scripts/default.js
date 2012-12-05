
/*  Eilers Innovations
*   Eventually I'll comment this thing...
*/

$(function(){
    
    /* 
    *   Here we create all our page elments, most are divs, this should be
    *   combined into one thing that creates all these things automatically.
    */
    var body =  $('body');                  // Document Body
    var title = $('<div />')                // Title
                .attr('id','ei_title')
                .html('Eilers Innovations');
    var menu = $('<div />')                 // Main Menu
                .attr('id', 'ei_menu');
    var videoBrowser = $('<div />')
                .attr('id', 'ei_videoBrowser');
                
    var inventoryReady = false;
    var inventory = [];
    
    // Async build of the main menu options
    $(document).on('ei_menuReady', function(e, id, html, weight){
        var eleId = "ei_" + id;
        var menuItem = $('<div />')
                    .attr('id', eleId)
                    .addClass('ei_menuItem')
                    .html(html)
                    .click(function(){
                        $(document).trigger('ei_pageMode', id);
                    });
        
        $('#ei_menu').append(menuItem); // Append to parent
    });
    
    $(document).on('ei_inventoryReady', function(e, id, name, description, videoId, image, weight){
        inventoryReady = true;
        var row = {
            id: id,
            name: name,
            description: description,
            videoId: videoId,
            image: image
        };
        inventory.push(row); // Hold inventory values as row objects
    });
    
    $(document).on('ei_showInventory',function(e, id){
        console.log(inventory);
        switch(id) {
            case 'pedalMods':
                break;
            case 'ampMods':
                break;
        }
    });
    
    $(document).on('ei_pageMode', function(e, id){
        var videoBrowser = $('#ei_videoBrowser');
        $('#ei_ytVideo').remove();
        videoBrowser.append($('<div />').attr('id','ei_ytVideo'));  // Refresh the YTVideo Box
        
       switch(id) {
            case 'home':
                title.animate({
                    top: "100px",
                    left: (body.width()/2 - title.width()/2)
                });
                menu.animate({
                    left: (body.width()/2)
                });
                videoBrowser.fadeOut();    // Hide the video Browser
                break;
            case 'pedalMods':
                title.animate({
                    top: 0,
                    left: 10
                });
                menu.animate({
                    left: 10
                });
                videoBrowser.fadeIn();    // Show the video Browser
                $(document).trigger('ei_showInventory', id);
                break;
            case 'ampMods':
                title.animate({
                    top: 0,
                    left: 10
                });
                menu.animate({
                    left: 10
                });
                videoBrowser.fadeIn();    // Show the video Browser
                $(document).trigger('ei_showInventory');
                break;
            default:
                break;
       }
    });
    
    // Runs stuff
    function menuHandler(){
        var descriptionText = "Boss DD-3 EI Mod currrently on the table by Eilers Innovations";
        var options = {
            caller: $(this),
            videoId: '6JBvclCDynk',
            image: 'images/labels/bossdd3.png',
            description: descriptionText
        };
        eiVideoPlayer(options);
    }
    
    var onTheTable = $('<div />')
                .attr('id', 'ei_onTheTale')
                .attr('class','ei_menuItem')
                .html('On the Table');
    var pedalMods = $('<div />')
                .attr('id', 'ei_pedalMods')
                .attr('class','ei_menuItem')
                .html('Pedal Modifications');
    var ampMods = $('<div />')
                .attr('id', 'ei_ampMods')
                .attr('class','ei_menuItem')
                .html('Amp Modifications');
    var socialMedia = $('<div />')
                .attr('id', 'ei_socialMedia');
    var facebookImage = $('<img />')
                .attr('id', 'ei_fbImage')
                .attr("src", 'images/facebook.png');
    var twitterImage = $('<img />')
                .attr('id', 'ei_twtrImage')
                .attr("src", 'images/twitter.png');
                
    var image = $('<img />')
                .attr('id', 'ei_ytImage');
    var description = $('<div />')
                .attr('id', 'ei_ytDescription');
    
    /*
    *   Another Idea (bottom -> top) that could be combined, all seem to have
    *   to do with the position of elements. The final idea could also be
    *   useful to determine visibility as well.
    */
    function centerElement(ele){
        ele.css({
           left: (body.width()/2 - ele.width()/2)
        });
    }
    
    /* 
    *   Here we are again (if reading from bottom to top) is another idea that
    *   could be combined into one idea with the two below.
    */
    function arrangeElements(){
        centerElement(title);
        centerElement(menu);
        setInterval(function(){
            twitterImage.rotate({
                duration: 8000,
                angle: 0,
                animateTo: 360
            });
            facebookImage.rotate({
                duration: 10000,
                angle: 0,
                animateTo: -360
            });   
        },15000);
        
    }
    
    /*  
    *   This needs to be changed to be pulling from a preset list of default
    *   positions, and reset all page elements to their "first" position.
    */
    function reset(ele, defaultPos){
        ele.animate(defaultPos);
        if(ele.css('transform') !== "matrix(1, 0, 0, 1, 0, 0)"){
            image.rotate({angle: -30, animateTo: 0});
            description.rotate({angle:10, animateTo: 0});
        }
    }
    
    /* The alarming redundancy here means I need to make a constructor or a loop.. or both */
    socialMedia.append(facebookImage)   // I put the facebook image in the social media box
        .append(twitterImage);          // I put the twitter image in the social media box
    body.append(title)          // I put the title into the body of the page
        .append(menu)           // I put the menu box into the body of the page
        .append(videoBrowser)
        .append(image)          // I put the image into the body of the page
        .append(description)    // I put the description into the body of the page
        .append(socialMedia);   // I put the social Media box into the body of the page
    
    arrangeElements();  // These types of calls should be run based on a load event
    
    
    /* 
    *   This is the video player, and kind of the heart of the page. This is
    *   Where the youtube API is used.
    */
    function eiVideoPlayer(options){
        $('#ei_ytVideo').remove();
        body.append($('<div />').attr('id','ei_ytVideo'));
        
        title.html(options.caller.html());  // Title becomes HTML of the element that was clicked.
        description.html(options.description);
        image.attr('src', options.image);
        
        $('#ei_ytVideo').css('display','block');
        image.css('display','block');
        
        description.css('display','block');
        reset(image,{
            top: -30,
            right: 320
        });
        reset(description,{
            top: 250,
            right: 50
        });
        
        function onPlayerReady(e){
            // Eventually this will matter
        }
        
        function onPlayerStateChange(e){
            var state = e.data;
            
            if(state == 1 || state == 3){
                image.animate({
                    top: -40,
                    right: 420
                });
                description.animate({
                    top: 400,
                });
                image.rotate({angle:0, animateTo: -30});
                description.rotate({angle:0, animateTo: 10});
            }
            else if(state == 2){
                reset(image,{
                    top: -30,
                    right: 320
                });
                reset(description,{
                    top: 250,
                    right: 50
                });
                image.rotate({angle: -30, animateTo: 0});
                description.rotate({angle:10, animateTo: 0});
            }
        }
        
        var player = new YT.Player('ei_ytVideo', {
            videoId: options.videoId,
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
        });
    }

    onTheTable.click(function(){
        var descriptionText = "Boss DD-3 EI Mod currrently on the table by Eilers Innovations";
        var options = {
            caller: $(this),
            videoId: '6JBvclCDynk',
            image: 'images/labels/bossdd3.png',
            description: descriptionText
        };
        eiVideoPlayer(options);
    });
    
    pedalMods.click(function(){
        var descriptionText = "The \"Blue Jay\" is an Eilers Innovations original I made last year for John Doe(?) of Sweet Band(?) in 2012.";
        var options = {
            caller: $(this),
            videoId: 'Lf7frCzDBS8',
            image: 'images/labels/bluejay.png',
            description: descriptionText
        };
        eiVideoPlayer(options);
    });
    
    ampMods.click(function(){
        var descriptionText = 'This is a Carvin MTS3200 Mod where I changed a thing(?) and anotherThing(?) by Eilers Innovations.';
        var options = {
            caller: $(this),
            videoId: 'HiHSNaqpfUs',
            image: 'images/labels/carvinMTS3200.png',
            description: descriptionText
        };
        eiVideoPlayer(options);
    });
});