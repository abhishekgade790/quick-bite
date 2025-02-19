const parent = React.createElement("div",{id:"parent"},
    React.createElement("div",{id:"child1"},
        [React.createElement("h1",{},"i am h1 tag"),React.createElement("h1",{},"heading two")]
    )
)
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(parent);

root.render(parent);