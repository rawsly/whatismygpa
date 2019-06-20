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
  Avatar,
  Divider,
  Alert
} from 'antd';
import Title from 'antd/lib/typography/Title';
import _ from 'lodash';
import * as CONSTANTS from '../../constants';
import OtherLinks from '../OtherLinks/OtherLinks';
import { isMobile } from 'react-device-detect';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const { Option } = Select;

let id = 0;

class College extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      gpa: null,
      message: null,
      type: null
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

    if (keys.length === 1) {
      this.setState({ gpa: null }, console.log(this.state.gpa));
    }

    this.setState(
      prevState => ({
        courses: courses.filter(course => course.id !== k)
      }),
      () => this.calculateGPA()
    );
  };

  add = () => {
    const { form } = this.props;

    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });

    const courseId = id - 1;
    const newCourse = {
      id: courseId,
      courseName: null,
      courseCredit: null,
      courseGrade: null
    };

    this.setState(prevState => ({
      courses: [...prevState.courses, newCourse]
    }));
  };

  handleChange = (index, type, event) => {
    // for input type, event is not value directly unlike select option type
    if (event && event.target) {
      event = event.target.value;
    }
    this.setState(
      prevState => ({
        courses: prevState.courses.map(course =>
          course.id === index
            ? Object.assign(course, { [type]: event })
            : course
        )
      }),
      () => this.calculateGPA()
    );
  };

  calculateGPA = () => {
    const { courses } = this.state;

    let cumulativeGPA = 0;
    let cumulativeCredits = 0;
    let gpa = 0;

    courses.forEach(course => {
      const { courseCredit, courseGrade } = course;
      if (courseCredit !== null && courseGrade !== null) {
        cumulativeGPA += courseCredit * courseGrade;
        cumulativeCredits += courseCredit;
      }
    });

    if (cumulativeCredits > 0) {
      gpa = cumulativeGPA / cumulativeCredits;
      gpa = gpa.toFixed(CONSTANTS.DECIMAL_LENGTH);
      this.setState({ gpa }, () => this.setMessageAndType(gpa));
    }

    return gpa;
  };

  setMessageAndType = gpa => {
    let message = null;
    let type = null;

    if (gpa < 1) {
      type = 'error';
    } else if (gpa >= 1 && gpa < 2.3) {
      type = 'warning';
    } else if (gpa >= 2.3 && gpa < 3.3) {
      type = 'info';
    } else {
      type = 'success';
    }

    message = (
      <span className="gpaMessage">
        <Icon type="highlight" /> GPA: <strong>{gpa}</strong>
      </span>
    );

    this.setState({ message, type });
  };

  render() {
    const { gpa, message, type, courses } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div className="form-wrapper" key={k}>
        {isMobile && <Divider />}
        <Row gutter={16}>
          <Col sm={24} md={8}>
            <Form.Item required={false} key={k}>
              {getFieldDecorator(`courseNames[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: false,
                    whitespace: true
                  }
                ]
              })(
                <Input
                  placeholder="Course Name"
                  onChange={e => this.handleChange(k, 'courseName', e)}
                />
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={8}>
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
                <Select
                  placeholder="Letter Grade"
                  onChange={e => this.handleChange(k, 'courseGrade', e)}
                >
                  {CONSTANTS.LETTER_GRADES.map((letterGrade, index) => (
                    <Option key={letterGrade.letter} value={letterGrade.grade}>
                      {`${letterGrade.letter}`}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={6}>
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
                <Select
                  placeholder="Credits"
                  onChange={e => this.handleChange(k, 'courseCredit', e)}
                >
                  {CONSTANTS.CREDITS.map((credit, index) => (
                    <Option key={credit} value={credit}>
                      {credit}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={2}>
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
            <Col sm={24} md={15}>
              <Form>
                {formItems}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={this.add}
                    style={{ width: '100%' }}
                    size="large"
                  >
                    <Icon type="plus" /> Add New Course
                  </Button>
                </Form.Item>
              </Form>
              {gpa && (
                <Alert
                  message={message}
                  type={type}
                  style={{ marginBottom: 20 }}
                />
              )}

              <Title>How does it work?</Title>
              <ul>
                <li>
                  Click on <strong>"Add New Class"</strong> button to add a new
                  class.
                </li>
                <li>
                  Write your class name. This is <strong>not required.</strong>
                </li>
                <li>
                  Select your letter grade. This is <strong>required.</strong>
                </li>
                <li>
                  Select your class credits. This is also{' '}
                  <strong>required.</strong>
                </li>
                <li>Calculation will be done automatically.</li>
              </ul>
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
            <Col sm={24} md={9}>
              <OtherLinks
                tableColumns={CONSTANTS.COLLEGE_COLUMNS}
                tableData={CONSTANTS.COLLEGE_DATA}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const CollegeForm = Form.create({ name: 'college_calculator_form' })(College);

export default Form.create()(CollegeForm);
