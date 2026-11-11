$(document).ready(function(){
    
    if(infoView['pg'] == 'noticia'){
        
        var rand = Math.floor(Math.random() * 100);
        
        var data = [];
        data.push({name: 'id', value: infoView['id']});
        
        $.ajax({
            
            url: infoView['url'] + 'views.php?rand=' + rand,
            type: "POST",
            data: data
            
        });
        
    }
    
});