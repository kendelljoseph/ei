
/*  Eilers Innovations
*   Eventually I'll comment this thing...
*/

jQuery(function($){
    /* 
    *   Here we create all our page elments, most are divs, this should be
    *   combined into one thing that creates all these things automatically.
    */
    var body =  $('body');
    var title = $('<div />')
                .attr('id','ei_title')
                .html('Eilers Innovations');
    var menu = $('<div />')
                .attr('id', 'ei_menu');
    var videoBrowser = $('<div />')
                .attr('id', 'ei_videoBrowser');
    var socialMedia = $('<div />')
                .attr('id', 'ei_socialMedia');
    var facebookImage = $('<img />')
                .attr('id', 'ei_fbImage')
                .attr("src", 'images/facebook.png')
                .click(function(){
                    document.location.href = 'http://www.facebook.com/eilersinnovations';
                });
    var twitterImage = $('<img />')
                .attr('id', 'ei_twtrImage')
                .attr("src", 'images/twitter.png')
                .click(function(){
                    document.location.href = 'http://twitter.com/eidocj';
                });
    var image = $('<img />')
                .attr('id', 'ei_ytImage');
    var description = $('<div />')
                .attr('id', 'ei_ytDescription');
    var tableImage = $('<img />')
                .attr('src', 'images/table.png')
                .attr('id', 'ei_tableImage');
    var nextVideo = $('<div />')
                .attr('id', 'ei_nextVideo');
    var aboutUsBox = $('<div />')
                .attr('id', 'ei_aboutUs');
    var twitterBox = $('<div />')
                .attr('id', 'ei_twitter')
                .tweet({
          join_text: "auto",
          username: "eidocj",
          avatar_size: 48,
          count: 1,
          auto_join_text_default: " ",
          auto_join_text_ed: " ",
          auto_join_text_ing: " ",
          auto_join_text_reply: " ",
          auto_join_text_url: " ",
          loading_text: "loading tweets..."
        });
    
    var inventoryReady = false;
    var inventory   = [];
    var aboutUs     = [];
    var greetings   = [];
    
    // READY HANDLERS
    // Async build of the front page options
    $(document).on('ei_frontPageReady', function(e, id, type, description){
        var greeting = {
            id: id,
            type: type,
            description: description
        };
        greetings.push(greeting);
    });
    
    // Async build of about us page
    $(document).on('ei_aboutUsReady', function(e, name, bio, image, weight){
        var employee = {
            name: name,
            bio: bio,
            image: image,
            weight: weight
        };
        aboutUs.push(employee);
    });
    
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
    
    // Async build of inventory
    $(document).on('ei_inventoryReady', function(e, id, name, type, description, videoId, image){
        inventoryReady = true;
        var row = {
            id: id,
            name: name,
            type: type,
            description: description,
            videoId: videoId,
            image: image,
        };
        inventory.push(row); // Hold inventory values as row objects
    });
    
    // SHOW INVENTORY VIDEO HANDLER
    // Show the inventory of items (also divides by type)
    $(document).on('ei_showInventory',function(e, id){
        var pedalMods   = [],   // Pedal Mods
            ampMods     = [],   // Amp Mods
            onTable     = [];
        if(inventoryReady){
            for(var i=0; i < inventory.length; i++){
                switch(inventory[i].type){
                    case 'pedalMods':
                        pedalMods.push(inventory[i]);
                        break;
                    case 'ampMods':
                        ampMods.push(inventory[i]);
                        break;
                    case 'onTable':
                        onTable.push(inventory[i]);
                        break;
                }
            }
        }
        
        function showNextVideo(){
            nextVideo.html('');
            for(var j=0; j < inventory.length; j++){
                if(inventory[j].type == id){
                    var newImage = $('<img />').attr('src', ("images/labels/" + inventory[j].image))
                        .addClass('ei_inventoryImage')
                        .attr("videoNumber", j)
                        // Add an event listner? Not sure what's going wrong here.
                        .click(function(){  // Need to get this working
                            nextVideo.html('');
                            var videoNumber = $(this).attr('videoNumber');
                            var options = {
                                caller: $('#ei_' + id),
                                videoId: inventory[videoNumber].videoId,
                                image: 'images/labels/' + inventory[videoNumber].image,
                                description: inventory[videoNumber].description
                            };
                            eiVideoPlayer(options);
                            
                            showNextVideo();
                        });
                    nextVideo.append(newImage);
                }
            }
        }
        
        showNextVideo();
        
        switch(id) {
            case 'pedalMods':
                var options = {
                    caller: $('#ei_pedalMods'),
                    videoId: pedalMods[0].videoId,
                    image: 'images/labels/' + pedalMods[0].image,
                    description: pedalMods[0].description
                };
                eiVideoPlayer(options);
                break;
            case 'ampMods':
                var options = {
                    caller: $('#ei_ampMods'),
                    videoId: ampMods[0].videoId,
                    image: 'images/labels/' + ampMods[0].image,
                    description: ampMods[0].description
                };
                eiVideoPlayer(options);
                break;
            case 'onTable':
                var options = {
                    caller: $('#ei_onTable'),
                    videoId: onTable[0].videoId,
                    image: 'images/labels/' + onTable[0].image,
                    description: onTable[0].description
                };
                eiVideoPlayer(options);
                break;    
        }
    });
    
    // POSITION HANDLER
    $(document).on('ei_pageMode', function(e, id){
        var videoImage = $('#ei_ytImage');
        var videoDescr = $('#ei_ytDescription');
        var videoBrowser = $('#ei_videoBrowser');
        
        $('#ei_ytVideo').remove();
        videoBrowser.append($('<div />').attr('id','ei_ytVideo'));  // Refresh the YTVideo Box
        
        function resetSocialBox(){
            $('#ei_twitter').css({
                top: 'auto',
                bottom:'0px',
                position: 'fixed'
            });
            $('#facebook').css({
                top: 'auto',
                bottom:'80px',
                position: 'fixed'
            });
        }
        
        function bigFacebook(){
            $('#ei_twitter').fadeOut();
            
            $('#facebook').fadeOut();
            $('#facebook-wall').fadeIn();
            
            $('#ei_socialMedia').css({
                right: '10px',
                left: 'auto'
            });
            
        }
        
        function smallFacebook(){
            $('#ei_twitter').fadeIn();
            
            $('#facebook-wall').fadeOut();
            $('#facebook').fadeIn();
            
            $('#ei_socialMedia').css({
                right: 'auto',
                left: '10px'
            });
        }
        
        function hideAll(){
            videoBrowser.hide();     // Hide the video Browser
            videoImage.fadeOut();       // Hide the video image
            videoDescr.fadeOut();     // Hide the video description
            tableImage.fadeOut();
            aboutUsBox.fadeOut();
            nextVideo.hide();
            resetSocialBox();
            smallFacebook();
            
        }
        function hideVideo(){
            videoBrowser.hide();
            videoImage.fadeOut();
            videoDescr.fadeOut();
            aboutUsBox.fadeOut();
            nextVideo.hide();
            resetSocialBox();
            smallFacebook();
        }
        
        function showJustVideo(){
            videoBrowser.fadeIn();    // Show the video Browser
            videoImage.fadeIn();    
            videoDescr.fadeIn();
            nextVideo.fadeIn();
            tableImage.fadeOut();
            aboutUsBox.fadeOut();
        }
        function showVideo(){
            videoBrowser.fadeIn();    // Show the video Browser
            videoImage.fadeIn();    
            videoDescr.fadeIn();
            tableImage.fadeIn();
            aboutUsBox.fadeOut();
            nextVideo.fadeIn();
        }
        
        function showAboutUs(){
            $('#ei_twitter').css({
                top:'40px',
                position: 'absolute'
            });
            $('#facebook').css({
                top:'100px',
                position: 'absolute'
            });
            
            aboutUsBox.html('');
            aboutUsBox.fadeIn();
            
            for(var i=0; i < aboutUs.length; i++){
                var row = aboutUs[i];
                var abutUsName = $('<div />')
                    .addClass('aboutUs')
                    .addClass('ei_aboutUsName')
                    .attr('id', 'ei_aboutUsName_' + i)
                    .html(row.name);
                var aboutUsBio  = $('<div />')
                    .addClass('aboutUs')
                    .addClass('ei_aboutUsBio')
                    .attr('id', 'ei_aboutUsBio_' + i)
                    .html(row.bio);
                var aboutUsImage = $('<img />')
                    .addClass('aboutUs')
                    .addClass('ei_aboutUsImage')
                    .attr('id', 'ei_aboutUsImage_' + i)
                    .attr("src", row.image);
                    
                aboutUsBox.append([aboutUsBio, aboutUsImage, abutUsName]);
            }
        }
        
        switch(id) {
            case 'home':
                title.html('Eilers Innovations')
                    .animate({
                    top: "100px",
                    left: (body.width()/2 - title.width()/2)
                });
                menu.animate({
                    left: (body.width()/2)
                });
                hideAll();  // Hide Everything Else
                bigFacebook();
                break;
            case 'about':
                title.html($('#ei_about').html())
                    .animate({
                    top: "100px",
                    left: (body.width()/2 - title.width()/2),
                    height: "1000px"
                });
                menu.animate({
                    left: (body.width() - (menu.width() + 20))
                });
                hideAll();       // Hide Everything else
                showAboutUs();
                $(document).trigger('ei_showInventory', id);
                break;
            case 'pedalMods':
                title.animate({
                    top: 0,
                    left: 10
                });
                menu.animate({
                    left: 10
                });
                hideAll();      // Hide Everything Else
                showJustVideo();
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
                hideAll();
                showJustVideo();
                $(document).trigger('ei_showInventory', id);
                break;
            case 'onTable':
                title.animate({
                    top: 0,
                    left: 10
                });
                menu.animate({
                    left: 10
                });
                hideVideo();
                showVideo();
                $(document).trigger('ei_showInventory', id);
                break;
            default:
                title.html('Eilers Innovations')
                    .animate({
                    top: "100px",
                    left: (body.width()/2 - title.width()/2)
                });
                menu.animate({
                    left: (body.width()/2)
                });
                hideAll();
                break;
       }
    });
    
    
    // BULLSHIT
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
        
        twitterImage.rotate({
            duration: 9000,
            angle: 0,
            animateTo: 360
        });
        facebookImage.rotate({
            duration: 10000,
            angle: 0,
            animateTo: -360
        });  
        
        setInterval(function(){
            twitterImage.rotate({
                duration: 9000,
                angle: 0,
                animateTo: 360
            });
        },7000);
        
        setInterval(function(){
            facebookImage.rotate({
                duration: 10000,
                angle: 0,
                animateTo: -360
            });   
        },8000);
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
        .append(tableImage)
        .append(nextVideo)
        .append(aboutUsBox)
        .append(twitterBox)
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
});