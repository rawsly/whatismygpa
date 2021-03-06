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
  Table,
  Alert,
  message,
  Divider
} from 'antd';
import Title from 'antd/lib/typography/Title';
import * as CONSTANTS from '../../constants';
import OtherLinks from '../OtherLinks/OtherLinks';
import { isMobile } from 'react-device-detect';

const { Option } = Select;

let id = 0;

class Grade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      grade: null,
      finalAssessment: {},
      minimumGradeForFinal: null,
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

    this.setState(
      prevState => ({
        courses: courses.filter(course => course.id !== k)
      }),
      () => this.calculateGrade()
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
      assessmentName: '',
      assessmentPoint: null,
      assessmentWeight: null
    };

    this.setState(prevState => ({
      courses: [...prevState.courses, newCourse]
    }));
  };

  handleAssessmentNameChange = (index, event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      courses: prevState.courses.map(course =>
        course.id === index
          ? Object.assign(course, { assessmentName: value })
          : course
      )
    }));
  };

  handleAssessmentPointChange = (index, event) => {
    this.setState(
      prevState => ({
        courses: prevState.courses.map(course =>
          course.id === index
            ? Object.assign(course, { assessmentPoint: event })
            : course
        )
      }),
      () => this.calculateGrade()
    );
  };

  handleAssessmentWeightChange = (index, event) => {
    this.setState(
      prevState => ({
        courses: prevState.courses.map(course =>
          course.id === index
            ? Object.assign(course, { assessmentWeight: event })
            : course
        )
      }),
      () => this.calculateGrade()
    );
  };

  handleFinalChange = (type, event) => {
    if (type === 'cg') {
      this.setState(
        prevState => ({
          finalAssessment: { ...prevState.finalAssessment, currentGrade: event }
        }),
        () => this.calculateMinimumGradeForFinal()
      );
    } else if (type === 'fw') {
      this.setState(
        prevState => ({
          finalAssessment: { ...prevState.finalAssessment, finalWeight: event }
        }),
        () => this.calculateMinimumGradeForFinal()
      );
    } else if (type === 'dg') {
      this.setState(
        prevState => ({
          finalAssessment: { ...prevState.finalAssessment, desiredGrade: event }
        }),
        () => this.calculateMinimumGradeForFinal()
      );
    } else {
      return;
    }
  };

  calculateGrade = () => {
    const { courses } = this.state;

    if (courses.length === 0) {
      this.setState({ grade: null, minimumGradeForFinal: null });
      return;
    }

    let grade = 0;
    let cumulativeWeight = 0;

    courses.forEach(course => {
      const { assessmentPoint, assessmentWeight } = course;
      if (assessmentPoint !== null && assessmentWeight !== null) {
        grade += assessmentPoint * assessmentWeight;
        cumulativeWeight += assessmentWeight;
      }
    });

    if (cumulativeWeight > 0) {
      grade /= cumulativeWeight;
      grade = grade.toFixed(CONSTANTS.DECIMAL_LENGTH);

      this.setState(
        prevState => ({
          finalAssessment: {
            ...prevState.finalAssessment,
            currentGrade: grade
          },
          grade
        }),
        () => this.setMessageAndType(grade)
      );
    }

    return grade;
  };

  calculateMinimumGradeForFinal = () => {
    const { courses, finalAssessment } = this.state;
    const { desiredGrade, finalWeight, currentGrade } = finalAssessment;

    if (desiredGrade && finalWeight && currentGrade) {
      let sumOfWeights = 0;
      courses.map(course => {
        sumOfWeights += course.assessmentWeight;
        return course;
      });

      const totalWeight = finalWeight + sumOfWeights;

      if (totalWeight !== 100) {
        message.error('Total weight must be equal to 100.');
        return;
      }

      let weightWithoutFinal = totalWeight - finalWeight;
      let gradeWithWeight = currentGrade * (weightWithoutFinal / totalWeight);
      let desiredWeight = desiredGrade - gradeWithWeight;
      let minimumGradeForFinal = (desiredWeight / finalWeight) * totalWeight;

      minimumGradeForFinal = minimumGradeForFinal.toFixed(
        CONSTANTS.DECIMAL_LENGTH
      );

      this.setState({ minimumGradeForFinal });

      return minimumGradeForFinal;
    }

    return 0;
  };

  renderMinimumGradeForFinal = minimumGradeForFinal => {
    let iconType;
    if (minimumGradeForFinal < 33) {
      iconType = 'smile';
    } else if (minimumGradeForFinal >= 33 && minimumGradeForFinal < 66) {
      iconType = 'meh';
    } else {
      iconType = 'frown';
    }
    return (
      <span className="gradeMessage">
        <Icon type={iconType} /> Grade needed in final:{' '}
        <strong>{minimumGradeForFinal}</strong>
      </span>
    );
  };

  setMessageAndType = grade => {
    let message = null;
    let type = null;
    let iconType;
    let rotate = 0;

    if (grade < 60) {
      type = 'error';
      iconType = 'frown';
    } else if (grade >= 60 && grade < 74) {
      type = 'warning';
      iconType = 'meh';
    } else if (grade >= 74 && grade < 87) {
      type = 'info';
      iconType = 'smile';
      rotate = 180;
    } else {
      type = 'success';
      iconType = 'smile';
    }

    message = (
      <span className="gradeMessage">
        <Icon type={iconType} rotate={rotate} /> Your grade:{' '}
        <strong>{grade}</strong>
      </span>
    );

    this.setState({ message, type });
  };

  render() {
    const { grade, minimumGradeForFinal, message, type } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <div className="form-wrapper" key={k}>
        {isMobile && <Divider />}
        <Row gutter={16}>
          <Col sm={24} md={8}>
            <Form.Item required={false} key={k}>
              {getFieldDecorator(`assessments[${k}]`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: false,
                    whitespace: true
                  }
                ]
              })(
                <Input
                  placeholder="Assessment (e.g. Quiz)"
                  onChange={e => this.handleAssessmentNameChange(k, e)}
                />
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={7}>
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
                <Select
                  placeholder="Point"
                  onChange={e => this.handleAssessmentPointChange(k, e)}
                >
                  {CONSTANTS.GRADE_WEIGHTS.map((point, index) => (
                    <Option key={point} value={point}>
                      {point}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={7}>
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
                <Select
                  placeholder="Weight (%)"
                  onChange={e => this.handleAssessmentWeightChange(k, e)}
                >
                  {CONSTANTS.GRADE_WEIGHTS.map((weight, index) => (
                    <Option key={weight} value={weight}>
                      {weight}
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

    const finalFormItems = (
      <div className="form-wrapper">
        <Row gutter={16}>
          <Col sm={24} md={8}>
            <Form.Item required={true}>
              {getFieldDecorator(`currentGrade`, {
                initialValue: grade && Math.round(grade),
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Current grade must be provided.'
                  }
                ]
              })(
                <Select
                  placeholder="Current Grade"
                  onChange={e => this.handleFinalChange('cg', e)}
                >
                  {CONSTANTS.GRADE_WEIGHTS.map((point, index) => (
                    <Option key={point} value={point}>
                      {point}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={8}>
            <Form.Item required={true}>
              {getFieldDecorator(`finalWeight`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Weight must be provided.'
                  }
                ]
              })(
                <Select
                  placeholder="Weight of Final Exam (%)"
                  onChange={e => this.handleFinalChange('fw', e)}
                >
                  {CONSTANTS.GRADE_WEIGHTS.map((weight, index) => (
                    <Option key={weight} value={weight}>
                      {weight}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col sm={24} md={8}>
            <Form.Item required={true}>
              {getFieldDecorator(`desiredGrade`, {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [
                  {
                    required: true,
                    message: 'Desired grade must be provided.'
                  }
                ]
              })(
                <Select
                  placeholder="Desired Grade (%)"
                  onChange={e => this.handleFinalChange('dg', e)}
                >
                  {CONSTANTS.GRADE_WEIGHTS.map((weight, index) => (
                    <Option key={weight} value={weight}>
                      {weight}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
        </Row>
      </div>
    );
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
                    <Icon type="plus" /> Add New Assessment
                  </Button>
                </Form.Item>
                {grade && <Alert message={message} type={type} />}
              </Form>

              {grade && (
                <div style={{ marginTop: 30 }}>
                  <Title>What do I need on my final?</Title>
                  <p>
                    You can calculate minimum final grade that you need to get
                    your desired letter grade.
                  </p>
                  <Form onSubmit={this.handleFinal}>{finalFormItems}</Form>
                  {minimumGradeForFinal && (
                    <Alert
                      message={this.renderMinimumGradeForFinal(
                        minimumGradeForFinal
                      )}
                      type={minimumGradeForFinal > 100 ? 'error' : 'info'}
                    />
                  )}
                </div>
              )}

              <Title style={{ marginTop: 30 }}>What is the formula?</Title>
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

              <Title style={{ marginTop: 30 }}>
                How to calculate required final?
              </Title>
              <p>
                To explain it better, we are going to use an example which
                current grade will be <i>88%</i>, desired grade will be{' '}
                <i>90%</i> and weight of final exam will be <i>30%.</i>
              </p>
              <ul>
                <li>
                  You first need 3 numbers:{' '}
                  <strong>
                    Current Grade, Desired Grade, Weight of Final Exam
                  </strong>
                </li>
                <li>
                  We have to determine weight of current grade by subtracting
                  final exam from 100%. In this case, we will{' '}
                  <strong>subtract 100 with 30</strong>, since our final exam's
                  weight is 30%.
                </li>
                <li>
                  Multiply current grade with weight of current grade which you
                  calculated at previous step. In this case we will{' '}
                  <strong>multiply 88 by 0.7 (70%)</strong>. You will find{' '}
                  <strong>61.6</strong>.
                </li>
                <li>
                  Subtract this number from desired grade. In this case, we will{' '}
                  <strong>subtract 90 by 61.6</strong> which we calculated at
                  previous step. You will find <strong>28.4</strong>.
                </li>
                <li>
                  At last step, divide this number by weight of final exam. In
                  this case we will{' '}
                  <strong>
                    divide 28.4 by 30 which will return 0.94666 which is
                    approximately 0.947
                  </strong>
                  . Now, multiply it by 100 and you will get{' '}
                  <strong>94.7</strong>.
                </li>
              </ul>
            </Col>

            {/* Sidebar */}
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

const GradeForm = Form.create({ name: 'grade_calculator_form' })(Grade);

export default Form.create()(GradeForm);
