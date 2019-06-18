import React, { Component } from 'react';
import * as CONSTANTS from '../../constants';
import { Table, Alert, List } from 'antd';

class OtherLinks extends Component {
  render() {
    const { tableData, tableColumns } = this.props;

    return (
      <div>
        <Table
          columns={tableColumns}
          dataSource={tableData}
          pagination={false}
        />

        <Alert
          message="Note that percentage interval and GPA scale may differ a bit between schools."
          type="warning"
          showIcon
          style={{ marginTop: 20 }}
        />

        <List
          style={{ marginTop: 50 }}
          header={
            <div>
              <strong>Other Calculators</strong>
            </div>
          }
          bordered
          dataSource={CONSTANTS.OTHER_CALCULATORS}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}

export default OtherLinks;
