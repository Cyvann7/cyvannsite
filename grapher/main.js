//init canvas

const canvas = document.getElementById('canvas');
const width = canvas.width = window.innerWidth - 60;
const height = canvas.height = window.innerHeight - 120;
const ctx = canvas.getContext('2d');

const backgroundColor = "#16111b";
const foregroundColor = "#e0e0e0";
const outlineColor = "#555555";

const pi = Math.PI;
const pi2 = 2 * pi

function openTab(evt, tabname) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabname).style.display = "block";
    evt.currentTarget.className += " active";

    if (tabname == "Algorithm") {
        s = ""
        for (let node of nodelist) {
            s += "<option class=\"sel\" value=\"" + String(node.value) + "\">" + String(node.value) + "</option>";
        }
        document.getElementById("startnodeselect").innerHTML = s;
        document.getElementById("endnodeselect").innerHTML = s;
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


ctx.fillStyle = backgroundColor;
ctx.fillRect(0, 0, width, height);

function adjlist_to_node_objects(g) {
    var nodelist = [];
    var edgelist = [];
    var nodeposx = 50;
    var nodeposy = 50;
    //make nodes
    for (var node in g) {
        nodelist.push(new Node(nodeposx, nodeposy, node, g[node]));
        nodeposx += 100;
        if ((nodeposx - 50) % 150 == 0) {
            nodeposy += 100;
            nodeposx = 50;
        }
    }
    ("NODES:", nodelist);

    //make edges
    for (var n in nodelist) {
        node = nodelist[n];
        for (var ne in node.neighbours) {

            neighbour = node.neighbours[ne][0]; //node value
            var from = node;
            var to;

            //linear search for to node
            for (var ni in nodelist) {
                if (nodelist[ni].value == neighbour) {
                    to = nodelist[ni];
                    break;
                }
            }

            var weight = neighbour = node.neighbours[ne][1];
            var edge = new Edge(from, to, weight)

            edgelist.push(edge);
        }
    }

    ("EDGES:", edgelist);
    return [nodelist, edgelist];
}

//adj list to represent graph
var graph = {
    "A": [
        ["B", 3],
        ["C", 1],
    ],
    "B": [
        ["A", 3],
        ["C", 7],
        ["D", 5],
        ["E", 1],
    ],
    "C": [
        ["A", 1],
        ["B", 7],
        ["D", 2],
    ],
    "D": [
        ["B", 5],
        ["C", 2],
        ["E", 7],
    ],
    "E": [],
}

var [nodelist, edgelist] = graph_objects = adjlist_to_node_objects(graph);

result = [];
result_path = [];
ri = 0;


function draw() {

    window.requestAnimationFrame(draw);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '3vw Recursive, sans-serif';

    //Draw all the nodes
    for (let e in edgelist) {
        edge = edgelist[e];
        edge.draw();
    }
    for (let n in nodelist) {
        node = nodelist[n];
        node.draw();
    }

    //draw the traversal
    if (result.length > 0) {
        resultant = result.shift(); //pop front
        if (resultant != "DONE") {
            for (let n of nodelist) {
                if (n.value == resultant) {
                    n.color = "#ff0000";
                }
            }
        }
        sleep(500);
    }

    //Once finsished drawing the traversal, draw the path (if there is one)
    if (result.length == 0 && result_path.length > 0) {
        resultant = result_path.shift(); //pop front
        if (resultant != "DONE") {
            for (let n of nodelist) {
                if (n.value == resultant) {
                    n.color = "#00ff00";
                }
            }
        }
        sleep(500);
    }
}

var selected_node = false;
var clickednode = [];


draw();