define([
	'lodash',
	'syllables'
], function(_, Syllables){
	var moduleName = 'LISTER.MODEL';
	function log(message) {
		console.log(moduleName + ': ' + message);
	}
	log('loaded');

	/**
	 * Lister object.
	 *
	 * @author Alberto Miranda <b3rt.js@gmail.com>
	 * @param {string}
	 */
	function Lister(text){
		var text = text || null,
			plainText = null,
			syllables = {},
			$list = $('#words-list'),
			$listContainer = $('#list'),
			$listTitle = $('#list-title'),
			$alerts = $('#alerts');

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
			wordLength;
		_.each(words, function(word){
			wordLength = word.length;
			syllables[word] = new Syllables(word).get();

			//add small words
			if (wordLength === 1) {
				syllables[word] = [word];
			}
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

		function renderWords() {
			log('render: ' + text);
			$listTitle.html('Palabras');
			show();
			var html = '<ul>';
			_.each(words, function(word) {
				html+='\n  <li>' + word + '</li>';
			});
			html+='</ul>';

			$list.html(html);
		}

		function renderSyllables() {
			log('render: ' + text);
			$listTitle.html('Sílabas');
			show();
			var html = '<ul>';
			_.each(words, function(word) {
				var wordSyllables = syllables[word].join('-');
				html+='\n  <li>' + wordSyllables + '</li>';
			});
			html+='</ul>';

			$list.html(html);
		}

		function renderBoth() {
			log('render: ' + text);
			$listTitle.html('Palabras y sílabas');
			show();
			var html = '<ul>';
			_.each(words, function(word) {
				var wordSyllables = syllables[word].join('-');
				html+='\n  <li><b>' + word + '</b>: ' + wordSyllables + '</li>';
			});
			html+='</ul>';

			$list.html(html);
		}

		function show() {
			$listContainer.show();
		}

		function hide(){
			$listContainer.hide();
		}

		return {
			getSyllables: getSyllables,
			getText: getText,
			getPlainText: getPlainText,
			renderWords: renderWords,
			renderSyllables: renderSyllables,
			renderBoth: renderBoth,
			show: show,
			hide: hide
		};
	}


	return Lister;
});