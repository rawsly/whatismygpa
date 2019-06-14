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

export const HIGH_SCHOOL_TABLE_COLUMNS = [
  {
    title: <strong>Letter</strong>,
    dataIndex: 'letter'
  },
  {
    title: <strong>Regular Grade</strong>,
    dataIndex: 'regularGrade'
  },
  {
    title: <strong>Honors Grade</strong>,
    dataIndex: 'honorsGrade'
  },
  {
    title: <strong>AP / IB / College Grade</strong>,
    dataIndex: 'apIbCollegeGrade'
  }
];

export const GRADE_COLUMNS = [
  {
    title: <strong>Assessment</strong>,
    dataIndex: 'assessment'
  },
  {
    title: <strong>Point</strong>,
    dataIndex: 'point'
  },
  {
    title: <strong>Weight</strong>,
    dataIndex: 'weight'
  },
  {
    title: <strong>Point x Weight</strong>,
    dataIndex: 'pointWeight'
  }
];

export const GRADE_DATA = [
  {
    key: '1',
    assessment: 'Quiz',
    point: '70',
    weight: '10',
    pointWeight: '700'
  },
  {
    key: '2',
    assessment: 'Midterm',
    point: '80',
    weight: '30',
    pointWeight: '2400'
  },
  {
    key: '3',
    assessment: 'Project',
    point: '100',
    weight: '20',
    pointWeight: '2000'
  },
  {
    key: '4',
    assessment: 'Final',
    point: '60',
    weight: '40',
    pointWeight: '2400'
  },
  {
    key: '5',
    assessment: <strong>(Σ) Total</strong>,
    weight: '100',
    pointWeight: '7500'
  },
  {
    key: '6',
    assessment: <strong>Grade</strong>,
    pointWeight: '75'
  }
];

export const HIGH_SCHOOL_LETTER_GRADES = [
  {
    key: '1',
    letter: 'A+',
    regularGrade: 4.33,
    honorsGrade: 4.83,
    apIbCollegeGrade: 5.33
  },
  {
    key: '2',
    letter: 'A',
    regularGrade: 4.0,
    honorsGrade: 4.5,
    apIbCollegeGrade: 5.0
  },
  {
    key: '3',
    letter: 'A-',
    regularGrade: 3.67,
    honorsGrade: 4.17,
    apIbCollegeGrade: 4.67
  },
  {
    key: '4',
    letter: 'B+',
    regularGrade: 3.33,
    honorsGrade: 3.83,
    apIbCollegeGrade: 4.33
  },
  {
    key: '5',
    letter: 'B',
    regularGrade: 3.0,
    honorsGrade: 3.5,
    apIbCollegeGrade: 4.0
  },
  {
    key: '6',
    letter: 'B-',
    regularGrade: 2.67,
    honorsGrade: 3.17,
    apIbCollegeGrade: 3.67
  },
  {
    key: '7',
    letter: 'C+',
    regularGrade: 2.33,
    honorsGrade: 2.83,
    apIbCollegeGrade: 3.33
  },
  {
    key: '8',
    letter: 'C',
    regularGrade: 2.0,
    honorsGrade: 2.5,
    apIbCollegeGrade: 3.0
  },
  {
    key: '9',
    letter: 'C-',
    regularGrade: 1.67,
    honorsGrade: 2.17,
    apIbCollegeGrade: 2.67
  },
  {
    key: '10',
    letter: 'D+',
    regularGrade: 1.33,
    honorsGrade: 1.83,
    apIbCollegeGrade: 2.33
  },
  {
    key: '11',
    letter: 'D',
    regularGrade: 1.0,
    honorsGrade: 1.5,
    apIbCollegeGrade: 2.0
  },
  {
    key: '12',
    letter: 'D-',
    regularGrade: 0.67,
    honorsGrade: 1.17,
    apIbCollegeGrade: 1.67
  },
  {
    key: '13',
    letter: 'F',
    regularGrade: 0.0,
    honorsGrade: 0.5,
    apIbCollegeGrade: 1.0
  }
];

export const CREDITS = [...Array(20).keys()].map(x => ++x);

export const GRADE_WEIGHTS = [...Array(101).keys()];

export const HIGH_SCHOOL_CREDITS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5];

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

export const HIGH_SCHOOL_GPA_SCALE_COLUMNS = [
  {
    title: 'Letter Grade',
    dataIndex: 'letterGrade'
  },
  {
    title: 'Percentile',
    dataIndex: 'percentile'
  },
  {
    title: '4.0 Scale',
    dataIndex: 'scale'
  },
  {
    title: '4.0+ Scale',
    dataIndex: 'extendedScale'
  }
];

export const HIGH_SCHOOL_GPA_SCALE_DATA = [
  {
    key: '1',
    letterGrade: 'A+',
    percentile: '97-100',
    scale: '4.00',
    extendedScale: '4.33'
  },
  {
    key: '2',
    letterGrade: 'A',
    percentile: '93-96',
    scale: '4.00',
    extendedScale: '4.00'
  },
  {
    key: '3',
    letterGrade: 'A-',
    percentile: '90-92',
    scale: '3.67',
    extendedScale: '3.67'
  },
  {
    key: '4',
    letterGrade: 'B+',
    percentile: '87-89',
    scale: '3.33',
    extendedScale: '3.33'
  },
  {
    key: '5',
    letterGrade: 'B',
    percentile: '83-86',
    scale: '3.00',
    extendedScale: '3.00'
  },
  {
    key: '6',
    letterGrade: 'B-',
    percentile: '80-82',
    scale: '2.67',
    extendedScale: '2.67'
  },
  {
    key: '7',
    letterGrade: 'C+',
    percentile: '77-79',
    scale: '2.33',
    extendedScale: '2.33'
  },
  {
    key: '8',
    letterGrade: 'C',
    percentile: '73-76',
    scale: '2.00',
    extendedScale: '2.00'
  },
  {
    key: '9',
    letterGrade: 'C-',
    percentile: '70-72',
    scale: '1.67',
    extendedScale: '1.67'
  },
  {
    key: '10',
    letterGrade: 'D+',
    percentile: '67-69',
    scale: '1.33',
    extendedScale: '1.33'
  },
  {
    key: '11',
    letterGrade: 'D',
    percentile: '65-66',
    scale: '1.00',
    extendedScale: '1.00'
  },
  {
    key: '12',
    letterGrade: 'F',
    percentile: '0-64',
    scale: '0.00',
    extendedScale: '0.00'
  }
];

export const OTHER_CALCULATORS = [
  <a href={ROUTES.COLLEGE_GPA_CALCULATOR}>College GPA Calculator</a>,
  <a href={ROUTES.HIGH_SCHOOL_GPA_CALCULATOR}>High School GPA Calculator</a>,
  <a href={ROUTES.GRADE_CALCULATOR}>Grade Calculator</a>
];

export const COURSE_TYPES = [
  'Regular',
  'AP Course',
  'IB Course',
  'College Prep',
  'Honors Course'
];
