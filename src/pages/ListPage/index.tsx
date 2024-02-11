import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCanvas, getCanvasList, saveAsTemplate } from 'src/request/canvas'
import { logout } from 'src/request/logout'
import { Box, Button, Table } from '@mantine/core'
import docCookies from 'src/utils/cookies'

export interface ListItem {
  id: string
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

  const [list, setList] = React.useState<ListItem[]>([])
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

  const del = (id: string) => {
    deleteCanvas(id, () => {
      alert('删除成功')
      fresh()
    })
  }
  const handleEditPage = (item: ListItem) => {
    const url = `/edit?id=${item.id}&type=${item.type}`
    navigate(url)
  }
  const handleSaveTemplage = (item: ListItem) => {
    saveAsTemplate({ item }, () => {
      alert('保存成功')
      fresh()
    })
  }
  const rows = list.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.type === 'content' ? '页面' : '模板页'}</Table.Td>
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
              <a
                target="_blank"
                href={'https://builder-lemon.vercel.app/?id=' + element.id}
              >
                线上查看（切移动端）
              </a>
              <Box
                style={{
                  gap: '15px',
                  alignItems: 'center',
                }}
                display={'flex '}
              >
                <Button size="xs" onClick={() => handleEditPage(element)}>
                  编辑
                </Button>
                <Button
                  color="green"
                  size="xs"
                  onClick={() => handleSaveTemplage(element)}
                >
                  保存为模板
                </Button>
                <Button color="red" size="xs" onClick={() => del(element.id)}>
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
