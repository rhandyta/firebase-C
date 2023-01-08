import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddStudent from "./component/AddStudent";
import Login from "./component/Login";
import Register from "./component/Register";
import UserLists from "./component/StuddentLists";
import UpdateStudent from "./component/UpdateStudent";

function App() {
    return (
        <main className="card">
            <Routes>
                <Route path="/" element={<UserLists />} />
                <Route path="add" element={<AddStudent />} />
                <Route path="update/:id" element={<UpdateStudent />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
            </Routes>
        </main>
    );
}

export default App;
