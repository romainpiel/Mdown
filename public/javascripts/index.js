var Index = {

	init: function() {
	
		var stopPropagation = false;
		var socket = io.connect('http://localhost');
		
		var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
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