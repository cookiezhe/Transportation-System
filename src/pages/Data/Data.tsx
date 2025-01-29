import { Card, Button, Form, Input, Table, Space,Modal, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import MyUpload from '../../componnets/MyUpload'

export default function StudentType() {
  const [isShow, setIsShow] = useState(false)//控制modal的显示和隐藏
  const [myForm] = Form.useForm()//可以获取表单元素实例
  return (
    <>
        <Card
          title='数据统计'
          extra={
            <>
              <Button
                type="primary" 
                style={{marginRight:'5px'}}
              >下载</Button>
              <Button 
                type="primary" 
                onClick={()=>{
                  setIsShow(true)
                }}
              >上传</Button>
            </>
          }
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form 
              layout="inline" 
              onFinish={(v)=>{
                message.success('查询成功')
                console.log(v);
                
              }}
            >
            <Form.Item label="搜索" name="search">
                <Input placeholder="请输入关键词" />
              </Form.Item>
              <Form.Item>
                <Button 
                htmlType="submit"
                type="primary" 
                icon={<SearchOutlined />} 
              />
              </Form.Item>
            </Form>
            <Table columns={[
              {
                title: '序号',
                width: 80,
                align: 'center'
              }, {
                title: '采集时间',
                width: 150,
              }, {
                title: '数据类型',
                width: 200
              }, {
                title: '数据'
              }, {
                title: '位置'
              }, {
                title: '操作'
              }]}
            />
          </Space>
        </Card>
        <Modal 
            title='编辑' 
            open={isShow} //对话框是否可见
            maskClosable={false}//点击遮罩层时模态框不关闭
            onCancel={()=>setIsShow(false)}//点击遮罩层或右上角叉或取消按钮的回调
            destroyOnClose//关闭模态框的时候清除数据
            onOk={()=>[
              // message.success('保存成功')
              myForm.submit()//手动触发表单的提交事件
            ]}
        >
            <Form 
                onFinish={(v)=>{
                  message.success('保存成功')
                  console.log(v)}}
                labelCol={{span:4}}
                form={myForm}
                preserve={false}//表单配合模态框一起使用的时候，需要设置这个属性，要不然关了窗口之后不会清空数据
            >
              <Form.Item label="数据标题" name="name" rules={[
                {
                  required:true,
                  message:'请输入名字'
                }
              ]}>
                <Input placeholder="请输入名字"/>
              </Form.Item>
              <Form.Item 
                label='数据文件' 
                name="dataDocument"
                rules={[
                  {
                    required: true,
                  }]}
              >
                <MyUpload />
              </Form.Item>
              <Form.Item label="采集时间" name="info">
                <Input placeholder="请输入采集时间" />
              </Form.Item>
              <Form.Item label="数据类型" name="info">
                <Input placeholder="请输入数据类型" />
              </Form.Item>
            </Form>
        </Modal>
    </>
  )
}
