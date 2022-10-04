---
to: src/components/<%= h.changeCase.pascal(componentName) %>/index.js
---
<% namePascal = h.changeCase.pascal(componentName) -%>
<% nameCamel = h.changeCase.camel(componentName) -%>

import React from "react"
<% if (type === 'Class') { %>
class <%= namePascal %> extends React.PureComponent {
    render() {
        return (
            <div>
             <%= namePascal %>
            </div>
        );
    }
}
<% } else if (type === 'Function') { %>
const <%= namePascal %> = ({}) => {
    return (
        <div>
        {/* TODO */}
        </div>
    );
}
<% } %>

export default <%= namePascal %>
