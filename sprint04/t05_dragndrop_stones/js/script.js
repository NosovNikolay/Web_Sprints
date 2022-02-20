let mainDiv = document.getElementById("mainDiv");
let state = {
    target: null
}

function takeSquare(event) {
    if (event.target && event.target.classList.contains("square") && event.target.getAttribute("movable") == "true") {
        event.target.style.cursor = "none";
        state.target = event.target;
        state.offsetX = event.offsetX;
        state.offsetY = event.offsetY;
    }
}

function dropSquare(event) {
    event.target.style.cursor = "default";
    state.target = null;
}

function dragSquare(event) {
    if (state.target) {
        state.target.style.left = (event.pageX - state.offsetX) + "px";
        state.target.style.top = (event.pageY - state.offsetY) + "px";
    }
}

function movableSquare(event) {
    if (event.target && event.target.classList.contains("square")) {
        if (event.target.getAttribute("movable") == "true")
            event.target.setAttribute("movable", "false");
        else
            event.target.setAttribute("movable", "true");
    }
}


mainDiv.addEventListener("mousedown", takeSquare);

mainDiv.addEventListener("mousemove", dragSquare);

mainDiv.addEventListener("mouseup", dropSquare);

mainDiv.addEventListener("dblclick", movableSquare);