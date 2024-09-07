import { Route,Routes,BrowserRouter } from "react-router-dom";
import Caption from "./caption";
import Comp1 from "./comp1";

const App =()=>{
    return(
   
            <Routes>
                <Route path='/' element={<Comp1/>}/>
                <Route path='/addcaption/:id' element={<Caption/>}/>
            </Routes>
    
);
}
export default App;
