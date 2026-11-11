$(document).ready(function(){
    
   $(".tipo-ads-1").on('click', function () {
       
       if($(this).val() == "html"){
           
           $(".ads-img-1").fadeOut();
           $(".ads-html-1").fadeIn();
           
       } else if($(this).val() == "imagem"){
           
           $(".ads-html-1").fadeOut();
           $(".ads-img-1").fadeIn();
           
       } else {
           
           $(".ads-img-1").fadeOut();
           $(".ads-html-1").fadeOut();
           
       }
       
   });
   
    $(".check-ads-1").on('click', function() {
        
        if($(".check-ads-1").is(":checked") === false){
            
            $("#ads-1").prop('disabled', true);
        
        } else {
            
            $("#ads-1").prop('disabled', false);
        
        }
    
    });
   
   $(".tipo-ads-2").on('click', function () {
       
       if($(this).val() == "html"){
           
           $(".ads-img-2").fadeOut();
           $(".ads-html-2").fadeIn();
           
       } else if($(this).val() == "imagem"){
           
           $(".ads-html-2").fadeOut();
           $(".ads-img-2").fadeIn();
           
       } else {
           
           $(".ads-img-2").fadeOut();
           $(".ads-html-2").fadeOut();
           
       }
       
   });
    
    $(".check-ads-2").on('click', function() {
        
        if($(".check-ads-2").is(":checked") === false){
            
            $("#ads-2").prop('disabled', true);
        
        } else {
            
            $("#ads-2").prop('disabled', false);
        
        }
    
    });
    
   $(".tipo-ads-3").on('click', function () {
       
       if($(this).val() == "html"){
           
           $(".ads-img-3").fadeOut();
           $(".ads-html-3").fadeIn();
           
       } else if($(this).val() == "imagem"){
           
           $(".ads-html-3").fadeOut();
           $(".ads-img-3").fadeIn();
           
       } else {
           
           $(".ads-img-3").fadeOut();
           $(".ads-html-3").fadeOut();
           
       }
       
   });
    
    $(".check-ads-3").on('click', function() {
        
        if($(".check-ads-3").is(":checked") === false){
            
            $("#ads-3").prop('disabled', true);
        
        } else {
            
            $("#ads-3").prop('disabled', false);
        
        }
    
    });
    
});