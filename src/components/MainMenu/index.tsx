import React,{ useState } from 'react'
import type { MenuProps } from 'antd';
import { Menu } from 'antd'
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', 'page1', <PieChartOutlined />),
  getItem('Option 2', 'page2', <DesktopOutlined />),
  getItem('User', 'page3', <UserOutlined />, [
    getItem('Tom', 'page3/page301'),
    getItem('Bill', 'page3/page302'),
    getItem('Alex', 'page3/page303'),
  ]),
  getItem('Team', 'page4', <TeamOutlined />, [
    getItem('Team 1', 'page4/page401'), 
    getItem('Team 2', 'page4/page402')
  ]),
  getItem('Files', 'page5', <FileOutlined />),
];


const MainMenu:React.FC = ()=>{
  

  //Load required hooks
  const navigateTo = useNavigate()
  const currentRoute = useLocation()

  
  // When clicking on a menu link, jump to the corresponding router
  const menuClick = (e:{key:string})=>{
    navigateTo(e.key)
  }

  //when clicking on a expanding menu 
  const handleChange = (key:string[])=>{
    
    setOpenKeys([key[key.length-1]])
  }

  //key config
  let firstKey:string = "";
  // for (let i = 0; i<items.length;i++){
  //   if (items[i]['children']){
  //     if(items[i]['children'].find((child: { key: string; }) => child.key===currentRoute.pathname.slice(1))!=null){
  //       firstKey = items[i].key;
  //     }
  //   }
  // }
  const parent = currentRoute.pathname.slice(1).split('/')
  firstKey = parent[0];

  //Config States
  const [openKeys,setOpenKeys] = useState([firstKey]);

  return (
    <Menu 
        theme="dark" 
        defaultSelectedKeys={[currentRoute.pathname.slice(1)]} 
        mode="inline" items={items} 
        onClick={menuClick} 
        onOpenChange={handleChange} 
        openKeys={openKeys}
    />
  )
}
export default MainMenu;