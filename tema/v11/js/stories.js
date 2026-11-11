(function() {

    this.Story = function() {

        defaults = {
            playlist: null
        };

        if (arguments[0] && typeof arguments[0] === "object") {
            
            this.options = extendDefaults(defaults, arguments[0]);

        }

        document.getElementsByClassName('pos-stories')[0].style.width = defaults.playlist.length * 90 + "px";

        var Div = document.getElementById('storytime');

        var baseHTML = '<div class="storytime" style="opacity: 0; display: none;">' +
			'<div class="story-cover"></div>' +
			'<div class="story-window">' +
			'<div class="story-arrow storie-left" onclick="leniumStorie.prev();"></div><div class="story-arrow storie-right" onclick="leniumStorie.next();"></div>' +
                '<div class="story-timeline"></div>' +
				'<div class="story-nav">' +
					'<div class="story-nav-left"><img class="story-icon" src="" alt="Storie" /> <span class="story-text"></span><span class="story-date"></span></div><div class="story-nav-right"><div class="close story-close" onclick="leniumStorie.close();"></div></div>' +
				'</div>' +
				'<div class="story-item-ele1" onclick="leniumStorie.next();">' +
					'<img class="story-next" src="" alt="Storie" />' +
                    '<div class="pos-info-storie">' +
                        '<div class="info-storie">' +
                            '<span>' +
                                '<b class="chapeu-storie-d"></b>' +
                            '</span>' + 
                            '<span class="titulo-storie-d"></span>' +
                            '<span class="credito-storie-d"></span>' +
                            '<span class="views-storie-d">0</span>' +
                            '<a class="url-storie" onclick="leniumStorie.clicurl();" href="#">Saiba mais</a>' +
                        '</div>' +
                    '</div>'+
				'</div>' +
				'<div class="spinner">' +
					'<div class="bounce1"></div>' +
					'<div class="bounce2"></div>' +
					'<div class="bounce3"></div>' +
				'</div>' +
			'</div>' +
		'</div>';

        var timelineHTML = '';

        Div.innerHTML = baseHTML;

        var i;
        for(i = 0; i < defaults.playlist.length; i++){

            timelineHTML = timelineHTML + '<div class="story-timeline-item"><div class="story-timeline-line"></div><div class="story-timeline-line-active story-active-' + i + '"></div></div>';

        }

        var storyTimeline = document.getElementsByClassName('story-timeline')[0];
        storyTimeline.innerHTML = timelineHTML;
    };

    function extendDefaults(source, properties){

        var property;
        for (property in properties){

            if (properties.hasOwnProperty(property)){

                source[property] = properties[property];

            }

        }

        return source;

    }

    function launch(){
        
        storyTime = document.getElementsByClassName('storytime')[0];
        storyWindow = document.getElementsByClassName('story-window')[0];
        storySpinner = document.getElementsByClassName('spinner')[0];
        thisTimeline = document.getElementsByClassName('story-active-' + start)[0];
        icon = document.getElementsByClassName('story-icon')[0];
        text = document.getElementsByClassName('story-text')[0];
        chapeu = document.getElementsByClassName('chapeu-storie-d')[0];
        titulo = document.getElementsByClassName('titulo-storie-d')[0];
        credito_foto = document.getElementsByClassName('credito-storie-d')[0];
        
        if(config_tema['logado'] == 'S'){

            views = document.getElementsByClassName('views-storie-d')[0];

        }

        date = document.getElementsByClassName('story-date')[0];
        storieitemele1 = document.getElementsByClassName('story-next')[0];
        urlstorie = document.getElementsByClassName('url-storie')[0];

        if (start == 0) {
            
            storyTime.setAttribute("style", "display: block; opacity: 0;");
            
        } else {
            
            storyTime.setAttribute("style", "display: block; opacity: 1;");
            
        }

        storyTime.setAttribute("style", "display: block; opacity: 1;");
        
        storySpinner.style.display = 'block';
        setTimeout(function() {

            storyWindow.setAttribute("style", "opacity: 1;");
            
        }, 100);
        
        icon.src = defaults.playlist[start].icon;

        titulo.classList.remove('titulo-anima-storie');
        credito_foto.classList.remove('titulo-anima-storie');

        if(config_tema['logado'] == 'N'){

            $('.views-storie-d').remove();

        } else {

            views.classList.remove('titulo-anima-storie');

        }

        setTimeout(function(){
            
            titulo.classList.add('titulo-anima-storie');
            credito_foto.classList.add('titulo-anima-storie');
            
        }, 100);
        
        text.innerHTML = defaults.playlist[start].autor;
        date.innerHTML = defaults.playlist[start].data;
        chapeu.innerHTML = defaults.playlist[start].chapeu;
        titulo.innerHTML = defaults.playlist[start].titulo;
        credito_foto.innerHTML = defaults.playlist[start].credito_foto;

        var data = {'acao': 'count_stories', 'id_storie': defaults.playlist[start].id};

        $.ajax({
            url: config_tema['url_site'] + "/tema/v11/api.php",
            type: "POST",
            data: data,
            success: function(data){

                if(config_tema['logado'] == 'S'){
                
                    views.innerHTML = data['views'];
                    views.classList.add('titulo-anima-storie');

                }
                
            }
        });
        
        storieitemele1.src = '';
        storieitemele1.src = defaults.playlist[start].foto;
        urlstorie.href = defaults.playlist[start].link;
                
        thisTimeline.style.width = '100%';
        
        for(var i = 0; i < defaults.playlist.length; i++){
         
            itemstorie = document.getElementsByClassName('story-active-' + i)[0];
            itemstorie.classList.remove('storie-active');
            
        }
        
        itemstorie = document.getElementsByClassName('story-active-' + start)[0];

        itemstorie.classList.add('storie-active');

        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 14000*36000;
        now.setTime(expireTime);
        document.cookie = 'sele1vid' + defaults.playlist[start].id + '=s;expires=' + now.toUTCString() + ';path=/';

        itemstorie_button = document.getElementsByClassName('id-storie-' + defaults.playlist[start].id)[0];
        itemstorie_button.classList.add('storie-visto');
        
    }

    function clicurl(){
        
        next = function() {
            
            return false;
            
        };
        
    }
    
    function animationstorie(){
        
        timest = setInterval(function(){
            
            next();
            
        }, 10000);
        
    }
    
    var timest;
    function next(){
        
        thisTimeline.style.width = '100%';
        
        start++;
        
        if (start >= defaults.playlist.length) {
            
            close();
            
        } else {
            
            launch(start);
            
        }
        
        clearTimeout(timest);
        animationstorie();
        
    }

    function prev() {
        
        if(start != 0) {
            
            thisTimeline.style.width = '0%';
            
        }
        
        start--;
        
        if (start < 0) {
            
            start = 0;
            return false;
            
        } else {
            
            launch(start);
            
        }
        
        clearTimeout(timest);
        animationstorie();
        
    }

    function close() {
                
        setTimeout(function() {

            storyWindow.setAttribute("style", "opacity: 0;");

            setTimeout(function() {

                storyTime.setAttribute("style", "display: none; opacity: 0;");
                
            }, 100);

            var i;
            
            for(i = 0; i < defaults.playlist.length; i++){
                
                document.getElementsByClassName('story-timeline-line-active')[i].setAttribute("style", "width: 0%;");
                
            }
            
        }, 250);

        clearTimeout(timest);
    }
    
    Story.prototype.launch = function(num) {
        
        if(!num) { var num = 0; }
        start = num;
        launch();
        animationstorie();
        
    };
    
    Story.prototype.next = function() {
        
        next();
        
    };
    
    Story.prototype.prev = function() {
        
        prev();
        
    };

    Story.prototype.clicurl = function() {
        
        clicurl();
        
    };
    
    Story.prototype.close = function() {
        
        close();
        
    };

}());

$(document).ready(function(){

    var itensStories = $('.pos-stories button');

    $('.pos-stories').html('');

    itensStories.each(function(index){

        var idStorie = $(this).data('id');

        if(document.cookie.indexOf('sele1vid' + idStorie) == -1){

            $('.pos-stories').append($(this));

        }

    });

    itensStories.each(function(index){

        var idStorie = $(this).data('id');

        if(document.cookie.indexOf('sele1vid' + idStorie) !== -1){

            $('.pos-stories').append($(this));

            if($(this).hasClass('storie-visto') == false){

                $(this).addClass('storie-visto');

            }

        }

    });

});