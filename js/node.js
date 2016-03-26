(function( $, undefined ) {

$.widget( "ui.ndialog", {

	widgetEventPrefix: "node_dialog",

	options: {
	  node : null
	},

	_create: function() {
		var self = this,
		o = this.options;
	    console.log("create")
	},


	destroy: function() {
		//this.element.removeClass("ui-scrollbar");
			
		return this;
	},
	_getOption: function( key) {
	  console.log("get option");
		var i,
			valsLength = 0,
			self = this,
			o = this.options;

		if ( $.isArray( o.values ) ) {
			valsLength = o.values.length;
		}

		$.Widget.prototype._getOption.apply( this, arguments );
		switch ( key ) {
			case "contentSize":
				o.contentSize = value;
				self._resize();
				break;
		}
	},
	_setOption: function( key, value ) {
	  
		var i,
			valsLength = 0,
			self = this,
			o = this.options;

		if ( $.isArray( o.values ) ) {
			valsLength = o.values.length;
		}

		$.Widget.prototype._setOption.apply( this, arguments );
		switch ( key ) {
			case "contentSize":
				o.contentSize = value;
				self._resize();
				break;
		}
	}
});
}(jQuery));