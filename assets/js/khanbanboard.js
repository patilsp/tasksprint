var countTask = 0,
    taskItem = 0,
    closeIcon = '<svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg>',
    closeSmall = '<svg height="10px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="10px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg>';

var taskList = {
    "task_01": {
        "name": "To-Do",
        "task_items": {
            "items_001": {
                "name": "Ui/UX Research",
                "desc": "\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ratione minima quibusdam eligendi vitae voluptate eum suscipit quasi perspiciatis at expedita, rerum quos est tempore, aliquam deleniti nobis nisi deserunt.",
                "priority": "medium"
            },
            "items_002": {
                "name": "BackEnd Developing",
                "desc": "\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ratione minima quibusdam eligendi vitae voluptate eum suscipit quasi perspiciatis at expedita, rerum quos est tempore, aliquam deleniti nobis nisi deserunt.",
                "priority": "low"
            },
            "items_003": {
                "name": "Api required for login",
                "desc": "\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ratione minima quibusdam eligendi vitae voluptate eum suscipit quasi perspiciatis at expedita, rerum quos est tempore, aliquam deleniti nobis nisi deserunt.",
                "priority": "high"
            }
        }
    },
    "task_02": {
        "name": "In-Progress",
        "task_items": {

        }
    },
    "task_03": {
        "name": "Review",
        "task_items": {
            "items_004": {
                "name": "Bug fixing in Api ",
                "desc": "\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ratione minima quibusdam eligendi vitae voluptate eum suscipit quasi perspiciatis at expedita, rerum quos est tempore, aliquam deleniti nobis nisi deserunt.",
                "priority": "high"
            }
        }
    },
    "task_04": {
        "name": "Done",
        "task_items": {
            "items_005": {
                "name": "SRR Documentation",
                "desc": "\r\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime ratione minima quibusdam eligendi vitae voluptate eum suscipit quasi perspiciatis at expedita, rerum quos est tempore, aliquam deleniti nobis nisi deserunt.",
                "priority": "low"
            }
        }
    }
};

Object.size = function (obj) {
    var size,
        key;
    size = 0
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

taskList = getTask("task_board") ? JSON.parse(getTask("task_board")) : taskList;
countTask = Object.size(taskList);

Init(taskList);
function Init(taskList) {
    var i, j;
    for (i in taskList) {
        $(".btn-board").before(createTaskboard(taskList[i].name, i));
        for (j in taskList[i].task_items) {
            $("[task-board=" + i + "]").append(createTask(taskList[i].task_items[j], j));

        }
    }
    setTask(taskList);
}

function serach(value) {
    var filter,
        i, li,
        txtValue;
    filter = value.toUpperCase();
    li = $("li");
    for (i = 0; i < li.length; i++) {
        txtValue = $(li[i]).find("h4").text();
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("parent_id", $(ev.target.closest("ul")).attr("task-board"));
}

function drop(ev) {
    ev.preventDefault();
    var data,
        prev_id,
        new_id;

    data = ev.dataTransfer.getData("text");
    prev_id = ev.dataTransfer.getData("parent_id");

    if ($(ev.target).closest("li").length > 0) {
        $(ev.target).closest("li").before(document.getElementById(data));

    } else {
        $(ev.target).closest("ul").append(document.getElementById(data));
    }
    new_id = $(ev.target).closest("ul").attr('task-board');
    taskList[new_id]['task_items'][data] = taskList[prev_id]['task_items'][data];
    delete taskList[prev_id]['task_items'][data];
    setTask(taskList);

}
function createTaskboard(title, id) {
    var taskBoard, taskList_content;

    taskList_content = '<div class="header"><h2>' + title + '</h2>' +
        '<div class="d-flex"><button id="' + id + '" class="add-task">Add Task </button>' +
        '<button class="task-close">' +
        '<svg height="14px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="14px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"/><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"/></svg>'
        + '</button></div></div>' +
        '<ul task-board="' + id + '" class="list" ondrop="drop(event)" ondragover="allowDrop(event)"></ul> ';

    taskBoard = document.createElement("div");
    $(taskBoard).html(taskList_content).addClass("task-list");
    countTask++;
    return taskBoard;
}
function createTask({ name, priority, desc }, id) {
    var li;

    li = '<li id="' + id + '" draggable="true" ondragstart="drag(event)" class="task-item">' +
        '<h4>' + name + '</h4>' +
        '<p>' + desc + '</p><span class="task-item-close">' +
        '<svg height="10px" style="margin-top:3px" viewBox="0 0 311 311.07733" width="10px" xmlns="http://www.w3.org/2000/svg"><path d="m16.035156 311.078125c-4.097656 0-8.195312-1.558594-11.308594-4.695313-6.25-6.25-6.25-16.382812 0-22.632812l279.0625-279.0625c6.25-6.25 16.382813-6.25 22.632813 0s6.25 16.382812 0 22.636719l-279.058594 279.058593c-3.136719 3.117188-7.234375 4.695313-11.328125 4.695313zm0 0"></path><path d="m295.117188 311.078125c-4.097657 0-8.191407-1.558594-11.308594-4.695313l-279.082032-279.058593c-6.25-6.253907-6.25-16.386719 0-22.636719s16.382813-6.25 22.636719 0l279.058594 279.0625c6.25 6.25 6.25 16.382812 0 22.632812-3.136719 3.117188-7.230469 4.695313-11.304687 4.695313zm0 0"></path></svg></span>' +
        '<span class="status ' + priority + '">' + priority + '</span></li>';
    li = $.parseHTML(li);
    taskItem++;
    return li;
}
/**
 *  create Dom by json
 *
 * @param   {[type]}  val     [val description]
 * @param   {[type]}  parent  [parent description]
 *
 * @return  {[type]}          [return description]
 */
function createViews(val, parent = null) {
    var i, j, s, node;

    for (i in val) {

        s = val[i]; node = document.createElement(val[i].tagName);
        node.setAttribute("id", i);

        if (val[i].children) {
            createViews(val[i].children, node);
        }
        for (j in s) {
            if (j.localeCompare("children") != 0) {
                if (j === "text") {
                    node.innerHTML = s[j];
                }
                else if (j != "tagName") {
                    node.setAttribute(j, s[j]);
                }
            }
        }
        if (parent != null) {
            if (parent.firstElementChild == null) {
                parent.appendChild(node);
            }
            else {
                parent.insertBefore(node, parent.firstElementChild.nextSibling);
            }
        }
    }
    return node;
}

function setTask(value) {
    localStorage.setItem("task_board", JSON.stringify(value));
}

function getTask(val) {
    var x = localStorage.getItem(val);
    return x;
}

function JsontoHTML(val, parent) {
    var i, s, j, node;

    for (i in val) {
        s = val[i];
        node = document.createElement(i);
        for (j in s) {
            if (j !== "child") {
                node.setAttribute(j, s[j]);
            }
            else {
                createViews(s[j], node);
            }
        }
    }
    parent.appendChild(node);
}





$(".board")
    .on("click", ".task-close", function (e) {
        if (confirm(" Are you sure want to delete Task board")) {
            var temp, ids;
            temp = $(e.target).closest(".task-list");
            ids = $(temp).find("[task-board]").attr("task-board");
            delete taskList[ids];
            temp.remove();
            setTask(taskList);
        }
    })
    .on("click", ".task-item-close", function (e) {
        if (confirm(" Are you sure want to delete Task")) {
            var li,
                taskBoard,
                itemId;

            li = $(e.target).closest(".task-item");
            taskBoard = $(li.closest("ul")).attr("task-board");
            itemId = $(li).attr("id");
            delete taskList[taskBoard]["task_items"][itemId];
            li.remove();
            setTask(taskList);
        }
    })
    .on("click", ".task-item", function (e) {
        var items_id,
            parent_id,
            editVal;
        items_id = $(e.target).closest("li").attr("id");
        parent_id = $(e.target).closest("ul").attr("task-board");

        editVal = taskList[parent_id]['task_items'][items_id];

        $("#edit-task").attr("data-target", parent_id)
            .attr("data-task-id", items_id);

        $("#edit-task [name='title']").val(editVal.name);
        $("#edit-task [name='desc']").val(editVal.desc);
        $("#edit-task [name='priority']").val(editVal.priority);
        $("#edit-task").show();
    })
    .on("click", ".add-task", function (e) {
        $("#new-task").attr("data-target", $(e.target).attr("id"));
        $("#new-task").show();
    });


$("#update-task").on("click", function (e) {
    var val, values;
    val = $("#editfrm-task").serializeArray();
    values = {
        name: val[0].value,
        desc: val[1].value,
        priority: val[2].value
    };

    var task_item = $("#edit-task").attr("data-task-id")
    target = $("#edit-task").attr("data-target");

    taskList[target]["task_items"][task_item] = values;
    $("#" + task_item).replaceWith(createTask(values, task_item));
    setTask(taskList);
    $("#edit-task").hide();
});


$(".popup .close").on("click", function (e) {
    $(".popup").hide();
})

$(".add-task-board").on("click", function (e) {
    $("#new-task-board").show();

});

$("#new-task-board .primary").on("click", function (e) {
    var title, taskB_id;
    title = $("[name='task-board-title']").val();
    taskB_id= "task_" + countTask;
    $(".btn-board").before(createTaskboard(title, taskB_id));
    taskList[taskB_id] = {
        name: title,
        task_items: {
        }
    };
    setTask(taskList);
    $("[name='task-board-title']").val("");
    $("#new-task-board").hide();

});



$("#search-input").keyup(function (e) {
    var search;
    search = e.target.value
    serach(search);
});

$("#bt-task").on("click", function (e) {
    var val,
        item,
        target,
        values;
    val = $("#add-task").serializeArray();
    values = {
        name: val[0].value,
        desc: val[1].value,
        priority: val[2].value
    };

    item = createTask(values, "items_00" + taskItem);
    target = $("#new-task").attr("data-target");
    console.log(target);
    console.log(taskList[target]);
    taskList[target]["task_items"]["items_00" + taskItem] = values;

    setTask(taskList);
    $("[task-board='" + target + "']").prepend(item);
    $("#add-task").trigger("reset");
    $("#new-task").hide();
});

