import React, { Component } from 'react';
import './College.css';
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
  Avatar
} from 'antd';
import Title from 'antd/lib/typography/Title';
import _ from 'lodash';
import * as CONSTANTS from '../../constants';
import OtherLinks from '../OtherLinks/OtherLinks';

const { Option } = Select;

let id = 0;

class College extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      gpa: 0,
      visible: null,
      modalColor: '',
      modalMessage: ''
    };
  }

  remove = k => {
    const { classes } = this.state;
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    // We need at least one field to calculate

    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });

    this.setState({
      classes: classes.filter(currentClass => {
        return currentClass.id !== k;
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

    const newClass = {
      id,
      courseName: '',
      letter: '',
      grade: 0,
      credit: 0
    };

    this.setState(prevState => ({
      classes: [...prevState.classes, newClass]
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { classes } = this.state;

    if (classes.length === 0) {
      return;
    }

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { courseNames, credits, letterGrades, keys } = values;
        const gpa = this.calculateGPA(credits, letterGrades);
        this.setMessageAndColor(gpa);
        this.setState({ gpa }, this.showGPAModal(gpa));
      } else {
        console.log(err);
      }
    });
  };

  calculateGPA = (credits, letterGrades) => {
    let cumulativeGPA = 0;
    let cumulativeCredits = 0;
    for (let i = 0; i < credits.length; i++) {
      if (!isNaN(credits[i]) && !isNaN(letterGrades[i])) {
        console.log(credits[i], letterGrades[i]);
        cumulativeGPA += credits[i] * letterGrades[i];
        cumulativeCredits += credits[i];
      }
    }

    let gpa = cumulativeGPA / cumulativeCredits;
    console.log('GPA: ', gpa);
    return gpa.toFixed(CONSTANTS.DECIMAL_LENGTH);
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    console.log('Saved!');
  };

  setMessageAndColor = gpa => {
    if (gpa < 2) {
      this.setState({
        modalColor: CONSTANTS.COLORS.notGood,
        modalMessage: CONSTANTS.MESSAGES.notGood
      });
    } else if (gpa >= 2 && gpa < 3) {
      this.setState({
        modalColor: CONSTANTS.COLORS.nice,
        modalMessage: CONSTANTS.MESSAGES.nice
      });
    } else if (gpa >= 3 && gpa < 3.5) {
      this.setState({
        modalColor: CONSTANTS.COLORS.good,
        modalMessage: CONSTANTS.MESSAGES.good
      });
    } else {
      this.setState({
        modalColor: CONSTANTS.COLORS.success,
        modalMessage: CONSTANTS.MESSAGES.success
      });
    }
  };

  showGPAModal = gpa => {
    this.setState({ visible: true });
  };

  render() {
    const {
      gpa,
      visible,
      classes,
      modalClass,
      modalMessage,
      modalColor
    } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div className="form-wrapper" key={k}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item required={false} key={k}>
              {getFieldDecorator(`courseNames[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: false,
                    whitespace: true
                  }
                ]
              })(<Input placeholder="Course Name" />)}
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`letterGrades[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Letter grade must be provided.'
                  }
                ]
              })(
                <Select placeholder="Letter Grade">
                  {CONSTANTS.LETTER_GRADES.map((letterGrade, index) => (
                    <Option key={letterGrade.letter} value={letterGrade.grade}>
                      {`${letterGrade.letter}`}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`credits[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Credit must be provided.'
                  }
                ]
              })(
                <Select placeholder="Credits">
                  {CONSTANTS.CREDITS.map((credit, index) => (
                    <Option key={credit} value={credit}>
                      {credit}
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
        <Title>College GPA Calculator</Title>
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
                    <Icon type="plus" /> Add New Course
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={classes.length === 0}
                  >
                    Calculate
                  </Button>
                </Form.Item>
              </Form>

              <Title>How does it work?</Title>
              <p>
                <ul>
                  <li>
                    Click on <strong>"Add New Class"</strong> button to add a
                    new class.
                  </li>
                  <li>
                    Write your class name. This is{' '}
                    <strong>not required.</strong>
                  </li>
                  <li>
                    Select your letter grade. This is <strong>required.</strong>
                  </li>
                  <li>
                    Select your class credits. This is also{' '}
                    <strong>required.</strong>
                  </li>
                  <li>
                    If you are done, click on <strong>"Calculate"</strong>{' '}
                    button.
                  </li>
                </ul>
              </p>
              <Title>What is the formula?</Title>
              <p>The formula is actually pretty straight forward.</p>
              <p>
                First, you multiply your credits with corresponding grade point.
                (You can see grade points from the table.)
              </p>
              <p>
                For example, your grade letter is <strong>"A"</strong> and class
                credits is <strong>6</strong>. You have to multiply{' '}
                <strong>6</strong> by <strong>4.00</strong> which is{' '}
                <strong>24</strong>.
              </p>
              <p>Do this calculation for every class.</p>
              <p>Sum them up.</p>
              <p>Sum your credits.</p>
              <p>Divide first sum with sum of your credits.</p>
              <p>
                <strong>Example:</strong>
              </p>
              <Table
                columns={CONSTANTS.COLLEGE_EXAMPLE_COLUMNS}
                dataSource={CONSTANTS.COLLEGE_EXAMPLE_DATA}
                pagination={false}
                size="small"
              />
              <br />
              <p>
                Now, your GPA is going to be <strong>73.60 / 23</strong> which
                is <strong>3.20</strong>.
              </p>
            </Col>
            <Col span={9}>
              <OtherLinks
                tableColumns={CONSTANTS.COLLEGE_COLUMNS}
                tableData={CONSTANTS.COLLEGE_DATA}
              />
            </Col>
          </Row>
        </div>

        <Modal
          className={modalClass}
          visible={visible}
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
          <p className="modalText" style={{ color: modalColor }}>
            <strong>{modalMessage}</strong> <Icon type="smile" />
          </p>
          <p>
            <Avatar
              size="large"
              className="modalGpa"
              style={{ backgroundColor: modalColor }}
            >
              {gpa}
            </Avatar>
          </p>
        </Modal>
      </div>
    );
  }
}

const CollegeForm = Form.create({ name: 'college_calculator_form' })(College);

export default Form.create()(CollegeForm);
