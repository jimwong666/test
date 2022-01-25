// options - 编辑任务
import React, { useState } from 'react';
import TableList from '@/pages/task';

const Operation = (setEditTaskVisible, setSelectedRows) => {
  const editTask = (record) => (
    <a
      key="show"
      onClick={() => {
        setSelectedRows([record]);
        setEditTaskVisible(true);
      }}
    >
      编辑任务
    </a>
  );
  // options - 页面维度埋点
  const pageDimension = (
    <a key="show" onClick={() => {}}>
      页面维度埋点
    </a>
  );
  // options - 事件维度埋点
  const eventDimension = (
    <a key="show" onClick={() => {}}>
      事件维度埋点
    </a>
  );
  // options - 查看埋点任务
  const showTask = (
    <a key="show" onClick={() => {}}>
      查看埋点任务
    </a>
  );
  // options - 验收
  const accepting = (
    <a key="show" onClick={() => {}}>
      验收
    </a>
  );
  // options - 查看验收日志
  const showLog = (
    <a key="show" onClick={() => {}}>
      查看验收日志
    </a>
  );

  return (text, record) => {
    if (!window.userType) {
      // 需求人员
      if (record.status === 0 || record.status === 1) {
        // 暂存，待开发
        return [editTask(record), pageDimension, eventDimension, showTask];
      } else if (record.status === 3) {
        // 待验收
        return [accepting, showTask];
      } else if (record.status === 4) {
        // 验收通过
        return [accepting, showLog, showTask];
      } else if (record.status === 5 || record.status === 6 || record.status === 7) {
        // 验收不通过，上线，废弃
        return [showLog, showTask];
      }
    } else {
      // 开发人员
      // 无暂存
      if (record.status === 1) {
        // 待开发
        return [showTask];
      } else if (record.status === 3) {
        // 待验收
        return [showTask];
      } else if (record.status === 4) {
        // 验收通过
        return [showLog, showTask];
      } else if (record.status === 5 || record.status === 6 || record.status === 7) {
        // 验收不通过，上线，废弃
        return [showLog, showTask];
      }
    }
  };
};

export default Operation;
