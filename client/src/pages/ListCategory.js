//importing libraries
import Swal from 'sweetalert2';
import axios from 'axios';

//imports hooks
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch'

//importing css
import './ListCategory.css'


export const ListCategory= ()=>{
    let {data,loading,error}= useFetch(`http://127.0.0.1:4000/category/findAllsCategory`, 'GET')

    const addCategories=()=>{
        Swal.fire({
            title: 'Add Category',
            html: `<input type="text" id="categoria" class="swal2-input" placeholder="Comedia">`,
            confirmButtonText: 'add category',
            showCancelButton: true,
            cancelButtonText: 'cancel',
            preConfirm: () => {
                const categoria = Swal.getPopup().querySelector('#categoria').value
                axios.post('http://127.0.0.1:4000/category/addCategory', {nombre:categoria})
                .then(res => { 
                    Swal.fire({
                    title: "Done!",
                    text: "category is added to database",
                    icon: "success",
                    timer: 2000,
                    button: false
                    })
                })
                .catch(()=> { 
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                      })
                });   
            }
        })
    }

    const deleteCategory = (id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user?",
            icon: "warning",
            dangerMode: true,
            showCancelButton: true,
            cancelButtonText: 'cancel',
        })
        .then(willDelete => {
            if (willDelete) {
                axios.delete(`http://127.0.0.1:4000/category/deleteCategory/${id}`)
                .then(res => {
                    Swal.fire({
                      title: "Done!",
                      text: "user is deleted",
                      icon: "success",
                      timer: 2000,
                      button: false
                    })
                })
                .catch(err => {
                    Swal.fire({
                        title: "Error!",
                        text: err
                    })
                })
            }
        });
    }



    if (error) return <p className='error-load'><h1>ups,the server have problems to load page</h1></p>;
    if (loading) return <h2>loading the server</h2>
    return(
        <div className="listCategory-container">
            <div className="card">
                <div className="card-title"><h2>List Category</h2></div>
               
                <div className="card-body">
                    <div className="divbtn">
                        <button className="btn btn-success"  onClick={()=>addCategories()}>add(+) category</button>
                    </div>
                    <table className="table table-bordered table-category">
                   
                        <thead className="bg-dark text-white">
                            <tr>
                                <td className="col-sm-3">ID</td>
                                <td className="col-md-3">Name</td>
                                <td className="col-md-3">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {data.map((category,index)=>(
                                <tr key={index}>
                                    <td>{category.id}</td>
                                    <td>{category.nombre}</td>
                                    <td className='action-category'>
                                        <Link to='/category/update'>
                                            <button class="btn btn-warning">Update</button>
                                        </Link>
                                        <button class="btn btn-danger" onClick={()=>deleteCategory(category.id)}>Delete</button>
                                        <button class="btn btn-info">Details</button>
                                    </td>
                                </tr>
                                )
                            )}

                        </tbody>
                    </table>
                </div>

            </div>

        </div>
    )
}


