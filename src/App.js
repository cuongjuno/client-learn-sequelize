import './App.css';
import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Table,
} from 'reactstrap';
import axios from './axios';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [db, setDb] = useState([]);
    const [newUser, setNewUser] = useState({
        firstname: '',
        lastname: '',
        age: '',
    });
    const [editUser, setEditUser] = useState({
        firstname: '',
        lastname: '',
        age: '',
    });
    const [flag, setFlag] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        axios.get('/').then((data) => {
            setDb(data.data);
        });
    }, [flag]);

    function handleRegister() {
        axios
            .post('/', newUser)
            .then((res) => {
                setFlag(!flag);
                handleClear();
                console.log('complete');
            })
            .catch((err) => console.log(err));
    }
    function handleClear() {
        setNewUser({
            firstname: '',
            lastname: '',
            age: '',
        });
    }
    function handleUpdate(id) {
        axios
            .put(`/${id}`, editUser)
            .then((res) => {
                setFlag(!flag);
                setEdit(false)
                console.log('complete');
            })
            .catch((err) => console.log(err));
    }
    function handleDestroy(id) {
        axios
            .delete(`/${id}`)
            .then((res) => {
                setFlag(!flag);
                console.log('destroy complete');
            })
            .catch((err) => console.log(err));
    }
    function handleInput(e) {
        setNewUser((preState) => {
            return { ...preState, [e.target.name]: e.target.value };
        });
    }
    function handleInputEdit(e) {
        setEditUser((preState) => {
            return { ...preState, [e.target.name]: e.target.value };
        });
    }
    return (
        <div className='App '>
            <Navbar color='light' light expand='md'>
                <NavbarBrand href='/'>Sequelize</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className='mr-auto' navbar>
                        <NavItem>
                            <NavLink href='/components/'>Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href='https://github.com/reactstrap/reactstrap'>
                                GitHub
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>Nothing</DropdownItem>
                                <DropdownItem>Nothing 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Nothing 3</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Nothing</NavbarText>
                </Collapse>
            </Navbar>

            <div className=''>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Activity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope='row'></th>
                            <td>
                                <input
                                    placeholder='Nhập họ'
                                    name='firstname'
                                    value={newUser.firstname}
                                    onChange={handleInput}
                                ></input>
                            </td>
                            <td>
                                <input
                                    placeholder='Nhập tên'
                                    name='lastname'
                                    value={newUser.lastname}
                                    onChange={handleInput}
                                ></input>
                            </td>
                            <td>
                                <input
                                    type='number'
                                    min='0'
                                    max='100'
                                    placeholder='Nhập tuổi'
                                    name='age'
                                    value={newUser.age}
                                    onChange={handleInput}
                                ></input>
                            </td>
                            <td>
                                <span
                                    className='focus-span'
                                    onClick={handleRegister}
                                >
                                    Register
                                </span>
                                <span>/</span>
                                <span
                                    className='focus-span'
                                    onClick={handleClear}
                                >
                                    Clear
                                </span>
                            </td>
                        </tr>
                        {db.map((data, index) =>
                            edit != data.id ? (
                                <tr key={data.id}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{data.firstname}</td>
                                    <td>{data.lastname}</td>
                                    <td>{data.age}</td>
                                    <td>
                                        <span
                                            className='focus-span'
                                            onClick={() => setEdit(data.id)}
                                        >
                                            Edit
                                        </span>
                                        <span>/</span>
                                        <span
                                            className='focus-span'
                                            onClick={() =>
                                                handleDestroy(data.id)
                                            }
                                        >
                                            Destroy
                                        </span>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>
                                        <input
                                            placeholder='Nhập họ'
                                            name='firstname'
                                            value={editUser.firstname}
                                            onChange={handleInputEdit}
                                        ></input>
                                    </td>
                                    <td>
                                        <input
                                            placeholder='Nhập tên'
                                            name='lastname'
                                            value={editUser.lastname}
                                            onChange={handleInputEdit}
                                        ></input>
                                    </td>
                                    <td>
                                        <input
                                            type='number'
                                            min='0'
                                            max='100'
                                            placeholder='Nhập tuổi'
                                            name='age'
                                            value={editUser.age}
                                            onChange={handleInputEdit}
                                        ></input>
                                    </td>
                                    <td>
                                        <span
                                            className='focus-span'
                                            onClick={() =>
                                                handleUpdate(data.id)
                                            }
                                        >
                                            Update
                                        </span>
                                        <span>/</span>
                                        <span
                                            className='focus-span'
                                            onClick={() => setEdit(false)}
                                        >
                                            Cancel
                                        </span>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default App;
