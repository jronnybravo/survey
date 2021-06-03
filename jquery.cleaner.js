jQuery(function($) {
    $("link[rel='stylesheet']").each(function() {
        let link = $(this);
        let url = link.attr("href");
        $.when($.get(url))
            .done(function(content, a, b) {
                if(!url.startsWith('http')) {
                    let fullUrl = window.location.href + url
                    
                    let directoryParts = fullUrl.split('/');
                    // directoryParts.pop();

                    let possibleParentDirectoryRefs = directoryParts.length - 1;
                    for(let i = possibleParentDirectoryRefs; i > 0; i--) {
                        let needle = '../'.repeat(i);

                        let parentDirectory = '';
                        for(let j = 0; j < possibleParentDirectoryRefs - i; j++) {
                            parentDirectory += (directoryParts[j] + '/');
                        }

                        while(content.indexOf(needle) > -1) {
                            content = content.replace(needle, parentDirectory);
                        }
                    }
                }
                let style = $('<style type="text/css" />').text(content);
                link.after(style);
                link.remove();
            });
    });

    $("img").each(function() {
        let imgWidth = $(this).width();
        let imgHeight = $(this).height();
        if(imgWidth && imgHeight) {
            let newImage = $("<div>");
            for(let i = 0; i < this.attributes.length; i++) {
                let attr = this.attributes[i];
                if(!['src'].includes(attr.name)) {
                    newImage.attr(attr.name, attr.value);    
                }
            }
            let imgAttrSrc = $(this).attr("src");
            newImage.css({
                'background-image': `url("${imgAttrSrc}")`,
                'background-repeat': 'no-repeat',
                'background-size': 'contain',
                'width': imgWidth,
                'height': imgHeight,
                'display': 'inline-block'
            });
            $(this).after(newImage);
            $(this).remove();
        }
    });

    $("script").remove();
});