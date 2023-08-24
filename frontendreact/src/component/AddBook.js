import React,{useState,useEffect,useContext} from 'react'
import Header from './Header';

import Footer from './Footer';

import Swal from 'sweetalert2';


import axios from 'axios'
const AddBook = ({history}) => {



const [file,setFile] = useState("");

const[info,setInfo] = useState({});


const [loading,setLoading] = useState(false)
const [error,setError] = useState(false)






const handleChange = (e) => {



setInfo(prev=>({...prev,[e.target.id]:e.target.value}))




}



const handleClick = async (e) => {

      e.preventDefault();

      const data = new FormData()

      data.append("file",file)
      data.append("upload_preset","upload");
      data.append("cloud_name","ragibhasan006");



       setLoading(true)

      try{

        const upload = await axios.post("https://api.cloudinary.com/v1_1/ragibhasan006/image/upload",data)

        console.log(upload)

       const {url} = upload.data


     //  console.log(url)


           const newBook = {

               ...info,
               thumbnail:url


            };


      

      const book = await axios.post("/api/createnewbook",newBook);



    console.log('new book is',book)


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
   title: 'New Book Added successfully'
 })




          history.push('/')

            


                 setInfo("");
                 file("");






      }catch(error){


         setLoading(false)

         console.log(error)


      }


    



}
















   return(

    <>
    
    
    <Header/>

<div className="container" style={{marginTop:'20px'}}>
    
    <div className="row">



    <div className="card" style={{width:'60%'}}>

  <div className="card-body">
    <p class="card-title" style={{marginBottom:'20px',fontWeight:'bold',fontSize:'23px'}}>Add New Book</p>


    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Name</label>
  <input type="text" className="form-control" id="name" onChange={handleChange} placeholder="Enter Book Name" required/>
  </div>

  
  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Author Name</label>
  <input type="text" className="form-control" id="author" onChange={handleChange} placeholder="Enter Book Author Name" required/>
  </div>


       <div className="mb-3">
       <label for="formFile" className="form-label">Uplode Book Thumbnail</label>

    <img  style={{height:'50px',width:'50px',marginLeft:'20px',marginBottom:'10px'}} src={file ? URL.createObjectURL(file): '' }/>

       <input className="form-control" type="file" id="file" onChange={(e)=>setFile(e.target.files[0])}/>
       </div>



  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Price</label>
  <input type="number" className="form-control" min="0" id="price" onChange={handleChange} placeholder="Enter Book Price" required/>
  </div>


  <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Book Rating</label>
  <input type="number" min="1" max="5"  className="form-control" id="rating" onChange={handleChange} placeholder="Enter Book Rating Between 1 to 10" required/>
  </div>




    <div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label">Featured</label>
  <input type="text" className="form-control" id="featured" onChange={handleChange} placeholder="true or false" required/>
  </div>





<button style={{float:'right',marginRight:'20px'}} className="btn btn-success" onClick={handleClick} disabled={loading}type="button">Submit</button>

  </div>
</div>



      

    
    
    </div>




</div>



<Footer/>

    
    </>


   )


}


export default AddBook;