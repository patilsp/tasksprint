"use strict";
var KTKanbanBoardDemo = {
    init: function() {
        !function() {
          
           
           
            var t = new jKanban({
                element: "#kanban4",
                gutter: "0",
                click: function(a) {
                    alert(a.innerHTML)
                },
                boards: [{
                    id: "_board1",
                    title: "Todo Task",
                    item: [{
                        title: "My Task Test"
                    }, {
                        title: "Buy Milk"
                    }]
                }, {
                    id: "_board2",
                    title: "In Progress",
                    item: [{
                        title: "Do Something!"
                    }, {
                        title: "Run?"
                    }]
                }, {
                    id: "_board3",
                    title: "Completed",
                    item: [{
                        title: "All right"
                    }, {
                        title: "Ok!"
                    }]
                }]
            });
            document.getElementById("addBoard").addEventListener("click", function() {
                var a = $("#kanban-add-board").val()
                  , e = "_" + $.trim(a)
                  , n = $("#kanban-add-board-color").val()
                  , i = '<option value="' + e + '">' + a + "</option>";
                t.addBoards([{
                    id: e,
                    title: a,
                    class: n
                }]),
                $("#kanban-select-task").append(i),
                $("#kanban-select-board").append(i)
            }),
            document.getElementById("addTask").addEventListener("click", function() {
                var a = $("#kanban-select-task").val()
                  , e = $("#kanban-add-task").val()
                  , n = $("#kanban-add-task-color").val();
                t.addElement(a, {
                    title: e,
                    class: n
                })
            }),
            document.getElementById("removeBoard2").addEventListener("click", function() {
                var a = $("#kanban-select-board").val();
                t.removeBoard(a),
                $('#kanban-select-task option[value="' + a + '"]').remove(),
                $('#kanban-select-board option[value="' + a + '"]').remove()
            })
        }()
    }
};
jQuery(document).ready(function() {
    KTKanbanBoardDemo.init()
});
