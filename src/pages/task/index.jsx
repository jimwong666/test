import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { list, add, commit, complete } from '@/services/task/api';
import { constants } from './dependencies';
import Operation from './components/operation';

/**
 * 新建任务
 *
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在新建...');

  try {
    await add({
      data: {
        ...fields,
      },
    });
    hide();
    message.success('新建成功！');
    return true;
  } catch (error) {
    hide();
    message.error('新建失败！');
    return false;
  }
};

/**
 *  提交开发
 *
 */
const handleCommit = async (rows) => {
  const hide = message.loading('正在提交开发...');
  if (!rows) return true;

  const recIds = rows?.map((item) => {
    return item.recId;
  });

  try {
    await commit({
      data: {
        recIds,
      },
    });
    hide();
    message.success('提交成功！');
    return true;
  } catch (error) {
    hide();
    message.error('提交失败！');
    return false;
  }
};

/**
 *  开发完成
 *
 */
const handleComplete = async (rows) => {
  const hide = message.loading('正在提交完成...');
  if (!rows) return true;

  const recIds = rows?.map((item) => {
    return item.recId;
  });

  try {
    await complete({
      data: {
        recIds,
      },
    });
    hide();
    message.success('提交成功！');
    return true;
  } catch (error) {
    hide();
    message.error('提交失败！');
    return false;
  }
};

const TableList = () => {
  // table
  const tableRef = useRef();
  // addFormRef
  const addFormRef = useRef();
  // editFormRef
  const editFormRef = useRef();
  window.userType = 0; // 假设需求人员是0，开发人员是1
  const [selectedRows, setSelectedRows] = useState([]);

  // 【需求人员】
  // 新建任务
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  // 编辑任务
  const [editTaskVisible, setEditTaskVisible] = useState(false);
  // 提交开发
  const [submitVisible, setSubmitVisible] = useState(false);

  // 【开发人员】
  // 开发完成
  const [completeVisible, setCompleteVisible] = useState(false);

  const columns = [
    {
      title: '序号',
      render: (text, record, index) => index + 1,
      valueType: 'index',
      hideInSearch: true,
    },
    {
      title: '任务名称',
      dataIndex: 'name',
    },
    {
      title: '任务版本',
      dataIndex: 'version',
    },
    {
      title: '站点名称',
      dataIndex: 'siteName',
      hideInTable: true,
      valueEnum: constants.siteName,
    },
    {
      title: '站点名称',
      key: 'siteName',
      dataIndex: 'siteName',
      hideInSearch: true,
    },
    {
      title: '任务创建时间',
      dataIndex: 'addTime',
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'adderName',
    },
    {
      title: '任务更新时间',
      dataIndex: 'updateTime',
      valueType: 'updateTime',
      hideInSearch: true,
    },
    {
      title: '更新人',
      dataIndex: 'updaterName',
      hideInSearch: true,
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      valueEnum: constants.status,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
      render: Operation(setEditTaskVisible, setSelectedRows),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        headerTitle={
          !window.userType ? (
            // 需求人员
            <Button
              type="primary"
              key="delete"
              onClick={async () => {
                setSubmitVisible(true);
              }}
              disabled={selectedRows.length === 0}
            >
              <CheckOutlined /> 提交开发
            </Button>
          ) : (
            // 开发人员
            <Button
              type="primary"
              key="delete"
              onClick={() => {
                setCompleteVisible(true);
              }}
              disabled={selectedRows.length === 0}
            >
              <CheckOutlined /> 开发完成
            </Button>
          )
        }
        actionRef={tableRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setAddTaskVisible(true);
            }}
          >
            <PlusOutlined /> 新建任务
          </Button>,
        ]}
        request={async (params) => {
          let resultList = [];
          console.log('params', params);
          await list({
            data: {
              ...params,
            },
          }).then((data) => (resultList = data));
          return resultList;
        }}
        columns={columns}
        rowSelection={{
          onChange: (selectedRowKeys, selectedRows) => {
            console.log('selectedRows', selectedRows);
            setSelectedRows(selectedRows);
          },
          getCheckboxProps: (record) => {
            if (!window.userType) {
              // 需求人员
              // 暂存，待开发 => 提交开发
              return {
                disabled: !(record.status === 0),
                name: record.name,
              };
            } else {
              // 开发人员
              // 待开发，验收不通过 => 开发完成
              return {
                disabled: !(record.status === 1 || record.status === 5),
                name: record.name,
              };
            }
          },
        }}
      />

      {/* 【开发人员】弹窗 */}
      {/* 新建任务 */}
      <ModalForm
        formRef={addFormRef}
        title={'新建任务'}
        width="800px"
        visible={addTaskVisible}
        onVisibleChange={setAddTaskVisible}
        modalProps={{
          destroyOnClose: true,
        }}
        onFinish={async (value) => {
          console.log('新建任务', value);
          const success = await handleAdd(value);

          if (success) {
            setAddTaskVisible(false);
            tableRef.current?.reload?.();
          }
        }}
      >
        <ProFormText
          label={'任务名称'}
          rules={[
            {
              required: true,
              message: '请填写任务名称！',
            },
            {
              max: 50,
              message: '最多输入50个字符！',
            },
          ]}
          name="name"
        />
        <ProFormText
          label={'任务版本'}
          rules={[
            {
              required: true,
              message: '请填写任务版本！',
            },
            {
              max: 50,
              message: '最多输入50个字符！',
            },
          ]}
          name="version"
        />
        <ProFormSelect
          valueEnum={constants.siteName}
          name="siteId"
          label="任务所属站点"
          rules={[
            {
              required: true,
              message: '请填写任务版本！',
            },
          ]}
        />
        <ProFormTextArea
          label={'任务说明'}
          name="taskDesc"
          fieldProps={{
            showCount: true,
            maxLength: 200,
          }}
          rules={[
            {
              max: 200,
              message: '最多输入200个字符！',
            },
          ]}
        />
      </ModalForm>
      {/* 编辑任务 */}
      <ModalForm
        formRef={editFormRef}
        title={'编辑任务'}
        width="800px"
        visible={editTaskVisible}
        onVisibleChange={(visible) => {
          setEditTaskVisible(visible);
          // !visible && setSelectedRows([]);
          console.log('selectedRows', selectedRows);
        }}
        onFinish={async (value) => {
          console.log('编辑任务', value);
          const success = await handleAdd(value);

          if (success) {
            setEditTaskVisible(false);
            tableRef.current?.reload?.();
          }
        }}
        // request={async () => {
        //   return selectedRows;
        // }}
        // initialValues={selectedRows?.[0]}
      >
        <ProFormText
          label={'任务名称'}
          rules={[
            {
              required: true,
              message: '请填写任务名称！',
            },
          ]}
          name="name"
        />
        <ProFormText
          label={'任务版本'}
          rules={[
            {
              required: true,
              message: '请填写任务版本！',
            },
          ]}
          name="version"
        />
        <ProFormSelect
          valueEnum={constants.siteName}
          name="siteId"
          label="任务所属站点"
          rules={[
            {
              required: true,
              message: '请填写任务版本！',
            },
          ]}
        />
        <ProFormTextArea label={'任务说明'} name="taskDesc" maxLength={200} showCount={true} />
      </ModalForm>
      {/* 提交开发 */}
      <Modal
        title={'任务提交开发'}
        width="400px"
        visible={submitVisible}
        onOk={async () => {
          await handleCommit(selectedRows);
          setSelectedRows([]);
          tableRef.current?.reloadAndRest?.();

          setSubmitVisible(false);
        }}
        onCancel={() => {
          setSubmitVisible(false);
        }}
      >
        提交后会进入开发队列，确认任务提交开发？
      </Modal>

      {/* 【开发人员】弹窗 */}
      {/* 开发完成 */}
      <Modal
        title={'任务开发完成'}
        width="400px"
        visible={completeVisible}
        onOk={async () => {
          await handleComplete(selectedRows);
          setSelectedRows([]);
          tableRef.current?.reloadAndRest?.();

          setCompleteVisible(false);
        }}
        onCancel={() => {
          setCompleteVisible(false);
        }}
      >
        确认任务已经开发完成？
      </Modal>
    </PageContainer>
  );
};

export default TableList;
