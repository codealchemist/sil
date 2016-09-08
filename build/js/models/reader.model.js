define([
	'lodash',
	'syllables',
	'json!data/dictionary.json'
], function(_, Syllables, dictionary){
	var moduleName = 'READER.MODEL';
	function log(message) {
		console.log(moduleName + ': ' + message);
	}
	log('loaded');

	/**
	 * Reader object.
	 *
	 * @author Alberto Miranda <b3rt.js@gmail.com>
	 * @param {string} text Phrase to be read.
	 */
	function Reader(text){
		var text = text || null,
			plainText = null,
			syllables = [],
			$modal = $('#syllable-modal'),
			$modalContent = $('#syllable'),
			speed = $('#speed').slider('getValue'),
			voice = $('#voice').is(':checked'),
			$alerts = $('#alerts'),
			intervalRef;

		//validate text
		if (!text) {
			var emptyMessage = 'Oops! No text to read!';
			log(emptyMessage);
			show(emptyMessage);
			return false;
		}

		//remove punctuation
		text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase();

		//set syllables and words
		var words = text.split(' '),
			wordSyllables,
			wordLength,
			minChars = 3;
		_.each(words, function(word){
			wordLength = word.length;
			wordSyllables = new Syllables(word).get();

			//add small words
			if (wordLength === 1) {
				wordSyllables = [word];
			}

			if (!wordSyllables) {
				var error = 'Oops! No syllables for: "' + word + '"';
				log(error);
				showAlert(error);
				return true;
			}

			console.log(wordSyllables);
			syllables = syllables.concat(wordSyllables);
		});

		function showAlert(message) {
			//TODO: move to external template
			var html = '<div class="alert alert-warning alert-dismissable">' +
  				'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
  				'<strong>Warning!</strong> ' + message +
				'</div>';

			$alerts.append(html);
		}

		function getSyllables() {
			return syllables;
		}

		function getText() {
			return text;
		}

		function getPlainText() {
			return plainText;
		}

		function getAudioUrl(string, callback) {
			log('getAudioUrl');
			var baseUrl = 'tts.php?';
			var url = baseUrl + 
				'text=' + string +
				'&id=' + string.replace(/\s/gi, '-') +
				'&lang=es';
			log('audio url: ' + url);

			$.get(url, function(response){
				log('got mp3 url: ' + response);
				if (typeof callback === 'function') {
					callback(response);
				}
			});
			return url;
		}

		function say(string) {
			log('say: ' + string);
			var timestamp = new Date().getTime();
			var audioUrl = getAudioUrl(string, function(mp3url){
				soundManager.createSound({
					id: string.replace(/\s/gi, '-') + '-' + timestamp,
					url: mp3url,
					autoLoad: true,
					autoPlay: true,
					onload: function() {
						console.log('---------> sound loaded: ' + this.id);
					},
					volume: 50
				});
			});
		}

		function read() {
			log('read: ' + text);

			if (voice) {
				log('use voice!');
				say(text);
			}
		}

		function render(text) {
			//TODO: create UI module
			log('render: ' + text);
			show(text);
		}

		function readWords() {
			log('read words: ' + text);
			console.log(words);

			readWord(); //read first syllable at once
			console.log('SPEED: ' + speed);
			intervalRef = setInterval(readWord, 1000 * speed);
		}

		function readWord() {
			var word = words.shift();
			if (!word) {
				stop();
				log('done reading.');
				hide();
				return false;
			}

			render(word);
			if (voice) {
				log('use voice!');
				say(word);
			}
		}

		function readSyllable() {
			var syllable;
			syllable = syllables.shift();
			if (!syllable) {
				stop();
				log('done reading.');
				hide();
				return false;
			}

			render(syllable);
			if (voice) {
				log('use voice!');
				say(syllable);
			}
		}

		function readSyllables() {
			log('read syllables: ' + text);
			console.log(syllables);

			readSyllable(); //read first syllable at once
			console.log('SPEED: ' + speed);
			intervalRef = setInterval(readSyllable, 1000 * speed);
		}

		function stop() {
			clearInterval(intervalRef);
		}

		function show(message) {
			$modalContent.html(message);
			$modal.modal('show');
		}

		function hide(){
			$modalContent.html('');
			$modal.modal('hide');
		}

		//events
		$modal.on('hide.bs.modal', function(){
			log('closed modal');
			stop();
		});

		return {
			getSyllables: getSyllables,
			getText: getText,
			getPlainText: getPlainText,
			read: read,
			readWords: readWords,
			readSyllables: readSyllables
		};
	}


	return Reader;
});