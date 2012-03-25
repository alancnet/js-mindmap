// load the mindmap
$(document).ready(function() {
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
        $(window).attr("title", node.name);

        $(window).ndialog("option", "node", node);
    }

    var removeHandler = function() {
        var dialog = $(this).parents(".details")
        var node = dialog.ndialog("option", "node");
        var parent = node.parent;
        node.removeNode();
        $(parent.el).click();
    };

    var addChildHandler = function() {

        dialog = $(this).parents(".details")
        node = dialog.ndialog("option", "node");
        name = $(".name", dialog).val();
        $(".name", dialog).val("").focus();
        addNode(node, name, {});
        return false;
    }

    $(".details .add_child").click(addChildHandler);
    $(".details .remove").click(removeHandler);

    var addNode = function(parentnode, text) {
        return $('body').addNode(parentnode, text, {

            href:'/',
            ondblclick:function(node) {
                updateInfoWithNode($("#details"), node);
                $("#details").dialog({resizable:true, height : screen.height * 0.45, width : screen.width * 0.25 })
            },

            onclick:function(node) {
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