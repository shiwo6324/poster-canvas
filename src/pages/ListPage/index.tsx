import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCanvas, getCanvasList } from 'src/request/canvas'
import { logout } from 'src/request/logout'
import { Box, Button, Space, Table } from '@mantine/core'
import docCookies from 'src/utils/cookies'

interface ListItem {
  id: number
  type: string // 页面、模板页面
  title: string
  content: string
}
const ListPage = () => {
  const username = docCookies.getItem('name')

  const navigate = useNavigate()
  const logout = () => {
    docCookies.removeItem('sessionId')
    docCookies.removeItem('name')
    // navigate("/");
    window.location.href = '/'
  }

  const [list, setList] = React.useState([])
  const fresh = () => {
    getCanvasList('', (res: any) => {
      const data = res.content || []
      // 不让用户编辑这三个模板页
      // data = data.filter((item: ICmp) => item.id !== 2 && item.id !== 30 && item.id !== 31)
      setList(data)
    })
  }
  React.useEffect(() => {
    fresh()
  }, [])

  const del = (values: { id: number }) => {
    deleteCanvas(values, () => {
      alert('删除成功')
      fresh()
    })
  }
  const editUrl = (item: ListItem) => `/?id=${item.id}&type=${item.type}`
  // const columns = [
  //   {
  //     title: 'id',
  //     key: 'id',
  //     render: (item: ListItem) => {
  //       return <Link to={editUrl(item)}>{item.id}</Link>
  //     },
  //   },
  //   {
  //     title: '标题',
  //     key: 'title',
  //     render: (item: ListItem) => {
  //       const title = item.title || '未命名'
  //       return <Link to={editUrl(item)}>{title}</Link>
  //     },
  //   },

  //   {
  //     title: '类型',
  //     key: 'type',
  //     render: (item: ListItem) => {
  //       const typeDesc = item.type === 'content' ? '页面' : '模板页'
  //       return <div className="red">{typeDesc}</div>
  //     },
  //   },

  //   {
  //     title: '动作',
  //     key: 'action',
  //     render: (item: ListItem) => {
  //       const { id } = item
  //       return (
  //         <Space size="middle">
  //           <a target="_blank" href={'https://builder-lemon.vercel.app/?id=' + id}>
  //             线上查看（切移动端）
  //           </a>

  //           <Link to={editUrl(item)}>编辑</Link>
  //           <Button onClick={() => del({ id })}>删除</Button>
  //         </Space>
  //       )
  //     },
  //   },
  // ]
  const elements = [
    { id: 6, title: 12.011, type: 'C', action: 'Carbon' },
    { id: 7, title: 14.007, type: 'N', action: 'Nitrogen' },
    { id: 39, title: 88.906, type: 'Y', action: 'Yttrium' },
    { id: 56, title: 137.33, type: 'Ba', action: 'Barium' },
    { id: 58, title: 140.12, type: 'Ce', action: 'Cerium' },
  ]
  const rows = elements.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      {
        <Table.Td>
          {
            <Box
              style={{
                gap: '30px',
                alignItems: 'center',
              }}
              display={'flex '}
            >
              <a target="_blank" href={'https://builder-lemon.vercel.app/?id=' + element.id}>
                线上查看（切移动端）
              </a>
              <Box
                style={{
                  gap: '15px',
                  alignItems: 'center',
                }}
                display={'flex '}
              >
                <Button size="xs">编辑</Button>
                <Button color="red" size="xs">
                  删除
                </Button>
              </Box>
            </Box>
          }
        </Table.Td>
      }
    </Table.Tr>
  ))
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>id</Table.Th>
          <Table.Th>标题</Table.Th>
          <Table.Th>类型</Table.Th>
          <Table.Th>操作</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}

export default ListPage
