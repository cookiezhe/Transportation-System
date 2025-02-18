import { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    UserOutlined,
    AreaChartOutlined,
    DatabaseOutlined,
    DownOutlined,
    FundProjectionScreenOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme,Dropdown,Space } from 'antd';
import { defaultImg as logo } from "../utils/tools"
import { useNavigate, useLocation } from 'react-router-dom';
import { Breadcrumb } from "antd";
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

// 菜单栏数据
export const sideMenuData = [
    {
        key: '/admin/data',
        icon: <DatabaseOutlined />,
        label: '数据统计',
    },
    {
        key: '/admin/analysis',
        icon: <AreaChartOutlined />,
        label: '数据分析',
    },
    {
        key: '/admin/screen',
        icon: <FundProjectionScreenOutlined />,
        label: '大屏展示',
    },
    {
        key: '/admin/system',
        icon: <DashboardOutlined />,
        label: '系统管理',
        // roles限制用户权限
        roles: ['admin', 'editor']
    },
    {
        key: '/admin/users',
        icon: <UserOutlined />,
        label: '个人中心',
    }]

// 根据当前路径遍历侧边栏菜单数据，找出与当前路径匹配的菜单项的key，将收集到的key数据设置menu组件的openkeys属性，控制那些子菜单是展开的
const findOpenKeys = (key: string) => {
    const result: string[] = []

    const findInfo = (arr: any) => {
        arr.forEach((item: any) => {
            if (key.includes(item.key)) {
                result.push(item.key)
                if (item.children) {
                    findInfo(item.children) //使用递归的方式查找当前页面刷新之后的默认选中项
                }
            }

        })
    }
    return result
}

// 下拉菜单
const items: MenuProps['items'] = [
    // 个人中心
    {
        key: 'user',
        label: <a>个人中心</a>,
    },
    // 退出
    {
        key: 'logout',
        label: <a>退出</a>,
    },
];

// 生成面包屑(获取当前选中数据的所有父节点)
const findDeepPath = (key: string) => {
    const result: any = [];//处理完所有的menu数据成为一个一维数组
    const findInfo = (arr: any) => {
        arr.forEach((item: any) => {
            const { children, ...Info } = item//将多维数据转换成一维数据（数据的扁平化）
            result.push(Info)
            if (children) {
                findInfo(children)//递归处理子节点
            }
        });
    }
    findInfo(sideMenuData); // 对根菜单开始递归扁平化

    // 根据当前传递的key值过滤数据，获取当前用来显示的menu item数据
    const tmpData = result.filter((item: any) => key.includes(item.key));

    // 如果过滤后有数据，则在前面添加“首页”项
    if (tmpData.length > 0) {
        return [{ title: '首页', key: '/admin' }, ...tmpData.map((item: any) => ({ title: item.label, key: item.key }))];
    }

    return []
}

const MyLayout = ({ children }: any) => {
    // const { menus } = useContext(context)

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()
    const { pathname } = useLocation()//获取location中的数据
    console.log(pathname);
    
    const isScreenPage = pathname === '/admin/screen'//判断是否为大屏页面
    console.log(isScreenPage);
    
    const tmpOpenKeys = findOpenKeys(pathname)
    // 获取面包屑数据
    const [breadcrumbs, setBreadcrumbs] = useState<any>([])
    // 监听pathname的改变，重新设置面包屑数据
    useEffect(() => {
        setBreadcrumbs(findDeepPath(pathname))
    }, [pathname])

    // 下拉菜单点击事件
    const onClick =({key}:any)=>{
        console.log(key);
        if(key=='logout'){
            navigate('/login')
        }else{
            navigate('/admin/users')
        }
    }


    return (
        <Layout style={{ width: '100vw', height: '100vh' }}>
            {/* 菜单栏 */}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                {/* <div className="demo-logo-vertical" /> */}
                <div className="logoImg">
                    <img src={logo} /> 
                </div> 
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultOpenKeys={tmpOpenKeys}
                    defaultSelectedKeys={tmpOpenKeys}//初始选中的菜单项key数组
                    onClick={({ key }) => {
                        navigate(key)
                    }}
                    items={sideMenuData}
                />
            </Sider>
            <Layout style={{ maxWidth:' 100vw',
                /* 限制宽度最大为视口的宽度 */
                maxHeight: '100vh',
                /* 限制高度最大为视口的高度 */
                overflow:'hidden'}}>

                {/* 右侧头部 */}
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <span className='app-title' style={{paddingLeft:'23px'}}>智能交通管理系统</span>
                    {/* 头像下拉-个人中心、退出部分 */}
                    <Dropdown menu={{ items, onClick }}>
                        <a 
                            onClick={(e) => e.preventDefault()}
                            style={{float:'right',margin:'0 20px'}}
                        >
                            <Space>
                                <img src={logo} style={{width:'30px', borderRadius:'100%'}} />
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>
                {/* 右侧展示区 */}
                <Content
                    style={{
                        margin: isScreenPage ? '0':'24px 16px',//大屏页面无边距
                        padding:  '24px',//大屏页面无内边距
                        // paddingTop:5,
                        minHeight: '100%',//保证全屏高度
                        background: colorBgContainer,
                        borderRadius:  borderRadiusLG,
                    }}
                >
                    {/* 面包屑展示菜单路径 */}
                    {/* <Breadcrumb items={breadcrumbs} style={{ margin: '10px' }} /> */}
                    {/* 路由展示区 */}
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default MyLayout;