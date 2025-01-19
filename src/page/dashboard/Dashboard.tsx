import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { triggerNotification } from "../../components/toaster/ToastBar";
import "./Dashboard.css"
import { Button, Table, Tooltip } from "antd";
import SearchInput from "../../components/SearchField";
import { debounce, filter } from "lodash";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from "../task/modal/DeleteConfirmationModal";
import { taskTableValue, transformFilterList } from "./helper";
import Loader from "../../components/Loader";

interface TodoItem {
  id: string;
  title: string;
  status: "todo" | "inProgress" | "done";
  dueDate: string;
  description: string;
  assignedUser: number;
  priority: "low" | "high";
  tags: string[];
}


type FilterItem = {
  text: string;
  value: string;
};

const Dashboard = () => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const [toDoList, setToDoList] = useState([]);
  const [list, setList] = useState([]);

  const [loader, setLoader] = useState<boolean>(true);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [taskID, setTaskID] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10); 
  const [filterList, setFilterList] = useState<any>();


  const navigate = useNavigate()

  useEffect(() => {
    getTodoList();
    getUsersList();
  }, []);

  const getUsersList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/users`);
      if (response.status === 200) {
        const list:FilterItem[] = await transformFilterList(response.data)
        setFilterList(list)
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      triggerNotification("error", "", "Error while fetching data", "topRight");
    }
  };


  const tableColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a:any, b:any) => a.title.localeCompare(b.title), 

    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (data: string) => (
        <Tooltip title={data}>
        <p className={`description capitalize font-Inter cursor-pointer `}>
         {data}
        </p>
        </Tooltip>
    ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: taskTableValue,
      onFilter: (value: any, record: any) => record.status.includes(value),
      render: (data: string) => (
          <p className={`${data?.toLowerCase()} capitalize font-Inter `}>
           {data}
          </p>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a:any, b:any) => a.dueDate.localeCompare(b.dueDate), 
    },
    {
      title: 'Assigned User',
      dataIndex: 'assignedUser',
      key: 'assignedUser',
      filters: filterList,
      onFilter: (value: any, record: any) => record.assignedUser.includes(value),

    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
        render: (data: string) => (
          <p className="text-[14px] flex items-center text-[#d34a7c]">
            <span className="material-symbols-outlined text-[20px] p-1 cursor-pointer" onClick={()=>{handleEdit(data)}}>edit</span>
            <span className="material-symbols-outlined text-[20px] p-1 cursor-pointer" onClick={()=>{handleDelete(data)}}>delete</span>
          </p>
      ),
    },
  ];

  const handleEdit = (id:string)=>{
    navigate(`/tasks/${id}?isEdit=true`);
  }

  const handleDelete = (id:string)=>{
    setTaskID(id)
    setIsDelete(true)
  }

  const handlePopupModalClose = () =>{
    setIsDelete(false)

  }

  const getTodoList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/todo`);
      if (response.status === 200) {
        setToDoList(response.data);
        setList(response.data);
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      triggerNotification("error", "", "Error while fetching data", "topRight");
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event?.target?.value;
    setSearch(searchValue);
    setLoader(true)
    debouncedGetFilterData(searchValue);
  };

  const debouncedGetFilterData = useCallback(
    debounce((searchValue) => {
      const filtered = list.filter((item:TodoItem) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setToDoList(filtered);
      setLoader(false)
    }, 800),
    [list]
  );

  const handleDeleteTask = async () =>{
    try {
        const response = await axios.delete(`${baseUrl}/todo/${taskID}`);
        if (response.status === 200) {
          getTodoList();
          handlePopupModalClose()
          triggerNotification("success", "", "Task deleted successfully!!", "topRight");
          setLoader(false)
        }
      } catch (error) {
        setLoader(false)
        triggerNotification("error", "", "Error while delete data", "topRight");
      }
}

  const handleCreateTask = () =>{
    navigate('/tasks')
  }


  const handlePageChange = (page:number, pageSize:number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  return (
    <div className="full-width-container">
      {loader && <Loader/>}
      <div className="dashboard">
        <div className="flex w-full justify-between items-center mb-5">
          <p className="page-title font-Inter w-1/2 p-0">Todo List</p>
          <div className="flex w-1/2 justify-end">
            <SearchInput search={search} placeholder={'search by task title'} onChange={handleSearch} className="search-input" />
            <Button type="primary" className="add-task" onClick={handleCreateTask} >Create <span className="material-symbols-outlined " >add</span></Button>
          </div>
        </div>
       <Table loading={loader} columns={tableColumns } dataSource={toDoList} 
       pagination={{
          current: currentPage,
          pageSize: pageSize,
          onChange: handlePageChange,
          showSizeChanger: true, 
          pageSizeOptions: ['5', '10', '15', '20']
        }}/>
      </div>

      {isDelete && <DeleteConfirmationModal open={isDelete} handlePopupModalClose={handlePopupModalClose}  handleDeleteTask={handleDeleteTask}/>}

  </div>
  )
};

export default Dashboard;
