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
    var pedalMods = $('<div />')
                .attr('id', 'ei_pedalMods')
                .attr('class','ei_menuItem')
                .html('Pedal Modifications');
    var ampMods = $('<div />')
                .attr('id', 'ei_ampMods')
                .attr('class','ei_menuItem')
                .html('Amp Modifications');
    var video = $('<div />')
                .attr('id', 'ei_pedalVideo');
    var image = $('<img />')
                .attr('id', 'ei_pedalImage');
    var description = $('<div />')
                .attr('id', 'ei_description')
                .html('This is a pedal description 1 2 3 4 5 6 7 8 9 0, those were numbers, this is long'); 
    
    function centerElement(ele){
        ele.css({
           left: (body.width()/2 - ele.width()/2)
        });
    }
    
    function arrangeElements(){
        centerElement(title);
        centerElement(menu);
        centerElement(home);
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
    
    menu.append(home)
        .append(about)
        .append(contact)
        .append(reviews)
        .append(pedalMods)
        .append(ampMods);
    body.append(title)
        .append(menu)
        .append(video)
        .append(image)
        .append(description);
    
    arrangeElements();
    
    image.click(function(){
        var topPos = parseInt(image.css("top"),10) - 30;
        var rightPos = parseInt(image.css("right"),10) + 30;
        if(topPos < -120){
            topPos = -30;
            rightPos = 320;
            
            image.animate({
                top: topPos,
                right: rightPos
            });
        } else {
            image.animate({
                top: topPos,
                right: rightPos
            });
        }
    });
    
    function reset(ele, defaultPos){
        ele.animate(defaultPos);
    }
    
    image.dblclick(function(){
        reset(image,{
            top: -30,
            right: 320
        });
    });
    
    function eiVideoPlayer(options){
        title.html(options.caller.html());  // Title becomes HTML of the element that was clicked.
        description.html(options.descripntion);
        
        video.css('display','block');
        image.css('display','block');
        
        description.css('display','block');
        reset(image,{
            top: -30,
            right: 320
        });
        reset(description,{
            top: 350,
            right: 20
        });
        
        function onPlayerReady(){
                // Do something? not sure yet
        }
        
        function onPlayerStateChange(e){
            var state = e.data;
            var ele = e.target;
            
            if(state == 1 || state == 3){
                image.animate({
                    top: -110,
                    right: 400
                });
                description.animate({
                    top: 400,
                });
                description.rotate({
                    angle:10,
                    animateTo: 50
                })
            }
            if(state == 2){
                reset(image,{
                    top: -30,
                    right: 320
                });
                reset(description,{
                    top: 350,
                    right: 20
                });
            }
            console.log(state, ele);
        }
        var player = new YT.Player('ei_pedalVideo', {
            videoId: 'Lf7frCzDBS8',
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
        });
        
        image.attr('src','images/labels/bluejay.png');
    }
    menu.click(function(){
        setPosition(1);
    });
    
    pedalMods.click(function(){
        var descriptionText = "This is a pedal mod! This is example text, and this text has run on too far."
        var options = {
            caller: $(this),
            description: descriptionText
        };
        eiVideoPlayer(options);
    });
    
    ampMods.click(function(){
        title.html('Amp Modifications');
        description.html('This is the description of a Carvin MTS3200 Mod done by Eilers Innovations.');
        
        video.css('display','block');
        image.css('display','block');
        description.css('display','block');
        reset(image,{
            top: -30,
            right: 320
        });
        reset(description,{
            top: 350,
            right: 20
        });
        //video.attr('src','http://www.youtube.com/embed/HiHSNaqpfUs');
        image.attr('src','images/labels/carvinMTS3200.png');
    });
});