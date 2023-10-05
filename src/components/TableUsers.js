import axios from "axios";
import { useEffect, useState } from "react";
//import { Table } from "react-bootstrap";
import { fetchAllUser } from "../service/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalsAddNew";
import ModalEditUser from "./ModalEditUser";
import _ from "lodash";
import ModalConfirm from "./ModalConfirm";

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const [isShowEdit, setShowEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalAddNew, setIsShowModelAddNew] = useState(false);
    const [dataUserDel, setDataUserDel] = useState({});

    const [isShowModalDel, setShowModalDel] = useState(false);
  
    const handleClose = () => {
        setIsShowModelAddNew(false);
        setShowEdit(false);
        setShowModalDel(false);
    }

    useEffect(() => {
        //call api
        getUsers(1);
    },[])

    const getUsers = async(page) => {
        let res = await fetchAllUser(page);
        //res.data: axios
        //res.data.data: of api
        //console.log(">>>check new res: ", res);
        if(res && res.data ) {
            setListUsers(res.data)
            setTotalUser(res.total)
            setTotalPage(res.total_pages)
            //console.log(">>>res data: ", res)
        }
        //console.log(">>>check res: ", res)
    }

    //console.log(listUsers);

    const handlePageClick = (event) => {
        console.log("event lib: ", event);
        getUsers(+event.selected + 1)
    }

    const handleUpdateTable = (user) => {
        setListUsers([...listUsers, user])
    }

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setShowEdit(true);
    }

    const handleEditUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        let index = listUsers.findIndex(
            item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        // cloneListUser[index].last_name = user.last_name;
        // cloneListUser[index].email = user.email;

        setListUsers(cloneListUser);

    }

    const handleDelUser = (user) => {
        setShowModalDel(true);
        setDataUserDel(user);
        //console.log(user)
    }

    const handleDelUserFromModal = (user) => {
        let cloneListUser = _.cloneDeep(listUsers);
        cloneListUser = cloneListUser.filter(item => item.id !== user.id)
        let index = listUsers.findIndex(
            item => item.id === user.id);
        cloneListUser[index].first_name = user.first_name;
        // cloneListUser[index].last_name = user.last_name;
        // cloneListUser[index].email = user.email;

        setListUsers(cloneListUser);
    }

    return (
    <>

        <div className='my-3'>
            <span className='my-3 add-new'>
              <b> List Users:</b>
              <button className='btn btn-success' 
              onClick={() => setIsShowModelAddNew(true)}>Add New user</button>
            </span>
            
        </div>

        <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">No.Phone</th>
                <th scope="col">D.o.B</th>
                <th scope="col">Email</th>
                <th scope="col">Adress</th>
                <th scope="col">Actions</th>

                </tr>
            </thead>
            <tbody>
                {listUsers && listUsers.length>0 && 
                listUsers.map((item,index) => {
                    return(
                        <tr key={`users-${index}`}>
                        <th >{index+1}</th>
                        <td scope="row">{item.id}</td>
                        
                       <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td></td>
                        <td></td>
                        <td>{item.email}</td>
                        <td></td>
                        
                        <td>
                            <button className="btn btn-warning mx-3"
                            onClick={() => handleEditUser(item)}>Edit</button>
                            <button className="btn btn-danger"
                            onClick={() => handleDelUser(item)}>Delete</button>
                        </td>
                        </tr>
                    )
                })
                }

                
            </tbody>
        </table>

        <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            previousLabel ="< previous"
            renderOnZeroPageCount={null}

            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeLinkClassName="active"
        />

        <ModalAddNew
          show = {isShowModalAddNew}
          handleClose = {handleClose}
          handleUpdateTable = {handleUpdateTable}
        />

        <ModalEditUser
            show={isShowEdit}
            dataUserEdit = {dataUserEdit}
            handleClose = {handleClose}
            //handleUpdateTable = {handleUpdateTable}
            handleEditUserFromModal = {handleEditUserFromModal}
        />

        <ModalConfirm
            show = {isShowModalDel}
            handleClose = {handleClose}
            dataUserDel = {dataUserDel}
            handleDelUserFromModal = {handleDelUserFromModal}
        />


    </>
    )
}

export default TableUsers;