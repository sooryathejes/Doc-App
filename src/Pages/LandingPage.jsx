import { addDoc, collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToggleButton from 'react-bootstrap/ToggleButton';



function LandingPage({database}) {
    const [show, setShow] = useState(false);

    const [title,setTitle] =useState('')
    const [documents,setDocuments]=useState([])
    
      const [checked, setChecked] = useState(false);
      
    let navigate =useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const collectionRef = collection(database, 'docsData')

  const addDocument = ()=>{
    addDoc(collectionRef,
        {
            title:title,
            quillData:''
        })
        .then(()=>{
            toast.success('Doc Added successfully')
            handleClose()
            setTitle('')
        })
        .catch(()=>{
            toast.error('Cannot add Document')
             handleClose()
        })
       

  }

  const getDataFromFirebase = ()=>{
    onSnapshot(collectionRef, (data)=>{
        setDocuments(data.docs.map((doc) => {
            return {...doc.data(), id: doc.id}
        }))
    })
  }
  useEffect(()=>{
    getDataFromFirebase()
  },[])

  const getId = (id)=>{
    navigate(`/editDoc/${id}`)
  }

  const deleteDocument =(id)=>{
    const document = doc(collectionRef,id)
    deleteDoc(document)
    toast.success('Doc Deleted !!!')
   
  }
  return (
    <div style={{minHeight:'100vh'}} className='docs-main-section  d-flex flex-column align-items-center justify-content-center w-100 '>
        <h1>DOCS APP</h1>
        <ToggleButton
        onClick={handleShow}
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
      >
        ADD DOC
      </ToggleButton>
        
        <div style={{width:'80%'}} className='m-5'>
        <Row >
                {documents?.map((doc,i) => {
                    return (
                           
                      <Col sm={12} md={6} lg={2} xl={4} >
                              
                                    <Card key={i} style={{maxheight:'200px',width:'100%',boxSizing:'border-box'}}  className='me-3 mb-3 bg-primary '>
                                        <Card.Body  className='d-flex justify-content-between'>
                                           <div>
                                              <Card.Title style={{lineHeight:'20px',textAlign:'left',fontWeight:'800',fontSize:'20px', color:'whi'}}>{doc.title}</Card.Title>
                                              <Card.Text style={{lineHeight:'20px',textAlign:'left'}} className='mt-3' >
                                                            <div dangerouslySetInnerHTML={{ __html: doc.quillData }} />
                                              </Card.Text>
                                           </div>
                                           
                                            <div>
                                                <button onClick={()=>getId(doc.id)} className='buttons me-3'><i class="fa-solid fa-pen-to-square text-dark"></i></button>
                                                <button onClick={()=>deleteDocument(doc.id)} className='buttons'><i class="fa-solid fa-trash text-danger"></i></button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    </Col>
                                
           
                            

                    )
                })}
                </Row>
            </div>
           
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        title={title}
        setTitle={setTitle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Your Doc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form className=' p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  />
            </Form.Group>

            

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addDocument} variant="success">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </div>
  )
}

export default LandingPage