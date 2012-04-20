var Index = {

	init: function() {
	
		var stopPropagation = false;
		var socket = io.connect('http://mdown.romainpiel.c9.io');
		
        var doc = document;
        var textarea = doc.body.appendChild(doc.createElement('textarea'));
		var editor = CodeMirror.fromTextArea(textarea, {
		    mode: 'markdown',
		    matchBrackets: true,
		    lineWrapping: true,
		    theme: "default",
		    onChange: function(){
				if(stopPropagation) {
					stopPropagation=false;
					return;
				}
				socket.emit('store text', { content: editor.getValue() });
		    }
		});
		
		socket.on('display text', function (data) {
			if (data.content != editor.getValue()) {
		    	editor.setValue(data.content);
		    	stopPropagation = true;
		    }
		});
	
	}
}