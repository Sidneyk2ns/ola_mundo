$(function(){

	/*
		sistema de pesquisa!
	*/

	var currentValue = 0;
	var isDrag = false;
	var preco_maximo = 70000;
	var preco_atual = 0;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
		enableTextSelection();
	})

	$(document).mouseup(function() {
		isDrag = false;
	});

	$('.barra-preco').mousemove(function(e) {
		if (isDrag) {
			disebleTextSelection();
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;
			if (mouseX < 0)
				mouseX = 0;
			if (mouseX > elBase.width())
				mouseX = elBase.width();

			$('.pointer-barra').css('left',(mouseX-13)+'px');
			currentValue = (mouseX / elBase.width()) * 100;
			$('.barra-preco-fill').css('width',currentValue+'%');
			//ajustar o formato do preco
			preco_atual = (currentValue/100) * preco_maximo;
			preco_atual = formatarPreco(preco_atual);
			$('.preco-pesquisa').html('R$'+preco_atual);
		}
	});

	function formatarPreco(preco_atual){
		preco_atual = preco_atual.toFixed(2);
		preco_arr = preco_atual.split('.');

		var novo_preco = formatarTotal(preco_arr);
		return novo_preco;
	}

	function formatarTotal(preco_arr){
		
		if (preco_arr[0] < 1000){
			return preco_arr[0]+','+preco_arr[1];
		}else if (preco_arr[0] < 10000){
			return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+
			','+preco_arr[1];
		}else{
			return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+
			','+preco_arr[1];

		}
	
	}



	function disebleTextSelection(){
		$('body').css('-webkit-user-select','none');
		$('body').css('-moz-user-select','none');
		$('body').css('-ms-user-select','none');
		$('body').css('-o-user-select','none');
		$('body').css('-user-select','none');
	}

	function enableTextSelection(){
		$('body').css('-webkit-user-select','none');
		$('body').css('-moz-user-select','none');
		$('body').css('-ms-user-select','none');
		$('body').css('-o-user-select','none');
		$('body').css('-user-select','none');
	}

	/*

	   sistema de slider da pagina individual de cada carro!
	*/

	var imgShow = 3;
	var maxIndex = Math.ceil($('.mini-img-wraper').length/3)-1;
	var curIndex = 0;

	initSlider();
	navegateSlider();
	clickSlider();
	function initSlider(){
		var amt = $('.mini-img-wraper').length * 33.3;
		var elScroll = $('.nav-galeria-wraper');
		var elSingle = $('.mini-img-wraper');
		elScroll.css('width',amt+'%');
		elSingle.css('width',33.3*(100/amt)+'%');
	}

	function navegateSlider(){
		$('.arrow-right-nav').click(function(){
			if (curIndex < maxIndex){
				curIndex++;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'})
			}else{
				//console.log('chegamos até o final');
			}
		})

		$('.arrow-left-nav').click(function() {
						if (curIndex > 0){
				curIndex--;
				var elOff = $('.mini-img-wraper').eq(curIndex*3).offset().left - $('.nav-galeria-wraper').offset().left;
				$('.nav-galeria').animate({'scrollLeft':elOff+'px'})
			}else{
				//console.log('chegamos até o final');
			}
		});
	}

	function clickSlider(){
		$('.mini-img-wraper').click(function(){
			$('.mini-img-wraper').css('background-color','transparent');
			$(this).css('background-color','rgb(200,200,200)');
			var img = $(this).children().css('background-image');
			$('.foto-destaque').css('background-image',img);
		});

			$('.mini-img-wraper').eq(0).click()
    }

    /*
		clicar e ir para a div de contato com base no atributo goto!
    */

    $('[goto=contato]').click(function(){
    	$('header nav a').css('color','black');
    	$('.home').css('color','white'); 
    	$('.cont').css('color','#EB2D2D');
    	$('html,body').animate({'scrollTop':$('#contato').offset().top});
    	return false;
    });

    //sistema de navegação da pagina index.html

    var amtDepoimentos = $('.depoimento-single p').length;
    var corIndex = 0;

    iniciarDepoimentos();
    navegarDepoimentos();

    function iniciarDepoimentos(){

    	$(".depoimentos-single p").hide();
    	$('.depoimentos-single p').eq(0).show();
    }	


    function navegarDepoimentos(){
    	$('[next]').click(function(){
    			corIndex++;
    			if (corIndex >= amtDepoimentos)
    				corIndex = 0;
    	$(".depoimento-single p").hide();
    	$('.depoimento-single p').eq(corIndex).show();
    		
    	})

    	$('[prev]').click(function(){
    				corIndex--;
    			if (corIndex < 0)
    				corIndex = amtDepoimentos-1;
    	$(".depoimento-single p").hide();
    	$('.depoimento-single p').eq(corIndex).show();
    	})
    }

;})