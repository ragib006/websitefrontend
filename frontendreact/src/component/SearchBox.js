import React,{useState} from 'react'





const SearchBox = ({ history }) => {

	
 const [keyword,setKeyword] = useState('')



  




  const submitHandler = (e) => { 

    e.preventDefault()
   
    if(keyword.trim()){
        
        history.push(`/search/${keyword}`)

    }else{


       history.push('/')

    }


  }







   return(

    <>
    
      <form className="d-flex" role="search" onSubmit={submitHandler}>
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
         
          onChange={(e)=>setKeyword(e.target.value)}

        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    
    </>


   )


}


export default SearchBox;