import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import apiConnectionInstance from '../db/api.js'
import { useNavigate } from 'react-router-dom'
const AddContact = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    status: "active"
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleValueChange = (e) => {
    const {name, value} = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    setImageFile(file);
    const imagePreview = URL.createObjectURL(file);
    setPreview(imagePreview);
  }

  const removeImage = () => {
    if(preview){
      URL.revokeObjectURL(preview);
    }
    setImageFile(null);
    setPreview(null);
    if(fileInputRef.current){
      fileInputRef.current.value="";
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('number', form.number);
    formData.append('address', form.address);
    formData.append('status', form.status);

    if(imageFile) {
      formData.append('imageFile', imageFile);
    }

    try {
      const res = await apiConnectionInstance.post("/contacts", formData);
      //navigate('/'); 
    } catch (error) {
      if(error.response?.status === 422) {
        setErrors(error.response.data.errors || {})
      }
    }

  }

  const fileInputRef = useRef();
  return (
    <div className='row justify-content-center'>
      <div className="col-lg-6">
        <Link to='/' className="text-decoration-none small">&larr; Back
        </Link>
        <h2 className='mb-4 mt-2'>Create Contact</h2>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' id="name" value={form.name} onChange={handleValueChange} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />

                {
                  errors.name && (
                    <div className='invalid-feeddback'>
                      {errors.name[0]}
                    </div>

                  )
                }
              </div>

              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleValueChange} value={form.email} name='email' id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} />

                {
                  errors.email && (
                    <div className='invalid-feedback'>
                      {errors.email[0]}
                    </div>
                  )
                }
              </div>

              <div className="mb-3">
                <label htmlFor="number">Phone Number</label>
                <input type="number" onChange={handleValueChange} id="number" name='number' value={form.number} className={`form-control ${errors.number ? 'is-invalid':''}`} />

                {
                  errors.number && (
                    <div className='invalid-feedback'>
                      {errors.number[0]}
                    </div>
                  )
                }

              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <textarea name="address" id="address" value={form.address} onChange={handleValueChange} className={`form-control ${errors.address ? 'is-invalid' : ''}`}></textarea>

                {
                  errors.address && (
                    <div className='invalid-feedback'>
                      {errors.address[0]}
                    </div>
                  )
                }
              </div>

              <div className='mb-3'>
                <label htmlFor="image">Image</label>
                {
                  preview && (
                    <div style={{position: 'relative', width: 80, height:80}}>
                      <img src={preview} alt="image" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius: 8}} />
                      <span style={{position: 'absolute', top:'-8',right:'-8', cursor: 'pointer'}} onClick={removeImage}>X</span>

                    </div>
                  )
                }
                <input type="file" name='imageFile' value={form.imageFile} className={`form-control ${errors.imageFile ? 'is-invalid' : ''}` } accept='image/*'  ref={fileInputRef} onChange={handleImage} />

                
              </div>

              <div className="mb-3">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" onChange={handleValueChange}className='form-control' value={form.status}>
                  <option value="inactive">Inactive</option>
                  <option value="active">Active</option>
                </select>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <Link className='btn btn-outline-secondary' to="/">Cancel</Link>
                <button className='btn btn-primary'>{loading ? 'Saving' : 'Create'}</button>
              </div>


            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddContact