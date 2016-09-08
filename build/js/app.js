define([
	'jquery',
	'models/reader.model',
	'soundmanager'
], function($, Reader, soundManager){
	var moduleName = 'APP';
	function log(message) {
		console.log(moduleName + ': ' + message);
	}
	log('loaded');

	var $text = $('#text'),
		$readPhraseButton = $('#read-phrase-button'),
		$readWordsButton = $('#read-words-button'),
		$readSyllablesButton = $('#read-syllables-button'),
		$speed = $('#speed'),
		$voice = $('#voice');

	function init(){
		log('init');

		//set default text
		var defaultText = 'Papá y mamá son unos genios y me quieren mucho!';
		$text.val(defaultText);

		//init speed slider
		$speed.slider({
			min: 1,
			max: 15,
			value: 2
		});

		//init main events
		events();

		//init audio
		soundManager.setup({
			url: 'vendor/soundManager/swf',
			flashVersion: 9, // optional: shiny features (default = 8)
			// optional: ignore Flash where possible, use 100% HTML5 mode
			preferFlash: false,
			onready: function() {
				log('AUDIO READY!');
			}
		});
	}

	function events() {
		log('events');
		$readPhraseButton.on('click', function(){
			var text = $text.val();
			log('read phrase: ' + text);

			Reader(text).read();
		});

		$readWordsButton.on('click', function(){
			var text = $text.val();
			log('read words: ' + text);

			Reader(text).readWords();
		});

		$readSyllablesButton.on('click', function(){
			var text = $text.val();
			log('read syllables: ' + text);

			Reader(text).readSyllables();
		});

		$voice.on('click', function(){
			var checked = $(this).is(':checked');
			if (checked) {
				$readPhraseButton.removeClass('hidden');
			} else {
				$readPhraseButton.addClass('hidden');
			}
		});
	}

	return {
		init: init
	};
});