import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Header from './Header';

import Footer from './Footer';

import Swal from 'sweetalert2';

const Editbook = ({match,history}) => {


	  const bookId = match.params.id

      const [name,setName] = useState('')
      const [author,setAuthor] = useState('')
     
      const [price,setPrice] = useState('')
      const [rating,setRating] = useState('')
      const [featured,setFeatured] = useState('')
      
       const [thumbnail,setThumbnail] = useState('')
      

      const [fileName,setFileName] = useState('')

       const [error,setError] = useState(false);


useEffect(()=>{

 

    const Singlebook = async () => {  

    try{


const res = await axios.get(`/api/singlebook/${bookId}`);



           setName(res.data.name)
           setAuthor(res.data.author)
           setThumbnail(res.data.thumbnail)
           setPrice(res.data.price)
           setRating(res.data.rating)
           setFeatured(res.data.featured)




     }catch(error){

      setError(error)

     }

   }
  

  Singlebook();
   



},[])








const submitHandler = async (e) => {

   e.preventDefault();

   try{


   

      const updatedBook = {name,author,thumbnail,price,rating,featured};
      const res = await axios.put(`/api/updatebook/${bookId}`, updatedBook);
  

       history.push('/')

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Book Update Successfully'
      })
    



   }catch(error){


          setError(error)

                console.error('Error updating book:', error);

   }


  


 }






   return(

    <>



    
    <Header/>

<div className="container" style={{marginTop:'20px'}}>
    
    <div className="row">



    <div className="card" style={{width:'60%'}}>

     <form style={{}}  enctype="multipart/form-data" onSubmit={submitHandler}>

  <div className="card-body">
    <p class="card-title" style={{marginBottom:'20px',fontWeight:'bold',fontSize:'23px'}}>Edit Book</p>


    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Name</label>
  <input type="text" className="form-control" id="name"   
  value = {name}
   onChange = {(e) => setName(e.target.value)} placeholder="Enter Book Name" required/>
  </div>

  
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Author Name</label>
  <input type="text" className="form-control" id="author"  
  value = {author}
   onChange = {(e) => setAuthor(e.target.value)} placeholder="Enter Author Name" required/>
  </div>


  

   <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Thumbnail</label>
  <input type="text" className="form-control" id="author"  
  value = {thumbnail}
   onChange = {(e) => setThumbnail(e.target.value)} placeholder="Enter Thumbnail Url" required/>
  </div>





<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Price</label>
  <input type="number" min="1" step="any"  className="form-control" id="rating" 
  value = {price}
  onChange = {(e) => setPrice(e.target.value)} placeholder="Enter Book Price" required/>
  </div>




  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Rating</label>
  <input type="number" min="1" max="5" step="any" className="form-control" id="rating" 
  value = {rating}
  onChange = {(e) => setRating(e.target.value)} placeholder="Enter Book Rating" required/>
  </div>




    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Featured</label>
  <input type="text" className="form-control" id="featured"  
  value = {featured}
  onChange = {(e) => setFeatured(e.target.value)} placeholder="true or false" required/>
  </div>






  </div>


 <button style={{float:'right',marginRight:'20px',marginBottom:'10px'}} type="submit" className="btn btn-primary">Update</button>

           </form>




</div>



      

    
    
    </div>




</div>



<Footer/>





















    
       
    </>


   )


}


export default Editbook;