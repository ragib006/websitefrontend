
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'

import Home from './component/Home';
import AddBook from './component/AddBook';
import Editbook from './component/Editbook';

import Bookdetails from './component/Bookdetails';



function App() {
  return (

    <Router>
      <> 
    
   
           <Route path='/' component={Home} exact/>
  
           <Route path='/addbook' component={AddBook} />

           <Route path='/search/:keyword' component={Home}/>

           <Route path='/editbook/:id' component={Editbook}/>

           <Route path='/bookdetails/:id' component={Bookdetails}/>



     </>
    </Router>
   
   
  );
}

export default App;
