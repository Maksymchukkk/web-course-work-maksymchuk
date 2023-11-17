import Sidebar from "./component/Sidebar/Sidebar";
import Header from "./component/Header/Header";
import AppRouter from "./router/AppRouter";
import ControlBar from "./component/ControlBar/ControlBar";

function App() {
    return (
        <>
            <Header/>
            <ControlBar/>
            <AppRouter/>
        </>
    )
}

export default App;
