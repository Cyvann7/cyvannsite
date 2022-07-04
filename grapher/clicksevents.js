window.addEventListener("click", function() {
    //linear search through all nodes to see if there is a node with the given x/y position
    var mousex = this.event.x - 15; //adjust for canvas not being center of page
    var mousey = this.event.y - 60;
    var nodeclicked = false;

    for (let i in nodelist) {
        var node = nodelist[i];
        var nr = 30; //node radius
        if ((mousex > node.x - nr && mousex < node.x + nr) && (mousey > node.y - nr && mousey < node.y + nr)) {
            node.color = "#ffff00";
            clickednode.push(node);
            nodeclicked = true;
            break;
        }
    }
    if (nodeclicked == false) {
        if (clickednode.length == 1) {
            clickednode[0].x = mousex;
            clickednode[0].y = mousey;
            clickednode[0].color = foregroundColor;
        }
        clickednode = [];
    }

    if (clickednode.length == 2) {
        var two_way_edge = false;
        for (let i in clickednode) {
            clickednode[i].color = foregroundColor;
        }
        var pathexists = false;
        for (let i in edgelist) {
            edge = edgelist[i];
            if (edge.to == clickednode[0] && edge.from == clickednode[1]) {
                two_way_edge = true; //graphical only
            }
            if (edge.to == clickednode[1] && edge.from == clickednode[0]) {
                pathexists = true;
                edgelist.splice(i, 1);

                let t = graph[edge.from.value];
                graph[edge.from.value].splice(t.indexOf([edge.to.value, edge.weight]), 1);


                break;
            }
        }
        if (!pathexists) { //! Create New Edge
            var w = this.prompt("Enter Edge Weight (Note that this may not be used for some algorithms)");


            if (w != parseInt(w, 10)) { w = 0; }
            let edge_to_add = new Edge(clickednode[0], clickednode[1], w)
            if (two_way_edge == true) { edge_to_add.two_way = true; }
            edgelist.push(edge_to_add);

            graph[clickednode[0].value].push([clickednode[1].value, w]);
        }
        clickednode = [];
    }
    (mousex, mousey);
})