// load the mindmap
$(document).ready(function() {

    var selectedNode = null;

    // enable the mindmap in the body
    $('body').mindmap();
    $(".details").ndialog();

    // add the data to the mindmap
    var root = $('body>ul>li').get(0).mynode = $('body').addRootNode($('body>ul>li>a').text(), {
        href:'/',
        url:'/',
        onclick:function(node) {
            $(node.obj.activeNode.content).each(function() {
                this.hide();
            });
        }
    });
    $('body>ul>li').hide();

    var presentNode = function(node) {
        $(node.obj.activeNode.content).each(function() {
            this.hide();
        });
        $(node.content).each(function() {
            this.show();
        });
    }

    var updateInfoWithNode = function(window, node) {
        // TODO: Move this to widget
        selectedNode = node;
        $(window).attr("title", node.name);
        $("#ui-dialog-title-details").text(node.name);

       var name_field = $("#edit_node .name");
       name_field.val(selectedNode.name);
       var color_field = $("#edit_node .color");
       color_field.val(selectedNode.color);
    };

    var saveHandler = function(){
       var name_field = $("#edit_node .name");
        var color_field = $("#edit_node .color");
       selectedNode.updateAttributes({name: name_field.val(), color: color_field.val()});
        return false;
    };

    var removeHandler = function() {
        var node = selectedNode;
        var parent = node.parent;
        node.removeNode();
        $(parent.el).click();
        selectedNode = null;
        return false;
    };

    var addChildHandler = function() {
        node = selectedNode;
        var name_field =  $("#add_child_form .name");
        name = name_field.val();
        name_field.val("").focus();
        addNode(node, name, {});
        return false;
    }

    $("#add_child_form button:first").click(addChildHandler);
    $(".details .remove").click(removeHandler);
    $("#edit_node button:first").click(saveHandler);

    var addNode = function(parentnode, text) {
        return $('body').addNode(parentnode, text, {

            href:'/',
            ondblclick:function(node) {
                updateInfoWithNode($("#details"), node);
                $("#details").dialog({resizable:true, height : screen.height * 0.45, width : screen.width * 0.25 })
            },

            onclick:function(node) {
                 updateInfoWithNode($("#details"), node);
                presentNode(node);
            }
        });
    };


    var addLI = function() {
        var parentnode = $(this).parents('li').get(0);
        if (typeof(parentnode) == 'undefined') parentnode = root;
        else parentnode = parentnode.mynode;

        this.mynode = addNode(parentnode, $('a:eq(0)', this).text(), {});
        $(this).hide();
        $('>ul>li', this).each(addLI);
    };
    $('body>ul>li>ul').each(function() {
        $('>li', this).each(addLI);
    });

});   