define([

], function(){
	var moduleName = 'SYLLABLE VIEW';
	function log(message) {
		console.log(moduleName + ': ' + message);
	}
	log('loaded');

	function Syllable(text){
		var text = text || null,
			audio = null;

		function getAudio() {

		}

		function render(){
			log('render');
		}

		return {
			render: render,
			getAudio: getAudio
		};
	}


	return Syllable;
});