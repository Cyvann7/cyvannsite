//* All algorithms should take:
//* 	- a graph as an adjacency matrix
//*  	- a starting node
//*
//* They should return:
//* 	- the order of traversal as an array
//*  	- the string "DONE" at the end of the array
//* 
//* They should work with a cyclic graph.
//* Directed or undirected


function depth_first_traversal(graph, s) {
    var stack = [s];
    var final_stack = [];
    var visited = new Set();

    while (stack.length > 0) {
        var current = stack.pop();
        final_stack.push(current);
        for (let [neighbour, _w] of graph[current]) {
            if (!visited.has(neighbour)) {
                stack.push(neighbour);
                visited.add(neighbour);
            }
        }
    }

    final_stack.push("DONE")
    return final_stack;
}

function breadth_first_traversal(graph, s) {
    var queue = [s];
    var final_stack = [];
    var visited = new Set();
    while (queue.length > 0) {
        var current = queue.shift();
        final_stack.push(current);

        for (let [neighbour, _w] of graph[current]) {
            if (!visited.has(neighbour)) {
                queue.push(neighbour);
                visited.add(neighbour);
            }
        }
    }

    final_stack.push("DONE")
    return final_stack;
}

function djisktras_shortest_path(graph, start, end) {
    let distances = new Set();
    let path = new Set();
    let visited = new Set();
    let queue = [start];
    let traversal = [];
    for (node in graph) {
        distances[node] = Infinity;
        path[node] = [];
    }
    distances[start] = 0;
    path[start] = start;


    let c = 0;
    while (queue.length > 0) {
        c++;
        let u = queue.shift();
        //for every node, look at the neighbours and record their distances
        for (let [neighbour, weight] of graph[u]) {
            if (!visited.has(neighbour)) {
                traversal.push(neighbour);
                queue.push(neighbour);
                visited.add(neighbour);
            }
            let dist_from_node = distances[u] + weight;
            if (dist_from_node < distances[neighbour]) {
                distances[neighbour] = dist_from_node;
                path[neighbour] = path[u] + neighbour;
            }
        }





        if (c > 1000) { break; }
    }
    return [traversal, path[end].split("")];
}