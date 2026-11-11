$(document).ready(function(){
    
    if($('input[type=email]').length){
        
        $('input[type=email]').focus();
        
    }
    
    if($(".tempo-bloqueio").length){
        
        var diffTime = $(".tempo-bloqueio").data('time1') - $(".tempo-bloqueio").data('time2');
        var duration = moment.duration(diffTime*1000, 'milliseconds');
        
        setInterval(function(){
            
            duration = moment.duration(duration - 1000, 'milliseconds');
            
            if(duration['_milliseconds'] > 0){
                
                var minutos = duration.minutes() < 10 ? '0' + duration.minutes() : duration.minutes();
                var segundos = duration.seconds() < 10 ? '0' + duration.seconds() : duration.seconds();
                
                $(".tempo-bloqueio").text(minutos + ':' + segundos);
                
            } else {
                
                location.reload();
                
            }
            
        }, 1000);
        
    }
    
});