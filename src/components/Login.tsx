import { Button, Checkbox, Form, Input, Modal } from 'antd'

import docCookies from 'src/utils/cookies'
import { login } from 'src/request/login'
import { register } from 'src/request/register'
import { logout } from 'src/request/logout'

type FieldType = {
  username: string
  password: string
  registerAndLogin?: boolean
}

const Login = () => {
  // 校验登录
  const auth = docCookies.getItem('sessionId')
  const name = docCookies.getItem('username')

  const handleOk = () => {
    window.location.reload()
  }
  // 用户已经登录
  if (auth) {
    return (
      <Button
        type="primary"
        danger
        onClick={() =>
          logout(() => {
            handleOk()
          })
        }
      >
        {name} 退出
      </Button>
    )
  }
  // 用户没有登录
  const onFinish = ({ username, password, registerAndLogin }: FieldType) => {
    if (registerAndLogin) {
      handleRegisterAndLogin({ name: username, password })
    }
    login({ name: username, password }, () => {
      handleOk()
    })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const handleRegisterAndLogin = (values: { name: string; password: string }) => {
    register(values, () => {
      login({ ...values, name: values.name }, () => {
        handleOk()
      })
    })
  }

  return (
    <Modal title="注册与登录" closable={false} open={true} footer={[]}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          name="registerAndLogin"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>注册并登录</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Login
