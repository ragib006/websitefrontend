import React,{useState,useEffect} from 'react'

import axios from 'axios'

import Rating from './Rating';

import Header from './Header';

import Footer from './Footer';

import { Link } from 'react-router-dom'

import Swal from 'sweetalert2';


const Bookdetails = ({match,history}) => {

const bookId = match.params.id

   const [bookdetails,setBookdetails] = useState([]);

   const [error,setError] = useState(false);



//get single book info
useEffect(()=>{

  

    const Bookinformation = async () => {  

    try{




   const res = await axios.get(`/api/singlebook/${bookId}`);

   setBookdetails(res.data)

 //console.log('book data is...................',res.data)


     }catch(error){

      setError(error)

     }

   }
  
   
 Bookinformation();


},[])





const Deletehandler = async (bookId) => {




     try{


         const res = await axios.delete(`/api/deletebook/${bookId}`);




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
              title: 'Book Delete Successfully'
             
             })





     }catch(error){

  

      console.log(error)

     }


      

  


}




	 

   return(

    <>


     <Header/>

<div className="container" style={{marginTop:'20px'}}>
    
    <div className="row">



    <div className="card" style={{width:'60%'}}>

        <div className="row">

           <div className="col-md-5">

          <img src={bookdetails.thumbnail} style={{height:'250px',width:'250px',marginTop:'10px'}} class="card-img-top" alt="Not Found"/>

      

           </div>


           <div className="col-md-7">


              <div className="content"style={{marginTop:'20px'}}>
               
               <p>
               
               <span style={{fontWeight:'bold',fontSize:'18px',color:'gray'}}>Book Name :</span>  <span style={{fontWeight:'bold',fontSize:'17px'}}>{bookdetails.name}</span>
                
               </p>


                <p>
               
               <span style={{fontWeight:'bold',fontSize:'18px',color:'gray'}}>Author :</span>  <span style={{fontWeight:'bold',fontSize:'17px'}}>{bookdetails.author}</span>
                
               </p>


                   <p>
               
               <span style={{fontWeight:'bold',fontSize:'18px',color:'gray'}}>Price :</span>  <span style={{fontWeight:'bold',fontSize:'17px'}}>{bookdetails.price} $</span>
                
               </p>


                         <p>
               
               <span style={{fontWeight:'bold',fontSize:'18px',color:'gray'}}>Featured :</span>  <span style={{fontWeight:'bold',fontSize:'17px'}}>{bookdetails.featured}</span>
                
               </p>



                         <p>
               
               <span style={{fontWeight:'bold',fontSize:'18px',color:'gray'}}>Rating</span>  

               <Rating value={bookdetails.rating}/>
                
               </p>



                           <p>
               
            <a onClick={()=>Deletehandler(bookId)} class="btn btn-danger" style={{float:'right',marginTop:'10px',marginBottom:'10px'}} ><i className="fas fa-trash"></i></a>
      

                
               </p>



           </div>
              

           </div>

        </div>

    
        






</div>



    
    
    </div>




</div>



<Footer/>




       
    
    
    </>


   )


}


export default Bookdetails;