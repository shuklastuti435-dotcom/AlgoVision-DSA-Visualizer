
function showMessage(algorithm) {
    alert(algorithm + " visualizer will be added next!");
}

const arrayInput = document.getElementById("arrayInput");
const targetInput = document.getElementById("targetInput");
const arrayContainer = document.getElementById("arrayContainer");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resetBtn = document.getElementById("resetBtn");
const statusText = document.getElementById("status");

let steps = [];
let currentStep = 0;

function createSteps(arr, target) {
    const result = [];
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        result.push({
            left,
            mid,
            right,
            message:` Checking index ${mid}, value ${arr[mid]}.`
        });

        if (arr[mid] === target) {
            result.push({
                left: mid,
                mid,
                right: mid,
                found: true,
                message: `Target ${target} found at index ${mid}!`
            });
            return result;
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    result.push({
        left: -1,
        mid: -1,
        right: -1,
        notFound: true,
        message: `Target ${target} was not found in the array.`
    });

    return result;
}

function renderStep() {
    const step = steps[currentStep];
    const arr = arrayInput.value.split(",").map(Number);

    arrayContainer.innerHTML = "";

    arr.forEach((value, index) => {
        const box = document.createElement("div");
        box.className = "array-item";
        box.textContent = value;

        if (step.found && index === step.mid) {
            box.classList.add("found");
        } else if (!step.notFound) {
            if (index === step.left) box.classList.add("start");
            if (index === step.mid) box.classList.add("mid");
            if (index === step.right) box.classList.add("end");
        }

        arrayContainer.appendChild(box);
    });

    statusText.textContent =
       `Step ${currentStep + 1}/${steps.length}: ${step.message}`;

    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = currentStep === steps.length - 1;
}

startBtn.addEventListener("click", function () {
    const rawValues = arrayInput.value.trim();
    const targetText = targetInput.value.trim();

    if (rawValues === "" || targetText === "") {
        statusText.textContent = "Please enter an array and a target.";
        return;
    }

    const arr = rawValues.split(",").map(Number);
    const target = Number(targetText);

    if (
        arr.some(value => !Number.isFinite(value)) ||
        !Number.isFinite(target)
    ) {
        statusText.textContent = "Please enter valid numbers.";
        return;
    }

    if (arr.some((value, index) => index > 0 && value < arr[index - 1])) {
        statusText.textContent = "Please enter a sorted array in ascending order.";
        return;
    }

    steps = createSteps(arr, target);
    currentStep = 0;
    renderStep();
});

nextBtn.addEventListener("click", function () {
    if (currentStep < steps.length - 1) {
        currentStep++;
        renderStep();
    }
});

prevBtn.addEventListener("click", function () {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
});

resetBtn.addEventListener("click", function () {
    steps = [];
    currentStep = 0;
    arrayContainer.innerHTML = "";
    statusText.textContent = "Enter a target and click Start Search.";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
});
// Bubble Sort Visualizer

const sortArrayInput = document.getElementById("sortArrayInput");
const sortArrayContainer = document.getElementById("sortArrayContainer");
const sortStartBtn = document.getElementById("sortStartBtn");
const sortNextBtn = document.getElementById("sortNextBtn");
const sortPrevBtn = document.getElementById("sortPrevBtn");
const sortResetBtn = document.getElementById("sortResetBtn");
const sortStatus = document.getElementById("sortStatus");

let sortSteps = [];
let sortCurrentStep = 0;
let originalSortArray = [];

function createBubbleSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    steps.push({
        array: [...a],
        comparing: [],
        sorted: [],
        message: "Starting Bubble Sort."
    });

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {

            steps.push({
                array: [...a],
                comparing: [j, j + 1],
                sorted: Array.from(
                    { length: i },
                    (_, index) => n - 1 - index
                ),
                message: `Comparing ${a[j]} and ${a[j + 1]}.`
            });

            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];

                steps.push({
                    array: [...a],
                    comparing: [j, j + 1],
                    sorted: Array.from(
                        { length: i },
                        (_, index) => n - 1 - index
                    ),
                    message: `Swapped ${a[j]} and ${a[j + 1]}.`
                });
            }
        }
    }

    steps.push({
        array: [...a],
        comparing: [],
        sorted: Array.from({ length: n }, (_, index) => index),
        message: "Sorting complete! The array is sorted."
    });

    return steps;
}

function renderBubbleSortStep() {
    const step = sortSteps[sortCurrentStep];

    sortArrayContainer.innerHTML = "";

    step.array.forEach((value, index) => {
        const box = document.createElement("div");

        box.className = "array-item";
        box.textContent = value;

        if (step.sorted.includes(index)) {
            box.classList.add("sorted");
        }

        if (step.comparing.includes(index)) {
            box.classList.remove("sorted");
            box.classList.add("comparing");
        }

        sortArrayContainer.appendChild(box);
    });

    sortStatus.textContent =
        `Step ${sortCurrentStep + 1}/${sortSteps.length}: ${step.message}`;

    sortPrevBtn.disabled = sortCurrentStep === 0;
    sortNextBtn.disabled = sortCurrentStep === sortSteps.length - 1;
}

sortStartBtn.addEventListener("click", function () {
    const input = sortArrayInput.value.trim();

    if (input === "") {
        sortStatus.textContent = "Please enter an array.";
        return;
    }

    const arr = input.split(",").map(value => value.trim());

    if (arr.some(value => value === "" || !Number.isFinite(Number(value)))) {
        sortStatus.textContent = "Please enter valid numbers separated by commas.";
        return;
    }

    originalSortArray = arr.map(Number);

    sortSteps = createBubbleSortSteps(originalSortArray);
    sortCurrentStep = 0;

    renderBubbleSortStep();
});

sortNextBtn.addEventListener("click", function () {
    if (sortCurrentStep < sortSteps.length - 1) {
        sortCurrentStep++;
        renderBubbleSortStep();
    }
});

sortPrevBtn.addEventListener("click", function () {
    if (sortCurrentStep > 0) {
        sortCurrentStep--;
        renderBubbleSortStep();
    }
});

sortResetBtn.addEventListener("click", function () {
    sortSteps = [];
    sortCurrentStep = 0;

    sortArrayContainer.innerHTML = "";
    sortStatus.textContent = "Enter an array and click Start Sorting.";

    sortPrevBtn.disabled = true;
    sortNextBtn.disabled = true;
});
const stackInput = document.getElementById("stackInput");
const stackContainer = document.getElementById("stackContainer");
const pushBtn = document.getElementById("pushBtn");
const popBtn = document.getElementById("popBtn");
const stackStatus = document.getElementById("stackStatus");

let stack = [];

function renderStack() {
    stackContainer.innerHTML = "";

    stack.forEach(function (value) {
        const box = document.createElement("div");

        box.className = "stack-item";
        box.textContent = value;

        stackContainer.appendChild(box);
    });
}

pushBtn.addEventListener("click", function () {
    const value = stackInput.value.trim();

    if (value === "") {
        stackStatus.textContent = "Please enter an element first!";
        return;
    }

    stack.push(value);

    renderStack();

    stackStatus.textContent =
        `${value} pushed onto the stack. Stack size: ${stack.length}`;

    stackInput.value = "";
});

popBtn.addEventListener("click", function () {
    if (stack.length === 0) {
        stackStatus.textContent = "Stack is empty! Nothing to pop.";
        return;
    }

    const removed = stack.pop();

    renderStack();

    stackStatus.textContent =
        `${removed} popped from the stack. Stack size: ${stack.length}`;
});


// ================================
// QUEUE VISUALIZER
// ================================

const queueInput = document.getElementById("queueInput");
const queueContainer = document.getElementById("queueContainer");
const enqueueBtn = document.getElementById("enqueueBtn");
const dequeueBtn = document.getElementById("dequeueBtn");
const queueStatus = document.getElementById("queueStatus");

let queue = [];

function renderQueue() {
    queueContainer.innerHTML = "";

    queue.forEach(function (value) {
        const box = document.createElement("div");

        box.className = "queue-item";
        box.textContent = value;

        queueContainer.appendChild(box);
    });
}

enqueueBtn.addEventListener("click", function () {
    const value = queueInput.value.trim();

    if (value === "") {
        queueStatus.textContent = "Please enter an element first!";
        return;
    }

    queue.push(value);

    renderQueue();

    queueStatus.textContent =
        `${value} added to the queue. Queue size: ${queue.length}`;

    queueInput.value = "";
});

dequeueBtn.addEventListener("click", function () {
    if (queue.length === 0) {
        queueStatus.textContent = "Queue is empty! Nothing to dequeue.";
        return;
    }

    const removed = queue.shift();

    renderQueue();

    queueStatus.textContent =
        `${removed} removed from the queue. Queue size: ${queue.length}`;
});
let linkedList = [];
let traversalTimer = null;

const nodeValueInput = document.getElementById("nodeValue");
const nodePositionInput = document.getElementById("nodePosition");

const linkedListNodes = document.getElementById("linkedListNodes");
const linkedListStatus = document.getElementById("linkedListStatus");

const insertNodeBtn = document.getElementById("insertNodeBtn");
const deleteNodeBtn = document.getElementById("deleteNodeBtn");
const traverseBtn = document.getElementById("traverseBtn");


// Stop traversal animation
function stopTraversal() {
    if (traversalTimer !== null) {
        clearInterval(traversalTimer);
        traversalTimer = null;
    }
}


// Display linked list nodes
function renderLinkedList() {
    linkedListNodes.innerHTML = "";

    linkedList.forEach((value, index) => {
        const node = document.createElement("div");
        node.className = "linked-node";
        node.dataset.index = index;

        const box = document.createElement("div");
        box.className = "node-box";
        box.textContent = value;

        node.appendChild(box);

        if (index < linkedList.length - 1) {
            const arrow = document.createElement("span");
            arrow.className = "node-arrow";
            arrow.textContent = "→";

            node.appendChild(arrow);
        }

        linkedListNodes.appendChild(node);
    });
}


// Insert a node
insertNodeBtn.addEventListener("click", function () {
    stopTraversal();

    const value = nodeValueInput.value.trim();
    const position = Number(nodePositionInput.value);

    if (value === "") {
        linkedListStatus.textContent = "Please enter a node value.";
        return;
    }

    if (
        nodePositionInput.value.trim() === "" ||
        !Number.isInteger(position) ||
        position < 0 ||
        position > linkedList.length
    ) {
        linkedListStatus.textContent =
            `Enter a position between 0 and ${linkedList.length}.`;
        return;
    }

    linkedList.splice(position, 0, Number(value));

    renderLinkedList();

    linkedListStatus.textContent =
        `Node ${value} inserted at position ${position}.`;

    nodeValueInput.value = "";
});


// Delete a node
deleteNodeBtn.addEventListener("click", function () {
    stopTraversal();

    const position = Number(nodePositionInput.value);

    if (
        linkedList.length === 0 ||
        nodePositionInput.value.trim() === "" ||
        !Number.isInteger(position) ||
        position < 0 ||
        position >= linkedList.length
    ) {
        linkedListStatus.textContent =
            "Invalid position! Enter a position of an existing node.";
        return;
    }

    const deletedValue = linkedList[position];

    linkedList.splice(position, 1);

    renderLinkedList();

    linkedListStatus.textContent =
        `Node ${deletedValue} deleted from position ${position}.`;
});


// Traverse the linked list
traverseBtn.addEventListener("click", function () {
    stopTraversal();

    if (linkedList.length === 0) {
        linkedListStatus.textContent = "The linked list is empty!";
        return;
    }

    let index = 0;

    const nodes = linkedListNodes.querySelectorAll(".linked-node");

    function highlightNode() {
        nodes.forEach(node => {
            node.classList.remove("highlight");
        });

        if (index < linkedList.length) {
            nodes[index].classList.add("highlight");

            linkedListStatus.textContent =
                `Visiting position ${index}: value = ${linkedList[index]}`;

            index++;
        } else {
            stopTraversal();

            linkedListStatus.textContent =
                `Traversal complete! List: ${linkedList.join(" → ")} → NULL`;
        }
    }

    highlightNode();

    traversalTimer = setInterval(highlightNode, 800);
});
let bstRoot = null;
let treeSearchTimer = null;

const treeValueInput = document.getElementById("treeValue");
const insertTreeBtn = document.getElementById("insertTreeBtn");
const searchTreeBtn = document.getElementById("searchTreeBtn");
const resetTreeBtn = document.getElementById("resetTreeBtn");
const treeContainer = document.getElementById("treeContainer");
const treeStatus = document.getElementById("treeStatus");


// Create a new node
function createTreeNode(value) {
    return {
        value: value,
        left: null,
        right: null
    };
}


// Insert a value into the BST
function insertBST(root, value) {
    if (root === null) {
        return createTreeNode(value);
    }

    if (value < root.value) {
        root.left = insertBST(root.left, value);
    } else if (value > root.value) {
        root.right = insertBST(root.right, value);
    }

    return root;
}


// Draw the Binary Search Tree with connecting lines
function renderBST() {
    treeContainer.innerHTML = "";

    if (bstRoot === null) {
        const message = document.createElement("p");
        message.className = "tree-placeholder";
        message.textContent =
            "Insert a value to create your Binary Search Tree.";

        treeContainer.appendChild(message);
        return;
    }

    const svgNS = "http://www.w3.org/2000/svg";

    const width = Math.max(treeContainer.clientWidth - 50, 500);
    const levelHeight = 100;
    const radius = 22;

    const positions = [];
    let nextX = 0;
    let maxDepth = 0;

    // Calculate each node's position
    function calculatePositions(node, depth) {
        if (node === null) {
            return;
        }

        maxDepth = Math.max(maxDepth, depth);

        calculatePositions(node.left, depth + 1);

        positions.push({
            node: node,
            x: nextX,
            y: depth * levelHeight + 40
        });

        nextX += 1;

        calculatePositions(node.right, depth + 1);
    }

    calculatePositions(bstRoot, 0);

    const totalNodes = positions.length;
    const gap = Math.max(75, width / Math.max(totalNodes, 1));

    const svgWidth = Math.max(width, totalNodes * gap + 40);
    const svgHeight = (maxDepth + 1) * levelHeight + 40;

    const svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    svg.style.display = "block";
    svg.style.margin = "0 auto";

    const nodePositions = new Map();

    positions.forEach(function (item, index) {
        nodePositions.set(item.node, {
            x: 30 + index * gap,
            y: item.y
        });
    });

    // Draw branches first so they appear behind nodes
    positions.forEach(function (item) {
        const parentPos = nodePositions.get(item.node);

        [item.node.left, item.node.right].forEach(function (child) {
            if (child !== null) {
                const childPos = nodePositions.get(child);

                const line = document.createElementNS(svgNS, "line");

                line.setAttribute("x1", parentPos.x);
                line.setAttribute("y1", parentPos.y);
                line.setAttribute("x2", childPos.x);
                line.setAttribute("y2", childPos.y);
                line.setAttribute("stroke", "#a78bfa");
                line.setAttribute("stroke-width", "2");

                svg.appendChild(line);
            }
        });
    });

    // Draw nodes
    positions.forEach(function (item) {
        const pos = nodePositions.get(item.node);

        const circle = document.createElementNS(svgNS, "circle");

        circle.setAttribute("cx", pos.x);
        circle.setAttribute("cy", pos.y);
        circle.setAttribute("r", radius);
        circle.setAttribute("fill", "#7045ed");
        circle.setAttribute("stroke", "#c4b5fd");
        circle.setAttribute("stroke-width", "2");
        circle.setAttribute("class", "tree-node");
        circle.setAttribute("data-value", item.node.value);

        svg.appendChild(circle);

        const text = document.createElementNS(svgNS, "text");

        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-size", "13");
        text.setAttribute("font-weight", "bold");
        text.setAttribute("pointer-events", "none");
        text.textContent = item.node.value;

        svg.appendChild(text);
    });

    treeContainer.appendChild(svg);
}



// Insert button
insertTreeBtn.addEventListener("click", function () {
    stopTreeSearch();

    const valueText = treeValueInput.value.trim();
    const value = Number(valueText);

    if (valueText === "" || !Number.isFinite(value)) {
        treeStatus.textContent = "Please enter a valid number.";
        return;
    }

    if (bstContains(bstRoot, value)) {
        treeStatus.textContent =
            `${value} already exists. Duplicate values are not inserted.`;
        return;
    }

    bstRoot = insertBST(bstRoot, value);

    renderBST();

    treeStatus.textContent = `${value} inserted into the Binary Search Tree.`;

    treeValueInput.value = "";
});


// Check whether a value already exists
function bstContains(root, value) {
    while (root !== null) {
        if (value === root.value) {
            return true;
        }

        if (value < root.value) {
            root = root.left;
        } else {
            root = root.right;
        }
    }

    return false;
}


// Stop an existing search animation
function stopTreeSearch() {
    if (treeSearchTimer !== null) {
        clearInterval(treeSearchTimer);
        treeSearchTimer = null;
    }
}


// Search button
searchTreeBtn.addEventListener("click", function () {
    stopTreeSearch();

    const valueText = treeValueInput.value.trim();
    const target = Number(valueText);

    if (valueText === "" || !Number.isFinite(target)) {
        treeStatus.textContent = "Enter a value to search.";
        return;
    }

    if (bstRoot === null) {
        treeStatus.textContent = "The tree is empty!";
        return;
    }

    const path = [];
    let current = bstRoot;

    while (current !== null) {
        path.push(current.value);

        if (current.value === target) {
            break;
        }

        if (target < current.value) {
            current = current.left;
        } else {
            current = current.right;
        }
    }

    let index = 0;

    const circles = treeContainer.querySelectorAll(".tree-node");

    function highlightNext() {
        circles.forEach(function (circle) {
            circle.classList.remove("highlight");
        });

        if (index >= path.length) {
            stopTreeSearch();

            if (path[path.length - 1] === target) {
                treeStatus.textContent =
                    `Found ${target}! Search path: ${path.join(" → ")}`;
            } else {
                treeStatus.textContent =
                    `${target} not found. Search path: ${path.join(" → ")}`;
            }

            return;
        }

        const currentValue = path[index];

        circles.forEach(function (circle) {
            if (Number(circle.dataset.value) === currentValue) {
                circle.classList.add("highlight");
            }
        });

        treeStatus.textContent =
            `Step ${index + 1}: Checking node ${currentValue} for ${target}.`;

        index++;
    }

    highlightNext();
    treeSearchTimer = setInterval(highlightNext, 800);
});


// Reset button
resetTreeBtn.addEventListener("click", function () {
    stopTreeSearch();

    bstRoot = null;

    renderBST();

    treeStatus.textContent = "Tree reset successfully.";
    treeValueInput.value = "";
});
