/**
 * @jsx React.DOM
 */

var React = require('react');

var Test = React.createClass({
	getInitialState: function(){
        
        // The pictures array will be populated via AJAX, and 
        // the favorites one when the user clicks on an image:
        
        return { pictures: [], favorites: [] };
    },
    componentDidMount: function(){
        
        // When the component loads, send a jQuery AJAX request

        var self = this;

        // API endpoint for Instagram's popular images for the day

        var url = 'https://api.instagram.com/v1/media/popular?client_id=' + this.props.apiKey + '&callback=?';

        $.getJSON(url, function(result){

            if(!result || !result.data || !result.data.length){
                return;
            }

            var pictures = result.data.map(function(p){

                return { 
                    id: p.id, 
                    url: p.link, 
                    src: p.images.low_resolution.url, 
                    title: p.caption ? p.caption.text : '', 
                    favorite: false 
                };

            });

            // Update the component's state. This will trigger a render.
            // Note that this only updates the pictures property, and does
            // not remove the favorites array.

            self.setState({ pictures: pictures });

        });

    },
	render: function() {
		return (
			<div>
				<h1>Hello, world!</h1>
			</div>
		);			
	}
});

module.exports = Test;