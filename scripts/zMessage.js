var zMessage = zMessage || (function ($) {
    'use strict';
    var functionzMessageOk;
    var functionzMessageCancel;
    
    var $dialog = $(
        '<div class="modal zmodal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog modal-m" role="document">' +
                '<div class="modal-content">' +
                    '<div class="modal-header zmodal-header">'+
                        '<h4 class="zh4"></h4>'+
                    '</div>' +
                    '<div class="modal-body zmodal-body">' +
                        '<div class="row">'+
                            '<div id="row-image">'+
                                '<img id="image"/>' + 
                            '</div>'+
                            '<div id="row-message">'+
                                '<p id="message"></p>' + 
                            '</div>'+
                        '</div>'+  
                    '</div>'+
                '<div class="modal-footer zmodal-footer">' + 
                    '<button id="btnOk" class="zbutton" onclick="zMessage.hide(this);">Aceptar</button>' +
                    '<button id="btnCancel" class="zbutton" onclick="zMessage.hide(this);">Cancelar</button>' +  
                '</div>' +
            '</div>' +
        '</div>'
    );

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

            if (typeof message === 'undefined' || message === '') {
                message = '¿Está seguro de proceder?';
                $dialog.find('#message').html(message);
            }
            $dialog.find('#message').html(message);

            if (typeof icon === 'undefined' || icon === 0){
                $dialog.find('#image').attr('src','');
                $dialog.find('#row-image').hide();
                $dialog.find('#row-message').attr('class', 'col-md-12 text-center');
            }
            else{
                switch(icon){
                    case 1: $dialog.find('#image').attr('src','content/img/1.png');
                            break;
                    case 2: $dialog.find('#image').attr('src','content/img/2.png');
                            break;
                    case 3: $dialog.find('#image').attr('src','content/img/3.png');
                            break;
                    case 4: $dialog.find('#image').attr('src','content/img/4.png');
                            break;
                    case 5: $dialog.find('#image').attr('src','content/img/5.png');
                            break;
                    case 6: $dialog.find('#image').attr('src','content/img/6.png');
                            break;
                    case 7: $dialog.find('#image').attr('src','content/img/7.png');
                            break;
                    case 8: $dialog.find('#image').attr('src','content/img/8.png');
                            break;
                    case 9: $dialog.find('#image').attr('src','content/img/9.png');
                            break;
                    default: $dialog.find('#image').attr('src','');
                }
                $dialog.find('#row-image').show();
                $dialog.find('#row-image').attr('class', 'col-md-2 text-center');
                $dialog.find('#row-message').attr('class', 'col-md-10 text-left');
            }

            var settings = $.extend({
                dialogSize: 'm',
                buttonType: 'zbtn-danger',
                buttonOK: true,
                buttonCancel: true,
                onClickOK: null,
                onClickCancel: null
            }, options);

            if(!(typeof settings.buttonType === 'undefined' || settings.buttonType === '')){
                switch(settings.buttonType){
                    case 'btn-primary': 
                        $dialog.find('.modal-header').attr('class', 'modal-header modal-header-primary');
                        $dialog.find('.zbutton').attr('class', 'button zbutton z'+ settings.buttonType);
                    break;
                    case 'btn-success': 
                        $dialog.find('.modal-header').attr('class', 'modal-header modal-header-success');
                        $dialog.find('.zbutton').attr('class', 'button zbutton z'+ settings.buttonType);
                    break;
                    case 'btn-info': 
                        $dialog.find('.modal-header').attr('class', 'modal-header modal-header-info');
                        $dialog.find('.zbutton').attr('class', 'button zbutton z'+ settings.buttonType);
                    break;
                    case 'btn-warning': 
                        $dialog.find('.modal-header').attr('class', 'modal-header modal-header-warning');
                        $dialog.find('.zbutton').attr('class', 'button zbutton z'+ settings.buttonType);
                    break;
                    case 'btn-danger': 
                        $dialog.find('.modal-header').attr('class', 'modal-header modal-header-danger');
                        $dialog.find('.zbutton').attr('class', 'button zbutton z'+ settings.buttonType);
                    break;
                    case 'btn-link': 
                        $dialog.find('.modal-header').attr('class', 'modal-header');
                        $dialog.find('.zbutton').attr('class', 'button zbutton z'+ settings.buttonType);
                    break;
                    case 'btn-default': 
                        $dialog.find('.modal-header').attr('class', 'modal-header');
                        $dialog.find('.zbutton').attr('class', 'button zbutton '+ settings.buttonType);
                    break;
                    default: 
                        $dialog.find('.modal-header').attr('class', 'modal-header '+ settings.buttonType);
                        $dialog.find('.zbutton').attr('class', 'button zbutton '+ settings.buttonType);
                }
            }

            // Configuring dialog

            $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
            
            $dialog.find('#btnOk').show();
            if (typeof settings.buttonOK === 'undefined' || settings.buttonOK === false) {
                $dialog.find('#btnOk').hide();
            }
            functionzMessageOk = settings.onClickOK;
            
            $dialog.find('#btnCancel').show();
            if (typeof settings.buttonCancel === 'undefined' || settings.buttonCancel === false) {
                $dialog.find('#btnCancel').hide();
            }
            functionzMessageCancel = settings.onClickCancel;

            $dialog.modal();
        },
        hide: function (b) {
            $dialog.modal('hide');
            if (b.id === 'btnOk'){
                if (typeof functionzMessageOk === 'function') {
                    functionzMessageOk();
                }
            } else if (b.id === 'btnCancel'){
                if (typeof functionzMessageCancel === 'function') {
                    functionzMessageCancel();
                }
            }            
        }
    };
})(jQuery);