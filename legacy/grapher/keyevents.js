var nonamednodecounter = 0;
window.addEventListener("keypress", function() {
    var keynum = this.event.keyCode;
    key = String.fromCharCode(keynum);

    if (key == "n") {
        var val = this.prompt("Enter Node Value");
        if (val == null || val == "") {
            val = String.fromCharCode(65 + nonamednodecounter); //Incrementing A
            nonamednodecounter++;
            if (nonamednodecounter == 90) { nonamednodecounter = 130 }
            (val);
        }
        var nl = nodelist.length;
        nodelist.push(new Node((50 * (nl + 1) % width), 75, val, []));
        graph[val] = []
    }

    if (key == "d") { //delete node

        var removes = true;
        while (removes) { //while we have removed edges
            removes = false;
            for (let i in edgelist) { //loop through every edge
                edge = edgelist[i];
                (edgelist);
                //if its connected to the node we are removing, remove it
                if ((edge.to.value == clickednode[0].value) || (edge.from.value == clickednode[0].value)) {
                    edgelist.splice(i, 1);
                    removes = true; // loop again
                    break; //break, as the index is no longer valid.
                }
            }
        }

        for (var i in nodelist) {
            if (nodelist[i] == clickednode[0]) {
                nodelist.splice(i, 1);
            }
        }

        for (n in graph) {
            var index = graph[n].indexOf(clickednode[0].value);
            if (index > -1) {
                graph[n].splice(index, 1);
            }
        }

        delete graph[clickednode[0].value]
        clickednode = [];

    }

    if (key == "b") {
        let start = document.getElementById("startnodeselect");
        let end = document.getElementById("endnodeselect");
        let start_value = start.value;
        let end_value = end.value;

        for (let node of nodelist) {
            if (node.value == start_value) {
                clickednode[0] = node;
                break;
            }
        }

        for (let node of nodelist) {
            if (node.value == end_value) {
                clickednode[1] = node;
                break;
            }
        }
        clickednode[0].color = "red";

        var algorithm_dropdown = document.getElementById("algoselectdrop");
        var algorithm_to_use = algorithm_dropdown.value
        switch (algorithm_to_use) {
            case "DFS":
                result = depth_first_traversal(graph, start_value);
            case "BFS":
                result = breadth_first_traversal(graph, start_value);
            case "DJI":
                [result, result_path] = djisktras_shortest_path(graph, start_value, end_value);
        }
        clickednode = [];
    }

    if (key == "r") {
        for (let node of nodelist) {
            node.color = foregroundColor;
        }
        selected_node = false;
        clickednode = [];
    }
})