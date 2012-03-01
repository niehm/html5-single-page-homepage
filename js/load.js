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
	loadPage(hashtag);
	// url zuweisen
	window.location.hash = hashtag;
	return false;
}

/**
 * Lädt den seiteninhalt anhand von einem Hashtag
 * @param hashtag
 */
function loadPage(hashtag){
	if(hashtag != window.location.hash || $('#main .content').html().trim() == ''){
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
			
			// sidebar		
			if(data.sidebar.length > 0){
				for(var i = 0; i<= data.sidebar.length; i++){
					changeSidebar((i+1), data.sidebar[i]);
				}
			}
			
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
	// Neues Element einfügen
	$('#content'+(pageID-1)).after($('<div class="content in" id="content'+pageID+'">'+ content +'</div>'));
	
	// mit kleiner verzögerung die Class entfernen für Slide-In
	setTimeout(function(){ $('#content'+pageID).removeClass('in'); },10);
	// Class hinzufügen für Slide-Out
	$('#content'+(pageID-1)).addClass('out');
	// Altes Element entfernen
	setTimeout(function(){  $('#main .content:not(#content'+pageID+')').remove(); },1000);
}

/**
 * ID's für die Sidebar Inhalte
 */
var sidebarID = new Object();
$(document).ready(function() { 
	$('#sidebar aside').each(function (){
		var id = $(this).attr('id');
		sidebarID[id] = 0;
	});
});

/**
 * Wechselt den Inhalt eines Sidebar Containers
 * @param id
 * @param content
 */
function changeSidebar(id, content){
	sidebarID['s'+id]++;
	
	// Neues Element einfügen
	$('#s' + id + ' .content.s' + (sidebarID['s'+id]-1)).after($('<div class="content in s'+sidebarID['s'+id]+'">'+ content +'</div>'));
	
	// mit kleiner verzögerung die Class entfernen für Slide-In
	setTimeout(function(){ 
		$('#s' + id + ' .content.s'+sidebarID['s'+id]).removeClass('in');
	},10);
	
	// Class hinzufügen für Slide-Out
	$('#s' + id + ' .content.s' + (sidebarID['s'+id]-1)).addClass('out');
	
	// Altes Element entfernen
	setTimeout(function(){  
		$('#s' + id + ' .content:not(.s' + sidebarID['s'+id] + ')').remove(); 
	},1000);
}

/**
 * Managed den Aktiven Menüpunkt
 * @param href
 */
function setNavActiv(href){
	$('menu li.act').removeClass('act');
	$('menu li a[href="'+href+'"]').parent().addClass('act');
}