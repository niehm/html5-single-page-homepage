<?php
	$titleGeneral = ' - HTML5, CSS3 & Javascript';
	$content = '';
	$meta_array = '';
	$data = $_POST['data'];
	$sidebar = '';
	
	# inhalte zuweisen (können auch aus einer Datenbank kommen
	switch($data){
		case 'start':
			$content = '<h1>
							Start
						</h1>
						<p>
							Lorem ipsum dolo r sit amet, consectetuer adipiscing elit. Praesent pharetra pretium dolor. Proin viverra massa nec metus. Mauris varius tincidunt justo. Aliquam eu erat. Donec condimentum consectetuer nisi. Proin nulla orci, suscipit eget, interdum ultrices, tristique quis, enim. Mauris sagittis egestas lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vitae massa. Mauris interdum lacus ac enim. Vivamus placerat dui rhoncus nulla.
						</p>';
			$meta_array = array(
								'title' => 'Start'.$titleGeneral ,
								'keywords' => 'Bla, Bla, Bla',
								'description' => 'Lorem ipsum dolo r sit amet, consectetuer adipiscing elit.',
								); 
			$sidebar = array(
								'<h2>Box 1</h2><p>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>',
								'<h2>Box 2</h2><p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor...</p>',
								'<h2>Box 3</h2><p>At vero eos et accusam et justo duo dolores et ea rebum.</p>',
							 );
		break;
		case 'galerien':
			$content = '<h1>
							Galerie
						</h1>
						<p>
							Ein link zur <a href="#!start" title="Home">Startseite</a>
						</p>';
			$meta_array = array(
								'title' => 'Galerie'.$titleGeneral ,
								'keywords' => 'Galerie, Bla, Bla',
								'description' => 'Bildergalerie',
								);
			
			$sidebar = array(
								'<a href="https://plus.google.com/u/0/109853826166288612269" title="Cenyn auf G+" target="_blank"><img src="images/buch_sig.png" alt="Buch, by Cenyn" /></a>',
								'<a href="https://plus.google.com/u/0/109853826166288612269" title="Cenyn auf G+" target="_blank"><img src="images/omega.png" alt="Omega, by Cenyn" /></a>',
								'<a href="https://plus.google.com/u/0/109853826166288612269" title="Cenyn auf G+" target="_blank"><img src="images/punk.png" alt="Punk, by Cenyn" /></a>',
							 );
		break;
	}
	
	# daten ausgeben
	if($content && is_array($meta_array)){
		echo json_encode(array('content'=>$content, 'meta'=>$meta_array, 'sidebar'=>$sidebar));
	}
	else{
		# falls keine daten vorhanden
		header("HTTP/1.0 404 Not Found");
	}
?>