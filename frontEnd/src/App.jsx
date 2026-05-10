import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import ContactList from './pages/ContactList'
import AddContact from './pages/AddContact'
import EditContact from './pages/EditContact'

const App = () => {
  return (
    <>
      <nav className='navbar bg--white border-bottom shadow-sm'>
        <div className="container">
          <Link to="/" className='navbar-brand fw-bold text-primary'>Contact Manager</Link>
          <Link to="/create" className='btn btn-primary btn-sm'>+ Add Contact</Link>
        </div>
      </nav>
      <div className="container py-4">
        <Routes>
          <Route path='/' element={<ContactList />} />
          <Route path='/create' element={<AddContact />} />
          <Route path='/:id/edit' element={<EditContact />} />
        </Routes>
      </div>
      
    </>
  )
}


export default App