import React, { useEffect, useState, useRef } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useUser } from "../contexts/userContext";
import {  getComunicacionFromEstudiante, getOneEstudiante } from '../services/users.services'
import { SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import { Button, Input, Space, Table, Tag } from 'antd';
import Highlighter from 'react-highlight-words'

function EstudianteDet() {

    const {user,setUser} = useUser();
    const {id} = useParams()
    const [comunicaciones, setComunicaciones] = useState();
    const [estudiante, setEstudiante] = useState();

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
        traerComunicaciones()
        traerEstudiante()
}, []);   



const traerEstudiante = async() =>{
    const response = await getOneEstudiante(id)    
    setEstudiante(response.data.estudiante[0])
}


const gotoBack = () =>{navigate(`/home`)}

const traerComunicaciones = async() =>{
    const response = await getComunicacionFromEstudiante(id)
    setComunicaciones(response.data.comunicaciones)
}

function sortByDate(a, b) {
    if (a.createdAt < b.createdAt) {
        return 1;
    }
    if (a.createdAt > b.createdAt) {
        return -1;
    }
    return 0;
}
comunicaciones?.sort(sortByDate)

const columns = [
    {
        title: 'Fecha',
        dataIndex: 'createdAt',
        key: 'fecha',
        width: '15%',
        ...getColumnSearchProps('createdAt'),
        render: (createdAt) => {
        return (
            <div> 
                <p>{moment(createdAt).format("DD-MM-YYYY")}</p>
            </div>
        );
        },
    },
    {
      title: 'Asunto',
      dataIndex: 'asunto',
      key: 'asunto',
      width: '25%',
      ...getColumnSearchProps('asunto'),
    },
    {
        title: 'Visto',
        dataIndex: 'leido',
        key: 'leido',
        width: '15%',
        render:(value) => {
           if (value === true){
           let color = 'blue';
            return (
                <Tag color={color} key={value}>
                  Read
                </Tag>
              );
           }
            else
            {
                let color = 'red';
                return (
                    <Tag color={color} key={value}>
                      Unread
                    </Tag>
                  );
               }
                
            
        },

            
        
      },
    {
      title: 'Comunicacion',
      dataIndex: 'comunicacion',
      key: 'comunicacion',
      width: '55%',
      ...getColumnSearchProps('comunicacion'),
    },

    {
        title: 'Repuesta',
        dataIndex: 'respuesta',
        key: 'respuesta',
        width: '15%',
        ...getColumnSearchProps('respuesta'),
      },
    
    
];
  return (
    <div className='form-container-profesor'>
        <div className='form-header'>
            <h4 className='form-header'> Alumno {estudiante?.firstName} {estudiante?.lastName}</h4>
            <div className="justify-btn">
                <button className='btn btn-outline-light' onClick={gotoBack}>Volver</button>        
            </div>
        </div>
        <Table columns={columns} dataSource={comunicaciones} />
    </div>
  )
}

export default EstudianteDet