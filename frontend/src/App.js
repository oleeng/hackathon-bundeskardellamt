import "./App.css";

function App() {
    return (
        <div className="App">
            <Header uberschrift="TESTÜberschrift"></Header>
            <Header uberschrift="Hallo"></Header>
        </div>
    );
}

function Header(props) {
    return <p className="header">{props.uberschrift}</p>;
}

export default App;
