import React, { useEffect, useState, useRef } from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';
import { useUser } from "../contexts/userContext";
import {  getComunicacionFromEstudiante } from '../services/users.services'
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import {BooleanField } from "@pankod/refine-antd";
import moment from 'moment';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words'

function EstudianteDet() {

    const {user,setUser} = useUser();
    const {id} = useParams()
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
        traerComunicaciones()
}, []);   



const traerComunicaciones = async() =>{
    const response = await getComunicacionFromEstudiante(id)
    console.log("Estas son las comunicaciones", response.data.comunicaciones)
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
        width: '30%',
        ...getColumnSearchProps('createdAt'),
        render: (createdAt) => {
        return (
            <div> 
                <p>{moment(createdAt).format("DD-MM-YYYY hh:mm:ss")}</p>
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
           if (value === true)
            return <CheckCircleOutlined style={{color:"green", marginLeft:15}}/>
            else
            return <CloseCircleOutlined style={{color:"red", marginLeft:15}}/>
                
            
        }
        
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
    <div>
        <Table columns={columns} dataSource={comunicaciones} />
    </div>
  )
}

export default EstudianteDet