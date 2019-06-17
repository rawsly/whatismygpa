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

const { Option } = Select;

let id = 0;

class HighSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [],
      gpas: [],
      visible: null,
      modalClass: '',
      modalTitle: ''
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
      credit: 0,
      courseType: 'regular'
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
        const {
          courseNames,
          credits,
          letterGrades,
          courseTypes,
          keys
        } = values;
        const gpas = this.calculateGPA(credits, letterGrades, courseTypes);
        this.setState({ gpas }, this.showGPAModal(gpas));
      } else {
        console.log(err);
      }
    });
  };

  calculateGPA = (credits, letterGrades, courseTypes) => {
    let weightedGPA = 0;
    let unweightedGPA = 0;
    let cumulativeCredits = 0;
    for (let i = 0; i < credits.length; i++) {
      if (!isNaN(credits[i]) && !isNaN(letterGrades[i])) {
        unweightedGPA += credits[i] * letterGrades[i];
        cumulativeCredits += credits[i];
        // regular
        if (courseTypes[i] === CONSTANTS.COURSE_TYPES[0]) {
          weightedGPA += credits[i] * letterGrades[i];
          // honors
        } else if (courseTypes[i] === CONSTANTS.COURSE_TYPES[4]) {
          weightedGPA += credits[i] * (letterGrades[i] + 0.5);
        } else {
          weightedGPA += credits[i] * (letterGrades[i] + 1);
        }
      }
    }

    let unweighted = unweightedGPA / cumulativeCredits;
    let weighted = weightedGPA / cumulativeCredits;
    let gpas = [
      unweighted.toFixed(CONSTANTS.DECIMAL_LENGTH),
      weighted.toFixed(CONSTANTS.DECIMAL_LENGTH)
    ];
    return gpas;
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleSave = () => {
    console.log('Saved!');
  };

  showGPAModal = gpas => {
    this.setState({ visible: true });

    if (gpas[0] < 2) {
      this.setState({
        modalClass: CONSTANTS.NOT_GOOD,
        modalTitle: 'You can do better!'
      });
    } else if (gpas[0] >= 2 && gpas[0] < 3) {
      this.setState({ modalClass: CONSTANTS.NICE, modalTitle: 'Nice!' });
    } else if (gpas[0] >= 3 && gpas[0] < 3.5) {
      this.setState({
        modalClass: CONSTANTS.GOOD,
        modalTitle: 'Keep doing this!'
      });
    } else {
      this.setState({ modalClass: CONSTANTS.SUCCESS, modalTitle: 'Amazing!' });
    }
  };

  render() {
    const { gpas, visible, classes, modalClass, modalTitle, type } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div className="form-wrapper" key={k}>
        <Row gutter={16}>
          <Col span={6}>
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
          <Col span={5}>
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
          <Col span={5}>
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
                  {CONSTANTS.HIGH_SCHOOL_CREDITS.map((credit, index) => (
                    <Option key={credit} value={credit}>
                      {credit}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
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
                <Select placeholder="Course Type">
                  {CONSTANTS.COURSE_TYPES.map((courseType, index) => (
                    <Option key={courseType} value={courseType}>
                      {courseType}
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
                    Calculate GPA
                  </Button>
                </Form.Item>
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
              />
            </Col>
            <Col span={9}>
              <OtherLinks tableColumns={CONSTANTS.HIGH_SCHOOL_GPA_SCALE_COLUMNS} tableData={CONSTANTS.HIGH_SCHOOL_GPA_SCALE_DATA} />
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
          {gpas[0]} - {gpas[1]}
        </Modal>
      </div>
    );
  }
}

const HighSchoolForm = Form.create({ name: 'high_school_calculator_form' })(
  HighSchool
);

export default Form.create()(HighSchoolForm);
