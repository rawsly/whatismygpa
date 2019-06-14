import React, { Component } from 'react';
import './Grade.css';
import {
  Form,
  Input,
  Icon,
  Button,
  Select,
  Row,
  Col,
  Modal,
  Table,
  List,
  Alert,
  Divider
} from 'antd';
import Title from 'antd/lib/typography/Title';
import _ from 'lodash';
import * as CONSTANTS from '../../constants';

const { Option } = Select;

let id = 0;

class Grade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      grade: null,
      visible: null,
      modalClass: '',
      modalTitle: ''
    };
  }

  remove = k => {
    const { courses } = this.state;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    // We need at least one field to calculate

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });

    this.setState({
      courses: courses.filter(currentCourse => {
        return currentCourse.id !== k;
      })
    });
  };

  add = () => {
    const { form } = this.props;

    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });

    const newCourse = {
      id,
      courseName: '',
      assessment: '',
      point: 0,
      grade: 0,
      weight: 0
    };

    this.setState(prevState => ({
      courses: [...prevState.courses, newCourse]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { courses } = this.state;
    if (courses.length === 0) {
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { courseName, assessments, points, weights, keys } = values;
        const grade = this.calculateGPA(points, weights);
        this.setState({ grade }, this.showGPAModal(grade));
      } else {
        console.log(err);
      }
    });
  };

  calculateGPA = (points, weights) => {
    let grade = 0;
    let cumulativeWeight = 0;
    for (let i = 0; i < points.length; i++) {
      if (!isNaN(points[i]) && !isNaN(weights[i])) {
        console.log(weights[i], points[i]);
        grade += weights[i] * points[i];
        cumulativeWeight += weights[i];
      }
    }

    console.log(grade);
    grade /= cumulativeWeight;
    return grade;
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    console.log('Saved!');
  };

  showGPAModal = grade => {
    this.setState({ visible: true });

    this.setState({
      modalClass: CONSTANTS.GOOD,
      modalTitle: 'Keep doing this!'
    });
  };

  render() {
    const { grade, visible, courses, modalClass, modalTitle } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div className="form-wrapper" key={k}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item required={false} key={k}>
              {getFieldDecorator(`assessments[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: false,
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Assessment (e.g. Quiz)" />)}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`points[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Letter grade must be provided.'
                  }
                ]
              })(
                <Select placeholder="Point">
                  {CONSTANTS.GRADE_WEIGHTS.map((point, index) => (
                    <Option key={point} value={point}>
                      {point}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`weights[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Weight must be provided.'
                  }
                ]
              })(
                <Select placeholder="Weight (%)">
                  {CONSTANTS.GRADE_WEIGHTS.map((weight, index) => (
                    <Option key={weight} value={weight}>
                      {weight}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button
              type="danger"
              onClick={() => this.remove(k)}
              className="remove-button"
              ghost
            >
              <Icon type="delete" />
            </Button>
          </Col>
        </Row>
      </div>
    ));
    return (
      <div>
        <Title>Grade Calculator</Title>
        <p>
          Want to calculate your college course grades? Our easy to use college
          GPA calculator will help you calculate your GPA and stay on top of
          your study grades in just minutes! Whether you are taking degree
          courses online or are on a community college campus, no matter what
          degree course or specialized study you are aiming for – we’ve got you
          covered.
        </p>
        <div className="college-wrapper">
          <Row gutter={32}>
            <Col span={15}>
              <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={this.add}
                    style={{ width: '100%' }}
                  >
                    <Icon type="plus" /> Add New Assessment
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={courses.length === 0}
                  >
                    Calculate GPA
                  </Button>
                </Form.Item>
              </Form>

              <Title>What is the formula?</Title>
              <p>
                <strong>Σ (point * weight) / Σ weight</strong>
              </p>
              <p>Simple example:</p>
              <Table
                columns={CONSTANTS.GRADE_COLUMNS}
                dataSource={CONSTANTS.GRADE_DATA}
                pagination={false}
                size="small"
              />
            </Col>
            <Col span={9}>
              <Table
                columns={CONSTANTS.HIGH_SCHOOL_GPA_SCALE_COLUMNS}
                dataSource={CONSTANTS.HIGH_SCHOOL_GPA_SCALE_DATA}
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
            </Col>
          </Row>
        </div>

        <Modal
          className={modalClass}
          visible={visible}
          title={modalTitle}
          onOk={this.handleSave}
          onCancel={this.handleClose}
          footer={[
            <Button key="close" type="link" onClick={this.handleClose}>
              Close
            </Button>,
            <Button key="save" type="primary" onClick={this.handleSave}>
              Save
            </Button>
          ]}
        >
          {grade}
        </Modal>
      </div>
    );
  }
}

const GradeForm = Form.create({ name: 'grade_calculator_form' })(Grade);

export default Form.create()(GradeForm);
