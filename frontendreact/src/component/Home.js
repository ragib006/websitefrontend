

import React,{useState,useEffect} from 'react'

import axios from 'axios'

import Rating from './Rating';

import Header from './Header';

import Footer from './Footer';

import { Link } from 'react-router-dom'




const Home = ({match}) => {





  const [books,setBook] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [showFeatured, setShowFeatured] = useState(false);
  const [error,setError] = useState(false);



//get all book
useEffect(()=>{

    const mykeyword = match.params.keyword

    const Allbooks = async (mykeyword='') => {  

    try{

     const res = await axios.get(`/api/getlistbook?keyword=${mykeyword}`);
     setBook(res.data)
    // console.log('book data is...................',res.data)


     }catch(error){

      setError(error)

     }

   }
  
   
  Allbooks(mykeyword);


},[showFeatured])





//featuredbook filter

 useEffect(() => {
    fetchfeaturedBooks();
  }, [showAll, showFeatured]);

  const fetchfeaturedBooks = async () => {
    try {
      let url = '/api';
      if (showFeatured) {
        url += '/filterbook';
      }
      const response = await axios.get(url);

      console.log('filder data',response.data)
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };




 const handleShowAllChange = () => {
    setShowAll(true);
    setShowFeatured(false);
  };

  const handleShowFeaturedChange = () => {
    setShowAll(false);
    setShowFeatured(true);
  };






   return(




    <>

      <Header/>

       <div className="container" style={{marginTop:'20px'}}>
           
           <div className="row">
             
             <div className="col-md-3">

             <ul className="list-group" style={{marginBottom:'30px'}}>
               <li className="list-group-item" style={{color:'blue'}}>Sidebar</li>
               <li className="list-group-item"><Link to="/addbook" style={{textDecoration:'none',color:'black'}}>Add Book</Link></li>
              
             </ul>



             <ul className="list-group">
              
             

             <li className="list-group-item" style={{color:'blue'}}>Filter Book</li>
              


               <li className="list-group-item">

    
                   
               <div class="form-check">
              <input class="form-check-input" type="checkbox"  id="flexCheckDefault"  
                checked={showAll}
                onChange={handleShowAllChange}/>
              <label class="form-check-label" for="flexCheckDefault">
               All
            </label>
             </div>


               </li>

               <li className="list-group-item">

               <div class="form-check">
               <input class="form-check-input" type="checkbox"  id="flexCheckDefault"
               checked={showFeatured}
              onChange={handleShowFeaturedChange}

                />
             <label class="form-check-label" for="flexCheckDefault">
             Featured
            </label>
             </div>



               </li>
              
             </ul>

             </div>


             <div className="col-md-9">

                <div className="row">




                 {books && books.map(book => (   


                  <div className="col-md-3" style={{marginBottom:'15px'}}>
                   <div class="card">
                    <center>
                    <img src={book.thumbnail} style={{height:'180px',width:'180px',marginTop:'10px'}} class="card-img-top" alt="Not Found"/>
                    </center>
                  <div class="card-body">
                  <p class="card-title" style={{fontSize:'19px'}}>{book.name}</p>
                  <p class="card-text">Author : {book.author} </p>
                  <p class="card-text">Price : {book.price} $</p>


                  <Rating value={book.rating}/>

                  <p class="card-text">



      {book.featured == 'true' ? <p>Featured</p> : null}
                  
                
                  </p>

                  <Link to={`/editbook/${book._id}`} class="btn btn-primary"><i className="fas fa-edit"></i></Link>

                  <Link to={`/bookdetails/${book._id}`} class="btn btn-success" style={{marginLeft:'10px'}}><i className="fas fa-eye"></i></Link>

                   
               </div>
            </div>
            </div>




                 ))}   
                     
                  



















    



                  

                </div>


             </div>
           
           
           </div>




       </div>
    
    

   <Footer/>
    
    </>


   )


}


export default Home;