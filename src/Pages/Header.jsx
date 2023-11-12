import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <div><Navbar expand="lg" className="bg-body-dark">
      
    <Container>
      <Navbar.Brand href="#home"><img className='logo'  src="https://th.bing.com/th/id/R.eb9b433e2960ab2490b66902913802eb?rik=LZnqmFQm9pmPKg&riu=http%3a%2f%2fassets.stickpng.com%2fimages%2f61447cd55953a50004ee16d9.png&ehk=WVkLpTdqSsFo5kw%2bPA8e0uEhWwHDasco7tOtJPHCCs8%3d&risl=&pid=ImgRaw&r=0" alt=""  /></Navbar.Brand> 
   
    </Container>
  </Navbar></div>
  )
}

export default Header