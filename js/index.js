jQuery(document).ready(function($) {
    $("#btnWindows").click(function(event) {
        var x = document.getElementById('cacheMenu');
        if (x.style.display == 'block') {
            x.style.display = 'none';
        } else {
            x.style.display = 'block';
        }
    });
    $("#cacheMenu").click(function(event) {
        if (event.target == document.getElementById('cacheMenu')) {
            $("#cacheMenu").hide();
        }
    });
    $(".raccourci").click(function(event) {
        var id = Date.now();
        var el = document.createElement('DIV');
        el.setAttribute('id', 'windows' + id);
        el.setAttribute('class', 'windows');
        var page = this.attributes['page'].value;
        el.innerHTML = '<div class="toolbarWindows"><button class="hide" onclick="hideWindow(event)"></button><button class="resize" onclick="resizeWindow(event)"></button><button class="close" onclick="closeWindow(event)"></button></div><iframe src="pages/'+page+'/index.html" class="bureauWindows"></iframe>';
        document.getElementById('bureau').appendChild(el);

        var img = this.children[0].attributes['src'].value;
        el = document.createElement('DIV');
        el.setAttribute('id', 'raccourci' + id);
        el.setAttribute('onclick', 'showWindows(event)');
        el.setAttribute('class', 'iconBar');
        el.innerHTML = '<img src="'+img+'" alt="">';
        document.getElementById('toolbar').appendChild(el);
        $("#cacheMenu").hide();
    });
    $(document).on('click',".windows",function(){
        $(".windows").css('z-index', '2');
        $(this).css('z-index',3);
    })

    interact('.toolbarWindows')
        .draggable({
            // enable inertial throwing
            inertia: false,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function(event) {}
        });

    function dragMoveListener(event) {
        var target = event.target.parentNode,
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        if (target.attributes['isFull'] && target.attributes['isFull'].value == "true") {
            return;
        }

        if (!$(target).hasClass('windows')) {
            return;
        }
        // translate the element
        /*target.style.top = y + 'px';
        target.style.left = x + 'px';*/
        //target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';



        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
    // this is used later in the resizing and gesture demos
    window.dragMoveListener = dragMoveListener;
});


function hideWindow(event) {
    var id = event.target.parentNode.parentNode.id;
    $('#' + id).hide();

}

function showWindows(event) {
    var el = event.target;
    if (el.nodeName == 'IMG') {
        el = el.parentNode;
    }
    var id2 = el.id;
    var id = id2.replace("raccourci", "windows");
    if (document.getElementById(id).style.display == 'none') {
        $('#' + id).show();
    } else {
        $('#' + id).hide();
    }
}

function closeWindow(event) {
    var id = event.target.parentNode.parentNode.id;
    var id2 = id.replace("windows", "raccourci");
    document.getElementById('bureau').removeChild(document.getElementById(id));
    document.getElementById('toolbar').removeChild(document.getElementById(id2));
}

function resizeWindow(event) {
    var el = event.target.parentNode.parentNode;
    if (!el.attributes['isFull'] || el.attributes['isFull'].value == "false") {
        el.setAttribute('isFull', "true");
        el.style.height = document.getElementById('bureau').offsetHeight + 'px';
        el.style.width = document.getElementById('bureau').offsetWidth + 'px';
        el.style.top = 0;
        el.style.left = 0;
        el.style.transform = 'none';
    } else {
        el.setAttribute('isFull', "false");
        el.style.height = '400px';
        el.style.width = '600px';
        el.style.top = 200 + 'px';
        el.style.left = 450 + 'px';
    }
}
