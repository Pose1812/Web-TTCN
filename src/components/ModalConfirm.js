import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {deleteUser} from '../service/UserService'
import {toast} from 'react-toastify'

const ModalConfirm = (props) =>  {

    const {show, handleClose, dataUserDel, handleDelUserFromModal} = props;
    
    const confirmDelete = async() => {
        let res = await deleteUser(dataUserDel.id);
        if(res && +res.statusCode === 204){
            toast.success("Delete ok");
            handleClose();
            handleDelUserFromModal(dataUserDel);

        }
        else{
            toast.error("Sorry")
        }
        console.log(">>>check res: ", res)
    }
    
  return (
    <>
      <Modal show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='body-add-new'>
                R u sure?
                <br/>
                <b>User:  {dataUserDel.id}-{dataUserDel.first_name}</b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" 
          onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;