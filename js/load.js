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
$(document).ready(hashLink = function() {
	// bisherigen eventhandler entfernen
	$('a[href^="#!"]').unbind('click');
	// Eventhandler hinzufügen
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
		  dataType: 'json',
		  url: '/content.php',
		  data: 'data=' + hashtag
	}).done(function( data ) {
		// content
		//$('#main .content').html(data.content);
		changePage(data.content);
		
		// meta daten ändern
		$('title').html(data.meta.title);
		$('meta[name="description"]').attr('content',data.meta.description);
		$('meta[name="keywords"]').attr('content',data.meta.keywords);
		
		// navigationspunkt aktivieren
		setNavActiv('#!'+hashtag);
		// hashlinks mit Eventhandler versehen
		hashLink();
	})
	.fail(function(){ // falls die Seite nicht vorhanden ist
		$.ajax({
			  type: 'POST',
			  url: '/fehler404.htm',
		}).done(function( html ) { 
			//Content
			//$('#main .content').html(html);
			changePage(html);
			$('menu li.act').removeClass('act');
			
			// meta daten
			$('title').html('Fehler 404');
			$('meta[name="description"]').attr('content','');
			$('meta[name="keywords"]').attr('content','');
			
			// hashlinks mit Eventhandler versehen
			hashLink();
		})
		.fail(function(){
			// letzter Fallback für nicht vorhandene Seiten
			alert('seite nicht gefunden');
			$('menu li.act').removeClass('act');
			
			// meta daten
			$('title').html('Fehler 404');
			$('meta[name="description"]').attr('content','');
			$('meta[name="keywords"]').attr('content','');
		});
	});
}

/**
 * ID des Seiteninhalts
 */
var pageID = 0;

/**
 * Wechselt den inhalt des Hauptcontainers aus
 * @param content
 */
function changePage(content){
	pageID++;
	$('#content'+(pageID-1)).after($('<div class="content left" id="content'+pageID+'">'+ content +'</div>'));
	
	setTimeout(function(){ $('#content'+pageID).removeClass('left'); },10);
	$('#content'+(pageID-1)).addClass('right');
	setTimeout(function(){  $('#main .content:not(#content'+pageID+')').remove(); },1000);
}

/**
 * Managed den Aktiven Menüpunkt
 * @param href
 */
function setNavActiv(href){
	$('menu li.act').removeClass('act');
	$('menu li a[href="'+href+'"]').parent().addClass('act');
}