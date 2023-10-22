$(document).ready(function () {
    // example: https://getbootstrap.com/docs/4.2/components/modal/
    // show modal
    $('#food-modal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget) // Button that triggered the modal
        const foodID = button.data('source') // Extract info from data-* attributes
        const content = button.data('content') // Extract info from data-* attributes

        const modal = $(this)
        if (foodID === 'New Food') {
            modal.find('.modal-title').text(foodID)
            $('#food-form-display').removeAttr('foodID')
        } else {
            modal.find('.modal-title').text('Edit Food ' + foodID)
            $('#food-form-display').attr('foodID', content)
        }

        if (content) {
            $.ajax({
                type: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    'food': $('#food-modal').find('#foodname').val(),
                    'exp':$('#food-modal').find('#datepicker').val()
                }),
                success: function (res) {
                    console.log(res.response)
                    location.reload();
                },
                error: function () {
                    console.log('Error');
                }
            });
        } else {
            modal.find('#foodname').val('');
        }
    })


    $('#submit-food').click(function () {
        const tID = $('#food-form-display').attr('foodID');
        console.log($('#food-modal').find('.form-control').val())
        $.ajax({
            type: 'POST',
            url: tID ? '/edit/' + tID : '/create',
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify({
                'food': $('#food-modal').find('#foodname').val(),
                'exp':$('#food-modal').find('#datepicker').val()
            }),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    $('.remove').click(function () {
        const remove = $(this)
        $.ajax({
            type: 'POST',
            url: '/delete/' + remove.data('source'),
            success: function (res) {
                console.log(res.response)
                location.reload();
            },
            error: function () {
                console.log('Error');
            }
        });
    });

    // $(function(){
    //     var dtToday = new Date();
    
    //     var month = dtToday.getMonth() + 1;
    //     var day = dtToday.getDate();
    //     var year = dtToday.getFullYear();
    
    //     if(month < 10)
    //         month = '0' + month.toString();
    //     if(day < 10)
    //         day = '0' + day.toString();
    
    //     var minDate = year + '-' + month + '-' + day;    
    //     $('#datepicker').attr('min', minDate);
    // });

});