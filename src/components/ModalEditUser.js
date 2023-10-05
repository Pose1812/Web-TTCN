import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { putUpdateUser } from '../service/UserService';
import {toast} from 'react-toastify';
import { useEffect } from 'react';



const ModalEditUser = (props) =>  {

    const {show, handleClose, dataUserEdit, handleEditUserFromModal} = props;
    const [Fname, setFName] = useState("");
    const [Lname, setLName] = useState("");
    //const [sex, setSex] = useState("");
    const [numberPhone, setNumberPhone] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");


    const handleEditUser = async () => {
        let res = await putUpdateUser(Fname,Lname);
        if(res && res.updatedAt){
            //success
            handleEditUserFromModal({
                first_name: Fname,
                last_name: Lname,
                id: dataUserEdit.id
                
            })
            handleClose();
            toast.success("Update ok");
        }
        //console.log(res)
    }

    //console.log(">>> check props: ", dataUserEdit);

    useEffect(() => {
        if(show){
            setFName(dataUserEdit.first_name);
            setLName(dataUserEdit.last_name);
        }
    },[dataUserEdit])
    //when data change and modal is opened
    
  return (
    <>
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header closeButton>
          <Modal.Title>Edit user information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                
            <form>
                <div className="mb-3">
                    <label className='form-label'>First Name</label>
                    <input type="text" className="form-control"
                    value={Fname} 
                    onChange={(event) => setFName(event.target.value)}/>
                </div>

                <div className="mb-3">
                    <label className='form-label'>Last Name</label>
                    <input type="text" className="form-control"
                    value={Lname} 
                    onChange={(event) => setLName(event.target.value)}/>
                </div>

                {/* <div className="mb-3 form-check">
                    <label>Gender: </label> <br/>
                    <label for="male">Male:</label>
                    <input type="radio" id="male" name="gender" value="male"
                    />

                    <label for="female">Female:</label>
                    <input type="radio" id="female" name="gender" value="female"/>

                    <label for="other">Other:</label>
                    <input type="radio" id="other" name="gender" value="other"/>
                </div> */}

                <div className="mb-3">
                    <label className="form-label">Number phone</label>
                    <input type="tel" className="form-control"
                    value={numberPhone} 
                    onChange={(event) => setNumberPhone(event.target.value)}/>
                </div>

                <div className="mb-3">
                    <label className='form-label'>Date of birth</label>
                    <input type="date" className="form-control"
                    value={dob} 
                    onChange={(event) => setDob(event.target.value)}/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)}/>
                    {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                </div>

                <div className='mb-3'>
                    <label className='form-label'> Address</label>
                    <input type="text" className="form-control"
                    value={address} 
                    onChange={(event) => setAddress(event.target.value)}/>
                </div>
            
            </form>

            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" 
          onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" 
          onClick={() => handleEditUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;