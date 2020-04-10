  
$(document).ready(function(){


  update()


})

function update(){

    let flag = false
    var el = $('.jobs').attr('id')
    var token = $('input[name=_token]').attr('value');

    $.ajax({

        url: "/simulations/progress-update",
        type:"POST",
        data: { '_token': token,"ids": ['?gkghfk5.423g44ths4.2y3yhey?.']},

        success:function(data){

          if (data['status']==200) {

            $.each(data['output'], function( index, value ) {

              let elem = $('.jobs[id='+index+']')

              elem.find('.statushtml').html(data['output'][index]['statushtml'])

              if (data['output'][index]['status'] != 1) {
                flag = true
              } else {
                $('.jobs[id='+index+']').find('.siminfo').first().remove(); 
             }

              let progress = parseFloat(data['output'][index]['progress']);
              progress =  progress.toFixed(2)

              if (progress==100.00) progress = 100

              elem.find('.progress-bar').first().css('width', progress+'%').attr('aria-valuenow',progress).html(progress+'%')

              elem.find('.simname').first().text(data['output'][index]['simulationname']);


            });

          }

          setTimeout(function(){
          
          if (flag) {
            update()
          }
          
          }, 500)

        },error:function(e){
          
          console.log('ee')

        }

    });
}