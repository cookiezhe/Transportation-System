import React, { useState } from 'react'
import {
    DashboardOutlined,
    UserOutlined,
    AreaChartOutlined,
    DatabaseOutlined
} from '@ant-design/icons';

import Users from '../pages/Users/Users'
import Data from '../pages/Data/Data'
import Analysis from '../pages/Analysis/Analysis'
import System from '../pages/SystemManage/SystemManage'
import Screen from '../pages/Screen/Screen'

export const context = React.createContext<any>({})

export const sideMenuData = [
    {
        key: '/admin/data',
        icon: <DatabaseOutlined />,
        element: <Data />,
        label: '数据统计',
    },
    {
        key: '/admin/analysis',
        icon: <AreaChartOutlined />,
        element: <Analysis />,
        label: '数据分析',
    },
    {
        key: '/admin/screen',
        icon: <AreaChartOutlined />,
        element: <Screen />,
        label: '大屏展示',
    },
    {
        key: '/admin/system',
        icon: <DashboardOutlined />,
        element: <System />,
        label: '系统管理',
        // roles限制用户权限
        roles: ['admin', 'editor']
    },
    {
        key: '/admin/users',
        icon: <UserOutlined />,
        element: <Users />,
        label: '用户管理',
    }]

// 根据roles生成侧边栏菜单
function findRoles(role: string) {
    const arr: any = []

    findInfo(sideMenuData)
    function findInfo(data: any, parent: any = null) {
        data.forEach((item: any) => {
            const { children, ...info } = item
            // 判断菜单是否有子集，如果有子集则对子集递归
            if (children) {
                info.children = []
                findInfo(children, info.children)
                info.children.length == 0 ? delete info.children : null
            }
            // 若菜单没有子集，则直接判断权限
            if (info.roles) {
                if (info.roles?.includes(role))
                    parent ? parent.push(info) : arr.push(info)
            } else {
                parent ? parent.push(info) : arr.push(info)
            }
        });
    }

    return arr
}

// 根据侧边栏实现路由信息的扁平化处理
function flatRoutes(menus: any) {
    const arr: any = []
    function findInfo(data: any) {
        data.forEach((item: any) => {
            const { children, ...info } = item
            arr.push(info)
            if (children) {
                findInfo(children)
            }
        });
    }
    findInfo(menus)
    return arr
}

export default function AppProvider({ children }: any) {

    const [menus, setMenus] = useState([])
    const [routes, setRoutes] = useState([])
    // 根据当前的角色生成路由数组和侧边栏数组
    const resetMenus = (role: string) => {

        console.log("Original sideMenuData:", sideMenuData);//打印原始菜单数据

        // 此处重置菜单和路由数据
        const tmpMenu = findRoles(role)
        setMenus(tmpMenu)
        const flatRouteList = flatRoutes(tmpMenu);
        setRoutes(flatRouteList)
    }
    return (
        <context.Provider value={{ menus, routes, resetMenus }}>
            {children}
        </context.Provider>
    )
}
