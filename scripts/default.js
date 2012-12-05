
/*  Eilers Innovations
*   Eventually I'll comment this thing...
*/

$(function(){
    var body =  $('body');
    var title = $('<div />')
                .attr('id','ei_title')
                .html('Eilers Innovations');
    var menu = $('<div />')
                .attr('id', 'ei_menu');
    var home = $('<div />')
                .attr('id', 'ei_home')
                .attr('class','ei_menuItem')
                .html('Home');
    var about = $('<div />')
                .attr('id', 'ei_about')
                .attr('class','ei_menuItem')
                .html('About');
    var contact = $('<div />')
                .attr('id', 'ei_contact')
                .attr('class','ei_menuItem')
                .html('Contact');
    var reviews = $('<div />')
                .attr('id', 'ei_reviews')
                .attr('class','ei_menuItem')
                .html('Reviews');
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
    
    function centerElement(ele){
        ele.css({
           left: (body.width()/2 - ele.width()/2)
        });
    }
    
    function arrangeElements(){
        centerElement(title);
        centerElement(menu);
        centerElement(home);
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
    
    function reset(ele, defaultPos){
        ele.animate(defaultPos);
        if(ele.css('transform') !== "matrix(1, 0, 0, 1, 0, 0)"){
            image.rotate({angle: -30, animateTo: 0});
            description.rotate({angle:10, animateTo: 0});
        }
    }
    
    function setPosition(pos){
        if(pos === 1){
            title.animate({
                top: 0,
                left: 10
            });
            menu.animate({
                left: 10
            });
        }
    }
    
    socialMedia.append(facebookImage)
        .append(twitterImage);
    menu.append(home)
        .append(about)
        .append(contact)
        .append(reviews)
        .append(onTheTable)
        .append(pedalMods)
        .append(ampMods);
    body.append(title)
        .append(menu)
        .append(image)
        .append(description)
        .append(socialMedia);
    
    arrangeElements();
    
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
    
    menu.click(function(){
        setPosition(1);
    });
    
    
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