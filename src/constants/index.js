import React from 'react';
import * as ROUTES from '../routes';

export const LETTER_GRADES = [
  { letter: 'A', grade: 4.0 },
  { letter: 'A-', grade: 3.7 },
  { letter: 'B+', grade: 3.3 },
  { letter: 'B', grade: 3.0 },
  { letter: 'B-', grade: 2.7 },
  { letter: 'C+', grade: 2.3 },
  { letter: 'C', grade: 2.0 },
  { letter: 'C-', grade: 1.7 },
  { letter: 'D+', grade: 1.3 },
  { letter: 'D', grade: 1.0 },
  { letter: 'F', grade: 0.0 }
];

export const CREDITS = [...Array(20).keys()].map(x => ++x);

export const DECIMAL_LENGTH = 2;

export const SUCCESS = 'success';

export const GOOD = 'good';

export const NICE = 'nice';

export const NOT_GOOD = 'notGood';

export const COLLEGE_COLUMNS = [
  {
    title: <strong>Letter</strong>,
    dataIndex: 'letter'
  },
  {
    title: <strong>Point</strong>,
    dataIndex: 'point'
  }
];

export const COLLEGE_DATA = [
  {
    key: '1',
    letter: 'A',
    point: '4.00'
  },
  {
    key: '2',
    letter: 'A-',
    point: '3.70'
  },
  {
    key: '3',
    letter: 'B+',
    point: '3.30'
  },
  {
    key: '4',
    letter: 'B',
    point: '3.00'
  },
  {
    key: '5',
    letter: 'B-',
    point: '2.70'
  },
  {
    key: '6',
    letter: 'C+',
    point: '2.30'
  },
  {
    key: '7',
    letter: 'C',
    point: '2.00'
  },
  {
    key: '8',
    letter: 'C-',
    point: '1.70'
  },
  {
    key: '9',
    letter: 'D+',
    point: '1.30'
  },
  {
    key: '10',
    letter: 'D',
    point: '1.00'
  },
  {
    key: '11',
    letter: 'F',
    point: '0.00'
  }
];

export const COLLEGE_EXAMPLE_COLUMNS = [
  {
    title: 'Class Name',
    dataIndex: 'nameOfClass',
    render: (text, row, index) => {
      if (index < 4) {
        return text;
      }

      return <strong>{text}</strong>;
    }
  },
  {
    title: 'Letter',
    dataIndex: 'classLetter'
  },
  {
    title: 'Credits',
    dataIndex: 'classCredits',
    render: (text, row, index) => {
      if (index < 4) {
        return text;
      }

      return {
        children: <strong>{text}</strong>,
        props: {
          colSpan: 1
        }
      };
    }
  },
  {
    title: 'Point',
    dataIndex: 'cumulativePoint',
    render: (text, row, index) => {
      if (index < 4) {
        return text;
      }

      return <strong>{text}</strong>;
    }
  }
];

export const COLLEGE_EXAMPLE_DATA = [
  {
    key: '1',
    nameOfClass: 'CMPE 312',
    classLetter: 'A',
    classCredits: '6',
    cumulativePoint: '24.00'
  },
  {
    key: '2',
    nameOfClass: 'CMPE 408',
    classLetter: 'B',
    classCredits: '5',
    cumulativePoint: '15.00'
  },
  {
    key: '3',
    nameOfClass: 'CMPE 314',
    classLetter: 'B+',
    classCredits: '7',
    cumulativePoint: '23.10'
  },
  {
    key: '4',
    nameOfClass: 'EEEN 300',
    classLetter: 'C+',
    classCredits: '5',
    cumulativePoint: '11.50'
  },
  {
    key: '5',
    nameOfClass: 'Total',
    classCredits: '23',
    cumulativePoint: '73.60'
  }
];

export const OTHER_CALCULATORS = [
  <a href={ROUTES.COLLEGE_GPA_CALCULATOR}>College GPA Calculator</a>,
  <a href={ROUTES.HIGH_SCHOOL_GPA_CALCULATOR}>High School GPA Calculator</a>,
  <a href={ROUTES.GRADE_CALCULATOR}>Grade Calculator</a>
];
