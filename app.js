import React from "react";
import ReactDOM from "react-dom/client"; 
const parent = React.createElement("div",{id:"parent"},
    React.createElement("div",{id:"child1"},
        [React.createElement("h1",{},"i am h2 tag by abhi"),React.createElement("h1",{},"heading 2")]
    )
)
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(parent);

root.render(parent);