var base_color = "ff0000";  // standard node for colors

function init() {
	// setup the graph
	s = new sigma(document.getElementById('graph'));
	sigma.parsers.json(
		'graph.json',
		s,
		function() {
            max_weight = 0; // max weight of a node

            // save the original color of the graph for later re-coloring
            // also, save the weights for each node and edge
            s.graph.nodes().forEach(function(n) {
                n.color = base_color;
                n.original_color = n.color;
                n.weight = Object.keys(n.cookies).length;
                if (n.weight > max_weight) {
                    max_weight = n.weight;
                }
            });
            s.graph.edges().forEach(function(e) {
                e.color = base_color;
                e.original_color = e.color;
                e.weight = Object.keys(e.cookies).length;
            });
			s.refresh();

            // set up the ui
            $("#weight_slider").slider({
                range: "max",
                min: 0,
                max: max_weight,
                value: max_weight / 2,
                slide: function(event, ui) {
                    filter_out_low_weights(ui.value);
                }
            });
            
           
    });
          

    
	// bind actions from graph_actions.js
	s.bind('overNode', hover_node);
    s.bind('outNode', unhover_node);
    s.bind('clickStage', click_stage);
    s.bind('clickNode', click_node);

    
}
