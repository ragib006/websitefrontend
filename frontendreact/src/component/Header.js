import React from 'react'
import { Link } from 'react-router-dom'
import {Route} from 'react-router-dom'

import SearchBox from './SearchBox';

const Header = ({history}) => {




   return(

    <>


<nav className="navbar navbar-expand-lg bg-dark">
  <div className="container">
    <Link className="navbar-brand" to="/" style={{color:'white',fontWeight:'bold'}}>Interview Task</Link>
    <button className="navbar-toggler" type="button"  style={{backgroundColor:'white'}} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

        <Route render={({history}) => <SearchBox history={history}/>}/>
    

    </div>
  </div>
</nav>
    
       
    
    </>


   )


}


export default Header;