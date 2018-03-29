var zMessage = zMessage || (function ($) {
    'use strict';
    var functionzMessage;
    
    // Creating modal dialog's DOM
    var $dialog = $(
        '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
        '<div class="modal-dialog modal-m">' +
        '<div class="modal-content">' +
        '<div class="modal-header"><h4 style="margin:0;"></h4></div>' +
        '<div class="modal-body">' +
        '<div><table><tbody><tr><td style="width: 50px;"><img id="image"/></td>' + 
        '<td id="message" style="width: 600px; text-align: center;"></td>' +
        '<td style="width: 50px;"></td></tr><tr><td colspan="3" style="height: 10px;"></td></tr>' +
        '<tr><td style="text-align: center;" colspan="3">' +
        '<button id="btnOk" style="width: 110px;" onclick="zMessage.hide(this);">Aceptar</button> ' +
        '<button id="btnCancel"style="width: 110px;" onclick="zMessage.hide(this);">Cancelar</button>' +
        '</td></tr></tbody></table></div>' +
        '</div></div></div></div>');

    return {
		/**
		 * Opens our dialog
         * @param title   Custom Title
		 * @param message Custom message
         * @param icon    Custom icon on message
		 * @param options Custom options:
		 * 				  options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
		 * 				  options.buttonType - bootstrap postfix for button class type, e.g. "success", "warning".
		 */
        show: function (title, message, icon, options) {
            // Assigning defaults
            $dialog.find('.modal-header').show();
            if (typeof title === 'undefined' || title === '') {
                $dialog.find('.modal-header').hide();
            }else{
                $dialog.find('h4').text(title);
            }
            
            if (typeof options === 'undefined') {
                options = {};
            }

            if (typeof message === 'undefined') {
                message = '¿Está seguro de proceder?';
            }
            $dialog.find('#message').html(message);

            if (typeof icon === 'undefined'){
                $dialog.find('#image').attr('src','');
            }
            else{
                switch(icon){
                    case 1: $dialog.find('#image').attr('src','content/img/ico_1.png');
                            break;
                    case 2: $dialog.find('#image').attr('src','content/img/ico_2.png');
                            break;
                    case 3: $dialog.find('#image').attr('src','content/img/ico_3.png');
                            break;
                    default: $dialog.find('#image').attr('src','');
                }
            }

            var settings = $.extend({
                dialogSize: 'm',
                buttonType: 'btn-danger',
                buttonOK: true,
                buttonCancel: true,
                onClickOK: null // This callback runs after the dialog was hidden
            }, options);


            // Configuring dialog
            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            $dialog.find('button').attr('class', 'button '+ settings.buttonType);
            
            $dialog.find('#btnOk').show();
            if (typeof settings.buttonOK === 'undefined' || settings.buttonOK === false) {
                $dialog.find('#btnOk').hide();
            }
            functionzMessage = settings.onClickOK;

            $dialog.find('#btnCancel').show();
            if (typeof settings.buttonCancel === 'undefined' || settings.buttonCancel === false) {
                $dialog.find('#btnCancel').hide();
            }

            // Opening dialog
            $dialog.modal();
        },
		/**
		 * Closes dialog
		 */
        hide: function (b) {
            $dialog.modal('hide');
            if (b.id === 'btnOk'){
                if (typeof functionzMessage === 'function') {
                    functionzMessage();
                }
            }            
        }
    };
})(jQuery);