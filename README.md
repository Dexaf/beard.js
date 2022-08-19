# beard.js
a super set for mustache.js that helps writing a better code and debugging

you have 4 main functions to use:

beardWrite(htmlRef, htmlTemplate, obj) return Boolean

    htmlRef is the id of the html container where you want to render the output, and the htmlTemplate is the id of the html elem which contains the template, 
    obj is the content that will be replaced inside the template.
    At the end if there are no error (empty arguments or not all the placeholder get replaced) the content will be rendered on your html.
    the content of the html container will be overwritten


beardPush(htmlRef, htmlTemplate, obj) return Boolean

    As beardWrite but it writes the content at the end of the html container without overwriting.


beardWriteBulk(htmlRef, htmlTemplate, objArray, inBeetweenFun) return Boolean

    As beardWrite but taking an Array of object with a length of N, the outcome will be N rendered template.
    inBeetweenFun is a function that get fired before rendering the template.
    the content of the html container will be overwritten

beardPushBulk(htmlRef, htmlTemplate, objArray, inBeetweenFun) return Boolean

    As beardWrite but it writes the content at the end of the html container without overwriting.
    inBeetweenFun is a function that get fired before rendering the template.