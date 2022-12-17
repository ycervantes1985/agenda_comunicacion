import React, { useEffect, useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useUser } from "../contexts/userContext";
import { getAllEstudiantes, deleteEstudiante } from '../services/users.services'
import { SearchOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words'
import Container from 'react-bootstrap/esm/Container';
import Swal from 'sweetalert2'

function Profesor() {

    const {user,setUser} = useUser();
    const [estudiantes, setEstudiantes] = useState();
    const [comunicaciones, setComunicaciones] = useState();
    const navigate = useNavigate()

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters({ confirm: true })
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
            style={{
            padding: 8,
            }}
            onKeyDown={(e) => e.stopPropagation()}
        >
            <Input
                ref={searchInput}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                style={{
                marginBottom: 8,
                display: 'block',
            }}
            />
            <Space>
            <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                width: 90,
            }}
            >
                Search
            </Button>
            <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                width: 90,
            }}
            >
                Reset
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                confirm({
                closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
            }}
            >
            Filter
            </Button>
            <Button
                type="link"
                size="small"
                onClick={() => {
                close();
                }}
            >
                close
            </Button>
            </Space>
        </div>
        ),
        filterIcon: (filtered) => (
        <SearchOutlined
            style={{
            color: filtered ? '#1890ff' : undefined,
            }}
        />
        ),
        onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
        },
        render: (text) =>
        searchedColumn === dataIndex ? (
        <Highlighter
            highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
        />
        ) : (
        text
        ),
    });

    useEffect(() => {
        traerEstudiantes()
        
}, []);   

const traerEstudiantes = async() =>{
    const response = await getAllEstudiantes(URL)
    setEstudiantes(response.data)
}

const gotoAddC = (id) =>{navigate(`/add-comunicacion/${id}`)}

const gotoAddAll = () =>{navigate(`/add-comunicacion/`)}



const columns = [
    {
        title: 'Nombre',
        dataIndex: 'firstName',
        key: 'firstName',
        width: '30%',
        ...getColumnSearchProps('firstName'),
    },
    {
        title: 'Apellidos',
        dataIndex: 'lastName',
        key: 'lastName',
        width: '20%',
        ...getColumnSearchProps('lastName'),
    },
    
    {
        title: 'Actions',   
        dataIndex: '_id', 
        width: '20%',    
        render: (record) =>{
            return (
                <>
                <Link to={'/estudiante/comunicaciones/'+record} className="btn btn-outline-primary" style={{ marginRight:15}}>Comunicaciones</Link>
                
                <DeleteOutlined onClick={()=>{
                    onDeleteEstudiante(record)
                }} style={{color:"red", marginLeft:15}}></DeleteOutlined>
                <FileAddOutlined onClick={()=>{
                    gotoAddC(record)
                }} style={{color:"blue", marginLeft:25}}/>
                </>
                
            )
        },      
    
    },
];

const onDeleteEstudiante = async (record) =>{
    try {
        await deleteEstudiante(record);
        setEstudiantes(estudiantes.filter(estudiante => estudiante._id !== record));
        Swal.fire('Se ha eliminado un estudiante')
    } catch(err) {
            console.log("Error", err)
    }


}


return (
    <div className='form-container-profesor'>
        <div className='form-header'>
            <h4 className='form-header'>Lista de Alumnos</h4>
                <div className="justify-btn">
                    <button className='btn btn-outline-light' onClick={gotoAddAll}>Comunicación grupal</button>
                </div>
        </div>
            <Table columns={columns} dataSource={estudiantes} />        
    </div>
)
}

export default Profesor