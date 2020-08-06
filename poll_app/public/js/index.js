document.addEventListener('keyup', optionsController)


function optionsController(){
    let active = $(document.activeElement)[0];
    let lastOpt = $('[name="option"]')[$('[name="option"]').length - 1];

    if (active === lastOpt && active.value != false){
        createOption(lastOpt);
    }

    $('.opt-rm').click(function(e){
        e.preventDefault();
        if ($('.opt-rm').length != 1){$(this).parent('div').remove();}
    })
}

// option helper functions

function createOption(lastOpt){
    number = getOptNum(lastOpt);
    option = $(
        `<div class='option'>
            <input name="option" class="option" placeholder="Option ${number}">
            <button class='opt-rm' disabled="disabled">
                <div class="line line1"></div>
                <div class="line line2"></div>
            </button>
        </div>`
    );
    $(option).insertBefore($('.submit'))
}

function getOptNum(lastOpt){
    return Number(lastOpt.placeholder.split(' ')[1]) + 1;
}