//SINGLE INSERT
/**
 * @desc Insert one obj inside a template and renders it inside an element using his id
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template
 */
function beardWrite(htmlRef, htmlTemplate, obj) {
    let cviReturn = __checkValidInsert(htmlRef, htmlTemplate, obj)

    if (cviReturn.check) {
        let htmlTemplateString = cviReturn.htmlTemplateString
        let rendered = Mustache.render(htmlTemplateString, obj);
        let beforeMustaches = (rendered.match(/{{/g) || []).length;

        if (beforeMustaches > 0) {
            console.error("BEARD.js (beardWrite): not all the placeholders of a template got replaced")
            console.error({
                check: false,
                htmlRef: htmlRef,
                htmlTemplate: htmlTemplateString,
                obj: obj,
                rendered: rendered
            })
            return false;
        }

        //rendering injected 
        document.getElementById(htmlRef).innerHTML = rendered;
        return true;
    }
    else
        return false;
}

/**
 * @desc Push one template inside an html container without erasing any existing content
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template
 */
function beardPush(htmlRef, htmlTemplate, obj) {
    let cviReturn = __checkValidInsert(htmlRef, htmlTemplate, obj)

    if (cviReturn.check) {
        let htmlTemplateString = cviReturn.htmlTemplateString
        let rendered = Mustache.render(htmlTemplateString, obj);
        let beforeMustaches = (rendered.match(/{{/g) || []).length;

        if (beforeMustaches > 0) {
            console.error("BEARD.js (beardPush): not all the placeholders of a template got replaced")
            console.error({
                check: false,
                htmlRef: htmlRef,
                htmlTemplate: htmlTemplateString,
                obj: obj,
                rendered: rendered
            })
            return false;
        }
        //rendering injected 
        document.getElementById(htmlRef).insertAdjacentHTML('beforeend', rendered);
        return true;
    }
    else
        return false;
}

//BULK INSERT
/**
 * @desc Insert an array of templates and renders it inside an element using his id
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template.
 *       the inBeetweenFun is a function that is called between each rendering of the template
 */
function beardWriteBulk(htmlRef, htmlTemplate, objArray, inBeetweenFun) {
    let renderedArray = []
    //check array
    if (objArray == null || objArray == undefined) {
        console.error("BEARD.js (beardPushBulk): objArray is null or undefined")
        console.error({
            check: false,
            htmlRef: htmlRef,
            htmlTemplate: htmlTemplateString,
            objArray: objArray
        })
        return false;
    }
    objArray.forEach(obj => {
        cviReturn = __checkValidInsert(htmlRef, htmlTemplate, obj)

        if (cviReturn.check) {

            if (typeof inBeetweenFun !== 'function') {
                console.error("BEARD.js (beardPushBulk): inBeetweenFun is not a function")
                console.error({
                    check: false,
                    htmlRef: htmlRef,
                    htmlTemplate: htmlTemplateString,
                    obj: element,
                    objArray: objArray,
                    rendered: rendered,
                    inBeetweenFun: inBeetweenFun
                })
                return false;
            }
            //we can render so we can fire the inBeetweenFun
            inBeetweenFun();
            let htmlTemplateString = cviReturn.htmlTemplateString
            let rendered = Mustache.render(htmlTemplateString, obj);
            let beforeMustaches = (rendered.match(/{{/g) || []).length;
            if (beforeMustaches > 0) {
                console.error("BEARD.js (beardWriteBulk): not all the placeholders of a template got replaced")
                console.error({
                    check: false,
                    htmlRef: htmlRef,
                    htmlTemplate: htmlTemplateString,
                    obj: element,
                    objArray: objArray,
                    rendered: rendered
                })
                return false;
            }
            //rendering pushed
            renderedArray.push(rendered);
        }
        else
            return false;
    });
    let toRender = '';
    //rendering injected
    renderedArray.forEach(element => {
        toRender += element;
    });
    document.getElementById(htmlRef).innerHTML = toRender
    return true;
}

/**
 * @desc Push an array of template inside an html container without erasing any existing content
 *       htmlRef must be the id referencing the container where you want you to render the template.
 *       htmlTemplate is a string representing some html content and it have to have some placeholder inside surrounded by {{ }}
 *       obj is an object that contains properties named after the placeholders in the template.
 *       the inBeetweenFun is a function that is called between each rendering of the template
 */
function beardPushBulk(htmlRef, htmlTemplate, objArray, inBeetweenFun) {
    let renderedArray = []
    //check array
    if (objArray == null || objArray == undefined) {
        console.error("BEARD.js (beardPushBulk): objArray is null or undefined")
        console.error({
            check: false,
            htmlRef: htmlRef,
            htmlTemplate: htmlTemplateString,
            objArray: objArray
        })
        return false;
    }
    objArray.forEach(element => {
        let cviReturn = __checkValidInsert(htmlRef, htmlTemplate, element)
        if (cviReturn.check) {
            if (typeof inBeetweenFun !== 'function') {
                console.error("BEARD.js (beardPushBulk): inBeetweenFun is not a function")
                console.error({
                    check: false,
                    htmlRef: htmlRef,
                    htmlTemplate: htmlTemplateString,
                    obj: element,
                    objArray: objArray,
                    rendered: rendered,
                    inBeetweenFun: inBeetweenFun
                })
                return false;
            }
            //we can render so we can fire the inBeetweenFun
            inBeetweenFun();
            let htmlTemplateString = cviReturn.htmlTemplateString
            let rendered = Mustache.render(htmlTemplateString, element);
            let beforeMustaches = (rendered.match(/{{/g) || []).length;
            if (beforeMustaches > 0) {
                console.error("BEARD.js (beardPushBulk): not all the placeholders of a template got replaced")
                console.error({
                    check: false,
                    htmlRef: htmlRef,
                    htmlTemplate: htmlTemplateString,
                    obj: element,
                    objArray: objArray,
                    rendered: rendered
                })
                return false;
            }
            //rendering pushed 
            renderedArray.push(rendered);
        }
        else
            return false;
    });
    let toRender = '';
    //rendering injected
    renderedArray.forEach(element => {
        toRender += element;
    });
    document.getElementById(htmlRef).insertAdjacentHTML('beforeend', toRender);
    return true;
}

/**
 * @desc check the matching of {{ and }} in the template
 */
function __checkCorrispondence(htmlTemplate) {
    let beforeMustaches = (htmlTemplate.match(/{{/g) || []).length;
    let afterMustaches = (htmlTemplate.match(/}}/g) || []).length;
    if (beforeMustaches != afterMustaches) {
        console.error("BEARD.js (__checkCorrispondence): the number of {{ and }} don't match, check your template")
        return false;
    }

    //html and template are compatible
    return true;
}

/**
 * @desc check that the obj, templates, htmlRef and htmlelemref exists
 */
function __checkValidInsert(htmlRef, htmlTemplate, obj) {

    let htmlTemplateString;
    //extract the template
    let htmlTemplateElem = document.getElementById(htmlTemplate)

    if (htmlTemplateElem != null) {
        htmlTemplateString = htmlTemplateElem.innerHTML
    }

    if (htmlTemplateString.trim() == '') {
        console.error("BEARD.js (__checkValidInsert): the htmlTemplateString is empty")
        console.error({
            htmlRef: htmlRef,
            htmlTemplate: htmlTemplate,
            obj: obj,
            htmlTemplateString: htmlTemplateString
        })
        return {
            check: false
        }
    }
    else if (htmlRef != null && htmlRef != undefined && htmlTemplate != null && htmlTemplate != undefined && obj != null && obj != undefined) {
        if (__checkCorrispondence(htmlTemplateString))
            return {
                check: true,
                htmlTemplateString: htmlTemplateString
            }
        else
            return {
                check: false
            }
    }
    else {
        console.error("BEARD.js (__checkValidInsert): one of the arguments passed is null or undefined")
        console.error({
            htmlRef: htmlRef,
            htmlTemplate: htmlTemplate,
            obj: obj,
            htmlTemplateString: htmlTemplateString
        })
        return {
            check: false
        }
    }
}