import React, { Component } from 'react';
import './HighSchool.css';
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
import OtherLinks from '../OtherLinks/OtherLinks';
import { isMobile } from 'react-device-detect';

const { Option } = Select;

let id = 0;

class HighSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      gpas: [],
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

    this.setState(prevState => ({
      courses: courses.filter(course => course.id !== k)
    }));
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
      courseLetter: null,
      courseCredit: null,
      courseType: null
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

    let weightedGPA = 0;
    let unweightedGPA = 0;
    let cumulativeCredits = 0;

    courses.map(course => {
      const { courseCredit, courseLetter, courseType } = course;
      if (courseCredit != null && courseLetter != null && courseType != null) {
        unweightedGPA += courseCredit * courseLetter;
        cumulativeCredits += courseCredit;

        if (courseType === CONSTANTS.COURSE_TYPES[0]) {
          weightedGPA += courseCredit * courseLetter;
          // honors
        } else if (courseType === CONSTANTS.COURSE_TYPES[4]) {
          weightedGPA += courseCredit * (courseLetter + 0.5);
        } else {
          weightedGPA += courseCredit * (courseLetter + 1);
        }
      }

      return weightedGPA;
    });

    let unweighted = unweightedGPA / cumulativeCredits;
    let weighted = weightedGPA / cumulativeCredits;
    let gpas = [
      unweighted.toFixed(CONSTANTS.DECIMAL_LENGTH),
      weighted.toFixed(CONSTANTS.DECIMAL_LENGTH)
    ];

    if (!isNaN(gpas[0]) && !isNaN(gpas[1])) {
      const messageAndType = this.renderMessageAndType(gpas);
      const { message, type } = messageAndType;
      this.setState({ gpas, message, type }, console.log(gpas));
    }

    return gpas;
  };

  renderMessageAndType = gpas => {
    const unweighted = gpas[0];
    const weighted = gpas[1];
    let gpaMessage = { message: null, type: null };
    if (unweighted < 1) {
      gpaMessage.type = 'error';
    } else if (unweighted >= 1 && unweighted < 2.3) {
      gpaMessage.type = 'warning';
    } else if (unweighted >= 2.3 && unweighted < 3.3) {
      gpaMessage.type = 'info';
    } else {
      gpaMessage.type = 'success';
    }

    gpaMessage.message = (
      <span className="gpaMessage">
        <Icon type="highlight" /> Unweighted GPA: <strong>{unweighted}</strong>
        <Divider />
        <Icon type="highlight" /> Weighted GPA: <strong>{weighted}</strong>
      </span>
    );
    return gpaMessage;
  };

  render() {
    const { gpas, message, type } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div className="form-wrapper" key={k}>
        {isMobile && <Divider />}
        <Row gutter={16}>
          <Col sm={24} md={6}>
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
          <Col sm={24} md={5}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`courseLetters[${k}]`, {
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
                  onChange={e => this.handleChange(k, 'courseLetter', e)}
                >
                  {CONSTANTS.HIGH_SCHOOL_LETTER_GRADES.map(
                    (letterGrade, index) => (
                      <Option
                        key={letterGrade.letter}
                        value={letterGrade.regularGrade}
                      >
                        {`${letterGrade.letter}`}
                      </Option>
                    )
                  )}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={5}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`courseCredits[${k}]`, {
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
                  {CONSTANTS.HIGH_SCHOOL_CREDITS.map((credit, index) => (
                    <Option key={credit} value={credit}>
                      {credit}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={6}>
            <Form.Item required={true} key={k}>
              {getFieldDecorator(`courseTypes[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Course type must be provided.'
                  }
                ]
              })(
                <Select
                  placeholder="Course Type"
                  onChange={e => this.handleChange(k, 'courseType', e)}
                >
                  {CONSTANTS.COURSE_TYPES.map((courseType, index) => (
                    <Option key={courseType} value={courseType}>
                      {courseType}
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
        <Title>High School GPA Calculator</Title>
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
                {gpas.length > 0 && (
                  <Alert
                    message={message}
                    type={type}
                    style={{ marginBottom: 20 }}
                  />
                )}
              </Form>

              <Title>Weighted vs Unweighted GPA</Title>
              <p>
                <strong>Unweighted GPA</strong> - All courses are graded on the
                same scale which means class difficulty does not matter.
              </p>
              <p>Therefore, the formula is very simple.</p>
              <p>
                <strong>Σ (grade value * credits) / Σ credits</strong>
              </p>
              <p>Simple example:</p>
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
              <Divider />
              <p>
                <strong>Weighted GPA</strong> - Unlike unweighted GPA, now,
                difficulty of the course matters. There are 5 class types.
              </p>
              <ul>
                <li>
                  <strong>AP Courses </strong>(Advanced Placement Courses),
                  usually give you additional 1 point to your standard GPA
                  score.
                </li>
                <li>
                  <strong>IB Courses </strong>(International Baccalaureate
                  Courses) are also rewarded with extra 1 point.
                </li>
                <li>
                  <strong>College Prep</strong> classes can also add 1 point to
                  your grade.
                </li>
                <li>
                  <strong>Honor Courses</strong> most often give you additional
                  0.5 point (although you can find schools where it's awarded 1
                  point, check it first in your school's rules).
                </li>
              </ul>
              <Table
                columns={CONSTANTS.HIGH_SCHOOL_TABLE_COLUMNS}
                dataSource={CONSTANTS.HIGH_SCHOOL_LETTER_GRADES}
                pagination={false}
                size="small"
                className="highSchoolTable"
              />
            </Col>
            {isMobile && <Divider />}
            <Col sm={24} md={9}>
              <OtherLinks
                tableColumns={CONSTANTS.HIGH_SCHOOL_GPA_SCALE_COLUMNS}
                tableData={CONSTANTS.HIGH_SCHOOL_GPA_SCALE_DATA}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const HighSchoolForm = Form.create({ name: 'high_school_calculator_form' })(
  HighSchool
);

export default Form.create()(HighSchoolForm);
