$(document).ready(function() {
	// get current hashtag
	var hashtag = window.location.hash;
	if(!hashtag){
		hashtag = '#!start';
		window.location.hash = hashtag;
	}
	loadPage(hashtag);
});

// OnClick Eventhandler für alle Internen Links
$(document).on('click',function() {
	$('a[href^="#!"]').click(function(){
		hashtag = $(this).attr('href');
		return toPage(hashtag);
	});
});

/**
 * Zu Seite wechseln
 * @param hashtag
 * @returns {Boolean}
 */
function toPage(hashtag){
	// url zuweisen
	window.location.hash = hashtag;
	loadPage(hashtag);
	return false;
}

/**
 * Lädt den seiteninhalt anhand von einem Hashtag
 * @param hashtag
 */
function loadPage(hashtag){
	// hashtag von #! befreien
	hashtag = hashtag.substring(2);
	
	// Inhalte anhand von Hashtag holen
	$.ajax({
		  type: 'POST',
		  url: '/' + hashtag + '.htm',
	}).done(function( html ) { 
		$('#main .content').html(html);
		// navigationspunkt aktivieren
		setNavActiv('#!'+hashtag);
	})
	.fail(function(){ // falls die Seite nicht vorhanden ist
		$.ajax({
			  type: 'POST',
			  url: '/fehler404.htm',
		}).done(function( html ) { 
			$('#main .content').html(html);
		})
		.fail(function(){
			// letzter Fallback für nicht vorhandene Seiten
			alert('seite nicht gefunden');
		});
	});
}

/**
 * Managed den Aktiven Menüpunkt
 * @param href
 */
function setNavActiv(href){
	$('menu li a').attr('class','');
	$('menu li a[href="'+href+'"]').parent().attr('class','act');
}