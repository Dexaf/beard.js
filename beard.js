/**
 * @desc Insert one obj inside a template and renders it inside an element using his id
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template
 */
function beardWrite(htmlRef, htmlTemplate, obj) {
    if (__checkValidInsert(htmlRef, htmlTemplate, obj) && __checkCorrispondence(htmlTemplate, obj)) {
        let rendered = Mustache.render(htmlTemplate, obj);
        let beforeMustaches = (rendered.match(/{{/g) || []).length;
        if (beforeMustaches > 0) {
            console.error("BEARD.js (beardWrite): not all the placeholders of a template got replaced")
            return {
                check: false,
                htmlRef: htmlRef,
                htmlTemplate: htmlTemplate,
                obj: obj,
                rendered: rendered
            }
        }
        //rendering injected 
        document.getElementById(htmlRef).innerHTML = rendered;
        return {
            check: true,
            htmlRef: htmlRef,
            htmlTemplate: htmlTemplate,
            obj: obj,
            rendered: rendered
        }
    }
}

/**
 * @desc Insert an array of templates and renders it inside an element using his id
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template
 */
function beardWriteBulk(htmlRef, htmlTemplate, objArray) {
    objArray.forEach(element => {
        let renderedArray = []
        if (__checkValidInsert(htmlRef, htmlTemplate, element) && __checkCorrispondence(htmlTemplate, element)) {

            let rendered = Mustache.render(htmlTemplate, element);
            let beforeMustaches = (rendered.match(/{{/g) || []).length;
            if (beforeMustaches > 0) {
                console.error("BEARD.js (beardWriteBulk): not all the placeholders of a template got replaced")
                return {
                    check: false,
                    htmlRef: htmlRef,
                    htmlTemplate: htmlTemplate,
                    obj: element,
                    objArray: objArray,
                    rendered: rendered
                }
            }
            //rendering pushed 
            renderedArray.push[rendered];
        }
        //rendering injected
        document.getElementById(htmlRef).innerHTML = renderedArray.join()
    });
}

/**
 * @desc Push one template inside an html container without erasing any existing content
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template
 */
function beardInsertPush(htmlRef, htmlTemplate, obj) {
    if (__checkValidInsert(htmlRef, htmlTemplate, obj) && __checkCorrispondence(htmlTemplate, obj)) {
        let rendered = Mustache.render(htmlTemplate, obj);
        let beforeMustaches = (rendered.match(/{{/g) || []).length;
        if (beforeMustaches > 0) {
            console.error("BEARD.js (beardInsertPush): not all the placeholders of a template got replaced")
            return {
                check: false,
                htmlRef: htmlRef,
                htmlTemplate: htmlTemplate,
                obj: obj,
                rendered: rendered
            }
        }
        //rendering injected 
        document.getElementById(htmlRef).insertAdjacentHTML('beforeend', rendered);
        return {
            check: true,
            htmlRef: htmlRef,
            htmlTemplate: htmlTemplate,
            obj: obj,
            rendered: rendered
        }
    }
}

/**
 * @desc Push an array of template inside an html container without erasing any existing content
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template
 */
function beardInsertPushBulk(htmlRef, htmlTemplate, objArray) {
    objArray.forEach(element => {
        let renderedArray = []
        if (__checkValidInsert(htmlRef, htmlTemplate, element) && __checkCorrispondence(htmlTemplate, element)) {

            let rendered = Mustache.render(htmlTemplate, element);
            let beforeMustaches = (rendered.match(/{{/g) || []).length;
            if (beforeMustaches > 0) {
                console.error("BEARD.js (beardWriteBulk): not all the placeholders of a template got replaced")
                return {
                    check: false,
                    htmlRef: htmlRef,
                    htmlTemplate: htmlTemplate,
                    obj: element,
                    objArray: objArray,
                    rendered: rendered
                }
            }
            //rendering pushed 
            renderedArray.push[rendered];
        }
        //rendering injected
        document.getElementById(htmlRef).insertAdjacentHTML('beforeend', renderedArray.join());
    });
}

//check that the template have correct placeholders and that the number of them match
//the number of argument of the obj
function __checkCorrispondence(htmlTemplate, obj) {
    let beforeMustaches = (htmlTemplate.match(/{{/g) || []).length;
    let afterMustaches = (htmlTemplate.match(/}}/g) || []).length;
    if (beforeMustaches != afterMustaches) {
        console.error("BEARD.js (__checkCorrispondence): the number of {{ and }} don't match, check your template")
        return false;
    } else if (Object.keys(obj).length != beforeMustaches) {
        console.error("BEARD.js (__checkCorrispondence): the number of props in your obj don't match the number of placeholders in your template")
        return false;
    }

    //html and template are compatible
    return true;

}

//check all params are filled with something
function __checkValidInsert(htmlRef, htmlTemplate, obj) {
    if (htmlRef != null || htmlRef != undefined && htmlTemplate != null || htmlTemplate != undefined && obj != null || obj != undefined)
        return true
    else {
        console.error("BEARD.js (__checkValidInsert): one of the arguments passed is null or undefined")
        return false
    }
}